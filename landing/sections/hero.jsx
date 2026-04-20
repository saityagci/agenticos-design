const { useEffect: useEffectHero, useRef: useRefHero, useState: useStateHero } = React;

function Hero() {
  const [videoLoaded, setVideoLoaded] = useStateHero(false);

  // Subtle parallax drift on the decorative word
  useEffectHero(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const drift = document.getElementById('hero-drift');
      if (drift) drift.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <section className="hero">
        {/* Big decorative word behind content */}
        <div id="hero-drift" className="hero-drift-word" aria-hidden="true">
          hospitality
        </div>

        {/* Constellation */}
        <svg className="hero-constellation" aria-hidden="true" viewBox="0 0 1400 800" preserveAspectRatio="none">
          {Array.from({ length: 48 }).map((_, i) => {
            const x = (i * 137.3) % 1400;
            const y = (i * 89.7 + 40) % 800;
            const r = (i % 5 === 0) ? 2.2 : 1;
            const op = 0.15 + ((i * 17) % 60) / 150;
            return <circle key={i} cx={x} cy={y} r={r} fill="#7dd3fc" opacity={op} />;
          })}
          <line x1="180" y1="120" x2="420" y2="280" stroke="rgba(125,211,252,0.12)" strokeWidth="0.8" />
          <line x1="420" y1="280" x2="720" y2="180" stroke="rgba(125,211,252,0.12)" strokeWidth="0.8" />
          <line x1="820" y1="440" x2="1120" y2="320" stroke="rgba(52,226,182,0.14)" strokeWidth="0.8" />
        </svg>

        <div className="container hero-inner">
          <div className="eyebrow hero-eyebrow">
            <span className="dot"></span>
            <span>Live in 140+ hotels across 23 countries</span>
          </div>

          <h1 className="hero-headline">
            <span className="hero-line-1">Every guest</span>
            <span className="hero-line-2">
              <span className="serif text-gradient">request,</span>
            </span>
            <span className="hero-line-3">answered in <span className="hero-countdown mono">&lt; 12s.</span></span>
          </h1>

          <p className="hero-sub">
            AgenticOS is the operating system that replaces pagers, radios, and the
            3&nbsp;AM front-desk panic. One voice agent intakes every call. Every
            task dispatches itself. Every department moves together.
          </p>

          <div className="hero-ctas">
            <a href="#demo" className="btn btn-primary">
              Book a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#tour" className="btn btn-ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
              Watch the 36s tour
            </a>
          </div>

          <div className="hero-scroll">
            <div className="hero-scroll-line"></div>
            <span className="mono">watch the tour</span>
          </div>
        </div>
      </section>

      {/* Full-viewport video — sits immediately after the hero, blocks nothing */}
      <section id="tour" className="hero-tour">
        <div className="hero-tour-frame">
          <iframe
            src="../AgenticOS Hero.html?embed=1"
            title="AgenticOS product tour"
            onLoad={() => setVideoLoaded(true)}
            style={{ border: 0 }}
          />
          {!videoLoaded && (
            <div className="hero-tour-loading">
              <div className="hero-tour-spinner"></div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .hero {
          position: relative;
          padding: 160px 0 100px;
          overflow: hidden;
        }
        .hero-drift-word {
          position: absolute;
          top: 180px;
          right: -80px;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(200px, 28vw, 420px);
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(125,211,252,0.08);
          line-height: 0.9;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .hero-constellation {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 1040px;
        }
        .hero-eyebrow {
          margin-bottom: 36px;
        }
        .hero-headline {
          font-family: var(--font-sans);
          font-size: clamp(56px, 8.4vw, 132px);
          line-height: 0.94;
          letter-spacing: -0.042em;
          font-weight: 700;
          margin: 0 0 32px;
          text-wrap: balance;
        }
        .hero-line-1, .hero-line-2, .hero-line-3 {
          display: block;
        }
        .hero-line-2 .serif {
          font-size: 1.22em;
          letter-spacing: -0.06em;
          font-weight: 400;
        }
        .hero-line-3 {
          font-weight: 600;
        }
        .hero-countdown {
          font-weight: 500;
          letter-spacing: -0.05em;
          background: linear-gradient(135deg, #60a5fa, #34e2b6);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .hero-sub {
          font-size: clamp(16px, 1.3vw, 20px);
          line-height: 1.55;
          color: var(--ink-200);
          max-width: 620px;
          margin: 0 auto 40px;
          text-wrap: pretty;
        }
        .hero-ctas {
          display: flex; flex-wrap: wrap; gap: 12px;
          justify-content: center;
          margin-bottom: 72px;
        }

        .hero-scroll {
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          font-size: 10px; letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-400);
        }
        .hero-scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, transparent, var(--ink-400));
          position: relative;
        }
        .hero-scroll-line::after {
          content: '';
          position: absolute; left: -0.5px; bottom: 0;
          width: 2px; height: 12px;
          background: var(--teal);
          box-shadow: 0 0 8px var(--teal);
          animation: scroll-vert 2s ease-in-out infinite;
        }
        @keyframes scroll-vert {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-24px); opacity: 0.3; }
        }

        /* Full-viewport video section below hero */
        .hero-tour {
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: 0 0 40px;
        }
        .hero-tour-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          max-height: 100vh;
          overflow: hidden;
          background: #050810;
          border-top: 1px solid var(--line-strong);
          border-bottom: 1px solid var(--line-strong);
        }
        .hero-tour-frame iframe {
          width: 100%;
          height: 100%;
          display: block;
        }
        .hero-tour-loading {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: #050810;
        }
        .hero-tour-spinner {
          width: 32px; height: 32px;
          border: 2px solid rgba(255,255,255,0.15);
          border-top-color: var(--teal);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .hero-tour-label {
          position: absolute;
          top: 20px; left: 24px;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 8px 14px;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--ink-200);
          background: rgba(5,8,16,0.65);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 99px;
          backdrop-filter: blur(20px);
          z-index: 3;
        }
        .hero-tour-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #f87171;
          box-shadow: 0 0 10px #f87171;
          animation: pulse-ring 1.6s ease-out infinite;
        }

        @media (max-width: 720px) {
          .hero { padding: 120px 0 80px; }
          .hero-drift-word { display: none; }
          .hero-ctas { margin-bottom: 56px; }
        }
      `}</style>
    </>
  );
}

window.Hero = Hero;
