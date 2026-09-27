import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="logo" style={{color: 'var(--white)'}}>JB Healthcare</h3>
            <p>Providing exceptional healthcare services with a focus on patient well-being and advanced medical treatments.</p>
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
