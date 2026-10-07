import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Activity } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Facilities from './pages/Facilities';
import Surgeries from './pages/Surgeries';
import Appointment from './pages/Appointment';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });

    // 3-second loading screen
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--primary)' }}>
        <img src="/logo.jpg" alt="JB Healthcare Logo" className="pulse-animation" style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'white', padding: '5px' }} />
        <h2 style={{ color: 'var(--white)', marginTop: '20px', letterSpacing: '2px', animation: 'fadeIn 1.5s infinite alternate' }}>JB HEALTHCARE</h2>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/departments" element={<Services />} />
        <Route path="/surgeries" element={<Surgeries />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <FloatingWhatsApp />
      <Footer />
    </Router>
  );
}

export default App;
