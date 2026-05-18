/* global React */

function Footer() {
  const cols = [
    {
      head: 'Research',
      links: [
        { label: 'PML — polar effective medium', href: '#research' },
        { label: 'Structural Analysis Lab ↗', href: 'https://hgoh.gitlab.io/' },
        { label: 'CV (PDF)', href: '#' },
      ],
    },
    {
      head: 'Builds',
      links: [
        { label: 'Travel recommender ↗', href: 'https://bubble.io/page?id=dwnc-project-21194&tab=Design&name=index' },
        { label: 'SNU meal-ticket service ↗', href: 'https://snu-table.vercel.app/' },
        { label: 'DWNC developer society ↗', href: 'https://www.dwnc.kr/' },
      ],
    },
    {
      head: 'Find me',
      links: [
        { label: 'junkyo0312@snu.ac.kr', href: 'mailto:junkyo0312@snu.ac.kr' },
        { label: 'GitHub ↗', href: 'https://github.com/junkyo0312-bot' },
        { label: 'Google Scholar ↗', href: '#' },
        { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/%EC%A4%80%EA%B5%90-%EC%84%9C-22073a3a8/' },
      ],
    },
  ];

  return (
    <footer id="contact" style={{
      background: 'var(--ink)', color: '#fff',
      padding: '120px 48px 56px',
      marginTop: 96,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <span className="eyebrow" style={{ color: '#fff' }}>• Get in touch</span>
        <h2 style={{ color: '#fff', maxWidth: 820,
          fontSize: 56, lineHeight: '60px', marginTop: 18,
          letterSpacing: '-1.12px' }}>
          Working on something<br/>
          adjacent? I'd love a note.
        </h2>

        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <a href="mailto:junkyo0312@snu.ac.kr"
             className="btn"
             style={{
               background: '#F3F0EE', color: '#141413',
               borderColor: '#F3F0EE',
             }}>
            junkyo0312@snu.ac.kr
          </a>
          <a href="#"
             className="btn btn-secondary"
             style={{
               background: 'transparent', color: '#F3F0EE',
               borderColor: '#F3F0EE',
             }}>
            Download CV
          </a>
        </div>

        {/* Columns */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
          marginTop: 88,
        }}>
          {cols.map(col => (
            <div key={col.head}>
              <div style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '0.5px',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
                marginBottom: 16,
              }}>{col.head}</div>
              {col.links.map(l => {
                const external = l.href.startsWith('http');
                return (
                  <a key={l.label} href={l.href}
                     target={external ? '_blank' : undefined}
                     rel={external ? 'noopener noreferrer' : undefined}
                     style={{
                       display: 'block', color: '#fff',
                       fontSize: 14, fontWeight: 450, padding: '6px 0',
                       opacity: 0.92, textDecoration: 'none',
                     }}>{l.label}</a>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{
          height: 1, background: 'rgba(255,255,255,0.18)',
          margin: '56px 0 24px',
        }}/>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, color: 'rgba(255,255,255,0.7)', fontSize: 13, flexWrap: 'wrap',
        }}>
          <span>
            © 2026 Junkyo Seo · Structural Analysis Lab, Seoul National University.
          </span>
          <span style={{
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: 999, padding: '6px 16px', color: '#fff',
            fontSize: 13,
          }}>Seoul · 서울</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
