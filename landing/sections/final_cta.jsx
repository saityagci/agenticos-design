function FinalCTA() {
  return (
    <section id="demo" className="cta reveal">
      <div className="container">
        <div className="cta-frame">
          <svg className="cta-constellation" aria-hidden="true" viewBox="0 0 1200 600" preserveAspectRatio="none">
            {Array.from({ length: 40 }).map((_, i) => {
              const x = (i * 137.3) % 1200;
              const y = (i * 89.7 + 40) % 600;
              const r = i % 5 === 0 ? 2.5 : 1.2;
              const op = 0.2 + ((i * 17) % 60) / 120;
              return <circle key={i} cx={x} cy={y} r={r} fill="#7dd3fc" opacity={op} />;
            })}
          </svg>

          <div className="cta-content">
            <div className="eyebrow" style={{ marginBottom: 28 }}>
              <span className="dot"></span>
              <span>Pilot in 14 days · white-glove onboarding</span>
            </div>
            <h2 className="cta-title">
              Run the night shift<br/>
              <span className="serif text-gradient">like it's the day shift.</span>
            </h2>
            <p className="cta-sub">
              Book a 25-minute walkthrough. We'll show you your own hotel's
              last week of radio chatter rebuilt as an AgenticOS dashboard — live.
            </p>
            <div className="cta-ctas">
              <a href="#" className="btn btn-primary">
                Book a demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#" className="btn btn-ghost">
                Read the pilot playbook
              </a>
            </div>

            <div className="cta-meta">
              <div className="cta-meta-item">
                <div className="mono cta-meta-val">14 days</div>
                <div className="cta-meta-label">from kickoff to live</div>
              </div>
              <div className="cta-meta-divider"></div>
              <div className="cta-meta-item">
                <div className="mono cta-meta-val">0 IT lift</div>
                <div className="cta-meta-label">runs alongside your PMS</div>
              </div>
              <div className="cta-meta-divider"></div>
              <div className="cta-meta-item">
                <div className="mono cta-meta-val">30-day trial</div>
                <div className="cta-meta-label">full refund, no fine print</div>
              </div>
            </div>
          </div>

          {/* Giant decorative glyph */}
          <div className="cta-glyph" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" stroke="rgba(125,211,252,0.18)" strokeWidth="0.8"/>
              <circle cx="100" cy="100" r="55" stroke="rgba(125,211,252,0.28)" strokeWidth="0.8"/>
              <circle cx="100" cy="100" r="30" stroke="rgba(125,211,252,0.4)" strokeWidth="0.8"/>
              <circle cx="100" cy="100" r="6" fill="url(#g1)"/>
              <defs>
                <radialGradient id="g1">
                  <stop offset="0%" stopColor="#34e2b6"/>
                  <stop offset="100%" stopColor="#60a5fa"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .cta { padding: 120px 0 80px; }
        .cta-frame {
          position: relative;
          padding: 100px 80px;
          border-radius: 28px;
          background:
            radial-gradient(800px 500px at 80% 20%, rgba(96,165,250,0.15), transparent 60%),
            radial-gradient(600px 400px at 20% 80%, rgba(52,226,182,0.1), transparent 60%),
            rgba(8,12,20,0.8);
          border: 1px solid var(--line-strong);
          overflow: hidden;
          min-height: 480px;
        }
        .cta-constellation {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          opacity: 0.8;
        }
        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 720px;
        }
        .cta-title {
          font-size: clamp(44px, 6vw, 96px);
          line-height: 0.98;
          letter-spacing: -0.035em;
          font-weight: 600;
          margin-bottom: 24px;
          text-wrap: balance;
        }
        .cta-title .serif { font-weight: 400; font-size: 1.04em; }
        .cta-sub {
          font-size: 19px;
          line-height: 1.55;
          color: var(--ink-200);
          max-width: 600px;
          margin-bottom: 40px;
          text-wrap: pretty;
        }
        .cta-ctas {
          display: flex; gap: 12px; flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .cta-meta {
          display: flex; align-items: center;
          gap: 32px;
          padding-top: 32px;
          border-top: 1px solid var(--line);
          flex-wrap: wrap;
        }
        .cta-meta-item { display: flex; flex-direction: column; gap: 4px; }
        .cta-meta-val {
          font-size: 18px; font-weight: 500;
          color: var(--ink-100);
          letter-spacing: -0.01em;
        }
        .cta-meta-label {
          font-size: 12px;
          color: var(--ink-400);
        }
        .cta-meta-divider {
          width: 1px; height: 32px;
          background: var(--line);
        }
        .cta-glyph {
          position: absolute;
          top: 50%; right: -80px;
          width: 520px; height: 520px;
          transform: translateY(-50%);
          opacity: 0.7;
          animation: drift-slow 12s ease-in-out infinite;
          pointer-events: none;
        }
        @media (max-width: 960px) {
          .cta-frame { padding: 72px 40px; }
          .cta-glyph { display: none; }
        }
        @media (max-width: 620px) {
          .cta-frame { padding: 56px 28px; }
          .cta-meta-divider { display: none; }
        }
      `}</style>
    </section>
  );
}

window.FinalCTA = FinalCTA;
