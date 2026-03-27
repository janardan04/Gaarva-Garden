import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (email === 'admin@gaarvagarden.com' && password === 'admin123') {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Try admin@gaarvagarden.com / admin123');
      }
      setLoading(false);
    }, 1000);
  };

  const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: 12,
    fontFamily: 'var(--sans)', fontSize: 14,
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)',
    color: 'rgba(255,255,255,0.8)', transition: 'border-color 300ms', boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', margin: '0 auto 20px',
            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--gold)',
          }}>G</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 300, color: 'rgba(255,255,255,0.9)', marginBottom: 8 }}>Admin Panel</h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>Gaarva Garden Management</p>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 24, padding: '36px 32px', border: '1px solid rgba(201,168,76,0.15)' }}>
          {error && (
            <div style={{ marginBottom: 20, padding: '14px 18px', borderRadius: 12, background: 'rgba(226,75,74,0.1)', border: '1px solid rgba(226,75,74,0.25)', fontFamily: 'var(--sans)', fontSize: 13, color: '#fca5a5', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Email Address
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="admin@gaarvagarden.com" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
              />
            </div>

            <div>
              <label style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)}
                  required placeholder="••••••••" style={{ ...inputStyle, paddingRight: 48 }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
                />
                <button
                  type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 14 }}
                >
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                padding: '16px', borderRadius: 100, marginTop: 8,
                background: loading ? 'rgba(201,168,76,0.4)' : 'linear-gradient(135deg,var(--gold-dark),var(--gold))',
                border: 'none', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 14,
                fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 300ms',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ width: 16, height: 16, border: '2px solid rgba(26,23,20,0.3)', borderTopColor: 'var(--ink)', borderRadius: '50%', display: 'inline-block', animation: 'gSpin 0.8s linear infinite' }} />
                  Signing In...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
              Demo: <span style={{ color: 'rgba(255,255,255,0.5)' }}>admin@gaarvagarden.com</span> / <span style={{ color: 'rgba(255,255,255,0.5)' }}>admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}