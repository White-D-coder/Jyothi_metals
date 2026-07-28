import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';

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
  const [quantityKgs, setQuantityKgs] = useState<number>(500);
  const [specs, setSpecs] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ padding: '20px' }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: '32px 36px',
          position: 'relative',
          borderRadius: 0,
          background: '#FFFFFF',
          border: '1px solid #E0E8E8',
          boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
          maxWidth: '660px',
        }}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close quote modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F4F6F8',
            border: '1px solid #E0E8E8',
            cursor: 'pointer',
            color: '#304050',
            transition: 'background 0.2s ease',
          }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '36px 10px' }}>
            <div style={{ width: '60px', height: '60px', background: '#EDF5F4', color: '#588078', borderRadius: 0, border: '1px solid #588078', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={30} />
            </div>
            <h3 className="card-title" style={{ fontSize: '1.5rem', color: '#304050', letterSpacing: '0.6px', marginBottom: '10px' }}>
              QUOTE REQUEST SUBMITTED
            </h3>
            <p style={{ color: '#7C8894', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Thank you, <strong>{name || 'Valued Client'}</strong>. Our metallurgy engineers are reviewing your specs for <strong>{quantityKgs} Kgs</strong> of {material}. We will respond within 2 business hours.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: '#304050', letterSpacing: '0.6px', marginBottom: '6px', lineHeight: 1.2 }}>
              Request a Precision Quote
            </h2>
            <p style={{ color: '#7C8894', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '24px', letterSpacing: '0.3px' }}>
              Configure your material specifications below for an instant preliminary estimate and formal quote request.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="grid-responsive-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="modal-material" className="form-label" style={{ letterSpacing: '0.6px', fontSize: '0.8rem', fontWeight: 700, color: '#304050', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Metal Material / Grade
                  </label>
                  <select
                    id="modal-material"
                    className="form-select"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    style={{ borderRadius: 0, padding: '10px 12px', letterSpacing: '0.4px', fontSize: '0.88rem' }}
                  >
                    <option value="Stainless Steel 316L">Stainless Steel 316L / 304</option>
                    <option value="Titanium Alloy Ti-6Al-4V">Titanium Alloy Ti-6Al-4V (Grade 5)</option>
                    <option value="Structural Steel Heavy Beams">Structural Steel (A36 / S355)</option>
                    <option value="Precision Aerospace Components">Precision Aerospace CNC Alloy</option>
                    <option value="Aluminum 6061-T6 Extrusions">Aluminum 6061-T6 / 7075</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="modal-shape" className="form-label" style={{ letterSpacing: '0.6px', fontSize: '0.8rem', fontWeight: 700, color: '#304050', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Product Form Factor
                  </label>
                  <select
                    id="modal-shape"
                    className="form-select"
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    style={{ borderRadius: 0, padding: '10px 12px', letterSpacing: '0.4px', fontSize: '0.88rem' }}
                  >
                    <option value="Pipes / Tubing">Seamless Pipes &amp; Tubing</option>
                    <option value="Plates / Sheets">Heavy Plates &amp; Rolled Sheets</option>
                    <option value="Beams / Channels">I-Beams &amp; Structural Channels</option>
                    <option value="Custom CNC Machined">Custom CNC Machined Components</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-quantity" className="form-label" style={{ letterSpacing: '0.6px', fontSize: '0.8rem', fontWeight: 700, color: '#304050', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Required Quantity (Kgs)
                </label>
                <input
                  id="modal-quantity"
                  type="number"
                  min="1"
                  max="100000"
                  className="form-input"
                  value={quantityKgs}
                  onChange={(e) => setQuantityKgs(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{ borderRadius: 0, padding: '10px 12px', letterSpacing: '0.4px', fontSize: '0.88rem' }}
                />
              </div>

              <div className="grid-responsive-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="modal-name" className="form-label" style={{ letterSpacing: '0.6px', fontSize: '0.8rem', fontWeight: 700, color: '#304050', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Your Full Name *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ borderRadius: 0, padding: '10px 12px', letterSpacing: '0.4px', fontSize: '0.88rem' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modal-email" className="form-label" style={{ letterSpacing: '0.6px', fontSize: '0.8rem', fontWeight: 700, color: '#304050', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Corporate Email *
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="r.sharma@lnttech.com"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderRadius: 0, padding: '10px 12px', letterSpacing: '0.4px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-company" className="form-label" style={{ letterSpacing: '0.6px', fontSize: '0.8rem', fontWeight: 700, color: '#304050', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Company / Industry
                </label>
                <input
                  id="modal-company"
                  type="text"
                  placeholder="e.g. L&amp;T Heavy Engineering / Defense"
                  className="form-input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{ borderRadius: 0, padding: '10px 12px', letterSpacing: '0.4px', fontSize: '0.88rem' }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-specs" className="form-label" style={{ letterSpacing: '0.6px', fontSize: '0.8rem', fontWeight: 700, color: '#304050', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Custom Specifications &amp; Tolerance Notes
                </label>
                <textarea
                  id="modal-specs"
                  rows={3}
                  className="form-textarea"
                  placeholder="Specify custom outer diameter, wall thickness, heat treatments, or ASTM certification requirements..."
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  style={{ borderRadius: 0, padding: '10px 12px', letterSpacing: '0.4px', fontSize: '0.88rem' }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#588078',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 0,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.7px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  marginTop: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                Submit Quote Request <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
