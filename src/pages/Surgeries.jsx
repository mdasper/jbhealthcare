import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, CheckCircle, ShieldCheck } from 'lucide-react';

const laparoscopicSurgeries = [
  {
    id: 'lap-1',
    englishTitle: "Laparoscopic Hysterectomy",
    tamilTitle: "கருப்பை நீக்கம்",
    subtitle: "Uterus Removal Surgery",
    description: "Minimally invasive keyhole removal of the uterus with minimal blood loss, no visible scarring, and faster return to routine life.",
    features: ["Quick Recovery", "Minimal Scarring", "Painless Technique"]
  },
  {
    id: 'lap-2',
    englishTitle: "Laparoscopic Appendectomy",
    tamilTitle: "குடல்வால்",
    subtitle: "Appendix Removal Surgery",
    description: "Precision keyhole removal for acute and chronic appendicitis, preventing rupture and ensuring immediate pain relief.",
    features: ["24/7 Emergency Care", "Same-day/Next-day Discharge", "Infection Free"]
  },
  {
    id: 'lap-3',
    englishTitle: "Laparoscopic Cholecystectomy",
    tamilTitle: "பித்தப்பை",
    subtitle: "Gall Bladder & Gallstone Surgery",
    description: "Gold-standard laparoscopic procedure to safely remove gallstones and diseased gallbladder with supreme microscopic precision.",
    features: ["Gold Standard", "No Large Incisions", "Rapid Healing"]
  },
  {
    id: 'lap-4',
    englishTitle: "Laparoscopic Hernia Repair",
    tamilTitle: "குடல் இறக்கம்",
    subtitle: "Hernia Mesh Surgery",
    description: "Minimally invasive keyhole mesh repair for inguinal, umbilical, and ventral hernias ensuring durable strength and low recurrence.",
    features: ["Advanced Mesh Fixation", "Minimal Soreness", "Early Mobility"]
  },
  {
    id: 'lap-5',
    englishTitle: "Laparoscopic Ovarian Cystectomy",
    tamilTitle: "நீர்க்கட்டி",
    subtitle: "Ovarian Cyst Removal Surgery",
    description: "Delicate laparoscopic removal of ovarian cysts while protecting the ovary and preserving natural fertility.",
    features: ["Fertility Preservation", "Microsurgical Care", "Quick Discharge"]
  },
  {
    id: 'lap-6',
    englishTitle: "Laparoscopic Sterilization",
    tamilTitle: "குடும்பக் கட்டுப்பாடு",
    subtitle: "Keyhole Family Planning Procedure",
    description: "Safe, rapid, and painless permanent family planning procedure performed through a minute keyhole incision.",
    features: ["Scarless Procedure", "Same-day Discharge", "High Safety Standard"]
  }
];

