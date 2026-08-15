import React, { useState } from 'react';
import { Phone, Send, CheckCircle2, Mail, UserCheck, Clock } from 'lucide-react';

interface ContactPageProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formCategory, setFormCategory] = useState('Enterprise Quote');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => setSubmitted(false), 4000);
    }, 200);
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* 1. Hero Banner */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.88) 100%), url("/images/pexels-eugeniofr-30005294.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '52px 0 40px',
          borderBottom: '3px solid #588078',
          marginBottom: '44px',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              24/7 TECHNICAL SUPPORT &amp; QUOTES
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '14px',
                letterSpacing: '0.6px',
              }}
            >
              Get in Touch with Our Metallurgy Experts
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#CBD5E1', lineHeight: 1.65, margin: 0, letterSpacing: '0.3px' }}>
              Have technical questions about alloy tolerances, heat treatments, or custom enterprise contracts? Our engineering team responds promptly.
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px 48px' }}>
        
        {/* 2-COLUMN MAIN SECTION: Left (Leadership & Contact Details) | Right (Inquiry Form) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', alignItems: 'start', marginBottom: '56px' }}>
          
          {/* LEFT SIDE: Leadership Contacts & Hotlines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                DIRECT DIRECTORY
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#304050', margin: 0, lineHeight: 1.25 }}>
                Contact &amp; Key Personnel
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#64748B', marginTop: '6px' }}>
                Reach out directly to executive management or office hotlines.
              </p>
            </div>

            {/* Leadership Contacts Card */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderLeft: '4px solid #588078',
                padding: '24px 22px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ background: '#EDF5F4', padding: '8px', border: '1px solid #588078' }}>
                  <UserCheck size={20} color="#588078" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#304050', margin: 0 }}>
                  Leadership Contacts
                </h3>
              </div>
              <div style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.7 }}>
                <div style={{ marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid #E2E8F0' }}>
                  <strong style={{ color: '#304050', fontSize: '0.95rem' }}>Dhawal Choudhary:</strong><br />
                  <a href="tel:+919322281549" style={{ color: '#588078', fontWeight: 700, textDecoration: 'none' }}>+91 9322281549</a>
                </div>
                <div>
                  <strong style={{ color: '#304050', fontSize: '0.95rem' }}>Dinesh Choudhary:</strong><br />
                  <a href="tel:+919769388813" style={{ color: '#588078', fontWeight: 700, textDecoration: 'none' }}>+91 9769388813</a>
                </div>
              </div>
            </div>

            {/* Mumbai Office Hotline Card */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderLeft: '4px solid #588078',
                padding: '22px 20px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ background: '#EDF5F4', padding: '8px', border: '1px solid #588078' }}>
                  <Phone size={20} color="#588078" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#304050', margin: 0 }}>
                  Mumbai Office Hotline
                </h3>
              </div>
              <p style={{ fontSize: '0.96rem', color: '#304050', fontWeight: 700, margin: 0, lineHeight: 1.6, paddingLeft: '44px' }}>
                022-66363385 / 66595923 / 66595771
              </p>
            </div>

            {/* Email Address & Working Hours Card */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderLeft: '4px solid #588078',
                padding: '22px 20px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ background: '#EDF5F4', padding: '8px', border: '1px solid #588078' }}>
                  <Mail size={20} color="#588078" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#304050', margin: 0 }}>
                  Email &amp; Working Hours
                </h3>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.65, paddingLeft: '44px' }}>
                <p style={{ margin: '0 0 6px 0' }}>
                  <strong>Sales Inquiry:</strong>{' '}
                  <a href="mailto:info@jyotimetal.co.in" style={{ color: '#588078', fontWeight: 700, textDecoration: 'none' }}>
                    info@jyotimetal.co.in
                  </a>
                </p>
                <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="#64748B" /> Mon – Sat: 9:00 AM – 7:30 PM (IST)
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Contact Inquiry Form */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              padding: '36px 32px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            }}
          >
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#304050', marginBottom: '6px' }}>
              Send an Inquiry
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.92rem', marginBottom: '26px' }}>
              Fill out the form below and an assigned metallurgical engineer will contact you promptly.
            </p>

            {submitted ? (
              <div style={{ padding: '36px 24px', textAlign: 'center', background: '#F8FAFC', border: '1px solid #588078' }}>
                <CheckCircle2 size={48} color="#588078" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: '#304050', fontSize: '1.3rem', fontWeight: 800 }}>Inquiry Received!</h4>
                <p style={{ color: '#64748B', fontSize: '0.92rem', marginTop: '8px', lineHeight: 1.6 }}>
                  Thank you for contacting Jyoti Metal. Reference ticket #JYO-9942 has been dispatched to our support team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="form-group">
                  <label htmlFor="contact-category" className="form-label" style={{ fontWeight: 700, fontSize: '0.82rem', color: '#304050', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                    Inquiry Category
                  </label>
                  <select
                    id="contact-category"
                    className="form-select"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', fontSize: '0.9rem', border: '1px solid #CBD5E1', borderRadius: '0px', background: '#FFFFFF' }}
                  >
                    <option value="Enterprise Quote">Enterprise Project Quote</option>
                    <option value="Technical Spec Consultation">Metallurgy / CAD Spec Consultation</option>
                    <option value="Mill Test Certificate">Mill Test Certificate Request</option>
                    <option value="Career Inquiry">Careers &amp; Supply Partnerships</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label" style={{ fontWeight: 700, fontSize: '0.82rem', color: '#304050', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                      Full Name *
                    </label>
                    <input id="contact-name" type="text" required placeholder="John Doe" className="form-input" style={{ width: '100%', padding: '11px 14px', fontSize: '0.9rem', border: '1px solid #CBD5E1', borderRadius: '0px' }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label" style={{ fontWeight: 700, fontSize: '0.82rem', color: '#304050', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                      Email Address *
                    </label>
                    <input id="contact-email" type="email" required placeholder="j.doe@company.com" className="form-input" style={{ width: '100%', padding: '11px 14px', fontSize: '0.9rem', border: '1px solid #CBD5E1', borderRadius: '0px' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-label" style={{ fontWeight: 700, fontSize: '0.82rem', color: '#304050', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                    Phone Number
                  </label>
                  <input id="contact-phone" type="tel" placeholder="+91 98000 00000" className="form-input" style={{ width: '100%', padding: '11px 14px', fontSize: '0.9rem', border: '1px solid #CBD5E1', borderRadius: '0px' }} />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label" style={{ fontWeight: 700, fontSize: '0.82rem', color: '#304050', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                    Message / Requirement Details *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    className="form-textarea"
                    placeholder="Describe your required alloy dimensions, target delivery dates, or technical specifications..."
                    style={{ width: '100%', padding: '11px 14px', fontSize: '0.9rem', border: '1px solid #CBD5E1', borderRadius: '0px' }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase',
                    background: '#588078',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    marginTop: '6px',
                  }}
                >
                  Send Inquiry <Send size={16} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* 3. Office Addresses Cards with Light Silver Embedded Maps */}
        <div>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              PHYSICAL PRESENCE
            </span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#304050', margin: 0 }}>
              Our Offices &amp; Locations
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
            
            {/* Card 1: Regd. Office (Mumbai) */}
            <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#588078', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  HEAD OFFICE
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#304050', marginBottom: '8px' }}>
                  Regd. Office (Mumbai)
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  102, Praveen House, 4th Kumbharwada Lane, Mumbai-400004.<br />
                  <strong style={{ color: '#304050' }}>Tel: 022-66363385 / 66595923 / 66595771</strong>
                </p>
              </div>

              {/* Light Silver Map Frame with Company Color #588078 SVG Pin Pointer */}
              <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                <iframe
                  title="Mumbai Office Map"
                  src="https://maps.google.com/maps?q=102+Praveen+House+4th+Kumbharwada+Lane+Mumbai+400004&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'grayscale(75%) contrast(1.06) brightness(1.04)',
                  }}
                  loading="lazy"
                ></iframe>

                {/* Center Company Color #588078 SVG Pointer */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -85%)',
                    pointerEvents: 'none',
                    zIndex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
                  }}
                >
                  <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 0C8.05887 0 0 8.05887 0 18C0 29.5 15.75 42.75 16.875 43.6875C17.5312 44.25 18.4688 44.25 19.125 43.6875C20.25 42.75 36 29.5 36 18C36 8.05887 27.9411 0 18 0ZM18 25.5C13.8579 25.5 10.5 22.1421 10.5 18C10.5 13.8579 13.8579 10.5 18 10.5C22.1421 10.5 25.5 13.8579 25.5 18C25.5 22.1421 22.1421 25.5 18 25.5Z"
                      fill="#588078"
                    />
                    <circle cx="18" cy="18" r="6" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: Branch Office (Delhi) */}
            <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#588078', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  NORTH BRANCH (ADDRESS ONLY)
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#304050', marginBottom: '8px' }}>
                  Branch Office (Delhi)
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  302, Indra Prastha Tower, 6th Community Centre, Wazirpur, DELHI - 110 052.
                </p>
              </div>

              {/* Light Silver Map Frame with Company Color #588078 SVG Pin Pointer */}
              <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                <iframe
                  title="Delhi Branch Map"
                  src="https://maps.google.com/maps?q=Indra+Prastha+Tower+Wazirpur+Delhi+110052&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'grayscale(75%) contrast(1.06) brightness(1.04)',
                  }}
                  loading="lazy"
                ></iframe>

                {/* Center Company Color #588078 SVG Pointer */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -85%)',
                    pointerEvents: 'none',
                    zIndex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
                  }}
                >
                  <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 0C8.05887 0 0 8.05887 0 18C0 29.5 15.75 42.75 16.875 43.6875C17.5312 44.25 18.4688 44.25 19.125 43.6875C20.25 42.75 36 29.5 36 18C36 8.05887 27.9411 0 18 0ZM18 25.5C13.8579 25.5 10.5 22.1421 10.5 18C10.5 13.8579 13.8579 10.5 18 10.5C22.1421 10.5 25.5 13.8579 25.5 18C25.5 22.1421 22.1421 25.5 18 25.5Z"
                      fill="#588078"
                    />
                    <circle cx="18" cy="18" r="6" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3: Plant / Works (Alwar, Rajasthan) */}
            <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#588078', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  MANUFACTURING PLANT
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#304050', marginBottom: '8px' }}>
                  Plant Address (Alwar)
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  Plot No. E-41 (G-1), RIICO Industrial Area, Alwar - 301019, Rajasthan, India.
                </p>
              </div>

              {/* Light Silver Map Frame with Company Color #588078 SVG Pin Pointer */}
              <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                <iframe
                  title="Alwar Plant Map"
                  src="https://maps.google.com/maps?q=RIICO+Industrial+Area+Alwar+301019+Rajasthan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'grayscale(75%) contrast(1.06) brightness(1.04)',
                  }}
                  loading="lazy"
                ></iframe>

                {/* Center Company Color #588078 SVG Pointer */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -85%)',
                    pointerEvents: 'none',
                    zIndex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
                  }}
                >
                  <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 0C8.05887 0 0 8.05887 0 18C0 29.5 15.75 42.75 16.875 43.6875C17.5312 44.25 18.4688 44.25 19.125 43.6875C20.25 42.75 36 29.5 36 18C36 8.05887 27.9411 0 18 0ZM18 25.5C13.8579 25.5 10.5 22.1421 10.5 18C10.5 13.8579 13.8579 10.5 18 10.5C22.1421 10.5 25.5 13.8579 25.5 18C25.5 22.1421 22.1421 25.5 18 25.5Z"
                      fill="#588078"
                    />
                    <circle cx="18" cy="18" r="6" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
