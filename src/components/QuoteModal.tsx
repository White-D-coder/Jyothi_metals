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
    <div className="modal-backdrop" onClick={onClose} style={{ padding: '12px' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', position: 'relative' }}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close quote modal"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            minWidth: '44px',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f1f5f9',
            border: 'none',
            cursor: 'pointer',
            color: '#0f172a',
          }}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(81, 132, 125, 0.15)', color: '#51847D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={36} />
            </div>
            <h3 className="card-title" style={{ fontSize: '1.6rem', color: '#51847D' }}>Quote Request Submitted!</h3>
            <p style={{ color: '#4a5568', marginTop: '10px', fontSize: '0.94rem' }}>
              Thank you, <strong>{name || 'Valued Client'}</strong>. Our metallurgy engineers are reviewing your specs for <strong>{quantityTons} Tons</strong> of {material}. We will respond within 2 business hours.
            </p>
            <div style={{ background: '#edf5f4', border: '1px solid #77b8b0', padding: '14px', marginTop: '20px', fontSize: '0.9rem', color: '#51847D', fontWeight: 700 }}>
              Estimated Project Budget: ${estimatedTotal.toLocaleString()} USD
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ background: 'rgba(81, 132, 125, 0.12)', padding: '6px', color: '#51847D' }}>
                <Calculator size={20} />
              </div>
              <span className="small-label" style={{ marginBottom: 0, color: '#51847D' }}>Instant Metallurgy Specifier</span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Request a Precision Quote</h2>
            <p style={{ color: '#4a5568', fontSize: '0.9rem', marginBottom: '20px' }}>
              Configure your material specifications below for an instant preliminary estimate and formal quote request.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Alloy & Shape Selector */}
              <div className="grid-responsive-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label htmlFor="modal-material" className="form-label">Metal Material / Grade</label>
                  <select
                    id="modal-material"
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
                  <label htmlFor="modal-shape" className="form-label">Product Form Factor</label>
                  <select
                    id="modal-shape"
                    className="form-select"
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                  >
                    <option value="Pipes / Tubing">Seamless Pipes &amp; Tubing</option>
                    <option value="Plates / Sheets">Heavy Plates &amp; Rolled Sheets</option>
                    <option value="Beams / Channels">I-Beams &amp; Structural Channels</option>
                    <option value="Custom CNC Machined">Custom CNC Machined Components</option>
                  </select>
                </div>
              </div>

              {/* Quantity & Interactive Price Estimation Box */}
              <div className="grid-responsive-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', alignItems: 'center' }}>
                <div className="form-group">
                  <label htmlFor="modal-quantity" className="form-label">Required Quantity (Tons)</label>
                  <input
                    id="modal-quantity"
                    type="number"
                    min="1"
                    max="1000"
                    className="form-input"
                    value={quantityTons}
                    onChange={(e) => setQuantityTons(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>

                <div style={{ background: '#edf5f4', border: '1px solid #cbd5e1', padding: '10px 14px', marginTop: '4px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4a5568', textTransform: 'uppercase' }}>Est. Material Budget</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#51847D' }}>
                    ${estimatedTotal.toLocaleString()} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>USD</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid-responsive-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label htmlFor="modal-name" className="form-label">Your Full Name *</label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modal-email" className="form-label">Corporate Email *</label>
                  <input
                    id="modal-email"
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
                <label htmlFor="modal-company" className="form-label">Company / Industry</label>
                <input
                  id="modal-company"
                  type="text"
                  placeholder="e.g. Lockheed Martin / Defense"
                  className="form-input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-specs" className="form-label">Custom Specifications &amp; Tolerance Notes</label>
                <textarea
                  id="modal-specs"
                  rows={3}
                  className="form-textarea"
                  placeholder="Specify custom outer diameter, wall thickness, heat treatments, or ASTM certification requirements..."
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', background: '#51847D', minHeight: '44px' }}>
                Submit Quote Request <Send size={18} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
