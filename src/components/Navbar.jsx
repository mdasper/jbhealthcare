import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar" style={{ padding: scrolled ? '15px 0' : '25px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo"><Link to="/">JB Healthcare</Link></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link>
            <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Our Services</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          </div>
          <a 
            href={`https://wa.me/919345510905?text=${encodeURIComponent("Hi, I would like to book an appointment.")}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-accent" 
            style={{ padding: '8px 20px', fontSize: '0.95rem' }}
          >
            Book Appointment
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
