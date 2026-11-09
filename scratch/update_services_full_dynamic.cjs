const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/pages/Services.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Ensure urlFor is imported
if (!content.includes('urlFor')) {
  content = content.replace("import { client } from '../sanity';", "import { client, urlFor } from '../sanity';");
}

// 2. Prepare default packages and steps constants before JSX
const targetDefaults = `  const filteredDepts = sanitizeDepartmentDoctors(departments).filter((dept) => {`;

const newDefaults = `  // Default Health Packages fallback
  const defaultHealthPackages = [
    {
      title: 'Master Health Check-up',
      badge: 'Most Popular',
      badgeColor: '#F59E0B',
      items: [
        'Complete Blood Count (CBC)',
        'Blood Sugar (Fasting & PP)',
        'HbA1c (Diabetes Marker)',
        'Liver Function Test (LFT)',
        'Kidney Function Test (RFT)',
        'Lipid Profile (Cholesterol)',
        'Digital 3-Lead ECG',
        'Urine Routine Analysis',
        'Thyroid Profile (T3, T4, TSH)',
        'Physician Consultation'
      ]
    },
    {
      title: 'Global Elite Test Package',
      badge: 'Comprehensive',
      badgeColor: '#00B4D8',
      items: [
        'All Master Health Check-up tests',
        'Vitamin D & Vitamin B12',
        'Iron Studies & Serum Ferritin',
        'PSA (Prostate – Men)',
        'CA-125 Tumour Marker (Women)',
        'Chest X-Ray (PA View)',
        'Ultrasound Abdomen & Pelvis',
        'Eye Pressure Check (IOP)',
        'Dental & Nutritional Consult',
        'Senior Specialist Consultation'
      ]
    }
  ];

  // Default Journey steps fallback
  const defaultJourneySteps = [
    {
      stepNumber: '1',
      title: '1. Book Appointment',
      description: 'Easily schedule your visit via WhatsApp or call us directly at +91 93455 10905. Say goodbye to long waiting queues.'
    },
    {
      stepNumber: '2',
      title: '2. Specialist Consultation',
      description: 'Consult with Dr. B. Saileshkumar or our visiting super-specialists for a detailed, caring, and precise clinical evaluation.'
    },
    {
      stepNumber: '3',
      title: '3. Rapid Recovery & Care',
      description: 'Experience minimally invasive keyhole procedures, zero scars, and prompt discharge with regular follow-ups for full recovery.'
    }
  ];

  const hpSection = headerData?.healthPackagesSection;
  const hpPackages = (hpSection?.packages && hpSection.packages.length > 0) ? hpSection.packages : defaultHealthPackages;
  const hpSideCard = hpSection?.sideCard;
  const hpSideImg = (hpSideCard?.image ? urlFor(hpSideCard.image).url() : null) || "/hospital_photos/dr_sailesh_xray_consultation.jpg";

  const journeySec = headerData?.journeySection;
  const journeySteps = (journeySec?.steps && journeySec.steps.length > 0) ? journeySec.steps : defaultJourneySteps;
  const journeyIcons = [PhoneCall, ClipboardList, Clock];

  const callout = headerData?.calloutSection;

  const filteredDepts = sanitizeDepartmentDoctors(departments).filter((dept) => {`;

content = content.replace(targetDefaults, newDefaults);

