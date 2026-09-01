/**
 * Live metal prices for the home-page ticker.
 *
 * Upstream is Metals.Dev (https://metals.dev). Their free plan allows 100
 * requests a month against a 60-second feed, which is plenty for a marketing
 * strip provided we never call it once per visitor. Every response is therefore
 * cached twice - in the warm lambda and on the Vercel CDN - so a traffic spike
 * still costs exactly one upstream call per TTL window.
 *
 * Required env var: METALS_DEV_API_KEY (free key from https://metals.dev).
 * Optional: METAL_PRICES_TTL_MINUTES (default 480 = 8h ~= 93 calls/month,
 * which stays inside the free quota; drop it to 15 on a paid plan).
 */

const UPSTREAM = 'https://api.metals.dev/v1/latest';

/**
 * The metals Jyoti Metal's buyers actually track. LME nickel leads because it
 * is what moves the stainless surcharge; there is no free live feed for
 * finished stainless, titanium or steel, so we quote the exchange inputs and
 * label them as such rather than inventing a product price.
 */
const TRACKED = [
  { key: 'lme_nickel', fallback: 'nickel', label: 'Nickel', symbol: 'Ni', note: 'Stainless & superalloy driver' },
  { key: 'lme_copper', fallback: 'copper', label: 'Copper', symbol: 'Cu', note: 'Cu-Ni & brass alloys' },
  { key: 'lme_aluminum', fallback: 'aluminum', label: 'Aluminium', symbol: 'Al', note: 'Sheet, plate & extrusion' },
  { key: 'lme_zinc', fallback: 'zinc', label: 'Zinc', symbol: 'Zn', note: 'Galvanising & coatings' },
  { key: 'lme_lead', fallback: 'lead', label: 'Lead', symbol: 'Pb', note: 'Shielding & ballast' },
] as const;

interface MetalQuote {
  key: string;
  label: string;
  symbol: string;
  note: string;
  price: number;
  pricePerKgInr: number | null;
  change: number | null;
  changePct: number | null;
}

interface Snapshot {
  status: 'ok';
  source: string;
  sourceUrl: string;
  currency: 'USD';
  unit: 'mt';
  updatedAt: string;
  /** True when these are the hard-coded seed prices, not the live feed. */
  indicative?: boolean;
  metals: MetalQuote[];
}

/**
 * Seed snapshot, used only until METALS_DEV_API_KEY is configured (and as a
 * last resort if the upstream is unreachable on a cold lambda). These are real
 * reference prices captured on the date below, NOT live data - the strip
 * badges itself as "indicative" whenever it is serving these, and swaps to the
 * live feed automatically the moment a key exists.
 */
const SEED_AS_OF = '2026-08-20T12:00:00.000Z';
const SEED_INR_PER_USD = 95.53;
const SEED_USD_PER_MT: Record<string, number> = {
  lme_nickel: 16885,
  lme_copper: 14132,
  lme_aluminum: 3212,
  lme_zinc: 3739,
  lme_lead: 1872,
};

const seedSnapshot = (): Snapshot => ({
  status: 'ok',
  source: 'Indicative reference snapshot',
  sourceUrl: 'https://metals.dev',
  currency: 'USD',
  unit: 'mt',
  updatedAt: SEED_AS_OF,
  indicative: true,
  metals: TRACKED.map((entry) => ({
    key: entry.key,
    label: entry.label,
    symbol: entry.symbol,
    note: entry.note,
    price: SEED_USD_PER_MT[entry.key],
    pricePerKgInr: (SEED_USD_PER_MT[entry.key] * SEED_INR_PER_USD) / 1000,
    // No direction on a static snapshot - a fake arrow would be a lie.
    change: null,
    changePct: null,
  })),
});

const ttlMs = () => Math.max(1, Number(process.env.METAL_PRICES_TTL_MINUTES || 480)) * 60_000;

/** Warm-lambda cache. `previous` backs the change-since-last-refresh chips. */
let cache: { snapshot: Snapshot; fetchedAt: number } | null = null;
let previous: Snapshot | null = null;
let inFlight: Promise<Snapshot> | null = null;

const asNumber = (value: unknown): number | null => {
  const n = typeof value === 'string' ? Number(value) : value;
  return typeof n === 'number' && Number.isFinite(n) && n > 0 ? n : null;
};

/**
 * Metals.Dev returns a flat `{ metal: price }` map, but some entries come back
 * as `{ price, change }` objects on other plans - accept either shape.
 */
