/* global React */
const { useMemo: useHeroMemo } = React;

function PMLSchematic() {
  // Wave: full amplitude in interior, exponentially decaying inside PML.
  const wavePath = useHeroMemo(() => {
    const pts = [];
    const N = 240;
    const xs = 40, xe = 322;
    const xi = 198;
    const amp = 56;
    const lambda = 46;
    const decay = 34;
    for (let i = 0; i <= N; i++) {
      const x = xs + (xe - xs) * (i / N);
      const a = x <= xi ? amp : amp * Math.exp(-(x - xi) / decay);
      const y = 188 - a * Math.sin((x - xs) * 2 * Math.PI / lambda);
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return 'M ' + pts.join(' L ');
  }, []);

  const envelopeUpper = useHeroMemo(() => {
    const pts = [];
    const N = 60;
    const xi = 198, xe = 322, amp = 56, decay = 34;
    for (let i = 0; i <= N; i++) {
      const x = xi + (xe - xi) * (i / N);
      const a = amp * Math.exp(-(x - xi) / decay);
      pts.push(`${x.toFixed(2)},${(188 - a).toFixed(2)}`);
    }
    return 'M ' + pts.join(' L ');
  }, []);
  const envelopeLower = useHeroMemo(() => {
    const pts = [];
    const N = 60;
    const xi = 198, xe = 322, amp = 56, decay = 34;
    for (let i = 0; i <= N; i++) {
      const x = xi + (xe - xi) * (i / N);
      const a = amp * Math.exp(-(x - xi) / decay);
      pts.push(`${x.toFixed(2)},${(188 + a).toFixed(2)}`);
    }
    return 'M ' + pts.join(' L ');
  }, []);

  return (
    <svg viewBox="0 0 360 360" width="360" height="360"
      style={{ display: 'block' }}>
      <defs>
        <clipPath id="hero-circle">
          <circle cx="180" cy="180" r="178"/>
        </clipPath>
      </defs>
      <g clipPath="url(#hero-circle)">
        {/* Cream-whisper field */}
        <rect width="360" height="360" fill="var(--canvas-whisper)"/>

        {/* Dotted grid */}
        <g fill="rgba(20,20,19,0.18)">
          {Array.from({ length: 14 }).map((_, i) =>
            Array.from({ length: 14 }).map((_, j) => (
              <circle key={`d${i}-${j}`}
                cx={28 + i * 24} cy={28 + j * 24} r="0.7"/>
            ))
          )}
        </g>

        {/* Decay envelope */}
        <path d={envelopeUpper}
          stroke="var(--orbit-rust)" strokeWidth="1.25"
          strokeDasharray="3 4" fill="none" opacity="0.85"/>
        <path d={envelopeLower}
          stroke="var(--orbit-rust)" strokeWidth="1.25"
          strokeDasharray="3 4" fill="none" opacity="0.85"/>

        {/* PML interface line */}
        <line x1="198" y1="40" x2="198" y2="320"
          stroke="var(--ink)" strokeWidth="1"
          strokeDasharray="2 6" opacity="0.6"/>

        {/* x-axis */}
        <line x1="40" y1="188" x2="322" y2="188"
          stroke="var(--ink)" strokeWidth="1" opacity="0.35"/>

        {/* Wave */}
        <path d={wavePath}
          stroke="var(--ink)" strokeWidth="2.2"
          fill="none" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Region labels */}
        <text x="118" y="64" textAnchor="middle"
          fontSize="10" fontWeight="700" letterSpacing="1.2"
          fill="var(--ink-slate)">INTERIOR DOMAIN</text>
        <text x="260" y="64" textAnchor="middle"
          fontSize="10" fontWeight="700" letterSpacing="1.2"
          fill="var(--orbit-rust)">PML REGION</text>

        {/* Coordinate stretch annotation */}
        <text x="180" y="316" textAnchor="middle"
          fontSize="11"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          fill="var(--ink-graphite)" letterSpacing="0.2">
          Λ = diag(a, 1, 1),  a = α + iβ/ω
        </text>

        {/* Small tick at interface */}
        <circle cx="198" cy="188" r="3"
          fill="var(--surface-white)" stroke="var(--ink)" strokeWidth="1.5"/>
      </g>

      {/* Outer circle */}
      <circle cx="180" cy="180" r="178"
        fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

function Hero({ onJump }) {
  return (
    <section id="top" style={{
      position: 'relative',
      padding: '88px 48px 32px',
      maxWidth: 1280, margin: '0 auto'
    }}>
      {/* Ghost watermark */}
      <div style={{
        position: 'absolute', top: 72, right: 48,
        fontSize: 140, lineHeight: 0.9, fontWeight: 500,
        letterSpacing: '-2.8px', color: 'var(--canvas-whisper)',
        pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
        textAlign: 'right'
      }}>
        Structural<br />analysis.
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 64,
        alignItems: 'end',
        position: 'relative'
      }}>
        {/* Left: headline column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <span className="eyebrow">BS–MS integrated · SNU</span>
          <h1 style={{ maxWidth: 720, fontSize: 76, lineHeight: '76px', letterSpacing: '-1.6px' }}>
            I study how waves<br />
            are supposed<br />
            to leave.
          </h1>
          <p style={{ color: 'var(--ink-charcoal)', maxWidth: 540, fontSize: 17, lineHeight: '26px' }}>
            Junkyo Seo (서준교) — an undergraduate researcher at Seoul National
            University's Structural Analysis Laboratory. My current work
            re-frames the Perfectly Matched Layer as a polar elastic medium,
            looking for the stability condition hiding in its stiffness tensor.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
            <button className="btn btn-primary"
              onClick={() => onJump('research')}>
              Read the research
            </button>
            <button className="btn btn-secondary"
              onClick={() => onJump('projects')}>
              See what I build
            </button>
          </div>
        </div>

        {/* Right: schematic + meta */}
        <div style={{ position: 'relative', minHeight: 460 }}>
          {/* Schematic */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 360, height: 360, borderRadius: '50%',
            boxShadow: 'var(--shadow-2)',
            overflow: 'hidden',
          }}>
            <PMLSchematic/>
          </div>

          {/* Orbital arc — kept subtle */}
          <svg width="440" height="460" viewBox="0 0 440 460"
            style={{ position: 'absolute', top: -10, right: -30, pointerEvents: 'none' }}>
            <path d="M 30 360 C 30 180, 200 30, 410 50"
              stroke="var(--orbit-amber)" strokeWidth="1" fill="none"
              strokeLinecap="round" opacity="0.6" strokeDasharray="3 6"/>
            <circle cx="30" cy="360" r="3.5" fill="var(--orbit-rust)"/>
          </svg>

          {/* Floating affiliation pill */}
          <div style={{
            position: 'absolute', bottom: 8, left: 0,
            background: 'var(--surface-white)', borderRadius: 999,
            padding: '14px 22px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', gap: 14,
            maxWidth: 360
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--ink)', color: 'var(--canvas)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13, letterSpacing: '0.3px'
            }}>SNU</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.4px',
                textTransform: 'uppercase', color: 'var(--ink-slate)' }}>
                Affiliation
              </span>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>
                Civil & Urban Env. Eng.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip: focus tags */}
      <div style={{
        marginTop: 72, paddingTop: 28,
        borderTop: '1px solid var(--border-soft)',
        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'
      }}>
        <span style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '0.5px',
          textTransform: 'uppercase', color: 'var(--ink-slate)',
          marginRight: 8
        }}>Currently thinking about</span>
        {[
          'Perfectly Matched Layers',
          'Polar elasticity',
          'Wave attenuation',
          'Vibe coding',
          'Numerical stability',
        ].map((t) => (
          <span key={t} style={{
            border: '1px solid var(--ink)',
            borderRadius: 999, padding: '6px 16px',
            fontSize: 13, fontWeight: 450, color: 'var(--ink)'
          }}>{t}</span>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
