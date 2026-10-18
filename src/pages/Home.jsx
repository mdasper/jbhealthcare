import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, HeartPulse, ShieldPlus, Award, Users, Activity, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { client, urlFor } from '../sanity';
import TiltCard from '../components/TiltCard';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Your Health, Our Greatest Priority',
    subtitle: 'At JB Healthcare, we bring world-class medical excellence right to Anaiyur. From routine check-ups to complex procedures, we are dedicated to providing compassionate, holistic care that focuses on healing your body and mind in a warm, welcoming environment.'
  },
  {
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Advanced Medical Facilities',
    subtitle: 'Precision meets care. We have heavily invested in the latest diagnostic and therapeutic equipment. With our fully automated laboratories and advanced surgical theaters, we guarantee accurate diagnosis, minimally invasive treatments, and faster recovery times.'
  },
  {
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: '24/7 Expert Emergency Care',
    subtitle: 'Emergencies don\'t wait, and neither do we. Our multi-disciplinary team of highly experienced doctors, surgeons, and nurses are available round the clock. With dedicated ICUs and rapid response protocols, you are always in safe hands.'
  },
  {
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Compassionate Maternity Care',
    subtitle: 'Bringing new life into the world with the utmost care. Our dedicated maternity wing offers personalized birthing experiences, specialized neonatal care, and continuous support for both mother and baby.'
  },
  {
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Affordable & Accessible Healing',
    subtitle: 'Premium healthcare doesn\'t have to be a luxury. We are committed to providing highly affordable, ethical, and transparent medical services to our community without ever compromising on quality.'
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
              backgroundImage: `linear-gradient(rgba(10, 43, 78, 0.7), rgba(10, 43, 78, 0.8)), url(${slide.image})` 
            }}
          >
            <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle" style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.6', fontSize: '1.25rem' }}>{slide.subtitle}</p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '60px' }}>
                <Link to="/appointment" className="btn btn-accent">Book an Appointment</Link>
                <Link to="/departments" className="btn btn-outline">Our Departments</Link>
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
              <Award size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--white)' }}>Certified Experts</h3>
              <p style={{ opacity: 0.8 }}>Highly qualified doctors and medical staff.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <Activity size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--white)' }}>Modern Technology</h3>
              <p style={{ opacity: 0.8 }}>State-of-the-art facilities and equipment.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <ShieldPlus size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--white)' }}>24/7 Support</h3>
              <p style={{ opacity: 0.8 }}>Round-the-clock emergency services.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <Users size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--white)' }}>Patient-Centric Care</h3>
              <p style={{ opacity: 0.8 }}>Personalized treatment plans and emotional support.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="500">
              <CheckCircle size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--white)' }}>Strict Hygiene</h3>
              <p style={{ opacity: 0.8 }}>100% adherence to international safety protocols.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Snapshot */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">
            <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Excellence in Healthcare</h4>
            <h2 className="section-title" style={{ margin: 0 }}>Top Departments & Surgeries</h2>
          </div>
          <div className="top-departments-2x2">
            
            {/* Card 1: Laparoscopic Surgery */}
            <TiltCard 
              className="service-card department-tile" 
              maxTilt={5} 
              scale={1.02} 
              glareColor="rgba(224, 169, 109, 0.22)"
              data-aos="zoom-in" 
              data-aos-delay="100"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: 'rgba(224, 169, 109, 0.15)', border: '1px solid rgba(224, 169, 109, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={32} color="var(--accent)" />
                  </div>
                  <span style={{ fontSize: '0.78rem', backgroundColor: 'rgba(224, 169, 109, 0.2)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '15px', fontWeight: 'bold' }}>
                    🔬 லேப்ராஸ்கோபிக் அறுவை சிகிச்சை
                  </span>
                </div>
                <h3 style={{ color: 'var(--white)', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left' }}>Laparoscopic Surgery</h3>
                <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px' }}>
                  Minimally invasive keyhole surgery center of excellence led by Dr. B. Saileshkumar (2,000+ surgeries) with minimal pain, no scars, and faster discharge.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  <span className="dept-pill">கருப்பை நீக்கம் (Hysterectomy)</span>
                  <span className="dept-pill">குடல்வால் & பித்தப்பை (Appendix & Gallbladder)</span>
                  <span className="dept-pill">குடல் இறக்கம் (Hernia Repair)</span>
                  <span className="dept-pill">நீர்க்கட்டி & F.P (Cyst & Sterilization)</span>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={15} /> 2,000+ Laparoscopies
                </span>
                <Link to="/surgeries" style={{ color: 'var(--white)', fontSize: '0.88rem', fontWeight: 'bold', textDecoration: 'underline' }}>
                  View Surgeries →
                </Link>
              </div>
            </TiltCard>

            {/* Card 2: 24/7 Emergency & OT */}
            <TiltCard 
              className="service-card department-tile" 
              maxTilt={5} 
              scale={1.02} 
              glareColor="rgba(224, 169, 109, 0.22)"
              data-aos="zoom-in" 
              data-aos-delay="200"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: 'rgba(224, 169, 109, 0.15)', border: '1px solid rgba(224, 169, 109, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldPlus size={32} color="var(--accent)" />
                  </div>
                  <span style={{ fontSize: '0.78rem', backgroundColor: 'rgba(224, 169, 109, 0.2)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '15px', fontWeight: 'bold' }}>
                    🚨 அவசர சிகிச்சை & நவீன OT
                  </span>
                </div>
                <h3 style={{ color: 'var(--white)', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left' }}>24/7 Emergency & OT</h3>
                <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px' }}>
                  Round-the-clock emergency casualty, rapid trauma response, advanced sterile modular operation theatres, and dedicated intensive care units (ICU).
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  <span className="dept-pill">24/7 அவசர சிகிச்சை (Casualty Care)</span>
                  <span className="dept-pill">நவீன அறுவை அரங்கு (Modular OT)</span>
                  <span className="dept-pill">தீவிர சிகிச்சை பிரிவு (ICU Support)</span>
                  <span className="dept-pill">அவசர முதலுதவி (Immediate Trauma Care)</span>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={15} /> 24/7 Emergency Care
                </span>
                <Link to="/facilities" style={{ color: 'var(--white)', fontSize: '0.88rem', fontWeight: 'bold', textDecoration: 'underline' }}>
                  View Facilities →
                </Link>
              </div>
            </TiltCard>

            {/* Card 3: Rapid Diagnostics & ECG */}
            <TiltCard 
              className="service-card department-tile" 
              maxTilt={5} 
              scale={1.02} 
              glareColor="rgba(224, 169, 109, 0.22)"
              data-aos="zoom-in" 
              data-aos-delay="300"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: 'rgba(224, 169, 109, 0.15)', border: '1px solid rgba(224, 169, 109, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HeartPulse size={32} color="var(--accent)" />
                  </div>
                  <span style={{ fontSize: '0.78rem', backgroundColor: 'rgba(224, 169, 109, 0.2)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '15px', fontWeight: 'bold' }}>
                    ⚡ விரைவு பரிசோதனை & ECG
                  </span>
                </div>
                <h3 style={{ color: 'var(--white)', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left' }}>Rapid Diagnostics & ECG</h3>
                <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px' }}>
                  In-house computerized diagnostic laboratory and computerized digital cardiac monitoring providing rapid, accurate blood and biochemistry reports.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  <span className="dept-pill">24 மணி நேர ஆய்வகம் (Automated Lab)</span>
                  <span className="dept-pill">டிஜிட்டல் ECG (12-Lead Digital ECG)</span>
                  <span className="dept-pill">ரத்த பரிசோதனைகள் (Biochemistry)</span>
                  <span className="dept-pill">விரைவு முடிவுகள் (Same-Day Reports)</span>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={15} /> 24 Hours Automated Lab
                </span>
                <Link to="/facilities" style={{ color: 'var(--white)', fontSize: '0.88rem', fontWeight: 'bold', textDecoration: 'underline' }}>
                  Lab Details →
                </Link>
              </div>
            </TiltCard>

            {/* Card 4: Visiting Super-Specialists */}
            <TiltCard 
              className="service-card department-tile" 
              maxTilt={5} 
              scale={1.02} 
              glareColor="rgba(224, 169, 109, 0.22)"
              data-aos="zoom-in" 
              data-aos-delay="400"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: 'rgba(224, 169, 109, 0.15)', border: '1px solid rgba(224, 169, 109, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Stethoscope size={32} color="var(--accent)" />
                  </div>
                  <span style={{ fontSize: '0.78rem', backgroundColor: 'rgba(224, 169, 109, 0.2)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '15px', fontWeight: 'bold' }}>
                    🌟 சிறப்பு மருத்துவர்கள் வருகை
                  </span>
                </div>
                <h3 style={{ color: 'var(--white)', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left' }}>Visiting Specialists</h3>
                <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px' }}>
                  Regular consultations and specialized surgeries by 12 renowned super-specialists across Cancer, Gastro, Plastic, Urology, Ortho & Maternity.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  <span className="dept-pill">12 சிறப்பு மருத்துவர்கள் (Specialists)</span>
                  <span className="dept-pill">புற்றுநோய் & குடல் (Cancer & GI Care)</span>
                  <span className="dept-pill">ஒட்டுறுப்பு & குழந்தை (Plastic & Child)</span>
                  <span className="dept-pill">சிறுநீரகம் & எலும்பு (Urology & Ortho)</span>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={15} /> 12 Active Specialists
                </span>
                <Link to="/doctors" style={{ color: 'var(--white)', fontSize: '0.88rem', fontWeight: 'bold', textDecoration: 'underline' }}>
                  View All Doctors →
                </Link>
              </div>
            </TiltCard>

          </div>
          <div className="text-center" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '50px', flexWrap: 'wrap' }}>
            <Link to="/doctors" className="btn btn-accent btn-magnetic">Specialist Doctors</Link>
            <Link to="/surgeries" className="btn btn-primary btn-magnetic">Laparoscopic Surgeries</Link>
            <Link to="/departments" className="btn btn-outline btn-magnetic" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>All Departments</Link>
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
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(224, 169, 109, 0.2)', color: 'var(--accent)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Founder & Chief Surgeon
            </div>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '8px', color: 'var(--white)' }}>Dr. B. Saileshkumar</h2>
            <h4 style={{ color: 'var(--accent)', fontSize: '1.15rem', fontWeight: '600', marginBottom: '15px' }}>
              MBBS., M.S., FIAGES., FALS (Laparoscopic & General Surgeon)
            </h4>
            
            <div className="quote" style={{ marginBottom: '15px', fontSize: '1.05rem', lineHeight: '1.5' }}>
              "Healing Hands, Caring Hearts — Healing is not just about prescribing medicines; it's about listening to our patients, understanding their pain, and guiding them towards a healthier, happier life."
            </div>
            
            {/* Highlights from Hospital Banner */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid var(--accent)' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)', display: 'block' }}>10,000+</span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>Successful Surgeries</span>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid var(--accent)' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)', display: 'block' }}>2,000+</span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>Laparoscopic Surgeries</span>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid var(--accent)' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)', display: 'block' }}>Best Doctor Award</span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>2017 & 2018 (Collector)</span>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h3 style={{ color: 'var(--accent)', fontSize: '1.1rem', marginBottom: '4px' }}>Medical Journey & Credentials</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.5', fontSize: '0.9rem', margin: 0 }}>
                Alumnus of Madras Medical College (MBBS) & Madurai Medical College (MS). Advanced Laparoscopic training from VG Hospital Coimbatore, with prestigious FIAGES / FALS Fellowships. Over 7 years of dedicated government medical service across Virudhunagar district and Founder Secretary of IMA Sivakasi (2016-2017).
              </p>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '15px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-accent" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>Full Profile & Achievements</Link>
              <Link to="/appointment" className="btn btn-outline" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>Book Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Testimonials</h4>
            <h2 className="section-title" style={{ margin: 0 }}>What Our Patients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ padding: '30px', background: 'var(--primary)', color: 'var(--white)', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', opacity: 0.9 }}>"The care I received at JB Healthcare was outstanding. The staff is extremely polite and the facilities are very clean. Highly recommended!"</p>
              <h4 style={{ color: 'var(--accent)' }}>- Ramesh Kumar</h4>
            </div>
            <div style={{ padding: '30px', background: 'var(--primary)', color: 'var(--white)', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', opacity: 0.9 }}>"I brought my father for an emergency and the doctors acted very swiftly. Their 24/7 service truly saved a life. Very grateful."</p>
              <h4 style={{ color: 'var(--accent)' }}>- Priya S.</h4>
            </div>
            <div style={{ padding: '30px', background: 'var(--primary)', color: 'var(--white)', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', opacity: 0.9 }}>"Booking an appointment via WhatsApp was so easy. The consultation process was smooth and the doctor was very patient."</p>
              <h4 style={{ color: 'var(--accent)' }}>- Karthik Raj</h4>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section" style={{ backgroundColor: 'var(--accent)', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', fontSize: '2.5rem', marginBottom: '20px' }}>Need a Medical Consultation?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Our specialists are ready to provide you with the best healthcare.</p>
          <Link to="/appointment" className="btn btn-magnetic" style={{ backgroundColor: 'var(--white)', color: 'var(--primary)', fontWeight: '700' }}>Book Appointment Now</Link>
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
          background-color: var(--primary) !important;
          color: var(--white) !important;
          border-top: 4px solid var(--accent) !important;
          border-radius: 18px !important;
          padding: 35px 30px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          box-shadow: 0 12px 35px rgba(10, 43, 78, 0.12) !important;
        }
        .department-tile:hover {
          box-shadow: 0 24px 50px rgba(10, 43, 78, 0.35), 0 0 25px rgba(224, 169, 109, 0.15) !important;
        }
        .dept-pill {
          font-size: 0.8rem;
          background-color: rgba(224, 169, 109, 0.15);
          color: var(--accent);
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid rgba(224, 169, 109, 0.35);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default Home;
