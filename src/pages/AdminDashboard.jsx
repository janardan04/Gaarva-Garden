import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

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
  const [mainTab, setMainTab] = useState('bookings'); // bookings, events, halls, backgrounds
  const [activeTab, setActiveTab] = useState('all'); // for bookings filter
  
  const [offlineFormVisible, setOfflineFormVisible] = useState(false);
  const [offlineForm, setOfflineForm] = useState({ hallId: '', date: '', time: '' });

  const [bookings, setBookings] = useState([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [contactsCount, setContactsCount] = useState(0);
  const [halls, setHalls] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageBase64, setImageBase64] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Forms
  const [eventForm, setEventForm] = useState({
    title: '', category: 'Music', date: '', time: '', price: '', desc: '', emoji: '🎵', featured: false
  });
  
  const [hallForm, setHallForm] = useState({
    name: '', capacity: '', description: '', timeSlots: ''
  });

  const [bgForm, setBgForm] = useState({
    name: '', category: 'Birthday'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bSnapshot = await getDocs(collection(db, 'bookings'));
      const bookingsData = bSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      bookingsData.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
      setBookings(bookingsData);

      const eSnapshot = await getDocs(collection(db, 'events'));
      setEventsCount(eSnapshot.size);

      const cSnapshot = await getDocs(collection(db, 'contacts'));
      setContactsCount(cSnapshot.size);

      const hSnapshot = await getDocs(collection(db, 'halls'));
      setHalls(hSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));

      const bgSnapshot = await getDocs(collection(db, 'backgrounds'));
      setBackgrounds(bgSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter(b => b.status?.toLowerCase() === activeTab);

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: '📋' },
    { label: 'Halls Available', value: halls.length, icon: '🏛️' },
    { label: 'Events Active', value: eventsCount, icon: '🎉' },
  ];

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "garvaa-garden");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtdblrj3h/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingImage(true);
      try {
        const url = await uploadImageToCloudinary(file);
        setImageBase64(url); 
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        alert("Image upload failed. Please try again.");
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const submitEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'events'), { ...eventForm, imageBase64, createdAt: serverTimestamp() });
      alert('Event added!');
      setEventForm({ title: '', category: 'Music', date: '', time: '', price: '', desc: '', emoji: '🎵', featured: false });
      setImageBase64('');
      fetchData();
    } catch (error) { console.error(error); alert('Error'); } 
    finally { setIsSubmitting(false); }
  };

  const submitHall = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if(!imageBase64) return alert("Image required for hall");
      let slotsArray = hallForm.timeSlots ? hallForm.timeSlots.split(',').map(s => s.trim()) : ['11:00 AM', '02:00 PM', '05:00 PM', '08:00 PM'];
      await addDoc(collection(db, 'halls'), { ...hallForm, timeSlots: slotsArray, imageBase64, createdAt: serverTimestamp() });
      alert('Hall added!');
      setHallForm({ name: '', capacity: '', description: '', timeSlots: '' });
      setImageBase64('');
      fetchData();
    } catch (error) { console.error(error); alert('Error'); } 
    finally { setIsSubmitting(false); }
  };

  const submitBackground = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if(!imageBase64) return alert("Image required for background!");
      await addDoc(collection(db, 'backgrounds'), { ...bgForm, imageBase64, createdAt: serverTimestamp() });
      alert('Background theme added!');
      setBgForm({ name: '', category: 'Birthday' });
      setImageBase64('');
      fetchData();
    } catch (error) { console.error(error); alert('Error'); } 
    finally { setIsSubmitting(false); }
  };
  
  const handleDelete = async (collectionName, id) => {
     if(window.confirm('Delete this item?')) {
         await deleteDoc(doc(db, collectionName, id));
         fetchData();
     }
  };

  const handleBookingAction = async (id, action) => {
     if (action === 'delete') {
         if(window.confirm('Delete this booking?')) {
             await deleteDoc(doc(db, 'bookings', id));
             fetchData();
         }
     } else {
         await updateDoc(doc(db, 'bookings', id), { status: action });
         fetchData();
     }
  };

  const submitOfflineBooking = async (e) => {
     e.preventDefault();
     const selectedHall = halls.find(h => h.id === offlineForm.hallId);
     if(!selectedHall) return alert("Select a hall first.");
     
     try {
       await addDoc(collection(db, 'bookings'), {
         name: "Offline Booking", phone: "N/A", email: "N/A", guests: "N/A",
         hallId: selectedHall.id, hallName: selectedHall.name,
         slotDate: offlineForm.date, slotTime: offlineForm.time,
         themeName: "None (Offline)", themeImageBase64: "", themeCategory: "None",
         status: "Confirmed", createdAt: serverTimestamp()
       });
       alert("Offline booking slot blocked successfully!");
       setOfflineForm({ hallId: '', date: '', time: '' });
       setOfflineFormVisible(false);
       fetchData();
     } catch (err) {
       console.error("Error offline booking", err);
       alert("Error adding offline booking");
     }
  };

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 8, fontFamily: 'var(--sans)', fontSize: 13, border: '1px solid rgba(201,168,76,0.3)', marginBottom: '16px', boxSizing: 'border-box' };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 72 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 40, fontWeight: 400, color: 'var(--ink)', marginBottom: 6 }}>Dashboard</h1>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', letterSpacing: '0.05em' }}>
                Welcome back, Admin · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <div>
              <Link to="/" style={{ padding: '12px 24px', borderRadius: 100, textDecoration: 'none', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--ink-muted)' }}>← Back to Site</Link>
            </div>
          </div>
        </Reveal>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 16 }}>
          {['bookings', 'halls', 'backgrounds', 'events'].map(tab => (
            <button key={tab} onClick={() => { setMainTab(tab); setImageBase64(''); }} style={{
              padding: '12px 24px', borderRadius: 100, textTransform: 'capitalize', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, transition: 'all 300ms',
              background: mainTab === tab ? 'var(--ink)' : 'transparent', color: mainTab === tab ? 'var(--gold-light)' : 'var(--ink)',
              border: mainTab === tab ? '1px solid var(--ink)' : '1px solid rgba(201,168,76,0.3)',
            }}>
              {tab === 'bookings' ? '📋 Bookings' : tab === 'halls' ? '🏛️ Halls' : tab === 'backgrounds' ? '🖼️ Backgrounds' : '🎉 Events'}
            </button>
          ))}
        </div>

        {mainTab === 'bookings' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20, marginBottom: 40 }}>
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 70}>
                  <div style={{ padding: '28px 24px', borderRadius: 20, background: 'var(--white)', border: '1px solid rgba(201,168,76,0.15)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}><span style={{ fontSize: 28 }}>{s.icon}</span></div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400, color: 'var(--ink)', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div style={{ background: 'var(--white)', borderRadius: 24, border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
                <div style={{ padding: '28px 32px', borderBottom: '1px solid rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, color: 'var(--ink)' }}>Recent Bookings</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button onClick={() => setOfflineFormVisible(!offlineFormVisible)} style={{ padding: '8px 18px', borderRadius: 100, fontFamily: 'var(--sans)', fontSize: 12, cursor: 'pointer', background: 'var(--gold)', border: 'none', color: 'var(--ink)', fontWeight: 500 }}>+ Block Offline Slot</button>
                    {['all', 'confirmed', 'pending', 'cancelled'].map(tab => (
                      <button key={tab} onClick={() => setActiveTab(tab)} style={{
                        padding: '8px 18px', borderRadius: 100, fontFamily: 'var(--sans)', fontSize: 12, cursor: 'pointer', textTransform: 'capitalize', letterSpacing: '0.06em',
                        border: activeTab === tab ? '1px solid var(--ink)' : '1px solid rgba(201,168,76,0.2)', background: activeTab === tab ? 'var(--ink)' : 'transparent', color: activeTab === tab ? 'var(--gold-light)' : 'var(--ink-muted)',
                      }}>{tab}</button>
                    ))}
                  </div>
                </div>

                {offlineFormVisible && (
                  <form onSubmit={submitOfflineBooking} style={{ padding: '24px 32px', background: 'var(--cream)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, alignItems: 'flex-end' }}>
                       <div>
                         <label style={{display:'block', fontSize:12, fontFamily:'var(--sans)', marginBottom:4}}>Select Hall</label>
                         <select required style={inputStyle} value={offlineForm.hallId} onChange={e=>setOfflineForm({...offlineForm, hallId: e.target.value, time: ''})}>
                            <option value="">- Choose Hall -</option>
                            {halls.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                         </select>
                       </div>
                       <div>
                         <label style={{display:'block', fontSize:12, fontFamily:'var(--sans)', marginBottom:4}}>Date (YYYY-MM-DD)</label>
                         <input required type="date" style={inputStyle} value={offlineForm.date} onChange={e=>setOfflineForm({...offlineForm, date: e.target.value})} />
                       </div>
                       <div>
                         <label style={{display:'block', fontSize:12, fontFamily:'var(--sans)', marginBottom:4}}>Time Slot</label>
                         <select required style={inputStyle} value={offlineForm.time} onChange={e=>setOfflineForm({...offlineForm, time: e.target.value})}>
                            <option value="">- Choose Time -</option>
                            {offlineForm.hallId && halls.find(h=>h.id === offlineForm.hallId)?.timeSlots?.map(ts => (
                               <option key={ts} value={ts}>{ts}</option>
                            ))}
                            <option value="Custom">Custom Time (type below)</option>
                         </select>
                         {offlineForm.time === 'Custom' && <input required type="text" placeholder="e.g. 10:30 AM" style={inputStyle} onChange={e=>setOfflineForm({...offlineForm, time: e.target.value})} />}
                       </div>
                       <div>
                         <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'var(--ink)', color: 'var(--gold-light)', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, marginBottom: 16 }}>Block Slot</button>
                       </div>
                    </div>
                  </form>
                )}

                <div style={{ overflowX: 'auto' }} className="table-desktop">
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                        {['Date Booked', 'Guest Name', 'Venue / Event', 'Slot Date', 'Status', 'Theme', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map(b => (
                        <tr key={b.id} style={{ borderBottom: '1px solid rgba(201,168,76,0.05)' }}>
                          <td style={{ padding: '16px 20px', fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)' }}>
                            {b.createdAt ? new Date(b.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                          </td>
                          <td style={{ padding: '16px 20px', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>
                             {b.name} <br/><span style={{fontSize: 11, color: 'var(--ink-soft)'}}>{b.phone !== 'N/A' ? b.phone : 'Offline'}</span>
                          </td>
                          <td style={{ padding: '16px 20px', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)' }}>
                             <strong style={{color:'var(--ink)'}}>{b.hallName || b.event || 'General'}</strong>
                          </td>
                          <td style={{ padding: '16px 20px', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)' }}>
                             {b.slotDate || b.date} <br/> {b.slotTime || b.time}
                          </td>
                          <td style={{ padding: '16px 20px' }}><span style={statusStyle(b.status || 'Pending')}>{b.status || 'Pending'}</span></td>
                          <td style={{ padding: '16px 20px' }}>
                             {b.themeImageBase64 ? (
                                <img src={b.themeImageBase64} alt="Theme" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '6px' }} title={b.themeName} />
                             ) : 'None'}
                          </td>
                          <td style={{ padding: '16px 20px', display: 'flex', gap: 6 }}>
                             {b.status !== 'Confirmed' && <button onClick={()=>handleBookingAction(b.id, 'Confirmed')} style={{ padding:'4px 8px', fontSize:12, cursor:'pointer', background:'rgba(74,222,128,0.1)', border:'none', borderRadius:4, color:'#16a34a' }}>✅</button>}
                             {b.status !== 'Cancelled' && <button onClick={()=>handleBookingAction(b.id, 'Cancelled')} style={{ padding:'4px 8px', fontSize:12, cursor:'pointer', background:'rgba(251,191,36,0.1)', border:'none', borderRadius:4, color:'#d97706' }}>❌</button>}
                             <button onClick={()=>handleBookingAction(b.id, 'delete')} style={{ padding:'4px 8px', fontSize:12, cursor:'pointer', background:'rgba(248,113,113,0.1)', border:'none', borderRadius:4, color:'#dc2626' }}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredBookings.length === 0 && <div style={{ textAlign: 'center', padding: 60 }}>No bookings found.</div>}
              </div>
            </Reveal>
          </>
        )}

        {mainTab === 'halls' && (
          <Reveal>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
                <div style={{ background: 'var(--white)', padding: 32, borderRadius: 24, border: '1px solid rgba(201,168,76,0.15)' }}>
                   <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, marginBottom: 20 }}>Add Hall</h3>
                   <form onSubmit={submitHall}>
                      <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)' }}>Hall Name</label>
                      <input type="text" name="name" value={hallForm.name} onChange={e => setHallForm({...hallForm, name: e.target.value})} required style={inputStyle} />
                      
                      <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)' }}>Max Capacity</label>
                      <input type="text" name="capacity" value={hallForm.capacity} onChange={e => setHallForm({...hallForm, capacity: e.target.value})} required style={inputStyle} placeholder="e.g. 150 guests" />

                      <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)' }}>Time Slots (comma separated)</label>
                      <input type="text" name="timeSlots" value={hallForm.timeSlots} onChange={e => setHallForm({...hallForm, timeSlots: e.target.value})} required style={inputStyle} placeholder="e.g. 11:00 AM, 02:00 PM, 05:00 PM" />

                      <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)' }}>Description</label>
                      <textarea name="description" value={hallForm.description} onChange={e => setHallForm({...hallForm, description: e.target.value})} required rows={3} style={{ ...inputStyle, resize: 'none' }} />

                      <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)' }}>Hall Image</label>
                      <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: 16 }} />
                      {isUploadingImage && <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 16 }}>Uploading image to Cloudinary...</div>}
                      {imageBase64 && <img src={imageBase64} alt="preview" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />}

                      <button type="submit" disabled={isSubmitting || isUploadingImage} style={{ width: '100%', padding: '14px', borderRadius: 100, background: 'var(--gold)', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14 }}>{isSubmitting ? 'Saving...' : 'Add Hall'}</button>
                   </form>
                </div>
                <div>
                   <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, marginBottom: 20 }}>Existing Halls</h3>
                   <div style={{ display: 'grid', gap: 16 }}>
                      {halls.map(h => (
                         <div key={h.id} style={{ display: 'flex', gap: 16, background: 'var(--white)', padding: 16, borderRadius: 16, alignItems: 'center' }}>
                            <img src={h.imageBase64} alt={h.name} style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 12 }} />
                            <div style={{ flex: 1 }}>
                               <h4 style={{ margin: '0 0 4px', fontFamily: 'var(--sans)' }}>{h.name}</h4>
                               <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-muted)' }}>Cap: {h.capacity}</p>
                            </div>
                            <button onClick={()=> handleDelete('halls', h.id)} style={{ padding: '8px 16px', background: 'rgba(248,113,113,0.1)', color: '#dc2626', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Delete</button>
                         </div>
                      ))}
                      {halls.length === 0 && <div style={{ color: 'var(--ink-muted)' }}>No halls found.</div>}
                   </div>
                </div>
             </div>
          </Reveal>
        )}

        {mainTab === 'backgrounds' && (
          <Reveal>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
                <div style={{ background: 'var(--white)', padding: 32, borderRadius: 24, border: '1px solid rgba(201,168,76,0.15)' }}>
                   <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, marginBottom: 20 }}>Add Background</h3>
                   <form onSubmit={submitBackground}>
                      <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)' }}>Theme/Name</label>
                      <input type="text" name="name" value={bgForm.name} onChange={e => setBgForm({...bgForm, name: e.target.value})} required style={inputStyle} placeholder="e.g. Minimalist Birthday" />
                      
                      <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)' }}>Category</label>
                      <select name="category" value={bgForm.category} onChange={e => setBgForm({...bgForm, category: e.target.value})} required style={inputStyle}>
                         <option>Birthday</option>
                         <option>Anniversary</option>
                         <option>Corporate</option>
                         <option>Custom</option>
                      </select>

                      <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontFamily: 'var(--sans)' }}>Image</label>
                      <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: 16 }} />
                      {isUploadingImage && <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 16 }}>Uploading image to Cloudinary...</div>}
                      {imageBase64 && <img src={imageBase64} alt="preview" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />}

                      <button type="submit" disabled={isSubmitting || isUploadingImage} style={{ width: '100%', padding: '14px', borderRadius: 100, background: 'var(--gold)', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14 }}>{isSubmitting ? 'Saving...' : 'Add Background'}</button>
                   </form>
                </div>
                <div>
                   <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, marginBottom: 20 }}>Existing Themes</h3>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                      {backgrounds.map(bg => (
                         <div key={bg.id} style={{ background: 'var(--white)', padding: 12, borderRadius: 16, textAlign: 'center' }}>
                            <img src={bg.imageBase64} alt={bg.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                            <h4 style={{ margin: '0 0 4px', fontSize: 14, fontFamily: 'var(--sans)' }}>{bg.name}</h4>
                            <span style={{ fontSize: 11, background: 'var(--cream)', padding: '2px 8px', borderRadius: 100 }}>{bg.category}</span>
                            <button onClick={()=> handleDelete('backgrounds', bg.id)} style={{ display: 'block', marginTop: 12, width: '100%', padding: 6, background: 'rgba(248,113,113,0.1)', color: '#dc2626', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Delete</button>
                         </div>
                      ))}
                      {backgrounds.length === 0 && <div style={{ color: 'var(--ink-muted)' }}>No themes found.</div>}
                   </div>
                </div>
             </div>
          </Reveal>
        )}

        {/* Existing Events form logic can be kept simple or exactly as before if needed. Let's provide a slimmed down version for completeness */}
        {mainTab === 'events' && (
           <Reveal>
             <div style={{ background: 'var(--white)', padding: 32, borderRadius: 24, border: '1px solid rgba(201,168,76,0.15)' }}>
               <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, marginBottom: 20 }}>Add Event</h3>
               <p style={{color: 'var(--ink-muted)'}}>Events are standalone experiences like music nights.</p>
               <form onSubmit={submitEvent}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div><input type="text" name="title" value={eventForm.title} onChange={e=>setEventForm({...eventForm, title: e.target.value})} placeholder="Title" required style={inputStyle} /></div>
                      <div><input type="text" name="date" value={eventForm.date} onChange={e=>setEventForm({...eventForm, date: e.target.value})} placeholder="Date" required style={inputStyle} /></div>
                      <div><input type="text" name="time" value={eventForm.time} onChange={e=>setEventForm({...eventForm, time: e.target.value})} placeholder="Time" required style={inputStyle} /></div>
                      <div><input type="text" name="price" value={eventForm.price} onChange={e=>setEventForm({...eventForm, price: e.target.value})} placeholder="Price" required style={inputStyle} /></div>
                  </div>
                  <textarea name="desc" value={eventForm.desc} onChange={e=>setEventForm({...eventForm, desc: e.target.value})} placeholder="Description" required rows={3} style={{ ...inputStyle, resize: 'none' }} />
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: 16 }} />
                  {isUploadingImage && <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 16 }}>Uploading image...</div>}
                  <button type="submit" disabled={isSubmitting || isUploadingImage} style={{ padding: '14px 32px', borderRadius: 100, background: 'var(--gold)', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14 }}>{isSubmitting ? 'Saving...' : 'Add Event'}</button>
               </form>
             </div>
           </Reveal>
        )}
      </div>
      
      <style>{`
        @media(max-width:700px){
           .table-desktop{display:none!important}
        }
      `}</style>
    </div>
  );
}