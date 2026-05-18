/* global React */
const { useState: useResState, useMemo: useResMemo } = React;

// κ(ν) = 2ν / sqrt(2(1+ν)(1-2ν))
function kappa(nu) {
  const denom = Math.sqrt(2 * (1 + nu) * (1 - 2 * nu));
  if (denom < 1e-6) return 99;
  return (2 * nu) / denom;
}

const MATERIALS = [
  { name: 'Concrete', nu: 0.20, note: 'Safety margin' },
  { name: 'Steel',    nu: 0.30, note: 'Safety margin' },
  { name: 'Aluminum', nu: 0.33, note: 'Near boundary' },
  { name: 'Rubber',   nu: 0.49, note: 'Empirical insufficient' },
];

function KappaChart({ nu, onChange }) {
  // Chart dimensions
  const W = 520, H = 320;
  const padL = 56, padR = 24, padT = 28, padB = 56;
  const cw = W - padL - padR;
  const ch = H - padT - padB;

  const xMin = 0, xMax = 0.5;
  const yMin = 0, yMax = 5;

  const xPx = (v) => padL + (v - xMin) / (xMax - xMin) * cw;
  const yPx = (v) => padT + ch - (v - yMin) / (yMax - yMin) * ch;

  // Curve path
  const curve = useResMemo(() => {
    const pts = [];
    const N = 120;
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * 0.498; // stop before singularity
      const k = kappa(t);
      pts.push(`${xPx(t).toFixed(2)},${yPx(Math.min(k, yMax + 0.5)).toFixed(2)}`);
    }
    return 'M ' + pts.join(' L ');
  }, []);

  // Fill region under κ=1 line (safety)
  const safeFill = useResMemo(() => {
    const pts = [];
    const N = 60;
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * 0.387;
      const k = kappa(t);
      pts.push(`${xPx(t).toFixed(2)},${yPx(k).toFixed(2)}`);
    }
    // close along κ=1 line back to x=0
    pts.push(`${xPx(0.387).toFixed(2)},${yPx(0).toFixed(2)}`);
    pts.push(`${xPx(0).toFixed(2)},${yPx(0).toFixed(2)}`);
    return 'M ' + pts.join(' L ') + ' Z';
  }, []);

  const k = kappa(nu);
  const showK = Math.min(k, yMax + 0.3);
  const isSafe = k < 1;

  // Drag interaction on chart
  const onChartMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = W / rect.width;
    const x = (e.clientX - rect.left) * scaleX;
    let v = ((x - padL) / cw) * (xMax - xMin) + xMin;
    v = Math.max(0.001, Math.min(0.498, v));
    onChange(Math.round(v * 1000) / 1000);
  };
  const [dragging, setDragging] = useResState(false);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: 'block', userSelect: 'none', cursor: dragging ? 'grabbing' : 'crosshair' }}
      onMouseDown={(e) => { setDragging(true); onChartMove(e); }}
      onMouseMove={(e) => { if (dragging) onChartMove(e); }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
    >
      {/* Background grid */}
      {[0, 1, 2, 3, 4, 5].map(g => (
        <line key={`gy${g}`}
          x1={padL} x2={W - padR}
          y1={yPx(g)} y2={yPx(g)}
          stroke="rgba(20,20,19,0.06)" strokeWidth="1"/>
      ))}
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map(g => (
        <line key={`gx${g}`}
          x1={xPx(g)} x2={xPx(g)}
          y1={padT} y2={H - padB}
          stroke="rgba(20,20,19,0.06)" strokeWidth="1"/>
      ))}

      {/* Safety region fill */}
      <path d={safeFill} fill="rgba(243,115,56,0.10)"/>

      {/* κ = 1 reference line */}
      <line x1={padL} x2={W - padR}
        y1={yPx(1)} y2={yPx(1)}
        stroke="var(--ink)" strokeWidth="1" strokeDasharray="4 4"/>
      <text x={W - padR - 4} y={yPx(1) - 6}
        textAnchor="end" fontSize="11" fontWeight="500"
        fill="var(--ink-slate)">κ = 1 (empirical)</text>

      {/* Curve */}
      <path d={curve} fill="none"
        stroke="var(--orbit-rust)" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"/>

      {/* Material markers */}
      {MATERIALS.map(m => {
        const mk = kappa(m.nu);
        const my = yPx(Math.min(mk, yMax + 0.2));
        const isAct = Math.abs(m.nu - nu) < 0.005;
        return (
          <g key={m.name}>
            <circle cx={xPx(m.nu)} cy={my}
              r={isAct ? 5 : 3.5}
              fill={isAct ? 'var(--ink)' : 'var(--surface-white)'}
              stroke="var(--ink)" strokeWidth="1.5"/>
            <text x={xPx(m.nu)} y={my - 10}
              textAnchor="middle" fontSize="11" fontWeight="500"
              fill="var(--ink)">{m.name}</text>
          </g>
        );
      })}

      {/* Active value indicator */}
      <line x1={xPx(nu)} x2={xPx(nu)}
        y1={padT} y2={H - padB}
        stroke="var(--ink)" strokeWidth="1.25" opacity="0.4"/>
      <circle cx={xPx(nu)} cy={yPx(showK)}
        r="7" fill="var(--orbit-rust)" stroke="#fff" strokeWidth="2"/>

      {/* Axes */}
      <line x1={padL} x2={W - padR}
        y1={H - padB} y2={H - padB}
        stroke="var(--ink)" strokeWidth="1.25"/>
      <line x1={padL} x2={padL}
        y1={padT} y2={H - padB}
        stroke="var(--ink)" strokeWidth="1.25"/>

      {/* X axis labels */}
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map(g => (
        <text key={`xl${g}`}
          x={xPx(g)} y={H - padB + 18}
          textAnchor="middle" fontSize="11"
          fill="var(--ink-slate)">{g.toFixed(1)}</text>
      ))}
      {/* Y axis labels */}
      {[0, 1, 2, 3, 4, 5].map(g => (
        <text key={`yl${g}`}
          x={padL - 8} y={yPx(g) + 4}
          textAnchor="end" fontSize="11"
          fill="var(--ink-slate)">{g}</text>
      ))}

      {/* Axis titles */}
      <text x={W / 2 + 12} y={H - 14}
        textAnchor="middle" fontSize="12" fontWeight="500"
        fill="var(--ink)">Poisson's ratio ν</text>
      <text x={16} y={H / 2}
        textAnchor="middle" fontSize="12" fontWeight="500"
        fill="var(--ink)"
        transform={`rotate(-90, 16, ${H / 2})`}>κ(ν)</text>

      {/* Read-out badge */}
      <g transform={`translate(${padL + 14}, ${padT + 14})`}>
        <rect width="172" height="56" rx="14"
          fill={isSafe ? 'var(--ink)' : 'var(--orbit-rust)'}/>
        <text x="16" y="22" fontSize="11" fontWeight="700"
          letterSpacing="0.5" fill="rgba(255,255,255,0.7)">
          {isSafe ? 'SAFETY MARGIN' : 'EMPIRICAL INSUFFICIENT'}
        </text>
        <text x="16" y="44" fontSize="18" fontWeight="500"
          fill="#fff">
          ν = {nu.toFixed(3)} · κ = {k.toFixed(3)}
        </text>
      </g>
    </svg>
  );
}

