import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar" style={{ padding: scrolled ? '15px 0' : '25px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo"><Link to="/" onClick={closeMenu}>JB Healthcare</Link></div>
        
        <div className="mobile-menu-icon" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer', zIndex: 1000 }}>
          {isMobileMenuOpen ? <X size={28} color="var(--primary)" /> : <Menu size={28} color={scrolled ? "var(--primary)" : "var(--primary)"} />}
        </div>

        <div className={`nav-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>About Us</Link>
            <Link to="/services" className={location.pathname === '/services' ? 'active' : ''} onClick={closeMenu}>Our Services</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>Contact</Link>
          </div>
          <a 
            href={`https://wa.me/919345510905?text=${encodeURIComponent("Hi, I would like to book an appointment.")}`} 
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
