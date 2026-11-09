const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, '../src/pages/Home.jsx');
let code = fs.readFileSync(homePath, 'utf8');

// 1. Replace Why Choose Us section
const oldWhyChooseUsRegex = /\{\/\* Why Choose Us - Full Width Banner Style \*\/\}[\s\S]*?<\/section>/m;
const newWhyChooseUs = `{/* Why Choose Us - Full Width Banner Style */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
        <div className="container">
          <div className="why-choose-us" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', textAlign: 'center' }}>
            {(homeData?.whyChooseUs && homeData.whyChooseUs.length > 0 ? homeData.whyChooseUs : [
              { icon: 'Award', title: 'Certified Experts', description: 'Highly qualified doctors and medical staff.' },
              { icon: 'Activity', title: 'Modern Technology', description: 'State-of-the-art facilities and equipment.' },
              { icon: 'ShieldPlus', title: '24/7 Support', description: 'Round-the-clock emergency services.' },
              { icon: 'Users', title: 'Patient-Centric Care', description: 'Personalized treatment plans and emotional support.' },
              { icon: 'CheckCircle', title: 'Strict Hygiene', description: '100% adherence to international safety protocols.' }
            ]).map((wcu, idx) => {
              const renderIcon = () => {
                switch(wcu.icon) {
                  case 'Award': return <Award size={48} style={{ color: '#061D38', marginBottom: '15px' }} />;
                  case 'Activity': return <Activity size={48} style={{ color: '#061D38', marginBottom: '15px' }} />;
                  case 'ShieldPlus': return <ShieldPlus size={48} style={{ color: '#061D38', marginBottom: '15px' }} />;
                  case 'Users': return <Users size={48} style={{ color: '#061D38', marginBottom: '15px' }} />;
                  default: return <CheckCircle size={48} style={{ color: '#061D38', marginBottom: '15px' }} />;
                }
              };
              return (
                <div key={wcu._key || idx} data-aos="fade-up" data-aos-delay={(idx + 1) * 100}>
                  {renderIcon()}
                  <h3 style={{ color: '#061D38', fontWeight: '800' }}>{wcu.title}</h3>
                  <p style={{ color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>{wcu.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>`;

code = code.replace(oldWhyChooseUsRegex, newWhyChooseUs);

// 2. Replace Doctor Message (Founder Dr. Saileshkumar)
const oldFounderRegex = /\{\/\* Doctor Message \*\/\}[\s\S]*?<\/section>/m;
const newFounder = `{/* Doctor Message */}
      <section className="section doctor-message" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="doctor-image" data-aos="fade-right">
            <img 
              src={homeData?.doctorSaileshProfile?.image ? urlFor(homeData.doctorSaileshProfile.image).url() : "/doctor.png"} 
              alt={homeData?.doctorSaileshProfile?.name || "Dr. B. Saileshkumar"} 
              onError={(e) => { e.target.src = '/doctor.png'; }} 
            />
          </div>
          <div className="doctor-content" data-aos="fade-left">
            <div style={{ display: 'inline-block', backgroundColor: '#061D38', color: '#FFFFFF', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              {homeData?.doctorSaileshProfile?.tag || "Founder & Chief Surgeon"}
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#FFFFFF', fontWeight: '800' }}>
              {homeData?.doctorSaileshProfile?.name || "Dr. B. Saileshkumar"}
            </h2>
            <h4 style={{ color: '#061D38', fontSize: '1.18rem', fontWeight: '800', marginBottom: '15px' }}>
              {homeData?.doctorSaileshProfile?.degree || "MBBS., M.S., FIAGES., FALS (Laparoscopic & General Surgeon)"}
            </h4>
            
            <div className="quote" style={{ marginBottom: '18px', fontSize: '1.05rem', lineHeight: '1.6', color: '#FFFFFF', fontStyle: 'italic' }}>
              {homeData?.doctorSaileshProfile?.quote || "\\"Healing Hands, Caring Hearts — Healing is not just about prescribing medicines; it's about listening to our patients, understanding their pain, and guiding them towards a healthier, happier life.\\""}
            </div>
            
            {/* Highlights from Hospital Banner - High-contrast Deep Navy cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '22px' }}>
              {(homeData?.doctorSaileshProfile?.stats && homeData.doctorSaileshProfile.stats.length > 0 ? homeData.doctorSaileshProfile.stats : [
                { _key: 's1', number: '10,000+', label: 'Successful Surgeries' },
                { _key: 's2', number: '2,000+', label: 'Laparoscopic Surgeries' },
                { _key: 's3', number: 'Best Doctor Award', label: '2017 & 2018 (Collector)' }
              ]).map((st, sIdx) => (
                <div key={st._key || sIdx} style={{ backgroundColor: '#061D38', padding: '12px 16px', borderRadius: '12px', borderLeft: '4px solid #38BDF8', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>
                  <span style={{ fontSize: st.number && st.number.length > 10 ? '1.15rem' : '1.35rem', fontWeight: '800', color: '#38BDF8', display: 'block', lineHeight: '1.3', marginBottom: '2px' }}>{st.number}</span>
                  <span style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: '600' }}>{st.label}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ color: '#061D38', fontSize: '1.18rem', fontWeight: '800', marginBottom: '6px' }}>
                {homeData?.doctorSaileshProfile?.credentialsHeading || "Medical Journey & Credentials"}
              </h3>
              <p style={{ color: '#FFFFFF', lineHeight: '1.65', fontSize: '0.95rem', margin: 0, fontWeight: '500' }}>
                {homeData?.doctorSaileshProfile?.bio || "Alumnus of Madras Medical College (MBBS) & Madurai Medical College (MS). Advanced Laparoscopic training from VG Hospital Coimbatore, with prestigious FIAGES / FALS Fellowships. Over 7 years of dedicated government medical service across Virudhunagar district and Secretary of IMA Sivakasi (2016-2017)."}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '18px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-accent" style={{ padding: '12px 26px', fontSize: '0.95rem', fontWeight: '700', backgroundColor: '#061D38', color: '#FFFFFF', border: 'none' }}>Full Profile & Achievements</Link>
              <Link to="/appointment" className="btn btn-outline" style={{ padding: '12px 26px', fontSize: '0.95rem', fontWeight: '700', borderColor: '#FFFFFF', color: '#FFFFFF' }}>Book Consultation</Link>
            </div>
          </div>
        </div>
      </section>`;

