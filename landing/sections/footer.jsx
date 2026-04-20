function Footer() {
  const cols = [
    { title: 'Product', links: ['Voice Agent', 'Dispatch', 'Manager', 'Guest App', 'Integrations', 'Security'] },
    { title: 'Solutions', links: ['Independent hotels', 'Chains & groups', 'Resorts', 'Serviced apartments', 'Night-shift operations'] },
    { title: 'Company', links: ['About', 'Customers', 'Careers — 12 open', 'Press kit', 'Contact'] },
    { title: 'Resources', links: ['Docs', 'API reference', 'Changelog', 'Status', 'Playbook (PDF)'] },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="nav-logo-mark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#061018" strokeWidth="2.2" strokeLinejoin="round"/>
                  <path d="M12 8v8M8 10l8 4M16 10l-8 4" stroke="#061018" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>
                agentic<span style={{ background: 'linear-gradient(135deg, #60a5fa, #34e2b6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>OS</span>
              </div>
            </div>
            <p className="footer-tagline">
              The operating system for <span className="serif text-gradient" style={{ fontSize: '1.1em' }}>hospitality.</span>
            </p>
            <div className="footer-news">
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--ink-400)', marginBottom: 10 }}>The Night Shift · monthly dispatch</div>
              <form className="footer-news-form" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="hello@yourhotel.com" />
                <button type="submit">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </form>
            </div>
          </div>

          <div className="footer-cols">
            {cols.map((c, i) => (
              <div key={i} className="footer-col">
                <div className="footer-col-title">{c.title}</div>
                <ul>
                  {c.links.map((l, j) => <li key={j}><a href="#">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Huge decorative wordmark */}
        <div className="footer-wordmark" aria-hidden="true">AgenticOS</div>

        <div className="footer-bottom">
          <div className="footer-legal">
            © 2026 AgenticOS, Inc. · Built in NYC + Istanbul + Barcelona
          </div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">SOC 2 Type II</a>
            <a href="#">GDPR</a>
            <div className="footer-status">
              <span className="footer-status-dot"></span>
              <span className="mono">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          position: relative;
          padding: 100px 0 40px;
          border-top: 1px solid var(--line);
          overflow: hidden;
        }
        .footer-top {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 2.4fr);
          gap: 80px;
          margin-bottom: 80px;
        }
        .footer-brand { max-width: 380px; }
        .footer-logo {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 24px;
        }
        .footer-tagline {
          font-family: var(--font-display);
          font-size: 28px;
          line-height: 1.2;
          letter-spacing: -0.01em;
          font-weight: 400;
          color: var(--ink-200);
          margin-bottom: 36px;
        }
        .footer-news-form {
          display: flex;
          border: 1px solid var(--line-strong);
          border-radius: 12px;
          overflow: hidden;
          background: var(--surface);
          backdrop-filter: blur(20px);
        }
        .footer-news-form input {
          flex: 1;
          padding: 12px 16px;
          background: transparent;
          border: 0;
          color: var(--ink-100);
          font-size: 13px;
          outline: none;
          font-family: var(--font-sans);
        }
        .footer-news-form input::placeholder { color: var(--ink-500); }
        .footer-news-form button {
          width: 44px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #60a5fa, #34e2b6);
          color: #061018;
          transition: filter 200ms;
        }
        .footer-news-form button:hover { filter: brightness(1.1); }

        .footer-cols {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .footer-col-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--ink-400);
          margin-bottom: 20px;
          font-weight: 700;
        }
        .footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .footer-col a {
          font-size: 14px;
          color: var(--ink-200);
          transition: color 150ms;
        }
        .footer-col a:hover { color: var(--ink-100); }

        .footer-wordmark {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(80px, 18vw, 280px);
          letter-spacing: -0.04em;
          line-height: 0.9;
          background: linear-gradient(180deg, rgba(125,211,252,0.12), rgba(125,211,252,0.02));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-align: center;
          margin-bottom: 40px;
          user-select: none;
        }
        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-legal {
          font-size: 12px;
          color: var(--ink-400);
        }
        .footer-links {
          display: flex; align-items: center; gap: 24px;
          font-size: 12px;
        }
        .footer-links a {
          color: var(--ink-400);
          transition: color 150ms;
        }
        .footer-links a:hover { color: var(--ink-200); }
        .footer-status {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 4px 10px;
          border: 1px solid rgba(52,226,182,0.3);
          border-radius: 99px;
          color: #6ee7b7;
          font-size: 11px;
        }
        .footer-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #34e2b6;
          box-shadow: 0 0 8px #34e2b6;
          animation: pulse-ring 2s ease-out infinite;
        }

        @media (max-width: 960px) {
          .footer-top { grid-template-columns: 1fr; gap: 56px; }
          .footer-cols { grid-template-columns: repeat(2, 1fr); gap: 32px; }
        }
      `}</style>
    </footer>
  );
}

window.Footer = Footer;
