import { useState } from 'react';
import Reveal from '../components/Reveal';

const contactInfo = [
  { icon: '📍', label: 'Address', value: '123 Garden Street, Kothrud, Pune, Maharashtra 411038' },
  { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
  { icon: '✉️', label: 'Email', value: 'info@gaarvagarden.com' },
  { icon: '⏰', label: 'Hours', value: 'Mon – Sun: 11 AM – 12 AM' },
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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Contact data:', form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', subject: '', message: '' });
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
            <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20 }}>Get in Touch</div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(44px,6vw,72px)', fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.1, marginBottom: 20 }}>
              Contact <em>Us</em>
            </h1>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
              Have a question or want to plan something special? We'd love to hear from you.
            </p>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '-40px auto 80px', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 24 }} className="contact-grid">
        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {contactInfo.map((item, i) => (
            <Reveal key={item.label} delay={i * 70}>
              <div style={{ padding: '24px 20px', borderRadius: 20, background: 'var(--white)', border: '1px solid rgba(201,168,76,0.15)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{item.value}</div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Map placeholder */}
          <Reveal delay={280}>
            <div style={{ borderRadius: 20, background: 'var(--ink)', border: '1px solid rgba(201,168,76,0.2)', overflow: 'hidden', flex: 1, minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', padding: 24 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🗺️</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>Kothrud, Pune</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>Google Maps Integration</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Contact Form */}
        <Reveal delay={100}>
          <div style={{ background: 'var(--white)', borderRadius: 24, padding: '40px 36px', border: '1px solid rgba(201,168,76,0.15)' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>Send a Message</div>
            <div style={{ width: 40, height: 1, background: 'var(--gold)', marginBottom: 32, opacity: 0.5 }} />

            {submitted && (
              <div style={{ marginBottom: 24, padding: '16px 20px', borderRadius: 12, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', fontFamily: 'var(--sans)', fontSize: 13, color: '#16a34a' }}>
                ✅ Message sent! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="form-grid">
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
                <div>
                  <label style={labelStyle}>Your Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subject *</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="Event inquiry" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>

              <div>
                <label style={labelStyle}>Message *</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={6}
                  placeholder="Tell us about your event or inquiry..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={focusHandler} onBlur={blurHandler}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%', padding: '16px', borderRadius: 100,
                  background: 'var(--ink)', border: 'none',
                  color: 'var(--gold-light)', fontFamily: 'var(--sans)', fontSize: 13,
                  fontWeight: 500, cursor: 'pointer', letterSpacing: '0.1em',
                  textTransform: 'uppercase', transition: 'all 300ms',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--gold-light)'; }}
              >
                Send Message
              </button>
            </form>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}
        @media(max-width:600px){.form-grid{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  );
}