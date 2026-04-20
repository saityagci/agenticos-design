// Scene 5: Network + Logo Lockup — 26 to 36s
// All systems connect. Glowing arcs radiate from the AI core.
// Tagline resolves. Final logo lockup + CTA.

function Scene5Finale() {
  const t = useTime();
  if (t < 25.8) return null;
  const localT = t - 26.0;
  // Hide the final logo lockup + CTA when embedded (landing page already has its own CTA)
  const embedMode = typeof window !== 'undefined' && /[?&]embed=1/.test(window.location.search);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Starfield count={80} />

      {/* Network diagram — 26-29.3s (ends cleanly before tagline) */}
      <Sprite start={26.0} end={29.3}>
        {({ localTime, duration }) => {
          const enter = Easing.easeOutCubic(Math.min(1, localTime / 0.6));
          const exit = Math.max(0, 1 - Math.max(0, localTime - (duration - 0.5)) / 0.5);
          return (
            <div style={{
              position: 'absolute', inset: 0,
              opacity: enter * exit,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <NetworkDiagram localT={localTime} />
            </div>
          );
        }}
      </Sprite>

      {/* Tagline — 29.5-32.5s */}
      <Sprite start={29.5} end={32.5}>
        {({ localTime, duration }) => {
          const enter = Easing.easeOutCubic(Math.min(1, localTime / 0.7));
          const exit = Math.max(0, 1 - Math.max(0, localTime - (duration - 0.5)) / 0.5);
          return (
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: `translate(-50%, -50%) translateY(${(1 - enter) * 20}px)`,
              opacity: enter * exit,
              textAlign: 'center', width: 1400,
            }}>
              <div style={{
                fontSize: 72, fontWeight: 800, letterSpacing: '-0.03em',
                color: '#F1F5F9', lineHeight: 1.02, marginBottom: 20,
              }}>
                One <span style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #34e2b6 100%)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                }}>agenticOS</span>.
                <br />
                Every request. Five-star delivery.
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* Logo lockup — 32-36s (hidden in embed mode) */}
      {!embedMode && <Sprite start={31.8} end={36}>
        {({ localTime, duration }) => {
          const enter = Easing.easeOutBack(Math.min(1, localTime / 0.8));
          return (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              opacity: Math.min(1, localTime / 0.5),
              gap: 32,
            }}>
              <div style={{
                transform: `scale(${0.7 + enter * 0.3})`,
                display: 'flex', alignItems: 'center', gap: 22,
              }}>
                <LogoMark size={88} />
                <div style={{
                  fontSize: 72, fontWeight: 800, letterSpacing: '-0.03em', color: '#F1F5F9',
                }}>
                  agentic<span style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #34e2b6 100%)',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                  }}>OS</span>
                </div>
              </div>
              <div style={{
                fontSize: 18, color: '#94a3b8', letterSpacing: '0.3em',
                textTransform: 'uppercase', fontWeight: 600,
                opacity: Math.min(1, Math.max(0, localTime - 0.5) / 0.6),
              }}>
                For Hospitality
              </div>

              {/* CTA */}
              <div style={{
                marginTop: 18,
                opacity: Math.min(1, Math.max(0, localTime - 1.1) / 0.5),
                transform: `translateY(${Math.max(0, 20 - (localTime - 1.1) * 40)}px)`,
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  padding: '16px 28px', borderRadius: 14,
                  background: 'linear-gradient(135deg, #60a5fa 0%, #34e2b6 100%)',
                  color: '#061018', fontWeight: 700, fontSize: 16,
                  boxShadow: '0 20px 50px -15px rgba(96,165,250,0.6)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  Get a demo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10m-4-4l4 4-4 4" stroke="#061018" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{
                  padding: '16px 24px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#F1F5F9', fontWeight: 600, fontSize: 15,
                }}>
                  agenticos.hotel
                </div>
              </div>
            </div>
          );
        }}
      </Sprite>}
    </div>
  );
}

