const { useEffect: useEffectStats, useRef: useRefStats, useState: useStateStats } = React;

function StatNumber({ end, prefix = '', suffix = '', decimals = 0, duration = 1800 }) {
  const [val, setVal] = useStateStats(0);
  const ref = useRefStats(null);
  const started = useRefStats(false);

  useEffectStats(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(end * eased);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end, duration]);

  const formatted = decimals > 0
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString();

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

function Stats() {
  const stats = [
    { num: 12, suffix: 's', label: 'avg. response time', sub: 'down from 7m 22s', color: '#34e2b6' },
    { num: 2.4, suffix: 'M', prefix: '', decimals: 1, label: 'requests handled', sub: 'across the network', color: '#60a5fa' },
    { num: 94, suffix: '%', label: 'handled without staff', sub: 'in first 30 days', color: '#8b5cf6' },
    { num: 4.9, suffix: '★', decimals: 1, label: 'guest satisfaction', sub: '+0.6 vs baseline', color: '#fbbf24' },
  ];

  return (
    <section className="stats reveal">
      <div className="container">
        <div className="stats-head">
          <div className="section-num">02 · BY THE NUMBERS</div>
          <h2 className="stats-title">
            What happens when every request<br/>
            <span className="serif text-gradient">is met in seconds, not minutes.</span>
          </h2>
        </div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-accent" style={{ background: s.color }}></div>
              <div className="stat-value mono">
                <StatNumber end={s.num} prefix={s.prefix || ''} suffix={s.suffix || ''} decimals={s.decimals || 0} />
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats {
          padding: 120px 0;
          position: relative;
        }
        .stats-head {
          max-width: 860px;
          margin-bottom: 72px;
        }
        .stats-title {
          font-size: clamp(36px, 4.4vw, 60px);
          line-height: 1.04;
          letter-spacing: -0.028em;
          font-weight: 600;
          text-wrap: balance;
        }
        .stats-title .serif {
          font-weight: 400;
          font-size: 1.02em;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: 20px;
          overflow: hidden;
        }
        .stat-card {
          position: relative;
          padding: 40px 32px;
          background: rgba(8,12,20,0.6);
          transition: background 300ms;
          min-height: 220px;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }
        .stat-card:hover { background: rgba(15,21,32,0.8); }
        .stat-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          opacity: 0.8;
          box-shadow: 0 0 20px currentColor;
        }
        .stat-value {
          font-size: clamp(44px, 4.6vw, 68px);
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.04em;
          color: var(--ink-100);
          margin-bottom: 16px;
        }
        .stat-label {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ink-200);
          margin-bottom: 4px;
        }
        .stat-sub {
          font-size: 12px;
          color: var(--ink-400);
          font-family: var(--font-mono);
        }
        @media (max-width: 960px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

window.Stats = Stats;
