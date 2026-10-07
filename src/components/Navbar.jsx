import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
      padding: scrolled ? '15px 0' : '25px 0',
      transform: hidden ? 'translateY(-100%)' : 'translateY(0)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '100%', padding: '0 40px' }}>
        <div className="logo">
          <Link to="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.jpg" alt={`${settings?.hospitalName || 'JB Healthcare'} Logo`} style={{ height: '50px', borderRadius: '50%', backgroundColor: 'white', padding: '2px' }} />
            {settings?.hospitalName || "JB Healthcare"}
          </Link>
        </div>
        
        <div className="mobile-menu-icon" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer', zIndex: 1000 }}>
          {isMobileMenuOpen ? <X size={28} color="var(--white)" /> : <Menu size={28} color="var(--white)" />}
        </div>

        <div className={`nav-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
          <div className="nav-links" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>About Us</Link>
            <Link to="/departments" className={location.pathname === '/departments' ? 'active' : ''} onClick={closeMenu}>Departments</Link>
            <Link to="/doctors" className={location.pathname === '/doctors' ? 'active' : ''} onClick={closeMenu}>Doctors</Link>
            <Link to="/surgeries" className={location.pathname === '/surgeries' ? 'active' : ''} onClick={closeMenu}>Surgeries</Link>
            <Link to="/facilities" className={location.pathname === '/facilities' ? 'active' : ''} onClick={closeMenu}>Facilities</Link>
            <Link to="/events" className={location.pathname === '/events' ? 'active' : ''} onClick={closeMenu}>Events</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>Contact</Link>
          </div>
          <Link 
            to="/appointment" 
            className="btn btn-accent premium-book-btn" 
            style={{ 
              padding: '12px 28px', 
              fontSize: '0.9rem', 
              fontWeight: '700', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              whiteSpace: 'nowrap',
              borderRadius: '30px',
              border: '1px solid rgba(224, 169, 109, 0.5)',
              boxShadow: '0 4px 20px rgba(224, 169, 109, 0.3)'
            }}
            onClick={closeMenu}
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
