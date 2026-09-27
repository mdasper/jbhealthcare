import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="logo" style={{color: 'var(--white)'}}>JB Healthcare</h3>
            <p>Providing exceptional healthcare services with a focus on patient well-being and advanced medical treatments.</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <a href="https://www.facebook.com/100095190337849/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--white)', backgroundColor: '#1877F2', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/jb.healthcare.sivakasi/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--white)', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://wa.me/919345510905?text=Hi,%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--white)', backgroundColor: '#25D366', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contact Info</h3>
            <ul className="footer-contact-links">
              <li style={{display: 'flex', gap: '10px'}}>
                <MapPin size={18} style={{ flexShrink: 0, marginTop: '4px' }}/>
                <a href="https://maps.google.com/?q=2/571A,+Bharathi+Nagar,+Reserve+line,+Vasantham+Nagar,+Rengapa+Shyam+Nagar,+Anaiyur,+Tamil+Nadu+626124" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  2/571A, Bharathi Nagar, Reserve line, Vasantham Nagar, Rengapa Shyam Nagar, Anaiyur, Tamil Nadu 626124
                </a>
              </li>
              <li style={{display: 'flex', gap: '10px'}}>
                <Phone size={18} style={{ flexShrink: 0 }}/>
                <a href="https://wa.me/919345510905" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  093455 10905
                </a>
              </li>
              <li style={{display: 'flex', gap: '10px'}}>
                <Mail size={18} style={{ flexShrink: 0 }}/>
                <a href="mailto:info@jbhealthcare.com" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  info@jbhealthcare.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} JB Healthcare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