// ===========================================================================
// Past lab-meeting notes & paper studies. Edit this list to add or remove.
// ===========================================================================
const RESEARCH_NOTES = [
  {
    key: 'pml-stiffness',
    date: 'Mar 2026',
    type: 'Research note',
    title: 'Effective stiffness tensor for the PML',
    sub: 'A transversely isotropic representation, the strain-energy block decomposition, and the material-dependent stability condition.',
    tags: ['PML', 'Polar elasticity', 'Stability'],
    highlight: true,
    pdf: 'notes/Effective_Medium_PML_Stability.pdf',
    body: [
      'The PML coordinate stretching produces a stiffness tensor that loses minor symmetry. Treating it as a transversely isotropic polar solid lets us preserve Navier\u2019s form while keeping a clean mechanical interpretation.',
      'The strain energy decomposes into four independent blocks. Three of them can be made positive-definite; the shear\u2013rotation block always has non-positive determinant when attenuation is active.',
      'From the normal block we read off a material-aware stability condition \u03b1 \u2265 \u03ba(\u03bd)\u00b7\u03b2/\u03c9 \u2212 1, recovering the empirical condition (Goh et al., 2025) exactly at \u03ba = 1 (\u03bd \u2248 0.387).',
    ],
  },
  {
    key: 'non-cartesian',
    date: 'Jan 2026',
    type: 'Research note',
    title: 'The wave equation in non-Cartesian coordinates',
    sub: 'Tensor analysis, Christoffel symbols, and covariant differentiation \u2014 the machinery needed to keep physical laws coordinate-invariant.',
    tags: ['Tensor analysis', 'Curvilinear coordinates', 'Wave equation'],
    pdf: 'notes/Wave_Equation_NonCartesian.pdf',
    body: [
      'Establishes the index-notation and tensor-analysis vocabulary that underpins coordinate-invariant statements of physical law \u2014 covariant and contravariant bases, the metric tensor, Einstein summation.',
      'Introduces Christoffel symbols and the covariant derivative to account for the spatial variation of basis vectors in general curvilinear coordinates.',
      'Derives the wave equation in non-Cartesian coordinates step by step \u2014 a rigorous governing equation ready for numerical computation in complex geometries.',
    ],
  },
  {
    key: 'effective-coefficients',
    date: 'Dec 2025',
    type: 'Research note',
    title: 'Effective coefficients of the wave equation under PML transformation',
    sub: 'Strong and weak forms, Sobolev spaces, and how the PML coordinate stretch shows up as effective material parameters.',
    tags: ['PML', 'Weak form', 'FEM'],
    pdf: 'notes/Effective_Coefficients_PML.pdf',
    body: [
      'Reviews the move from strong to weak form of a boundary-value problem, including the function-space framing (Sobolev spaces) that gives a numerical method something to stand on.',
      'Applies the variational machinery to the PML setting and reads off the effective material coefficients introduced by complex coordinate stretching.',
      'Sets up the language that the later transversely-isotropic polar interpretation uses to talk about the stiffness tensor.',
    ],
  },
  {
    key: 'pml-2d-scalar',
    date: 'Dec 2025',
    type: 'Research note',
    title: 'Applying PML for 2D scalar waves',
    sub: 'Deriving the PML in the frequency domain from complex coordinate stretching \u2014 the entry point of the whole project.',
    tags: ['PML', 'Scalar waves', 'Frequency domain'],
    pdf: 'notes/PML_2D_Scalar_Waves.pdf',
    body: [
      'Starts from the source-free scalar wave equation in first-order form and isolates the anti-Hermitian operator that gives purely oscillating eigenmodes.',
      'Walks through complex coordinate stretching as three conceptual steps: analytic continuation, real-coordinate reparametrization, and domain truncation.',
      'Lays out the simplest version of the PML idea, used throughout the later notes as the canonical scaffold.',
    ],
  },
];

