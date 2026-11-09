const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/pages/Facilities.jsx');

const fileContent = `import React from 'react';
import { Activity, ShieldPlus, HeartPulse, Stethoscope, Microscope, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity';

const facilitiesData = [
  {
    id: 1,
    title: "24/7 Emergency & Surgical Care Unit",
    subtitle: "Immediate Trauma Care & OT Response",
    description: "Round-the-clock emergency casualty, trauma care, and fully equipped surgical theatres ready for immediate surgical interventions at any time of day or night.",
    icon: <ShieldPlus size={40} color="var(--accent)" />,
    image: "/hospital_photos/dr_sailesh_ot_team.jpg"
  },
  {
    id: 2,
    title: "Rapid Blood Diagnostics & ECG",
    subtitle: "Automated In-House Laboratory",
    description: "Fast-track computerized laboratory delivering quick blood test results, biochemistry, and 3-lead digital ECG to initiate accurate medical treatment without delay.",
    icon: <Microscope size={40} color="var(--accent)" />,
    image: "/hospital_photos/hospital_lab_technician.jpg"
  },
  {
    id: 3,
    title: "Visiting Specialists Consultation",
    subtitle: "Leading Superspecialist Doctors",
    description: "Regular outpatient visits, second opinions, and multi-disciplinary treatment planning by top consulting specialists from major medical centers.",
    icon: <Stethoscope size={40} color="var(--accent)" />,
    image: "/hospital_photos/jb_hospital_full_team.jpg"
  },
  {
    id: 4,
    title: "Inpatient (IP) & Outpatient (OP) Wards",
    subtitle: "Spacious & Clean Patient Rooms",
    description: "Hygienic, comfortable inpatient recovery rooms, patient monitoring suites, and a patient-friendly outpatient consultation wing.",
    icon: <HeartPulse size={40} color="var(--accent)" />,
    image: "/hospital_photos/ip_ward_room.jpg",
    gallery: [
      { label: 'Inpatient (IP) Ward', image: '/hospital_photos/ip_ward_room.jpg' },
      { label: 'Outpatient (OP) Lounge', image: '/hospital_photos/op_lounge.jpg' }
    ]
  },
  {
    id: 5,
    title: "Advanced Well-Equipped Operation Theatre",
    subtitle: "Sterile Modern Surgical Suites",
    description: "Fully equipped modern surgical theatre custom-fitted with high-definition laparoscopic towers, advanced electrocautery, and comprehensive patient monitoring for laparoscopic, general, and emergency procedures.",
    icon: <Activity size={40} color="var(--accent)" />,
    image: "/hospital_photos/operation_theatre_bright.jpg"
  },
  {
    id: 6,
    title: "24/7 In-House Pharmacy",
    subtitle: "Essential & Emergency Medicines",
    description: "Fully stocked pharmacy on hospital premises ensuring round-the-clock availability of critical emergency drugs, surgical supplies, and patient prescriptions.",
    icon: <Pill size={40} color="var(--accent)" />,
    image: "/hospital_photos/hospital_pharmacy_counter.jpg"
  }
];

const Facilities = () => {
  const [activeWardIdx, setActiveWardIdx] = React.useState(0);
  const [facilities, setFacilities] = React.useState(facilitiesData);
  const [pageData, setPageData] = React.useState(null);

  React.useEffect(() => {
    // 1. Fetch facilities list
    client.fetch(\`*[_type == "facility"] | order(order asc)\`).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const merged = data.map((item, idx) => {
          const fallback = facilitiesData[idx] || facilitiesData[0];
          let img = fallback.image;
          if (item.image) {
            try { img = urlFor(item.image).url(); } catch (e) { /* use fallback */ }
          }
          let gal = fallback.gallery;
          if (item.gallery && Array.isArray(item.gallery) && item.gallery.length > 0) {
            gal = item.gallery.map((g) => ({
              label: g.label || 'View',
              image: g.image ? urlFor(g.image).url() : fallback.image
            }));
          }
          return {
            id: item._id || item.id || idx,
            title: item.title || fallback.title,
            subtitle: item.subtitle || fallback.subtitle,
            description: item.description || fallback.description,
            icon: fallback.icon,
            image: img,
            gallery: gal
          };
        });
        setFacilities(merged);
      }
    }).catch((err) => {
      console.warn('Using offline facilities fallback:', err);
    });

    // 2. Fetch facilitiesPage
    client.fetch(\`*[_type == "facilitiesPage"][0]\`).then((data) => {
      if (data) setPageData(data);
    }).catch((err) => {
      console.warn('Using offline facilitiesPage fallback:', err);
    });
  }, []);

  // Auto-switch between IP and OP every 4.5 seconds so both are highlighted
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveWardIdx((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      
      {/* Hero Section */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 100px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>
            {pageData?.heroHeading || "24/7 Hospital Facilities"}
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)', lineHeight: '1.8' }}>
            {pageData?.heroSubtitle || "At JB Healthcare, we provide round-the-clock emergency medical services, rapid diagnostics, and comfortable inpatient care with the highest standards of clinical safety."}
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <div className="facilities-grid">
            
            {facilities.map((facility, index) => {
              const currentImage = (facility.gallery && facility.gallery[activeWardIdx]) 
                ? facility.gallery[activeWardIdx].image 
                : facility.image;

              return (
              <div 
                key={facility.id} 
                className="facility-card" 
                data-aos="fade-up" 
                data-aos-delay={\`\${(index % 3 + 1) * 100}\`} 
                style={{ backgroundColor: 'var(--primary)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.2)', transition: 'transform 0.4s ease, box-shadow 0.4s ease', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={currentImage} 
                    alt={facility.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    className="facility-img-hover"
                    onError={(e) => { e.target.src = '/hospital_photos/inpatient_outpatient_ward.jpg'; }}
                  />

                  {/* Interactive IP/OP Toggle Badges */}
                  {facility.gallery && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      gap: '6px',
                      zIndex: 3
                    }}>
                      {facility.gallery.map((g, gIdx) => (
                        <button
                          key={gIdx}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setActiveWardIdx(gIdx); }}
                          style={{
                            backgroundColor: activeWardIdx === gIdx ? '#00B4D8' : 'rgba(6, 29, 56, 0.88)',
                            color: activeWardIdx === gIdx ? '#061D38' : '#FFFFFF',
                            border: activeWardIdx === gIdx ? '1.5px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.25)',
                            padding: '4px 10px',
                            borderRadius: '16px',
                            fontSize: '0.74rem',
                            fontWeight: '800',
                            cursor: 'pointer',
                            backdropFilter: 'blur(6px)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div style={{ position: 'absolute', bottom: '-1px', left: '0', width: '100%', height: '50px', background: 'linear-gradient(to top, var(--primary), transparent)', pointerEvents: 'none' }}></div>
                </div>
                
                <div style={{ padding: '30px', position: 'relative', flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'absolute', top: '-40px', right: '30px', width: '70px', height: '70px', backgroundColor: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', border: '2px solid #061D38' }}>
                    {facility.icon}
                  </div>
                  
                  <h3 style={{ color: 'var(--white)', fontSize: '1.45rem', marginBottom: '4px', paddingRight: '50px' }}>{facility.title}</h3>
                  <div style={{ color: '#061D38', fontSize: '0.92rem', fontWeight: '800', marginBottom: '14px' }}>
                    {facility.subtitle}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '0', flex: '1' }}>{facility.description}</p>
                </div>
              </div>
            );
          })}
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: '#071A2E', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <div className="container" data-aos="zoom-in">
          <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginBottom: '12px' }}>
            {pageData?.ctaHeading || "Need Immediate Medical Assistance?"}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', marginBottom: '30px', maxWidth: '650px', margin: '0 auto 30px auto' }}>
            {pageData?.ctaDescription || "Our emergency and critical care departments are operational 24/7. Contact us immediately for swift response and expert care."}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-accent" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', fontWeight: 'bold' }}>
              {pageData?.ctaButtonText || "Contact Emergency Services"}
            </Link>
          </div>
        </div>
      </section>

      <style>{\`
        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }
        @media (max-width: 600px) {
          .facilities-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        .facility-card:hover { transform: translateY(-10px); box-shadow: 0 25px 50px rgba(0,0,0,0.12) !important; }
        .facility-card:hover .facility-img-hover { transform: scale(1.08) !important; }
      \`}</style>
      
    </div>
  );
};

export default Facilities;
`;

fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log('✓ Successfully updated Facilities.jsx with dynamic Sanity integration!');