code = code.replace(oldFounderRegex, newFounder);

// 3. Replace Co-Founder Suganya Sailesh section
const oldCoFounderRegex = /\{\/\* Co-Founder & Managing Director Section - Content Left, Image Right \*\/\}[\s\S]*?<\/section>/m;
const newCoFounder = `{/* Co-Founder & Managing Director Section - Content Left, Image Right */}
      <section className="section cofounder-message" style={{ overflow: 'hidden', backgroundColor: 'var(--primary)', color: 'var(--white)', borderTop: '2px solid rgba(255, 255, 255, 0.22)' }}>
        <div className="container cofounder-container">
          
          {/* Content on the Left */}
          <div className="doctor-content" data-aos="fade-right">
            <div style={{ display: 'inline-block', backgroundColor: '#061D38', color: '#FFFFFF', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              {homeData?.suganyaProfile?.tag || "Co-Founder & Managing Director"}
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#FFFFFF', fontWeight: '800' }}>
              {homeData?.suganyaProfile?.name || "V. Suganya Sailesh"}
            </h2>
            <h4 style={{ color: '#061D38', fontSize: '1.18rem', fontWeight: '800', marginBottom: '15px' }}>
              {homeData?.suganyaProfile?.degree || "B.Tech (IT) — Thiagarajar College of Engineering"}
            </h4>
            
            <div className="quote" style={{ marginBottom: '18px', fontSize: '1.05rem', lineHeight: '1.6', color: '#FFFFFF', fontStyle: 'italic' }}>
              {homeData?.suganyaProfile?.quote || "\\"Fostering a welcoming, patient-focused environment where every individual and family feels respected, cared for, and truly supported.\\""}
            </div>
            
            {/* Highlights Pillars - Matching Founder's Dark Navy Cards */}
            <div className="cofounder-badges-grid">
              {(homeData?.suganyaProfile?.pillars && homeData.suganyaProfile.pillars.length > 0 ? homeData.suganyaProfile.pillars : [
                { _key: 'p1', title: 'B.Tech (IT)', subtitle: 'Thiagarajar College of Engg' },
                { _key: 'p2', title: 'Hospital Administration', subtitle: 'Leadership & Operations' },
                { _key: 'p3', title: 'Certified Life Coach', subtitle: 'Parenting & Wellbeing Mentor' }
              ]).map((pil, pIdx) => (
                <div key={pil._key || pIdx} style={{ backgroundColor: '#061D38', padding: '12px 10px', borderRadius: '12px', borderLeft: '4px solid #38BDF8', boxShadow: '0 6px 18px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '70px' }}>
                  <span style={{ fontSize: 'clamp(0.8rem, 0.9vw, 0.95rem)', fontWeight: '800', color: '#38BDF8', display: 'block', lineHeight: '1.25', whiteSpace: 'nowrap', marginBottom: '3px' }}>{pil.title}</span>
                  <span style={{ fontSize: 'clamp(0.68rem, 0.76vw, 0.76rem)', color: '#FFFFFF', fontWeight: '600', whiteSpace: 'nowrap', display: 'block', lineHeight: '1.2' }}>{pil.subtitle}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(homeData?.suganyaProfile?.bioParagraphs && homeData.suganyaProfile.bioParagraphs.length > 0 ? homeData.suganyaProfile.bioParagraphs : [
                "Suganya Sailesh is an engineering graduate with a strong professional background and extensive experience in the corporate sector. As Co-founder and Managing Director, she plays an active role in the leadership, administration, and ongoing development of the hospital.",
                "Her background in engineering and corporate work brings a structured, organized, and problem-solving approach to hospital management. She is also a Certified Parenting Coach and Certified Life Coach, with a strong interest in communication, wellbeing, and supportive relationships.",
                "Beyond her hospital responsibilities, she is committed to strengthening healthcare services and passionate about building supportive communities that encourage healthier lifestyles, personal growth, and mutual wellbeing."
              ]).map((para, paraIdx) => (
                <p key={paraIdx} style={{ color: '#FFFFFF', lineHeight: '1.65', fontSize: '0.95rem', margin: 0, fontWeight: '500' }}>
                  {para}
                </p>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '18px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-accent" style={{ padding: '12px 26px', fontSize: '0.95rem', fontWeight: '700', backgroundColor: '#061D38', color: '#FFFFFF', border: 'none' }}>About Hospital Leadership</Link>
              <Link to="/contact" className="btn btn-outline" style={{ padding: '12px 26px', fontSize: '0.95rem', fontWeight: '700', borderColor: '#FFFFFF', color: '#FFFFFF' }}>Contact Administration</Link>
            </div>
          </div>

          {/* Image on the Right - Perfect Square matching Founder */}
          <div className="doctor-image" data-aos="fade-left" style={{ maxWidth: '460px', width: '100%', alignSelf: 'center', margin: '0 auto' }}>
            <img 
              src={homeData?.suganyaProfile?.image ? urlFor(homeData.suganyaProfile.image).url() : "/cofounder.png"} 
              alt={homeData?.suganyaProfile?.name || "V. Suganya Sailesh - Co-founder & Managing Director"} 
              onError={(e) => { 
                e.target.src = '/cofounder.png'; 
              }} 
              style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '12px', display: 'block', objectFit: 'cover', objectPosition: 'top center', boxShadow: '0 10px 30px rgba(0,0,0,0.22)' }}
            />
          </div>

        </div>
      </section>`;

