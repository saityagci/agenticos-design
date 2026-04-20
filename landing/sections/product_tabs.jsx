const { useState: useStatePT } = React;

function ProductTabs() {
  const [tab, setTab] = useStatePT(0);

  const tabs = [
    {
      id: 'dispatch',
      label: 'Dispatch',
      sub: 'Live tasks across every department',
      render: () => <DispatchMock />,
    },
    {
      id: 'dashboard',
      label: 'Manager',
      sub: 'Response-time P&L, SLAs, team load',
      render: () => <DashboardMock />,
    },
    {
      id: 'agent',
      label: 'AI Agent',
      sub: 'Call transcripts, classification, handoffs',
      render: () => <AgentMock />,
    },
    {
      id: 'guest',
      label: 'Guest App',
      sub: 'In-room tablet + mobile web',
      render: () => <GuestMock />,
    },
  ];

  return (
    <section id="product" className="pt reveal">
      <div className="container">
        <div className="pt-head">
          <div className="section-num">06 · INSIDE THE PRODUCT</div>
          <h2 className="pt-title">
            Four views.<br/>
            <span className="serif text-gradient">One source of truth.</span>
          </h2>
        </div>

        <div className="pt-tabs">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              className={`pt-tab ${i === tab ? 'active' : ''}`}
              onClick={() => setTab(i)}
            >
              <div className="pt-tab-label">{t.label}</div>
              <div className="pt-tab-sub">{t.sub}</div>
            </button>
          ))}
        </div>

        <div className="pt-stage">
          <div className="pt-stage-chrome">
            <div className="pt-stage-dots">
              <span style={{ background: '#ff5f56' }}></span>
              <span style={{ background: '#ffbd2e' }}></span>
              <span style={{ background: '#27c93f' }}></span>
            </div>
            <div className="pt-stage-url mono">agenticos.hotel / {tabs[tab].id}</div>
            <div style={{ width: 60 }} />
          </div>
          <div className="pt-stage-body">
            {tabs[tab].render()}
          </div>
        </div>
      </div>

      <style>{`
        .pt { padding: 120px 0; }
        .pt-head { max-width: 860px; margin-bottom: 48px; }
        .pt-title {
          font-size: clamp(40px, 5vw, 72px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          font-weight: 600;
          text-wrap: balance;
        }
        .pt-title .serif { font-weight: 400; font-size: 1.02em; }
        .pt-tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-bottom: 1px solid var(--line);
          margin-bottom: 24px;
        }
        .pt-tab {
          text-align: left;
          padding: 20px 24px;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: border-color 200ms, background 200ms;
          color: var(--ink-400);
        }
        .pt-tab:hover { background: var(--surface); color: var(--ink-200); }
        .pt-tab.active {
          border-bottom-color: var(--teal);
          color: var(--ink-100);
          background: var(--surface);
        }
        .pt-tab-label {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }
        .pt-tab-sub {
          font-size: 12px;
          color: var(--ink-500);
        }
        .pt-tab.active .pt-tab-sub { color: var(--ink-300); }

        .pt-stage {
          border-radius: 18px;
          overflow: hidden;
          background: rgba(5,8,16,0.9);
          border: 1px solid var(--line-strong);
          box-shadow: 0 40px 80px -24px rgba(0,0,0,0.6);
        }
        .pt-stage-chrome {
          height: 36px;
          display: flex; align-items: center;
          padding: 0 14px;
          background: rgba(8,12,20,0.85);
          border-bottom: 1px solid var(--line);
          gap: 16px;
        }
        .pt-stage-dots { display: flex; gap: 6px; }
        .pt-stage-dots span {
          width: 10px; height: 10px; border-radius: 50%;
          opacity: 0.8;
        }
        .pt-stage-url {
          flex: 1;
          text-align: center;
          font-size: 11px;
          color: var(--ink-400);
        }
        .pt-stage-body {
          min-height: 540px;
          padding: 28px;
        }

        @media (max-width: 840px) {
          .pt-tabs { grid-template-columns: repeat(2, 1fr); }
          .pt-stage-body { padding: 20px; min-height: 0; }
        }
      `}</style>
    </section>
  );
}

