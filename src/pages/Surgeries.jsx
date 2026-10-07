import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Scissors, Heart, Bone, Baby, BrainCircuit } from 'lucide-react';

const surgeriesData = [
  {
    id: 1,
    title: "Advanced Laparoscopic Surgery",
    description: "Minimally invasive keyhole surgeries for gallbladder, appendicitis, and hernia with faster recovery, less pain, and minimal scarring.",
    icon: <Scissors size={32} color="var(--white)" />,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Faster Recovery", "Minimal Scarring", "Shorter Hospital Stay"]
  },
  {
    id: 2,
    title: "Joint Replacement Surgery",
    description: "Expert hip and knee replacement surgeries using advanced implants and robotic-assisted technology for perfect alignment and longevity.",
    icon: <Bone size={32} color="var(--white)" />,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Robotic Assistance", "Pain-free Walking", "Expert Orthos"]
  },
  {
    id: 3,
    title: "Cardiac Surgeries",
    description: "Comprehensive heart care including bypass surgeries (CABG), valve replacements, and pacemaker implantations by top cardiothoracic surgeons.",
    icon: <Heart size={32} color="var(--white)" />,
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Dedicated Cardiac OT", "24/7 Monitoring", "High Success Rate"]
  },
  {
    id: 4,
    title: "Maternity & Caesarean Section",
    description: "Safe and hygienic delivery procedures. We encourage normal deliveries but are fully equipped for emergency and planned C-sections.",
    icon: <Baby size={32} color="var(--white)" />,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Expert Obstetricians", "Advanced NICU", "Painless Delivery"]
  },
  {
    id: 5,
    title: "Neurosurgery & Spine",
    description: "Complex brain and spine surgeries, including tumor removals, spinal fusions, and trauma care using high-precision microscopes.",
    icon: <BrainCircuit size={32} color="var(--white)" />,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Neuro-navigation", "Microscopic Precision", "Trauma Care"]
  },
  {
    id: 6,
    title: "General Surgeries",
    description: "A wide range of conventional open surgeries for trauma, gastroenterology, and complex internal medical conditions.",
    icon: <Activity size={32} color="var(--white)" />,
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Experienced Surgeons", "ICU Backup", "Infection-free OT"]
  }
];

const Surgeries = () => {
  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      
      {/* Hero Section */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 80px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: 'var(--white)', fontSize: '3.5rem', marginBottom: '20px' }}>Surgeries & Treatments</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
            JB Healthcare is a center of excellence for advanced surgical procedures. We specialize in minimally invasive laparoscopic surgeries, ensuring quick recovery and precision care.
          </p>
        </div>
      </section>

      {/* Featured: Laparoscopic Highlight */}
      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div style={{ backgroundColor: 'var(--secondary)', borderRadius: '24px', padding: '60px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ flex: '1', minWidth: '300px' }} data-aos="fade-right">
              <span style={{ backgroundColor: 'var(--accent)', color: 'var(--white)', padding: '6px 16px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Speciality</span>
              <h2 style={{ color: 'var(--primary)', fontSize: '2.8rem', marginTop: '20px', marginBottom: '20px', lineHeight: '1.2' }}>Center for Excellence in Laparoscopic Surgery</h2>
              <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
                Laparoscopy (Keyhole Surgery) is a minimally invasive technique that uses a thin, lighted tube put through an incision in the belly to look at the abdominal organs. 
                At JB Healthcare, we perform advanced laparoscopy for gall bladder, appendix, hernia, and gynaecological issues, resulting in minimal blood loss and highly successful outcomes.
              </p>
              <Link to="/contact" className="btn btn-accent" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>Consult a Surgeon</Link>
            </div>
            <div style={{ flex: '1', minWidth: '300px', height: '400px', borderRadius: '16px', overflow: 'hidden' }} data-aos="fade-left">
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Laparoscopic Surgery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Other Surgeries Grid */}
      <section className="section" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 className="section-title">Comprehensive Surgical Care</h2>
            <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Explore our range of surgical specialties performed by industry-leading experts in world-class operation theatres.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {surgeriesData.map((surgery, index) => (
              <div 
                key={surgery.id} 
                className="surgery-card" 
                data-aos="fade-up" 
                data-aos-delay={`${(index % 3 + 1) * 100}`} 
                style={{ backgroundColor: 'var(--primary)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', transition: 'all 0.4s ease', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img src={surgery.image} alt={surgery.title} className="surgery-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                  <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: 'var(--accent)', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(224,169,109,0.4)' }}>
                    {surgery.icon}
                  </div>
                </div>
                
                <div style={{ padding: '30px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: 'var(--white)', fontSize: '1.5rem', marginBottom: '15px' }}>{surgery.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', marginBottom: '20px', flex: '1' }}>{surgery.description}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
                    {surgery.features.map((feature, i) => (
                      <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--accent)', fontSize: '0.85rem', padding: '4px 12px', borderRadius: '20px', fontWeight: '600', border: '1px solid rgba(224,169,109,0.3)' }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Link to={{ pathname: "/appointment" }} state={{ department: surgery.title }} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 'bold', textDecoration: 'none' }} className="surgery-link">
                    Book Consultation <Activity size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .surgery-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important; }
        .surgery-card:hover .surgery-img { transform: scale(1.08); }
        .surgery-link:hover { opacity: 0.8; }
      `}</style>
      
    </div>
  );
};

export default Surgeries;
