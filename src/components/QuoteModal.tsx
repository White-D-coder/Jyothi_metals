import React, { useState } from 'react';
import { X, CheckCircle, Calculator, Send } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialProduct = 'Stainless Steel 316L',
}) => {
  const [material, setMaterial] = useState(initialProduct);
  const [shape, setShape] = useState('Pipes / Tubing');
  const [quantityTons, setQuantityTons] = useState<number>(5);
  const [specs, setSpecs] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Simple alloy price estimator algorithm (USD per Ton)
  const pricePerTonMap: Record<string, number> = {
    'Stainless Steel 316L': 3800,
    'Titanium Alloy Ti-6Al-4V': 24500,
    'Structural Steel Heavy Beams': 1250,
    'Precision Aerospace Components': 18900,
    'Aluminum 6061-T6 Extrusions': 2900,
  };

  const unitPrice = pricePerTonMap[material] || 3500;
  const estimatedTotal = unitPrice * quantityTons;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3s
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '70px', height: '70px', background: 'rgba(232, 168, 23, 0.15)', color: '#e8a817', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={40} />
            </div>
            <h3 className="card-title" style={{ fontSize: '1.8rem', color: '#51847D' }}>Quote Request Submitted!</h3>
            <p style={{ color: '#4a5568', marginTop: '10px' }}>
              Thank you, <strong>{name || 'Valued Client'}</strong>. Our metallurgy engineers are reviewing your specs for <strong>{quantityTons} Tons</strong> of {material}. We will respond within 2 business hours.
            </p>
            <div style={{ background: '#f6f9fc', borderRadius: '12px', padding: '16px', marginTop: '20px', fontSize: '0.9rem', color: '#51847D', fontWeight: 600 }}>
              Estimated Project Value: ${estimatedTotal.toLocaleString()} USD
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ background: 'rgba(15, 59, 94, 0.08)', padding: '8px', borderRadius: '8px', color: '#51847D' }}>
                <Calculator size={22} />
              </div>
              <span className="small-label label-gold" style={{ marginBottom: 0 }}>Instant Metallurgy Specifier</span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Request a Precision Quote</h2>
            <p style={{ color: '#4a5568', fontSize: '0.95rem', marginBottom: '24px' }}>
              Configure your material specifications below for an instant preliminary estimate and formal quote request.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Alloy & Shape Selector */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Metal Material / Grade</label>
                  <select
                    className="form-select"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  >
                    <option value="Stainless Steel 316L">Stainless Steel 316L / 304</option>
                    <option value="Titanium Alloy Ti-6Al-4V">Titanium Alloy Ti-6Al-4V (Grade 5)</option>
                    <option value="Structural Steel Heavy Beams">Structural Steel (A36 / S355)</option>
                    <option value="Precision Aerospace Components">Precision Aerospace CNC Alloy</option>
                    <option value="Aluminum 6061-T6 Extrusions">Aluminum 6061-T6 / 7075</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Product Form Factor</label>
                  <select
                    className="form-select"
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                  >
                    <option value="Pipes / Tubing">Seamless Pipes & Tubing</option>
                    <option value="Plates / Sheets">Heavy Plates & Rolled Sheets</option>
                    <option value="Beams / Channels">I-Beams & Structural Channels</option>
                    <option value="Custom CNC Machined">Custom CNC Machined Components</option>
                  </select>
                </div>
              </div>

              {/* Quantity & Interactive Price Estimation Box */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
                <div className="form-group">
                  <label className="form-label">Required Quantity (Tons)</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    className="form-input"
                    value={quantityTons}
                    onChange={(e) => setQuantityTons(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>

                <div style={{ background: '#f6f9fc', border: '1px solid #edf2f7', padding: '12px 16px', borderRadius: '10px', marginTop: '4px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4a5568', textTransform: 'uppercase' }}>Est. Material Budget</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#51847D' }}>
                    ${estimatedTotal.toLocaleString()} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>USD</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="s.jenkins@aerospace.com"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Company / Industry</label>
                <input
                  type="text"
                  placeholder="e.g. Lockheed Martin / Defense"
                  className="form-input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Custom Specifications & Tolerance Notes</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  placeholder="Specify custom outer diameter, wall thickness, heat treatments, or ASTM certification requirements..."
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', background: '#51847D' }}>
                Submit Quote Request <Send size={18} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
