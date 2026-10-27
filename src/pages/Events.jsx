import { useState, useEffect } from 'react';
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

// High-resolution realistic images for galleries
const galleryCollection = [
  '/events/camp_health_mega.jpg',
  '/events/camp_eye_screening.jpg',
  '/events/camp_blood_donation.jpg',
  '/events/camp_laparoscopic_consult.jpg',
  '/events/camp_cardiac_diabetes.jpg',
  '/events/event_foundation_day.jpg',
  '/events/event_womens_seminar.jpg',
  '/events/event_pediatric_drive.jpg'
];

// Rich, authentic curated events with generated relatable imagery
const initialEvents = [
  // 1. Upcoming Events
  {
    _id: 'up-1',
    category: 'upcoming',
    title: 'Advanced Laparoscopic & Hernia Consultation Camp',
    subtitle: 'லேப்ரோஸ்கோபிக் & குடல் இறக்கம் சிறப்பு முகாம்',
    date: '2026-11-20',
    time: '09:00 AM – 03:00 PM',
    location: 'JB Healthcare Main Campus, Sivakasi',
    badge: 'Registration Open',
    description: 'Expert surgical consultation camp led by Chief Laparoscopic Surgeon Dr. B. Saileshkumar. Comprehensive clinical assessment and ultrasound guidance for hernia, gallstones, and keyhole abdominal surgery.',
    highlights: ['Free Expert Consultation', 'Discounted Ultrasound Guidance'],
    thumbnailUrl: '/events/camp_laparoscopic_consult.jpg',
    isUpcoming: true
  },
  {
    _id: 'up-2',
    category: 'upcoming',
    title: 'Community Cardiac & Diabetic Health Screening',
    subtitle: 'இதயம் & சர்க்கரை நோய் தடுப்பு பரிசோதனை முகாம்',
    date: '2026-12-08',
    time: '08:30 AM – 02:00 PM',
    location: 'JB Healthcare Outpatient Wing',
    badge: 'Limited Slots',
    description: 'Comprehensive screening for hypertension, cardiac risk factors, and diabetic complications with immediate on-site diagnostic reporting.',
    highlights: ['Free Blood Sugar & BP', 'Discounted ECG & Physician Review'],
    thumbnailUrl: '/events/camp_cardiac_diabetes.jpg',
    isUpcoming: true
  },

  // 2. Medical Camps
  {
    _id: 'camp-1',
    category: 'camps',
    title: 'Free Mega Multi-Specialty Health Camp',
    subtitle: 'இலவச விரிவான மருத்துவ முகாம்',
    date: '2024-12-15',
    time: '08:00 AM – 04:00 PM',
    location: 'Rural Outreach Centre, Virudhunagar',
    badge: '500+ Patients',
    description: 'Full-day community medical initiative offering general surgery, gynaecology, orthopaedics, and pediatric care with free basic medicine distribution.',
    highlights: ['500+ Patients Treated', 'Free Medicines Distributed'],
    thumbnailUrl: '/events/camp_health_mega.jpg',
    isUpcoming: false
  },
  {
    _id: 'camp-2',
    category: 'camps',
    title: 'Community Eye Care & Vision Screening Camp',
    subtitle: 'இலவச கண் பரிசோதனை முகாம்',
    date: '2024-11-20',
    time: '09:00 AM – 02:00 PM',
    location: 'JB Healthcare Community Hall',
    badge: 'Free Screening',
    description: 'Specialized eye clinic diagnosing early cataracts, glaucoma, and vision errors for elderly and school students in the Sivakasi region.',
    highlights: ['Refraction & Glaucoma Check', 'Subsidized Surgery Support'],
    thumbnailUrl: '/events/camp_eye_screening.jpg',
    isUpcoming: false
  },
  {
    _id: 'camp-3',
    category: 'camps',
    title: 'Voluntary Blood Donation & Emergency Awareness Drive',
    subtitle: 'ரத்த தான முகாம் & விழிப்புணர்வு முகாம்',
    date: '2024-08-15',
    time: '08:00 AM – 01:00 PM',
    location: 'JB Healthcare Main Lobby, Sivakasi',
    badge: '120 Units',
    description: 'Voluntary blood drive conducted in association with youth organizations to support critical surgical casualty care and trauma readiness.',
    highlights: ['120 Units Collected', '24/7 Surgical Blood Reserve'],
    thumbnailUrl: '/events/camp_blood_donation.jpg',
    isUpcoming: false
  },

  // 3. Completed Events
  {
    _id: 'comp-1',
    category: 'completed',
    title: 'Hospital Foundation Day & 10,000+ Surgeries Milestone',
    subtitle: 'மருத்துவமனை தொடக்க விழா & 10,000+ அறுவை சிகிச்சை சாதனை',
    date: '2024-10-10',
    time: '10:00 AM – 01:00 PM',
    location: 'JB Healthcare Auditorium',
    badge: 'Milestone Day',
    description: 'Felicitation ceremony honoring our medical team on completing over 10,000 successful surgeries and 2,000+ advanced laparoscopic operations.',
    highlights: ['Doctor Felicitation', 'Community Health Milestone'],
    thumbnailUrl: '/events/event_foundation_day.jpg',
    isUpcoming: false
  },
  {
    _id: 'comp-2',
    category: 'completed',
    title: 'Women’s Health & Minimally Invasive Surgery Seminar',
    subtitle: 'பெண்கள் நலன் & லேப்ரோஸ்கோபிக் விழிப்புணர்வு கருத்தரங்கம்',
    date: '2024-09-08',
    time: '10:30 AM – 01:30 PM',
    location: 'Sivakasi Town Hall',
    badge: '350+ Attendees',
    description: 'Awareness seminar on keyhole gynecological surgery, painless maternity care, and preventive health for modern working women.',
    highlights: ['Specialist Q&A Panel', 'Health Guide Distribution'],
    thumbnailUrl: '/events/event_womens_seminar.jpg',
    isUpcoming: false
  },
  {
    _id: 'comp-3',
    category: 'completed',
    title: 'Pediatric Immunization & Child Health Initiative',
    subtitle: 'குழந்தைகள் தடுப்பூசி முகாம் & ஊட்டச்சத்து முகாம்',
    date: '2024-10-15',
    time: '09:00 AM – 01:00 PM',
    location: 'JB Healthcare Pediatric Wing',
    badge: 'Concluded',
    description: 'Routine vaccination camp and developmental milestones screening conducted by visiting pediatric specialists.',
    highlights: ['Free Pediatric Check', 'Vaccination Growth Chart'],
    thumbnailUrl: '/events/event_pediatric_drive.jpg',
    isUpcoming: false
  }
];