// 3. Update Health Packages JSX
const targetHealthPackagesJSX = `                fontSize: '0.9rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px'
              }}>
                Preventive Health Checkup
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#061D38', fontWeight: '800' }}>
                Comprehensive Master Health Packages
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '25px', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
                Prevention is always superior to cure. JB Healthcare offers customized health screening packages designed for all age groups to detect asymptomatic risks early and maintain enduring health.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {[
                  {
                    title: 'Master Health Check-up',
                    badge: 'Most Popular',
                    badgeColor: '#F59E0B',
                    items: [
                      'Complete Blood Count (CBC)',
                      'Blood Sugar (Fasting & PP)',
                      'HbA1c (Diabetes Marker)',
                      'Liver Function Test (LFT)',
                      'Kidney Function Test (RFT)',
                      'Lipid Profile (Cholesterol)',
                      'Digital 3-Lead ECG',
                      'Urine Routine Analysis',
                      'Thyroid Profile (T3, T4, TSH)',
                      'Physician Consultation'
                    ]
                  },
                  {
                    title: 'Global Elite Test Package',
                    badge: 'Comprehensive',
                    badgeColor: '#00B4D8',
                    items: [
                      'All Master Health Check-up tests',
                      'Vitamin D & Vitamin B12',
                      'Iron Studies & Serum Ferritin',
                      'PSA (Prostate – Men)',
                      'CA-125 Tumour Marker (Women)',
                      'Chest X-Ray (PA View)',
                      'Ultrasound Abdomen & Pelvis',
                      'Eye Pressure Check (IOP)',
                      'Dental & Nutritional Consult',
                      'Senior Specialist Consultation'
                    ]
                  }
                ].map((pkg, i) => (
                  <div key={i} style={{ backgroundColor: '#061D38', padding: '22px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.18)', boxShadow: '0 8px 24px rgba(6, 29, 56, 0.25)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                      <Activity size={20} color="#38BDF8" />
                      <span style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '1.05rem' }}>{pkg.title}</span>
                      <span style={{ backgroundColor: pkg.badgeColor, color: '#061D38', padding: '2px 8px', borderRadius: '10px', fontSize: '0.68rem', fontWeight: '800', marginLeft: 'auto' }}>{pkg.badge}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {pkg.items.map((item, idx) => (
                        <div key={idx} style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#38BDF8', fontSize: '0.7rem' }}>✓</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/appointment" 
                state={{ department: "Master Health Checkup" }}
                className="btn" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', fontSize: '1rem', borderRadius: '30px', fontWeight: '800', backgroundColor: '#061D38', color: '#FFFFFF', border: 'none', boxShadow: '0 6px 20px rgba(6, 29, 56, 0.3)' }}
              >
                <Calendar size={18} /> Enquire / Book Health Package
              </Link>
            </div>
            
            <div data-aos="fade-left" style={{ flex: '1 1 400px' }}>
              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.35)', border: '2px solid rgba(0, 180, 216, 0.3)' }}>
                <img 
                  src="/hospital_photos/dr_sailesh_xray_consultation.jpg" 
                  alt="JB Healthcare Master Health Checkup Packages" 
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} 
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 30px 25px', background: 'linear-gradient(to top, rgba(10, 43, 78, 0.98) 0%, rgba(10, 43, 78, 0.7) 65%, transparent 100%)' }}>
                  <span style={{ backgroundColor: '#00B4D8', color: '#061D38', padding: '3px 12px', borderRadius: '15px', fontSize: '0.78rem', fontWeight: 'bold' }}>
                    Special Offer
                  </span>
                  <h3 style={{ color: 'var(--white)', fontSize: '1.6rem', marginTop: '8px', marginBottom: '4px' }}>Master Health Checkup</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '0.95rem' }}>Packages starting from ₹999/- only</p>
                </div>
              </div>
            </div>`;

