import { Link } from 'react-router-dom';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Booking', path: '/booking' },
  { name: 'Contact', path: '/contact' },
];

const hours = [
  { day: 'Mon – Fri', time: '11 AM – 11 PM', highlight: false },
  { day: 'Sat – Sun', time: '10 AM – 12 AM', highlight: false },
  { day: 'Happy Hour', time: '4 PM – 7 PM', highlight: true },
];

const socials = [
  { name: 'Instagram', icon: '📸', href: '#' },
  { name: 'Facebook', icon: '📘', href: '#' },
  { name: 'Twitter', icon: '🐦', href: '#' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.5)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 64px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }} className="footer-grid">

        {/* Brand */}
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', marginBottom: 20 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--gold)',
            }}>G</div>
            <div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'rgba(255,255,255,0.9)', fontWeight: 400 }}>Gaarva Garden</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 2 }}>Resto &amp; Bar</div>
            </div>
          </Link>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.9, maxWidth: 260, color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>
            Experience the finest dining with live events, music nights, and celebrations under the stars in Pune.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {socials.map(s => (
              <a key={s.name} href={s.href} aria-label={s.name} style={{
                width: 36, height: 36, borderRadius: '50%', textDecoration: 'none',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, cursor: 'pointer', transition: 'all 300ms',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'; }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, fontWeight: 500 }}>Quick Links</div>
          {quickLinks.map(l => (
            <Link key={l.name} to={l.path} style={{
              display: 'block', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--sans)',
              fontSize: 13, textDecoration: 'none', marginBottom: 14, letterSpacing: '0.03em',
              transition: 'color 300ms',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >{l.name}</Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, fontWeight: 500 }}>Contact</div>
          {[
            ['📍', '123 Garden Street, Kothrud, Pune 411038'],
            ['📞', '+91 98765 43210'],
            ['✉️', 'info@gaarvagarden.com'],
          ].map(([icon, value]) => (
            <div key={value} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{icon}</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Hours */}
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, fontWeight: 500 }}>Hours</div>
          {hours.map(h => (
            <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{h.day}</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: h.highlight ? 'var(--gold)' : 'rgba(255,255,255,0.6)', fontWeight: h.highlight ? 500 : 400 }}>{h.time}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, padding: '14px 16px', borderRadius: 12, background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>Reservations recommended on weekends and public holidays.</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
          © {new Date().getFullYear()} Gaarva Garden Resto &amp; Bar · All rights reserved · Crafted with ❤️ in Pune
        </p>
      </div>

      <style>{`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:40px 32px!important}}
        @media(max-width:500px){.footer-grid{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}