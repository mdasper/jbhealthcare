import { useState, useEffect } from 'react';
import { CheckCircle, Send, Phone, Mail, MapPin } from 'lucide-react';
import { client } from '../sanity';
import { saveEnquiryToSanity } from '../services/leadService';

const Contact = () => {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0]`).then((data) => {
      setSettings(data);
    }).catch(console.error);
  }, []);

  const address = settings?.address || "2/571A, Bharathi Nagar, Reserve line, Sivakasi, Tamil Nadu 626124";
  const phone = settings?.phone || "+91 93455 10905";
  const email = settings?.email || "jbhealthcare.sivakasi@gmail.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await saveEnquiryToSanity(formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 100px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>Contact Us</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
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
                <div className="contact-info-icon" style={{ backgroundColor: 'var(--primary)', color: '#061D38', padding: '10px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '50%' }}>
                  <MapPin size={20} color="#00B4D8" />
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.1rem' }}>Location</h4>
                  <p style={{ color: '#555', fontSize: '0.95rem', margin: 0 }}>
                    {address}
                  </p>
                </div>
              </div>

              <div className="contact-info-item" style={{ marginBottom: '20px', alignItems: 'center' }}>
                <div className="contact-info-icon" style={{ backgroundColor: 'var(--primary)', color: '#061D38', padding: '10px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '50%' }}>
                  <Phone size={20} color="#00B4D8" />
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.1rem' }}>Hospital Front Desk</h4>
                  <p style={{ color: '#555', fontSize: '0.95rem', margin: 0 }}>
                    <a href="tel:+919345510905" style={{ color: '#555', textDecoration: 'none', fontWeight: '600' }}>+91 93455 10905</a> (24/7 Front Desk)
                  </p>
                </div>
              </div>

              <div className="contact-info-item" style={{ marginBottom: '20px', alignItems: 'center' }}>
                <div className="contact-info-icon" style={{ backgroundColor: 'var(--primary)', color: '#061D38', padding: '10px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '50%' }}>
                  <Phone size={20} color="#00B4D8" />
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.1rem' }}>Mobile & Appointments</h4>
                  <p style={{ color: '#555', fontSize: '0.95rem', margin: 0 }}>
                    <a href="tel:+919345510905" style={{ color: '#555', textDecoration: 'none', fontWeight: '600' }}>+91 93455 10905</a>
                  </p>
                </div>
              </div>
              
              <div className="contact-info-item" style={{ marginBottom: '20px', alignItems: 'center' }}>
                <div className="contact-info-icon" style={{ backgroundColor: 'var(--primary)', color: '#061D38', padding: '10px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '50%' }}>
                  <Mail size={20} color="#00B4D8" />
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.1rem' }}>Email Us</h4>
                  <p style={{ color: '#555', fontSize: '0.95rem', margin: 0 }}><a href="mailto:jbhealthcare.sivakasi@gmail.com" style={{ color: '#0077B6', textDecoration: 'none', fontWeight: '600' }}>jbhealthcare.sivakasi@gmail.com</a></p>
                </div>
              </div>

              {/* Real Hospital Exterior Photo */}
              <div style={{ marginTop: '25px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.12)', border: '2px solid rgba(0, 180, 216, 0.3)' }}>
                <img 
                  src="/hospital_photos/hospital_building_exterior.jpg" 
                  alt="JB Healthcare Sivakasi Hospital Building & Chermaa Pharmacy" 
                  style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ backgroundColor: '#061D38', color: '#FFFFFF', padding: '10px 16px', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="#38BDF8" />
                  <span>JB Healthcare & Chermaa Pharmacy (Bharathi Nagar, Sivakasi)</span>
                </div>
              </div>
            </div>

            <div className="contact-form" data-aos="fade-left" style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: '16px', boxShadow: '0 15px 40px rgba(0,0,0,0.12)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '25px', borderBottom: '3px solid var(--accent)', paddingBottom: '10px', display: 'inline-block' }}>Send a Message</h3>
              
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', animation: 'fadeIn 0.4s ease' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#E0F2FE', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                    <CheckCircle size={42} color="#0077B6" />
                  </div>
                  <h4 style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px' }}>
                    Thank you, {formData.name || 'valued patient'}!
                  </h4>
                  <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: '1.6', maxWidth: '380px', margin: '0 auto 24px' }}>
                    Your message has been securely recorded. Our hospital front desk <strong>(+91 93455 10905)</strong> will review your inquiry and contact you shortly.
                  </p>
                  <button 
                    type="button" 
                    onClick={handleReset}
                    className="btn btn-outline" 
                    style={{ borderColor: 'var(--primary)', color: 'var(--primary)', borderRadius: '25px', padding: '10px 24px', fontWeight: '700' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Your Full Name *" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      style={{ border: '1px solid #e1e8ed', padding: '14px 16px', width: '100%', borderRadius: '10px', backgroundColor: '#f8f9fa', color: 'var(--primary)', fontSize: '0.95rem' }} 
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="Your Mobile Phone Number *" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                      style={{ border: '1px solid #e1e8ed', padding: '14px 16px', width: '100%', borderRadius: '10px', backgroundColor: '#f8f9fa', color: 'var(--primary)', fontSize: '0.95rem' }} 
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Your Email Address" 
                      value={formData.email} 
                      onChange={handleChange} 
                      style={{ border: '1px solid #e1e8ed', padding: '14px 16px', width: '100%', borderRadius: '10px', backgroundColor: '#f8f9fa', color: 'var(--primary)', fontSize: '0.95rem' }} 
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <input 
                      type="text" 
                      name="subject" 
                      placeholder="Subject (e.g. Surgery inquiry, OPD timing)" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      style={{ border: '1px solid #e1e8ed', padding: '14px 16px', width: '100%', borderRadius: '10px', backgroundColor: '#f8f9fa', color: 'var(--primary)', fontSize: '0.95rem' }} 
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '22px' }}>
                    <textarea 
                      rows="4" 
                      name="message" 
                      placeholder="How can our doctors & medical team assist you? *" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      style={{ border: '1px solid #e1e8ed', padding: '14px 16px', width: '100%', borderRadius: '10px', backgroundColor: '#f8f9fa', color: 'var(--primary)', resize: 'vertical', fontSize: '0.95rem' }}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="btn btn-accent" 
                    style={{ width: '100%', fontSize: '1.05rem', padding: '14px', borderRadius: '10px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Send size={18} />
                    <span>{isSubmitting ? 'Recording Inquiry...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          <div style={{ marginTop: '50px', textAlign: 'center' }} data-aos="zoom-in">
            <h2 className="section-title" style={{ color: 'var(--primary)', marginBottom: '20px' }}>Find Us Here</h2>
            <div className="map-container" style={{ marginTop: '0' }}>
              <iframe 
                src="https://maps.google.com/maps?q=JB+Health+Care,+Bharathi+Nagar,+Reserve+line,+Sivakasi,+Tamil+Nadu+626124&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy"
                title="JB Healthcare Sivakasi Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
