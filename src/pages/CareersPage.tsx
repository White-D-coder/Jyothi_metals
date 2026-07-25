import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  GraduationCap,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Wallet,
  HeartPulse,
  Wrench,
  Home,
  Award,
  PiggyBank,
  MapPin,
  Briefcase,
  Building2,
  Mail,
} from 'lucide-react';

interface CareersPageProps {
  onOpenQuoteModal: () => void;
  onNavigate?: (tab: string) => void;
}

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  requirements: string[];
}

export const CareersPage: React.FC<CareersPageProps> = ({ onOpenQuoteModal, onNavigate }) => {
  const [openJob, setOpenJob] = useState<number>(-1);

  const values = [
    {
      icon: <GraduationCap size={24} />,
      title: 'Learn From Master Metallurgists',
      desc: 'Work shoulder-to-shoulder with engineers holding 30+ years of casting, alloy and heat-treatment expertise.',
    },
    {
      icon: <Cpu size={24} />,
      title: 'Cutting-Edge Equipment',
      desc: 'Operate multi-axis TruLaser cells, vacuum arc furnaces and spectral labs that set the industry benchmark.',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Growth & Certification Sponsorship',
      desc: 'We fund the NDT, welding and quality certifications that accelerate your career and technical mastery.',
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Safety-First Culture',
      desc: 'A zero-compromise safety program with modern PPE, training and controls protects every person on the floor.',
    },
  ];

  const benefits = [
    { icon: <Wallet size={22} color="#51847D" />, label: 'Competitive Pay' },
    { icon: <HeartPulse size={22} color="#51847D" />, label: 'Health Insurance' },
    { icon: <Wrench size={22} color="#51847D" />, label: 'Skill Training' },
    { icon: <Home size={22} color="#51847D" />, label: 'Relocation Support' },
    { icon: <Award size={22} color="#51847D" />, label: 'Performance Bonuses' },
    { icon: <PiggyBank size={22} color="#51847D" />, label: 'Provident Fund' },
  ];

  const jobs: JobPosting[] = [
    {
      id: 1,
      title: 'Senior Metallurgical Engineer',
      department: 'Engineering',
      location: 'Mumbai',
      type: 'Full-Time',
      summary:
        'Lead alloy development and process optimisation across our continuous casting and vacuum arc remelting lines, ensuring every heat-lot meets aerospace-grade specifications.',
      requirements: [
        'B.Tech / M.Tech in Metallurgical or Materials Engineering.',
        '8+ years in ferrous and non-ferrous alloy production.',
        'Deep knowledge of grain structure, heat treatment and NDT methods.',
        'Experience with EN 10204 3.1 / 3.2 certification workflows.',
      ],
    },
    {
      id: 2,
      title: 'CNC Laser Operator',
      department: 'Production',
      location: 'Mumbai Plant',
      type: 'Full-Time',
      summary:
        'Set up and run multi-axis TruLaser cutting cells to produce sub-micron tolerance profiles directly from customer CAD files with full heat-lot traceability.',
      requirements: [
        'ITI / Diploma in Mechanical or Production engineering.',
        '3+ years operating CNC laser or milling equipment.',
        'Ability to read GD&T drawings and interpret CAD/CAM files.',
        'Strong commitment to safety and dimensional accuracy.',
      ],
    },
    {
      id: 3,
      title: 'Quality Assurance Inspector',
      department: 'Quality',
      location: 'Mumbai',
      type: 'Full-Time',
      summary:
        'Perform spectral chemistry, tensile, impact and ultrasonic NDT inspections, validating every batch against international standards before dispatch.',
      requirements: [
        'Diploma / Degree in Mechanical, Metallurgy or Quality engineering.',
        'ASNT Level II certification in UT / RT preferred.',
        'Hands-on experience with PMI and spectrometry equipment.',
        'Meticulous documentation and Mill Test Certificate reporting.',
      ],
    },
    {
      id: 4,
      title: 'Sales Engineer - Alloys',
      department: 'Sales',
      location: 'Delhi',
      type: 'Full-Time',
      summary:
        'Own technical B2B relationships across oil & gas, aerospace and infrastructure clients, translating engineering requirements into grade-specific alloy solutions.',
      requirements: [
        'B.E. / B.Tech with strong metallurgical fundamentals.',
        '4+ years in industrial or B2B technical sales.',
        'Confident presenting to procurement and engineering teams.',
        'Willingness to travel to client sites across the region.',
      ],
    },
    {
      id: 5,
      title: 'Supply Chain Coordinator',
      department: 'Logistics',
      location: 'Mumbai',
      type: 'Full-Time',
      summary:
        'Coordinate port-side inventory, container dispatch and real-time tracking to guarantee our 48-hour global turnaround commitment.',
      requirements: [
        'Degree in Supply Chain, Logistics or Operations Management.',
        '3+ years in manufacturing or export logistics.',
        'Familiarity with ERP systems and inventory planning.',
        'Excellent coordination and vendor management skills.',
      ],
    },
  ];

  const toggleJob = (id: number) => {
    setOpenJob((prev) => (prev === id ? -1 : id));
  };

  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#475569',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '5px 12px',
    letterSpacing: '0.02em',
  };

  return (
    <div className="inner-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Dark Industrial Hero */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.92) 100%), url("/images/pexels-willians-huerta-2157111846-36397988.jpg")',
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
          <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>
              CAREERS AT JYOTI METAL
            </span>
            <h1
              className="hero-title"
              style={{
                fontSize: '3.4rem',
                color: '#ffffff',
                marginBottom: '24px',
                lineHeight: 1.1,
              }}
            >
              Build the Alloys That Build the World
            </h1>
            <p
              style={{
                fontSize: '1.15rem',
                color: '#cbd5e1',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '680px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Join a team of metallurgists, machinists and engineers shaping the components behind
              aerospace, energy and infrastructure. If you take pride in precision, there is a place
              for you on our floor.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <a
                href="#open-roles"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-accent"
                style={{
                  padding: '16px 36px',
                  fontSize: '1rem',
                  background: '#51847D',
                  borderColor: '#51847D',
                }}
              >
                View Open Roles <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Work With Us — Culture */}
      <section className="section bg-white" style={{ padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
            <span className="small-label">WHY WORK WITH US</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '16px' }}>
              A Culture Engineered for Craftspeople
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
              We invest in the people behind the metal — pairing world-class equipment with mentorship,
              certification and an uncompromising commitment to safety.
            </p>
          </div>

          <div
            className="grid-responsive-4col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}
          >
            {values.map((value) => (
              <div
                key={value.title}
                className="feature-card"
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderTop: '4px solid #51847D',
                  padding: '30px 24px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                }}
              >
                <div className="feature-icon-wrapper">{value.icon}</div>
                <h3
                  className="card-title"
                  style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}
                >
                  {value.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Benefits Strip */}
      <section
        className="section bg-tint"
        style={{ padding: '90px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
            <span className="small-label">BENEFITS & PERKS</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '16px' }}>
              More Than a Paycheck
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
              From day one, every team member is backed by benefits designed to support your health,
              growth and long-term security.
            </p>
          </div>

          <div
            className="grid-responsive-3col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {benefits.map((benefit) => (
              <div
                key={benefit.label}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderLeft: '4px solid #51847D',
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {benefit.icon}
                </div>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  {benefit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Open Positions — Accordion */}
      <section
        id="open-roles"
        className="section bg-white"
        style={{ padding: '90px 0', borderTop: '1px solid #e2e8f0' }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
            <span className="small-label">OPEN POSITIONS</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '16px' }}>
              Current Openings
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '28px' }}>
              Explore the roles we are hiring for right now. Click any position to view the details and apply.
            </p>
            <button
              onClick={onOpenQuoteModal}
              className="btn btn-outline"
              style={{ padding: '14px 30px', fontSize: '0.95rem' }}
            >
              Request a Callback From HR <ChevronRight size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '960px', margin: '0 auto' }}>
            {jobs.map((job) => {
              const isOpen = openJob === job.id;
              const panelId = `job-panel-${job.id}`;
              return (
                <div
                  key={job.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderLeft: '4px solid #51847D',
                    boxShadow: isOpen ? '0 12px 30px rgba(81, 132, 125, 0.12)' : '0 4px 16px rgba(0,0,0,0.03)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  {/* Clickable Header */}
                  <button
                    type="button"
                    onClick={() => toggleJob(job.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '20px',
                      padding: '26px 30px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3
                        className="card-title"
                        style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}
                      >
                        {job.title}
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <span style={chipStyle}>
                          <Building2 size={14} color="#51847D" /> {job.department}
                        </span>
                        <span style={chipStyle}>
                          <MapPin size={14} color="#51847D" /> {job.location}
                        </span>
                        <span style={chipStyle}>
                          <Briefcase size={14} color="#51847D" /> {job.type}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      size={24}
                      color="#51847D"
                      style={{
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </button>

                  {/* Expandable Panel */}
                  {isOpen && (
                    <div
                      id={panelId}
                      style={{
                        padding: '0 30px 30px',
                        borderTop: '1px solid #e2e8f0',
                        marginTop: '-2px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '1rem',
                          color: '#475569',
                          lineHeight: 1.7,
                          margin: '24px 0 24px',
                        }}
                      >
                        {job.summary}
                      </p>

                      <div
                        className="small-label"
                        style={{ color: '#51847D', marginBottom: '16px', display: 'block' }}
                      >
                        Requirements
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                        {job.requirements.map((req) => (
                          <div key={req} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <CheckCircle2 size={20} color="#51847D" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.5 }}>{req}</span>
                          </div>
                        ))}
                      </div>

                      <a
                        className="btn btn-accent"
                        href={`mailto:info@jyotimetal.co.in?subject=Application: ${encodeURIComponent(job.title)}`}
                        style={{
                          padding: '14px 32px',
                          fontSize: '0.95rem',
                          background: '#51847D',
                          borderColor: '#51847D',
                        }}
                      >
                        Apply Now <ArrowRight size={18} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Open Application CTA Band (Dark) */}
      <section
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(6, 18, 33, 0.94) 0%, rgba(6, 18, 33, 0.82) 100%), url("/images/pexels-sergey-sergeev-2153675005-32845683.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          padding: '100px 0',
          borderTop: '3px solid #51847D',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>
              DON&apos;T SEE YOUR ROLE?
            </span>
            <h2 className="section-title" style={{ fontSize: '2.7rem', color: '#ffffff', marginBottom: '20px' }}>
              We Are Always Looking for Great People
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '40px' }}>
              If your skills align with precision metallurgy and manufacturing but you don&apos;t see the
              perfect fit above, send us your resume. We keep every strong application on file for
              upcoming openings.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a
                className="btn btn-accent"
                href="mailto:info@jyotimetal.co.in?subject=Open Application - Resume Submission"
                style={{
                  padding: '16px 36px',
                  fontSize: '1rem',
                  background: '#51847D',
                  borderColor: '#51847D',
                }}
              >
                <Mail size={18} /> Send Your Resume
              </a>
              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="btn btn-outline"
                style={{ padding: '16px 36px', fontSize: '1rem', borderColor: '#77b8b0', color: '#ffffff' }}
              >
                Contact HR <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