const Surgeries = () => {
  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      
      {/* Hero Section */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 80px' }}>
        <div className="container text-center" data-aos="fade-up">
          <span style={{ color: '#061D38', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.95rem' }}>
            Healing Hands, Caring Hearts
          </span>
          <h1 style={{ color: '#061D38', fontSize: '3.5rem', marginTop: '10px', marginBottom: '20px', fontWeight: '800' }}>
            Surgeries & Advanced Laparoscopy
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '850px', margin: '0 auto', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)', lineHeight: '1.8' }}>
            JB Healthcare is a premier surgical center of excellence in Sivakasi & Virudhunagar district. Under the expertise of Dr. B. Saileshkumar (10,000+ Surgeries), we specialize in world-class minimally invasive laparoscopic procedures.
          </p>
        </div>
      </section>

      {/* 6 Key Laparoscopic Surgeries Highlighted Directly from Client Banner */}
      <section className="section" style={{ backgroundColor: 'var(--white)', padding: '70px 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '50px' }} data-aos="fade-up">
            <span style={{ backgroundColor: 'var(--accent)', color: 'var(--primary)', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Speciality Highlight
            </span>
            <h2 style={{ color: 'var(--primary)', fontSize: '2.4rem', marginTop: '15px', marginBottom: '10px' }}>
              Advanced Laparoscopic Surgeries
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
              Keyhole Minimally Invasive Surgeries Performed with Advanced High-Definition Medical Systems
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {laparoscopicSurgeries.map((item, index) => (
              <div 
                key={item.id} 
                data-aos="fade-up" 
                data-aos-delay={`${(index + 1) * 100}`}
                style={{ 
                  backgroundColor: 'var(--secondary)', 
                  border: '1px solid rgba(10, 43, 78, 0.08)',
                  borderRadius: '16px', 
                  padding: '30px', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                className="lap-card-hover"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <span style={{ backgroundColor: 'var(--primary)', color: 'var(--accent)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      0{index + 1}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>Minimally Invasive</span>
                  </div>

                  <h3 style={{ color: 'var(--primary)', fontSize: '1.45rem', marginBottom: '6px', lineHeight: '1.3' }}>
                    {item.englishTitle}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    <span style={{ backgroundColor: 'rgba(224, 169, 109, 0.2)', color: 'var(--primary)', border: '1px solid var(--accent)', padding: '2px 10px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                      {item.tamilTitle}
                    </span>
                    <span style={{ color: '#666', fontSize: '0.85rem', fontWeight: '500' }}>
                      • {item.subtitle}
                    </span>
                  </div>

                  <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    {item.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {item.features.map((feat, fIdx) => (
                      <span key={fIdx} style={{ backgroundColor: '#fff', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '600', padding: '4px 10px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        ✓ {feat}
                      </span>
                    ))}
                  </div>

                  <Link 
                    to="/appointment" 
                    state={{ department: `Laparoscopic Surgery - ${item.englishTitle} (${item.tamilTitle})`, doctorName: "Dr. B. Saileshkumar" }}
                    className="btn btn-primary"
                    style={{ width: '100%', textAlign: 'center', padding: '10px', borderRadius: '8px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Calendar size={16} /> Consult Chief Surgeon
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Featured: Center for Laparoscopic Surgery Highlight */}
      <section className="section" style={{ backgroundColor: '#f4f7fb', padding: '80px 0' }}>
        <div className="container">
          <div style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderRadius: '24px', padding: '50px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px', boxShadow: '0 20px 40px rgba(10,43,78,0.2)' }}>
            <div style={{ flex: '1', minWidth: '300px' }} data-aos="fade-right">
              <span style={{ backgroundColor: 'var(--accent)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Center of Surgical Excellence
              </span>
              <h2 style={{ color: 'var(--white)', fontSize: '2.5rem', marginTop: '16px', marginBottom: '16px', lineHeight: '1.2' }}>
                Why Choose JB Healthcare for Laparoscopy?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '25px' }}>
                Under the lead of Dr. B. Saileshkumar (MBBS MMC, MS MMC, FIAGES, FALS), JB Healthcare has performed over <strong>2,000+ laparoscopic surgeries</strong> and <strong>10,000+ total surgical procedures</strong>. With high-resolution camera towers, ultra-fine instrumentation, and advanced anesthesia protocols, patients experience less pain, zero ugly stitches, and prompt return to home.
              </p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link to="/appointment" state={{ doctorName: "Dr. B. Saileshkumar", department: "Laparoscopic & General Surgery" }} className="btn btn-accent" style={{ padding: '12px 28px', fontSize: '1rem' }}>
                  Book Surgical Consultation
                </Link>
                <a href="tel:04562299920" className="btn btn-outline" style={{ padding: '12px 28px', fontSize: '1rem', borderColor: 'var(--white)', color: 'var(--white)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={18} /> Call: 04562-299920
                </a>
              </div>
            </div>
            <div style={{ flex: '1', minWidth: '300px', height: '360px', borderRadius: '16px', overflow: 'hidden' }} data-aos="fade-left">
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Laparoscopic Surgery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Visiting Specialists Quick Link Banner */}
      <section style={{ backgroundColor: 'var(--white)', padding: '60px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container text-center" data-aos="fade-up">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
              Multidisciplinary Surgical Care
            </span>
            <h2 style={{ color: 'var(--primary)', fontSize: '2.2rem', marginTop: '10px', marginBottom: '15px' }}>
              Visiting Super-Specialists & Second Opinions
            </h2>
            <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '30px' }}>
              Beyond general and laparoscopic surgery, JB Healthcare hosts top visiting consultants in Cancer Surgery, Gastroenterology, Plastic Surgery, Urology, Paediatrics, and Orthopaedics.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <Link to="/doctors" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                View Visiting Specialists
              </Link>
              <Link to="/appointment" className="btn btn-accent" style={{ padding: '12px 28px' }}>
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .lap-card-hover:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important; border-color: var(--accent) !important; }
      `}</style>
      
    </div>
  );
};

export default Surgeries;
