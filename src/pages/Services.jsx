import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ClipboardList, Clock, PhoneCall, Heart, Baby, Brain, Syringe, Stethoscope, Scissors } from 'lucide-react';
import { client } from '../sanity';

const fallbackDepartments = [
  { _id: '1', title: 'Cardiology', description: 'Comprehensive heart care including advanced diagnostics, preventive cardiology, and interventional procedures.', icon: 'Heart' },
  { _id: '2', title: 'Paediatrics', description: 'Expert medical care for infants, children, and adolescents, focusing on their physical and emotional well-being.', icon: 'Baby' },
  { _id: '3', title: 'Neurology', description: 'Advanced diagnosis and treatment for disorders of the nervous system, brain, and spinal cord.', icon: 'Brain' },
  { _id: '4', title: 'Orthopaedics', description: 'Specialized care for bones, joints, ligaments, tendons, and muscles, including joint replacements and trauma care.', icon: 'Activity' },
  { _id: '5', title: 'General Medicine', description: 'Primary care focusing on the prevention, diagnosis, and treatment of adult diseases with a holistic approach.', icon: 'Stethoscope' },
  { _id: '6', title: 'Laparoscopic Surgery', description: 'Minimally invasive surgical procedures offering faster recovery, less pain, and minimal scarring.', icon: 'Scissors' },
  { _id: '7', title: 'Gynaecology', description: 'Comprehensive women\'s health care from adolescence through menopause, including maternity services.', icon: 'Activity' },
  { _id: '8', title: 'ENT (Otolaryngology)', description: 'Expert treatment for conditions affecting the ear, nose, and throat, including complex surgical procedures.', icon: 'Syringe' }
];