function NoteCard({ note, onOpen }) {
  return (
    <button
      onClick={() => onOpen(note.key)}
      style={{
        textAlign: 'left',
        background: note.highlight ? 'var(--ink)' : 'var(--canvas)',
        color: note.highlight ? 'var(--canvas)' : 'var(--ink)',
        border: '1px solid ' + (note.highlight ? 'var(--ink)' : 'var(--border-soft)'),
        borderRadius: 20,
        padding: '24px 24px 22px',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 14,
        transition: 'transform 200ms cubic-bezier(0.2,0.8,0.2,1)',
        fontFamily: 'inherit',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
      }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: note.highlight ? 'rgba(243,240,238,0.65)' : 'var(--ink-slate)',
        }}>{note.date} · {note.type}</span>
        {note.highlight && (
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
            textTransform: 'uppercase',
            background: 'var(--orbit-rust)', color: '#fff',
            borderRadius: 999, padding: '4px 10px',
          }}>Current</span>
        )}
      </div>
      <h3 style={{
        fontSize: 22, lineHeight: '26px', letterSpacing: '-0.44px',
        color: note.highlight ? 'var(--canvas)' : 'var(--ink)',
      }}>{note.title}</h3>
      <p style={{
        fontSize: 14, lineHeight: '20px',
        color: note.highlight ? 'rgba(243,240,238,0.78)' : 'var(--ink-graphite)',
      }}>{note.sub}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
        {note.tags.map(t => (
          <span key={t} style={{
            fontSize: 11, fontWeight: 500,
            border: '1px solid ' + (note.highlight
              ? 'rgba(243,240,238,0.4)' : 'var(--border-soft)'),
            color: note.highlight ? 'var(--canvas)' : 'var(--ink-graphite)',
            borderRadius: 999, padding: '4px 10px',
          }}>{t}</span>
        ))}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginTop: 4,
        fontSize: 13, fontWeight: 500,
        color: note.highlight ? 'var(--canvas)' : 'var(--ink)',
      }}>
        {note.pdf ? 'Read note · PDF' : 'Read note'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 5l7 7-7 7"/>
        </svg>
      </div>
    </button>
  );
}

