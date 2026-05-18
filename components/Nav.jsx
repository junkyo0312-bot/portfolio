/* global React */

function Nav({ active, onJump }) {
  const links = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 24, zIndex: 30,
      margin: '24px auto 0', width: 'max-content',
      background: '#fff', borderRadius: 999,
      padding: '12px 14px 12px 22px',
      display: 'flex', alignItems: 'center', gap: 28,
      boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
    }}>
      <a href="#top" onClick={(e) => { e.preventDefault(); onJump('top'); }}
         style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--ink)' }}>
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #F4A36F 0%, #CF4500 60%, #6F2A0E 100%)',
          display: 'inline-block',
        }}/>
        <span style={{ fontWeight: 500, fontSize: 15, letterSpacing: '-0.45px' }}>
          Junkyo Seo
        </span>
      </a>
      <div style={{ display: 'flex', gap: 24 }}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`}
             onClick={(e) => { e.preventDefault(); onJump(l.id); }}
             style={{
               color: active === l.id ? 'var(--orbit-rust)' : 'var(--ink)',
               fontWeight: 500, fontSize: 15,
               letterSpacing: '-0.45px', cursor: 'pointer',
               padding: '4px 2px', whiteSpace: 'nowrap',
               transition: 'color 200ms',
             }}>{l.label}</a>
        ))}
      </div>
      <a href="mailto:junkyo0312@snu.ac.kr"
         className="btn btn-primary"
         style={{ padding: '6px 18px', fontSize: 14, marginLeft: 4 }}>
        Get in touch
      </a>
    </nav>
  );
}

Object.assign(window, { Nav });
