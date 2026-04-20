const { useState: useStateFeat } = React;

function Features() {
  const [active, setActive] = useStateFeat(0);

  const features = [
    {
      id: 'voice',
      num: '01',
      title: 'A voice agent that never sleeps.',
      sub: 'Real-time phone agent.',
      body: 'Natural-language intake in 40+ languages. Classifies intent, captures room, priority, and follow-up needs. Hands the ticket to dispatch before the guest has hung up.',
      color: '#60a5fa',
      stat: { val: '3.2s', label: 'avg call → ticket' },
      demo: 'voice',
    },
    {
      id: 'dispatch',
      num: '02',
      title: 'Dispatch that knows who, where, how fast.',
      sub: 'Auto-routing across departments.',
      body: 'Every ticket lands on the right shoulders: nearest staff, right skill, right load. Shift handovers and escalations happen without a single Slack ping.',
      color: '#34e2b6',
      stat: { val: '0.8s', label: 'time to assignee' },
      demo: 'dispatch',
    },
    {
      id: 'dashboard',
      num: '03',
      title: 'One pane of glass for the whole property.',
      sub: 'Manager command center.',
      body: 'Response times, SLA breaches, department load, guest satisfaction — live. Drill into any ticket; replay any conversation. Export the P&L, close the loop.',
      color: '#8b5cf6',
      stat: { val: '140+', label: 'live KPIs' },
      demo: 'dashboard',
    },
    {
      id: 'integrations',
      num: '04',
      title: 'Plugs into everything you already run.',
      sub: 'PMS, POS, locks, IoT.',
      body: 'Opera, Mews, Cloudbeds, Apaleo. Saflok, Assa Abloy. Micros, Toast. Alexa-for-Business rooms. We speak their protocols so your staff don\'t have to.',
      color: '#fbbf24',
      stat: { val: '40+', label: 'native integrations' },
      demo: 'integrations',
    },
  ];

  const current = features[active];

  return (
    <section id="features" className="feat reveal">
      <div className="container">
        <div className="feat-head">
          <div className="section-num">04 · PLATFORM</div>
          <h2 className="feat-title">
            Four surfaces.<br/>
            <span className="serif text-gradient">One continuous shift.</span>
          </h2>
        </div>

        <div className="feat-grid">
          {/* Left rail — selectable list */}
          <div className="feat-rail">
            {features.map((f, i) => (
              <button
                key={f.id}
                className={`feat-item ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <div className="feat-item-num mono">{f.num}</div>
                <div className="feat-item-body">
                  <div className="feat-item-title">{f.title}</div>
                  <div className="feat-item-sub">{f.sub}</div>
                </div>
                <div className="feat-item-arrow" style={{ color: f.color }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </button>
            ))}
          </div>

          {/* Right — preview */}
          <div className="feat-preview" style={{ '--accent': current.color }}>
            <div className="feat-preview-glow" style={{ background: `radial-gradient(500px 400px at 50% 0%, ${current.color}22, transparent 70%)` }}></div>

            <div className="feat-preview-head">
              <div className="feat-preview-sub">
                <span className="feat-dot" style={{ background: current.color, boxShadow: `0 0 10px ${current.color}` }}></span>
                {current.sub}
              </div>
              <h3 className="feat-preview-title">{current.title}</h3>
              <p className="feat-preview-body">{current.body}</p>
            </div>

            <div className="feat-preview-demo">
              <FeatureDemo kind={current.demo} color={current.color} />
            </div>

            <div className="feat-preview-stat">
              <div className="feat-stat-val mono" style={{ color: current.color }}>{current.stat.val}</div>
              <div className="feat-stat-label">{current.stat.label}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .feat { padding: 120px 0; }
        .feat-head { max-width: 860px; margin-bottom: 72px; }
        .feat-title {
          font-size: clamp(40px, 5vw, 72px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          font-weight: 600;
          text-wrap: balance;
        }
        .feat-title .serif { font-weight: 400; font-size: 1.02em; }
        .feat-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 32px;
          align-items: start;
        }
        .feat-rail {
          display: flex; flex-direction: column;
          border-top: 1px solid var(--line);
        }
        .feat-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 20px;
          align-items: start;
          padding: 28px 0;
          border-bottom: 1px solid var(--line);
          text-align: left;
          transition: padding 300ms var(--ease);
          position: relative;
        }
        .feat-item::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px;
          background: transparent;
          transition: background 200ms;
        }
        .feat-item:hover {
          padding-left: 14px;
        }
        .feat-item:hover::before {
          background: var(--line-strong);
        }
        .feat-item.active {
          padding-left: 16px;
        }
        .feat-item.active::before {
          background: linear-gradient(180deg, #60a5fa, #34e2b6);
          box-shadow: 0 0 20px rgba(96,165,250,0.5);
        }
        .feat-item-num {
          font-size: 12px;
          color: var(--ink-500);
          padding-top: 4px;
          font-weight: 500;
        }
        .feat-item.active .feat-item-num { color: var(--ink-200); }
        .feat-item-title {
          font-size: 19px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ink-300);
          line-height: 1.3;
          transition: color 200ms;
        }
        .feat-item.active .feat-item-title,
        .feat-item:hover .feat-item-title {
          color: var(--ink-100);
        }
        .feat-item-sub {
          font-size: 13px;
          color: var(--ink-500);
          margin-top: 4px;
        }
        .feat-item-arrow {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 200ms, transform 200ms var(--ease);
          padding-top: 6px;
        }
        .feat-item.active .feat-item-arrow,
        .feat-item:hover .feat-item-arrow {
          opacity: 1;
          transform: none;
        }

        /* Preview panel */
        .feat-preview {
          position: relative;
          border-radius: 20px;
          padding: 40px;
          background: rgba(8,12,20,0.7);
          border: 1px solid var(--line-strong);
          backdrop-filter: blur(20px);
          min-height: 640px;
          display: flex; flex-direction: column;
          overflow: hidden;
          position: sticky; top: 100px;
        }
        .feat-preview-glow {
          position: absolute; inset: 0;
          pointer-events: none;
          transition: background 400ms var(--ease);
        }
        .feat-preview-head { margin-bottom: 24px; position: relative; z-index: 1; }
        .feat-preview-sub {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--ink-300);
          margin-bottom: 18px;
        }
        .feat-dot { width: 6px; height: 6px; border-radius: 50%; }
        .feat-preview-title {
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 12px;
          text-wrap: balance;
        }
        .feat-preview-body {
          font-size: 15.5px;
          line-height: 1.55;
          color: var(--ink-300);
          text-wrap: pretty;
          max-width: 520px;
        }
        .feat-preview-demo {
          flex: 1;
          margin: 20px 0;
          min-height: 280px;
          display: flex;
          align-items: stretch;
          position: relative; z-index: 1;
        }
        .feat-preview-stat {
          display: flex; align-items: baseline; gap: 12px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
          position: relative; z-index: 1;
        }
        .feat-stat-val {
          font-size: 32px;
          font-weight: 500;
          letter-spacing: -0.03em;
        }
        .feat-stat-label {
          font-size: 13px;
          color: var(--ink-400);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        @media (max-width: 960px) {
          .feat-grid { grid-template-columns: 1fr; }
          .feat-preview { position: static; min-height: 0; }
        }
      `}</style>
    </section>
  );
}

/* ============ Per-feature mini-demos ============ */
function FeatureDemo({ kind, color }) {
  if (kind === 'voice') return <VoiceDemo color={color} />;
  if (kind === 'dispatch') return <DispatchDemo color={color} />;
  if (kind === 'dashboard') return <DashboardDemo color={color} />;
  if (kind === 'integrations') return <IntegrationsDemo color={color} />;
  return null;
}

function VoiceDemo({ color }) {
  const bars = Array.from({ length: 36 }, (_, i) => i);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, padding: 20, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${color}, #34e2b6)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" fill="#050810"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" stroke="#050810" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Inbound · Rm 402</div>
            <div style={{ fontSize: 11, color: 'var(--ink-400)' }} className="mono">00:47 · live</div>
          </div>
        </div>
        <div style={{ fontSize: 10, color: color, letterSpacing: '0.16em', fontWeight: 700 }}>● LISTENING</div>
      </div>
      <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 54 }}>
        {bars.map(i => (
          <div key={i} style={{
            flex: 1,
            height: `${20 + Math.sin(i * 0.6) * 20 + (i % 3) * 6}px`,
            background: `linear-gradient(180deg, ${color}, ${color}40)`,
            borderRadius: 2,
            animation: `wave ${1 + (i % 4) * 0.2}s ease-in-out ${i * 0.04}s infinite`,
            transformOrigin: 'center',
          }} />
        ))}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--ink-200)', fontStyle: 'italic' }}>
        "Hi, this is room 402 — could we get extra towels and some ice please? We're leaving early tomorrow…"
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['room: 402', 'intent: housekeeping', 'priority: normal', 'lang: en-GB'].map((t,i) => (
          <span key={i} className="mono" style={{ fontSize: 10.5, padding: '4px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line)', color: 'var(--ink-300)' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function DispatchDemo({ color }) {
  const cols = [
    { label: 'NEW', items: [{ r: '808', t: 'Extra pillow' }] },
    { label: 'IN-PROGRESS', items: [{ r: '402', t: 'Towels + ice', who: 'María' }, { r: '215', t: 'AC repair', who: 'José' }] },
    { label: 'DONE', items: [{ r: '601', t: 'Room service' }] },
  ];
  return (
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
      {cols.map((c, ci) => (
        <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid var(--line)', minHeight: 240 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: ci === 1 ? color : 'var(--ink-400)', marginBottom: 4, whiteSpace: 'nowrap' }}>{c.label} · {c.items.length}</div>
          {c.items.map((it, i) => (
            <div key={i} style={{ padding: 10, background: 'rgba(8,12,20,0.8)', borderRadius: 8, border: `1px solid ${ci === 1 ? color + '40' : 'var(--line)'}`, boxShadow: ci === 1 ? `0 0 16px -4px ${color}30` : 'none' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-500)', marginBottom: 2 }}>#{1000 + ci * 2 + i} · Rm {it.r}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-100)', marginBottom: 4 }}>{it.t}</div>
              {it.who && <div style={{ fontSize: 10, color: 'var(--ink-300)' }}>→ {it.who}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function DashboardDemo({ color }) {
  const bars = [62, 88, 45, 92, 74, 66, 81];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, padding: 20, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[['247', 'tasks'], ['12s', 'avg'], ['94%', 'SLA']].map(([v, l], i) => (
          <div key={i} style={{ padding: 10, background: 'rgba(8,12,20,0.6)', borderRadius: 8, border: '1px solid var(--line)' }}>
            <div className="mono" style={{ fontSize: 18, fontWeight: 500, color, letterSpacing: '-0.02em' }}>{v}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 6, minHeight: 120, padding: '12px 8px', borderRadius: 10, background: 'rgba(8,12,20,0.4)' }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: '100%',
              height: `${h}%`,
              background: `linear-gradient(180deg, ${color}, ${color}30)`,
              borderRadius: '4px 4px 0 0',
              transition: 'height 400ms',
            }} />
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-500)' }}>{['M','T','W','T','F','S','S'][i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsDemo({ color }) {
  const groups = [
    { label: 'PMS', items: ['Opera', 'Mews', 'Cloudbeds', 'Apaleo'] },
    { label: 'POS', items: ['Micros', 'Toast', 'Lightspeed'] },
    { label: 'LOCKS', items: ['Saflok', 'Assa Abloy', 'Salto'] },
    { label: 'IoT', items: ['Alexa', 'Sonos', 'Lutron'] },
  ];
  return (
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {groups.map((g, i) => (
        <div key={i} style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color, marginBottom: 10 }}>{g.label}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {g.items.map((it, j) => (
              <span key={j} style={{ fontSize: 11, padding: '5px 10px', background: 'rgba(8,12,20,0.6)', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--ink-200)' }}>{it}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

window.Features = Features;
