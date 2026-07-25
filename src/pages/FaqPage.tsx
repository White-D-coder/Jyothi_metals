import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Search,
  ClipboardList,
  Layers,
  ShieldCheck,
  Ship,
  HelpCircle,
} from 'lucide-react';

interface FaqPageProps {
  onOpenQuoteModal: () => void;
  onNavigate?: (tab: string) => void;
}

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  category: string;
  icon: React.ReactNode;
  items: FaqItem[];
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenQuoteModal, onNavigate }) => {
  const [openKey, setOpenKey] = useState<string | null>('0-0');
  const [searchTerm, setSearchTerm] = useState('');

  const faqData: FaqCategory[] = [
    {
      category: 'Ordering & Quotes',
      icon: <ClipboardList size={20} color="#51847D" />,
      items: [
        {
          q: 'How do I request a quote?',
          a: 'You can request a quote in three ways: use the "Get an Instant Quote" button anywhere on this site to submit your requirements online, email your drawings or specifications to our sales desk, or call our engineering team directly. Include the alloy grade, dimensions, quantity and any relevant standards, and our metallurgists will return a detailed, grade-specific quotation — typically within one business day.',
        },
        {
          q: 'What is the minimum order quantity?',
          a: 'Minimum order quantities vary by product form and alloy grade. Many stock items such as plate, sheet, bar and tube can be supplied from a single piece or a nominal minimum weight, while custom-melted or vacuum-remelted grades may carry a higher minimum to justify a dedicated heat. Tell us your target volume and we will confirm the applicable MOQ and any price breaks for larger quantities.',
        },
        {
          q: 'Do you supply custom / cut-to-size dimensions?',
          a: 'Yes. Our in-house laser cutting, CNC milling, sawing and waterjet lines let us supply material cut precisely to your CAD files or dimensional list — including profiled blanks, rings, discs and near-net shapes. Cut-to-size supply reduces your machining scrap and inbound handling. Simply send a drawing or a length-width-thickness breakdown and we will quote the finished dimensions directly.',
        },
        {
          q: 'What payment terms do you offer?',
          a: 'For first orders we typically work on advance payment or a confirmed irrevocable letter of credit for export shipments. Established, approved accounts can be extended net credit terms after a short verification process. We accept bank wire transfer and documentary L/C for international trade; specific terms are always confirmed in writing on your quotation and proforma invoice.',
        },
        {
          q: 'How long is a quotation valid?',
          a: 'Standard quotations are valid for 30 days from the date of issue. Because raw alloy and surcharge pricing (particularly for nickel, chromium and molybdenum-bearing grades) can move with the metal markets, quotes for specialty superalloys may carry a shorter validity, which is clearly stated on the document. If a quote has expired, contact us and we will promptly re-confirm current pricing.',
        },
      ],
    },
    {
      category: 'Materials & Specifications',
      icon: <Layers size={20} color="#51847D" />,
      items: [
        {
          q: 'Which alloy grades do you stock?',
          a: 'We hold a broad inventory across more than 200 certified grades, including austenitic and duplex stainless steels (304/L, 316/L, 2205, 2507), carbon and alloy structural steels, titanium (Ti-6Al-4V and CP grades), aluminium (6061-T6, 5083), and nickel-based superalloys such as Inconel, Monel and Hastelloy. If a grade is not in stock, we can source or melt it to your specification.',
        },
        {
          q: 'Can you help me select the right grade for my application?',
          a: 'Absolutely — grade advisory is a core part of our service. Share your service environment (temperature, pressure, corrosive media), mechanical loads and any code requirements, and our metallurgists will recommend the optimal grade and temper, balancing performance, weldability, machinability and cost. We routinely advise on trade-offs between competing grades so you avoid over-specifying and control your total cost.',
        },
        {
          q: 'Do you provide material equivalents / cross-references?',
          a: 'Yes. We regularly cross-reference between international standards — ASTM/ASME, EN, DIN, JIS, BS and UNS designations — so you can specify in whichever system your drawings use. If your legacy specification calls out an obsolete or regional grade, we will identify the closest current equivalent and confirm that its chemistry and mechanical properties meet or exceed your original requirement.',
        },
        {
          q: 'What size and thickness ranges are available?',
          a: 'Available dimensions depend on product form. Plate is typically supplied from around 3 mm up to 200 mm thick, sheet and coil in thinner gauges, and round bar from a few millimetres up to large forged diameters. Tube, pipe and structural sections are carried in standard schedules. For requirements outside our standard stock range we can arrange custom rolling, forging or fabrication — just send your dimensions and we will confirm feasibility.',
        },
      ],
    },
    {
      category: 'Quality & Certification',
      icon: <ShieldCheck size={20} color="#51847D" />,
      items: [
        {
          q: 'Do you provide Mill Test Certificates?',
          a: 'Every order ships with a Mill Test Certificate (MTC) documenting the chemical composition and mechanical properties of the supplied heat, with full heat-lot traceability back to the melt. The certificate references the applicable material standard and the specific heat number stamped on the material, so your incoming inspection and audit records are fully supported.',
        },
        {
          q: 'What is the difference between EN 10204 3.1 and 3.2?',
          a: 'Both are inspection certificates reporting actual test results on the delivered material, not merely typical values. A 3.1 certificate is validated by the manufacturer’s own authorised inspection representative, who is independent of the manufacturing department. A 3.2 certificate adds validation by an independent third party — either an authorised inspector nominated in your order or a representative of the responsible authority. Choose 3.2 when your contract or code mandates independent verification.',
        },
        {
          q: 'Are you ISO / AS9100 certified?',
          a: 'Our quality management system is certified to ISO 9001, and we maintain the traceability, first-article inspection and process controls expected for aerospace and defence supply chains, aligned with AS9100 principles. Certificates of conformity and our current accreditation documents are available on request so your supplier-approval and audit teams have everything they need.',
        },
        {
          q: 'Can I request third-party inspection?',
          a: 'Yes. We welcome third-party and customer-nominated inspection agencies such as TUV, SGS, Lloyd’s, Bureau Veritas or your own representative. Specify the required inspection scope, witness points and standard on your purchase order, and we will coordinate access, provide test samples and issue the corresponding EN 10204 3.2 certification alongside the inspection report.',
        },
      ],
    },
    {
      category: 'Shipping & Logistics',
      icon: <Ship size={20} color="#51847D" />,
      items: [
        {
          q: 'Do you ship internationally?',
          a: 'Yes, we export worldwide from port-side warehouses and handle the full documentation set — commercial invoice, packing list, certificate of origin and material certificates. We can quote on Ex-Works, FOB, CIF or delivered terms per Incoterms, and coordinate with your nominated freight forwarder or arrange carriage on your behalf.',
        },
        {
          q: 'What are typical lead times?',
          a: 'Ex-stock items are usually dispatched within 48 hours of order confirmation. Cut-to-size and lightly processed material typically ships within one to two weeks, while custom-melted grades, forgings or fully fabricated assemblies run longer depending on the route. Your confirmed lead time is always stated on the order acknowledgement, and our team keeps you updated on progress.',
        },
        {
          q: 'How is material packaged for export?',
          a: 'Material is packed to survive long-haul sea and road transit: plates and sheets on fumigated (ISPM-15 compliant) wooden pallets or in steel-strapped bundles, bar in crates or bundles, and machined or high-value components in custom-built cases with edge protection and, where needed, VCI corrosion inhibitors. Each package is clearly marked with heat numbers and order references for easy identification on arrival.',
        },
        {
          q: 'Can you handle urgent / expedited orders?',
          a: 'Yes. For time-critical breakdowns and production stoppages we offer expedited processing and priority dispatch on ex-stock material, and can arrange air freight where the schedule justifies it. Flag your requirement as urgent when you enquire — or call our team directly — and we will prioritise cutting, certification and shipping to hit your deadline.',
        },
      ],
    },
  ];

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredData = faqData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          normalizedSearch === '' ||
          item.q.toLowerCase().includes(normalizedSearch) ||
          item.a.toLowerCase().includes(normalizedSearch)
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const hasResults = filteredData.length > 0;

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="inner-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Dark Image Hero */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.92) 100%), url("/images/pexels-jakubzerdzicki-33813584.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#ffffff',
          padding: '120px 0 90px',
          borderBottom: '3px solid #51847D',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>
              HELP CENTER
            </span>
            <h1
              className="hero-title"
              style={{
                fontSize: '3.4rem',
                color: '#ffffff',
                marginBottom: '20px',
                lineHeight: 1.1,
              }}
            >
              Frequently Asked Questions
            </h1>
            <p
              style={{
                fontSize: '1.15rem',
                color: '#cbd5e1',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '620px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Answers to common questions about ordering, alloy specifications, quality
              certification and global logistics. Can&apos;t find what you need? Our engineers are
              only a message away.
            </p>

            {/* Search */}
            <div
              style={{
                position: 'relative',
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              <Search
                size={18}
                color="#94a3b8"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                className="form-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions (e.g. lead time, certificate, 316L)..."
                aria-label="Search frequently asked questions"
                style={{ paddingLeft: '44px', width: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FAQ Groups */}
      <section className="section bg-white" style={{ padding: '80px 0' }}>
        <div className="container">
          {!hasResults ? (
            <div
              style={{
                maxWidth: '620px',
                margin: '0 auto',
                textAlign: 'center',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                padding: '60px 30px',
              }}
            >
              <HelpCircle size={40} color="#94a3b8" style={{ marginBottom: '16px' }} />
              <h3
                className="card-title"
                style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}
              >
                No matching questions found
              </h3>
              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
                We couldn&apos;t find an answer matching &ldquo;{searchTerm}&rdquo;. Try a different
                keyword, or reach out to our team directly and we&apos;ll help right away.
              </p>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-primary"
                style={{ padding: '14px 30px', fontSize: '0.95rem', minHeight: '44px' }}
              >
                Ask Our Engineers <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>
              {filteredData.map((cat, catIndex) => (
                <div
                  key={cat.category}
                  style={{ marginBottom: catIndex === filteredData.length - 1 ? 0 : '56px' }}
                >
                  {/* Category heading */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '20px',
                      paddingBottom: '14px',
                      borderBottom: '2px solid #51847D',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(81, 132, 125, 0.12)',
                        flexShrink: 0,
                      }}
                    >
                      {cat.icon}
                    </span>
                    <h2
                      className="card-title"
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        margin: 0,
                      }}
                    >
                      {cat.category}
                    </h2>
                  </div>

                  {/* Accordion items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {cat.items.map((item, itemIndex) => {
                      const key = `${catIndex}-${itemIndex}`;
                      const isOpen = openKey === key;
                      const panelId = `faq-panel-${key}`;
                      const buttonId = `faq-button-${key}`;
                      return (
                        <div
                          key={item.q}
                          style={{
                            border: '1px solid #cbd5e1',
                            borderLeft: isOpen ? '4px solid #51847D' : '1px solid #cbd5e1',
                            background: isOpen ? '#f8fafc' : '#ffffff',
                            boxShadow: isOpen
                              ? '0 8px 24px rgba(81, 132, 125, 0.10)'
                              : '0 2px 8px rgba(0,0,0,0.03)',
                            transition: 'box-shadow 0.25s ease, background 0.25s ease',
                          }}
                        >
                          <button
                            id={buttonId}
                            onClick={() => toggle(key)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '16px',
                              textAlign: 'left',
                              background: 'transparent',
                              border: 'none',
                              borderRadius: 0,
                              cursor: 'pointer',
                              padding: '20px 22px',
                              font: 'inherit',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                color: '#0f172a',
                                lineHeight: 1.4,
                              }}
                            >
                              {item.q}
                            </span>
                            <ChevronDown
                              size={22}
                              color={isOpen ? '#51847D' : '#94a3b8'}
                              style={{
                                flexShrink: 0,
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease, color 0.25s ease',
                              }}
                            />
                          </button>
                          {isOpen && (
                            <div
                              id={panelId}
                              role="region"
                              aria-labelledby={buttonId}
                              style={{
                                padding: '0 22px 22px',
                              }}
                            >
                              <p
                                style={{
                                  fontSize: '0.98rem',
                                  color: '#475569',
                                  lineHeight: 1.7,
                                  margin: 0,
                                  paddingTop: '2px',
                                }}
                              >
                                {item.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Still have questions? CTA band (Dark) */}
      <section
        style={{
          background: '#061221',
          padding: '80px 0',
          borderTop: '3px solid #51847D',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>
              STILL HAVE QUESTIONS?
            </span>
            <h2
              className="section-title"
              style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '18px' }}
            >
              Talk to a Metallurgy Specialist
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '36px' }}>
              If your question isn&apos;t covered above, our engineering team is ready to help with
              grade selection, certification requirements and custom orders — usually within one
              business day.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{
                  padding: '16px 36px',
                  fontSize: '1rem',
                  background: '#51847D',
                  borderColor: '#51847D',
                }}
              >
                Get an Instant Quote <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="btn btn-outline"
                style={{
                  padding: '16px 36px',
                  fontSize: '1rem',
                  borderColor: '#77b8b0',
                  color: '#ffffff',
                }}
              >
                Contact Support <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
