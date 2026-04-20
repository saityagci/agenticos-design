// Scene 4: Manager Dashboard — 18 to 26s
// Camera pulls all the way back to show the command center.
// KPIs count up (42s → 12s response, 4.9★ sat, 247 tasks). Live chart draws.

function Scene4Dashboard() {
  const t = useTime();
  if (t < 17.8 || t > 26.2) return null;
  const localT = t - 18.0;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield count={40} />

      <Sprite start={18.0} end={26.0}>
        {({ localTime, duration }) => {
          const enter = Easing.easeOutCubic(Math.min(1, localTime / 0.7));
          const exit = Math.max(0, 1 - Math.max(0, localTime - (duration - 0.5)) / 0.5);
          const scale = 0.9 + enter * 0.1;
          return (
            <div style={{
              position: 'absolute',
              left: 60, top: 60, right: 60, bottom: 60,
              opacity: enter * exit,
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              backdropFilter: 'blur(24px)',
              padding: 28,
              display: 'flex', flexDirection: 'column', gap: 22,
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)',
            }}>
              <DashHeader />
              <KPIRow localT={localTime} />
              <DashBottomRow localT={localTime} />
            </div>
          );
        }}
      </Sprite>
    </div>
  );
}

function DashHeader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <LogoMark size={30} />
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9' }}>Command Center</div>
        <div style={{ fontSize: 12, color: '#64748B' }}>Hotel Marseille · Tonight</div>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%', background: '#06d6a0',
          boxShadow: '0 0 8px #06d6a0',
        }} />
        <div style={{ fontSize: 12, color: '#06d6a0', fontWeight: 600, whiteSpace: 'nowrap' }}>All systems green</div>
      </div>
    </div>
  );
}

function KPIRow({ localT }) {
  const kpis = [
    { label: 'Avg response time', from: 420, to: 12, unit: 's', start: 0.4, color: '#06d6a0', delta: '-97%', spark: true },
    { label: 'Tasks completed tonight', from: 0, to: 247, unit: '', start: 0.6, color: '#60a5fa', delta: '+38%' },
    { label: 'Guest satisfaction', from: 3.2, to: 4.9, unit: '★', start: 0.8, color: '#fbbf24', delta: '+1.7', decimals: 1 },
    { label: 'Calls handled by AI', from: 0, to: 94, unit: '%', start: 1.0, color: '#34e2b6', delta: 'vs 12% in Jan' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      {kpis.map((k, i) => (
        <KPICard key={i} kpi={k} localT={localT} />
      ))}
    </div>
  );
}

function KPICard({ kpi, localT }) {
  const countDur = 1.2;
  const progress = Easing.easeOutCubic(clamp((localT - kpi.start) / countDur, 0, 1));
  const value = kpi.from + (kpi.to - kpi.from) * progress;
  const display = kpi.decimals != null ? value.toFixed(kpi.decimals) : Math.round(value).toString();
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 14,
      padding: 18,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
        color: '#64748B', textTransform: 'uppercase', marginBottom: 10,
      }}>{kpi.label}</div>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 6,
      }}>
        <div style={{
          fontSize: 42, fontWeight: 800, color: kpi.color,
          letterSpacing: '-0.02em', lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>{display}</div>
        <div style={{ fontSize: 18, color: '#94a3b8', fontWeight: 600 }}>{kpi.unit}</div>
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#06d6a0', fontWeight: 600 }}>
        {kpi.delta}
      </div>
    </div>
  );
}

function DashBottomRow({ localT }) {
  return (
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18, minHeight: 0 }}>
      <LiveChart localT={localT} />
      <StaffBreakdown localT={localT} />
    </div>
  );
}

function LiveChart({ localT }) {
  // Draw a smooth area chart from left to right
  const W = 900, H = 260, pad = 40;
  const pts = React.useMemo(() => {
    const vals = [58, 72, 65, 88, 110, 94, 120, 145, 132, 168, 190, 175, 210, 232, 247];
    return vals.map((v, i) => ({
      x: pad + (i / (vals.length - 1)) * (W - pad * 2),
      y: H - pad - (v / 260) * (H - pad * 2),
    }));
  }, []);

  const drawProgress = Easing.easeOutCubic(clamp((localT - 0.8) / 2.0, 0, 1));
  const drawCount = Math.max(0, Math.floor(drawProgress * pts.length));
  const visiblePts = pts.slice(0, drawCount + 1);

  const path = visiblePts.length > 1
    ? visiblePts.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : acc + ` L ${p.x} ${p.y}`, '')
    : '';
  const areaPath = path ? `${path} L ${visiblePts[visiblePts.length - 1].x} ${H - pad} L ${visiblePts[0].x} ${H - pad} Z` : '';

  const tip = visiblePts[visiblePts.length - 1];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 14,
      padding: 18,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, whiteSpace: 'nowrap', flexWrap: 'nowrap' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', whiteSpace: 'nowrap' }}>Tasks completed · last 14 hours</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, fontSize: 11, color: '#94a3b8' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34e2b6' }}/>
            Completed
          </span>
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ flex: 1 }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34e2b6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#34e2b6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* grid */}
        {[0.25, 0.5, 0.75].map(y => (
          <line key={y} x1={pad} x2={W - pad}
            y1={pad + (H - pad * 2) * y} y2={pad + (H - pad * 2) * y}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {areaPath && <path d={areaPath} fill="url(#chartGrad)" />}
        {path && <path d={path} fill="none" stroke="#34e2b6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />}
        {tip && (
          <>
            <circle cx={tip.x} cy={tip.y} r="5" fill="#34e2b6" />
            <circle cx={tip.x} cy={tip.y} r="10" fill="#34e2b6" opacity="0.25" />
          </>
        )}
      </svg>
    </div>
  );
}

function StaffBreakdown({ localT }) {
  const staff = [
    { team: 'Housekeeping', tasks: 92, color: '#6EE7B7', load: 0.72 },
    { team: 'F&B', tasks: 68, color: '#FCD34D', load: 0.58 },
    { team: 'Maintenance', tasks: 41, color: '#93C5FD', load: 0.44 },
    { team: 'Front Desk', tasks: 28, color: '#A5B4FC', load: 0.32 },
    { team: 'Spa', tasks: 12, color: '#C4B5FD', load: 0.18 },
    { team: 'Security', tasks: 6, color: '#FCA5A5', load: 0.12 },
  ];
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 14,
      padding: 18,
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>Team throughput</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {staff.map((s, i) => {
          const start = 1.2 + i * 0.12;
          const p = Easing.easeOutCubic(clamp((localT - start) / 0.9, 0, 1));
          return (
            <div key={s.team}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ fontSize: 12, color: '#CBD5E1', fontWeight: 500, whiteSpace: 'nowrap' }}>{s.team}</div>
                <div style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8', fontVariantNumeric: 'tabular-nums' }}>
                  {Math.round(s.tasks * p)}
                </div>
              </div>
              <div style={{
                height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.04)', overflow: 'hidden',
              }}>
                <div style={{
                  width: `${s.load * p * 100}%`, height: '100%',
                  background: s.color, borderRadius: 3,
                  boxShadow: `0 0 10px ${s.color}60`,
                  transition: 'width 300ms',
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.Scene4Dashboard = Scene4Dashboard;
