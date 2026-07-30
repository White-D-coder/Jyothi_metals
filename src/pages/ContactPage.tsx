import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onOpenQuoteModal: (productName?: string) => void;
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
      {/* 1. Hero with Rich Background Photography */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.85) 100%), url("/images/pexels-eugeniofr-30005294.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '80px 0 60px',
          borderBottom: '3px solid #588078',
          marginBottom: '50px',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              24/7 TECHNICAL SUPPORT &amp; QUOTES
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '16px',
                letterSpacing: '0.6px',
              }}
            >
              Get in Touch with Our Metallurgy Experts
            </h1>
            <p style={{ fontSize: '1.08rem', color: '#CBD5E1', lineHeight: 1.65, margin: 0, letterSpacing: '0.3px' }}>
              Have technical questions about alloy tolerances, heat treatments, or custom enterprise contracts? Our engineering team responds within 2 business hours.
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '80px' }}>

        {/* Contact Form — Clean White Page Integration (No Boxed Card) */}
        <div style={{ maxWidth: '640px', margin: '0 auto 60px' }}>
          <div>
            <h3 className="card-title" style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#0f3b5e' }}>
              Send an Inquiry
            </h3>
            <p style={{ color: '#4a5568', fontSize: '0.95rem', marginBottom: '28px' }}>
              Fill out the form below and an assigned metallurgical engineer will contact you promptly.
            </p>

            {submitted ? (
              <div style={{ padding: '30px 20px', textAlign: 'center', background: '#f6f9fc', borderRadius: '12px' }}>
                <CheckCircle2 size={48} color="#51847D" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: '#0f3b5e', fontSize: '1.3rem' }}>Inquiry Received!</h4>
                <p style={{ color: '#4a5568', fontSize: '0.9rem', marginTop: '8px' }}>
                  Thank you for contacting Jyothi Metals. Reference ticket #JYO-9942 has been dispatched to our support team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-category" className="form-label">Inquiry Category</label>
                  <select
                    id="contact-category"
                    className="form-select"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="Enterprise Quote">Enterprise Project Quote</option>
                    <option value="Technical Spec Consultation">Metallurgy / CAD Spec Consultation</option>
                    <option value="Mill Test Certificate">Mill Test Certificate Request</option>
                    <option value="Career Inquiry">Careers &amp; Supply Partnerships</option>
                  </select>
                </div>

                <div className="grid-responsive-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Full Name *</label>
                    <input id="contact-name" type="text" required placeholder="John Doe" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email Address *</label>
                    <input id="contact-email" type="email" required placeholder="j.doe@company.com" className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-label">Phone Number</label>
                  <input id="contact-phone" type="tel" placeholder="+91 98000 00000" className="form-input" />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message / Requirement Details *</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    className="form-textarea"
                    placeholder="Describe your required alloy dimensions, target delivery dates, or technical specifications..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', minHeight: '44px' }}>
                  Send Inquiry <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>


        {/* 2. Global Support SLAs & Direct Contacts */}
        <div className="grid-responsive-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
          <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Clock size={32} color="#51847D" />
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>Leadership Contacts</div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>Dhawal Choudhary &amp; Dinesh Choudhary: +91 9322281549</div>
            </div>
          </div>
          <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Phone size={32} color="#51847D" />
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>Mumbai Office Hotline</div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>(022) 2380 2758 / 2382 5068</div>
            </div>
          </div>
          <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <MapPin size={32} color="#51847D" />
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>Key Locations</div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>Mumbai Regd. &amp; Delhi Branch</div>
            </div>
          </div>
        </div>

        {/* 3. Office & Plant Addresses Cards */}
        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '36px', marginTop: '20px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px', textAlign: 'center' }}>
            Our Offices &amp; Manufacturing Hubs
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#51847D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Headquarters
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Regd. Office (Mumbai)
              </h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                102, Praveen House, 4th Kumbharwada Lane, Mumbai-400004.<br />
                <span style={{ color: '#0f172a', fontWeight: 600 }}>Tel: (022) 2380 2758 / 2382 5068</span>
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#51847D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                North Branch (Address Only)
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Branch Office (Delhi)
              </h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                302, Indra Prastha Tower, 6th Community Centre, Wazirpur, DELHI - 110 052.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#51847D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Manufacturing Facility
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Plant Address
              </h4>
              <p style={{ color: '#51847D', fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
                Awaiting Rajasthan address
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