function NetworkDiagram({ localT }) {
  const nodes = [
    { id: 'ai',   label: 'AI Core',       x: 0,    y: 0,    size: 90, primary: true },
    { id: 'voice', label: 'Voice',        x: -360, y: -180, size: 64, color: '#60a5fa', icon: 'voice' },
    { id: 'sms',  label: 'SMS',           x: -420, y: 40,   size: 64, color: '#60a5fa', icon: 'sms' },
    { id: 'chat', label: 'Chat',          x: -360, y: 240,  size: 64, color: '#60a5fa', icon: 'chat' },
    { id: 'hk',   label: 'Housekeeping',  x: 360,  y: -220, size: 64, color: '#6EE7B7', icon: 'bed' },
    { id: 'fnb',  label: 'F&B',           x: 420,  y: -50,  size: 64, color: '#FCD34D', icon: 'cup' },
    { id: 'mnt',  label: 'Maintenance',   x: 420,  y: 130,  size: 64, color: '#93C5FD', icon: 'wrench' },
    { id: 'fd',   label: 'Front Desk',    x: 360,  y: 290,  size: 64, color: '#A5B4FC', icon: 'key' },
  ];

  const edges = [
    ['voice', 'ai', 0.1], ['sms', 'ai', 0.2], ['chat', 'ai', 0.3],
    ['ai', 'hk', 0.6], ['ai', 'fnb', 0.7], ['ai', 'mnt', 0.8], ['ai', 'fd', 0.9],
  ];

  const getNode = (id) => nodes.find(n => n.id === id);

  return (
    <div style={{ position: 'relative', width: 1100, height: 600 }}>
      <svg width="1100" height="600" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <defs>
          <linearGradient id="edgeGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#60a5fa" stopOpacity="0.1"/>
            <stop offset="0.5" stopColor="#34e2b6" stopOpacity="0.9"/>
            <stop offset="1" stopColor="#60a5fa" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        {edges.map(([a, b, start], i) => {
          const A = getNode(a), B = getNode(b);
          const p = Easing.easeOutCubic(clamp((localT - start) / 0.7, 0, 1));
          const x1 = 550 + A.x, y1 = 300 + A.y;
          const x2 = 550 + B.x, y2 = 300 + B.y;
          const cx = x1 + (x2 - x1) * p;
          const cy = y1 + (y2 - y1) * p;
          // Traveling particle
          const pulseT = (localT * 0.6 + i * 0.15) % 1;
          const px = x1 + (x2 - x1) * pulseT;
          const py = y1 + (y2 - y1) * pulseT;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={cx} y2={cy}
                stroke="url(#edgeGrad)" strokeWidth="1.5" opacity={0.6} />
              {p >= 1 && (
                <circle cx={px} cy={py} r="3.5" fill="#34e2b6"
                  style={{ filter: 'drop-shadow(0 0 6px #34e2b6)' }}/>
              )}
            </g>
          );
        })}
      </svg>
      {nodes.map((n, i) => {
        const appearAt = n.primary ? 0 : (n.color === '#60a5fa' ? 0.1 : 0.6) + i * 0.05;
        const enter = Easing.easeOutBack(clamp((localT - appearAt) / 0.5, 0, 1));
        const pulse = n.primary ? 1 + 0.05 * Math.sin(localT * 2.5) : 1;
        return (
          <div key={n.id} style={{
            position: 'absolute',
            left: 550 + n.x - n.size / 2,
            top: 300 + n.y - n.size / 2,
            width: n.size, height: n.size,
            transform: `scale(${enter * pulse})`,
            opacity: Math.min(1, enter),
            transition: 'none',
          }}>
            {n.primary ? (
              <div style={{
                width: '100%', height: '100%', borderRadius: '28%',
                background: 'linear-gradient(135deg, #60a5fa 0%, #34e2b6 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 ${40 + Math.sin(localT * 3) * 10}px rgba(52,226,182,0.6), 0 0 80px rgba(96,165,250,0.4)`,
              }}>
                <svg width="42" height="42" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1.5L8.5 5 12 6.5 8.5 8 7 11.5 5.5 8 2 6.5 5.5 5 7 1.5z" fill="#061018" />
                </svg>
              </div>
            ) : (
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${n.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: n.color,
                boxShadow: `0 0 20px ${n.color}30`,
                backdropFilter: 'blur(10px)',
              }}>
                <NodeIcon kind={n.icon} color={n.color} />
              </div>
            )}
            {/* Label positioned outside the circle */}
            {!n.primary && (() => {
              const isLeft = n.x < 0;
              return (
                <div style={{
                  position: 'absolute',
                  left: isLeft ? -12 : n.size + 12,
                  top: '50%',
                  transform: `translateY(-50%) ${isLeft ? 'translateX(-100%)' : ''}`,
                  fontSize: 13, fontWeight: 700, color: n.color,
                  letterSpacing: '0.04em', whiteSpace: 'nowrap',
                  textShadow: '0 2px 6px rgba(0,0,0,0.8)',
                }}>{n.label}</div>
              );
            })()}
          </div>
        );
      })}

      {/* Center label under the AI core */}
      <div style={{
        position: 'absolute', left: '50%', top: 300 + 65,
        transform: 'translateX(-50%)',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.25em',
        color: '#34e2b6', textTransform: 'uppercase',
        opacity: Math.min(1, Math.max(0, localT - 0.4) / 0.5),
      }}>Agentic Core</div>
    </div>
  );
}

window.Scene5Finale = Scene5Finale;

function NodeIcon({ kind, color }) {
  const s = { width: 26, height: 26, stroke: color, strokeWidth: 1.8, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (kind) {
    case 'voice':
      return (<svg {...s} viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>);
    case 'sms':
      return (<svg {...s} viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4V5z"/></svg>);
    case 'chat':
      return (<svg {...s} viewBox="0 0 24 24"><circle cx="8" cy="12" r=".5" fill={color}/><circle cx="12" cy="12" r=".5" fill={color}/><circle cx="16" cy="12" r=".5" fill={color}/><path d="M4 5h16v11H8l-4 4V5z"/></svg>);
    case 'bed':
      return (<svg {...s} viewBox="0 0 24 24"><path d="M3 17v-7M3 17h18M21 17v-5a3 3 0 00-3-3H9v5M6 11a1 1 0 100-2 1 1 0 000 2z"/></svg>);
    case 'cup':
      return (<svg {...s} viewBox="0 0 24 24"><path d="M5 8h12v6a5 5 0 01-10 0v-6zM17 10h2a2 2 0 010 4h-2M5 20h14"/></svg>);
    case 'wrench':
      return (<svg {...s} viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 01-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 015.4-5.4L15 12l-3-3 2.7-2.7z"/></svg>);
    case 'key':
      return (<svg {...s} viewBox="0 0 24 24"><circle cx="8" cy="14" r="3"/><path d="M11 14h10M17 14v3M20 14v2"/></svg>);
    default:
      return null;
  }
}

window.NodeIcon = NodeIcon;
