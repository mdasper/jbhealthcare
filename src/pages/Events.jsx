import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { client, urlFor } from '../sanity';

const dummyGallery = [
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

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
    <>
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
              <div key={eventItem._id || index} style={{ backgroundColor: 'var(--white)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.08)', transition: 'transform 0.4s ease, box-shadow 0.4s ease' }} className="premium-event-card" data-aos="fade-up" data-aos-delay={`${(index % 3 + 1) * 100}`}>
                <div 
                  style={{ height: '280px', cursor: 'pointer', overflow: 'hidden', position: 'relative' }} 
                  onClick={() => openGallery(eventItem)}
                >
                  <img 
                    src={eventItem.thumbnail ? urlFor(eventItem.thumbnail).url() : 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                    alt={eventItem.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }}
                    className="event-img-hover"
                  />
                  
                  {/* Elegant Date Badge */}
                  <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: 'var(--white)', padding: '8px 16px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', zIndex: 2 }}>
                    <Calendar size={16} color="var(--accent)" />
                    <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                      {eventItem.date ? new Date(eventItem.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD'}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 43, 78, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.4s ease' }} className="gallery-overlay">
                    <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.5)', transform: 'scale(0.8)', transition: 'transform 0.4s ease' }} className="gallery-icon-container">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '35px 30px' }}>
                  <h3 style={{ color: 'var(--primary)', fontSize: '1.75rem', marginBottom: '15px', lineHeight: '1.3', fontFamily: 'Cormorant Garamond, serif' }}>{eventItem.title}</h3>
                  <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{eventItem.description}</p>
                  
                  <button onClick={() => openGallery(eventItem)} className="btn" style={{ width: '100%', backgroundColor: 'var(--secondary)', color: 'var(--primary)', border: 'none', padding: '15px', fontSize: '1.05rem', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', borderRadius: '8px' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--white)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--secondary)'; e.currentTarget.style.color = 'var(--primary)'; }}>
                    View Gallery ({eventItem.gallery?.length || 10})
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
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

      {/* Advanced CSS for premium hover effects */}
      <style>{`
        .premium-event-card:hover { transform: translateY(-10px); box-shadow: 0 20px 50px rgba(10, 43, 78, 0.15) !important; }
        .premium-event-card:hover .event-img-hover { transform: scale(1.08) !important; }
        .premium-event-card:hover .gallery-overlay { opacity: 1 !important; }
        .premium-event-card:hover .gallery-icon-container { transform: scale(1) !important; }
      `}</style>
    </>

      {/* Gallery Modal (Outside page-transition to fix position: fixed) */}
      {selectedEvent && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999999, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <h2 style={{ color: 'white', margin: 0 }}>{selectedEvent.title} - Gallery</h2>
            <button onClick={closeGallery} style={{ background: 'none', border: 'none', color: 'white', fontSize: '3rem', cursor: 'pointer', lineHeight: '1' }}>&times;</button>
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  {dummyGallery.map((imgUrl, idx) => (
                    <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', height: '250px' }}>
                      <img src={imgUrl} alt={`Dummy Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
