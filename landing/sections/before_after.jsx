function BeforeAfter() {
  const beforeItems = [
    { time: '02:47', dept: 'Radio', text: '"Housekeep to 402, copy?" … static', urgent: true },
    { time: '02:49', dept: 'Front desk', text: 'Pink Post-it: "Rm 807 needs iron + towel"' },
    { time: '02:51', dept: 'Phone', text: 'Voicemail #14 — missed escalation' },
    { time: '02:53', dept: 'Text', text: 'WhatsApp from manager: "who took 502??"' },
    { time: '02:54', dept: 'Radio', text: '"…repeat, did anyone get 807?"', urgent: true },
    { time: '03:02', dept: 'Email', text: '1 of 7 unread from guest services', urgent: true },
  ];

  const afterItems = [
    { time: '02:47:03', dept: 'AI Agent', text: 'Inbound call · Rm 402 · classified Housekeeping', status: 'auto' },
    { time: '02:47:06', dept: 'Dispatch', text: 'Assigned · María S. · 4.9★ available', status: 'auto' },
    { time: '02:47:21', dept: 'In progress', text: 'Acknowledged on mobile · ETA 4m', status: 'live' },
    { time: '02:51:08', dept: 'Completed', text: 'Signed off · guest notified · logged', status: 'done' },
  ];

  return (
    <section className="ba reveal">
      <div className="container">
        <div className="ba-head">
          <div className="section-num">03 · THE DIFFERENCE</div>
          <h2 className="ba-title">
            The same Tuesday night,<br/>
            <span className="serif text-gradient">run two different ways.</span>
          </h2>
          <p className="ba-sub">
            Slide to compare. Left: a typical 50-key hotel running on radios,
            sticky notes, and good intentions. Right: the same hotel on AgenticOS.
          </p>
        </div>

        <div className="ba-split">
          {/* BEFORE */}
          <div className="ba-panel ba-before">
            <div className="ba-panel-head">
              <div className="ba-tag" style={{ borderColor: 'rgba(248,113,113,0.3)', color: '#fca5a5' }}>
                <span className="ba-tag-dot" style={{ background: '#f87171' }}></span>
                BEFORE
              </div>
              <div className="ba-panel-title">Tuesday · 02:47 AM</div>
              <div className="ba-panel-sub mono">4 open escalations · 2 missed</div>
            </div>
            <div className="ba-feed">
              {beforeItems.map((it, i) => (
                <div key={i} className={`ba-item ${it.urgent ? 'urgent' : ''}`}>
                  <div className="ba-time mono">{it.time}</div>
                  <div className="ba-content">
                    <div className="ba-dept">{it.dept}</div>
                    <div className="ba-text">{it.text}</div>
                  </div>
                  {it.urgent && <div className="ba-flag">!</div>}
                </div>
              ))}
              <div className="ba-chaos-overlay">
                <div className="ba-chaos-word">chaos</div>
              </div>
            </div>
          </div>

          {/* AFTER */}
          <div className="ba-panel ba-after">
            <div className="ba-panel-head">
              <div className="ba-tag" style={{ borderColor: 'rgba(52,226,182,0.35)', color: '#6ee7b7' }}>
                <span className="ba-tag-dot" style={{ background: '#34e2b6' }}></span>
                AFTER · AGENTICOS
              </div>
              <div className="ba-panel-title">Tuesday · 02:47 AM</div>
              <div className="ba-panel-sub mono">All requests tracked · 0 missed</div>
            </div>
            <div className="ba-feed">
              {afterItems.map((it, i) => (
                <div key={i} className={`ba-item ba-item-after status-${it.status}`}>
                  <div className="ba-time mono">{it.time}</div>
                  <div className="ba-content">
                    <div className="ba-dept">{it.dept}</div>
                    <div className="ba-text">{it.text}</div>
                  </div>
                  <div className="ba-check">
                    {it.status === 'done' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#34e2b6" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                    {it.status === 'live' && <span className="ba-live-dot"></span>}
                    {it.status === 'auto' && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="#60a5fa"/></svg>
                    )}
                  </div>
                </div>
              ))}
              <div className="ba-after-summary">
                <div style={{ fontSize: 12, color: 'var(--ink-400)', marginBottom: 4 }}>Resolution time</div>
                <div className="mono" style={{ fontSize: 28, fontWeight: 500, color: '#34e2b6', letterSpacing: '-0.02em' }}>4m 05s</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ba { padding: 120px 0; }
        .ba-head { max-width: 760px; margin-bottom: 56px; }
        .ba-title {
          font-size: clamp(36px, 4.4vw, 60px);
          line-height: 1.04;
          letter-spacing: -0.028em;
          font-weight: 600;
          margin-bottom: 20px;
          text-wrap: balance;
        }
        .ba-title .serif { font-weight: 400; font-size: 1.02em; }
        .ba-sub {
          font-size: 17px;
          line-height: 1.55;
          color: var(--ink-300);
          max-width: 620px;
        }
        .ba-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .ba-panel {
          border-radius: 20px;
          overflow: hidden;
          min-height: 560px;
          position: relative;
          display: flex; flex-direction: column;
        }
        .ba-before {
          background:
            radial-gradient(600px 400px at 30% 10%, rgba(248,113,113,0.08), transparent 60%),
            rgba(12,8,10,0.7);
          border: 1px solid rgba(248,113,113,0.15);
        }
        .ba-after {
          background:
            radial-gradient(600px 400px at 30% 10%, rgba(52,226,182,0.08), transparent 60%),
            rgba(8,14,14,0.7);
          border: 1px solid rgba(52,226,182,0.18);
        }
        .ba-panel-head {
          padding: 28px 28px 20px;
          border-bottom: 1px solid var(--line);
        }
        .ba-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.18em;
          padding: 6px 12px;
          border: 1px solid;
          border-radius: 99px;
          margin-bottom: 16px;
        }
        .ba-tag-dot {
          width: 6px; height: 6px; border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }
        .ba-panel-title {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: 2px;
        }
        .ba-panel-sub {
          font-size: 12px;
          color: var(--ink-400);
        }
        .ba-feed {
          padding: 20px 28px;
          display: flex; flex-direction: column; gap: 8px;
          position: relative;
          flex: 1;
        }
        .ba-item {
          display: grid;
          grid-template-columns: 64px 1fr auto;
          gap: 16px;
          align-items: start;
          padding: 12px 0;
          border-bottom: 1px dashed rgba(255,255,255,0.05);
          opacity: 0.85;
        }
        .ba-item.urgent {
          opacity: 1;
        }
        .ba-time {
          font-size: 11px;
          color: var(--ink-500);
          padding-top: 2px;
        }
        .ba-item.urgent .ba-time { color: #fca5a5; }
        .ba-dept {
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--ink-400);
          margin-bottom: 4px;
        }
        .ba-text {
          font-size: 14px;
          color: var(--ink-200);
          line-height: 1.4;
        }
        .ba-flag {
          width: 22px; height: 22px;
          border-radius: 6px;
          background: rgba(248,113,113,0.12);
          color: #fca5a5;
          font-size: 12px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(248,113,113,0.25);
        }
        .ba-chaos-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex; align-items: flex-end; justify-content: flex-end;
          padding: 24px;
        }
        .ba-chaos-word {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 300;
          font-size: 120px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(248,113,113,0.12);
          letter-spacing: -0.04em;
          transform: rotate(-4deg);
        }

        /* After */
        .ba-item-after {
          opacity: 1;
          border-bottom-color: rgba(255,255,255,0.04);
        }
        .ba-item-after .ba-time { color: var(--ink-300); }
        .ba-item-after.status-auto .ba-dept { color: #93c5fd; }
        .ba-item-after.status-live .ba-dept { color: #fbbf24; }
        .ba-item-after.status-done .ba-dept { color: #6ee7b7; }
        .ba-check {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px;
          border-radius: 8px;
          background: var(--surface);
          border: 1px solid var(--line);
        }
        .ba-live-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #fbbf24;
          animation: pulse-ring 1.4s ease-out infinite;
        }
        .ba-after-summary {
          margin-top: auto;
          padding: 20px;
          border: 1px solid rgba(52,226,182,0.2);
          border-radius: 12px;
          background: rgba(52,226,182,0.04);
        }

        @media (max-width: 960px) {
          .ba-split { grid-template-columns: 1fr; }
          .ba-panel { min-height: 0; }
          .ba-chaos-word { font-size: 80px; }
        }
      `}</style>
    </section>
  );
}

window.BeforeAfter = BeforeAfter;
