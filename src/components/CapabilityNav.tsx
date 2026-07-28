import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export interface NavItem {
  title: string;
  shortTitle: string;
  path: string;
  category: 'capability' | 'quality';
}

export const CAPABILITY_NAV_ITEMS: NavItem[] = [
  {
    title: 'Custom Laser Cutting & Milling',
    shortTitle: 'Laser Cutting & Milling',
    path: '/services/laser-cutting',
    category: 'capability',
  },
  {
    title: 'Continuous Electric Arc Casting',
    shortTitle: 'Electric Arc Casting',
    path: '/services/arc-casting',
    category: 'capability',
  },
  {
    title: 'Ultrasonic Weld Inspection',
    shortTitle: 'Weld Inspection & NDT',
    path: '/services/weld-inspection',
    category: 'capability',
  },
  {
    title: 'Quality Policy & ISO Standards',
    shortTitle: 'Quality Policy & ISO',
    path: '/quality-policy',
    category: 'quality',
  },
  {
    title: 'Certifications & Compliance',
    shortTitle: 'Certifications & MTC',
    path: '/certifications',
    category: 'quality',
  },
];

interface CapabilityNavProps {
  currentPath: string;
}

export const CapabilityNav: React.FC<CapabilityNavProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = currentPath || location.pathname;

  return (
    <nav
      aria-label="Capabilities & Quality Sub-Navigation"
      style={{
        position: 'sticky',
        top: '72px',
        zIndex: 900,
        background: '#FFFFFF',
        borderBottom: '2px solid #588078',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <style>{`
        .slash-nav-btn {
          background: transparent;
          border: none;
          color: #475569;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          padding: 14px 16px;
          position: relative;
          transition: color 150ms ease;
          white-space: nowrap;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .slash-nav-btn:hover,
        .slash-nav-btn.active {
          color: #0F172A;
          font-weight: 700;
        }
        .slash-nav-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 12px;
          right: 12px;
          height: 3px;
          background: #588078;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slash-nav-btn:hover::after,
        .slash-nav-btn.active::after {
          transform: scaleX(1);
        }
        .slash-divider {
          color: #588078;
          opacity: 0.45;
          font-size: 1.1rem;
          font-weight: 300;
          font-style: italic;
          user-select: none;
          transform: skewX(-18deg);
          display: inline-block;
          margin: 0 4px;
        }
      `}</style>

      <div
        className="container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {CAPABILITY_NAV_ITEMS.map((item, index) => {
            const isActive = activePath === item.path;
            return (
              <React.Fragment key={item.path}>
                {index > 0 && <span className="slash-divider">/</span>}
                <button
                  type="button"
                  onClick={() => {
                    navigate(item.path);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`slash-nav-btn ${isActive ? 'active' : ''}`}
                >
                  {item.title}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
