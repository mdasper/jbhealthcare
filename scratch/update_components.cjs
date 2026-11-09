const fs = require('fs');
const path = require('path');

// 1. Update Contact.jsx
const contactPath = path.join(__dirname, '../src/pages/Contact.jsx');
let contactCode = fs.readFileSync(contactPath, 'utf8');
contactCode = contactCode.replace(
  /const address = "2\/571A, Bharathi Nagar, Reserve line, Sivakasi, Tamil Nadu 626124";\r?\n  const phone = "\+91 93455 10905";\r?\n  const email = "jbhealthcare\.sivakasi@gmail\.com";/,
  `const address = settings?.address || "2/571A, Bharathi Nagar, Reserve line, Sivakasi, Tamil Nadu 626124";\n  const phone = settings?.phone || "+91 93455 10905";\n  const email = settings?.email || "jbhealthcare.sivakasi@gmail.com";`
);
fs.writeFileSync(contactPath, contactCode, 'utf8');
console.log('✅ Contact.jsx updated');

// 2. Update Footer.jsx
const footerPath = path.join(__dirname, '../src/components/Footer.jsx');
let footerCode = fs.readFileSync(footerPath, 'utf8');
footerCode = footerCode.replace(
  /const hospitalName = "JB Healthcare";\r?\n  const phone = "\+91 93455 10905";\r?\n  const landline = "04562-299920";\r?\n  const whatsappNumber = "919345510905";\r?\n  const email = "jbhealthcare\.sivakasi@gmail\.com";\r?\n  const address = "2\/571A, Bharathi Nagar, Reserve line, Vasantham Nagar, Rengapa Shyam Nagar, Sivakasi, Tamil Nadu 626124";/,
  `const hospitalName = settings?.hospitalName || "JB Healthcare";\n  const phone = settings?.phone || "+91 93455 10905";\n  const landline = settings?.landline || "04562-299920";\n  const whatsappNumber = settings?.whatsappNumber || "919345510905";\n  const email = settings?.email || "jbhealthcare.sivakasi@gmail.com";\n  const address = settings?.address || "2/571A, Bharathi Nagar, Reserve line, Vasantham Nagar, Rengapa Shyam Nagar, Sivakasi, Tamil Nadu 626124";`
);
fs.writeFileSync(footerPath, footerCode, 'utf8');
console.log('✅ Footer.jsx updated');

// 3. Update Navbar.jsx
const navbarPath = path.join(__dirname, '../src/components/Navbar.jsx');
let navbarCode = fs.readFileSync(navbarPath, 'utf8');
navbarCode = navbarCode.replace(
  /href="tel:\+919345510905"/,
  'href={`tel:${(settings?.phone || "+91 93455 10905").replace(/\\s+/g, "")}`}'
);
navbarCode = navbarCode.replace(
  /<span>\+91 93455 10905<\/span>/,
  '<span>{settings?.phone || "+91 93455 10905"}</span>'
);
fs.writeFileSync(navbarPath, navbarCode, 'utf8');
console.log('✅ Navbar.jsx updated');

// 4. Update Home.jsx
const homePath = path.join(__dirname, '../src/pages/Home.jsx');
let homeCode = fs.readFileSync(homePath, 'utf8');

// Replace state and fetch in Home.jsx
const oldHomeState = `const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    // Fetch data from Sanity
    client.fetch(\`*[_type == "homePage"][0]\`).then((data) => {
      setHomeData(data);
    }).catch(console.error);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Use verified local slides containing Advanced Laparoscopic Surgery and no maternity care
  const displaySlides = slides;`;

const newHomeState = `const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeData, setHomeData] = useState(null);
  const [featuredDepts, setFeaturedDepts] = useState([]);

  useEffect(() => {
    // Fetch data from Sanity
    client.fetch(\`*[_type == "homePage"][0]\`).then((data) => {
      setHomeData(data);
    }).catch(console.error);

    client.fetch(\`*[_type == "service" && isFeaturedOnHome == true] | order(order asc)\`).then((depts) => {
      if (Array.isArray(depts) && depts.length > 0) {
        setFeaturedDepts(depts);
      }
    }).catch(console.error);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Use Sanity slides if configured, otherwise fallback to verified local slides
  const displaySlides = (homeData?.heroSlides && homeData.heroSlides.length > 0)
    ? homeData.heroSlides.map((s, idx) => {
        let img = slides[idx % slides.length]?.image || slides[0].image;
        if (s.image) {
          try {
            img = urlFor(s.image).url();
          } catch (e) { /* fallback */ }
        }
        return {
          image: img,
          position: s.position || 'center center',
          title: s.title || slides[idx % slides.length]?.title || '',
          subtitle: s.subtitle || slides[idx % slides.length]?.subtitle || ''
        };
      })
    : slides;`;

