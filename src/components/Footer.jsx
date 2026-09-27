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
              <a href="https://www.facebook.com/100095190337849/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--white)', backgroundColor: 'var(--accent)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/jb.healthcare.sivakasi/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--white)', backgroundColor: 'var(--accent)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://wa.me/919345510905?text=Hi,%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--white)', backgroundColor: 'var(--accent)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={20} />
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
            <ul>
              <li style={{display: 'flex', gap: '10px'}}><MapPin size={18}/> 2/571A, Bharathi Nagar, Reserve line, Vasantham Nagar, Rengapa Shyam Nagar, Anaiyur, Tamil Nadu 626124</li>
              <li style={{display: 'flex', gap: '10px'}}><Phone size={18}/> 093455 10905</li>
              <li style={{display: 'flex', gap: '10px'}}><Mail size={18}/> info@jbhealthcare.com</li>
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
