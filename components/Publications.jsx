/* global React */

const ENTRIES = [
  {
    group: 'Talks & seminars',
    items: [
      {
        date: '15 May 2026',
        venue: 'Structural Analysis Lab seminar · Seoul National University',
        title: 'Effective stiffness tensor for the PML: a transversely isotropic representation',
        note: 'Speaker. Material-aware stability condition for the elastic PML.',
        tag: 'Lab seminar',
      },
    ],
  },
];

function Publications() {
  return (
    <section id="publications" style={{
      maxWidth: 1280, margin: '0 auto',
      padding: '120px 48px 32px',
    }}>
      {/* Heading */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 32, flexWrap: 'wrap', marginBottom: 40,
      }}>
        <div style={{ maxWidth: 640 }}>
          <span className="eyebrow">• Outputs</span>
          <h2 style={{ marginTop: 14 }}>
            Publications & talks.
          </h2>
          <p style={{ marginTop: 18, color: 'var(--ink-charcoal)',
            fontSize: 16, lineHeight: '24px' }}>
            Early-career record. Talks below are from the lab seminar series;
            the first manuscript on PML stability is forthcoming.
          </p>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-slate)', fontWeight: 500 }}>
          Last updated · May 2026
        </div>
      </div>

      {/* Entry groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {ENTRIES.map((g) => (
          <div key={g.group}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 16,
            }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
                textTransform: 'uppercase', color: 'var(--ink-slate)',
              }}>{g.group}</span>
              <span style={{ flex: 1, height: 1,
                background: 'var(--border-soft)' }}/>
              <span style={{
                fontSize: 12, color: 'var(--ink-slate)', fontWeight: 500,
              }}>{g.items.length}</span>
            </div>

            <div style={{
              display: 'flex', flexDirection: 'column',
              border: '1px solid var(--border-soft)',
              borderRadius: 20, overflow: 'hidden',
              background: 'var(--canvas-lifted)',
            }}>
              {g.items.map((it, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '180px 1fr auto',
                  gap: 28, padding: '24px 28px',
                  borderTop: i === 0 ? 'none' : '1px solid var(--border-soft)',
                  alignItems: 'baseline',
                }}>
                  <div style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                    fontSize: 13, color: 'var(--ink-graphite)',
                    letterSpacing: '0.2px',
                  }}>{it.date}</div>
                  <div>
                    <div style={{
                      fontSize: 17, fontWeight: 500, letterSpacing: '-0.34px',
                      lineHeight: '24px',
                    }}>{it.title}</div>
                    <div style={{
                      fontSize: 13, color: 'var(--ink-graphite)',
                      marginTop: 6, fontStyle: 'italic',
                    }}>{it.venue}</div>
                    <div style={{
                      fontSize: 13, color: 'var(--ink-slate)',
                      marginTop: 10, lineHeight: '20px',
                    }}>{it.note}</div>
                  </div>
                  <div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      border: '1px solid var(--ink)',
                      borderRadius: 999, padding: '4px 12px',
                      color: 'var(--ink)',
                      whiteSpace: 'nowrap',
                    }}>{it.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Publications });
