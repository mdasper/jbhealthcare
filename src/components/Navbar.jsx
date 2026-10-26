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
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '100%', padding: '0 40px' }}>
        <div className="logo">
          <Link to="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.jpg" alt={`${settings?.hospitalName || 'JB Healthcare'} Logo`} style={{ height: '48px', borderRadius: '50%', backgroundColor: 'white', padding: '2px' }} />
            <div>
              <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '0.5px' }}>{settings?.hospitalName || "JB Healthcare"}</span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: '600', letterSpacing: '0.5px' }}>Healing Hands, Caring Hearts</span>
            </div>
          </Link>
        </div>
        
        <div className="mobile-menu-icon" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer', zIndex: 1000 }}>
          {isMobileMenuOpen ? <X size={28} color="var(--white)" /> : <Menu size={28} color="var(--white)" />}
        </div>

        <div className={`nav-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div className="nav-links" style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>About Us</Link>
            <Link to="/departments" className={location.pathname === '/departments' ? 'active' : ''} onClick={closeMenu}>Departments</Link>
            {/* Symptom Finder 3D Tab (Temporarily commented out - uncomment when needed) */}
            {/* 
            <Link 
              to="/symptom-explorer" 
              className={`symptom-nav-link ${location.pathname === '/symptom-explorer' ? 'active' : ''}`} 
              onClick={closeMenu}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Symptom Finder</span>
              <span style={{ 
                fontSize: '0.62rem', 
                backgroundColor: 'rgba(224, 169, 109, 0.22)', 
                color: 'var(--accent)', 
                border: '1px solid rgba(224, 169, 109, 0.5)', 
                padding: '1px 6px', 
                borderRadius: '8px', 
                fontWeight: '800',
                letterSpacing: '0.5px'
              }}>
                3D
              </span>
            </Link>
            */}
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
                color: 'var(--white)', 
                backgroundColor: 'rgba(255,255,255,0.08)',
                padding: '8px 14px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: '600',
                textDecoration: 'none',
                border: '1px solid rgba(224, 169, 109, 0.4)'
              }}
              title="Call Emergency / Appointments"
            >
              <span className="live-casualty-beacon" />
              <Phone size={14} color="var(--accent)" />
              <span>+91 93455 10905</span>
            </a>

            <Link 
              to="/appointment" 
              className="btn btn-accent premium-book-btn btn-magnetic" 
              style={{ 
                padding: '10px 22px', 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                letterSpacing: '0.5px', 
                textTransform: 'uppercase', 
                whiteSpace: 'nowrap',
                borderRadius: '30px',
                border: '1px solid rgba(224, 169, 109, 0.5)',
                boxShadow: '0 4px 20px rgba(224, 169, 109, 0.3)'
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
