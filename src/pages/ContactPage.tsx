import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send, Calculator, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onOpenQuoteModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenQuoteModal }) => {
  const [formCategory, setFormCategory] = useState('Enterprise Quote');
  const [submitted, setSubmitted] = useState(false);

  // Weight & Density Calculator State
  const [calcAlloy, setCalcAlloy] = useState('Stainless 316L (8.00 g/cm³)');
  const [calcLength, setCalcLength] = useState<number>(1000); // mm
  const [calcWidth, setCalcWidth] = useState<number>(500); // mm
  const [calcThickness, setCalcThickness] = useState<number>(10); // mm

  const densityMap: Record<string, number> = {
    'Stainless 316L (8.00 g/cm³)': 8.0,
    'Titanium Ti-6Al-4V (4.43 g/cm³)': 4.43,
    'Structural Steel A36 (7.85 g/cm³)': 7.85,
    'Aluminum 6061-T6 (2.70 g/cm³)': 2.7,
  };

  const currentDensity = densityMap[calcAlloy] || 8.0;
  // Volume in cm³ = (L_mm / 10) * (W_mm / 10) * (T_mm / 10)
  const volumeCm3 = (calcLength / 10) * (calcWidth / 10) * (calcThickness / 10);
  const calculatedWeightKg = (volumeCm3 * currentDensity) / 1000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => setSubmitted(false), 4000);
    }, 200);
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px' }} className="bg-tint">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
          <span className="small-label label-gold">24/7 Technical Support &amp; Quotes</span>
          <h1 className="section-title" style={{ fontSize: '3rem' }}>
            Get in Touch with Our Metallurgy Experts
          </h1>
          <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>
            Have technical questions about alloy tolerances, heat treatments, or custom enterprise contracts? Our engineering team responds within 2 business hours.
          </p>
        </div>

        {/* 2 Column Layout: Interactive Metal Calculator & Contact Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px' }}>
          {/* Column 1: Contact Form */}
          <div style={{ background: '#ffffff', padding: '40px', borderRadius: '20px', border: '1px solid #edf2f7', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}>
            <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#0f3b5e' }}>
              Send an Inquiry
            </h3>
            <p style={{ color: '#4a5568', fontSize: '0.9rem', marginBottom: '24px' }}>
              Fill out the form below and an assigned metallurgical engineer will contact you promptly.
            </p>

            {submitted ? (
              <div style={{ padding: '30px 20px', textAlign: 'center', background: '#f6f9fc', borderRadius: '12px' }}>
                <CheckCircle2 size={48} color="#e8a817" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: '#0f3b5e', fontSize: '1.3rem' }}>Inquiry Received!</h4>
                <p style={{ color: '#4a5568', fontSize: '0.9rem', marginTop: '8px' }}>
                  Thank you for contacting Jyothi Metals. Reference ticket #JYO-9942 has been dispatched to our support team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Inquiry Category</label>
                  <select
                    className="form-select"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="Enterprise Quote">Enterprise Project Quote</option>
                    <option value="Technical Spec Consultation">Metallurgy / CAD Spec Consultation</option>
                    <option value="Mill Test Certificate">Mill Test Certificate Request</option>
                    <option value="Career Inquiry">Careers & Supply Partnerships</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" required placeholder="John Doe" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" required placeholder="j.doe@company.com" className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Requirement Details *</label>
                  <textarea
                    rows={4}
                    required
                    className="form-textarea"
                    placeholder="Describe your required alloy dimensions, target delivery dates, or technical specifications..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                  Send Inquiry <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Column 2: Interactive Alloy Weight Estimator Tool */}
          <div style={{ background: '#ffffff', padding: '40px', borderRadius: '20px', border: '1px solid #edf2f7', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ background: 'rgba(232, 168, 23, 0.15)', padding: '8px', borderRadius: '8px', color: '#c4880f' }}>
                <Calculator size={22} />
              </div>
              <span className="small-label label-gold" style={{ margin: 0 }}>Interactive Metallurgy Calculator</span>
            </div>

            <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#0f3b5e' }}>
              Sheet &amp; Plate Weight Estimator
            </h3>
            <p style={{ color: '#4a5568', fontSize: '0.9rem', marginBottom: '24px' }}>
              Instantly calculate theoretical shipping weight for metal plates based on dimensions and alloy density.
            </p>

            <div className="form-group">
              <label className="form-label">Select Metal Alloy Density</label>
              <select
                className="form-select"
                value={calcAlloy}
                onChange={(e) => setCalcAlloy(e.target.value)}
              >
                <option value="Stainless 316L (8.00 g/cm³)">Stainless Steel 316L (8.00 g/cm³)</option>
                <option value="Titanium Ti-6Al-4V (4.43 g/cm³)">Titanium Ti-6Al-4V (4.43 g/cm³)</option>
                <option value="Structural Steel A36 (7.85 g/cm³)">Structural Carbon Steel (7.85 g/cm³)</option>
                <option value="Aluminum 6061-T6 (2.70 g/cm³)">Aluminum 6061-T6 (2.70 g/cm³)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Length (mm)</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  value={calcLength}
                  onChange={(e) => setCalcLength(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Width (mm)</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  value={calcWidth}
                  onChange={(e) => setCalcWidth(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Thickness (mm)</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  value={calcThickness}
                  onChange={(e) => setCalcThickness(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
            </div>

            {/* Calculated Weight Result Card */}
            <div style={{ background: 'linear-gradient(135deg, #0f3b5e 0%, #1a5a8a 100%)', color: '#ffffff', borderRadius: '14px', padding: '24px', marginTop: 'auto', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
                Theoretical Unit Weight
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#e8a817', margin: '4px 0' }}>
                {calculatedWeightKg.toFixed(2)} <span style={{ fontSize: '1.2rem', color: '#ffffff' }}>kg</span>
              </div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                (~{(calculatedWeightKg * 2.20462).toFixed(2)} lbs per sheet)
              </div>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-nav-cta"
                style={{ width: '100%', marginTop: '16px', padding: '12px' }}
              >
                Request Quote with calculated dimensions
              </button>
            </div>
          </div>
        </div>

        {/* Global Support SLAs & Direct Contacts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #cbd5e1', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Clock size={32} color="#51847D" />
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>2-Hour Response SLA</div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>Dhawal Choudhary: +91 9322281549</div>
            </div>
          </div>
          <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #cbd5e1', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Phone size={32} color="#51847D" />
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>Mumbai Office Hotline</div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>(022) 2380 2758 / 2382 5068</div>
            </div>
          </div>
          <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #cbd5e1', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <MapPin size={32} color="#51847D" />
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>Key Locations</div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>Mumbai &amp; Delhi Branch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
