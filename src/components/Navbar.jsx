import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { client } from '../sanity';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0]`).then((data) => {
      setSettings(data);
    }).catch(console.error);
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

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar" style={{ padding: scrolled ? '15px 0' : '25px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo">
          <Link to="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.jpg" alt={`${settings?.hospitalName || 'JB Healthcare'} Logo`} style={{ height: '50px', borderRadius: '50%', backgroundColor: 'white', padding: '2px' }} />
            {settings?.hospitalName || "JB Healthcare"}
          </Link>
        </div>
        
        <div className="mobile-menu-icon" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer', zIndex: 1000 }}>
          {isMobileMenuOpen ? <X size={28} color="var(--white)" /> : <Menu size={28} color="var(--white)" />}
        </div>

        <div className={`nav-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>About Us</Link>
            <Link to="/services" className={location.pathname === '/services' ? 'active' : ''} onClick={closeMenu}>Our Services</Link>
            <Link to="/doctors" className={location.pathname === '/doctors' ? 'active' : ''} onClick={closeMenu}>Doctors</Link>
            <Link to="/events" className={location.pathname === '/events' ? 'active' : ''} onClick={closeMenu}>Events</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>Contact</Link>
          </div>
          <a 
            href={`https://wa.me/${settings?.whatsappNumber ? settings.whatsappNumber.replace(/\D/g, '') : '919345510905'}?text=${encodeURIComponent("Hi, I would like to book an appointment.")}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-accent" 
            style={{ padding: '8px 20px', fontSize: '0.95rem' }}
            onClick={closeMenu}
          >
            Book Appointment
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
