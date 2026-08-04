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
    title: 'Open Die & Closed Die Forging',
    shortTitle: 'Forging',
    path: '/services/forging',
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
  /** Set to false on the service pages to hide the Quality Policy / Certifications tabs. */
  showQualityTabs?: boolean;
}

export const CapabilityNav: React.FC<CapabilityNavProps> = ({ currentPath, showQualityTabs = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = currentPath || location.pathname;
  const navItems = showQualityTabs
    ? CAPABILITY_NAV_ITEMS
    : CAPABILITY_NAV_ITEMS.filter((item) => item.category === 'capability');

  return (
    <nav
      aria-label="Capabilities & Quality Sub-Navigation"
      style={{
        position: 'sticky',
        top: '72px',
        zIndex: 900,
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
      }}
    >
      <style>{`
        .slash-nav-btn {
          background: transparent;
          border: none;
          color: #475569;
          font-size: clamp(0.7rem, 0.85vw, 0.8rem);
          font-weight: 600;
          cursor: pointer;
          padding: 14px 10px;
          position: relative;
          transition: color 150ms ease;
          white-space: nowrap;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          flex-shrink: 0;
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
          left: 6px;
          right: 6px;
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
          color: #94a3b8;
          opacity: 0.6;
          font-size: 0.95rem;
          font-weight: 300;
          font-style: italic;
          user-select: none;
          transform: skewX(-18deg);
          display: inline-block;
          margin: 0 1px;
          flex-shrink: 0;
        }
        .capability-nav-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        className="capability-nav-scroll"
        style={{
          width: '100%',
          padding: '0 12px',
          boxSizing: 'border-box',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            width: 'max-content',
            margin: '0 auto',
            minWidth: '100%',
          }}
        >
          {navItems.map((item, index) => {
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
