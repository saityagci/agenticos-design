function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Guest calls.',
      sub: 'or texts, WhatsApps, pings in-room tablet — whatever they prefer.',
      body: 'The AI agent answers on the first ring, in any language, without hold music.',
      color: '#60a5fa',
      time: '+0s',
    },
    {
      num: '02',
      title: 'AgenticOS classifies.',
      sub: 'intent → department → priority → assignee.',
      body: 'No rules, no trees. The model reads context, cross-checks PMS, and writes a structured ticket.',
      color: '#34e2b6',
      time: '+3s',
    },
    {
      num: '03',
      title: 'Staff executes.',
      sub: 'on the mobile app, with context and clock already running.',
      body: 'The right human gets the right job with the right SLA. The loop closes the moment they swipe done.',
      color: '#8b5cf6',
      time: '< 12s',
    },
  ];

  return (
    <section id="how" className="how reveal">
      <div className="container">
        <div className="how-head">
          <div className="section-num">05 · HOW IT WORKS</div>
          <h2 className="how-title">
            From ring to resolution,<br/>
            <span className="serif text-gradient">in three movements.</span>
          </h2>
        </div>

        <div className="how-timeline">
          {/* The line */}
          <div className="how-line" aria-hidden="true">
            <div className="how-line-inner"></div>
          </div>

          {steps.map((s, i) => (
            <div key={i} className={`how-step how-step-${i}`}>
              <div className="how-marker" style={{ '--c': s.color }}>
                <div className="how-marker-pulse" style={{ background: s.color }}></div>
                <div className="how-marker-dot" style={{ background: s.color, boxShadow: `0 0 18px ${s.color}` }}></div>
              </div>
              <div className="how-card">
                <div className="how-time mono" style={{ color: s.color }}>{s.time}</div>
                <div className="how-num" style={{ color: s.color }}>{s.num}</div>
                <h3 className="how-step-title">{s.title}</h3>
                <div className="how-step-sub">{s.sub}</div>
                <p className="how-step-body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .how { padding: 120px 0; }
        .how-head { max-width: 860px; margin-bottom: 80px; }
        .how-title {
          font-size: clamp(40px, 5vw, 72px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          font-weight: 600;
          text-wrap: balance;
        }
        .how-title .serif { font-weight: 400; font-size: 1.02em; }
        .how-timeline {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          padding-top: 60px;
        }
        .how-line {
          position: absolute;
          top: 60px;
          left: 16.66%;
          right: 16.66%;
          height: 1px;
          background: var(--line-strong);
          pointer-events: none;
        }
        .how-line-inner {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #60a5fa, #34e2b6, #8b5cf6);
          opacity: 0.6;
          filter: blur(0.5px);
          animation: grad-shift 5s ease-in-out infinite;
          background-size: 200% 100%;
        }
        .how-step {
          display: flex; flex-direction: column;
          align-items: flex-start;
          gap: 28px;
          position: relative;
        }
        .how-marker {
          position: relative;
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
        }
        .how-marker-pulse {
          position: absolute; inset: 0;
          border-radius: 50%;
          opacity: 0.2;
          animation: pulse-ring 2s ease-out infinite;
        }
        .how-marker-dot {
          width: 12px; height: 12px; border-radius: 50%;
          border: 2px solid var(--bg-1);
          z-index: 1;
        }
        .how-card {
          padding: 28px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--line);
          border-radius: 18px;
          backdrop-filter: blur(20px);
          width: 100%;
          transition: transform 300ms var(--ease), border-color 300ms, background 300ms;
        }
        .how-card:hover {
          transform: translateY(-4px);
          border-color: var(--line-strong);
          background: rgba(255,255,255,0.04);
        }
        .how-time {
          display: inline-block;
          font-size: 11px; font-weight: 600;
          padding: 4px 10px;
          border: 1px solid currentColor;
          border-radius: 99px;
          opacity: 0.9;
          margin-bottom: 16px;
          letter-spacing: 0.05em;
        }
        .how-num {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: 56px;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          opacity: 0.85;
        }
        .how-step-title {
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        .how-step-sub {
          font-size: 13px;
          color: var(--ink-400);
          font-family: var(--font-mono);
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .how-step-body {
          font-size: 15px;
          line-height: 1.55;
          color: var(--ink-200);
          text-wrap: pretty;
        }

        @media (max-width: 960px) {
          .how-timeline { grid-template-columns: 1fr; }
          .how-line { display: none; }
        }
      `}</style>
    </section>
  );
}

window.HowItWorks = HowItWorks;
