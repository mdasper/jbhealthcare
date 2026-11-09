import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, HeartPulse, ShieldPlus, Award, Users, Activity, CheckCircle, ChevronLeft, ChevronRight, Star, ExternalLink } from 'lucide-react';
import { client, urlFor } from '../sanity';
import TiltCard from '../components/TiltCard';

const slides = [
  {
    image: '/hospital_photos/hospital_building_exterior.jpg',
    position: 'center center',
    title: 'Your Health, Our Greatest Priority',
    subtitle: 'At JB Healthcare, we bring world-class medical excellence right to Sivakasi. From routine check-ups to complex procedures, we are dedicated to providing compassionate, holistic care that focuses on healing your body and mind in a warm, welcoming environment.'
  },
  {
    image: '/hospital_photos/surgical_team_perspective.jpg',
    title: 'Premier Centre for Advanced Laparoscopic Surgery',
    subtitle: 'Led by Dr. B. Saileshkumar (MBBS, MS, FIAGES, FALS), our surgical team delivers world-class minimally invasive keyhole procedures — minimal pain, zero ugly scars, and rapid same-day recovery.'
  },
  {
    image: '/hospital_photos/dr_sailesh_ot_team.jpg',
    title: '24/7 Expert Emergency Care',
    subtitle: 'Emergencies don\'t wait, and neither do we. Our multi-disciplinary team of highly experienced doctors, surgeons, and nurses are available round the clock, ensuring rapid, expert response whenever you need us most.'
  },
  {
    image: '/hospital_photos/dr_sailesh_xray_consultation.jpg',
    title: 'Specialists You Can Trust',
    subtitle: 'Our panel of distinguished visiting consultants and resident specialists brings together decades of expertise across Surgery, Medicine, Orthopaedics, ENT, and more — all under one roof for your convenience.'
  },
  {
    image: '/hospital_photos/hospital_lab_technician.jpg',
    position: 'center top',
    title: 'Accurate Diagnostics. Swift Results.',
    subtitle: 'Our fully automated laboratory and advanced diagnostic centre delivers fast, precise results — from routine blood work to complex pathology — enabling our doctors to make the right decisions for your health, faster.'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeData, setHomeData] = useState(null);
  const [featuredDepts, setFeaturedDepts] = useState([]);

  useEffect(() => {
    // Fetch data from Sanity
    client.fetch(`*[_type == "homePage"][0]`).then((data) => {
      setHomeData(data);
    }).catch(console.error);

    client.fetch(`*[_type == "service" && isFeaturedOnHome == true] | order(order asc)`).then((depts) => {
      if (Array.isArray(depts) && depts.length > 0) {
        setFeaturedDepts(depts);
      }
    }).catch(console.error);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Use Sanity slides if configured, otherwise fallback to verified local slides
  const sanitySliders = homeData?.heroSliders || homeData?.heroSlides;
  const displaySlides = (sanitySliders && sanitySliders.length > 0)
    ? sanitySliders.map((s, idx) => {
        let img = slides[idx % slides.length]?.image || slides[0].image;
        if (s.image) {
          try {
            img = urlFor(s.image).url();
          } catch (e) { /* fallback */ }
        }
        return {
          image: img,
          position: s.position || 'center center',
          title: s.title || slides[idx % slides.length]?.title || '',
          subtitle: s.subtitle || slides[idx % slides.length]?.subtitle || ''
        };
      })
    : slides;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? displaySlides.length - 1 : prev - 1));

  return (
    <div className="home-page page-transition">
      {/* Premium Hero Slider */}
      <section className="hero-slider">
        {displaySlides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              backgroundImage: `linear-gradient(135deg, rgba(4, 16, 32, 0.68) 0%, rgba(0, 90, 140, 0.55) 100%), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: slide.position || 'center'
            }}
          >
            <div className="container hero-slide-content" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle" style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.6', fontSize: '1.25rem' }}>{slide.subtitle}</p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '35px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/appointment" className="btn btn-magnetic" style={{ backgroundColor: '#00B4D8', color: '#FFFFFF', fontWeight: '700', padding: '14px 34px', borderRadius: '30px', boxShadow: '0 6px 20px rgba(0, 180, 216, 0.4)' }}>Book an Appointment</Link>
                {slide.title.includes('Laparoscopic') ? (
                  <Link to="/surgeries" className="btn btn-outline btn-magnetic" style={{ padding: '14px 34px', borderRadius: '30px', fontWeight: '700' }}>Explore Surgeries →</Link>
                ) : (
                  <Link to="/departments" className="btn btn-outline btn-magnetic" style={{ padding: '14px 34px', borderRadius: '30px', fontWeight: '700' }}>Our Departments</Link>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <button className="slider-nav prev" onClick={prevSlide}><ChevronLeft size={32}/></button>
        <button className="slider-nav next" onClick={nextSlide}><ChevronRight size={32}/></button>
        
        <div className="slider-indicators">
          {displaySlides.map((_, idx) => (
            <div 
              key={idx} 
              className={`indicator ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            ></div>
          ))}
        </div>
      </section>



      {/* Why Choose Us - Full Width Banner Style */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
        <div className="container">
          <div className="why-choose-us" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', textAlign: 'center' }}>
            {(homeData?.whyChooseUs && homeData.whyChooseUs.length > 0 ? homeData.whyChooseUs : [
              { icon: 'Award', title: 'Certified Experts', description: 'Highly qualified doctors and medical staff.' },
              { icon: 'Activity', title: 'Modern Technology', description: 'State-of-the-art facilities and equipment.' },
              { icon: 'ShieldPlus', title: '24/7 Support', description: 'Round-the-clock emergency services.' },
              { icon: 'Users', title: 'Patient-Centric Care', description: 'Personalized treatment plans and emotional support.' },
              { icon: 'CheckCircle', title: 'Strict Hygiene', description: '100% adherence to international safety protocols.' }
            ]).map((wcu, idx) => {
              const renderIcon = () => {
                switch(wcu.icon) {
                  case 'Award': return <Award size={48} style={{ color: '#061D38', marginBottom: '15px' }} />;
                  case 'Activity': return <Activity size={48} style={{ color: '#061D38', marginBottom: '15px' }} />;
                  case 'ShieldPlus': return <ShieldPlus size={48} style={{ color: '#061D38', marginBottom: '15px' }} />;
                  case 'Users': return <Users size={48} style={{ color: '#061D38', marginBottom: '15px' }} />;
                  default: return <CheckCircle size={48} style={{ color: '#061D38', marginBottom: '15px' }} />;
                }
              };
              return (
                <div key={wcu._key || idx} data-aos="fade-up" data-aos-delay={(idx + 1) * 100}>
                  {renderIcon()}
                  <h3 style={{ color: '#061D38', fontWeight: '800' }}>{wcu.title}</h3>
                  <p style={{ color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>{wcu.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Services Snapshot */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">
            <h4 style={{ color: '#061D38', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontWeight: '800' }}>Excellence in Healthcare</h4>
            <h2 className="section-title" style={{ margin: 0 }}>Top Departments & Surgeries</h2>
          </div>
          <div className="top-departments-2x2">
            {featuredDepts && featuredDepts.length > 0 ? (
              featuredDepts.map((dept, index) => {
                const getIcon = () => {
                  const t = (dept.title || '').toLowerCase();
                  if (t.includes('laparo') || t.includes('surger')) return <Activity size={28} color="#38BDF8" />;
                  if (t.includes('casualty') || t.includes('emergency') || t.includes('trauma')) return <ShieldPlus size={28} color="#38BDF8" />;
                  if (t.includes('diag') || t.includes('lab') || t.includes('blood') || t.includes('ecg')) return <HeartPulse size={28} color="#38BDF8" />;
                  return <Stethoscope size={28} color="#38BDF8" />;
                };

                const getLink = () => {
                  const t = (dept.title || '').toLowerCase();
                  if (t.includes('laparo') || t.includes('surger')) return '/surgeries';
                  if (t.includes('casualty') || t.includes('emergency') || t.includes('lab') || t.includes('diag')) return '/facilities';
                  return '/doctors';
                };

                const getLinkText = () => {
                  const t = (dept.title || '').toLowerCase();
                  if (t.includes('laparo') || t.includes('surger')) return 'View Surgeries →';
                  if (t.includes('casualty') || t.includes('emergency')) return 'View Facilities →';
                  if (t.includes('diag') || t.includes('lab')) return 'Lab Details →';
                  return 'View Doctors →';
                };

                return (
                  <TiltCard 
                    key={dept._id || index}
                    className="service-card department-tile" 
                    maxTilt={5} 
                    scale={1.02} 
                    glareColor="rgba(0, 180, 216, 0.25)"
                    data-aos="zoom-in" 
                    data-aos-delay={(index + 1) * 100}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.15)' }}>
                          {getIcon()}
                        </div>
                        <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '5px 14px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                          {dept.tamilTitle || dept.badge || '✨ சிறப்பு பிரிவு'}
                        </span>
                      </div>
                      <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left', fontWeight: '800' }}>{dept.title}</h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px', fontWeight: '400' }}>
                        {dept.description}
                      </p>
                      {dept.keyProcedures && Array.isArray(dept.keyProcedures) && dept.keyProcedures.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                          {dept.keyProcedures.slice(0, 4).map((proc, pIdx) => (
                            <span key={pIdx} className="dept-pill">{proc}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '10px' }}>
                      <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={15} color="#38BDF8" /> {dept.badge || 'Excellence in Care'}
                      </span>
                      <Link to={getLink()} style={{ color: '#FFFFFF', backgroundColor: '#00B4D8', padding: '7px 18px', borderRadius: '18px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)', transition: 'all 0.2s ease' }}>
                        {getLinkText()}
                      </Link>
                    </div>
                  </TiltCard>
                );
              })
            ) : (
              <>
                {/* Fallback 4 Cards */}
                <TiltCard className="service-card department-tile" maxTilt={5} scale={1.02} glareColor="rgba(0, 180, 216, 0.25)" data-aos="zoom-in" data-aos-delay="100">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.15)' }}>
                        <Activity size={28} color="#38BDF8" />
                      </div>
                      <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '5px 14px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                        🔬 லேப்ராஸ்கோபிக் அறுவை சிகிச்சை
                      </span>
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left', fontWeight: '800' }}>Laparoscopic Surgery</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px', fontWeight: '400' }}>
                      Minimally invasive keyhole surgery center of excellence led by Dr. B. Saileshkumar (2,000+ surgeries) with minimal pain, no scars, and faster discharge.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      <span className="dept-pill">கருப்பை நீக்கம் (Hysterectomy)</span>
                      <span className="dept-pill">குடல்வால் & பித்தப்பை (Appendix & Gallbladder)</span>
                      <span className="dept-pill">குடல் இறக்கம் (Hernia Repair)</span>
                      <span className="dept-pill">நீர்க்கட்டி & F.P (Cyst & Sterilization)</span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={15} color="#38BDF8" /> 2,000+ Laparoscopies
                    </span>
                    <Link to="/surgeries" style={{ color: '#FFFFFF', backgroundColor: '#00B4D8', padding: '7px 18px', borderRadius: '18px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)', transition: 'all 0.2s ease' }}>
                      View Surgeries →
                    </Link>
                  </div>
                </TiltCard>

                <TiltCard className="service-card department-tile" maxTilt={5} scale={1.02} glareColor="rgba(0, 180, 216, 0.25)" data-aos="zoom-in" data-aos-delay="200">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.15)' }}>
                        <ShieldPlus size={28} color="#38BDF8" />
                      </div>
                      <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '5px 14px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                        🚨 அவசர சிகிச்சை & நவீன OT
                      </span>
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left', fontWeight: '800' }}>24/7 Emergency & OT</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px', fontWeight: '400' }}>
                      Round-the-clock emergency casualty, rapid trauma response, and highly skilled on-call surgical teams ready 24 hours a day.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      <span className="dept-pill">24/7 அவசர சிகிச்சை (Casualty Care)</span>
                      <span className="dept-pill">அவசர முதலுதவி (Immediate Trauma Care)</span>
                      <span className="dept-pill">விரைவு அறுவை ஆதரவு (24/7 Surgical Team)</span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={15} color="#38BDF8" /> 24/7 Emergency Care
                    </span>
                    <Link to="/facilities" style={{ color: '#FFFFFF', backgroundColor: '#00B4D8', padding: '7px 18px', borderRadius: '18px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)', transition: 'all 0.2s ease' }}>
                      View Facilities →
                    </Link>
                  </div>
                </TiltCard>

                <TiltCard className="service-card department-tile" maxTilt={5} scale={1.02} glareColor="rgba(0, 180, 216, 0.25)" data-aos="zoom-in" data-aos-delay="300">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.15)' }}>
                        <HeartPulse size={28} color="#38BDF8" />
                      </div>
                      <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '5px 14px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                        ⚡ விரைவு பரிசோதனை & ECG
                      </span>
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left', fontWeight: '800' }}>Rapid Diagnostics & ECG</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px', fontWeight: '400' }}>
                      In-house computerized diagnostic laboratory and Digital ECG providing rapid, accurate blood and biochemistry reports.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      <span className="dept-pill">24 மணி நேர ஆய்வகம் (Automated Lab)</span>
                      <span className="dept-pill">டிஜிட்டல் ECG (3-Lead Digital ECG)</span>
                      <span className="dept-pill">ரத்த பரிசோதனைகள் (Biochemistry)</span>
                      <span className="dept-pill">விரைவு முடிவுகள் (Same-Day Reports)</span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={15} color="#38BDF8" /> 24 Hours Automated Lab
                    </span>
                    <Link to="/facilities" style={{ color: '#FFFFFF', backgroundColor: '#00B4D8', padding: '7px 18px', borderRadius: '18px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)', transition: 'all 0.2s ease' }}>
                      Lab Details →
                    </Link>
                  </div>
                </TiltCard>

                <TiltCard className="service-card department-tile" maxTilt={5} scale={1.02} glareColor="rgba(0, 180, 216, 0.25)" data-aos="zoom-in" data-aos-delay="400">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.15)' }}>
                        <Stethoscope size={28} color="#38BDF8" />
                      </div>
                      <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '5px 14px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                        🌟 சிறப்பு மருத்துவர்கள் வருகை
                      </span>
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left', fontWeight: '800' }}>Visiting Specialists</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px', fontWeight: '400' }}>
                      Regular consultations and specialized surgeries by 12 renowned super-specialists across Cancer, Gastro, Plastic, Urology, Ortho & Paediatrics.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      <span className="dept-pill">12 சிறப்பு மருத்துவர்கள் (Specialists)</span>
                      <span className="dept-pill">புற்றுநோய் & குடல் (Cancer & GI Care)</span>
                      <span className="dept-pill">ஒட்டுறுப்பு & குழந்தை (Plastic & Child)</span>
                      <span className="dept-pill">சிறுநீரகம் & எலும்பு (Urology & Ortho)</span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={15} color="#38BDF8" /> 12 Active Specialists
                    </span>
                    <Link to="/doctors" style={{ color: '#FFFFFF', backgroundColor: '#00B4D8', padding: '7px 18px', borderRadius: '18px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)', transition: 'all 0.2s ease' }}>
                      View All Doctors →
                    </Link>
                  </div>
                </TiltCard>
              </>
            )}
          </div>
          <div className="text-center" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '50px', flexWrap: 'wrap' }}>
            <Link to="/doctors" className="btn btn-magnetic" style={{ backgroundColor: '#061D38', color: '#FFFFFF', fontWeight: '700', padding: '12px 30px', borderRadius: '25px' }}>Specialist Doctors</Link>
            <Link to="/surgeries" className="btn btn-primary btn-magnetic" style={{ fontWeight: '700', padding: '12px 30px', borderRadius: '25px', backgroundColor: '#00B4D8', borderColor: '#00B4D8', color: '#FFFFFF' }}>Laparoscopic Surgeries</Link>
            <Link to="/departments" className="btn btn-outline btn-magnetic" style={{ borderColor: '#061D38', color: '#061D38', fontWeight: '700', padding: '12px 30px', borderRadius: '25px' }}>All Departments</Link>
          </div>
        </div>
      </section>


      {/* Doctor Message */}
      <section className="section doctor-message" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="doctor-image" data-aos="fade-right">
            <img 
              src={homeData?.doctorSaileshProfile?.image ? urlFor(homeData.doctorSaileshProfile.image).url() : "/doctor.png"} 
              alt={homeData?.doctorSaileshProfile?.name || "Dr. B. Saileshkumar"} 
              onError={(e) => { e.target.src = '/doctor.png'; }} 
            />
          </div>
          <div className="doctor-content" data-aos="fade-left">
            <div style={{ display: 'inline-block', backgroundColor: '#061D38', color: '#FFFFFF', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              {homeData?.doctorSaileshProfile?.tag || "Founder & Chief Surgeon"}
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#FFFFFF', fontWeight: '800' }}>
              {homeData?.doctorSaileshProfile?.name || "Dr. B. Saileshkumar"}
            </h2>
            <h4 style={{ color: '#061D38', fontSize: '1.18rem', fontWeight: '800', marginBottom: '15px' }}>
              {homeData?.doctorSaileshProfile?.degree || "MBBS., M.S., FIAGES., FALS (Laparoscopic & General Surgeon)"}
            </h4>
            
            <div className="quote" style={{ marginBottom: '18px', fontSize: '1.05rem', lineHeight: '1.6', color: '#FFFFFF', fontStyle: 'italic' }}>
              {homeData?.doctorSaileshProfile?.quote || "\"Healing Hands, Caring Hearts — Healing is not just about prescribing medicines; it's about listening to our patients, understanding their pain, and guiding them towards a healthier, happier life.\""}
            </div>
            
            {/* Highlights from Hospital Banner - High-contrast Deep Navy cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '22px' }}>
              {(homeData?.doctorSaileshProfile?.stats && homeData.doctorSaileshProfile.stats.length > 0 ? homeData.doctorSaileshProfile.stats : [
                { _key: 's1', number: '10,000+', label: 'Successful Surgeries' },
                { _key: 's2', number: '2,000+', label: 'Laparoscopic Surgeries' },
                { _key: 's3', number: 'Best Doctor Award', label: '2017 & 2018 (Collector)' }
              ]).map((st, sIdx) => (
                <div key={st._key || sIdx} style={{ backgroundColor: '#061D38', padding: '12px 16px', borderRadius: '12px', borderLeft: '4px solid #38BDF8', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>
                  <span style={{ fontSize: st.number && st.number.length > 10 ? '1.15rem' : '1.35rem', fontWeight: '800', color: '#38BDF8', display: 'block', lineHeight: '1.3', marginBottom: '2px' }}>{st.number}</span>
                  <span style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: '600' }}>{st.label}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ color: '#061D38', fontSize: '1.18rem', fontWeight: '800', marginBottom: '6px' }}>
                {homeData?.doctorSaileshProfile?.credentialsHeading || "Medical Journey & Credentials"}
              </h3>
              <p style={{ color: '#FFFFFF', lineHeight: '1.65', fontSize: '0.95rem', margin: 0, fontWeight: '500' }}>
                {homeData?.doctorSaileshProfile?.bio || "Alumnus of Madras Medical College (MBBS) & Madurai Medical College (MS). Advanced Laparoscopic training from VG Hospital Coimbatore, with prestigious FIAGES / FALS Fellowships. Over 7 years of dedicated government medical service across Virudhunagar district and Secretary of IMA Sivakasi (2016-2017)."}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '18px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-accent" style={{ padding: '12px 26px', fontSize: '0.95rem', fontWeight: '700', backgroundColor: '#061D38', color: '#FFFFFF', border: 'none' }}>Full Profile & Achievements</Link>
              <Link to="/appointment" className="btn btn-outline" style={{ padding: '12px 26px', fontSize: '0.95rem', fontWeight: '700', borderColor: '#FFFFFF', color: '#FFFFFF' }}>Book Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Founder & Managing Director Section - Content Left, Image Right */}
      <section className="section cofounder-message" style={{ overflow: 'hidden', backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '2px solid rgba(255, 255, 255, 0.22)' }}>
        <div className="container cofounder-container">
          
          {/* Content on the Left */}
          <div className="doctor-content" data-aos="fade-right">
            <div style={{ display: 'inline-block', backgroundColor: '#061D38', color: '#FFFFFF', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              {homeData?.suganyaProfile?.tag || "Co-Founder & Managing Director"}
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#FFFFFF', fontWeight: '800' }}>
              {homeData?.suganyaProfile?.name || "V. Suganya Sailesh"}
            </h2>
            <h4 style={{ color: '#061D38', fontSize: '1.18rem', fontWeight: '800', marginBottom: '15px' }}>
              {homeData?.suganyaProfile?.degree || "B.Tech (IT) — Thiagarajar College of Engineering"}
            </h4>
            
            <div className="quote" style={{ marginBottom: '18px', fontSize: '1.05rem', lineHeight: '1.6', color: '#FFFFFF', fontStyle: 'italic' }}>
              {homeData?.suganyaProfile?.quote || "\"Fostering a welcoming, patient-focused environment where every individual and family feels respected, cared for, and truly supported.\""}
            </div>
            
            {/* Highlights Pillars - Matching Founder's Dark Navy Cards */}
            <div className="cofounder-badges-grid">
              {(homeData?.suganyaProfile?.pillars && homeData.suganyaProfile.pillars.length > 0 ? homeData.suganyaProfile.pillars : [
                { _key: 'p1', title: 'B.Tech (IT)', subtitle: 'Thiagarajar College of Engg' },
                { _key: 'p2', title: 'Hospital Administration', subtitle: 'Leadership & Operations' },
                { _key: 'p3', title: 'Certified Life Coach', subtitle: 'Parenting & Wellbeing Mentor' }
              ]).map((pil, pIdx) => (
                <div key={pil._key || pIdx} style={{ backgroundColor: '#061D38', padding: '12px 10px', borderRadius: '12px', borderLeft: '4px solid #38BDF8', boxShadow: '0 6px 18px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '70px' }}>
                  <span style={{ fontSize: 'clamp(0.8rem, 0.9vw, 0.95rem)', fontWeight: '800', color: '#38BDF8', display: 'block', lineHeight: '1.25', whiteSpace: 'nowrap', marginBottom: '3px' }}>{pil.title}</span>
                  <span style={{ fontSize: 'clamp(0.68rem, 0.76vw, 0.76rem)', color: '#FFFFFF', fontWeight: '600', whiteSpace: 'nowrap', display: 'block', lineHeight: '1.2' }}>{pil.subtitle}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(homeData?.suganyaProfile?.bioParagraphs && homeData.suganyaProfile.bioParagraphs.length > 0 ? homeData.suganyaProfile.bioParagraphs : [
                "Suganya Sailesh is an engineering graduate with a strong professional background and extensive experience in the corporate sector. As Co-founder and Managing Director, she plays an active role in the leadership, administration, and ongoing development of the hospital.",
                "Her background in engineering and corporate work brings a structured, organized, and problem-solving approach to hospital management. She is also a Certified Parenting Coach and Certified Life Coach, with a strong interest in communication, wellbeing, and supportive relationships.",
                "Beyond her hospital responsibilities, she is committed to strengthening healthcare services and passionate about building supportive communities that encourage healthier lifestyles, personal growth, and mutual wellbeing."
              ]).map((para, paraIdx) => (
                <p key={paraIdx} style={{ color: '#FFFFFF', lineHeight: '1.65', fontSize: '0.95rem', margin: 0, fontWeight: '500' }}>
                  {para}
                </p>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '18px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-accent" style={{ padding: '12px 26px', fontSize: '0.95rem', fontWeight: '700', backgroundColor: '#061D38', color: '#FFFFFF', border: 'none' }}>About Hospital Leadership</Link>
              <Link to="/contact" className="btn btn-outline" style={{ padding: '12px 26px', fontSize: '0.95rem', fontWeight: '700', borderColor: '#FFFFFF', color: '#FFFFFF' }}>Contact Administration</Link>
            </div>
          </div>

          {/* Image on the Right - Perfect Square matching Founder */}
          <div className="doctor-image" data-aos="fade-left" style={{ maxWidth: '460px', width: '100%', alignSelf: 'center', margin: '0 auto' }}>
            <img 
              src={homeData?.suganyaProfile?.image ? urlFor(homeData.suganyaProfile.image).url() : "/cofounder.png"} 
              alt={homeData?.suganyaProfile?.name || "V. Suganya Sailesh - Co-founder & Managing Director"} 
              onError={(e) => { 
                e.target.src = '/cofounder.png'; 
              }} 
              style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '12px', display: 'block', objectFit: 'cover', objectPosition: 'top center', boxShadow: '0 10px 30px rgba(0,0,0,0.22)' }}
            />
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '45px' }} data-aos="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', color: '#061D38', padding: '6px 18px', borderRadius: '20px', fontWeight: '800', fontSize: '0.88rem', marginBottom: '12px' }}>
              <Star size={16} fill="#F59E0B" color="#F59E0B" /> Google Reviews • 4.9 ★ (97+ Ratings)
            </div>
            <h2 className="section-title" style={{ margin: '0 0 10px 0' }}>What Our Patients Say</h2>
            <p style={{ color: '#555', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Real patient feedback & surgical recovery experiences shared on Google Reviews.
            </p>
          </div>

          {/* 6 Luxury Dark Blue Tiles Grid (3x2) Matching Top Departments Style */}
          <div className="testimonials-luxury-grid">

            {/* Review 1 */}
            <div 
              key={0}
              className="testimonial-dark-tile" 
              data-aos="zoom-in" 
              data-aos-delay="100"
              style={{
                background: 'linear-gradient(145deg, #07192d 0%, #0b243d 100%)',
                color: '#FFFFFF',
                border: '1px solid rgba(0, 180, 216, 0.28)',
                borderTop: '4px solid #00B4D8',
                borderRadius: '18px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 35px rgba(7, 25, 45, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '4px 12px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                    Google Review
                  </span>
                </div>

                <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '8px', textAlign: 'left', fontWeight: '800' }}>
                  Ramesh Kumar
                </h3>

                <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.93rem', lineHeight: '1.65', textAlign: 'left', marginBottom: '16px', fontWeight: '400', fontStyle: 'italic' }}>
                  "My wife laparoscopic cholecystectomy surgery successfully done. Best Hospital for Surgery & Patient Care! Doctor patient-a purinjikittu romba clear-a explain panninaaru, very polite and caring. Highly recommended!"
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>பித்தப்பை அறுவை (Cholecystectomy)</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Patient-Centric Care</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Fast Recovery</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle size={14} color="#38BDF8" /> Google Verified
                </span>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', fontWeight: '500' }}>
                  Surgery Patient Family
                </span>
              </div>
            </div>

            {/* Review 2 */}
            <div 
              key={1}
              className="testimonial-dark-tile" 
              data-aos="zoom-in" 
              data-aos-delay="200"
              style={{
                background: 'linear-gradient(145deg, #07192d 0%, #0b243d 100%)',
                color: '#FFFFFF',
                border: '1px solid rgba(0, 180, 216, 0.28)',
                borderTop: '4px solid #00B4D8',
                borderRadius: '18px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 35px rgba(7, 25, 45, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '4px 12px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                    Local Guide
                  </span>
                </div>

                <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '8px', textAlign: 'left', fontWeight: '800' }}>
                  M Sathish
                </h3>

                <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.93rem', lineHeight: '1.65', textAlign: 'left', marginBottom: '16px', fontWeight: '400', fontStyle: 'italic' }}>
                  "The service provided was excellent. The doctor was very polite, and my wife's hernia surgery was successful. The staff was warm, friendly, and provided great service. I was very satisfied with the outcome."
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>குடல் இறக்கம் (Hernia Surgery)</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Warm Nursing Staff</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Successful Outcome</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle size={14} color="#38BDF8" /> Google Verified
                </span>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', fontWeight: '500' }}>
                  Local Guide • 11 Reviews
                </span>
              </div>
            </div>

            {/* Review 3 */}
            <div 
              key={2}
              className="testimonial-dark-tile" 
              data-aos="zoom-in" 
              data-aos-delay="300"
              style={{
                background: 'linear-gradient(145deg, #07192d 0%, #0b243d 100%)',
                color: '#FFFFFF',
                border: '1px solid rgba(0, 180, 216, 0.28)',
                borderTop: '4px solid #00B4D8',
                borderRadius: '18px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 35px rgba(7, 25, 45, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '4px 12px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                    Google Review
                  </span>
                </div>

                <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '8px', textAlign: 'left', fontWeight: '800' }}>
                  Ayyanar Bharathi
                </h3>

                <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.93rem', lineHeight: '1.65', textAlign: 'left', marginBottom: '16px', fontWeight: '400', fontStyle: 'italic' }}>
                  "Excellent hospital with highly experienced doctors and a very supportive staff. The patient care is phenomenal, and they maintain great hygiene. Highly recommended for, both, OPD and inpatient services."
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>அனுபவம் வாய்ந்த மருத்துவர்</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>100% Hygiene Standard</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>OPD & Inpatient</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle size={14} color="#38BDF8" /> Google Verified
                </span>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', fontWeight: '500' }}>
                  Inpatient & OPD Patient
                </span>
              </div>
            </div>

            {/* Review 4 */}
            <div 
              key={3}
              className="testimonial-dark-tile" 
              data-aos="zoom-in" 
              data-aos-delay="100"
              style={{
                background: 'linear-gradient(145deg, #07192d 0%, #0b243d 100%)',
                color: '#FFFFFF',
                border: '1px solid rgba(0, 180, 216, 0.28)',
                borderTop: '4px solid #00B4D8',
                borderRadius: '18px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 35px rgba(7, 25, 45, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '4px 12px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                    Google Review
                  </span>
                </div>

                <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '8px', textAlign: 'left', fontWeight: '800' }}>
                  KSR Traders
                </h3>

                <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.93rem', lineHeight: '1.65', textAlign: 'left', marginBottom: '16px', fontWeight: '400', fontStyle: 'italic' }}>
                  "My dad underwent laparoscopic surgery at JB Health Care, and we had a very good experience. The doctors and staff took good care of him, and the nursing care was excellent. Supportive, attentive, and helpful throughout the stay."
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>லேப்ராஸ்கோபிக் அறுவை</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Attentive Nursing</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>No-Tip Ethics Policy</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle size={14} color="#38BDF8" /> Google Verified
                </span>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', fontWeight: '500' }}>
                  Laparoscopy Patient Family
                </span>
              </div>
            </div>

            {/* Review 5 */}
            <div 
              key={4}
              className="testimonial-dark-tile" 
              data-aos="zoom-in" 
              data-aos-delay="200"
              style={{
                background: 'linear-gradient(145deg, #07192d 0%, #0b243d 100%)',
                color: '#FFFFFF',
                border: '1px solid rgba(0, 180, 216, 0.28)',
                borderTop: '4px solid #00B4D8',
                borderRadius: '18px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 35px rgba(7, 25, 45, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '4px 12px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                    Google Review
                  </span>
                </div>

                <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '8px', textAlign: 'left', fontWeight: '800' }}>
                  Sugu Keerthana
                </h3>

                <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.93rem', lineHeight: '1.65', textAlign: 'left', marginBottom: '16px', fontWeight: '400', fontStyle: 'italic' }}>
                  "My husband came here for hernia operation. Good in service and good maintenance, kind and caring doctor, nurses and staff. Excellent support throughout surgery and recovery. Thank you JB Healthcare!"
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>அறுவை சிகிச்சை (Hernia)</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Caring & Kind Doctor</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Smooth Recovery</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle size={14} color="#38BDF8" /> Google Verified
                </span>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', fontWeight: '500' }}>
                  Surgical Patient Family
                </span>
              </div>
            </div>

            {/* Review 6 */}
            <div 
              key={5}
              className="testimonial-dark-tile" 
              data-aos="zoom-in" 
              data-aos-delay="300"
              style={{
                background: 'linear-gradient(145deg, #07192d 0%, #0b243d 100%)',
                color: '#FFFFFF',
                border: '1px solid rgba(0, 180, 216, 0.28)',
                borderTop: '4px solid #00B4D8',
                borderRadius: '18px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 35px rgba(7, 25, 45, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '4px 12px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                    Google Review
                  </span>
                </div>

                <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '8px', textAlign: 'left', fontWeight: '800' }}>
                  Karthik Raj
                </h3>

                <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.93rem', lineHeight: '1.65', textAlign: 'left', marginBottom: '16px', fontWeight: '400', fontStyle: 'italic' }}>
                  "One of the finest surgical centres in Sivakasi. Dr. Saileshkumar explains diagnosis with extreme clarity and patience. Modern facilities, 24/7 caring staff, and very neat atmosphere. Highly recommended!"
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>நவீன மருத்துவ வசதிகள்</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Clear Doctor Guidance</span>
                  <span className="dept-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>24/7 Emergency Care</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle size={14} color="#38BDF8" /> Google Verified
                </span>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', fontWeight: '500' }}>
                  Consultation & Surgery
                </span>
              </div>
            </div>
          </div>

          {/* Google Link Button */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a 
              href="https://share.google/LOK24CIH3ltNIHaN3" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#061D38',
                color: '#FFFFFF',
                fontWeight: '700',
                padding: '12px 28px',
                borderRadius: '25px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(6, 29, 56, 0.25)',
                transition: 'all 0.25s ease'
              }}
            >
              <span>View All 97+ Google Reviews</span>
              <ExternalLink size={16} color="#00B4D8" />
            </a>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={{ backgroundColor: '#071A2E', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginBottom: '12px' }}>
            {homeData?.consultationCTA?.heading || "Need a Medical Consultation?"}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 30px' }}>
            {homeData?.consultationCTA?.subheading || "Our specialists are ready to provide you with the best healthcare."}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn btn-accent btn-magnetic" style={{ padding: '14px 35px', borderRadius: '30px', fontWeight: '700', backgroundColor: '#00B4D8', color: '#061D38', border: 'none' }}>
              {homeData?.consultationCTA?.buttonText || "Book Appointment"}
            </Link>
            <a href={`tel:${(homeData?.consultationCTA?.phone || '+91 93455 10905').replace(/\s+/g, '')}`} className="btn btn-outline btn-magnetic" style={{ padding: '14px 35px', borderRadius: '30px', fontWeight: '700', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              Emergency Call: {homeData?.consultationCTA?.phone || "+91 93455 10905"}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .testimonials-luxury-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
        }
        @media (max-width: 1024px) {
          .testimonials-luxury-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 680px) {
          .testimonials-luxury-grid {
            grid-template-columns: 1fr;
          }
        }
        .testimonial-dark-tile:hover {
          transform: translateY(-6px) !important;
          border-color: #00B4D8 !important;
          box-shadow: 0 20px 45px rgba(7, 25, 45, 0.5), 0 0 25px rgba(0, 180, 216, 0.25) !important;
        }
    
        .top-departments-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }
        @media (max-width: 900px) {
          .top-departments-2x2 {
            grid-template-columns: 1fr;
          }
        }
        .department-tile {
          background: linear-gradient(145deg, #07192d 0%, #0b243d 100%) !important;
          color: #FFFFFF !important;
          border: 1px solid rgba(0, 180, 216, 0.28) !important;
          border-top: 4px solid #00B4D8 !important;
          border-radius: 18px !important;
          padding: 32px 28px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          box-shadow: 0 12px 35px rgba(7, 25, 45, 0.25) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .department-tile:hover {
          transform: translateY(-6px) !important;
          border-color: #00B4D8 !important;
          box-shadow: 0 20px 45px rgba(7, 25, 45, 0.5), 0 0 25px rgba(0, 180, 216, 0.25) !important;
        }
        .dept-pill {
          font-size: 0.8rem;
          background-color: rgba(255, 255, 255, 0.07);
          color: #E0F2FE;
          padding: 5px 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 180, 216, 0.25);
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .dept-pill:hover {
          background-color: rgba(0, 180, 216, 0.2);
          border-color: #00B4D8;
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
};

export default Home;