const newHealthPackagesJSX = `                fontSize: '0.9rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px'
              }}>
                {hpSection?.tag || "Preventive Health Checkup"}
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#061D38', fontWeight: '800' }}>
                {hpSection?.heading || "Comprehensive Master Health Packages"}
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '25px', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
                {hpSection?.description || "Prevention is always superior to cure. JB Healthcare offers customized health screening packages designed for all age groups to detect asymptomatic risks early and maintain enduring health."}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {hpPackages.map((pkg, i) => (
                  <div key={pkg._key || i} style={{ backgroundColor: '#061D38', padding: '22px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.18)', boxShadow: '0 8px 24px rgba(6, 29, 56, 0.25)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                      <Activity size={20} color="#38BDF8" />
                      <span style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '1.05rem' }}>{pkg.title}</span>
                      <span style={{ backgroundColor: pkg.badgeColor || '#00B4D8', color: '#061D38', padding: '2px 8px', borderRadius: '10px', fontSize: '0.68rem', fontWeight: '800', marginLeft: 'auto' }}>{pkg.badge}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {pkg.items && pkg.items.map((item, idx) => (
                        <div key={idx} style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#38BDF8', fontSize: '0.7rem' }}>✓</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/appointment" 
                state={{ department: "Master Health Checkup" }}
                className="btn" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', fontSize: '1rem', borderRadius: '30px', fontWeight: '800', backgroundColor: '#061D38', color: '#FFFFFF', border: 'none', boxShadow: '0 6px 20px rgba(6, 29, 56, 0.3)' }}
              >
                <Calendar size={18} /> Enquire / Book Health Package
              </Link>
            </div>
            
            <div data-aos="fade-left" style={{ flex: '1 1 400px' }}>
              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.35)', border: '2px solid rgba(0, 180, 216, 0.3)' }}>
                <img 
                  src={hpSideImg} 
                  alt="JB Healthcare Master Health Checkup Packages" 
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} 
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 30px 25px', background: 'linear-gradient(to top, rgba(10, 43, 78, 0.98) 0%, rgba(10, 43, 78, 0.7) 65%, transparent 100%)' }}>
                  <span style={{ backgroundColor: '#00B4D8', color: '#061D38', padding: '3px 12px', borderRadius: '15px', fontSize: '0.78rem', fontWeight: 'bold' }}>
                    {hpSideCard?.badge || "Special Offer"}
                  </span>
                  <h3 style={{ color: 'var(--white)', fontSize: '1.6rem', marginTop: '8px', marginBottom: '4px' }}>
                    {hpSideCard?.title || "Master Health Checkup"}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '0.95rem' }}>
                    {hpSideCard?.priceText || "Packages starting from ₹999/- only"}
                  </p>
                </div>
              </div>
            </div>`;

// 4. Update Journey JSX
const targetJourneyJSX = `      {/* 5. How It Works / Patient Journey */}
      <section style={{ padding: '80px 0', backgroundColor: '#F8FAFC' }}>
        <div className="container text-center">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(10, 43, 78, 0.08)',
            color: 'var(--primary)',
            padding: '6px 18px',
            borderRadius: '25px',
            fontSize: '0.88rem',
            fontWeight: '700',
            marginBottom: '12px'
          }}>
            3 எளிய படிகள் • Seamless Patient Care
          </div>
          <h2 style={{ color: 'var(--primary)', fontSize: '2.4rem', marginBottom: '12px' }} data-aos="fade-up">
            Your Seamless Healthcare Journey
          </h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: '#00B4D8', margin: '0 auto 50px auto', borderRadius: '2px' }} data-aos="fade-up"></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '40px 30px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(10,43,78,0.08)' }} data-aos="fade-up" data-aos-delay="100">
              <div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(0, 180, 216, 0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px auto', border: '1.5px solid rgba(0, 180, 216, 0.3)' }}>
                <PhoneCall size={34} color="#0077B6" />
              </div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.35rem', marginBottom: '10px' }}>1. Book Appointment</h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>Easily schedule your visit via WhatsApp or call us directly at +91 93455 10905. Say goodbye to long waiting queues.</p>
            </div>
            
            <div style={{ backgroundColor: '#ffffff', padding: '40px 30px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(10,43,78,0.08)' }} data-aos="fade-up" data-aos-delay="200">
              <div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(0, 180, 216, 0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px auto', border: '1.5px solid rgba(0, 180, 216, 0.3)' }}>
                <ClipboardList size={34} color="#0077B6" />
              </div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.35rem', marginBottom: '10px' }}>2. Specialist Consultation</h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>Consult with Dr. B. Saileshkumar or our visiting super-specialists for a detailed, caring, and precise clinical evaluation.</p>
            </div>
            
            <div style={{ backgroundColor: '#ffffff', padding: '40px 30px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(10,43,78,0.08)' }} data-aos="fade-up" data-aos-delay="300">
              <div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(0, 180, 216, 0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px auto', border: '1.5px solid rgba(0, 180, 216, 0.3)' }}>
                <Clock size={34} color="#0077B6" />
              </div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.35rem', marginBottom: '10px' }}>3. Rapid Recovery & Care</h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>Experience minimally invasive keyhole procedures, zero scars, and prompt discharge with regular follow-ups for full recovery.</p>
            </div>
          </div>
        </div>
      </section>`;

