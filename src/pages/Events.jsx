import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const allEvents = [
  { id: 1, title: 'Sufi Night Live', category: 'Music', date: 'Every Friday', time: '8:00 PM', price: '₹999', desc: 'Immerse yourself in soulful Sufi melodies with curated candlelight dinner under the stars.', emoji: '🎵', featured: true },
  { id: 2, title: 'Sunday Brunch Fest', category: 'Food', date: 'Every Sunday', time: '11 AM – 3 PM', price: '₹1,499', desc: 'Unlimited gourmet brunch with live cooking stations, cocktails, and acoustic music.', emoji: '🍳', featured: true },
  { id: 3, title: 'Corporate Mixer Night', category: 'Corporate', date: 'On Request', time: 'Flexible', price: 'Custom', desc: 'Tailored corporate events with premium packages, AV setup, and customized menus.', emoji: '🏢', featured: false },
  { id: 4, title: 'DJ Night Saturdays', category: 'Music', date: 'Every Saturday', time: '9:00 PM', price: '₹799', desc: 'Dance the night away with top DJs spinning the hottest tracks in our open-air garden.', emoji: '🎧', featured: true },
  { id: 5, title: 'Wine & Cheese Evening', category: 'Food', date: '1st & 3rd Wed', time: '7 PM – 10 PM', price: '₹1,299', desc: 'A refined evening of curated wines paired with artisan cheeses and gourmet bites.', emoji: '🍷', featured: false },
  { id: 6, title: 'Birthday Bash Package', category: 'Celebration', date: 'Any Day', time: 'Flexible', price: '₹15,000', desc: 'Complete birthday celebration with décor, cake, DJ, and a dedicated party area.', emoji: '🎂', featured: false },
  { id: 7, title: 'Anniversary Special', category: 'Celebration', date: 'Any Day', time: 'Flexible', price: '₹8,000', desc: 'Romantic garden setup with roses, candlelight dinner, and a private corner just for two.', emoji: '💍', featured: true },
  { id: 8, title: 'Stand-Up Comedy Night', category: 'Entertainment', date: '2nd & 4th Thu', time: '8:30 PM', price: '₹599', desc: 'Laugh out loud with the best stand-up comedians performing live at Gaarva Garden.', emoji: '🎤', featured: false },
];

const categories = ['All', 'Music', 'Food', 'Corporate', 'Celebration', 'Entertainment'];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? allEvents : allEvents.filter(e => e.category === activeCategory);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: 'var(--ink)', padding: '80px 24px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 70% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <Reveal>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20 }}>Discover</div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(44px,6vw,72px)', fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.1, marginBottom: 20 }}>
              Our <em>Events</em>
            </h1>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
              From live music to exclusive celebrations — something magical happens every week at Gaarva Garden.
            </p>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', padding: '48px 0 40px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 24px', borderRadius: 100, fontFamily: 'var(--sans)', fontSize: 13, cursor: 'pointer',
                border: activeCategory === cat ? '1px solid var(--gold)' : '1px solid rgba(201,168,76,0.2)',
                background: activeCategory === cat ? 'var(--gold)' : 'transparent',
                color: activeCategory === cat ? 'var(--ink)' : 'var(--ink-muted)',
                fontWeight: activeCategory === cat ? 500 : 400,
                letterSpacing: '0.05em', transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Events grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 24 }}>
          {filtered.map((event, i) => (
            <Reveal key={event.id} delay={i * 60}>
              <div style={{
                background: 'var(--white)', borderRadius: 24,
                border: '1px solid rgba(201,168,76,0.15)',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                transition: 'all 400ms cubic-bezier(0.16,1,0.3,1)', position: 'relative',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(26,23,20,0.1)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'; }}
              >
                {event.featured && (
                  <div style={{ position: 'absolute', top: 16, right: 16, padding: '4px 12px', borderRadius: 100, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--gold-dark)', letterSpacing: '0.1em' }}>★ Featured</div>
                )}
                <div style={{ height: 3, background: 'linear-gradient(90deg,var(--gold-dark),var(--gold))' }} />
                <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{event.emoji}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>{event.category}</div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.2 }}>{event.title}</h3>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.8, flex: 1, marginBottom: 24 }}>{event.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24, padding: '16px 0', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                    {[['📅', event.date], ['⏰', event.time], ['💰', event.price]].map(([ic, v]) => (
                      <div key={ic} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, marginBottom: 4 }}>{ic}</div>
                        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-soft)', fontWeight: 500 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <Link to="/booking" style={{
                    display: 'block', textAlign: 'center', padding: '14px', borderRadius: 100, textDecoration: 'none',
                    background: 'var(--ink)', color: 'var(--gold-light)',
                    fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
                    letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 300ms',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--gold-light)'; }}
                  >Book Now</Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontFamily: 'var(--sans)', color: 'var(--ink-muted)' }}>No events in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}