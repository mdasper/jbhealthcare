import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { client } from '../sanity';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0]`).then((data) => {
      setSettings(data);
    }).catch(console.error);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`} style={{ 
      padding: scrolled ? '12px 0' : '20px 0',
      transform: hidden && !isMobileMenuOpen ? 'translateY(-100%)' : 'translateY(0)'
    }}>
      <div className="container navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '100%' }}>
        <div className="logo">
          <Link to="/" onClick={closeMenu} className="navbar-logo-link">
            <img src="/logo.jpg" alt={`${settings?.hospitalName || 'JB Healthcare'} Logo`} className="navbar-logo-img" />
            <div className="navbar-logo-text">
              <span className="navbar-logo-title">{settings?.hospitalName || "JB Healthcare"}</span>
              <span className="navbar-logo-tagline">Healing Hands, Caring Hearts</span>
            </div>
          </Link>
        </div>
        
        <div className="mobile-menu-icon" onClick={toggleMenu} style={{ cursor: 'pointer', zIndex: 1000 }}>
          {isMobileMenuOpen ? <X size={26} color="#0A2540" /> : <Menu size={26} color="#0A2540" />}
        </div>

        <div className={`nav-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>About Us</Link>
            <Link to="/departments" className={location.pathname === '/departments' ? 'active' : ''} onClick={closeMenu}>Departments</Link>
            <Link to="/doctors" className={location.pathname === '/doctors' ? 'active' : ''} onClick={closeMenu}>Doctors</Link>
            <Link to="/surgeries" className={location.pathname === '/surgeries' ? 'active' : ''} onClick={closeMenu}>Surgeries</Link>
            <Link to="/facilities" className={location.pathname === '/facilities' ? 'active' : ''} onClick={closeMenu}>Facilities</Link>
            <Link to="/events" className={location.pathname === '/events' ? 'active' : ''} onClick={closeMenu}>Events</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>Contact</Link>
          </div>
          
          <div className="nav-actions">
            <a 
              href={`tel:${(settings?.phone || "+91 93455 10905").replace(/\s+/g, "")}`} 
              className="btn-magnetic nav-call-btn"
              title="Call Emergency / Appointments"
            >
              <span className="live-casualty-beacon" />
              <Phone size={15} color="#00B4D8" />
              <span>{settings?.phone || "+91 93455 10905"}</span>
            </a>

            <Link 
              to="/appointment" 
              className="btn btn-magnetic nav-appointment-btn" 
              onClick={closeMenu}
            >
              Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
