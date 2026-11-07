import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  Award, 
  Tent, 
  ArrowRight, 
  Image as ImageIcon,
  Phone,
  Check,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { client, urlFor } from '../sanity';
import { galleryCollection, initialEvents } from '../data/eventsData';

const Events = () => {
  const [sanityEvents, setSanityEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('camps');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    client.fetch(`*[_type == "event"] | order(date desc)`).then((data) => {
      if (data && data.length > 0) {
        setSanityEvents(data);
      }
    }).catch(console.error);
  }, []);

  // Merge Sanity data seamlessly into the 3 clean categories
  const allEvents = (() => {
    if (!sanityEvents || sanityEvents.length === 0) {
      return initialEvents;
    }

    const processedSanity = sanityEvents.map((e, idx) => {
      const titleLower = (e.title || '').toLowerCase();
      const descLower = (e.description || '').toLowerCase();
      const isCamp = titleLower.includes('camp') || titleLower.includes('checkup') || titleLower.includes('donation') || descLower.includes('camp');
      
      const eventDate = e.date ? new Date(e.date) : new Date(0);
      const isFuture = eventDate > new Date();

      let cat = 'completed';
      if (isFuture) {
        cat = 'upcoming';
      } else if (isCamp) {
        cat = 'camps';
      }

      // Pick the best relatable image based on category or index
      let fallbackThumb = galleryCollection[idx % galleryCollection.length];
      if (titleLower.includes('eye')) fallbackThumb = '/events/camp_eye_screening.jpg';
      else if (titleLower.includes('blood')) fallbackThumb = '/events/camp_blood_donation.jpg';
      else if (titleLower.includes('mega') || titleLower.includes('health camp')) fallbackThumb = '/events/camp_health_mega.jpg';
      else if (titleLower.includes('pediatric') || titleLower.includes('vaccination')) fallbackThumb = '/events/event_pediatric_drive.jpg';
      else if (titleLower.includes('women')) fallbackThumb = '/events/event_womens_seminar.jpg';

      return {
        _id: e._id || `sanity-${idx}`,
        category: cat,
        title: e.title || 'Special Event',
        subtitle: 'சிறப்பு மருத்துவ நிகழ்வு',
        date: e.date || '2024-10-01',
        time: '09:00 AM – 02:00 PM',
        location: 'JB Healthcare, Sivakasi',
        badge: isFuture ? 'Upcoming' : (isCamp ? 'Free Camp' : 'Completed'),
        description: e.description || 'Community health initiative and medical consultation program organized by JB Healthcare.',
        highlights: ['Specialist Doctors', 'Diagnostic Reporting'],
        thumbnailUrl: e.thumbnail ? urlFor(e.thumbnail).url() : fallbackThumb,
        gallery: e.gallery,
        isUpcoming: isFuture
      };
    });

    const hasUpcoming = processedSanity.some(e => e.category === 'upcoming');
    const upcomingSupplements = hasUpcoming ? [] : initialEvents.filter(d => d.category === 'upcoming');
    const campsSupplements = processedSanity.some(e => e.category === 'camps') ? [] : initialEvents.filter(d => d.category === 'camps');
    const completedSupplements = processedSanity.some(e => e.category === 'completed') ? [] : initialEvents.filter(d => d.category === 'completed');

    return [...upcomingSupplements, ...campsSupplements, ...completedSupplements, ...processedSanity];
  })();

  const upcomingList = allEvents.filter(e => e.category === 'upcoming');
  const campsList = allEvents.filter(e => e.category === 'camps');
  const completedList = allEvents.filter(e => e.category === 'completed');

  const currentDisplayList = 
    activeTab === 'upcoming' ? upcomingList :
    activeTab === 'camps' ? campsList : completedList;

  const openGallery = (event) => {
    setSelectedEvent(event);
    const initialIdx = (event?.gallery && event?.thumbnailUrl) 
      ? Math.max(0, event.gallery.indexOf(event.thumbnailUrl)) 
      : 0;
    setCurrentPhotoIndex(initialIdx);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    setCurrentPhotoIndex(0);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = (total) => {
    setCurrentPhotoIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const prevPhoto = (total) => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  // Build high-res relatable photos for this event
  const getEventGallery = (event) => {
    if (!event) return galleryCollection;
    if (event.gallery && event.gallery.length > 0) {
      return event.gallery;
    }
    // Return a curated array with the event's thumbnail as first photo
    const startImg = event.thumbnailUrl || galleryCollection[0];
    const otherImgs = galleryCollection.filter(img => img !== startImg);
    return [startImg, ...otherImgs];
  };

  const activeGallery = getEventGallery(selectedEvent);

  // Keyboard navigation: ESC to close, Left/Right arrow to cycle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedEvent) return;
      if (e.key === 'Escape') {
        closeGallery();
      } else if (e.key === 'ArrowRight') {
        nextPhoto(activeGallery.length);
      } else if (e.key === 'ArrowLeft') {
        prevPhoto(activeGallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent, activeGallery.length]);

  // Helper date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return { day: '15', month: 'DEC', year: '2024' };
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      year: d.getFullYear()
    };
  };

  return (
    <div className="page-transition" style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingTop: '80px' }}>
      
      {/* 1. Sleek Hero Header */}
      <section className="events-hero-section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 className="events-hero-title" style={{ color: '#FFFFFF', marginBottom: '14px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)', letterSpacing: '0.3px' }}>
            Events & Medical Camps
          </h1>
          <p className="events-hero-sub" style={{ maxWidth: '760px', margin: '0 auto', color: '#FFFFFF', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)', lineHeight: '1.65' }}>
            Explore our specialized health screening camps, upcoming hospital consultations, and community welfare programs in Sivakasi.
          </p>
        </div>
      </section>

      {/* 2. Premium 3-Segment Tab Bar (Mess-Free Segmented Controller) */}
      <section className="events-tab-bar-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 0', position: 'sticky', top: '75px', zIndex: 30, boxShadow: '0 4px 18px rgba(0,0,0,0.03)' }}>
        <div className="container">
          <div className="events-tabs-container">
            
            {/* Tab 1: Upcoming Events */}
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`events-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              style={{
                flex: 1,
                padding: '11px 16px',
                borderRadius: '35px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'upcoming' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'upcoming' ? '#FFFFFF' : '#475569',
                fontWeight: activeTab === 'upcoming' ? '800' : '600',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.25s ease',
                boxShadow: activeTab === 'upcoming' ? '0 4px 14px rgba(0, 180, 216, 0.35)' : 'none'
              }}
            >
              <Sparkles size={15} color={activeTab === 'upcoming' ? '#38BDF8' : '#64748B'} />
              <span>Upcoming</span>
              <span className="events-tab-badge" style={{
                backgroundColor: activeTab === 'upcoming' ? 'rgba(255,255,255,0.25)' : '#E2E8F0',
                color: activeTab === 'upcoming' ? '#FFFFFF' : '#475569',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '2px 7px',
                borderRadius: '10px'
              }}>
                {upcomingList.length}
              </span>
            </button>

            {/* Tab 2: Medical Camps */}
            <button
              onClick={() => setActiveTab('camps')}
              className={`events-tab-btn ${activeTab === 'camps' ? 'active' : ''}`}
              style={{
                flex: 1,
                padding: '11px 16px',
                borderRadius: '35px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'camps' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'camps' ? '#FFFFFF' : '#475569',
                fontWeight: activeTab === 'camps' ? '800' : '600',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.25s ease',
                boxShadow: activeTab === 'camps' ? '0 4px 14px rgba(0, 180, 216, 0.35)' : 'none'
              }}
            >
              <Tent size={15} color={activeTab === 'camps' ? '#38BDF8' : '#64748B'} />
              <span>Medical Camps</span>
              <span className="events-tab-badge" style={{
                backgroundColor: activeTab === 'camps' ? 'rgba(255,255,255,0.25)' : '#E2E8F0',
                color: activeTab === 'camps' ? '#FFFFFF' : '#475569',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '2px 7px',
                borderRadius: '10px'
              }}>
                {campsList.length}
              </span>
            </button>

            {/* Tab 3: Completed Events */}
            <button
              onClick={() => setActiveTab('completed')}
              className={`events-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
              style={{
                flex: 1,
                padding: '11px 16px',
                borderRadius: '35px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'completed' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'completed' ? '#FFFFFF' : '#475569',
                fontWeight: activeTab === 'completed' ? '800' : '600',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.25s ease',
                boxShadow: activeTab === 'completed' ? '0 4px 14px rgba(0, 180, 216, 0.35)' : 'none'
              }}
            >
              <Award size={15} color={activeTab === 'completed' ? '#38BDF8' : '#64748B'} />
              <span>Completed</span>
              <span className="events-tab-badge" style={{
                backgroundColor: activeTab === 'completed' ? 'rgba(255,255,255,0.25)' : '#E2E8F0',
                color: activeTab === 'completed' ? '#FFFFFF' : '#475569',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '2px 7px',
                borderRadius: '10px'
              }}>
                {completedList.length}
              </span>
            </button>

          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1180px' }}>
          
          {/* Active Category Header Banner */}
          <div className="events-banner" data-aos="fade-up">
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: activeTab === 'upcoming' ? 'rgba(16, 185, 129, 0.12)' : (activeTab === 'camps' ? 'rgba(0, 180, 216, 0.12)' : 'rgba(10, 43, 78, 0.08)'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeTab === 'upcoming' ? '#10B981' : (activeTab === 'camps' ? '#0077B6' : '#0A2540')
              }}>
                {activeTab === 'upcoming' && <Sparkles size={22} />}
                {activeTab === 'camps' && <Tent size={22} />}
                {activeTab === 'completed' && <Award size={22} />}
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>
                  {activeTab === 'upcoming' && 'Upcoming Events & Consultations'}
                  {activeTab === 'camps' && 'Free Community Medical Camps'}
                  {activeTab === 'completed' && 'Hospital Milestones & Concluded Events'}
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.88rem', margin: '3px 0 0' }}>
                  {activeTab === 'upcoming' && 'Scheduled hospital health screening, consultations, and medical drives.'}
                  {activeTab === 'camps' && 'Rural and community outreach providing free doctor consultations and basic tests.'}
                  {activeTab === 'completed' && 'Retrospective archive of past health awareness seminars and hospital milestones.'}
                </p>
              </div>
            </div>

            <span style={{ 
              backgroundColor: '#F1F5F9', 
              color: '#475569', 
              padding: '6px 14px', 
              borderRadius: '20px', 
              fontSize: '0.82rem', 
              fontWeight: '700' 
            }}>
              {currentDisplayList.length} {activeTab === 'upcoming' ? 'Programs Scheduled' : 'Items Listed'}
            </span>

          </div>

          {/* Clean 2/3 Column Grid Cards (Ultra Neat, Modern, Premium) */}
          <div className="events-grid">
            {currentDisplayList.length === 0 ? (
              <div 
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '70px 24px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1.5px dashed #CBD5E1',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.02)'
                }}
                data-aos="fade-up"
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 180, 216, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#00B4D8'
                }}>
                  <Calendar size={32} />
                </div>
                <h3 style={{ color: '#0A2540', fontSize: '1.35rem', fontWeight: '800', marginBottom: '8px' }}>
                  No Upcoming Events at the Moment
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                  We are currently organizing our upcoming healthcare consultation camps. Please check back soon or browse our community medical camps and achievements!
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActiveTab('camps')}
                    style={{
                      padding: '10px 22px',
                      borderRadius: '25px',
                      border: 'none',
                      backgroundColor: 'var(--primary)',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Tent size={16} /> Explore Medical Camps
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    style={{
                      padding: '10px 22px',
                      borderRadius: '25px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: '#0A2540',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Award size={16} /> Completed Events
                  </button>
                </div>
              </div>
            ) : (
              currentDisplayList.map((eventItem, index) => {
              const dateObj = formatDate(eventItem.date);
              const isUpcoming = eventItem.category === 'upcoming';
              const isCamp = eventItem.category === 'camps';

              return (
                <div
                  key={eventItem._id || index}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="clean-event-card"
                  data-aos="fade-up"
                  data-aos-delay={`${(index % 3 + 1) * 70}`}
                >
                  <div>
                    {/* Top Media Container */}
                    <div 
                      style={{ position: 'relative', height: '240px', overflow: 'hidden', cursor: isUpcoming ? 'default' : 'pointer' }}
                      onClick={() => !isUpcoming && openGallery(eventItem)}
                    >
                      <img 
                        src={eventItem.thumbnailUrl} 
                        alt={eventItem.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.6s ease' }}
                        className="clean-card-img"
                      />

                      {/* Floating Glass Date Badge (Top-Left) */}
                      <div style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        backgroundColor: 'rgba(6, 29, 56, 0.88)',
                        backdropFilter: 'blur(6px)',
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        padding: '6px 10px',
                        textAlign: 'center',
                        lineHeight: '1.1',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                        border: '1px solid rgba(255,255,255,0.15)'
                      }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#00B4D8' }}>{dateObj.day}</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px' }}>{dateObj.month}</div>
                      </div>

                      {/* Photo Gallery Count Overlay (Bottom-Right) - Only for concluded events */}
                      {!isUpcoming && (
                        <div style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          backgroundColor: 'rgba(0,0,0,0.72)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          padding: '4px 11px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <ImageIcon size={13} color="#00B4D8" />
                          <span>{eventItem.gallery?.length || 0} Photos</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content - Clean, Short & Sweet */}
                    <div style={{ padding: isUpcoming ? '20px 22px 24px' : '20px 22px 14px' }}>
                      
                      {/* Date & Time Ribbon (When it happens) */}
                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        backgroundColor: '#F0F9FF', 
                        border: '1px solid #BAE6FD',
                        color: '#0077B6', 
                        padding: '5px 12px', 
                        borderRadius: '20px', 
                        fontSize: '0.82rem', 
                        fontWeight: '700', 
                        marginBottom: '10px' 
                      }}>
                        <Calendar size={13} color="#00B4D8" />
                        <span>{dateObj.day} {dateObj.month} {dateObj.year}</span>
                        {eventItem.time && (
                          <span style={{ color: '#64748B', fontWeight: '600' }}>• {eventItem.time}</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 style={{
                        color: 'var(--primary)',
                        fontSize: '1.2rem',
                        fontWeight: '800',
                        lineHeight: '1.35',
                        margin: '0 0 6px'
                      }}>
                        {eventItem.title}
                      </h3>

                      {/* Tamil Subtitle */}
                      {eventItem.subtitle && (
                        <div style={{ color: '#0077B6', fontSize: '0.85rem', fontWeight: '700' }}>
                          {eventItem.subtitle}
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Card Action Footer - Gallery button only for concluded events/camps */}
                  {!isUpcoming && (
                    <div style={{ padding: '0 22px 18px' }}>
                      <button
                        onClick={() => openGallery(eventItem)}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          border: '1.5px solid #00B4D8',
                          backgroundColor: '#F0F9FF',
                          color: '#0077B6',
                          fontSize: '0.88rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.25s ease'
                        }}
                        className="clean-gallery-btn"
                      >
                        <ImageIcon size={15} /> View Event Gallery
                      </button>
                    </div>
                  )}

                </div>
              );
            }))}
          </div>

        </div>
      </section>

      {/* Advanced CSS for neat hover and interaction */}
      <style>{`
        .clean-event-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(10, 43, 78, 0.08) !important;
          border-color: #00B4D8 !important;
        }
        .clean-event-card:hover .clean-card-img {
          transform: scale(1.05);
        }
        .clean-gallery-btn:hover {
          background-color: #00B4D8 !important;
          color: #FFFFFF !important;
          box-shadow: 0 4px 12px rgba(0, 180, 216, 0.35);
        }

        /* Modal Pop-up Styling matching Surgeries Tab */
        .ot-modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(3, 12, 23, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: modalFadeIn 0.2s ease-out;
        }
        .ot-modal-popup {
          position: relative;
          max-width: 880px;
          width: 100%;
          background: #071A2E;
          border: 1.5px solid rgba(0, 180, 216, 0.45);
          border-radius: 20px;
          padding: 12px 14px 14px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.7), 0 0 35px rgba(0, 180, 216, 0.25);
          display: flex;
          flex-direction: column;
          animation: modalPopIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ot-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 6px 10px;
        }
        .ot-modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .ot-modal-close-btn:hover {
          background-color: #EF4444;
          border-color: #EF4444;
          transform: scale(1.08);
        }
        .ot-modal-image-box {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background-color: #020813;
          display: flex;
          justify-content: center;
          align-items: center;
          max-height: 72vh;
        }
        .ot-modal-img {
          width: 100%;
          max-height: 72vh;
          object-fit: contain;
          display: block;
        }
        .event-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(6, 29, 56, 0.85);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
          box-shadow: 0 4px 14px rgba(0,0,0,0.5);
        }
        .event-nav-btn:hover {
          background-color: #00B4D8;
          border-color: #00B4D8;
          transform: translateY(-50%) scale(1.08);
        }
        .event-nav-btn.prev {
          left: 12px;
        }
        .event-nav-btn.next {
          right: 12px;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPopIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 480px) {
          .ot-modal-popup { padding: 10px; border-radius: 14px; }
          .ot-modal-img { max-height: 65vh; }
          .event-nav-btn { width: 34px; height: 34px; }
          .event-nav-btn.prev { left: 8px; }
          .event-nav-btn.next { right: 8px; }
        }
      `}</style>

      {/* Pop-Up Gallery Photo Modal Dialog (Matching Surgeries Tab) */}
      {selectedEvent && typeof document !== 'undefined' && createPortal(
        <div 
          className="ot-modal-backdrop"
          onClick={closeGallery}
        >
          <div 
            className="ot-modal-popup"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '900px' }}
          >
            {/* Modal Header Bar with Close X Button */}
            <div className="ot-modal-header">
              <span style={{ color: '#38BDF8', fontSize: '0.9rem', fontWeight: '700', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', maxWidth: 'calc(100% - 50px)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00B4D8', display: 'inline-block', flexShrink: 0 }}></span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {selectedEvent.title}
                </span>
                <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(0, 180, 216, 0.2)', color: '#38BDF8', padding: '2px 8px', borderRadius: '10px', flexShrink: 0, fontWeight: '800' }}>
                  {currentPhotoIndex + 1} / {activeGallery.length}
                </span>
              </span>
              <button
                onClick={closeGallery}
                className="ot-modal-close-btn"
                aria-label="Close Image"
                title="Close (Esc)"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Modal Image Box */}
            <div className="ot-modal-image-box">
              <img 
                src={selectedEvent.gallery && selectedEvent.gallery.length > 0 && selectedEvent.gallery[currentPhotoIndex]?._type === 'image'
                  ? urlFor(activeGallery[currentPhotoIndex]).url() 
                  : (typeof activeGallery[currentPhotoIndex] === 'string' ? activeGallery[currentPhotoIndex] : (activeGallery[currentPhotoIndex]?.asset ? urlFor(activeGallery[currentPhotoIndex]).url() : galleryCollection[currentPhotoIndex % galleryCollection.length]))} 
                alt={`${selectedEvent.title} Photo`}
                className="ot-modal-img"
              />

              {/* Prev Navigation Arrow inside Image Box */}
              {activeGallery.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); prevPhoto(activeGallery.length); }}
                  className="event-nav-btn prev"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
              )}

              {/* Next Navigation Arrow inside Image Box */}
              {activeGallery.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); nextPhoto(activeGallery.length); }}
                  className="event-nav-btn next"
                  aria-label="Next Photo"
                >
                  <ChevronRight size={22} strokeWidth={2.5} />
                </button>
              )}
            </div>

            {/* Bottom thumbnail indicator pills if multiple photos */}
            {activeGallery.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', paddingTop: '10px' }}>
                {activeGallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    style={{
                      width: idx === currentPhotoIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: idx === currentPhotoIndex ? '#00B4D8' : 'rgba(255, 255, 255, 0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.25s ease'
                    }}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Mobile-Friendly Responsive Styles */}
      <style>{`
        .events-hero-section {
          padding: 120px 0 70px;
        }
        .events-hero-title {
          font-size: 3.2rem;
        }
        .events-hero-sub {
          font-size: 1.15rem;
        }
        .events-tabs-container {
          max-width: 680px;
          margin: 0 auto;
          background-color: #F1F5F9;
          border-radius: 40px;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.04);
          width: 100%;
        }
        .events-banner {
          background-color: #FFFFFF;
          border-radius: 16px;
          padding: 20px 28px;
          margin-bottom: 35px;
          border: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 360px));
          gap: 28px;
          width: 100%;
        }
        .clean-event-card {
          width: 100%;
          max-width: 360px;
        }

        @media (max-width: 768px) {
          .events-hero-section {
            padding: 95px 0 50px !important;
          }
          .events-hero-title {
            font-size: 2.3rem !important;
          }
          .events-hero-sub {
            font-size: 1rem !important;
          }
          .events-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .clean-event-card {
            max-width: 100% !important;
          }
        }

        @media (max-width: 580px) {
          .events-tabs-container {
            border-radius: 20px !important;
            padding: 4px !important;
            gap: 3px !important;
          }
          .events-tab-btn {
            padding: 9px 6px !important;
            font-size: 0.78rem !important;
            gap: 4px !important;
            border-radius: 16px !important;
          }
          .events-tab-btn svg {
            display: none !important;
          }
          .events-tab-badge {
            padding: 2px 5px !important;
            font-size: 0.68rem !important;
          }
          .events-banner {
            padding: 14px 16px !important;
            margin-bottom: 20px !important;
          }
          .events-banner h2 {
            font-size: 1.1rem !important;
          }
          .events-banner p {
            font-size: 0.8rem !important;
          }
          .clean-event-card {
            width: 100% !important;
          }
        }
      `}</style>

    </div>
  );
};

export default Events;
