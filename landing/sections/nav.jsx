const { useState, useEffect } = React;

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          <div className="nav-logo-mark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#061018" strokeWidth="2.2" strokeLinejoin="round"/>
              <path d="M12 8v8M8 10l8 4M16 10l-8 4" stroke="#061018" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="nav-logo-text">agentic<span>OS</span></div>
        </a>
        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#how">How it works</a>
          <a href="#features">Platform</a>
          <a href="#customers">Customers</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="nav-right">
          <a href="../login/index.html" className="btn-link" style={{ fontSize: 13.5, padding: '10px 14px' }}>Sign in</a>
          <a href="#demo" className="nav-cta">Book demo</a>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
