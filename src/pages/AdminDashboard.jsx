import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const mockBookings = [
  { id: 1, name: 'Rahul Sharma', event: 'Birthday Bash', date: '2026-03-28', guests: 50, status: 'Confirmed' },
  { id: 2, name: 'Priya Patel', event: 'Anniversary Special', date: '2026-03-30', guests: 2, status: 'Pending' },
  { id: 3, name: 'Amit Deshmukh', event: 'Corporate Mixer', date: '2026-04-02', guests: 100, status: 'Confirmed' },
  { id: 4, name: 'Sneha Kulkarni', event: 'Sufi Night', date: '2026-04-05', guests: 8, status: 'Pending' },
  { id: 5, name: 'Vikram Joshi', event: 'DJ Night', date: '2026-04-07', guests: 15, status: 'Cancelled' },
  { id: 6, name: 'Meera Iyer', event: 'Wine & Cheese', date: '2026-04-09', guests: 4, status: 'Confirmed' },
];

const stats = [
  { label: 'Total Bookings', value: '128', icon: '📋', change: '+12%' },
  { label: 'Upcoming Events', value: '15', icon: '🎉', change: '+3' },
  { label: 'Revenue (MTD)', value: '₹4.2L', icon: '💰', change: '+18%' },
  { label: 'New Inquiries', value: '23', icon: '📩', change: '+5' },
];

const statusStyle = (status) => ({
  padding: '4px 14px', borderRadius: 100,
  fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em',
  background:
    status === 'Confirmed' ? 'rgba(74,222,128,0.1)' :
      status === 'Pending' ? 'rgba(251,191,36,0.1)' : 'rgba(248,113,113,0.1)',
  color:
    status === 'Confirmed' ? '#16a34a' :
      status === 'Pending' ? '#d97706' : '#dc2626',
  border: `1px solid ${status === 'Confirmed' ? 'rgba(74,222,128,0.25)' :
      status === 'Pending' ? 'rgba(251,191,36,0.25)' : 'rgba(248,113,113,0.25)'
    }`,
});

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? mockBookings
    : mockBookings.filter(b => b.status.toLowerCase() === activeTab);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 72 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 40, fontWeight: 400, color: 'var(--ink)', marginBottom: 6 }}>Dashboard</h1>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', letterSpacing: '0.05em' }}>
                Welcome back, Admin · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <Link to="/" style={{
              padding: '12px 24px', borderRadius: 100, textDecoration: 'none',
              border: '1px solid rgba(201,168,76,0.25)', background: 'transparent',
              fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', transition: 'all 300ms',
            }}>← Back to Site</Link>
          </div>
        </Reveal>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20, marginBottom: 40 }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div style={{
                padding: '28px 24px', borderRadius: 20, background: 'var(--white)',
                border: '1px solid rgba(201,168,76,0.15)', transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(26,23,20,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600, color: '#16a34a', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 10px', borderRadius: 100 }}>{s.change}</span>
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400, color: 'var(--ink)', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bookings Table */}
        <Reveal delay={150}>
          <div style={{ background: 'var(--white)', borderRadius: 24, border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>

            {/* Table Header */}
            <div style={{ padding: '28px 32px', borderBottom: '1px solid rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, color: 'var(--ink)' }}>Recent Bookings</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['all', 'confirmed', 'pending', 'cancelled'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    padding: '8px 18px', borderRadius: 100,
                    fontFamily: 'var(--sans)', fontSize: 12, cursor: 'pointer',
                    textTransform: 'capitalize', letterSpacing: '0.06em',
                    border: activeTab === tab ? '1px solid var(--ink)' : '1px solid rgba(201,168,76,0.2)',
                    background: activeTab === tab ? 'var(--ink)' : 'transparent',
                    color: activeTab === tab ? 'var(--gold-light)' : 'var(--ink-muted)',
                    transition: 'all 300ms',
                  }}>{tab}</button>
                ))}
              </div>
            </div>

            {/* Desktop Table */}
            <div style={{ overflowX: 'auto' }} className="table-desktop">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                    {['ID', 'Guest Name', 'Event', 'Date', 'Guests', 'Status'].map(h => (
                      <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => (
                    <tr key={b.id}
                      style={{ borderBottom: '1px solid rgba(201,168,76,0.05)', transition: 'background 200ms' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.03)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '16px 20px', fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)' }}>#{String(b.id).padStart(3, '0')}</td>
                      <td style={{ padding: '16px 20px', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>{b.name}</td>
                      <td style={{ padding: '16px 20px', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)' }}>{b.event}</td>
                      <td style={{ padding: '16px 20px', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)' }}>{b.date}</td>
                      <td style={{ padding: '16px 20px', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)' }}>{b.guests}</td>
                      <td style={{ padding: '16px 20px' }}><span style={statusStyle(b.status)}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div style={{ display: 'none', padding: '16px' }} className="table-mobile">
              {filtered.map(b => (
                <div key={b.id} style={{ padding: '16px', marginBottom: 12, borderRadius: 16, background: 'var(--cream)', border: '1px solid rgba(201,168,76,0.12)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{b.name}</span>
                    <span style={statusStyle(b.status)}>{b.status}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', marginBottom: 8 }}>{b.event}</div>
                  <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--gold-dark)' }}>
                    <span>📅 {b.date}</span>
                    <span>👥 {b.guests} guests</span>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: 60, fontFamily: 'var(--sans)', color: 'var(--ink-muted)' }}>
                No bookings found for this filter.
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media(max-width:700px){
          .table-desktop{display:none!important}
          .table-mobile{display:block!important}
        }
      `}</style>
    </div>
  );
}