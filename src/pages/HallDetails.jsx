import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { doc, getDoc, collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const DEFAULT_TIME_SLOTS = ['11:00 AM', '02:00 PM', '05:00 PM', '08:00 PM'];

export default function HallDetails() {
  const { id } = useParams();
  const [hall, setHall] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form selections
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(null); // the whole theme object
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', guests: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate next 5 days
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchHallData = async () => {
      try {
        // Fetch Hall
        const hallDoc = await getDoc(doc(db, 'halls', id));
        if (hallDoc.exists()) {
          setHall({ id: hallDoc.id, ...hallDoc.exists() && hallDoc.data() });
        }

        // Fetch Background Themes
        const bgSnap = await getDocs(collection(db, 'backgrounds'));
        setBackgrounds(bgSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // Fetch Bookings for this hall
        const q = query(collection(db, 'bookings'), where('hallId', '==', id));
        const bookingSnap = await getDocs(q);
        setBookings(bookingSnap.docs.map(d => d.data()));

      } catch (err) {
        console.error('Error fetching hall specifics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHallData();

    // Generate Dates
    const nextDays = [];
    for (let i = 0; i < 5; i++) {
       const d = new Date();
       d.setDate(d.getDate() + i);
       // format: YYYY-MM-DD
       const dateStr = d.toISOString().split('T')[0];
       
       const displayStr = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : 
         d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
       nextDays.push({ value: dateStr, label: displayStr });
    }
    setDates(nextDays);
    setSelectedDate(nextDays[0].value);

  }, [id]);

  const isSlotBooked = (dateStr, timeStr) => {
     return bookings.some(b => 
       b.slotDate === dateStr && 
       b.slotTime === timeStr && 
       (b.status === 'Confirmed' || b.status === 'Pending')
     );
  };

  const handleSlotSelect = (date, time) => {
    if (isSlotBooked(date, time)) return;
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedTime) return alert("Please select an available time slot!");
    if(!selectedTheme) return alert("Please select a background theme for your booking.");

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
         ...formData,
         hallId: id,
         hallName: hall.name,
         slotDate: selectedDate,
         slotTime: selectedTime,
         themeId: selectedTheme.id,
         themeName: selectedTheme.name,
         themeCategory: selectedTheme.category,
         themeImageBase64: selectedTheme.imageBase64,
         status: 'Pending',
         createdAt: serverTimestamp()
      });
      setSuccess(true);
      // reset form
      setFormData({ name: '', phone: '', email: '', guests: '' });
      setSelectedTime('');
      setSelectedTheme(null);
    } catch (err) {
       console.error(err);
       alert("Error booking!");
    } finally {
       setIsSubmitting(false);
    }
  };

  if (loading) return <div style={{ minHeight: '100vh', paddingTop: 100, textAlign: 'center' }}>Loading...</div>;
  if (!hall) return <div style={{ minHeight: '100vh', paddingTop: 100, textAlign: 'center' }}>Hall not found!</div>;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 72 }}>
      
      {/* Hero Header */}
      <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
        <img src={hall.imageBase64} alt={hall.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--ink) 0%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 800, textAlign: 'center', padding: '0 24px', boxSizing: 'border-box' }}>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 48, color: 'var(--cream)', marginBottom: 8 }}>{hall.name}</h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--gold-light)' }}>Capacity: {hall.capacity}</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
        
        {success && (
          <Reveal>
            <div style={{ marginBottom: 40, padding: '24px', borderRadius: 16, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', textAlign: 'center', color: '#16a34a' }}>
               <h3 style={{fontFamily: 'var(--serif)', fontSize: 24, marginBottom: 8}}>Booking Request Sent!</h3>
               <p style={{fontFamily: 'var(--sans)', fontSize: 14}}>We have received your request for {hall.name} on {selectedDate} at {selectedTime}. Our team will contact you shortly to confirm.</p>
               <button onClick={()=>setSuccess(false)} style={{marginTop: 16, padding: '8px 16px', borderRadius: 100, background: '#16a34a', color: '#fff', border: 'none', cursor: 'pointer'}}>Book Another Slot</button>
            </div>
          </Reveal>
        )}

        <Reveal>
           <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--ink)', marginBottom: 24 }}>1. Select a Date & Time</h2>
        </Reveal>

        {/* Calendar View */}
        <Reveal delay={100}>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 24 }}>
             {dates.map(d => (
                <button key={d.value} onClick={() => { setSelectedDate(d.value); setSelectedTime(''); }} style={{
                   padding: '12px 24px', borderRadius: 100, minWidth: 120, border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13,
                   background: selectedDate === d.value ? 'var(--gold)' : 'var(--white)',
                   color: selectedDate === d.value ? 'var(--ink)' : 'var(--ink-muted)',
                   boxShadow: selectedDate === d.value ? '0 8px 16px rgba(201,168,76,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
                   transition: 'all 300ms'
                }}>
                   {d.label}
                   <div style={{ fontSize: 10, marginTop: 4, opacity: 0.7 }}>{d.value}</div>
                </button>
             ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 48 }}>
             {(hall.timeSlots && hall.timeSlots.length > 0 ? hall.timeSlots : DEFAULT_TIME_SLOTS).map(time => {
                const booked = isSlotBooked(selectedDate, time);
                const isSelected = selectedTime === time;
                return (
                   <button key={time} 
                      disabled={booked}
                      onClick={() => handleSlotSelect(selectedDate, time)}
                      style={{
                         padding: '16px', borderRadius: 16, border: '1px solid',
                         borderColor: isSelected ? 'var(--gold)' : booked ? 'rgba(0,0,0,0.05)' : 'rgba(201,168,76,0.2)',
                         background: isSelected ? 'rgba(201,168,76,0.1)' : booked ? '#f3f4f6' : 'var(--white)',
                         color: booked ? '#9ca3af' : 'var(--ink)',
                         cursor: booked ? 'not-allowed' : 'pointer', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: isSelected ? 600 : 400, transition: 'all 200ms'
                      }}>
                         <div style={{ marginBottom: 4 }}>{time}</div>
                         <div style={{ fontSize: 11, color: booked ? '#ef4444' : isSelected ? 'var(--gold-dark)' : '#10b981' }}>{booked ? 'Booked' : isSelected ? 'Selected' : 'Available'}</div>
                   </button>
                )
             })}
          </div>
        </Reveal>

        {selectedTime && (
           <Reveal delay={100}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--ink)', marginBottom: 24 }}>2. Choose Background Theme</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 48 }}>
                 {backgrounds.map(bg => (
                    <div key={bg.id} onClick={() => setSelectedTheme(bg)} style={{
                       cursor: 'pointer', borderRadius: 16, overflow: 'hidden', border: '2px solid',
                       borderColor: selectedTheme?.id === bg.id ? 'var(--gold)' : 'transparent',
                       boxShadow: selectedTheme?.id === bg.id ? '0 12px 24px rgba(201,168,76,0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
                       transition: 'all 300ms', transform: selectedTheme?.id === bg.id ? 'translateY(-4px)' : 'none'
                    }}>
                       <div style={{ position: 'relative', height: 140 }}>
                          <img src={bg.imageBase64} alt={bg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '16px 12px 8px', color: '#fff', fontFamily: 'var(--sans)', fontSize: 13 }}>
                             {bg.name}
                          </div>
                       </div>
                    </div>
                 ))}
                 {backgrounds.length === 0 && <div style={{ fontFamily: 'var(--sans)', color: 'var(--ink-muted)' }}>No background themes available.</div>}
              </div>
           </Reveal>
        )}

        {selectedTheme && (
           <Reveal delay={100}>
               <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--ink)', marginBottom: 24 }}>3. Your Information</h2>
               <form onSubmit={handleSubmit} style={{ background: 'var(--white)', padding: 32, borderRadius: 24, border: '1px solid rgba(201,168,76,0.15)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                     <div>
                        <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                        <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.3)', boxSizing: 'border-box', fontFamily: 'var(--sans)' }} />
                     </div>
                     <div>
                        <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number *</label>
                        <input required type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.3)', boxSizing: 'border-box', fontFamily: 'var(--sans)' }} />
                     </div>
                     <div>
                        <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                        <input type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.3)', boxSizing: 'border-box', fontFamily: 'var(--sans)' }} />
                     </div>
                     <div>
                        <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Number of Guests</label>
                        <input type="number" required value={formData.guests} onChange={e=>setFormData({...formData, guests: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.3)', boxSizing: 'border-box', fontFamily: 'var(--sans)' }} />
                     </div>
                  </div>
                  
                  <div style={{ background: 'rgba(201,168,76,0.05)', padding: 16, borderRadius: 12, marginBottom: 24, fontSize: 13, fontFamily: 'var(--sans)', color: 'var(--ink)' }}>
                     <strong>Summary:</strong> Requesting {hall.name} on {selectedDate} at {selectedTime} with the "{selectedTheme.name}" theme.
                  </div>

                  <button type="submit" disabled={isSubmitting} style={{
                     width: '100%', padding: '16px', borderRadius: 100, background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))',
                     border: 'none', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, cursor: isSubmitting ? 'not-allowed' : 'pointer',
                     letterSpacing: '0.05em', boxShadow: '0 8px 32px rgba(201,168,76,0.3)'
                  }}>
                     {isSubmitting ? 'Submitting Request...' : 'Submit Booking Request'}
                  </button>
               </form>
           </Reveal>
        )}

      </div>
    </div>
  );
}
