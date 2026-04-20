// Scene 2: The AI Classifies — 5 to 10s
// Camera lands on ONE request. Voice agent waveform activates.
// Request gets classified + routed in real time.

function Scene2Classify() {
  const t = useTime();
  if (t < 4.8 || t > 10.4) return null;
  const localT = t - 5.0;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Starfield count={40} />

      {/* Focused request card — center stage */}
      <Sprite start={5.0} end={10.2}>
        {({ localTime, duration }) => {
          const enter = Easing.easeOutCubic(Math.min(1, localTime / 0.7));
          const exit = Math.max(0, 1 - Math.max(0, localTime - (duration - 0.5)) / 0.5);
          const scale = 0.85 + enter * 0.15;
          return (
            <div style={{
              position: 'absolute',
              left: '50%', top: 180,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: 'top center',
              opacity: enter * exit,
              width: 620,
            }}>
              <FocusedRequest localT={localTime} />
            </div>
          );
        }}
      </Sprite>

      {/* AI processing line — "Classifying…" → result */}
      <Sprite start={6.0} end={10.2}>
        {({ localTime }) => {
          const enter = Easing.easeOutCubic(Math.min(1, localTime / 0.5));
          return (
            <div style={{
              position: 'absolute',
              left: '50%', top: 520,
              transform: `translateX(-50%) translateY(${(1 - enter) * 12}px)`,
              opacity: enter,
              width: 620,
            }}>
              <AIProcessor localT={localTime} />
            </div>
          );
        }}
      </Sprite>

      {/* Final route pill */}
      <Sprite start={8.2} end={10.2}>
        {({ localTime, duration }) => {
          const enter = Easing.easeOutBack(Math.min(1, localTime / 0.5));
          const exit = Math.max(0, 1 - Math.max(0, localTime - (duration - 0.4)) / 0.4);
          return (
            <div style={{
              position: 'absolute',
              left: '50%', top: 720,
              transform: `translateX(-50%) scale(${0.8 + enter * 0.2})`,
              opacity: enter * exit,
            }}>
              <RoutePill />
            </div>
          );
        }}
      </Sprite>
    </div>
  );
}

function FocusedRequest({ localT }) {
  // Waveform pulses, then transcript types out
  const bars = 32;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 24,
      padding: 32,
      backdropFilter: 'blur(28px)',
      boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.15), 0 30px 60px -20px rgba(59,130,246,0.2)',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, whiteSpace: 'nowrap', flexWrap: 'nowrap' }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%', background: '#06d6a0',
          boxShadow: `0 0 ${8 + Math.sin(localT * 6) * 4}px #06d6a0`,
          flexShrink: 0,
        }} />
        <div style={{ fontSize: 12, color: '#06d6a0', fontWeight: 700, letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>
          INCOMING CALL · ROOM 412
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: '#64748B', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap' }}>
          00:0{Math.min(9, Math.floor(localT * 2))}
        </div>
      </div>

      {/* Waveform */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 3, height: 52, marginBottom: 18,
      }}>
        {Array.from({ length: bars }).map((_, i) => {
          const phase = i * 0.3;
          const active = localT > 0.2;
          const amp = active
            ? 0.3 + 0.7 * Math.abs(Math.sin(localT * 4 + phase) * Math.cos(localT * 2 + phase * 0.7))
            : 0.15;
          return (
            <div key={i} style={{
              width: 4,
              height: `${amp * 48}px`,
              borderRadius: 2,
              background: 'linear-gradient(180deg, #60a5fa, #34e2b6)',
              opacity: 0.85,
            }} />
          );
        })}
      </div>

      {/* Transcript — types out */}
      <Transcript localT={localT} />
    </div>
  );
}

function Transcript({ localT }) {
  const full = '"Hi, this is Sarah in 412 — could we get some extra towels? And maybe a bottle of champagne sent up, it\'s our anniversary."';
  const start = 1.6;
  const charsPerSec = 38;
  const n = Math.max(0, Math.floor((localT - start) * charsPerSec));
  const shown = full.slice(0, Math.min(full.length, n));
  const done = n >= full.length;
  return (
    <div style={{
      fontSize: 18, lineHeight: 1.6, color: '#E2E8F0',
      minHeight: 92, fontWeight: 400,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {shown}
      {!done && localT > start && (
        <span style={{
          display: 'inline-block', width: 2, height: 20,
          background: '#34e2b6', marginLeft: 2, verticalAlign: -3,
          animation: 'caret-blink 0.8s steps(2) infinite',
        }} />
      )}
    </div>
  );
}

function AIProcessor({ localT }) {
  const steps = [
    { at: 0.0, label: 'Transcribing speech', dur: 0.8 },
    { at: 0.8, label: 'Classifying intent', dur: 0.8 },
    { at: 1.6, label: 'Detecting priority', dur: 0.6 },
    { at: 2.2, label: 'Routing to department', dur: 0.6 },
  ];
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      padding: '18px 22px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {steps.map((s, i) => {
        const started = localT >= s.at;
        const completed = localT >= s.at + s.dur;
        const color = completed ? '#06d6a0' : started ? '#60a5fa' : '#475569';
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: started ? 1 : 0.35,
            transition: 'opacity 300ms',
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              border: `1.5px solid ${color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: completed ? color : 'transparent',
            }}>
              {completed ? (
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M2 5l2 2 4-4" stroke="#061018" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : started ? (
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: color,
                  animation: 'pulse-fade 0.8s ease-in-out infinite',
                }} />
              ) : null}
            </div>
            <div style={{
              fontSize: 14, color: completed ? '#E2E8F0' : started ? '#CBD5E1' : '#64748B',
              fontWeight: completed ? 500 : 400,
            }}>
              {s.label}{started && !completed ? '…' : completed ? ' ✓' : ''}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RoutePill() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 24px',
      background: 'linear-gradient(135deg, rgba(6,214,160,0.15), rgba(96,165,250,0.15))',
      border: '1px solid rgba(52,226,182,0.35)',
      borderRadius: 999,
      boxShadow: '0 20px 40px -10px rgba(6,214,160,0.3)',
      whiteSpace: 'nowrap', flexWrap: 'nowrap',
    }}>
      <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Dispatched to</span>
      <span style={{
        fontSize: 14, fontWeight: 700, letterSpacing: '0.08em',
        padding: '4px 10px', borderRadius: 99,
        background: 'rgba(5,150,105,0.3)', color: '#6EE7B7',
      }}>HOUSEKEEPING</span>
      <span style={{ fontSize: 13, color: '#94a3b8' }}>·</span>
      <span style={{
        fontSize: 14, fontWeight: 700, letterSpacing: '0.08em',
        padding: '4px 10px', borderRadius: 99,
        background: 'rgba(217,119,6,0.3)', color: '#FCD34D',
      }}>F&amp;B</span>
      <span style={{ fontSize: 13, color: '#94a3b8' }}>in</span>
      <span style={{
        fontSize: 16, fontWeight: 800, color: '#34e2b6',
        fontFamily: 'JetBrains Mono, monospace',
      }}>3.2s</span>
    </div>
  );
}

window.Scene2Classify = Scene2Classify;
