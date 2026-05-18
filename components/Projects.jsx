/* global React */
const { useState: useProjState } = React;

const PROJECTS = [
  {
    key: 'pml',
    eyebrow: 'Research · in progress',
    title: 'Perfectly Matched Layer,\nas a polar solid',
    sub: 'Long-time stability of elastic-wave PML, viewed through an effective-medium lens.',
    diameter: 320,
    fill: 'radial-gradient(circle at 30% 28%, #F1ECE3 0%, #CF4500 55%, #2A0F04 100%)',
    role: 'Solo research · SNU Structural Analysis Lab',
    year: '2025 – present',
    detail: {
      summary: 'I re-interpret the PML coordinate transformation as a transversely isotropic polar medium. Strain energy decomposes into four blocks; one of them — the shear–rotation block — is provably indefinite whenever attenuation is active. From the normal block I derive a material-dependent stability condition that improves on the empirical version by Goh et al. (2025).',
      bullets: [
        'Reframed PML stiffness as a polar TI medium with 8 material parameters',
        'Proved the shear–rotation block always has det ≤ 0 when β ≠ 0',
        'Derived α ≥ κ(ν)·β/ω − 1 with κ(ν) = 2ν / √(2(1+ν)(1−2ν))',
        'Showed empirical condition matches the κ = 1 case (ν ≈ 0.387)',
      ],
      tag: 'In progress',
    },
  },
  {
    key: 'meal',
    eyebrow: 'Personal project · 2024',
    title: 'A smarter line\nfor SNU cafeterias',
    sub: 'Remote meal-ticket purchase and a digital waitlist for the campus dining halls.',
    diameter: 260,
    fill: 'radial-gradient(circle at 30% 28%, #F4F4F4 0%, #565656 60%, #141413 100%)',
    role: 'Solo build · over winter break',
    year: '2024',
    detail: {
      summary: 'I noticed the same queue forms at the same hall every weekday at noon. So I prototyped a service that lets students buy tickets ahead of time and join a waitlist that texts them when their turn is close — borrowed straight from the restaurant industry.',
      bullets: [
        'Ticketing + waitlist registration as a single flow',
        'Designed around real cafeteria throughput, not theoretical demand',
        'Built end-to-end as a personal project — no team, no deadline',
      ],
      tag: 'Side project',
      link: { label: 'snu-table.vercel.app', href: 'https://snu-table.vercel.app/' },
    },
  },
  {
    key: 'travel',
    eyebrow: 'Hackathon · DWNC 8th',
    title: 'Where can I go\nfor this much?',
    sub: 'A budget-first travel recommender built on Bubble during an internal hackathon.',
    diameter: 240,
    fill: 'radial-gradient(circle at 32% 30%, #F1ECE3 0%, #BFA38C 60%, #6B4F38 100%)',
    role: 'Internal hackathon · DWNC 8th',
    year: '2024',
    detail: {
      summary: 'Most travel sites ask where you want to go and then quote a price. We flipped the question — give us your budget, we suggest destinations that fit. Built on Bubble during a 48-hour internal hackathon hosted by DWNC, the student developer society.',
      bullets: [
        'Budget → destinations, not destinations → price',
        'Shipped a working prototype during the hackathon window',
        'My first serious experiment with no-code as a real medium',
      ],
      tag: 'Made with Bubble',
      link: { label: 'Open in Bubble', href: 'https://bubble.io/page?id=dwnc-project-21194&tab=Design&name=index' },
    },
  },
];

