import { useState, useEffect } from 'react';
import { Activity, Clock, Award, ShieldCheck, Heart, CheckCircle2, FlaskConical, Zap, Calendar } from 'lucide-react';
import { client, urlFor } from '../sanity';

const CountUp = ({ end, duration = 2000, suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "aboutPage"][0]`).then((data) => {
      setAboutData(data);
    }).catch(console.error);
  }, []);

  // Use fallback text if data is still loading
  const mainHeading = aboutData?.mainHeading || "About JB Healthcare";
  const rawHistoryText = aboutData?.historyText || "Established with a bold vision to make premium, international-standard healthcare accessible to everyone, JB Healthcare has grown into a trusted name in Sivakasi, Tamil Nadu. Over the years, we have built a reputation based on trust, clinical excellence, and deep-rooted empathy.";
  const historyText = rawHistoryText.replace(/Anaiyur/gi, 'Sivakasi');
  const vision = aboutData?.vision || "To be the most trusted and respected healthcare partner in the region, recognized globally for our clinical excellence, compassionate care, and unwavering commitment to community wellness and health education.";
  const mission = aboutData?.mission || "We strive to deliver comprehensive, high-quality, and affordable healthcare services under one roof. Our mission is to continuously upgrade our medical technology, empower our staff through regular training, and provide a healing environment that consistently exceeds patient expectations.";
  const labHeading = aboutData?.labHeading || "In-House Diagnostic Center";
  const labDescription = aboutData?.labDescription || "At JB Healthcare, we know that waiting for test results can be stressful for you and your family. That's why we've set up our own fully equipped diagnostic center right here inside our hospital.";
  const aboutImage = aboutData?.aboutImage ? urlFor(aboutData.aboutImage).url() : "/legacy_of_care.jpg";

  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      
      {/* 1. Header (Dark) */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 100px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>{mainHeading}</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
            Committed to providing world-class medical facilities, innovative treatments, and compassionate care to our community. We believe in treating the whole person, not just the disease.
          </p>
        </div>
      </section>

      {/* 2. Milestones (High Contrast Navy & Cyan) */}
      <section style={{ backgroundColor: '#061D38', padding: '50px 0', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '25px', textAlign: 'center' }}>
            <div data-aos="fade-up" data-aos-delay="100">
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}><CountUp end={10000} /></h2>
              <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>Successful Surgeries</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}><CountUp end={2000} /></h2>
              <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>Laparoscopic Cases</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}><CountUp end={3000} /></h2>
              <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>C-Section Deliveries</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}><CountUp end={100} /></h2>
              <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>Cancer Surgeries</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="500">
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}><CountUp end={7} suffix=" Yrs" /></h2>
              <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>Govt Service Record</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Founder & Chief Doctor Spotlight */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderRadius: '24px', padding: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div className="contact-grid" style={{ alignItems: 'center', gap: '40px' }}>
              <div data-aos="fade-right" style={{ textAlign: 'center' }}>
                <img 
                  src="/doctor.png" 
                  alt="Dr. B. Saileshkumar" 
                  style={{ width: '100%', maxWidth: '380px', borderRadius: '16px', boxShadow: '0 15px 30px rgba(0,0,0,0.3)', border: '3px solid #061D38' }} 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                />
                <div style={{ marginTop: '15px', display: 'inline-block', backgroundColor: '#061D38', color: '#FFFFFF', padding: '6px 18px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  ★ Best Doctor Award (2017 & 2018)
                </div>
              </div>
              <div data-aos="fade-left">
                <span style={{ color: '#061D38', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '800', fontSize: '0.85rem' }}>
                  Leadership & Clinical Vision
                </span>
                <h2 style={{ color: '#061D38', fontSize: '2.4rem', marginTop: '8px', marginBottom: '6px', fontWeight: '800' }}>
                  Dr. B. Saileshkumar
                </h2>
                <h4 style={{ color: '#061D38', fontSize: '1.15rem', marginBottom: '20px', fontWeight: '800' }}>
                  MBBS., M.S., FIAGES., FALS — Founder & Chief Surgeon
                </h4>
                
                <p style={{ color: '#061D38', lineHeight: '1.7', marginBottom: '15px', fontSize: '1.02rem', fontWeight: '500' }}>
                  A native clinical leader with an extraordinary track record of more than <strong>10,000 successful surgical operations</strong> and <strong>2,000+ advanced laparoscopic procedures</strong>.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '15px', marginTop: '20px' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.25)', padding: '14px', borderRadius: '10px', borderLeft: '3px solid #061D38' }}>
                    <h5 style={{ color: '#061D38', margin: '0 0 5px 0', fontSize: '0.98rem', fontWeight: '800' }}>Education & Fellowships</h5>
                    <p style={{ color: '#061D38', margin: 0, fontSize: '0.88rem', lineHeight: '1.5', fontWeight: '500' }}>
                      MBBS (Madras Medical College), MS (Madurai Medical College), Laparoscopic Surgery Training (VG Hospital Coimbatore), FIAGES & FALS Fellowships.
                    </p>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.25)', padding: '14px', borderRadius: '10px', borderLeft: '3px solid #061D38' }}>
                    <h5 style={{ color: '#061D38', margin: '0 0 5px 0', fontSize: '0.98rem', fontWeight: '800' }}>Public Service & Honor</h5>
                    <p style={{ color: '#061D38', margin: 0, fontSize: '0.88rem', lineHeight: '1.5', fontWeight: '500' }}>
                      Conferred the <strong>Best Doctor Award</strong> for two consecutive years (2017 & 2018) by the District Collector. Founder Secretary of IMA Sivakasi (2016-2017) and 7 years of public health service across Virudhunagar district.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Legacy of Care (Upgraded Luxury Section with Background Gradient) */}
      <section 
        className="section" 
        style={{ 
          background: 'linear-gradient(180deg, #EBF2F8 0%, #F4F7FB 50%, #EAEFF5 100%)',
          padding: '90px 0',
          position: 'relative',
          borderTop: '1px solid rgba(10, 43, 78, 0.08)',
          borderBottom: '1px solid rgba(10, 43, 78, 0.08)'
        }}
      >
        <div className="container">
          <div className="contact-grid" style={{ alignItems: 'center', gap: '50px' }}>
            
            {/* Left Column: Image with Floating Badge */}
            <div data-aos="fade-right" style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(10, 43, 78, 0.22)',
                border: '2px solid rgba(0, 180, 216, 0.45)'
              }}>
                <img 
                  src={aboutImage} 
                  alt="JB Healthcare Compassionate Patient Care" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
                  onError={(e) => { e.target.src = "/legacy_of_care.jpg"; }}
                />

                {/* Floating Heart & Slogan Banner */}
                <div className="about-floating-pill" style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '18px',
                  right: '18px',
                  backgroundColor: 'rgba(10, 43, 78, 0.92)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  border: '1px solid rgba(0, 180, 216, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                }}>
                  <div className="about-pill-icon" style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#00B4D8',
                    color: '#061D38',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Heart size={24} fill="#061D38" color="#061D38" />
                  </div>
                  <div>
                    <div className="about-pill-title" style={{ color: '#00B4D8', fontWeight: '800', fontSize: '0.98rem', letterSpacing: '0.5px' }}>
                      Healing Hands, Caring Hearts
                    </div>
                    <div className="about-pill-desc" style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.84rem', marginTop: '2px' }}>
                      Every patient is treated with deep empathy like family
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div data-aos="fade-left">
              <h2 className="section-title" style={{ textAlign: 'left', marginTop: '0', marginBottom: '18px', fontSize: 'clamp(2.1rem, 3.5vw, 2.8rem)', color: 'var(--primary)' }}>
                Our Legacy of Care
              </h2>

              <p style={{ fontSize: '1.08rem', lineHeight: '1.75', color: '#1e293b', marginBottom: '14px', fontWeight: '500' }}>
                {historyText}
              </p>

              <p style={{ fontSize: '0.96rem', lineHeight: '1.7', color: '#475569', marginBottom: '24px' }}>
                Our state-of-the-art infrastructure was designed from the ground up keeping patient comfort and advanced medical requirements in mind. We believe that healing is a holistic process, which is why our facilities look and feel welcoming rather than clinical.
              </p>

              {/* 4 Upgraded Feature Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
                {[
                  { 
                    icon: Clock, 
                    title: '24/7 Dedicated Emergency Care', 
                    desc: 'Always ready with emergency surgical casualty & on-call surgeons' 
                  },
                  { 
                    icon: Award, 
                    title: 'Award-Winning Specialists', 
                    desc: 'Expert laparoscopic surgeons & multi-speciality consultants' 
                  },
                  { 
                    icon: Activity, 
                    title: 'Rapid Diagnostics & ECG', 
                    desc: 'In-house automated lab results and digital ECG monitoring' 
                  },
                  { 
                    icon: ShieldCheck, 
                    title: 'Hygienic IP & OP Wards', 
                    desc: 'Spacious inpatient recovery suites & tranquil outpatient rooms' 
                  }
                ].map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div 
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '14px',
                        padding: '15px 18px',
                        boxShadow: '0 4px 18px rgba(10, 43, 78, 0.06)',
                        border: '1px solid rgba(10, 43, 78, 0.08)',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(0, 180, 216, 0.12)',
                        border: '1px solid rgba(0, 180, 216, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        flexShrink: 0
                      }}>
                        <ItemIcon size={20} color="#0077B6" />
                      </div>
                      <div>
                        <div style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.92rem' }}>
                          {item.title}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '2px', lineHeight: '1.4' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Vision & Mission (Light - Secondary/Grey) */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">Our Vision & Mission</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
              
              {/* Vision Card */}
              <div style={{ background: 'var(--primary)', padding: '40px 30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderTop: '4px solid #061D38', textAlign: 'center' }} data-aos="zoom-in" data-aos-delay="100">
                <h4 style={{ color: '#061D38', marginBottom: '20px', fontSize: '1.8rem', fontWeight: '800' }}>
                  Our Vision
                </h4>
                <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#061D38', fontWeight: '500', margin: 0 }}>
                  {vision}
                </p>
              </div>
              
              {/* Mission Card */}
              <div style={{ background: 'var(--primary)', padding: '40px 30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderTop: '4px solid #061D38', textAlign: 'center' }} data-aos="zoom-in" data-aos-delay="200">
                <h4 style={{ color: '#061D38', marginBottom: '20px', fontSize: '1.8rem', fontWeight: '800' }}>
                  Our Mission
                </h4>
                <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#061D38', fontWeight: '500', margin: 0 }}>
                  {mission}
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* 4. In-House Laboratory (Medical Cyan Showcase) */}
      <section 
        className="section" 
        style={{ 
          background: 'linear-gradient(135deg, #00B4D8 0%, #0096C7 100%)',
          color: 'var(--white)', 
          overflow: 'hidden',
          padding: '95px 0',
          position: 'relative'
        }}
      >
        <div className="container">
          <div className="contact-grid" style={{ alignItems: 'center', gap: '50px' }}>
            
            {/* Left: Lab Image Showcase */}
            <div style={{ order: 1 }} data-aos="fade-right">
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                backgroundColor: '#061D38'
              }}>
                <img 
                  src="/lab.png" 
                  alt="JB Healthcare In-House Diagnostic Lab" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
                />

                {/* Top Badge: 24/7 Diagnostic Badge */}
                <div className="about-lab-top-badge" style={{
                  position: 'absolute',
                  top: '18px',
                  left: '18px',
                  backgroundColor: '#061D38',
                  color: '#38BDF8',
                  fontWeight: '800',
                  padding: '7px 18px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)'
                }}>
                  <FlaskConical size={16} color="#38BDF8" /> In-House Automated Lab
                </div>

                {/* Floating Bottom Card: Fast Reports */}
                <div className="about-floating-pill" style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '18px',
                  right: '18px',
                  backgroundColor: '#061D38',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                  <div className="about-pill-icon" style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#00B4D8',
                    color: '#061D38',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Zap size={20} fill="#061D38" color="#061D38" />
                  </div>
                  <div>
                    <div className="about-pill-title" style={{ color: '#38BDF8', fontSize: '0.92rem', fontWeight: '800' }}>
                      Prompt Computerized Test Results
                    </div>
                    <div className="about-pill-desc" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', marginTop: '1px' }}>
                      Rapid diagnostics to commence targeted treatment immediately
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content & 4 Luxe Feature Cards */}
            <div style={{ order: 2 }} data-aos="fade-left">
              
              <h2 style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 2.9rem)',
                color: '#FFFFFF',
                marginTop: 0,
                marginBottom: '8px',
                fontWeight: '800',
                lineHeight: '1.2'
              }}>
                {labHeading}
              </h2>

              <div style={{ color: '#061D38', fontSize: '1.08rem', fontWeight: '800', marginBottom: '16px' }}>
                Automated Pathology, Biochemistry & 3-Lead Digital ECG
              </div>

              <p style={{ color: '#FFFFFF', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '14px', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 30, 60, 0.2)' }}>
                {labDescription}
              </p>

              <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '25px', textShadow: '0 1px 2px rgba(0, 30, 60, 0.2)' }}>
                Whether it's a routine preventive health check-up or an urgent surgical casualty evaluation in the middle of the night, our certified laboratory technicians and modern analyzers ensure zero delay and complete clinical reliability.
              </p>

              {/* 4 Feature Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '28px' }}>
                {[
                  {
                    icon: Zap,
                    title: 'Fast & Accurate Results',
                    desc: 'Instant computerized reports to begin correct medical care promptly'
                  },
                  {
                    icon: Clock,
                    title: '24/7 Emergency Lab',
                    desc: 'Round-the-clock testing ready for night casualty & emergency OT'
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Sterile & Safe Testing',
                    desc: 'Ultra-hygienic automated sampling ensuring zero contamination risk'
                  },
                  {
                    icon: Activity,
                    title: 'Digital ECG & Biochemistry',
                    desc: 'Instant 3-lead cardiac ECG, blood sugar, LFT, RFT & lipid panels'
                  }
                ].map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#061D38',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '14px',
                        padding: '14px 16px',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
                        transition: 'transform 0.25s ease, border-color 0.25s ease'
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: '#00B4D8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#061D38',
                        flexShrink: 0
                      }}>
                        <ItemIcon size={18} color="#061D38" />
                      </div>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '0.94rem' }}>
                          {item.title}
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', marginTop: '2px', lineHeight: '1.4' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div>
                <a
                  href="/appointment"
                  style={{
                    backgroundColor: '#061D38',
                    color: '#FFFFFF',
                    fontWeight: '800',
                    fontSize: '0.96rem',
                    padding: '13px 30px',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Calendar size={18} /> Book Diagnostic / Blood Test
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Core Values (Light - White) */}
      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container text-center" data-aos="fade-up">
          <h2 className="section-title">Our Core Values</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 40px auto', fontSize: '1.1rem' }}>
            The foundation of JB Healthcare is built upon strong ethical principles that guide our every action, decision, and interaction with our patients.
          </p>
          <div className="services-grid">
            <div className="service-card" data-aos="zoom-in" data-aos-delay="100" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontSize: '1.8rem', fontWeight: '800' }}>Compassion</h3>
              <p className="mt-2" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)' }}>Treating every patient with immense dignity, respect, and unconditional kindness, understanding their pain and emotional needs.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="200" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontSize: '1.8rem', fontWeight: '800' }}>Excellence</h3>
              <p className="mt-2" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)' }}>Maintaining the highest possible standards in clinical outcomes, patient safety, and medical technology integration.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="300" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontSize: '1.8rem', fontWeight: '800' }}>Integrity</h3>
              <p className="mt-2" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)' }}>Ensuring absolute transparency in all our medical, ethical, and billing practices without any hidden agendas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why We Are Different (Light - Secondary/Grey) */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container text-center" data-aos="fade-up">
          <h2 className="section-title">Why We Are Different</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 40px auto', fontSize: '1.1rem' }}>
            We don't just treat symptoms; we treat the person. At JB Healthcare, every protocol, every ward, and every consultation is designed with patient safety, comfort, and quick recovery at its core.
          </p>
          <div className="services-grid">
            <div className="service-card" data-aos="zoom-in" data-aos-delay="100" style={{ borderLeft: '4px solid #061D38', textAlign: 'left', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>Patient-First Approach</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.95)' }}>We prioritize your comfort, encourage clear communication, and design completely personalized treatment plans for every individual.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="200" style={{ borderLeft: '4px solid #061D38', textAlign: 'left', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>Experienced Specialists</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.95)' }}>Our board-certified doctors and surgeons bring decades of rich experience across multiple advanced medical disciplines.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="300" style={{ borderLeft: '4px solid #061D38', textAlign: 'left', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>Hygienic Environment</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.95)' }}>We adhere to the strictest international protocols for sanitation, waste management, and overall infection control.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .about-floating-pill {
            bottom: 8px !important;
            left: 8px !important;
            right: 8px !important;
            padding: 7px 10px !important;
            border-radius: 12px !important;
            gap: 8px !important;
            background-color: rgba(6, 29, 56, 0.94) !important;
          }
          .about-pill-icon {
            width: 30px !important;
            height: 30px !important;
          }
          .about-pill-icon svg {
            width: 15px !important;
            height: 15px !important;
          }
          .about-pill-title {
            font-size: 0.78rem !important;
            line-height: 1.2 !important;
          }
          .about-pill-desc {
            font-size: 0.68rem !important;
            line-height: 1.2 !important;
            margin-top: 1px !important;
          }
          .about-lab-top-badge {
            top: 8px !important;
            left: 8px !important;
            padding: 4px 10px !important;
            font-size: 0.7rem !important;
            border-radius: 14px !important;
          }
          .about-lab-top-badge svg {
            width: 12px !important;
            height: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