const Events = () => {
  const [sanityEvents, setSanityEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
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

    return [...upcomingSupplements, ...campsSupplements, ...processedSanity];
  })();

  const upcomingList = allEvents.filter(e => e.category === 'upcoming');
  const campsList = allEvents.filter(e => e.category === 'camps');
  const completedList = allEvents.filter(e => e.category === 'completed');

  const currentDisplayList = 
    activeTab === 'upcoming' ? upcomingList :
    activeTab === 'camps' ? campsList : completedList;

  const openGallery = (event) => {
    setSelectedEvent(event);
    setCurrentPhotoIndex(0);
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
      <section style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '120px 0 80px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: '3.4rem', marginBottom: '14px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)', letterSpacing: '0.3px' }}>
            Events & Medical Camps
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '760px', margin: '0 auto', color: '#FFFFFF', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)', lineHeight: '1.65' }}>
            Explore our specialized health screening camps, upcoming hospital consultations, and community welfare programs in Sivakasi.
          </p>
        </div>
      </section>

      {/* 2. Premium 3-Segment Tab Bar (Mess-Free Segmented Controller) */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 0', position: 'sticky', top: '75px', zIndex: 30, boxShadow: '0 4px 18px rgba(0,0,0,0.03)' }}>
        <div className="container">
          <div style={{ 
            maxWidth: '680px', 
            margin: '0 auto', 
            backgroundColor: '#F1F5F9', 
            borderRadius: '40px', 
            padding: '5px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)'
          }}>
            
            {/* Tab 1: Upcoming Events */}
            <button
              onClick={() => setActiveTab('upcoming')}
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
              <span style={{
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
              <span style={{
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
              <span style={{
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
      <section style={{ padding: '45px 0 90px' }}>
        <div className="container" style={{ maxWidth: '1180px' }}>
          
          {/* Active Category Header Banner */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px 28px',
            marginBottom: '35px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
          }} data-aos="fade-up">
            
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px'
          }}>
            {currentDisplayList.map((eventItem, index) => {
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
                      style={{ position: 'relative', height: '220px', overflow: 'hidden', cursor: isUpcoming ? 'default' : 'pointer' }}
                      onClick={() => !isUpcoming && openGallery(eventItem)}
                    >
                      <img 
                        src={eventItem.thumbnailUrl} 
                        alt={eventItem.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
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
                          backgroundColor: 'rgba(0,0,0,0.65)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <ImageIcon size={12} color="#00B4D8" />
                          <span>{activeGallery.length} Photos</span>
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
            })}
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
      `}</style>

      {/* Pure, Minimalist Lightbox Modal: Just Photo with Top-Right 'X' & Click Outside to Exit */}
      {selectedEvent && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 999999, 
            backgroundColor: 'rgba(0, 0, 0, 0.92)', 
            backdropFilter: 'blur(8px)',
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out' // Shows that clicking the black screen will exit
          }}
          onClick={(e) => {
            // Clicking anywhere on the black screen closes the modal!
            if (e.target === e.currentTarget) closeGallery();
          }}
        >
          {/* Main Photo Wrapper */}
          <div 
            style={{ 
              position: 'relative', 
              maxWidth: '92vw', 
              maxHeight: '86vh', 
              cursor: 'default',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* The Dedicated 'X' Button on top-right of the photo */}
            <button 
              onClick={closeGallery}
              style={{
                position: 'absolute',
                top: '-18px',
                right: '-18px',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#061D38',
                border: '2px solid rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                zIndex: 1000,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.12)';
                e.currentTarget.style.backgroundColor = '#E63946';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#061D38';
              }}
              aria-label="Close"
              title="Close (or click black screen)"
            >
              <X size={22} strokeWidth={2.5} />
            </button>

            {/* Left Chevron Arrow (Previous) */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevPhoto(activeGallery.length); }}
              style={{
                position: 'absolute',
                left: '-26px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#061D38',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                zIndex: 50,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.backgroundColor = '#00B4D8';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.color = '#061D38';
              }}
              aria-label="Previous Photo"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>

            {/* The Photo Itself */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 65px rgba(0,0,0,0.7)',
              backgroundColor: '#000000',
              maxHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={selectedEvent.gallery && selectedEvent.gallery.length > 0 && selectedEvent.gallery[currentPhotoIndex]?._type === 'image'
                  ? urlFor(activeGallery[currentPhotoIndex]).url() 
                  : (typeof activeGallery[currentPhotoIndex] === 'string' ? activeGallery[currentPhotoIndex] : (activeGallery[currentPhotoIndex]?.asset ? urlFor(activeGallery[currentPhotoIndex]).url() : galleryCollection[currentPhotoIndex % galleryCollection.length]))} 
                alt={`${selectedEvent.title} Photo`}
                style={{ 
                  maxWidth: '88vw', 
                  maxHeight: '78vh', 
                  objectFit: 'contain', 
                  display: 'block' 
                }}
              />
            </div>

            {/* Right Chevron Arrow (Next) */}
            <button 
              onClick={(e) => { e.stopPropagation(); nextPhoto(activeGallery.length); }}
              style={{
                position: 'absolute',
                right: '-26px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#061D38',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                zIndex: 50,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.backgroundColor = '#00B4D8';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.color = '#061D38';
              }}
              aria-label="Next Photo"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>

            {/* Photo Counter Label under image */}
            <div style={{
              marginTop: '12px',
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              {currentPhotoIndex + 1} of {activeGallery.length} • {selectedEvent.title}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Events;
