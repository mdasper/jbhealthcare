import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { client } from '../sanity';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0]`).then((data) => {
      setSettings(data);
    }).catch(console.error);
  }, []);

  const hospitalName = "JB Healthcare";
  const phone = "+91 93455 10905";
  const landline = "04562-299920";
  const whatsappNumber = "919345510905";
  const email = "info@jbhealthcare.com";
  const address = "2/571A, Bharathi Nagar, Reserve line, Vasantham Nagar, Rengapa Shyam Nagar, Anaiyur, Tamil Nadu 626124";
  
  // Format WhatsApp number to remove non-numeric chars for the URL
  let whatsappClean = whatsappNumber.replace(/\D/g, '');
  if (whatsappClean.length === 10) {
    whatsappClean = '91' + whatsappClean;
  }

  const quickLinksCol1 = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Surgeries', path: '/surgeries' },
  ];

  const quickLinksCol2 = [
    { name: 'Facilities', path: '/facilities' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Events', path: '/events' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="footer-luxury">
      
      {/* Main Full-Width Luxury Footer Body */}
      <div className="footer-main-body">
        <div style={{ width: '100%', maxWidth: 'none', margin: '0', padding: '60px 50px 30px' }}>
          <div className="footer-luxury-grid">
            
            {/* Column 1: Hospital Identity */}
            <div className="footer-brand-col">
              <div className="footer-brand-header">
                <div className="footer-logo-ring">
                  <img src="/logo.jpg" alt="JB Healthcare Logo" className="footer-logo-img" />
                </div>
                <div>
                  <h3 className="footer-brand-title">{hospitalName}</h3>
                  <div className="footer-brand-slogan">
                    <Sparkles size={13} color="#00B4D8" /> Healing Hands, Caring Hearts
                  </div>
                </div>
              </div>

              <p className="footer-brand-desc">
                Sivakasi's trusted center for advanced laparoscopic surgery, emergency trauma triage, and multi-speciality clinical care led by <strong>Dr. B. Saileshkumar</strong>.
              </p>

              {/* Social Media Links */}
              <div className="footer-social-row">
                <a 
                  href="https://www.facebook.com/100095190337849/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-icon fb"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a 
                  href="https://www.instagram.com/jb.healthcare.sivakasi/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-icon insta"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a 
                  href={`https://api.whatsapp.com/send?phone=${whatsappClean}&text=Hi,%20I%20would%20like%20to%20book%20an%20appointment.`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-icon wa"
                  aria-label="WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (2-Column Grid with Hover Arrows) */}
            <div className="footer-links-col">
              <h4 className="footer-col-title">Quick Navigation</h4>
              <div className="footer-nav-2col">
                <ul className="footer-nav-list">
                  {quickLinksCol1.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="footer-nav-link">
                        <ArrowRight size={13} className="footer-nav-arrow" /> {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="footer-nav-list">
                  {quickLinksCol2.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="footer-nav-link">
                        <ArrowRight size={13} className="footer-nav-arrow" /> {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Opening Hours (Clean, Non-repetitive & Perfectly Aligned) */}
            <div className="footer-hours-col">
              <div className="footer-hours-card">
                <div className="footer-hours-header">
                  <Clock size={18} color="#00B4D8" />
                  <span className="footer-hours-title">Working Hours</span>
                </div>

                <div className="footer-schedule-list">
                  <div className="footer-schedule-row">
                    <span className="sched-label">Emergency & Casualty:</span>
                    <span className="sched-badge red">24/7 Open</span>
                  </div>

                  <div className="footer-schedule-row">
                    <span className="sched-label">Doctor OPD Timings:</span>
                    <span className="sched-val">09:00 AM – 08:00 PM</span>
                  </div>

                  <div className="footer-schedule-row">
                    <span className="sched-label">Inpatient & Pharmacy:</span>
                    <span className="sched-badge green">24 Hours Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Contact & Hospital Address Cards */}
            <div className="footer-contact-col">
              <h4 className="footer-col-title">Contact & Location</h4>
              
              <div className="footer-contact-cards">
                
                {/* Address Card */}
                <a 
                  href="https://maps.google.com/?q=2/571A,+Bharathi+Nagar,+Reserve+line,+Vasantham+Nagar,+Rengapa+Shyam+Nagar,+Anaiyur,+Tamil+Nadu+626124" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-info-item"
                >
                  <div className="footer-info-icon-box">
                    <MapPin size={17} />
                  </div>
                  <div className="footer-info-text">
                    <span className="footer-info-label">Hospital Address</span>
                    <p className="footer-info-val address">{address}</p>
                    <span className="footer-info-action">View Map Directions &rarr;</span>
                  </div>
                </a>

                {/* Phone Card */}
                <div className="footer-info-item">
                  <div className="footer-info-icon-box">
                    <Phone size={17} />
                  </div>
                  <div className="footer-info-text">
                    <span className="footer-info-label">Direct Lines</span>
                    <div className="footer-phone-links">
                      <a href="tel:04562299920" className="footer-phone-anchor">
                        <strong>04562-299920</strong> <span className="phone-tag">Hospital</span>
                      </a>
                      <a href={`https://api.whatsapp.com/send?phone=${whatsappClean}`} target="_blank" rel="noopener noreferrer" className="footer-phone-anchor">
                        <strong>{phone}</strong> <span className="phone-tag wa">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <a href={`mailto:${email}`} className="footer-info-item">
                  <div className="footer-info-icon-box">
                    <Mail size={17} />
                  </div>
                  <div className="footer-info-text">
                    <span className="footer-info-label">Official Email</span>
                    <span className="footer-info-val email">{email}</span>
                  </div>
                </a>

              </div>
            </div>

          </div>

          {/* Bottom Legal Strip */}
          <div className="footer-bottom-strip">
            <div className="footer-bottom-left">
              &copy; {new Date().getFullYear()} {hospitalName}. All rights reserved.
            </div>
            <div className="footer-bottom-right">
              <span>Patient Safety First</span>
              <span className="footer-dot-sep">•</span>
              <span>Advanced Laparoscopic Surgery</span>
              <span className="footer-dot-sep">•</span>
              <span>24/7 Clinical Care</span>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