const newJourneyJSX = `      {/* 5. How It Works / Patient Journey */}
      <section style={{ padding: '80px 0', backgroundColor: '#F8FAFC' }}>
        <div className="container text-center">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(10, 43, 78, 0.08)',
            color: 'var(--primary)',
            padding: '6px 18px',
            borderRadius: '25px',
            fontSize: '0.88rem',
            fontWeight: '700',
            marginBottom: '12px'
          }}>
            {journeySec?.badge || "3 எளிய படிகள் • Seamless Patient Care"}
          </div>
          <h2 style={{ color: 'var(--primary)', fontSize: '2.4rem', marginBottom: '12px' }} data-aos="fade-up">
            {journeySec?.heading || "Your Seamless Healthcare Journey"}
          </h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: '#00B4D8', margin: '0 auto 50px auto', borderRadius: '2px' }} data-aos="fade-up"></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {journeySteps.map((step, idx) => {
              const StepIcon = journeyIcons[idx % journeyIcons.length];
              return (
                <div key={step._key || idx} style={{ backgroundColor: '#ffffff', padding: '40px 30px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(10,43,78,0.08)' }} data-aos="fade-up" data-aos-delay={(idx + 1) * 100}>
                  <div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(0, 180, 216, 0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px auto', border: '1.5px solid rgba(0, 180, 216, 0.3)' }}>
                    <StepIcon size={34} color="#0077B6" />
                  </div>
                  <h3 style={{ color: 'var(--primary)', fontSize: '1.35rem', marginBottom: '10px' }}>{step.title}</h3>
                  <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>`;

// 5. Update Callout JSX
const targetCalloutJSX = `      {/* 6. Emergency Callout Bar */}
      <section style={{ backgroundColor: '#071A2E', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container text-center">
          <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginBottom: '12px' }}>
            Need Immediate Assistance or Surgery Consultation?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 30px' }}>
            Our hospital reception is available 24/7 to connect you with our surgical and medical team.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn btn-accent" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', fontWeight: 'bold' }}>
              Book an Appointment
            </Link>
            <a href="tel:04562299920" className="btn btn-outline" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', borderColor: 'var(--white)', color: 'var(--white)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} /> Call 04562-299920
            </a>
          </div>
        </div>
      </section>`;

const newCalloutJSX = `      {/* 6. Emergency Callout Bar */}
      <section style={{ backgroundColor: '#071A2E', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container text-center">
          <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginBottom: '12px' }}>
            {callout?.heading || "Need Immediate Assistance or Surgery Consultation?"}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 30px' }}>
            {callout?.subtitle || "Our hospital reception is available 24/7 to connect you with our surgical and medical team."}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn btn-accent" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', fontWeight: 'bold' }}>
              {callout?.buttonText || "Book an Appointment"}
            </Link>
            <a href={\`tel:\${callout?.phoneNumber || "04562299920"}\`} className="btn btn-outline" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', borderColor: 'var(--white)', color: 'var(--white)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} /> {callout?.phoneText || "Call 04562-299920"}
            </a>
          </div>
        </div>
      </section>`;

const normalize = (s) => s.replace(/\r\n/g, '\n');

let norm = normalize(content);
norm = norm.replace(normalize(targetHealthPackagesJSX), normalize(newHealthPackagesJSX));
norm = norm.replace(normalize(targetJourneyJSX), normalize(newJourneyJSX));
norm = norm.replace(normalize(targetCalloutJSX), normalize(newCalloutJSX));

fs.writeFileSync(filePath, norm.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated src/pages/Services.jsx with all 3 dynamic sections!');
