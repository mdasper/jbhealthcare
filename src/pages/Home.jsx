import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, HeartPulse, ShieldPlus, Award, Users, Activity, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { client, urlFor } from '../sanity';
import TiltCard from '../components/TiltCard';

const slides = [
  {
    image: '/hero_welcome.jpg',
    title: 'Your Health, Our Greatest Priority',
    subtitle: 'At JB Healthcare, we bring world-class medical excellence right to Anaiyur. From routine check-ups to complex procedures, we are dedicated to providing compassionate, holistic care that focuses on healing your body and mind in a warm, welcoming environment.'
  },
  {
    image: '/hero_surgery.jpg',
    title: 'Premier Centre for Advanced Laparoscopic Surgery',
    subtitle: 'Led by Dr. B. Saileshkumar (MBBS, MS, FIAGES, FALS), our surgical team delivers world-class minimally invasive procedures — shorter hospital stays, faster recovery, and outstanding outcomes for every patient.'
  },
  {
    image: '/hero_emergency.jpg',
    title: '24/7 Expert Emergency Care',
    subtitle: 'Emergencies don\'t wait, and neither do we. Our multi-disciplinary team of highly experienced doctors, surgeons, and nurses are available round the clock, ensuring rapid, expert response whenever you need us most.'
  },
  {
    image: '/hero_doctors.jpg',
    title: 'Specialists You Can Trust',
    subtitle: 'Our panel of distinguished visiting consultants and resident specialists brings together decades of expertise across Surgery, Medicine, Orthopaedics, Ophthalmology, ENT, and more — all under one roof for your convenience.'
  },
  {
    image: '/hero_diagnostics.jpg',
    title: 'Accurate Diagnostics. Swift Results.',
    subtitle: 'Our fully automated laboratory and advanced diagnostic centre delivers fast, precise results — from routine blood work to complex pathology — enabling our doctors to make the right decisions for your health, faster.'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    // Fetch data from Sanity
    client.fetch(`*[_type == "homePage"][0]`).then((data) => {
      setHomeData(data);
    }).catch(console.error);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Use Sanity data if available, otherwise fallback to default slides
  const displaySlides = homeData?.heroSliders?.length > 0 ? homeData.heroSliders.map((slide, index) => ({
    title: slide.title,
    subtitle: slide.subtitle,
    image: slide.image ? urlFor(slide.image).url() : slides[index % slides.length].image
  })) : slides;

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
              backgroundPosition: 'center'
            }}
          >
            <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle" style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.6', fontSize: '1.25rem' }}>{slide.subtitle}</p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '60px' }}>
                <Link to="/appointment" className="btn btn-magnetic" style={{ backgroundColor: '#00B4D8', color: '#FFFFFF', fontWeight: '700', padding: '14px 34px', borderRadius: '30px', boxShadow: '0 6px 20px rgba(0, 180, 216, 0.4)' }}>Book an Appointment</Link>
                <Link to="/departments" className="btn btn-outline btn-magnetic" style={{ padding: '14px 34px', borderRadius: '30px', fontWeight: '700' }}>Our Departments</Link>
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
            <div data-aos="fade-up" data-aos-delay="100">
              <Award size={48} style={{ color: '#061D38', marginBottom: '15px' }} />
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>Certified Experts</h3>
              <p style={{ color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>Highly qualified doctors and medical staff.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <Activity size={48} style={{ color: '#061D38', marginBottom: '15px' }} />
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>Modern Technology</h3>
              <p style={{ color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>State-of-the-art facilities and equipment.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <ShieldPlus size={48} style={{ color: '#061D38', marginBottom: '15px' }} />
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>24/7 Support</h3>
              <p style={{ color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>Round-the-clock emergency services.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <Users size={48} style={{ color: '#061D38', marginBottom: '15px' }} />
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>Patient-Centric Care</h3>
              <p style={{ color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>Personalized treatment plans and emotional support.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="500">
              <CheckCircle size={48} style={{ color: '#061D38', marginBottom: '15px' }} />
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>Strict Hygiene</h3>
              <p style={{ color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>100% adherence to international safety protocols.</p>
            </div>
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
            
            {/* Card 1: Laparoscopic Surgery */}
            <TiltCard 
              className="service-card department-tile" 
              maxTilt={5} 
              scale={1.02} 
              glareColor="rgba(0, 180, 216, 0.25)"
              data-aos="zoom-in" 
              data-aos-delay="100"
            >
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

            {/* Card 2: 24/7 Emergency & OT */}
            <TiltCard 
              className="service-card department-tile" 
              maxTilt={5} 
              scale={1.02} 
              glareColor="rgba(0, 180, 216, 0.25)"
              data-aos="zoom-in" 
              data-aos-delay="200"
            >
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
                  Round-the-clock emergency casualty, rapid trauma response, advanced sterile modular operation theatres, and highly skilled on-call surgical teams ready 24 hours a day.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  <span className="dept-pill">24/7 அவசர சிகிச்சை (Casualty Care)</span>
                  <span className="dept-pill">நவீன அறுவை அரங்கு (Modular OT)</span>
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

            {/* Card 3: Rapid Diagnostics & ECG */}
            <TiltCard 
              className="service-card department-tile" 
              maxTilt={5} 
              scale={1.02} 
              glareColor="rgba(0, 180, 216, 0.25)"
              data-aos="zoom-in" 
              data-aos-delay="300"
            >
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
                  In-house computerized diagnostic laboratory and computerized digital cardiac monitoring providing rapid, accurate blood and biochemistry reports.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  <span className="dept-pill">24 மணி நேர ஆய்வகம் (Automated Lab)</span>
                  <span className="dept-pill">டிஜிட்டல் ECG (12-Lead Digital ECG)</span>
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

            {/* Card 4: Visiting Super-Specialists */}
            <TiltCard 
              className="service-card department-tile" 
              maxTilt={5} 
              scale={1.02} 
              glareColor="rgba(0, 180, 216, 0.25)"
              data-aos="zoom-in" 
              data-aos-delay="400"
            >
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
                  Regular consultations and specialized surgeries by 12 renowned super-specialists across Cancer, Gastro, Plastic, Urology, Ortho & Maternity.
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
            <img src="/doctor.png" alt="Dr. B. Saileshkumar" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1612349317150-e410f624c400?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }} />
          </div>
          <div className="doctor-content" data-aos="fade-left">
            <div style={{ display: 'inline-block', backgroundColor: '#061D38', color: '#FFFFFF', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Founder & Chief Surgeon
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#FFFFFF', fontWeight: '800' }}>Dr. B. Saileshkumar</h2>
            <h4 style={{ color: '#061D38', fontSize: '1.18rem', fontWeight: '800', marginBottom: '15px' }}>
              MBBS., M.S., FIAGES., FALS (Laparoscopic & General Surgeon)
            </h4>
            
            <div className="quote" style={{ marginBottom: '18px', fontSize: '1.05rem', lineHeight: '1.6', color: '#FFFFFF', fontStyle: 'italic' }}>
              "Healing Hands, Caring Hearts — Healing is not just about prescribing medicines; it's about listening to our patients, understanding their pain, and guiding them towards a healthier, happier life."
            </div>
            
            {/* Highlights from Hospital Banner - High-contrast Deep Navy cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '22px' }}>
              <div style={{ backgroundColor: '#061D38', padding: '12px 16px', borderRadius: '12px', borderLeft: '4px solid #38BDF8', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: '800', color: '#38BDF8', display: 'block' }}>10,000+</span>
                <span style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: '600' }}>Successful Surgeries</span>
              </div>
              <div style={{ backgroundColor: '#061D38', padding: '12px 16px', borderRadius: '12px', borderLeft: '4px solid #38BDF8', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: '800', color: '#38BDF8', display: 'block' }}>2,000+</span>
                <span style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: '600' }}>Laparoscopic Surgeries</span>
              </div>
              <div style={{ backgroundColor: '#061D38', padding: '12px 16px', borderRadius: '12px', borderLeft: '4px solid #38BDF8', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#38BDF8', display: 'block', lineHeight: '1.3', marginBottom: '2px' }}>Best Doctor Award</span>
                <span style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: '600' }}>2017 & 2018 (Collector)</span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ color: '#061D38', fontSize: '1.18rem', fontWeight: '800', marginBottom: '6px' }}>Medical Journey & Credentials</h3>
              <p style={{ color: '#FFFFFF', lineHeight: '1.65', fontSize: '0.95rem', margin: 0, fontWeight: '500' }}>
                Alumnus of Madras Medical College (MBBS) & Madurai Medical College (MS). Advanced Laparoscopic training from VG Hospital Coimbatore, with prestigious FIAGES / FALS Fellowships. Over 7 years of dedicated government medical service across Virudhunagar district and Founder Secretary of IMA Sivakasi (2016-2017).
              </p>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '18px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-accent" style={{ padding: '12px 26px', fontSize: '0.95rem', fontWeight: '700', backgroundColor: '#061D38', color: '#FFFFFF', border: 'none' }}>Full Profile & Achievements</Link>
              <Link to="/appointment" className="btn btn-outline" style={{ padding: '12px 26px', fontSize: '0.95rem', fontWeight: '700', borderColor: '#FFFFFF', color: '#FFFFFF' }}>Book Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h4 style={{ color: '#061D38', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontWeight: '800' }}>Testimonials</h4>
            <h2 className="section-title" style={{ margin: 0 }}>What Our Patients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ padding: '30px', background: 'var(--primary)', color: 'var(--white)', borderRadius: '12px', borderLeft: '5px solid #061D38', boxShadow: '0 8px 24px rgba(0, 70, 100, 0.15)' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)', lineHeight: '1.7' }}>"The care I received at JB Healthcare was outstanding. The staff is extremely polite and the facilities are very clean. Highly recommended!"</p>
              <h4 style={{ color: '#061D38', fontWeight: '800' }}>- Ramesh Kumar</h4>
            </div>
            <div style={{ padding: '30px', background: 'var(--primary)', color: 'var(--white)', borderRadius: '12px', borderLeft: '5px solid #061D38', boxShadow: '0 8px 24px rgba(0, 70, 100, 0.15)' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)', lineHeight: '1.7' }}>"I brought my father for an emergency and the doctors acted very swiftly. Their 24/7 service truly saved a life. Very grateful."</p>
              <h4 style={{ color: '#061D38', fontWeight: '800' }}>- Priya S.</h4>
            </div>
            <div style={{ padding: '30px', background: 'var(--primary)', color: 'var(--white)', borderRadius: '12px', borderLeft: '5px solid #061D38', boxShadow: '0 8px 24px rgba(0, 70, 100, 0.15)' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)', lineHeight: '1.7' }}>"Booking an appointment via WhatsApp was so easy. The consultation process was smooth and the doctor was very patient."</p>
              <h4 style={{ color: '#061D38', fontWeight: '800' }}>- Karthik Raj</h4>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={{ backgroundColor: '#071A2E', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginBottom: '12px' }}>Need a Medical Consultation?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 30px' }}>Our specialists are ready to provide you with the best healthcare.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn btn-accent" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', fontWeight: 'bold' }}>
              Book Appointment Now
            </Link>
          </div>
        </div>
      </section>

      <style>{`
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
