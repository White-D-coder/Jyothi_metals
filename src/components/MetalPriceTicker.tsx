import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Activity, TrendingDown, TrendingUp } from 'lucide-react';

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

interface PriceFeed {
  status: 'ok' | 'unavailable';
  source?: string;
  sourceUrl?: string;
  currency?: string;
  unit?: string;
  updatedAt?: string;
  stale?: boolean;
  indicative?: boolean;
  metals?: MetalQuote[];
}

/** The upstream feed is cached server-side; polling more often just re-reads it. */
const REFRESH_MS = 15 * 60 * 1000;

const usd = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

const formatUpdated = (iso?: string) => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

interface MetalPriceTickerProps {
  onRequestQuote: () => void;
}

/**
 * Live LME reference prices for the metals that actually drive Jyoti Metal's
 * quotations. Renders nothing at all when the feed is unreachable - a broken
 * price board on a supplier's home page is worse than no price board.
 */
export const MetalPriceTicker: React.FC<MetalPriceTickerProps> = ({ onRequestQuote }) => {
  const [feed, setFeed] = useState<PriceFeed | null>(null);
  const [failed, setFailed] = useState(false);
  const lastLoadedAt = useRef(0);

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/metal-prices', { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Feed responded ${response.status}`);
      const data: PriceFeed = await response.json();
      lastLoadedAt.current = Date.now();

      if (data.status !== 'ok' || !data.metals?.length) {
        setFailed(true);
        return;
      }
      setFeed(data);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    load();

    const interval = window.setInterval(load, REFRESH_MS);

    // Background tabs are throttled, so a visitor returning after a long idle
    // would otherwise stare at a stale board until the next tick lands.
    const onVisible = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastLoadedAt.current > REFRESH_MS) {
        load();
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [load]);

  if (failed && !feed) return null;

  const updated = formatUpdated(feed?.updatedAt);
  // Seed prices are real but static, so the strip must not claim to be live.
  const isIndicative = Boolean(feed?.indicative);

  return (
    <section className="metal-ticker" aria-label="Live metal reference prices">
      <div className="container">
        <div className="metal-ticker-head">
          <div>
            <span className={`metal-ticker-eyebrow${isIndicative ? ' is-indicative' : ''}`}>
              <span className="metal-ticker-pulse" aria-hidden="true" />
              {isIndicative ? 'INDICATIVE REFERENCE PRICES' : 'LIVE MARKET DATA'}
            </span>
            <h2 className="metal-ticker-title">TODAY&rsquo;S METAL PRICES</h2>
          </div>

          <div className="metal-ticker-meta">
            <Activity size={14} />
            <span>
              {feed
                ? `${feed.source} · USD per metric tonne`
                : 'Fetching exchange feed…'}
            </span>
            {updated && (
              <span className="metal-ticker-stamp">
                {isIndicative ? 'As of' : feed?.stale ? 'Last confirmed' : 'Updated'} {updated} IST
              </span>
            )}
          </div>
        </div>

        <div className="metal-ticker-grid">
          {feed
            ? feed.metals!.map((metal) => {
                const up = (metal.changePct ?? 0) > 0;
                const flat = metal.changePct === null || Math.abs(metal.changePct) < 0.01;

                return (
                  <article key={metal.key} className="metal-price-card">
                    <div className="metal-price-top">
                      <span className="metal-price-symbol" aria-hidden="true">
                        {metal.symbol}
                      </span>
                      <span className="metal-price-name">{metal.label}</span>
                    </div>

                    <div className="metal-price-value">
                      <span className="metal-price-currency">$</span>
                      {usd.format(metal.price)}
                      <span className="metal-price-unit">/MT</span>
                    </div>

                    {metal.pricePerKgInr !== null && (
                      <div className="metal-price-inr">
                        &#8377;{inr.format(metal.pricePerKgInr)} / kg approx.
                      </div>
                    )}

                    {!flat && (
                      <div
                        className={`metal-price-change ${up ? 'is-up' : 'is-down'}`}
                        title="Change since our previous refresh of the feed"
                      >
                        {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                        {up ? '+' : ''}
                        {metal.changePct!.toFixed(2)}%
                      </div>
                    )}

                    <span className="metal-price-note">{metal.note}</span>
                  </article>
                );
              })
            : /* Skeletons keep the strip from collapsing on first paint. */
              Array.from({ length: 5 }, (_, idx) => (
                <article key={idx} className="metal-price-card is-loading" aria-hidden="true">
                  <div className="metal-price-skeleton metal-price-skeleton-sm" />
                  <div className="metal-price-skeleton metal-price-skeleton-lg" />
                  <div className="metal-price-skeleton metal-price-skeleton-sm" />
                </article>
              ))}
        </div>

        <p className="metal-ticker-disclaimer">
          Indicative exchange reference prices for the base metals behind our stainless,
          nickel-alloy and copper-alloy ranges &mdash; published for guidance only and not an
          offer or quotation. Finished product pricing depends on grade, form, quantity and
          conversion cost.{' '}
          <button type="button" className="metal-ticker-link" onClick={onRequestQuote}>
            Request a firm quote
          </button>{' '}
          for your exact specification.
        </p>
      </div>
    </section>
  );
};
