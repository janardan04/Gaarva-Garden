import { useState } from 'react';
import Reveal from '../components/Reveal';

const eventOptions = [
  'Sufi Night Live', 'Sunday Brunch Fest', 'Corporate Mixer Night',
  'DJ Night Saturdays', 'Wine & Cheese Evening', 'Birthday Bash Package',
  'Anniversary Special', 'Stand-Up Comedy Night', 'Private Event / Custom',
];

const inputStyle = {
  width: '100%', padding: '14px 18px', borderRadius: 12,
  fontFamily: 'var(--sans)', fontSize: 14,
  background: 'var(--cream)', border: '1px solid rgba(201,168,76,0.2)',
  color: 'var(--ink)', transition: 'border-color 300ms', boxSizing: 'border-box',
};

const labelStyle = {
  fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)',
  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8,
  display: 'block', fontWeight: 500,
};

export default function Booking() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', guests: '',
    date: '', time: '', event: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Booking data:', form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', guests: '', date: '', time: '', event: '', message: '' });
  };

  const focusHandler = e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)');
  const blurHandler = e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)');

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 72 }}>
      {/* Page Header */}
      <div style={{ background: 'var(--ink)', padding: '80px 24px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 70% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <Reveal>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20 }}>Reserve</div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(44px,6vw,72px)', fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.1, marginBottom: 20 }}>
              Book Your <em>Event</em>
            </h1>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
              Fill in the details and our team will confirm your booking within 24 hours.
            </p>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '-40px auto 80px', padding: '0 24px' }}>
        {submitted && (
          <Reveal>
            <div style={{ marginBottom: 24, padding: '20px 28px', borderRadius: 16, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', fontFamily: 'var(--sans)', fontSize: 14, color: '#16a34a', textAlign: 'center', fontWeight: 500 }}>
              ✅ Booking request submitted! We'll contact you within 24 hours.
            </div>
          </Reveal>
        )}

        <Reveal delay={60}>
          <form onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div style={{ background: 'var(--white)', borderRadius: 24, padding: '40px 36px', marginBottom: 20, border: '1px solid rgba(201,168,76,0.15)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>Personal Details</div>
              <div style={{ width: 40, height: 1, background: 'var(--gold)', marginBottom: 32, opacity: 0.5 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="form-grid">
                {[
                  ['Full Name *', 'name', 'text', 'John Doe'],
                  ['Email Address *', 'email', 'email', 'john@example.com'],
                  ['Phone Number *', 'phone', 'tel', '+91 98765 43210'],
                  ['Number of Guests *', 'guests', 'number', '50'],
                ].map(([label, name, type, placeholder]) => (
                  <div key={name}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      type={type} name={name} value={form[name]}
                      onChange={handleChange} required placeholder={placeholder}
                      style={inputStyle} onFocus={focusHandler} onBlur={blurHandler}
                      {...(type === 'number' ? { min: 1, max: 500 } : {})}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Event Details */}
            <div style={{ background: 'var(--white)', borderRadius: 24, padding: '40px 36px', marginBottom: 20, border: '1px solid rgba(201,168,76,0.15)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>Event Details</div>
              <div style={{ width: 40, height: 1, background: 'var(--gold)', marginBottom: 32, opacity: 0.5 }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="form-grid">
                <div>
                  <label style={labelStyle}>Preferred Date *</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
                <div>
                  <label style={labelStyle}>Preferred Time *</label>
                  <input type="time" name="time" value={form.time} onChange={handleChange} required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Select Event *</label>
                <select name="event" value={form.event} onChange={handleChange} required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler}>
                  <option value="">Choose an event...</option>
                  {eventOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Special Requests</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} rows={4}
                  placeholder="Any special notes for the team..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={focusHandler} onBlur={blurHandler}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%', padding: '18px', borderRadius: 100,
                background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))',
                border: 'none', color: 'var(--ink)', fontFamily: 'var(--sans)',
                fontSize: 14, fontWeight: 500, cursor: 'pointer',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                boxShadow: '0 8px 32px rgba(201,168,76,0.3)', transition: 'all 300ms',
              }}
            >
              Submit Booking Request
            </button>
          </form>
        </Reveal>
      </div>

      <style>{`@media(max-width:600px){.form-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}