const priceOf = (metals: Record<string, unknown>, key: string): number | null => {
  const raw = metals?.[key];
  if (raw && typeof raw === 'object') return asNumber((raw as Record<string, unknown>).price);
  return asNumber(raw);
};

/**
 * With `currency=USD` Metals.Dev returns currencies as USD per unit (e.g. INR ~0.0105).
 * Handle both units-per-USD and USD-per-unit formats safely.
 */
const inrPerUsd = (currencies: Record<string, unknown> | undefined): number | null => {
  const rate = asNumber(currencies?.INR);
  if (!rate) return null;
  if (rate >= 0.005 && rate <= 0.03) return 1 / rate;
  if (rate >= 40 && rate <= 200) return rate;
  return null;
};

async function fetchSnapshot(apiKey: string): Promise<Snapshot> {
  const url = `${UPSTREAM}?api_key=${encodeURIComponent(apiKey)}&currency=USD&unit=mt`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  let payload: any;
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Metals.Dev responded ${response.status}`);
    payload = await response.json();
  } finally {
    clearTimeout(timeout);
  }

  if (payload?.status && payload.status !== 'success') {
    throw new Error(payload.error_message || payload.error || 'Metals.Dev returned an error');
  }

  const metalsMap: Record<string, unknown> = payload?.metals || {};
  const rate = inrPerUsd(payload?.currencies);

  const metals: MetalQuote[] = [];
  for (const entry of TRACKED) {
    const price = priceOf(metalsMap, entry.key) ?? priceOf(metalsMap, entry.fallback);
    if (price === null) continue;

    // Compare against the last snapshot we served so the strip can show
    // direction. Basis is "since our previous refresh", not a session change.
    const before = previous?.metals.find((m) => m.key === entry.key)?.price ?? null;
    const change = before !== null ? price - before : null;

    metals.push({
      key: entry.key,
      label: entry.label,
      symbol: entry.symbol,
      note: entry.note,
      price,
      pricePerKgInr: rate ? (price * rate) / 1000 : null,
      change,
      changePct: change !== null && before ? (change / before) * 100 : null,
    });
  }

  if (!metals.length) throw new Error('Metals.Dev returned no tracked metals');

  return {
    status: 'ok',
    source: 'Metals.Dev / LME 3-month',
    sourceUrl: 'https://metals.dev',
    currency: 'USD',
    unit: 'mt',
    updatedAt: payload?.timestamps?.metal || new Date().toISOString(),
    metals,
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    return res.end(JSON.stringify({ status: 'error', message: 'Method not allowed' }));
  }

  res.setHeader('Content-Type', 'application/json');

  const apiKey = process.env.METALS_DEV_API_KEY;
  if (!apiKey) {
    // Not configured yet: show the seed prices, clearly badged as indicative,
    // rather than leaving a hole in the home page.
    res.setHeader('Cache-Control', 'public, s-maxage=300');
    res.statusCode = 200;
    return res.end(JSON.stringify(seedSnapshot()));
  }

  const fresh = cache && Date.now() - cache.fetchedAt < ttlMs();
  if (fresh) {
    res.setHeader('Cache-Control', `public, s-maxage=${Math.floor(ttlMs() / 1000)}, stale-while-revalidate=86400`);
    res.statusCode = 200;
    return res.end(JSON.stringify(cache!.snapshot));
  }

  try {
    // Collapse concurrent cold requests into a single upstream call.
    inFlight = inFlight || fetchSnapshot(apiKey);
    const snapshot = await inFlight;
    previous = cache?.snapshot ?? previous;
    cache = { snapshot, fetchedAt: Date.now() };

    res.setHeader('Cache-Control', `public, s-maxage=${Math.floor(ttlMs() / 1000)}, stale-while-revalidate=86400`);
    res.statusCode = 200;
    return res.end(JSON.stringify(snapshot));
  } catch (error) {
    console.error('[api/metal-prices] upstream failed:', error);

    if (cache) {
      // Quota exhausted or upstream down - last good prices beat an empty strip.
      res.setHeader('Cache-Control', 'public, s-maxage=600');
      res.statusCode = 200;
      return res.end(JSON.stringify({ ...cache.snapshot, stale: true }));
    }

    res.setHeader('Cache-Control', 'public, s-maxage=300');
    res.statusCode = 200;
    return res.end(JSON.stringify(seedSnapshot()));
  } finally {
    inFlight = null;
  }
}