/* ========== Product mocks ========== */
function DispatchMock() {
  const cols = [
    { label: 'NEW', n: 3, color: '#60a5fa', items: [
      { id: 1042, rm: '808', dept: 'HK', task: 'Extra pillow + blanket', prio: 'low', age: '14s' },
      { id: 1043, rm: '215', dept: 'ENG', task: 'AC not cooling', prio: 'high', age: '1m' },
      { id: 1044, rm: '502', dept: 'F&B', task: 'Late breakfast request', prio: 'med', age: '3m' },
    ]},
    { label: 'IN-PROGRESS', n: 4, color: '#fbbf24', items: [
      { id: 1038, rm: '402', dept: 'HK', task: 'Towels + ice bucket', prio: 'med', who: 'María S.', age: '4m' },
      { id: 1039, rm: '901', dept: 'CONC', task: 'Dinner reservation 8pm', prio: 'med', who: 'Leo K.', age: '6m' },
      { id: 1040, rm: '303', dept: 'ENG', task: 'TV remote replacement', prio: 'low', who: 'Diego R.', age: '9m' },
      { id: 1041, rm: '706', dept: 'HK', task: 'Deep clean post-pet', prio: 'high', who: 'Ana T.', age: '12m' },
    ]},
    { label: 'COMPLETED · 47 TODAY', n: 2, color: '#34e2b6', items: [
      { id: 1036, rm: '601', dept: 'F&B', task: 'Room service — coffee', prio: 'low', who: 'Tomás', age: '✓ 3m' },
      { id: 1037, rm: '118', dept: 'HK', task: 'Iron + board', prio: 'low', who: 'María S.', age: '✓ 6m' },
    ]},
  ];
  const deptColor = { HK: '#34e2b6', ENG: '#fbbf24', 'F&B': '#f59e0b', CONC: '#8b5cf6' };
  const prioColor = { high: '#f87171', med: '#fbbf24', low: '#64748b' };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, height: '100%' }}>
      {cols.map((c, ci) => (
        <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 8px', borderBottom: `1px solid ${c.color}30` }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: c.color, whiteSpace: 'nowrap' }}>{c.label}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-400)' }}>{c.n}</div>
          </div>
          {c.items.map((it, i) => (
            <div key={i} style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', transition: 'border-color 200ms, transform 200ms' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-500)' }}>#{it.id} · Rm {it.rm}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: deptColor[it.dept] + '20', color: deptColor[it.dept], fontWeight: 700, letterSpacing: '0.06em' }}>{it.dept}</span>
                  <span style={{ width: 6, height: 6, borderRadius: 50, background: prioColor[it.prio] }}></span>
                </div>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink-100)', marginBottom: 8, lineHeight: 1.35 }}>{it.task}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--ink-400)' }}>{it.who || '— unassigned'}</div>
                <div className="mono" style={{ fontSize: 10, color: c.color }}>{it.age}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function DashboardMock() {
  const kpis = [
    { val: '12s', label: 'Avg response', d: '−35%', good: true, color: '#34e2b6' },
    { val: '247', label: 'Tasks today', d: '+18%', good: true, color: '#60a5fa' },
    { val: '94%', label: 'Auto-handled', d: '+6pp', good: true, color: '#8b5cf6' },
    { val: '4.9★', label: 'CSAT', d: '+0.3', good: true, color: '#fbbf24' },
  ];
  const depts = [
    { name: 'Housekeeping', load: 78, staff: 12, color: '#34e2b6' },
    { name: 'Engineering', load: 42, staff: 4, color: '#fbbf24' },
    { name: 'Concierge', load: 61, staff: 3, color: '#8b5cf6' },
    { name: 'F&B', load: 88, staff: 8, color: '#f59e0b' },
    { name: 'Front Desk', load: 34, staff: 5, color: '#60a5fa' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)' }}>
            <div className="mono" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--ink-100)', marginBottom: 4 }}>{k.val}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 11, color: k.color, fontWeight: 600 }}>▲ {k.d} vs last week</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-200)' }}>Request volume · 24h</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-500)' }}>REAL-TIME</div>
          </div>
          <svg viewBox="0 0 400 140" style={{ width: '100%', height: 140 }}>
            <defs>
              <linearGradient id="areafill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34e2b6" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#34e2b6" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,100 L30,92 L60,80 L90,85 L120,60 L150,70 L180,40 L210,55 L240,30 L270,45 L300,25 L330,38 L360,20 L400,28 L400,140 L0,140 Z" fill="url(#areafill)"/>
            <path d="M0,100 L30,92 L60,80 L90,85 L120,60 L150,70 L180,40 L210,55 L240,30 L270,45 L300,25 L330,38 L360,20 L400,28" fill="none" stroke="#34e2b6" strokeWidth="1.8"/>
            {[0, 60, 120, 180, 240, 300, 360].map((x, i) => (
              <g key={i}>
                <line x1={x} y1="0" x2={x} y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
              </g>
            ))}
          </svg>
        </div>
        <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-200)', marginBottom: 14 }}>Department load</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {depts.map((d, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: 'var(--ink-200)' }}>{d.name}</span>
                  <span className="mono" style={{ color: 'var(--ink-400)' }}>{d.load}% · {d.staff}</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ width: `${d.load}%`, height: '100%', background: d.color, boxShadow: `0 0 8px ${d.color}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentMock() {
  const lines = [
    { r: 'guest', t: '"Hi, this is room 402 — could we get extra towels and some ice, please?"' },
    { r: 'agent', t: '"Of course. How many towels — and will that be a full ice bucket?"' },
    { r: 'guest', t: '"Two bath towels. And yes, full bucket. We\'re leaving early tomorrow."' },
    { r: 'agent', t: '"Got it. Sending María up within 5 minutes. You\'ll get a text when she\'s on her way. Anything else?"' },
    { r: 'guest', t: '"No thanks, that\'s perfect."' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Call #28,441</div>
          <div className="mono" style={{ fontSize: 11, color: '#34e2b6' }}>● LIVE 00:47</div>
        </div>
        {lines.map((l, i) => (
          <div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: l.r === 'agent' ? 'rgba(96,165,250,0.08)' : 'rgba(255,255,255,0.03)', borderLeft: `2px solid ${l.r === 'agent' ? '#60a5fa' : 'transparent'}`, fontSize: 13, lineHeight: 1.45, color: 'var(--ink-200)' }}>
            <div style={{ fontSize: 10, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{l.r === 'agent' ? 'AGENT' : 'GUEST · RM 402'}</div>
            <div style={{ fontStyle: 'italic' }}>{l.t}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)' }}>
          <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>Extracted ticket</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Room', '402'], ['Intent', 'Housekeeping delivery'], ['Items', '2 towels, full ice bucket'], ['Priority', 'Normal'], ['SLA', '5 minutes'], ['Constraint', 'Early checkout tomorrow']].map(([k, v], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 10, fontSize: 12, paddingBottom: 10, borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                <div style={{ color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 10 }}>{k}</div>
                <div style={{ color: 'var(--ink-100)', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: 20, borderRadius: 12, background: 'linear-gradient(135deg, rgba(52,226,182,0.1), rgba(96,165,250,0.05))', border: '1px solid rgba(52,226,182,0.3)' }}>
          <div style={{ fontSize: 11, color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8, fontWeight: 600 }}>→ Routed</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>María S. · Housekeeping · Floor 4</div>
          <div style={{ fontSize: 12, color: 'var(--ink-300)' }}>Accepted in 0.8s · ETA 4m 12s</div>
        </div>
      </div>
    </div>
  );
}

function GuestMock() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'stretch' }}>
      <div style={{ padding: 24, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 20 }}>In-room tablet · Rm 402</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 6 }}>Good evening, <span className="serif" style={{ fontStyle: 'italic' }}>Amelia</span>.</div>
        <div style={{ fontSize: 14, color: 'var(--ink-300)', marginBottom: 28 }}>How can we make tonight easier?</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1 }}>
          {[
            { i: '🛎', l: 'Housekeeping', s: 'Towels, turndown, extras' },
            { i: '☕', l: 'Room service', s: '24-hour menu' },
            { i: '🔑', l: 'Front desk', s: 'Extend, late checkout' },
            { i: '🧭', l: 'Concierge', s: 'Reservations, transport' },
          ].map((t, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{t.i}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t.l}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-400)' }}>{t.s}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: 14, borderRadius: 10, background: 'linear-gradient(135deg, rgba(96,165,250,0.1), rgba(52,226,182,0.05))', border: '1px solid rgba(96,165,250,0.2)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: 50, background: '#34e2b6', boxShadow: '0 0 10px #34e2b6' }}></div>
          <div style={{ flex: 1, fontSize: 12, color: 'var(--ink-200)' }}>Towels on their way — María arrives in 4 min</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 480, borderRadius: 40, background: '#050810', border: '8px solid #1a2030', boxShadow: '0 40px 60px -20px rgba(0,0,0,0.5)', padding: 14, display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: 'var(--ink-400)', padding: '0 4px', marginBottom: 10 }}>
            <span className="mono">22:47</span>
            <span className="mono">● 100%</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '-0.01em', marginBottom: 4 }}>Your stay</div>
          <div style={{ fontSize: 11, color: 'var(--ink-400)', marginBottom: 20 }}>THE MARSEILLE · RM 402</div>
          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(52,226,182,0.08)', border: '1px solid rgba(52,226,182,0.3)', marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: '#6ee7b7', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>On the way</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Towels + ice</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-300)' }}>ETA 4m 12s</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Breakfast at 6am', 'Request a taxi', 'Checkout'].map((t, i) => (
              <div key={i} style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', fontSize: 12, color: 'var(--ink-200)' }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.ProductTabs = ProductTabs;
