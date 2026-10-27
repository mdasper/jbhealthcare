import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Calendar, Phone, CheckCircle, ShieldCheck, X } from 'lucide-react';

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
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto]);

  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      
      {/* Hero Section */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 80px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>
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
            <span style={{ backgroundColor: '#0077B6', color: '#FFFFFF', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
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

                  <h3 style={{ color: 'var(--primary)', fontSize: '1.45rem', marginBottom: '6px', lineHeight: '1.3' }}>
                    {item.englishTitle}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    <span style={{ backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#0077B6', border: '1px solid #00B4D8', padding: '2px 10px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 'bold' }}>
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

      {/* Core Surgery Services Section */}
      <section className="section" style={{ backgroundColor: '#04101e', padding: '80px 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '50px' }} data-aos="fade-up">
            <span style={{ backgroundColor: 'rgba(0, 180, 216, 0.18)', color: '#00B4D8', border: '1px solid rgba(0, 180, 216, 0.4)', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Surgical Services
            </span>
            <h2 style={{ color: '#FFFFFF', fontSize: '2.4rem', marginTop: '15px', marginBottom: '10px' }}>
              Our Core Surgery Specialties
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto' }}>
              State-of-the-art operative care across three key surgical domains — every procedure performed with precision, care, and the highest safety standards.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {[
              {
                title: 'Open Surgery',
                subtitle: 'அறுவை சிகிச்சை',
                img: '/ot_photos/1I8A0815.JPG',
                desc: 'Traditional open surgical procedures performed with precision for complex abdominal, gastrointestinal, and trauma cases requiring direct operative access.',
                tags: ['Complex Abdominal', 'GI Surgery', 'Trauma Care', 'Emergency Procedures']
              },
              {
                title: 'Laparoscopic Surgery',
                subtitle: 'குறைந்த வலி • விரைவு மீட்சி',
                img: '/ot_photos/1I8A0841.JPG',
                desc: 'Minimally invasive keyhole surgery using HD camera systems. Tiny incisions, zero visible scarring, minimal pain, and same-day or next-day discharge.',
                tags: ['Keyhole Incision', 'Faster Recovery', 'Minimal Scarring', '2,000+ Done']
              },
              {
                title: 'Cancer Surgery',
                subtitle: 'புற்றுநோய் அறுவை சிகிச்சை',
                img: '/ot_photos/1I8A0850.JPG',
                desc: 'Dedicated surgical oncology services with visiting M.Ch. oncological surgeons for tumor resection, staging, breast cancer, GI cancer, and head & neck oncology.',
                tags: ['Tumor Resection', 'Oncology Specialists', 'Breast Cancer', 'GI Oncology']
              }
            ].map((svc, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={`${(i + 1) * 120}`}
                style={{
                  backgroundColor: '#071929',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 180, 216, 0.25)',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                className="svc-card-hover"
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={svc.img}
                    alt={svc.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,16,30,0.7) 0%, transparent 60%)' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '4px' }}>{svc.title}</h3>
                  <p style={{ color: '#00B4D8', fontSize: '0.85rem', fontWeight: '600', marginBottom: '12px' }}>{svc.subtitle}</p>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '18px' }}>{svc.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {svc.tags.map((t, ti) => (
                      <span key={ti} style={{ backgroundColor: 'rgba(0, 180, 216, 0.12)', color: '#00B4D8', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>✓ {t}</span>
                    ))}
                  </div>
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
              <span style={{ backgroundColor: '#FFFFFF', color: '#061D38', padding: '6px 16px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Center of Surgical Excellence
              </span>
              <h2 style={{ color: 'var(--white)', fontSize: '2.5rem', marginTop: '16px', marginBottom: '16px', lineHeight: '1.2' }}>
                Why Choose JB Healthcare for Laparoscopy?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '25px' }}>
                <span className="lead-doctor-title" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                  Under the lead of Dr. B. Saileshkumar (MBBS, MS, FIAGES, FALS),
                </span>{' '}
                JB Healthcare has performed over <strong>2,000+ laparoscopic surgeries</strong> and <strong>10,000+ total surgical procedures</strong>. With high-resolution camera towers, ultra-fine instrumentation, and advanced anesthesia protocols, patients experience less pain, zero ugly stitches, and prompt return to home.
              </p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link to="/appointment" state={{ doctorName: "Dr. B. Saileshkumar", department: "Laparoscopic & General Surgery" }} className="btn btn-accent" style={{ padding: '12px 28px', fontSize: '1rem' }}>
                  Book Surgical Consultation
                </Link>
                <a href="tel:+919345510905" className="btn btn-outline" style={{ padding: '12px 28px', fontSize: '1rem', borderColor: 'var(--white)', color: 'var(--white)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={18} /> Call: +91 93455 10905
                </a>
              </div>
            </div>
            <div style={{ flex: '1', minWidth: '300px', height: '360px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 16px 36px rgba(0,0,0,0.35)' }} data-aos="fade-left">
              <img src="/ot_photos/1I8A0785.JPG" alt="Laparoscopic Surgery OT" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Real Operation Theatre & Surgery Photo Gallery */}
      <section className="section" style={{ backgroundColor: '#030c17', padding: '70px 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '40px' }} data-aos="fade-up">
            <span style={{ backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Real Surgical Facility
            </span>
            <h2 style={{ color: '#FFFFFF', fontSize: '2.4rem', marginTop: '14px', marginBottom: '10px', fontWeight: '800' }}>
              Inside Our Modular Operation Theatre
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.02rem', maxWidth: '720px', margin: '0 auto' }}>
              Real-time surgical procedures led by Chief Laparoscopic Surgeon Dr. B. Saileshkumar alongside specialized anesthesia and sterile nursing teams.
            </p>
          </div>

          {/* Clean 6-Photo Grid - Pictures Only with Click-to-Popup */}
          <div className="ot-photo-grid">
            {[
              '/ot_photos/1I8A0815.JPG',
              '/ot_photos/1I8A0841.JPG',
              '/ot_photos/1I8A0850.JPG',
              '/ot_photos/1I8A0785.JPG',
              '/ot_photos/1I8A0797.JPG',
              '/ot_photos/1I8A0835.JPG'
            ].map((imgSrc, pIdx) => (
              <div 
                key={pIdx}
                onClick={() => setSelectedPhoto(imgSrc)}
                className="ot-photo-card"
                data-aos="fade-up"
                data-aos-delay={`${(pIdx % 3 + 1) * 80}`}
                title="Click to view full photo"
              >
                <img 
                  src={imgSrc} 
                  alt={`Operation Theatre ${pIdx + 1}`} 
                  className="ot-photo-img"
                  loading="lazy"
                />
                <div className="ot-photo-zoom-hint">
                  <span style={{ color: '#FFFFFF', backgroundColor: 'rgba(7, 26, 46, 0.85)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700', border: '1px solid rgba(0, 180, 216, 0.5)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    🔍 View Photo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visiting Specialists Quick Link Banner */}
      <section style={{ backgroundColor: '#071A2E', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container text-center" data-aos="fade-up">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ color: '#38BDF8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
              Multidisciplinary Surgical Care
            </span>
            <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginTop: '10px', marginBottom: '15px' }}>
              Visiting Super-Specialists & Second Opinions
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '30px' }}>
              Beyond general and laparoscopic surgery, JB Healthcare hosts top visiting consultants in Cancer Surgery, Gastroenterology, Plastic Surgery, Urology, Paediatrics, and Orthopaedics.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/doctors" className="btn btn-accent" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', fontWeight: 'bold' }}>
                View Visiting Specialists
              </Link>
              <Link to="/appointment" className="btn btn-outline" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', borderColor: 'var(--white)', color: 'var(--white)', fontWeight: 'bold' }}>
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pop-Up OT Photo Modal Dialog */}
      {selectedPhoto && typeof document !== 'undefined' && createPortal(
        <div 
          className="ot-modal-backdrop"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="ot-modal-popup"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Close X Button */}
            <div className="ot-modal-header">
              <span style={{ color: '#38BDF8', fontSize: '0.88rem', fontWeight: '700', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00B4D8', display: 'inline-block' }}></span>
                Operation Theatre Facility View
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="ot-modal-close-btn"
                aria-label="Close Image"
                title="Close (Esc)"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Modal Image Box */}
            <div className="ot-modal-image-box">
              <img 
                src={selectedPhoto} 
                alt="Operation Theatre Full View" 
                className="ot-modal-img"
              />
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .ot-photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 992px) {
          .ot-photo-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .ot-photo-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        .ot-photo-card {
          position: relative;
          height: 250px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          border: 1.5px solid rgba(0, 180, 216, 0.25);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          background-color: #04101e;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ot-photo-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 180, 216, 0.3) !important;
          border-color: #00B4D8 !important;
        }
        .ot-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .ot-photo-card:hover .ot-photo-img {
          transform: scale(1.08);
        }
        .ot-photo-zoom-hint {
          position: absolute;
          inset: 0;
          background: rgba(4, 16, 30, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .ot-photo-card:hover .ot-photo-zoom-hint {
          opacity: 1;
        }

        /* Modal Pop-up Styling */
        .ot-modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(3, 12, 23, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: modalFadeIn 0.2s ease-out;
        }
        .ot-modal-popup {
          position: relative;
          max-width: 880px;
          width: 100%;
          background: #071A2E;
          border: 1.5px solid rgba(0, 180, 216, 0.45);
          border-radius: 20px;
          padding: 12px 14px 14px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.7), 0 0 35px rgba(0, 180, 216, 0.25);
          display: flex;
          flex-direction: column;
          animation: modalPopIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ot-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 6px 10px;
        }
        .ot-modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ot-modal-close-btn:hover {
          background-color: #EF4444;
          border-color: #EF4444;
          transform: scale(1.08);
        }
        .ot-modal-image-box {
          border-radius: 12px;
          overflow: hidden;
          background-color: #020813;
          display: flex;
          justify-content: center;
          align-items: center;
          max-height: 75vh;
        }
        .ot-modal-img {
          width: 100%;
          max-height: 75vh;
          object-fit: contain;
          display: block;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPopIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .lap-card-hover:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important; border-color: var(--accent) !important; }
        .svc-card-hover:hover { transform: translateY(-10px); box-shadow: 0 24px 50px rgba(0,0,0,0.45) !important; border-color: rgba(0, 180, 216, 0.6) !important; }
        .svc-card-hover:hover img { transform: scale(1.07); }

        /* Responsive Fixes */
        @media (max-width: 768px) {
          .lead-doctor-title { white-space: normal !important; }
          .section { padding: 50px 0 !important; }
        }
        @media (max-width: 480px) {
          .ot-photo-card { height: 210px; }
          .ot-modal-popup { padding: 10px; border-radius: 14px; }
          .ot-modal-img { max-height: 65vh; }
        }
      `}</style>
      
    </div>
  );
};

export default Surgeries;
