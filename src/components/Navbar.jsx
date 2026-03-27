import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Booking', path: '/booking' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(250,248,243,0.97)' : 'rgba(250,248,243,0.7)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.25)' : '1px solid transparent',
      boxShadow: scrolled ? '0 4px 32px rgba(26,23,20,0.06)' : 'none',
      transition: 'all 500ms cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

        {/* Brand */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            textDecoration: 'none'
          }}
        >

          <img
            src="/gaarva-logo.png"
            alt="Gaarva Garden"
            style={{
              width: 56,   // 🔥 increased
              height: 56,  // 🔥 increased
              objectFit: 'cover',
              borderRadius: '50%',
              border: '1px solid var(--border)',
              padding: 4,
              background: 'var(--white)',
              flexShrink: 0
            }}
          />

          <div>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--ink)',
              letterSpacing: '0.02em'
            }}>
              Gaarva Garden
            </div>

            <div style={{
              fontFamily: 'var(--sans)',
              fontSize: 10,
              color: 'var(--ink-muted)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginTop: 2
            }}>
              Resto &amp; Bar
            </div>
          </div>

        </Link>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link key={link.name} to={link.path} style={{
                padding: '8px 18px', borderRadius: 100, textDecoration: 'none',
                fontFamily: 'var(--sans)', fontSize: 14, fontWeight: active ? 500 : 400,
                background: active ? 'var(--ink)' : 'transparent',
                color: active ? 'var(--gold-light)' : 'var(--ink-soft)',
                transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
              }}>{link.name}</Link>
            );
          })}
          <Link to="/admin" style={{
            marginLeft: 12, padding: '10px 24px', borderRadius: 100, textDecoration: 'none',
            background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))',
            color: 'var(--cream)', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
            boxShadow: '0 2px 16px rgba(201,168,76,0.3)', transition: 'all 300ms',
          }}>Admin Panel</Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
          aria-label="Toggle menu"
        >
          <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', height: 1.5, background: 'var(--ink)', borderRadius: 2, transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none', transition: 'transform 300ms' }} />
            <span style={{ display: 'block', height: 1.5, background: 'var(--ink)', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity 300ms' }} />
            <span style={{ display: 'block', height: 1.5, background: 'var(--ink)', borderRadius: 2, transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none', transition: 'transform 300ms' }} />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <div style={{
        maxHeight: menuOpen ? 400 : 0, overflow: 'hidden',
        transition: 'max-height 400ms cubic-bezier(0.16,1,0.3,1)',
        background: 'var(--cream)', borderTop: menuOpen ? '1px solid rgba(201,168,76,0.15)' : 'none',
      }}>
        <div style={{ padding: '12px 24px 20px' }}>
          {links.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link key={link.name} to={link.path} style={{
                display: 'block', padding: '14px 16px', marginBottom: 4, borderRadius: 12, textDecoration: 'none',
                fontFamily: 'var(--sans)', fontSize: 15, fontWeight: active ? 500 : 400,
                background: active ? 'rgba(201,168,76,0.1)' : 'transparent',
                color: active ? 'var(--gold-dark)' : 'var(--ink-soft)',
              }}>{link.name}</Link>
            );
          })}
          <Link to="/admin" style={{
            display: 'block', marginTop: 8, padding: '14px 16px', borderRadius: 12, textDecoration: 'none',
            background: 'var(--ink)', color: 'var(--gold-light)',
            fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, textAlign: 'center',
          }}>Admin Panel →</Link>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none!important}
          .mobile-menu-btn{display:flex!important;align-items:center;}
        }
      `}</style>
    </nav>
  );
}