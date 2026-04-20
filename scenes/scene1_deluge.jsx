// Scene 1: The Deluge — 0 to 5s

function Scene1Deluge() {
  const t = useTime();
  if (t > 5.6) return null;

  // Camera: gentle push-in (reduced to avoid clipping)
  const camScale = interpolate([0, 5], [1.0, 1.06], Easing.easeInOutCubic)(t);
  const vignette = 0.55 + 0.08 * Math.sin(t * 1.4);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Scaled camera layer — holds scatter cards + starfield */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `scale(${camScale})`,
        transformOrigin: '50% 50%',
      }}>
        <Starfield count={70} />
        <RequestCards />
      </div>

      {/* HUD + headline — OUTSIDE camera scale so they don't clip or drift */}
      <Sprite start={0.3} end={4.8}>
        <div style={{
          position: 'absolute', left: 80, top: 72,
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          color: 'rgba(148, 163, 184, 0.72)',
          fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          <TimestampTicker />
          <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(148,163,184,0.5)', whiteSpace: 'nowrap' }}>
            HOTEL MARSEILLE · 284 GUESTS · 1 NIGHT MANAGER
          </div>
        </div>
      </Sprite>

      <Sprite start={0.5} end={4.6}>
        {({ localTime, duration }) => {
          const fadeIn = Easing.easeOutCubic(Math.min(1, localTime / 0.6));
          const fadeOut = Math.max(0, 1 - Math.max(0, localTime - (duration - 0.5)) / 0.5);
          const opacity = fadeIn * fadeOut;
          return (
            <div style={{
              position: 'absolute', left: '50%', top: 420,
              transform: 'translateX(-50%)',
              textAlign: 'center', opacity, width: 1100,
            }}>
              <div style={{
                fontSize: 15, fontWeight: 600, letterSpacing: '0.3em',
                color: '#64748B', textTransform: 'uppercase',
                marginBottom: 14, whiteSpace: 'nowrap',
              }}>It's 2:47 AM</div>
              <div style={{
                fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em',
                color: '#F1F5F9', lineHeight: 1.05, whiteSpace: 'nowrap',
              }}>
                and <span style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #34e2b6 100%)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                }}>everyone</span> wants something.
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* Vignette (outside cam — stays full-bleed) */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at center, transparent 40%, rgba(4,8,16,${vignette}) 100%)`,
      }} />
    </div>
  );
}

function TimestampTicker() {
  const t = useTime();
  const seconds = Math.floor(47 + t * 8) % 60;
  const minutes = 47 + Math.floor((47 + t * 8) / 60);
  return (
    <div style={{ fontSize: 13, color: '#94a3b8', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
      02:{String(minutes % 60).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}

function Starfield({ count = 60 }) {
  const stars = React.useMemo(() => {
    const s = [];
    let seed = 42;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < count; i++) {
      s.push({
        x: rand() * 1920, y: rand() * 1080,
        size: 0.5 + rand() * 1.8,
        phase: rand() * Math.PI * 2,
        speed: 0.6 + rand() * 1.4,
      });
    }
    return s;
  }, [count]);
  const t = useTime();
  return (
    <>
      {stars.map((s, i) => {
        const tw = 0.35 + 0.45 * (Math.sin(t * s.speed + s.phase) * 0.5 + 0.5);
        return (
          <div key={i} style={{
            position: 'absolute', left: s.x, top: s.y,
            width: s.size, height: s.size, borderRadius: '50%',
            background: '#cbd5e1', opacity: tw,
            boxShadow: s.size > 1.5 ? '0 0 6px rgba(96,165,250,0.6)' : 'none',
          }} />
        );
      })}
    </>
  );
}

const REQUESTS = [
  { dept: 'housekeeping', room: '412', msg: 'Extra towels please', src: 'Voice', at: 0.8 },
  { dept: 'maintenance', room: '207', msg: "AC won't cool below 74°F", src: 'SMS', at: 1.2 },
  { dept: 'fnb', room: '318', msg: 'Room service — late menu?', src: 'Call', at: 1.6 },
  { dept: 'frontdesk', room: '501', msg: 'Late checkout til 2pm', src: 'Chat', at: 2.0 },
  { dept: 'housekeeping', room: '225', msg: 'Pillow replacement', src: 'Voice', at: 2.3 },
  { dept: 'maintenance', room: '614', msg: 'TV remote not working', src: 'SMS', at: 2.6 },
  { dept: 'spa', room: '810', msg: 'Spa booking 9am?', src: 'Call', at: 2.9 },
  { dept: 'fnb', room: '412', msg: 'Bottle of champagne', src: 'Voice', at: 3.2 },
  { dept: 'security', room: 'Lobby', msg: 'Noise complaint 7th fl', src: 'Call', at: 3.5 },
  { dept: 'housekeeping', room: '118', msg: 'Turn down service', src: 'SMS', at: 3.8 },
  { dept: 'frontdesk', room: '402', msg: 'Extra key card', src: 'Chat', at: 4.1 },
  { dept: 'maintenance', room: '709', msg: 'Shower drain slow', src: 'Voice', at: 4.4 },
];

const DEPT_COLORS = {
  housekeeping: { bg: 'rgba(5,150,105,0.15)', fg: '#6EE7B7', label: 'HOUSEKEEPING' },
  maintenance: { bg: 'rgba(59,130,246,0.15)', fg: '#93C5FD', label: 'MAINTENANCE' },
  fnb: { bg: 'rgba(217,119,6,0.15)', fg: '#FCD34D', label: 'F&B' },
  security: { bg: 'rgba(220,38,38,0.15)', fg: '#FCA5A5', label: 'SECURITY' },
  spa: { bg: 'rgba(139,92,246,0.15)', fg: '#C4B5FD', label: 'SPA' },
  frontdesk: { bg: 'rgba(55,48,163,0.2)', fg: '#A5B4FC', label: 'FRONTDESK' },
};

function RequestCards() {
  // Fixed non-overlapping positions on an orbit around center, left/right halves
  const positions = React.useMemo(() => {
    // 6 slots per side, stacked vertically with generous spacing
    const slots = [];
    const leftX = 90;
    const rightX = 1920 - 90 - 320;
    const rowH = 150;
    const startY = 100;
    for (let i = 0; i < 6; i++) {
      slots.push({ x: leftX, y: startY + i * rowH, side: 'left' });
    }
    for (let i = 0; i < 6; i++) {
      slots.push({ x: rightX, y: startY + i * rowH, side: 'right' });
    }
    // tiny rotation + x-jitter per slot (deterministic)
    let seed = 11;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    return slots.map((s, i) => ({
      ...s,
      x: s.x + (rand() - 0.5) * 30,
      y: s.y + (rand() - 0.5) * 20,
      rot: (rand() - 0.5) * 6,
    }));
  }, []);

  return (
    <>
      {REQUESTS.map((r, i) => {
        const pos = positions[i];
        return (
          <Sprite key={i} start={r.at} end={5.2}>
            {({ localTime, duration }) => {
              const enterT = Easing.easeOutBack(Math.min(1, localTime / 0.5));
              const slideFrom = pos.side === 'left' ? -60 : 60;
              const tx = (1 - enterT) * slideFrom;
              const opacity = Math.min(1, localTime / 0.3);
              const fadeOut = Math.max(0, 1 - Math.max(0, localTime - (duration - 0.5)) / 0.5);
              const scale = 0.9 + enterT * 0.1;
              return (
                <div style={{
                  position: 'absolute', left: pos.x, top: pos.y,
                  width: 320, opacity: opacity * fadeOut,
                  transform: `translateX(${tx}px) rotate(${pos.rot}deg) scale(${scale})`,
                  willChange: 'transform, opacity',
                }}>
                  <RequestCard req={r} />
                </div>
              );
            }}
          </Sprite>
        );
      })}
    </>
  );
}

function RequestCard({ req }) {
  const dept = DEPT_COLORS[req.dept];
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14,
      padding: '14px 16px',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 20px 40px -20px rgba(0,0,0,0.6)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
        flexWrap: 'nowrap', whiteSpace: 'nowrap',
      }}>
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
          background: dept.bg, color: dept.fg,
          padding: '3px 7px', borderRadius: 99,
          flexShrink: 0,
        }}>{dept.label}</span>
        <span style={{
          fontSize: 10, color: '#64748B', fontFamily: 'JetBrains Mono, monospace',
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {req.src.toUpperCase()} · RM {req.room}
        </span>
      </div>
      <div style={{
        fontSize: 14, color: '#E2E8F0', lineHeight: 1.4,
      }}>"{req.msg}"</div>
    </div>
  );
}

window.Scene1Deluge = Scene1Deluge;
window.Starfield = Starfield;
window.DEPT_COLORS = DEPT_COLORS;