const IconMapper = ({ name, size, color }) => {
  switch (name) {
    case 'Heart': return <Heart size={size} color={color} />;
    case 'Baby': return <Baby size={size} color={color} />;
    case 'Brain': return <Brain size={size} color={color} />;
    case 'Stethoscope': return <Stethoscope size={size} color={color} />;
    case 'Scissors': return <Scissors size={size} color={color} />;
    case 'Syringe': return <Syringe size={size} color={color} />;
    default: return <Activity size={size} color={color} />;
  }
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ padding: '150px 50px', textAlign: 'center', color: 'red' }}><h1>Something went wrong.</h1><p>{this.state.error?.message}</p></div>;
    }
    return this.props.children;
  }
}

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(`*[_type == "service"]`).then((data) => {
      if (data && data.length > 0) {
        setServices(data);
      } else {
        setServices(fallbackDepartments);
      }
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setServices(fallbackDepartments);
      setLoading(false);
    });
  }, []);

  return (
    <ErrorBoundary>
    <div className="page-transition" style={{ backgroundColor: 'var(--secondary)', minHeight: '100vh' }}>
      
      {/* 1. Ultra Premium Header */}
      <section style={{ 
        padding: '160px 0 100px', 
        background: 'linear-gradient(rgba(10, 43, 78, 0.9), rgba(10, 43, 78, 0.8)), url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        <div className="container" data-aos="fade-up">
          <h1 style={{ color: 'var(--accent)', fontSize: '3.8rem', marginBottom: '20px', letterSpacing: '1px', fontWeight: 'bold' }}>Centers of Excellence</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8' }}>
            JB Healthcare offers a comprehensive range of medical services under one roof. From preventive health check-ups to advanced surgical interventions, our specialized departments are equipped to handle all your health needs.
          </p>
        </div>
      </section>

      {/* 2. Departments Grid */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '15px' }}>Our Specialized Departments</h2>
            <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--accent)', margin: '0 auto 40px auto', borderRadius: '2px' }}></div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h3 style={{ color: 'var(--primary)' }}>Loading Departments...</h3>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              {services.map((service, index) => (
                <div 
                  key={service._id} 
                  className="dept-card-hover"
                  data-aos="fade-up" 
                  data-aos-delay={`${(index % 4) * 100}`} 
                  style={{ 
                    backgroundColor: 'var(--primary)', 
                    color: 'var(--white)', 
                    borderRadius: '16px', 
                    padding: '40px 30px', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)', 
                    textAlign: 'left', 
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    borderBottom: '4px solid transparent'
                  }} 
                >
                  <div style={{ 
                    width: '75px', 
                    height: '75px', 
                    backgroundColor: 'rgba(224, 169, 109, 0.1)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '25px',
                    transition: 'all 0.3s ease'
                  }} className="icon-container">
                    <IconMapper name={service.icon} size={38} color="var(--accent)" />
                  </div>
                  <h3 style={{ color: 'var(--white)', fontSize: '1.5rem', marginBottom: '15px', fontWeight: 'bold' }}>{service.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', marginBottom: '25px', fontSize: '1rem' }}>{service.description}</p>
                  
                  <Link 
                    to={{ pathname: "/appointment" }} 
                    state={{ department: service.title }}
                    className="btn-dept-link"
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      color: 'var(--accent)', 
                      fontWeight: '700', 
                      textDecoration: 'none',
                      fontSize: '1rem',
                      transition: 'gap 0.3s'
                    }}
                  >
                    Book Appointment <span style={{ marginLeft: '8px' }}>&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 3. Comprehensive Health Packages */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '50px' }}>
            
            <div data-aos="fade-right" style={{ flex: '1 1 500px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--accent)' }}>Preventive Health Packages</h2>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '30px', color: 'rgba(255,255,255,0.9)' }}>
                Prevention is always better than cure. We offer a variety of tailor-made master health check-up packages designed for different age groups and lifestyles. Regular screenings help in early detection and complete cure of potential health risks.
              </p>
              
              <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {['Basic Wellness Package', 'Senior Citizen Care', 'Comprehensive Diabetic Profile', 'Complete Cardiac Evaluation'].map((pkg, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Activity size={20} color="var(--accent)" /> {pkg}
                  </li>
                ))}
              </ul>
              
              <Link to="/contact" className="btn btn-accent" style={{ marginTop: '40px', display: 'inline-block', padding: '15px 30px', fontSize: '1.1rem', borderRadius: '8px' }}>Enquire About Packages</Link>
            </div>
            
            <div data-aos="fade-left" style={{ flex: '1 1 400px' }}>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Health Packages" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '50px 30px 30px', background: 'linear-gradient(to top, rgba(10, 43, 78, 0.95) 0%, rgba(10, 43, 78, 0.7) 60%, transparent 100%)' }}>
                  <h3 style={{ color: 'var(--accent)', fontSize: '1.5rem', marginBottom: '5px' }}>Master Health Checkup</h3>
                  <p style={{ color: 'white', margin: 0 }}>Starting from ₹1,999/-</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. How It Works / Patient Journey */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--secondary)' }}>
        <div className="container text-center">
          <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '15px' }} data-aos="fade-up">Your Seamless Healthcare Journey</h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--accent)', margin: '0 auto 60px auto', borderRadius: '2px' }} data-aos="fade-up"></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: '40px 30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} data-aos="fade-up" data-aos-delay="100">
              <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(224, 169, 109, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px auto' }}>
                <PhoneCall size={36} color="var(--accent)" />
              </div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.4rem', marginBottom: '15px' }}>1. Book Appointment</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Easily schedule your visit via WhatsApp or call us directly. Say goodbye to long waiting queues.</p>
            </div>
            
            <div style={{ backgroundColor: 'var(--white)', padding: '40px 30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} data-aos="fade-up" data-aos-delay="200">
              <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(224, 169, 109, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px auto' }}>
                <ClipboardList size={36} color="var(--accent)" />
              </div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.4rem', marginBottom: '15px' }}>2. Expert Consultation</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Meet our specialists for a detailed, unhurried diagnosis and personalized treatment plan.</p>
            </div>
            
            <div style={{ backgroundColor: 'var(--white)', padding: '40px 30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} data-aos="fade-up" data-aos-delay="300">
              <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(224, 169, 109, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px auto' }}>
                <Clock size={36} color="var(--accent)" />
              </div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.4rem', marginBottom: '15px' }}>3. Quick Recovery</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Receive top-tier medical care, constant monitoring, and follow-ups to ensure a swift recovery.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .dept-card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
          border-bottom-color: var(--accent) !important;
        }
        .dept-card-hover:hover .icon-container {
          background-color: var(--accent) !important;
        }
        .dept-card-hover:hover .icon-container svg {
          color: white !important;
        }
        .btn-dept-link:hover {
          gap: 15px !important;
        }
      `}</style>
      
    </div>
    </ErrorBoundary>
  );
};

export default Services;