// Normalize line breaks before replacing
homeCode = homeCode.replace(/\r\n/g, '\n');
homeCode = homeCode.replace(oldHomeState, newHomeState);

// Now update the top departments section in Home.jsx to dynamically render featuredDepts when available
const topDeptsStaticCardsRegex = /<div className="top-departments-2x2">[\s\S]*?<\/div>(\s*<div className="text-center")/m;

const dynamicTopDeptsBlock = `<div className="top-departments-2x2">
            {featuredDepts && featuredDepts.length > 0 ? (
              featuredDepts.map((dept, index) => {
                const getIcon = () => {
                  const t = (dept.title || '').toLowerCase();
                  if (t.includes('laparo') || t.includes('surger')) return <Activity size={28} color="#38BDF8" />;
                  if (t.includes('casualty') || t.includes('emergency') || t.includes('trauma')) return <ShieldPlus size={28} color="#38BDF8" />;
                  if (t.includes('diag') || t.includes('lab') || t.includes('blood') || t.includes('ecg')) return <HeartPulse size={28} color="#38BDF8" />;
                  return <Stethoscope size={28} color="#38BDF8" />;
                };

                const getLink = () => {
                  const t = (dept.title || '').toLowerCase();
                  if (t.includes('laparo') || t.includes('surger')) return '/surgeries';
                  if (t.includes('casualty') || t.includes('emergency') || t.includes('lab') || t.includes('diag')) return '/facilities';
                  return '/doctors';
                };

                const getLinkText = () => {
                  const t = (dept.title || '').toLowerCase();
                  if (t.includes('laparo') || t.includes('surger')) return 'View Surgeries →';
                  if (t.includes('casualty') || t.includes('emergency')) return 'View Facilities →';
                  if (t.includes('diag') || t.includes('lab')) return 'Lab Details →';
                  return 'View Doctors →';
                };

                return (
                  <TiltCard 
                    key={dept._id || index}
                    className="service-card department-tile" 
                    maxTilt={5} 
                    scale={1.02} 
                    glareColor="rgba(0, 180, 216, 0.25)"
                    data-aos="zoom-in" 
                    data-aos-delay={(index + 1) * 100}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.15)' }}>
                          {getIcon()}
                        </div>
                        <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '5px 14px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                          {dept.tamilTitle || dept.badge || '✨ சிறப்பு பிரிவு'}
                        </span>
                      </div>
                      <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left', fontWeight: '800' }}>{dept.title}</h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px', fontWeight: '400' }}>
                        {dept.description}
                      </p>
                      {dept.keyProcedures && Array.isArray(dept.keyProcedures) && dept.keyProcedures.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                          {dept.keyProcedures.slice(0, 4).map((proc, pIdx) => (
                            <span key={pIdx} className="dept-pill">{proc}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '10px' }}>
                      <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={15} color="#38BDF8" /> {dept.badge || 'Excellence in Care'}
                      </span>
                      <Link to={getLink()} style={{ color: '#FFFFFF', backgroundColor: '#00B4D8', padding: '7px 18px', borderRadius: '18px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)', transition: 'all 0.2s ease' }}>
                        {getLinkText()}
                      </Link>
                    </div>
                  </TiltCard>
                );
              })
            ) : (
              <>
                {/* Fallback 4 Cards */}
                <TiltCard className="service-card department-tile" maxTilt={5} scale={1.02} glareColor="rgba(0, 180, 216, 0.25)" data-aos="zoom-in" data-aos-delay="100">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.15)' }}>
                        <Activity size={28} color="#38BDF8" />
                      </div>
                      <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '5px 14px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                        🔬 லேப்ராஸ்கோபிக் அறுவை சிகிச்சை
                      </span>
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left', fontWeight: '800' }}>Laparoscopic Surgery</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px', fontWeight: '400' }}>
                      Minimally invasive keyhole surgery center of excellence led by Dr. B. Saileshkumar (2,000+ surgeries) with minimal pain, no scars, and faster discharge.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      <span className="dept-pill">கருப்பை நீக்கம் (Hysterectomy)</span>
                      <span className="dept-pill">குடல்வால் & பித்தப்பை (Appendix & Gallbladder)</span>
                      <span className="dept-pill">குடல் இறக்கம் (Hernia Repair)</span>
                      <span className="dept-pill">நீர்க்கட்டி & F.P (Cyst & Sterilization)</span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={15} color="#38BDF8" /> 2,000+ Laparoscopies
                    </span>
                    <Link to="/surgeries" style={{ color: '#FFFFFF', backgroundColor: '#00B4D8', padding: '7px 18px', borderRadius: '18px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)', transition: 'all 0.2s ease' }}>
                      View Surgeries →
                    </Link>
                  </div>
                </TiltCard>

                <TiltCard className="service-card department-tile" maxTilt={5} scale={1.02} glareColor="rgba(0, 180, 216, 0.25)" data-aos="zoom-in" data-aos-delay="200">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.15)' }}>
                        <ShieldPlus size={28} color="#38BDF8" />
                      </div>
                      <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '5px 14px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                        🚨 அவசர சிகிச்சை & நவீன OT
                      </span>
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left', fontWeight: '800' }}>24/7 Emergency & OT</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px', fontWeight: '400' }}>
                      Round-the-clock emergency casualty, rapid trauma response, and highly skilled on-call surgical teams ready 24 hours a day.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      <span className="dept-pill">24/7 அவசர சிகிச்சை (Casualty Care)</span>
                      <span className="dept-pill">அவசர முதலுதவி (Immediate Trauma Care)</span>
                      <span className="dept-pill">விரைவு அறுவை ஆதரவு (24/7 Surgical Team)</span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={15} color="#38BDF8" /> 24/7 Emergency Care
                    </span>
                    <Link to="/facilities" style={{ color: '#FFFFFF', backgroundColor: '#00B4D8', padding: '7px 18px', borderRadius: '18px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)', transition: 'all 0.2s ease' }}>
                      View Facilities →
                    </Link>
                  </div>
                </TiltCard>

                <TiltCard className="service-card department-tile" maxTilt={5} scale={1.02} glareColor="rgba(0, 180, 216, 0.25)" data-aos="zoom-in" data-aos-delay="300">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.15)' }}>
                        <HeartPulse size={28} color="#38BDF8" />
                      </div>
                      <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '5px 14px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                        ⚡ விரைவு பரிசோதனை & ECG
                      </span>
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left', fontWeight: '800' }}>Rapid Diagnostics & ECG</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px', fontWeight: '400' }}>
                      In-house computerized diagnostic laboratory and Digital ECG providing rapid, accurate blood and biochemistry reports.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      <span className="dept-pill">24 மணி நேர ஆய்வகம் (Automated Lab)</span>
                      <span className="dept-pill">டிஜிட்டல் ECG (3-Lead Digital ECG)</span>
                      <span className="dept-pill">ரத்த பரிசோதனைகள் (Biochemistry)</span>
                      <span className="dept-pill">விரைவு முடிவுகள் (Same-Day Reports)</span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={15} color="#38BDF8" /> 24 Hours Automated Lab
                    </span>
                    <Link to="/facilities" style={{ color: '#FFFFFF', backgroundColor: '#00B4D8', padding: '7px 18px', borderRadius: '18px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)', transition: 'all 0.2s ease' }}>
                      Lab Details →
                    </Link>
                  </div>
                </TiltCard>

                <TiltCard className="service-card department-tile" maxTilt={5} scale={1.02} glareColor="rgba(0, 180, 216, 0.25)" data-aos="zoom-in" data-aos-delay="400">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 180, 216, 0.15)' }}>
                        <Stethoscope size={28} color="#38BDF8" />
                      </div>
                      <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', border: '1px solid rgba(0, 180, 216, 0.35)', padding: '5px 14px', borderRadius: '15px', fontWeight: '700', letterSpacing: '0.3px' }}>
                        🌟 சிறப்பு மருத்துவர்கள் வருகை
                      </span>
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '10px', textAlign: 'left', fontWeight: '800' }}>Visiting Specialists</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: '1.6', textAlign: 'left', marginBottom: '18px', fontWeight: '400' }}>
                      Regular consultations and specialized surgeries by 12 renowned super-specialists across Cancer, Gastro, Plastic, Urology, Ortho & Paediatrics.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      <span className="dept-pill">12 சிறப்பு மருத்துவர்கள் (Specialists)</span>
                      <span className="dept-pill">புற்றுநோய் & குடல் (Cancer & GI Care)</span>
                      <span className="dept-pill">ஒட்டுறுப்பு & குழந்தை (Plastic & Child)</span>
                      <span className="dept-pill">சிறுநீரகம் & எலும்பு (Urology & Ortho)</span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ color: '#38BDF8', backgroundColor: 'rgba(0, 180, 216, 0.12)', border: '1px solid rgba(0, 180, 216, 0.3)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={15} color="#38BDF8" /> 12 Active Specialists
                    </span>
                    <Link to="/doctors" style={{ color: '#FFFFFF', backgroundColor: '#00B4D8', padding: '7px 18px', borderRadius: '18px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)', transition: 'all 0.2s ease' }}>
                      View All Doctors →
                    </Link>
                  </div>
                </TiltCard>
              </>
            )}
          </div>$1`;

homeCode = homeCode.replace(topDeptsStaticCardsRegex, dynamicTopDeptsBlock);
fs.writeFileSync(homePath, homeCode, 'utf8');
console.log('✅ Home.jsx updated');
