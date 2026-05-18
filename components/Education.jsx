/* global React */

// Pulled from the official transcript (PDF). Edited lightly for portfolio.
const SEMESTERS = [
  {
    term: '2022 · Spring',
    gpa: '4.09',
    credits: 18,
    courses: [
      { name: 'Physics 1', grade: 'A+' },
      { name: 'Chemistry 1', grade: 'A+' },
      { name: 'Advanced Mathematics 1', grade: 'A+' },
      { name: 'Intro to Civil & Env. Engineering', grade: 'S' },
      { name: 'Civil & Env. Digital Engineering Design', grade: 'A−' },
    ],
  },
  {
    term: '2022 · Fall',
    gpa: '4.12',
    credits: 18,
    courses: [
      { name: 'Physics 2', grade: 'A+' },
      { name: 'Creative Engineering Design', grade: 'A' },
      { name: 'Civil & Env. Engineering Statistics', grade: 'A+' },
      { name: 'Advanced Mathematics 2', grade: 'A' },
      { name: 'College English 1', grade: 'A' },
    ],
  },
  {
    term: '2023 · Spring',
    gpa: '4.21',
    credits: 20,
    courses: [
      { name: 'Engineering Mathematics 1', grade: 'A' },
      { name: 'Computer Concepts & Practice', grade: 'A+' },
      { name: 'Mechanics of Materials & Lab', grade: 'A' },
      { name: 'Urban Planning', grade: 'A+' },
      { name: 'Spatial Information Engineering', grade: 'A+' },
    ],
  },
  {
    term: '2023 · Fall',
    gpa: '4.10',
    credits: 19,
    courses: [
      { name: 'Engineering Mathematics 2', grade: 'A' },
      { name: 'Fluid Mechanics & Lab', grade: 'A' },
      { name: 'Transportation Engineering & Lab', grade: 'A+' },
      { name: 'Environmental Engineering', grade: 'A+' },
      { name: 'Structural Analysis 1', grade: 'A' },
      { name: 'Programming Methodology', grade: 'A' },
    ],
  },
  {
    term: '2025 · Fall',
    gpa: '3.82',
    credits: 14,
    courses: [
      { name: 'Linear Algebra for Electrical Systems', grade: 'B+' },
      { name: 'Data Structures', grade: 'A−' },
      { name: 'AI Theory & Applications Seminar', grade: 'S' },
      { name: 'Understanding German Culture', grade: 'A+' },
      { name: 'Elementary Classical Chinese', grade: 'A' },
    ],
  },
];

function Education() {
  const totalCredits = 89;
  const cumGpa = '4.09';
  const percent = '97.90';

  return (
    <section id="education" style={{
      padding: '120px 48px 80px',
      maxWidth: 1280, margin: '0 auto',
    }}>
      {/* Heading */}
      <div style={{ maxWidth: 760, marginBottom: 48 }}>
        <span className="eyebrow">Education</span>
        <h2 style={{ marginTop: 14 }}>
          Five semesters in, BS–MS track underway.
        </h2>
        <p style={{ marginTop: 16, color: 'var(--ink-charcoal)',
          fontSize: 16, lineHeight: '24px' }}>
          BS in Civil & Urban Environmental Engineering, with a combined major
          in AI Semiconductor Engineering and AI — articulating into the
          BS–MS integrated program at the Structural Analysis Lab. The transcript
          below is on the public record.
        </p>
      </div>

      {/* Stat strip — stadium */}
        <div style={{
          background: 'var(--ink)', color: 'var(--canvas)',
          borderRadius: 40,
          padding: '40px 48px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32, alignItems: 'flex-end',
        }}>
        {[
          { num: cumGpa, denom: '/ 4.30', lbl: 'Cumulative GPA' },
          { num: percent, denom: '/ 100', lbl: 'Percentile score' },
          { num: totalCredits, denom: 'credits', lbl: 'Completed' },
          { num: '2022', denom: '— present', lbl: 'At SNU' },
        ].map(s => (
          <div key={s.lbl}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
              textTransform: 'uppercase', color: 'rgba(243,240,238,0.55)',
              marginBottom: 8 }}>
              {s.lbl}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 56, fontWeight: 500,
                letterSpacing: '-1.12px', lineHeight: 1 }}>{s.num}</span>
              <span style={{ fontSize: 14, fontWeight: 450,
                opacity: 0.75 }}>{s.denom}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Semester grid removed — only stat strip remains */}
    </section>
  );
}

Object.assign(window, { Education });
