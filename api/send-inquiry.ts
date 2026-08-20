import nodemailer from 'nodemailer';

const TO_ADDRESS = process.env.INQUIRY_TO || 'info@jyotimetal.co.in';

const CATEGORY_LABELS: Record<string, string> = {
  'Enterprise Quote': 'Enterprise Project Quote',
  'Technical Spec Consultation': 'Metallurgy / CAD Spec Consultation',
  'Mill Test Certificate': 'Mill Test Certificate Request',
  'Career Inquiry': 'Careers & Supply Partnerships',
};

interface InquiryPayload {
  category?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildTransport = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.');
  }

  const port = Number(process.env.SMTP_PORT || 587);

  return nodemailer.createTransport({
    host,
    port,
    // Port 465 speaks TLS from the first byte; 587 upgrades via STARTTLS.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth: { user, pass },
  });
};

/** Vercel parses JSON bodies for us; the Vite dev middleware does not. */
const readBody = async (req: any): Promise<InquiryPayload> => {
  if (req.body && typeof req.body === 'object') return req.body as InquiryPayload;
  if (typeof req.body === 'string' && req.body) return JSON.parse(req.body);

  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  res.setHeader('Content-Type', 'application/json');

  let payload: InquiryPayload;
  try {
    payload = await readBody(req);
  } catch {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'Invalid request body.' }));
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const phone = (payload.phone || '').trim();
  const message = (payload.message || '').trim();
  const category = (payload.category || '').trim();
  const categoryLabel = CATEGORY_LABELS[category] || category || 'General Inquiry';

  if (!name || !email || !message) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'Name, email and message are required.' }));
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'Please enter a valid email address.' }));
  }

  const rows: Array<[string, string]> = [
    ['Inquiry Category', categoryLabel],
    ['Full Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#304050;font-size:14px;line-height:1.6">
      <h2 style="color:#588078;margin:0 0 16px">New Website Inquiry</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;margin-bottom:16px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="font-weight:700;border:1px solid #CBD5E1">${label}</td><td style="border:1px solid #CBD5E1">${escapeHtml(value)}</td></tr>`,
          )
          .join('')}
      </table>
      <div style="font-weight:700;margin-bottom:6px">Message / Requirement Details</div>
      <div style="white-space:pre-wrap;border-left:3px solid #588078;padding-left:12px">${escapeHtml(message)}</div>
      <p style="color:#64748b;font-size:12px;margin-top:24px">Sent from the jyotimetal.co.in contact form.</p>
    </div>
  `;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message / Requirement Details:',
    message,
  ].join('\n');

  try {
    const transporter = buildTransport();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Jyoti Metal Website" <${process.env.SMTP_USER}>`,
      to: TO_ADDRESS,
      replyTo: `"${name}" <${email}>`,
      subject: `[${categoryLabel}] Website inquiry from ${name}`,
      text,
      html,
    });

    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    console.error('[send-inquiry] failed to send mail:', error);
    res.statusCode = 500;
    return res.end(
      JSON.stringify({ error: 'We could not send your inquiry right now. Please email info@jyotimetal.co.in directly.' }),
    );
  }
}