function NoteModal({ noteKey, onClose }) {
  if (!noteKey) return null;
  const n = RESEARCH_NOTES.find(x => x.key === noteKey);
  if (!n) return null;
  return (
    <div role="dialog" onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(20,20,19,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 80, padding: 32,
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
        <span className="eyebrow">{n.date} · {n.type}</span>
        <h2 style={{ marginTop: 12, fontSize: 36, lineHeight: '40px' }}>
          {n.title}
        </h2>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
          {n.tags.map(t => (
            <span key={t} style={{
              fontSize: 11, fontWeight: 500,
              border: '1px solid var(--border-soft)',
              borderRadius: 999, padding: '4px 10px',
              color: 'var(--ink-graphite)',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {n.body.map((p, i) => (
            <p key={i} style={{
              color: 'var(--ink-charcoal)', fontSize: 15, lineHeight: '24px',
            }}>{p}</p>
          ))}
        </div>

        {n.pdf && (
          <div style={{ marginTop: 28, paddingTop: 24,
            borderTop: '1px solid var(--border-soft)',
            display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a href={n.pdf}
               target="_blank" rel="noopener noreferrer"
               style={{
                 display: 'inline-flex', alignItems: 'center', gap: 10,
                 background: 'var(--ink)', color: 'var(--canvas)',
                 borderRadius: 999, padding: '10px 18px 10px 20px',
                 textDecoration: 'none',
                 fontSize: 14, fontWeight: 500, letterSpacing: '-0.3px',
               }}>
              Open the full PDF
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8"/>
              </svg>
            </a>
            <a href={n.pdf} download
               style={{
                 display: 'inline-flex', alignItems: 'center', gap: 8,
                 color: 'var(--ink)',
                 border: '1.5px solid var(--ink)',
                 borderRadius: 999, padding: '8px 18px',
                 textDecoration: 'none',
                 fontSize: 14, fontWeight: 450, letterSpacing: '-0.3px',
               }}>
              Download
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v12M5 11l7 7 7-7M5 21h14"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function CurrentResearchBody({ nu, setNu }) {
  const k = kappa(nu);
  const isSafe = k < 1;
  return (
    <>
      {/* Heading */}
      <div style={{ maxWidth: 760, marginBottom: 56 }}>
        <span className="eyebrow">• Current focus</span>
        <h2 style={{ marginTop: 14, fontSize: 48, lineHeight: '52px', letterSpacing: '-0.96px' }}>
          A material-aware stability condition<br/>
          for the elastic PML.
        </h2>
        <p style={{ marginTop: 20, color: 'var(--ink-charcoal)',
          fontSize: 17, lineHeight: '26px', maxWidth: 620 }}>
          The Perfectly Matched Layer absorbs outgoing elastic waves — until,
          for the wrong material, it doesn't. I treat the PML as a
          transversely isotropic polar medium, decompose its strain energy,
          and show that the stability boundary depends on Poisson's ratio.
        </p>
      </div>

      {/* Two-column: editorial left, chart right */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56,
          alignItems: 'start',
        }}>
          {/* Left column: results */}
          <div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 1, background: 'var(--border-soft)',
              borderRadius: 20, overflow: 'hidden',
              marginBottom: 32,
            }}>
              {[
                { lbl: 'Material parameters', val: '8' },
                { lbl: 'Independent energy blocks', val: '4' },
                { lbl: 'Indefinite when β ≠ 0', val: '1' },
                { lbl: 'κ = 1 crossover', val: 'ν ≈ 0.387' },
              ].map((s) => (
                <div key={s.lbl} style={{
                  background: 'var(--canvas)', padding: '22px 22px',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
                    textTransform: 'uppercase', color: 'var(--ink-slate)' }}>
                    {s.lbl}
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 500,
                    letterSpacing: '-0.64px', marginTop: 8 }}>
                    {s.val}
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ marginBottom: 16, fontSize: 20 }}>
              The thread of the argument
            </h3>
            <ol style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
              {[
                'The PML is a complex coordinate transformation: Λ = diag(a, 1, 1).',
                'In the identity gauge, Navier\'s form is preserved but the stiffness tensor loses minor symmetry.',
                'Interpret the result as a transversely isotropic polar solid — strain energy decomposes into four independent blocks.',
                'The shear–rotation block has det(Hₛ) ≤ 0 whenever β ≠ 0. Local energy can be amplified.',
                'The normal block yields a stability condition α ≥ κ(ν)·β/ω − 1, which closes the loop on the empirical criterion.',
              ].map((line, i) => (
                <li key={i} style={{
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  padding: '14px 0',
                  borderTop: '1px solid var(--border-soft)',
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--ink)', color: 'var(--canvas)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 500, fontSize: 13, flexShrink: 0,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 15, lineHeight: '22px', paddingTop: 3 }}>
                    {line}
                  </span>
                </li>
              ))}
            </ol>

            {/* Citation */}
            <div style={{
              marginTop: 32,
              padding: '20px 22px',
              borderRadius: 20,
              background: 'var(--canvas)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
                  textTransform: 'uppercase', color: 'var(--ink-slate)', marginBottom: 4 }}>
                  Lab meeting · 15 May 2026
                </div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>
                  Effective Stiffness Tensor for the PML —<br/>
                  A Transversely Isotropic Representation
                </div>
              </div>
            </div>
          </div>

          {/* Right column: interactive chart */}
          <div style={{
            background: 'var(--canvas)',
            borderRadius: 40,
            padding: 32,
            boxShadow: 'var(--shadow-2)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: 24, marginBottom: 16,
            }}>
              <div>
                <span className="eyebrow">Interactive · drag the curve</span>
                <h3 style={{ marginTop: 10, fontSize: 22 }}>
                  Which materials does the empirical condition cover?
                </h3>
              </div>
            </div>

            <KappaChart nu={nu} onChange={setNu}/>

            {/* Slider */}
            <div style={{ marginTop: 18, padding: '0 4px' }}>
              <input
                type="range"
                min="0.001"
                max="0.499"
                step="0.001"
                value={nu}
                onChange={(e) => setNu(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--orbit-rust)' }}
              />
            </div>

            {/* Material chips */}
            <div style={{
              marginTop: 18,
              display: 'flex', gap: 8, flexWrap: 'wrap',
            }}>
              {MATERIALS.map(m => {
                const active = Math.abs(m.nu - nu) < 0.005;
                return (
                  <button key={m.name}
                    onClick={() => setNu(m.nu)}
                    style={{
                      border: '1.5px solid var(--ink)',
                      background: active ? 'var(--ink)' : 'transparent',
                      color: active ? 'var(--canvas)' : 'var(--ink)',
                      borderRadius: 999,
                      padding: '8px 16px',
                      fontSize: 13, fontWeight: 500,
                      cursor: 'pointer',
                      letterSpacing: '-0.3px',
                    }}>
                    {m.name} · ν = {m.nu}
                  </button>
                );
              })}
            </div>

            {/* Caption */}
            <p style={{
              marginTop: 18, color: 'var(--ink-graphite)',
              fontSize: 14, lineHeight: '20px',
            }}>
              {isSafe
                ? `With ν = ${nu.toFixed(2)}, κ < 1 — the empirical criterion (Goh et al., 2025) is conservative. PML is safe within its bounds.`
                : `With ν = ${nu.toFixed(2)}, κ > 1 — the empirical criterion may incorrectly predict stability. Near-incompressible materials are the risk regime.`}
            </p>
          </div>
        </div>
    </>
  );
}

function ResearchNotesBody({ onOpen }) {
  return (
    <>
      <div style={{ maxWidth: 760, marginBottom: 40,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 32, flexWrap: 'wrap' }}>
        <div>
          <span className="eyebrow">• Notebook</span>
          <h2 style={{ marginTop: 14, fontSize: 48, lineHeight: '52px',
            letterSpacing: '-0.96px' }}>
            Notes from the PML thread.
          </h2>
          <p style={{ marginTop: 20, color: 'var(--ink-charcoal)',
            fontSize: 17, lineHeight: '26px', maxWidth: 620 }}>
            Personal research notes, written as I built up the framework for
            the current paper. Each one is a self-contained PDF.
          </p>
        </div>
        <div style={{
          fontSize: 13, color: 'var(--ink-slate)', fontWeight: 500,
        }}>
          {RESEARCH_NOTES.length} notes · updated monthly
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 16,
      }}>
        {RESEARCH_NOTES.map(n => (
          <NoteCard key={n.key} note={n} onOpen={onOpen}/>
        ))}

        {/* Upload placeholder card */}
        <div style={{
          border: '1.5px dashed var(--ink-dust)',
          borderRadius: 20,
          padding: '24px 24px 22px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 10, minHeight: 220,
          color: 'var(--ink-slate)',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--canvas)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500,
            color: 'var(--ink)', textAlign: 'center' }}>
            New note slot
          </div>
          <div style={{ fontSize: 12, lineHeight: '18px',
            textAlign: 'center', maxWidth: 200 }}>
            Add a new lab meeting or paper study to <code>RESEARCH_NOTES</code>.
          </div>
        </div>
      </div>
    </>
  );
}

function Research() {
  const [tab, setTab] = useResState('current');
  const [nu, setNu] = useResState(0.30);
  const [noteKey, setNoteKey] = useResState(null);

  return (
    <section id="research" style={{
      background: 'var(--canvas-lifted)',
      borderTop: '1px solid var(--border-soft)',
      borderBottom: '1px solid var(--border-soft)',
      padding: '120px 0',
      marginTop: 64,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        {/* Section header with tab switcher */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, marginBottom: 48, flexWrap: 'wrap',
        }}>
          <span className="eyebrow">Research</span>

          <div style={{
            background: 'var(--canvas)',
            border: '1px solid var(--border-soft)',
            borderRadius: 999,
            padding: 4,
            display: 'inline-flex', gap: 4,
          }}>
            {[
              { id: 'current', label: 'Current research' },
              { id: 'notes', label: `Research notes (${RESEARCH_NOTES.length})` },
            ].map(t => {
              const active = tab === t.id;
              return (
                <button key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    border: 0, cursor: 'pointer',
                    background: active ? 'var(--ink)' : 'transparent',
                    color: active ? 'var(--canvas)' : 'var(--ink)',
                    borderRadius: 999,
                    padding: '8px 18px',
                    fontSize: 14, fontWeight: 500, letterSpacing: '-0.3px',
                    transition: 'background 200ms, color 200ms',
                    fontFamily: 'inherit',
                  }}>
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        {tab === 'current'
          ? <CurrentResearchBody nu={nu} setNu={setNu}/>
          : <ResearchNotesBody onOpen={setNoteKey}/>}
      </div>

      <NoteModal noteKey={noteKey} onClose={() => setNoteKey(null)}/>
    </section>
  );
}

Object.assign(window, { Research });
