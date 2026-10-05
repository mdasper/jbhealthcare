import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { client, urlFor } from '../sanity';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "event"] | order(date desc)`).then((data) => {
      setEvents(data);
    }).catch(console.error);
  }, []);

  const openGallery = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden'; // prevent scrolling when modal is open
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="page-transition" style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--secondary)' }}>
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 100px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: 'var(--white)', fontSize: '3.5rem', marginBottom: '20px' }}>Events & Medical Camps</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
            Stay updated with our latest medical camps, health awareness programs, and hospital events.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {events.length > 0 ? events.map((eventItem, index) => (
              <div key={eventItem._id || index} style={{ backgroundColor: 'var(--white)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} data-aos="fade-up" data-aos-delay={`${(index % 3 + 1) * 100}`}>
                <div 
                  style={{ height: '250px', cursor: 'pointer', overflow: 'hidden', position: 'relative' }} 
                  onClick={() => openGallery(eventItem)}
                >
                  <img 
                    src={eventItem.thumbnail ? urlFor(eventItem.thumbnail).url() : 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                    alt={eventItem.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    className="event-img-hover"
                  />
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease' }} className="gallery-overlay">
                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', padding: '10px 20px', border: '2px solid white', borderRadius: '30px' }}>View Gallery</span>
                  </div>
                </div>
                <div style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '10px', fontWeight: 'bold' }}>
                    <Calendar size={18} />
                    {eventItem.date ? new Date(eventItem.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date TBD'}
                  </div>
                  <h3 style={{ color: 'var(--primary)', fontSize: '1.4rem', marginBottom: '15px' }}>{eventItem.title}</h3>
                  <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>{eventItem.description}</p>
                  
                  {eventItem.gallery && eventItem.gallery.length > 0 && (
                    <button onClick={() => openGallery(eventItem)} className="btn btn-outline" style={{ width: '100%' }}>View {eventItem.gallery.length} Photos</button>
                  )}
                </div>
              </div>
            )) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
                <h3>Loading Events...</h3>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedEvent && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <h2 style={{ color: 'white', margin: 0 }}>{selectedEvent.title} - Gallery</h2>
            <button onClick={closeGallery} style={{ background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}>&times;</button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '40px 20px' }}>
            <div className="container">
              {selectedEvent.gallery && selectedEvent.gallery.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  {selectedEvent.gallery.map((img, idx) => (
                    <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', height: '250px' }}>
                      <img src={urlFor(img).url()} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'white', marginTop: '100px' }}>
                  <h3>No gallery photos available for this event.</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Basic CSS for hover effects */}
      <style>{`
        .event-img-hover:hover { transform: scale(1.05); }
        .gallery-overlay:hover { opacity: 1 !important; }
      `}</style>
    </div>
  );
};

export default Events;
