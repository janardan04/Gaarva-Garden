import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import VideoCard from '../components/VideoCard';

/* ─── Animated count-up number ─── */
function CountUp({ to, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1600, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const featuredEvents = [
  { id: 1, emoji: '🎵', title: 'Sufi Night Live', date: 'Every Friday', desc: 'Soulful Sufi melodies with curated candlelight dinner under the stars.' },
  { id: 2, emoji: '🥂', title: 'Sunday Brunch Fest', date: 'Every Sunday', desc: 'Unlimited gourmet brunch with live acoustic music and cocktails.' },
  { id: 3, emoji: '🎧', title: 'DJ Night Saturdays', date: 'Every Saturday', desc: 'Dance the night away under open skies with top DJs.' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Anniversary Dinner', quote: 'Absolutely magical evening. The candlelight garden setting was breathtaking, and every bite was perfection. We will cherish this memory forever.' },
  { name: 'Rahul Mehta', role: 'Corporate Gala', quote: 'Our 200-person corporate event was flawlessly executed. The team\'s attention to detail and the menu quality exceeded all expectations.' },
  { name: 'Sneha & Dev Kulkarni', role: 'Birthday Celebration', quote: 'From the Sufi Night to the custom cake, everything felt personal and luxurious. Gaarva Garden is truly Pune\'s finest.' },
];

const features = [
  'Open-air garden setting', 'Award-winning chefs', 'Live music weekly',
  'Custom décor & theming', 'Corporate packages', 'Private dining cabanas',
  'Handcrafted cocktails', '500+ events hosted',
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'var(--ink)', overflow: 'hidden', paddingTop: 72 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 40%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-grid">
          {/* Left: Text */}
          <div>
            <Reveal delay={0}>
              <div style={{ marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 18px', borderRadius: 100, border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'gPulse 2s ease-in-out infinite', display: 'block' }} />
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'var(--sans)', textTransform: 'uppercase' }}>Open Tonight · Yeoor Hills, Thane</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(52px,7vw,88px)', lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 20 }}>
                <span style={{ color: 'rgba(255,255,255,0.95)' }}>Where Every</span><br />
                <span className="gold-text">Evening</span><br />
                <span style={{ color: 'rgba(255,255,255,0.95)' }}>Becomes a</span><br />
                <span style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>Memory.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.8, maxWidth: 420, marginBottom: 40, fontFamily: 'var(--sans)', fontWeight: 300 }}>
                Gaarva Garden is Yeoor Hills' premier open-air dining destination — where exquisite cuisine meets live entertainment under a canopy of stars.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/booking" style={{
                  padding: '16px 36px', borderRadius: 100, textDecoration: 'none',
                  background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))',
                  color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  boxShadow: '0 8px 32px rgba(201,168,76,0.4)', transition: 'all 400ms',
                }}>Book an Event</Link>
                <Link to="/events" style={{
                  padding: '16px 36px', borderRadius: 100, textDecoration: 'none',
                  border: '1px solid rgba(201,168,76,0.3)', background: 'transparent',
                  color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--sans)', fontSize: 14,
                  letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 300ms',
                }}>Explore Events</Link>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div style={{ display: 'flex', gap: 40, marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(201,168,76,0.12)' }}>
                {[['500+', 'Events Hosted'], ['4.9★', 'Guest Rating'], ['8+', 'Years of Excellence']].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400, color: 'var(--gold)' }}>{v}</div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4, fontFamily: 'var(--sans)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: Card stack */}
          <Reveal delay={150} direction="left">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
                <div style={{ position: 'absolute', bottom: -16, right: -16, width: '100%', height: '100%', borderRadius: 28, border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.04)' }} />
                <div style={{ position: 'relative', borderRadius: 28, background: 'linear-gradient(145deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04))', border: '1px solid rgba(201,168,76,0.25)', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '4/5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 20 }}>
                    <div style={{ fontSize: 80, animation: 'gFloatY 4s ease-in-out infinite' }}>🌿</div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>Gaarva Garden</div>
                      <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 8 }}>Resto &amp; Bar · Yeoor Hills, Thane</div>
                    </div>
                    <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.4)' }} />
                    <div style={{ display: 'flex', gap: 16 }}>
                      {['🎵 Live Music', '🍽️ Fine Dining', '🌙 Events'].map(t => (
                        <span key={t} style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', fontFamily: 'var(--sans)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(201,168,76,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Open Tonight</div>
                      <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Sufi Night · 8:00 PM →</div>
                    </div>
                    <div style={{ padding: '6px 14px', borderRadius: 100, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}>
                      <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--gold)', fontWeight: 500 }}>★ 4.9</span>
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div style={{ position: 'absolute', left: -50, top: '25%', background: 'var(--cream)', borderRadius: 16, padding: '12px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', animation: 'gFloatY 3.5s ease-in-out infinite', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>500+</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Events</div>
                </div>
                <div style={{ position: 'absolute', right: -40, bottom: '25%', background: 'var(--gold)', borderRadius: 16, padding: '12px 18px', animation: 'gFloatY 3.5s ease-in-out infinite', animationDelay: '1.5s' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'rgba(26,23,20,0.6)', letterSpacing: '0.1em' }}>NEXT UP</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink)', fontWeight: 600, marginTop: 2 }}>Fri · Sufi Night</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media(max-width:768px){
            .hero-grid{grid-template-columns:1fr!important;gap:48px!important;text-align:center;}
            .hero-grid > div:last-child{display:none}
          }
        `}</style>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: 'var(--gold)', padding: '14px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 0, animation: 'gMarquee 20s linear infinite', whiteSpace: 'nowrap' }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ display: 'flex', gap: 48, paddingRight: 48, flexShrink: 0 }}>
              {['🎵 Live Sufi Night Every Friday', '🥂 Sunday Brunch Unlimited', '🏢 Corporate Events Welcome', '🌿 Open-Air Garden Dining', '⭐ Rated 4.9 by Guests', '🎂 Birthday & Anniversary Packages'].map(item => (
                <span key={item} style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500, color: 'var(--ink)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 20 }}>
                  {item}
                  <span style={{ color: 'rgba(26,23,20,0.3)', fontSize: 6 }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{ padding: '100px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
            {[
              { to: 500, suffix: '+', label: 'Events Hosted', sub: 'since we opened' },
              { to: 1000, suffix: '+', label: 'Happy Guests', sub: 'and counting' },
              { to: 8, suffix: '+', label: 'Years of Magic', sub: 'serving Yeoor Hills, Thane' },
              { to: 200, suffix: '+', label: 'Corporate Clients', sub: 'who trust us' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div style={{ padding: '48px 36px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(201,168,76,0.15)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(44px,5vw,64px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1 }}>
                    <CountUp to={s.to} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, color: 'var(--ink-soft)', marginTop: 12 }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--gold)', marginTop: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED EVENTS ── */}
      <section style={{ padding: '100px 24px', background: 'var(--ink)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 70 }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20 }}>What's On</div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,5vw,60px)', fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.1, marginBottom: 16 }}>Featured <em>Events</em></h2>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,var(--gold),transparent)', margin: '0 auto' }} />
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
            {featuredEvents.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 100}>
                <div style={{
                  padding: '40px 32px', borderRadius: 24,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)',
                  transition: 'all 400ms cubic-bezier(0.16,1,0.3,1)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.07)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ fontSize: 40, marginBottom: 24 }}>{ev.emoji}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>{ev.date}</div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: 14 }}>{ev.title}</h3>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 32 }}>{ev.desc}</p>
                  <Link to="/booking" style={{
                    display: 'block', width: '100%', padding: '14px', borderRadius: 100, textDecoration: 'none', textAlign: 'center',
                    border: '1px solid rgba(201,168,76,0.35)', background: 'transparent',
                    color: 'var(--gold)', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
                    letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 300ms',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}
                  >Reserve Now</Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div style={{ textAlign: 'center', marginTop: 56 }}>
              <Link to="/events" style={{
                color: 'var(--gold)', fontFamily: 'var(--sans)', fontSize: 14, textDecoration: 'none',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 4,
              }}>View All Events →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ padding: '120px 24px', background: 'var(--cream-dark)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }} className="about-grid">
          <Reveal direction="right">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { type: 'video', full: true },
                { icon: '🎵', title: 'Live Entertainment', sub: 'Music & performances weekly' },
                { icon: '✨', title: '8+ Years', sub: 'Of crafting memories', dark: true },
              ].map((c, i) => {
                if (c.type === 'video') {
                  return (
                    <div key={i} style={{ gridColumn: c.full ? '1 / -1' : 'auto' }}>
                      <VideoCard icon={c.icon} title={c.title} subtitle={c.sub} />
                    </div>
                  );
                }
                return (
                  <div key={i} style={{
                    padding: '28px 24px', borderRadius: 20,
                    background: c.dark ? 'var(--ink)' : 'var(--white)',
                    border: c.dark ? 'none' : '1px solid rgba(201,168,76,0.15)',
                    gridColumn: c.full ? '1 / -1' : 'auto',
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, color: c.dark ? 'rgba(255,255,255,0.9)' : 'var(--ink)', marginBottom: 6 }}>{c.title}</div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: c.dark ? 'var(--gold)' : 'var(--ink-muted)', letterSpacing: '0.06em' }}>{c.sub}</div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal direction="left" delay={100}>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20 }}>Our Story</div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.15, marginBottom: 32 }}>
                A Garden of<br /><em style={{ fontStyle: 'italic', color: 'var(--ink-muted)' }}>Flavours &amp; Memories</em>
              </h2>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.9, marginBottom: 20 }}>
                Nestled in the heart of Yeoor Hills, Thane, Gaarva Garden is more than a restaurant — it's a living experience. Our lush open-air setting provides the perfect backdrop for intimate dinners and grand celebrations.
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.9, marginBottom: 40 }}>
                With menus curated by award-winning chefs and a dedicated events team, we transform ordinary evenings into extraordinary memories.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', marginBottom: 40 }}>
                {features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-soft)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />{f}
                  </div>
                ))}
              </div>
              <Link to="/booking" style={{
                display: 'inline-block', padding: '16px 40px', borderRadius: 100, textDecoration: 'none',
                background: 'var(--ink)', color: 'var(--gold-light)',
                fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 300ms',
              }}>Plan Your Event →</Link>
            </div>
          </Reveal>
        </div>
        <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '100px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20 }}>Guest Stories</div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 300, color: 'var(--ink)' }}>What People Say</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ position: 'relative', padding: '60px 40px', borderRadius: 28, background: 'var(--cream)', border: '1px solid rgba(201,168,76,0.2)', textAlign: 'center', overflow: 'hidden' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 80, color: 'rgba(201,168,76,0.15)', lineHeight: 0.8, position: 'absolute', top: 24, left: 32 }}>"</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 32 }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: 'var(--gold)', fontSize: 14 }}>★</span>)}
              </div>
              <div style={{ position: 'relative', minHeight: 140 }}>
                {testimonials.map((t, i) => (
                  <div key={t.name} style={{
                    position: i === 0 ? 'relative' : 'absolute', inset: 0,
                    opacity: i === activeTestimonial ? 1 : 0,
                    transform: i === activeTestimonial ? 'none' : 'translateY(16px)',
                    transition: 'all 700ms cubic-bezier(0.16,1,0.3,1)',
                    pointerEvents: i === activeTestimonial ? 'auto' : 'none',
                  }}>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px,2vw,22px)', fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 28 }}>
                      "{t.quote}"
                    </p>
                    <div style={{ fontFamily: 'var(--sans)', fontWeight: 500, color: 'var(--ink)', fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--gold)', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.role}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                    height: 2, width: i === activeTestimonial ? 32 : 16, borderRadius: 1,
                    background: i === activeTestimonial ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
                    border: 'none', cursor: 'pointer', transition: 'all 400ms',
                  }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DARK CTA ── */}
      <section style={{ padding: '120px 24px', background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Reveal>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 24 }}>Reserve Your Evening</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 24 }}>
              <span style={{ color: 'rgba(255,255,255,0.9)' }}>Ready to Create</span><br />
              <em className="gold-text">Unforgettable</em><br />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'normal' }}>Memories?</span>
            </h2>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 48 }}>
              From intimate anniversaries to grand corporate galas — every detail is crafted to perfection.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/booking" style={{
                padding: '18px 48px', borderRadius: 100, textDecoration: 'none',
                background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))',
                color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                boxShadow: '0 8px 32px rgba(201,168,76,0.35)',
              }}>Book Your Event</Link>
              <Link to="/contact" style={{
                padding: '18px 48px', borderRadius: 100, textDecoration: 'none',
                border: '1px solid rgba(201,168,76,0.3)', background: 'transparent',
                color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--sans)', fontSize: 14,
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>Get in Touch</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}