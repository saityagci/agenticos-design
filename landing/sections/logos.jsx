function Logos() {
  const hotels = [
    { name: "THE MARSEILLE", sub: "Collection" },
    { name: "AURORA", sub: "Resorts" },
    { name: "MERIDIAN", sub: "Hotels & Suites" },
    { name: "NOBU HOUSE", sub: "" },
    { name: "BELLAMONT", sub: "Grand" },
    { name: "KOVA", sub: "Boutique" },
    { name: "ORAN&CO", sub: "" },
    { name: "LUME", sub: "Hospitality Group" },
  ];

  return (
    <section className="logos reveal">
      <div className="container">
        <div className="logos-label">
          <div className="logos-label-line"></div>
          <span className="mono">Trusted by independents and global groups alike</span>
          <div className="logos-label-line"></div>
        </div>
        <div className="logos-grid">
          {hotels.map((h, i) => (
            <div key={i} className="logo-plate">
              <div className="logo-name">{h.name}</div>
              {h.sub && <div className="logo-sub">{h.sub}</div>}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .logos {
          padding: 80px 0 40px;
        }
        .logos-label {
          display: flex; align-items: center; gap: 20px;
          margin-bottom: 40px;
          font-size: 11.5px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-400);
        }
        .logos-label-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, transparent, var(--line-strong), transparent);
        }
        .logos-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        .logo-plate {
          padding: 36px 24px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          transition: background 300ms;
          min-height: 120px;
        }
        .logo-plate:hover {
          background: var(--surface);
        }
        .logo-name {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 22px;
          letter-spacing: 0.04em;
          color: var(--ink-200);
          transition: color 200ms;
        }
        .logo-plate:hover .logo-name {
          color: var(--ink-100);
        }
        .logo-sub {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-500);
          margin-top: 4px;
        }
        @media (max-width: 840px) {
          .logos-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}

window.Logos = Logos;
