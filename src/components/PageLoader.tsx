import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
        position: 'relative',
        zIndex: 100,
      }}
    >
      <style>{`
        @keyframes loaderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loaderPulse {
          0%, 100% { opacity: 0.6; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Ring Spinner & Branding Core */}
      <div style={{ position: 'relative', width: '72px', height: '72px', marginBottom: '24px' }}>
        {/* Outer Rotating Ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid #E0E8E8',
            borderTopColor: '#588078',
            borderRightColor: '#588078',
            animation: 'loaderSpin 0.9s cubic-bezier(0.5, 0, 0.5, 1) infinite',
          }}
        />
        {/* Inner Pulsing Core */}
        <div
          style={{
            position: 'absolute',
            inset: '14px',
            borderRadius: '50%',
            background: 'rgba(88, 128, 120, 0.12)',
            border: '1px solid #588078',
            animation: 'loaderPulse 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Brand Title */}
      <div
        style={{
          fontSize: '0.82rem',
          fontWeight: 800,
          color: '#304050',
          letterSpacing: '1.8px',
          textTransform: 'uppercase',
          marginBottom: '6px',
        }}
      >
        JYOTI METAL INDIA
      </div>

      {/* Subtext */}
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#7C8894',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
        }}
      >
        LOADING METALLURGICAL ENGINE...
      </div>
    </div>
  );
};

export default PageLoader;
