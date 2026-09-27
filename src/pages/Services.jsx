import { Link } from 'react-router-dom';
import { Stethoscope, HeartPulse, ShieldPlus, Baby, Brain, Bone, Eye, Activity, ClipboardList, Clock, PhoneCall } from 'lucide-react';

const Services = () => {
  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      
      {/* 1. Header (Dark) */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 100px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: 'var(--white)', fontSize: '3.5rem', marginBottom: '20px' }}>Our Medical Services</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
            JB Healthcare offers a comprehensive range of medical services under one roof. From preventive health check-ups to advanced surgical interventions, our departments are equipped to handle all your health needs.
          </p>
        </div>
      </section>

      {/* 2. Departments Grid (Light) */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container text-center">
          <h2 className="section-title" data-aos="fade-up">Centers of Excellence</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 50px auto', fontSize: '1.1rem' }} data-aos="fade-up" data-aos-delay="100">
            Our specialized departments are led by some of the most renowned experts in their respective fields, supported by highly trained nursing staff and cutting-edge technology.
          </p>
          
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            
            <div className="service-card" data-aos="zoom-in" data-aos-delay="100" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '4px solid var(--accent)', textAlign: 'left' }}>
              <HeartPulse size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--accent)', fontSize: '1.6rem' }}>Cardiology</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>Comprehensive cardiac care including ECG, Echocardiogram, TMT, and non-invasive diagnostic procedures. We provide expert management for hypertension and heart failure.</p>
            </div>

            <div className="service-card" data-aos="zoom-in" data-aos-delay="200" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '4px solid var(--accent)', textAlign: 'left' }}>
              <Stethoscope size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--accent)', fontSize: '1.6rem' }}>General Medicine</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>Expert diagnosis and treatment for infectious diseases, chronic lifestyle disorders like Diabetes and Thyroid issues, and routine adult health concerns.</p>
            </div>

            <div className="service-card" data-aos="zoom-in" data-aos-delay="300" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '4px solid var(--accent)', textAlign: 'left' }}>
              <Baby size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--accent)', fontSize: '1.6rem' }}>Pediatrics</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>Dedicated child care services ranging from newborn assessments and immunizations to managing complex childhood illnesses with utmost compassion.</p>
            </div>

            <div className="service-card" data-aos="zoom-in" data-aos-delay="400" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '4px solid var(--accent)', textAlign: 'left' }}>
              <Bone size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--accent)', fontSize: '1.6rem' }}>Orthopedics</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>Advanced bone and joint care, fracture management, arthritis treatment, and physiotherapy services for faster and painless rehabilitation.</p>
            </div>

            <div className="service-card" data-aos="zoom-in" data-aos-delay="500" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '4px solid var(--accent)', textAlign: 'left' }}>
              <Brain size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--accent)', fontSize: '1.6rem' }}>Neurology</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>Specialized care for headaches, migraines, stroke prevention, and neurological disorders utilizing the latest diagnostic imaging.</p>
            </div>

            <div className="service-card" data-aos="zoom-in" data-aos-delay="600" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '4px solid var(--accent)', textAlign: 'left' }}>
              <ShieldPlus size={48} style={{ color: 'var(--accent)', marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--accent)', fontSize: '1.6rem' }}>Emergency Care</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>Our 24/7 ER is fully equipped with life-saving equipment, ready to handle severe trauma, accidents, and acute medical emergencies instantly.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Comprehensive Health Packages (White) */}
      <section className="section" style={{ backgroundColor: 'var(--white)', overflow: 'hidden' }}>
        <div className="container">
          <div className="contact-grid" style={{ alignItems: 'center' }}>
            <div data-aos="fade-right">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>Preventive Health Packages</h2>
              <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Prevention is always better than cure. We offer a variety of tailor-made master health check-up packages designed for different age groups and lifestyles. Regular screenings help in early detection and complete cure of potential health risks.
              </p>
              
              <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontSize: '1.1rem' }}>
                  <Activity color="var(--accent)" /> Basic Wellness Package
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontSize: '1.1rem' }}>
                  <Activity color="var(--accent)" /> Comprehensive Diabetic Profile
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontSize: '1.1rem' }}>
                  <Activity color="var(--accent)" /> Senior Citizen Care Package
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontSize: '1.1rem' }}>
                  <Activity color="var(--accent)" /> Complete Cardiac Evaluation
                </li>
              </ul>
              
              <Link to="/contact" className="btn btn-accent mt-4">Enquire About Packages</Link>
            </div>
            <div data-aos="fade-left">
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Health Packages" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works / Patient Journey (Light to contrast with footer) */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'var(--primary)', marginBottom: '50px' }} data-aos="fade-up">Your Seamless Healthcare Journey</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            <div style={{ backgroundColor: 'var(--primary)', padding: '30px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} data-aos="fade-up" data-aos-delay="100">
              <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                <PhoneCall size={36} color="var(--accent)" />
              </div>
              <h3 style={{ color: 'var(--accent)' }}>1. Book Appointment</h3>
              <p style={{ color: 'var(--white)', opacity: 0.9, marginTop: '10px' }}>Easily schedule your visit via WhatsApp or call us directly. No long waiting queues.</p>
            </div>
            
            <div style={{ backgroundColor: 'var(--primary)', padding: '30px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} data-aos="fade-up" data-aos-delay="200">
              <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                <ClipboardList size={36} color="var(--accent)" />
              </div>
              <h3 style={{ color: 'var(--accent)' }}>2. Expert Consultation</h3>
              <p style={{ color: 'var(--white)', opacity: 0.9, marginTop: '10px' }}>Meet our specialists for a detailed, unhurried diagnosis and personalized treatment plan.</p>
            </div>
            
            <div style={{ backgroundColor: 'var(--primary)', padding: '30px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} data-aos="fade-up" data-aos-delay="300">
              <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                <Clock size={36} color="var(--accent)" />
              </div>
              <h3 style={{ color: 'var(--accent)' }}>3. Quick Recovery</h3>
              <p style={{ color: 'var(--white)', opacity: 0.9, marginTop: '10px' }}>Receive top-tier medical care and follow-ups to ensure a smooth and swift recovery.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
