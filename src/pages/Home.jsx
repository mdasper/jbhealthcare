import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, HeartPulse, ShieldPlus, Award, Users, Activity, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { client, urlFor } from '../sanity';

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
                <Link to="/services" className="btn btn-outline">Our Services</Link>
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
          <div className="services-grid">
            <div className="service-card" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '4px solid var(--accent)' }}>
              <Stethoscope size={48} className="service-icon" style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--white)' }}>General Medicine</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)' }}>Comprehensive health check-ups and treatments for a wide range of common medical conditions.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="200" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '4px solid var(--accent)' }}>
              <HeartPulse size={48} className="service-icon" style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--white)' }}>Cardiology</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)' }}>Expert consultations and advanced treatments from our panel of experienced specialists.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="300" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '4px solid var(--accent)' }}>
              <Activity size={48} className="service-icon" style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--white)' }}>Laparoscopic Surgery</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)' }}>Minimally invasive keyhole surgeries for faster recovery and minimal scarring.</p>
            </div>
          </div>
          <div className="text-center" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '50px' }}>
            <Link to="/services" className="btn btn-primary">All Departments</Link>
            <Link to="/surgeries" className="btn btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>View Surgeries</Link>
          </div>
        </div>
      </section>


      {/* Doctor Message */}
      <section className="section doctor-message" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="doctor-image" data-aos="fade-right">
            <img src="/doctor.png" alt="Chief Doctor" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1612349317150-e410f624c400?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }} />
          </div>
          <div className="doctor-content" data-aos="fade-left">
            <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontFamily: 'Inter' }}>Message from the Founder</h4>
            <h2>Meet Our Chief Doctor</h2>
            <h4>Owner & Lead Physician</h4>
            <div className="quote" style={{ marginBottom: '15px', fontSize: '1.1rem', lineHeight: '1.5' }}>
              "Healing is not just about prescribing medicines; it's about listening to our patients, understanding their pain, and guiding them towards a healthier, happier life. At JB Healthcare, we treat you like family."
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <h3 style={{ color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '5px' }}>A Lifelong Commitment to Healthcare</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.5', fontSize: '0.95rem', margin: 0 }}>
                With over a decade of dedicated service in the medical field, our founder established JB Healthcare with a single mission: to bring world-class, compassionate, and affordable healthcare to the heart of Anaiyur. Our clinic stands as a beacon of hope and healing, built on the pillars of trust and medical excellence.
              </p>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '5px' }}>Patient-First Philosophy</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.5', fontSize: '0.95rem', margin: 0 }}>
                We believe that every patient deserves personalized attention. From modern diagnostic tools to comprehensive post-treatment care, we ensure that your medical journey is smooth, transparent, and effective. Your health is not just our profession—it is our passion.
              </p>
            </div>

            <Link to="/about" className="btn btn-accent" style={{ marginTop: '5px' }}>Read More About Us</Link>
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
          <Link to="/appointment" className="btn" style={{ backgroundColor: 'var(--white)', color: 'var(--primary)' }}>Book Appointment Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