function ProjectPortrait({ p, onOpen }) {
  return (
    <div style={{ width: p.diameter, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <button
        onClick={() => onOpen(p.key)}
        aria-label={`Open ${p.title.replace('\n', ' ')}`}
        style={{
          position: 'relative',
          width: p.diameter, height: p.diameter,
          borderRadius: '50%', overflow: 'visible',
          border: 0, padding: 0, cursor: 'pointer',
          background: 'transparent',
        }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: p.fill,
          transition: 'transform 240ms cubic-bezier(0.2,0.8,0.2,1)',
        }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}/>
        <div style={{
          position: 'absolute', right: 6, bottom: 16,
          width: 56, height: 56, borderRadius: '50%',
          background: '#fff', color: 'var(--ink)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M9 7h8v8"/>
          </svg>
        </div>
      </button>
      <div>
        <span className="eyebrow">{p.eyebrow}</span>
        <h3 style={{ marginTop: 12, whiteSpace: 'pre-line' }}>{p.title}</h3>
        <p style={{ marginTop: 10, color: 'var(--ink-graphite)', fontSize: 15, lineHeight: '22px' }}>
          {p.sub}
        </p>
      </div>
    </div>
  );
}

function Projects({ onOpen }) {
  return (
    <section id="projects" style={{
      position: 'relative',
      maxWidth: 1280, margin: '0 auto',
      padding: '120px 48px 96px',
      minHeight: 880,
    }}>
      {/* Ghost watermark */}
      <div style={{
        position: 'absolute', top: 88, left: 48,
        fontSize: 140, lineHeight: 0.95, fontWeight: 500,
        letterSpacing: '-2.8px', color: 'var(--canvas-whisper)',
        pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
      }}>
        Things I've shipped.
      </div>

      {/* Section heading */}
      <div style={{ position: 'relative', maxWidth: 620, marginBottom: 24 }}>
        <span className="eyebrow">Projects</span>
        <h2 style={{ marginTop: 14 }}>
          Three projects — one in the lab, two in the wild.
        </h2>
      </div>

      {/* Constellation */}
      <div style={{ position: 'relative', height: 760, marginTop: 32 }}>
        {/* Arcs */}
        <svg
          width="100%" height="760"
          viewBox="0 0 1184 760" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          <path d="M340 200 C 520 80, 740 90, 880 180"
            stroke="var(--orbit-amber)" strokeWidth="1.25" fill="none" strokeLinecap="round"/>
          <path d="M280 460 C 380 600, 600 640, 820 480"
            stroke="var(--orbit-amber)" strokeWidth="1.25" fill="none" strokeLinecap="round"/>
          <path d="M340 380 C 520 480, 680 460, 820 350"
            stroke="var(--orbit-amber)" strokeWidth="1.25" fill="none" strokeLinecap="round"
            strokeDasharray="2 6"/>
        </svg>

        {/* Project 1 — large, left-bottom */}
        <div style={{ position: 'absolute', top: 200, left: 20 }}>
          <ProjectPortrait p={PROJECTS[0]} onOpen={onOpen}/>
        </div>
        {/* Project 2 — top-center-right */}
        <div style={{ position: 'absolute', top: 40, left: 560 }}>
          <ProjectPortrait p={PROJECTS[1]} onOpen={onOpen}/>
        </div>
        {/* Project 3 — bottom-right */}
        <div style={{ position: 'absolute', top: 380, left: 880 }}>
          <ProjectPortrait p={PROJECTS[2]} onOpen={onOpen}/>
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ projectKey, onClose }) {
  if (!projectKey) return null;
  const p = PROJECTS.find(x => x.key === projectKey);
  if (!p) return null;

  return (
    <div role="dialog" onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(20,20,19,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 80,
        padding: 32,
      }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--canvas-lifted)', borderRadius: 40,
        padding: 48,
        maxWidth: 720, width: '100%',
        boxShadow: '0 70px 110px rgba(0,0,0,0.25)',
        position: 'relative',
        maxHeight: '88vh', overflowY: 'auto',
      }}>
        <button onClick={onClose} aria-label="Close"
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--canvas)', border: 0, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink)',
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: p.fill, flexShrink: 0,
          }}/>
          <div>
            <span className="eyebrow">{p.eyebrow}</span>
            <h2 style={{ marginTop: 8, whiteSpace: 'pre-line', fontSize: 36, lineHeight: '40px' }}>
              {p.title}
            </h2>
          </div>
        </div>

        <p style={{ color: 'var(--ink-charcoal)', fontSize: 16, lineHeight: '26px',
          marginBottom: 24 }}>
          {p.detail.summary}
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
          padding: '20px 0', marginBottom: 24,
          borderTop: '1px solid var(--border-soft)',
          borderBottom: '1px solid var(--border-soft)',
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
              textTransform: 'uppercase', color: 'var(--ink-slate)', marginBottom: 6 }}>Role</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{p.role}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
              textTransform: 'uppercase', color: 'var(--ink-slate)', marginBottom: 6 }}>When</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{p.year}</div>
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
          textTransform: 'uppercase', color: 'var(--ink-slate)', marginBottom: 12 }}>
          What I did
        </div>
        <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
          {p.detail.bullets.map((b, i) => (
            <li key={i} style={{
              padding: '10px 0',
              borderTop: i === 0 ? 'none' : '1px solid var(--border-soft)',
              display: 'flex', gap: 12, alignItems: 'flex-start',
              fontSize: 15, lineHeight: '22px',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--orbit-amber)', marginTop: 8, flexShrink: 0,
              }}/>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {p.detail.link && (
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
              textTransform: 'uppercase', color: 'var(--ink-slate)', marginBottom: 12 }}>
              Live link
            </div>
            <a href={p.detail.link.href}
               target="_blank" rel="noopener noreferrer"
               style={{
                 display: 'inline-flex', alignItems: 'center', gap: 10,
                 background: 'var(--ink)', color: 'var(--canvas)',
                 borderRadius: 999, padding: '10px 18px 10px 20px',
                 textDecoration: 'none',
                 fontSize: 14, fontWeight: 500, letterSpacing: '-0.3px',
               }}>
              {p.detail.link.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Projects, ProjectModal, PROJECTS });