code = code.replace(oldCoFounderRegex, newCoFounder);

// 4. Replace CTA Section
const oldCtaRegex = /\{\/\* CTA Section \*\/\}[\s\S]*?<\/section>/m;
const newCta = `{/* CTA Section */}
      <section style={{ backgroundColor: '#071A2E', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginBottom: '12px' }}>
            {homeData?.consultationCTA?.heading || "Need a Medical Consultation?"}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 30px' }}>
            {homeData?.consultationCTA?.subheading || "Our specialists are ready to provide you with the best healthcare."}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn btn-accent btn-magnetic" style={{ padding: '14px 35px', borderRadius: '30px', fontWeight: '700', backgroundColor: '#00B4D8', color: '#061D38', border: 'none' }}>
              {homeData?.consultationCTA?.buttonText || "Book Appointment"}
            </Link>
            <a href={\`tel:\${(homeData?.consultationCTA?.phone || '+91 93455 10905').replace(/\\s+/g, '')}\`} className="btn btn-outline btn-magnetic" style={{ padding: '14px 35px', borderRadius: '30px', fontWeight: '700', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              Emergency Call: {homeData?.consultationCTA?.phone || "+91 93455 10905"}
            </a>
          </div>
        </div>
      </section>`;

code = code.replace(oldCtaRegex, newCta);

fs.writeFileSync(homePath, code, 'utf8');
console.log('✅ Home.jsx updated with all dynamic sections and safe fallbacks!');

