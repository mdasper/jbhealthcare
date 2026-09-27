import { Activity } from 'lucide-react';

const About = () => {
  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      
      {/* 1. Header (Dark) */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 100px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: 'var(--white)', fontSize: '3.5rem', marginBottom: '20px' }}>About JB Healthcare</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
            Committed to providing world-class medical facilities, innovative treatments, and compassionate care to our community. We believe in treating the whole person, not just the disease.
          </p>
        </div>
      </section>

      {/* 2. Legacy of Care (Light - White) */}
      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="contact-grid" style={{ alignItems: 'center' }}>
            <div data-aos="fade-right">
              <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hospital Building" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
            <div data-aos="fade-left">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>Our Legacy of Care</h2>
              <p className="mb-2">
                Established with a bold vision to make premium, international-standard healthcare accessible to everyone, JB Healthcare has grown into a trusted name in Anaiyur, Tamil Nadu. Over the years, we have built a reputation based on trust, clinical excellence, and deep-rooted empathy.
              </p>
              <p className="mb-2">
                Our state-of-the-art infrastructure was designed from the ground up keeping patient comfort and advanced medical requirements in mind. We believe that healing is a holistic process, which is why our facilities look and feel welcoming rather than clinical.
              </p>
              <p className="mb-4">
                From the moment you step into our facility, our dedicated staff ensures that your journey to recovery is smooth, transparent, and completely stress-free. Every patient is treated like family.
              </p>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', lineHeight: '2', fontWeight: '500' }}>
                <li>24/7 Dedicated Emergency Care</li>
                <li>Highly Experienced Medical Professionals</li>
                <li>Advanced Diagnostic Technology</li>
                <li>Patient-Centric Approach in all operations</li>
              </ul>
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
              <div style={{ background: 'var(--primary)', padding: '40px 30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderTop: '4px solid var(--accent)', textAlign: 'center' }} data-aos="zoom-in" data-aos-delay="100">
                <h4 style={{ color: 'var(--accent)', marginBottom: '20px', fontSize: '1.8rem' }}>
                  Our Vision
                </h4>
                <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--white)', opacity: 0.9, margin: 0 }}>
                  To be the most trusted and respected healthcare partner in the region, recognized globally for our clinical excellence, compassionate care, and unwavering commitment to community wellness and health education.
                </p>
              </div>
              
              {/* Mission Card */}
              <div style={{ background: 'var(--primary)', padding: '40px 30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderTop: '4px solid var(--accent)', textAlign: 'center' }} data-aos="zoom-in" data-aos-delay="200">
                <h4 style={{ color: 'var(--accent)', marginBottom: '20px', fontSize: '1.8rem' }}>
                  Our Mission
                </h4>
                <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--white)', opacity: 0.9, margin: 0 }}>
                  We strive to deliver comprehensive, high-quality, and affordable healthcare services under one roof. Our mission is to continuously upgrade our medical technology, empower our staff through regular training, and provide a healing environment that consistently exceeds patient expectations.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* 4. In-House Laboratory (Dark) */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', overflow: 'hidden' }}>
        <div className="container">
          <div className="contact-grid" style={{ alignItems: 'center' }}>
            <div style={{ order: 2 }} data-aos="fade-left">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px', color: 'var(--white)' }}>In-House Diagnostic Center</h2>
              <p className="mb-4" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                At JB Healthcare, we know that waiting for test results can be stressful for you and your family. That’s why we’ve set up our own fully equipped diagnostic center right here inside our hospital. Our goal is to give you fast, accurate results so your doctor can start the right treatment without any delay.
              </p>
              <p className="mb-4" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                Whether it's a routine check-up or an emergency in the middle of the night, our friendly lab technicians are here 24/7 to make the testing process as smooth and painless as possible.
              </p>
              <ul style={{ listStyle: 'none', paddingLeft: '0', lineHeight: '1.6', fontSize: '1.1rem' }}>
                <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                  <Activity size={20} style={{ color: 'var(--accent)', marginRight: '12px', flexShrink: 0, marginTop: '2px' }} /> 
                  <span><strong>Fast & Accurate Results:</strong> to start your treatment quickly.</span>
                </li>
                <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                  <Activity size={20} style={{ color: 'var(--accent)', marginRight: '12px', flexShrink: 0, marginTop: '2px' }} /> 
                  <span><strong>24/7 Emergency Lab:</strong> always open when you need it most.</span>
                </li>
                <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                  <Activity size={20} style={{ color: 'var(--accent)', marginRight: '12px', flexShrink: 0, marginTop: '2px' }} /> 
                  <span><strong>Safe & Hygienic:</strong> environment ensuring your complete peace of mind.</span>
                </li>
                <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                  <Activity size={20} style={{ color: 'var(--accent)', marginRight: '12px', flexShrink: 0, marginTop: '2px' }} /> 
                  <span><strong>Friendly Staff:</strong> making blood tests easy, even for children.</span>
                </li>
              </ul>
            </div>
            <div style={{ order: 1 }}>
              <img src="/lab.png" alt="In-House Diagnostic Lab" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '4px solid var(--accent)' }} />
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
              <h3 style={{ color: 'var(--accent)', fontSize: '1.8rem' }}>Compassion</h3>
              <p className="mt-2" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)' }}>Treating every patient with immense dignity, respect, and unconditional kindness, understanding their pain and emotional needs.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="200" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: 'var(--accent)', fontSize: '1.8rem' }}>Excellence</h3>
              <p className="mt-2" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)' }}>Maintaining the highest possible standards in clinical outcomes, patient safety, and medical technology integration.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="300" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: 'var(--accent)', fontSize: '1.8rem' }}>Integrity</h3>
              <p className="mt-2" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)' }}>Ensuring absolute transparency in all our medical, ethical, and billing practices without any hidden agendas.</p>
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
            <div className="service-card" data-aos="zoom-in" data-aos-delay="100" style={{ borderLeft: '4px solid var(--accent)', textAlign: 'left', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: 'var(--accent)' }}>Patient-First Approach</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)' }}>We prioritize your comfort, encourage clear communication, and design completely personalized treatment plans for every individual.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="200" style={{ borderLeft: '4px solid var(--accent)', textAlign: 'left', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: 'var(--accent)' }}>Experienced Specialists</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)' }}>Our board-certified doctors and surgeons bring decades of rich experience across multiple advanced medical disciplines.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="300" style={{ borderLeft: '4px solid var(--accent)', textAlign: 'left', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: 'var(--accent)' }}>Hygienic Environment</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.9)' }}>We adhere to the strictest international protocols for sanitation, waste management, and overall infection control.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
