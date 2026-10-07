import React from 'react';
import { Activity, ShieldPlus, HeartPulse, Stethoscope, Microscope, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';

const facilitiesData = [
  {
    id: 1,
    title: "24/7 Advanced ICU",
    description: "State-of-the-art Intensive Care Unit equipped with advanced ventilators, multiparameter monitors, and round-the-clock intensivist support for critical patients.",
    icon: <HeartPulse size={40} color="var(--accent)" />,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Modular Operation Theatres",
    description: "Highly sterile, infection-free modular OTs designed for complex surgeries including laparoscopic, orthopedic, and cardiac procedures.",
    icon: <Activity size={40} color="var(--accent)" />,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "24/7 Emergency Care",
    description: "Dedicated emergency response team with fully equipped ambulances and a trauma care center ready to handle medical emergencies at any time.",
    icon: <ShieldPlus size={40} color="var(--accent)" />,
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Advanced Diagnostics & Lab",
    description: "In-house NABL accredited laboratory offering comprehensive blood tests, pathology, and microbiology services with accurate, fast results.",
    icon: <Microscope size={40} color="var(--accent)" />,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "24/7 Pharmacy",
    description: "Well-stocked in-house pharmacy ensuring all essential life-saving medicines and regular prescriptions are available round the clock.",
    icon: <Pill size={40} color="var(--accent)" />,
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Premium Patient Wards",
    description: "Comfortable, hygienic, and spacious recovery rooms ranging from general wards to deluxe private suites with attender facilities.",
    icon: <Stethoscope size={40} color="var(--accent)" />,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const Facilities = () => {
  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      
      {/* Hero Section */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 100px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: 'var(--white)', fontSize: '3.5rem', marginBottom: '20px' }}>World-Class Facilities</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
            At JB Healthcare, we integrate cutting-edge medical technology with compassionate care. Our infrastructure is designed to provide the highest standards of safety, comfort, and clinical excellence.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            
            {facilitiesData.map((facility, index) => (
              <div 
                key={facility.id} 
                className="facility-card" 
                data-aos="fade-up" 
                data-aos-delay={`${(index % 3 + 1) * 100}`} 
                style={{ backgroundColor: 'var(--primary)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.2)', transition: 'transform 0.4s ease, box-shadow 0.4s ease', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={facility.image} 
                    alt={facility.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    className="facility-img-hover"
                  />
                  <div style={{ position: 'absolute', bottom: '-1px', left: '0', width: '100%', height: '50px', background: 'linear-gradient(to top, var(--primary), transparent)' }}></div>
                </div>
                
                <div style={{ padding: '30px', position: 'relative', flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'absolute', top: '-40px', right: '30px', width: '70px', height: '70px', backgroundColor: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', border: '2px solid var(--accent)' }}>
                    {facility.icon}
                  </div>
                  
                  <h3 style={{ color: 'var(--white)', fontSize: '1.6rem', marginBottom: '15px', paddingRight: '50px' }}>{facility.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '0', flex: '1' }}>{facility.description}</p>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ backgroundColor: 'var(--white)', textAlign: 'center' }}>
        <div className="container" data-aos="zoom-in">
          <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '20px' }}>Need Immediate Medical Assistance?</h2>
          <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Our emergency and critical care departments are operational 24/7. Contact us immediately for swift response and expert care.
          </p>
          <Link to="/contact" className="btn btn-accent" style={{ padding: '15px 40px', fontSize: '1.1rem', fontWeight: 'bold' }}>
            Contact Emergency Services
          </Link>
        </div>
      </section>

      <style>{`
        .facility-card:hover { transform: translateY(-10px); box-shadow: 0 25px 50px rgba(0,0,0,0.12) !important; }
        .facility-card:hover .facility-img-hover { transform: scale(1.08) !important; }
      `}</style>
      
    </div>
  );
};

export default Facilities;
