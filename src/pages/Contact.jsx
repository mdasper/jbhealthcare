import { useState, useEffect } from 'react';
import { client } from '../sanity';

const Contact = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0]`).then((data) => {
      setSettings(data);
    }).catch(console.error);
  }, []);

  const address = settings?.address || "2/571A, Bharathi Nagar, Reserve line, Anaiyur, Tamil Nadu 626124";
  const phone = settings?.phone || "+91 93455 10905";
  const email = settings?.email || "info@jbhealthcare.com";

  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 100px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: 'var(--white)', fontSize: '3.5rem', marginBottom: '20px' }}>Contact Us</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            We are here to answer your questions and assist you with your healthcare needs. Reach out to us today.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <div className="contact-grid">
            <div style={{ padding: '20px' }} data-aos="fade-right">
              <h3 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '15px' }}>Get in Touch</h3>
              <p className="mb-4" style={{ color: '#555', fontSize: '1.1rem' }}>Have a medical inquiry or want to book an appointment? Contact our front desk directly.</p>
              
              <div className="contact-info-item" style={{ marginBottom: '20px', alignItems: 'center' }}>
                <div className="contact-info-icon" style={{ backgroundColor: 'var(--primary)', color: 'var(--accent)', padding: '10px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '50%' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.1rem' }}>Location</h4>
                  <p style={{ color: '#555', fontSize: '0.95rem', margin: 0 }}>
                    {address}
                  </p>
                </div>
              </div>

              <div className="contact-info-item" style={{ marginBottom: '20px', alignItems: 'center' }}>
                <div className="contact-info-icon" style={{ backgroundColor: 'var(--primary)', color: 'var(--accent)', padding: '10px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '50%' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.1rem' }}>Call Us</h4>
                  <p style={{ color: '#555', fontSize: '0.95rem', margin: 0 }}>{phone}</p>
                </div>
              </div>
              
              <div className="contact-info-item" style={{ marginBottom: '20px', alignItems: 'center' }}>
                <div className="contact-info-icon" style={{ backgroundColor: 'var(--primary)', color: 'var(--accent)', padding: '10px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '50%' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.1rem' }}>Email Us</h4>
                  <p style={{ color: '#555', fontSize: '0.95rem', margin: 0 }}>{email}</p>
                </div>
              </div>
            </div>

            <div className="contact-form" data-aos="fade-left" style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: '12px', boxShadow: '0 15px 40px rgba(0,0,0,0.2)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '30px', borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block' }}>Send a Message</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required style={{ border: '1px solid #e1e8ed', padding: '15px', width: '100%', borderRadius: '6px', marginBottom: '15px', backgroundColor: '#f8f9fa', color: 'var(--primary)' }} />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required style={{ border: '1px solid #e1e8ed', padding: '15px', width: '100%', borderRadius: '6px', marginBottom: '15px', backgroundColor: '#f8f9fa', color: 'var(--primary)' }} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subject" required style={{ border: '1px solid #e1e8ed', padding: '15px', width: '100%', borderRadius: '6px', marginBottom: '15px', backgroundColor: '#f8f9fa', color: 'var(--primary)' }} />
                </div>
                <div className="form-group">
                  <textarea rows="4" placeholder="How can we help you?" required style={{ border: '1px solid #e1e8ed', padding: '15px', width: '100%', borderRadius: '6px', marginBottom: '25px', backgroundColor: '#f8f9fa', color: 'var(--primary)', resize: 'vertical' }}></textarea>
                </div>
                <button type="submit" className="btn btn-accent" style={{width: '100%', fontSize: '1.1rem', padding: '15px', borderRadius: '6px', fontWeight: 'bold'}}>Send Message</button>
              </form>
            </div>
          </div>

          <div style={{ marginTop: '50px', textAlign: 'center' }} data-aos="zoom-in">
            <h2 className="section-title" style={{ color: 'var(--primary)', marginBottom: '20px' }}>Find Us Here</h2>
            <div className="map-container" style={{ marginTop: '0' }}>
              {/* Google Maps Embed using the provided address */}
              <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.1234567890123!2d78.1158!3d9.953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5a1a1a1a1a1%3A0x1a2b3c4d5e6f7g8h!2sAnaiyur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy"
              title="JB Healthcare Location"
            ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
