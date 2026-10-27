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
    <nav className="navbar" style={{ 
      padding: scrolled ? '15px 0' : '22px 0',
      transform: hidden ? 'translateY(-100%)' : 'translateY(0)'
    }}>
      <div className="container navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '100%' }}>
        <div className="logo">
          <Link to="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.jpg" alt={`${settings?.hospitalName || 'JB Healthcare'} Logo`} style={{ height: '48px', borderRadius: '50%', backgroundColor: 'white', padding: '2px' }} />
            <div>
              <span style={{ display: 'block', fontWeight: '800', fontSize: '1.25rem', letterSpacing: '0.5px', color: '#0A2540' }}>{settings?.hospitalName || "JB Healthcare"}</span>
              <span style={{ display: 'block', fontSize: '0.72rem', color: '#003852', fontWeight: '700', letterSpacing: '0.5px' }}>Healing Hands, Caring Hearts</span>
            </div>
          </Link>
        </div>
        
        <div className="mobile-menu-icon" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer', zIndex: 1000 }}>
          {isMobileMenuOpen ? <X size={28} color="#0A2540" /> : <Menu size={28} color="#0A2540" />}
        </div>

        <div className={`nav-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div className="nav-links" style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>About Us</Link>
            <Link to="/departments" className={location.pathname === '/departments' ? 'active' : ''} onClick={closeMenu}>Departments</Link>
            <Link to="/doctors" className={location.pathname === '/doctors' ? 'active' : ''} onClick={closeMenu}>Doctors</Link>
            <Link to="/surgeries" className={location.pathname === '/surgeries' ? 'active' : ''} onClick={closeMenu}>Surgeries</Link>
            <Link to="/facilities" className={location.pathname === '/facilities' ? 'active' : ''} onClick={closeMenu}>Facilities</Link>
            <Link to="/events" className={location.pathname === '/events' ? 'active' : ''} onClick={closeMenu}>Events</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>Contact</Link>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a 
              href="tel:+919345510905" 
              className="btn-magnetic"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#0A2540', 
                backgroundColor: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: '25px',
                fontSize: '0.85rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(0, 35, 60, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}
              title="Call Emergency / Appointments"
            >
              <span className="live-casualty-beacon" />
              <Phone size={14} color="#00B4D8" />
              <span>+91 93455 10905</span>
            </a>

            <Link 
              to="/appointment" 
              className="btn btn-magnetic" 
              style={{ 
                padding: '10px 22px', 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                letterSpacing: '0.5px', 
                textTransform: 'uppercase', 
                whiteSpace: 'nowrap',
                borderRadius: '30px',
                backgroundColor: '#0A2540',
                color: '#FFFFFF',
                border: '1px solid rgba(10, 37, 64, 0.4)',
                boxShadow: '0 4px 15px rgba(10, 37, 64, 0.3)'
              }}
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
