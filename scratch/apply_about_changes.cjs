const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/pages/About.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace top constants block from `const mainHeading = ` to before `return (`
const targetTop = `  // Use fallback text if data is still loading
  const mainHeading = aboutData?.mainHeading || "About JB Healthcare";
  const rawHistoryText = aboutData?.legacySection?.historyText || aboutData?.historyText || "Established with a bold vision to make premium, international-standard healthcare accessible to everyone, JB Healthcare has grown into a trusted name in Sivakasi, Tamil Nadu. Over the years, we have built a reputation based on trust, clinical excellence, and deep-rooted empathy.";
  const historyText = rawHistoryText.replace(/Anaiyur/gi, 'Sivakasi');
  const vision = aboutData?.vision || "To be the most trusted and respected healthcare partner in the region, recognized globally for our clinical excellence, compassionate care, and unwavering commitment to community wellness and health education.";
  const mission = aboutData?.mission || "We strive to deliver comprehensive, high-quality, and affordable healthcare services under one roof. Our mission is to continuously upgrade our medical technology, empower our staff through regular training, and provide a healing environment that consistently exceeds patient expectations.";
  const labHeading = aboutData?.labSection?.heading || aboutData?.labHeading || "In-House Diagnostic Center";
  const labDescription = aboutData?.labSection?.description || aboutData?.labDescription || "At JB Healthcare, we know that waiting for test results can be stressful for you and your family. That's why we've set up our own fully equipped diagnostic center right here inside our hospital.";
  const aboutImage = (aboutData?.legacySection?.aboutImage ? urlFor(aboutData.legacySection.aboutImage).url() : null) || (aboutData?.aboutImage ? urlFor(aboutData.aboutImage).url() : "/hospital_photos/jb_hospital_full_team.jpg");`;

const replacementTop = `  // Use fallback text if data is still loading
  const mainHeading = aboutData?.mainHeading || "About JB Healthcare";
  const subHeading = aboutData?.subHeading || "Committed to providing world-class medical facilities, innovative treatments, and compassionate care to our community. We believe in treating the whole person, not just the disease.";

  // Milestones
  const defaultMilestones = [
    { number: '10,000+', label: 'Successful Surgeries', rawEnd: 10000, suffix: '+' },
    { number: '2,000+', label: 'Laparoscopic Cases', rawEnd: 2000, suffix: '+' },
    { number: '3,000+', label: 'C-Section Deliveries', rawEnd: 3000, suffix: '+' },
    { number: '100+', label: 'Cancer Surgeries', rawEnd: 100, suffix: '+' },
    { number: '7 Yrs', label: 'Govt Service Record', rawEnd: 7, suffix: ' Yrs' }
  ];
  const milestonesList = (aboutData?.milestones && aboutData.milestones.length > 0)
    ? aboutData.milestones
    : defaultMilestones;

  // Founder Spotlight
  const founder = aboutData?.founderSpotlight;
  const founderImg = (founder?.image ? urlFor(founder.image).url() : null) || "/doctor.png";
  const founderBadge = founder?.badge || "Leadership & Clinical Vision";
  const founderName = founder?.name || "Dr. B. Saileshkumar";
  const founderDegree = founder?.degree || "MBBS., M.S., FIAGES., FALS — Founder & Chief Surgeon";
  const founderAwardTag = founder?.awardTag || "★ Best Doctor Award (2017 & 2018)";
  const founderBio = founder?.bio || "A native clinical leader with an extraordinary track record of more than 10,000 successful surgical operations and 2,000+ advanced laparoscopic procedures.";
  const defaultFounderCards = [
    {
      title: 'Education & Fellowships',
      description: 'MBBS (Madras Medical College), MS (Madurai Medical College), Laparoscopic Surgery Training (VG Hospital Coimbatore), FIAGES & FALS Fellowships.'
    },
    {
      title: 'Public Service & Honor',
      description: 'Conferred the Best Doctor Award for two consecutive years (2017 & 2018) by the District Collector. Secretary of IMA Sivakasi (2016-2017) and 7 years of public health service across Virudhunagar district.'
    }
  ];
  const founderCards = (founder?.infoCards && founder.infoCards.length > 0) ? founder.infoCards : defaultFounderCards;

  // Legacy of Care
  const legacy = aboutData?.legacySection;
  const legacyHeading = legacy?.heading || "Our Legacy of Care";
  const rawHistoryText = legacy?.historyText || aboutData?.historyText || "Established with a bold vision to make premium, international-standard healthcare accessible to everyone, JB Healthcare has grown into a trusted name in Sivakasi, Tamil Nadu. Over the years, we have built a reputation based on trust, clinical excellence, and deep-rooted empathy.";
  const historyText = rawHistoryText.replace(/Anaiyur/gi, 'Sivakasi');
  const legacyInfraText = legacy?.infrastructureText || "Our state-of-the-art infrastructure was designed from the ground up keeping patient comfort and advanced medical requirements in mind. We believe that healing is a holistic process, which is why our facilities look and feel welcoming rather than clinical.";
  const floatingTitle = legacy?.floatingTitle || "Healing Hands, Caring Hearts";
  const floatingSubtitle = legacy?.floatingSubtitle || "Every patient is treated with deep empathy like family";
  const aboutImage = (legacy?.aboutImage ? urlFor(legacy.aboutImage).url() : null) || (aboutData?.aboutImage ? urlFor(aboutData.aboutImage).url() : "/hospital_photos/jb_hospital_full_team.jpg");
  const defaultLegacyFeatures = [
    { icon: Clock, title: '24/7 Dedicated Emergency Care', desc: 'Always ready with emergency surgical casualty & on-call surgeons' },
    { icon: Award, title: 'Award-Winning Specialists', desc: 'Expert laparoscopic surgeons & multi-speciality consultants' },
    { icon: Activity, title: 'Rapid Diagnostics & ECG', desc: 'In-house automated lab results and digital ECG monitoring' },
    { icon: ShieldCheck, title: 'Hygienic IP & OP Wards', desc: 'Spacious inpatient recovery suites & tranquil outpatient rooms' }
  ];
  const legacyIcons = [Clock, Award, Activity, ShieldCheck];
  const legacyFeaturesList = (legacy?.features && legacy.features.length > 0)
    ? legacy.features.map((item, idx) => ({
        icon: legacyIcons[idx % legacyIcons.length],
        title: item.title,
        desc: item.description || item.desc
      }))
    : defaultLegacyFeatures;

  // Vision & Mission
  const vision = aboutData?.vision || "To be the most trusted and respected healthcare partner in the region, recognized globally for our clinical excellence, compassionate care, and unwavering commitment to community wellness and health education.";
  const mission = aboutData?.mission || "We strive to deliver comprehensive, high-quality, and affordable healthcare services under one roof. Our mission is to continuously upgrade our medical technology, empower our staff through regular training, and provide a healing environment that consistently exceeds patient expectations.";

  // In-House Diagnostic Lab
  const lab = aboutData?.labSection;
  const labHeading = lab?.heading || aboutData?.labHeading || "In-House Diagnostic Center";
  const labSubheading = lab?.subheading || "Automated Pathology, Biochemistry & 3-Lead Digital ECG";
  const labDescription = lab?.description || aboutData?.labDescription || "At JB Healthcare, we know that waiting for test results can be stressful for you and your family. That's why we've set up our own fully equipped diagnostic center right here inside our hospital.";
  const labReliability = lab?.reliabilityText || "Whether it's a routine preventive health check-up or an urgent surgical casualty evaluation in the middle of the night, our certified laboratory technicians and modern analyzers ensure zero delay and complete clinical reliability.";
  const labImage = (lab?.image ? urlFor(lab.image).url() : null) || "/hospital_photos/hospital_lab_technician.jpg";

  // 4 Lab Features (From Image 1)
  const defaultLabFeatures = [
    { icon: Zap, title: 'Fast & Accurate Results', desc: 'Instant computerized reports to begin correct medical care promptly' },
    { icon: Clock, title: '24/7 Emergency Lab', desc: 'Round-the-clock testing ready for night casualty & emergency OT' },
    { icon: ShieldCheck, title: 'Sterile & Safe Testing', desc: 'Ultra-hygienic automated sampling ensuring zero contamination risk' },
    { icon: Activity, title: 'Digital ECG & Biochemistry', desc: 'Instant 3-lead cardiac ECG, blood sugar, LFT, RFT & lipid panels' }
  ];
  const labIcons = [Zap, Clock, ShieldCheck, Activity];
  const labFeaturesList = (lab?.labFeatures && lab.labFeatures.length > 0)
    ? lab.labFeatures.map((item, idx) => ({
        icon: labIcons[idx % labIcons.length],
        title: item.title,
        desc: item.desc || item.description
      }))
    : defaultLabFeatures;

  // Core Values (From Image 2)
  const coreValuesHeading = aboutData?.coreValuesSection?.heading || "Our Core Values";
  const coreValuesSubtitle = aboutData?.coreValuesSection?.subtitle || "The foundation of JB Healthcare is built upon strong ethical principles that guide our every action, decision, and interaction with our patients.";
  const defaultCoreValues = [
    {
      title: 'Compassion',
      description: 'Treating every patient with immense dignity, respect, and unconditional kindness, understanding their pain and emotional needs.'
    },
    {
      title: 'Excellence',
      description: 'Maintaining the highest possible standards in clinical outcomes, patient safety, and medical technology integration.'
    },
    {
      title: 'Integrity',
      description: 'Ensuring absolute transparency in all our medical, ethical, and billing practices without any hidden agendas.'
    }
  ];
  const coreValuesList = (aboutData?.coreValuesSection?.values && aboutData.coreValuesSection.values.length > 0)
    ? aboutData.coreValuesSection.values
    : defaultCoreValues;

  // Why We Are Different (From Image 3)
  const whyDifferentHeading = aboutData?.whyDifferentSection?.heading || "Why We Are Different";
  const whyDifferentSubtitle = aboutData?.whyDifferentSection?.subtitle || "We don't just treat symptoms; we treat the person. At JB Healthcare, every protocol, every ward, and every consultation is designed with patient safety, comfort, and quick recovery at its core.";
  const defaultWhyDifferent = [
    {
      title: 'Patient-First Approach',
      description: 'We prioritize your comfort, encourage clear communication, and design completely personalized treatment plans for every individual.'
    },
    {
      title: 'Experienced Specialists',
      description: 'Our board-certified doctors and surgeons bring decades of rich experience across multiple advanced medical disciplines.'
    },
    {
      title: 'Hygienic Environment',
      description: 'We adhere to the strictest international protocols for sanitation, waste management, and overall infection control.'
    }
  ];
  const whyDifferentList = (aboutData?.whyDifferentSection?.features && aboutData.whyDifferentSection.features.length > 0)
    ? aboutData.whyDifferentSection.features
    : defaultWhyDifferent;`;

// Normalize newlines for replacement
const normalize = (str) => str.replace(/\r\n/g, '\n');

let normContent = normalize(content);
const normTargetTop = normalize(targetTop);
const normReplacementTop = normalize(replacementTop);

if (!normContent.includes(normTargetTop)) {
  console.error('Target top not found!');
  process.exit(1);
}
normContent = normContent.replace(normTargetTop, normReplacementTop);

// Now update Milestones in JSX
const targetMilestones = `      {/* 2. Milestones (High Contrast Navy & Cyan) */}
      <section style={{ backgroundColor: '#061D38', padding: '50px 0', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '25px', textAlign: 'center' }}>
            <div data-aos="fade-up" data-aos-delay="100">
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}><CountUp end={10000} /></h2>
              <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>Successful Surgeries</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}><CountUp end={2000} /></h2>
              <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>Laparoscopic Cases</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}><CountUp end={3000} /></h2>
              <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>C-Section Deliveries</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}><CountUp end={100} /></h2>
              <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>Cancer Surgeries</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="500">
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}><CountUp end={7} suffix=" Yrs" /></h2>
              <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>Govt Service Record</p>
            </div>
          </div>
        </div>
      </section>`;

const replacementMilestones = `      {/* 2. Milestones (High Contrast Navy & Cyan) */}
      <section style={{ backgroundColor: '#061D38', padding: '50px 0', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '25px', textAlign: 'center' }}>
            {milestonesList.map((item, idx) => {
              const numStr = String(item.number || '');
              const digits = parseInt(numStr.replace(/[^0-9]/g, ''), 10);
              const suffix = numStr.replace(/[0-9,]/g, '').trim();
              return (
                <div key={item._key || idx} data-aos="fade-up" data-aos-delay={(idx + 1) * 100}>
                  <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '4px', color: '#00B4D8' }}>
                    {isNaN(digits) ? item.number : <CountUp end={digits} suffix={suffix ? (suffix.startsWith('+') ? '+' : \` \${suffix}\`) : '+'} />}
                  </h2>
                  <p style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF' }}>
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>`;

if (normContent.includes(normalize(targetMilestones))) {
  normContent = normContent.replace(normalize(targetMilestones), normalize(replacementMilestones));
} else {
  console.log('Target milestones not found, checking...');
}

// Now update Founder section
const targetFounder = `              <div data-aos="fade-right" style={{ textAlign: 'center' }}>
                <img 
                  src="/doctor.png" 
                  alt="Dr. B. Saileshkumar" 
                  style={{ width: '100%', maxWidth: '380px', borderRadius: '16px', boxShadow: '0 15px 30px rgba(0,0,0,0.3)', border: '3px solid #061D38' }} 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                />
                <div style={{ marginTop: '15px', display: 'inline-block', backgroundColor: '#061D38', color: '#FFFFFF', padding: '6px 18px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  ★ Best Doctor Award (2017 & 2018)
                </div>
              </div>
              <div data-aos="fade-left">
                <span style={{ color: '#061D38', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '800', fontSize: '0.85rem' }}>
                  Leadership & Clinical Vision
                </span>
                <h2 style={{ color: '#061D38', fontSize: '2.4rem', marginTop: '8px', marginBottom: '6px', fontWeight: '800' }}>
                  Dr. B. Saileshkumar
                </h2>
                <h4 style={{ color: '#061D38', fontSize: '1.15rem', marginBottom: '20px', fontWeight: '800' }}>
                  MBBS., M.S., FIAGES., FALS — Founder & Chief Surgeon
                </h4>
                
                <p style={{ color: '#061D38', lineHeight: '1.7', marginBottom: '15px', fontSize: '1.02rem', fontWeight: '500' }}>
                  A native clinical leader with an extraordinary track record of more than <strong>10,000 successful surgical operations</strong> and <strong>2,000+ advanced laparoscopic procedures</strong>.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '15px', marginTop: '20px' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.25)', padding: '14px', borderRadius: '10px', borderLeft: '3px solid #061D38' }}>
                    <h5 style={{ color: '#061D38', margin: '0 0 5px 0', fontSize: '0.98rem', fontWeight: '800' }}>Education & Fellowships</h5>
                    <p style={{ color: '#061D38', margin: 0, fontSize: '0.88rem', lineHeight: '1.5', fontWeight: '500' }}>
                      MBBS (Madras Medical College), MS (Madurai Medical College), Laparoscopic Surgery Training (VG Hospital Coimbatore), FIAGES & FALS Fellowships.
                    </p>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.25)', padding: '14px', borderRadius: '10px', borderLeft: '3px solid #061D38' }}>
                    <h5 style={{ color: '#061D38', margin: '0 0 5px 0', fontSize: '0.98rem', fontWeight: '800' }}>Public Service & Honor</h5>
                    <p style={{ color: '#061D38', margin: 0, fontSize: '0.88rem', lineHeight: '1.5', fontWeight: '500' }}>
                      Conferred the <strong>Best Doctor Award</strong> for two consecutive years (2017 & 2018) by the District Collector. Secretary of IMA Sivakasi (2016-2017) and 7 years of public health service across Virudhunagar district.
                    </p>
                  </div>
                </div>`;

const replacementFounder = `              <div data-aos="fade-right" style={{ textAlign: 'center' }}>
                <img 
                  src={founderImg} 
                  alt={founderName} 
                  style={{ width: '100%', maxWidth: '380px', borderRadius: '16px', boxShadow: '0 15px 30px rgba(0,0,0,0.3)', border: '3px solid #061D38' }} 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                />
                <div style={{ marginTop: '15px', display: 'inline-block', backgroundColor: '#061D38', color: '#FFFFFF', padding: '6px 18px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {founderAwardTag}
                </div>
              </div>
              <div data-aos="fade-left">
                <span style={{ color: '#061D38', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '800', fontSize: '0.85rem' }}>
                  {founderBadge}
                </span>
                <h2 style={{ color: '#061D38', fontSize: '2.4rem', marginTop: '8px', marginBottom: '6px', fontWeight: '800' }}>
                  {founderName}
                </h2>
                <h4 style={{ color: '#061D38', fontSize: '1.15rem', marginBottom: '20px', fontWeight: '800' }}>
                  {founderDegree}
                </h4>
                
                <p style={{ color: '#061D38', lineHeight: '1.7', marginBottom: '15px', fontSize: '1.02rem', fontWeight: '500' }}>
                  {founderBio}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '15px', marginTop: '20px' }}>
                  {founderCards.map((card, idx) => (
                    <div key={card._key || idx} style={{ backgroundColor: 'rgba(255,255,255,0.25)', padding: '14px', borderRadius: '10px', borderLeft: '3px solid #061D38' }}>
                      <h5 style={{ color: '#061D38', margin: '0 0 5px 0', fontSize: '0.98rem', fontWeight: '800' }}>{card.title}</h5>
                      <p style={{ color: '#061D38', margin: 0, fontSize: '0.88rem', lineHeight: '1.5', fontWeight: '500' }}>
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>`;

if (normContent.includes(normalize(targetFounder))) {
  normContent = normContent.replace(normalize(targetFounder), normalize(replacementFounder));
}

// Now update Lab Section Image & 4 features
const targetLabImage = `<img 
                  src="/hospital_photos/hospital_lab_technician.jpg" 
                  alt="JB Healthcare In-House Diagnostic Lab" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
                />`;
const replacementLabImage = `<img 
                  src={labImage} 
                  alt="JB Healthcare In-House Diagnostic Lab" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
                />`;
if (normContent.includes(normalize(targetLabImage))) {
  normContent = normContent.replace(normalize(targetLabImage), normalize(replacementLabImage));
}

const targetLabFeaturesGrid = `              {/* 4 Feature Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '28px' }}>
                {[
                  {
                    icon: Zap,
                    title: 'Fast & Accurate Results',
                    desc: 'Instant computerized reports to begin correct medical care promptly'
                  },
                  {
                    icon: Clock,
                    title: '24/7 Emergency Lab',
                    desc: 'Round-the-clock testing ready for night casualty & emergency OT'
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Sterile & Safe Testing',
                    desc: 'Ultra-hygienic automated sampling ensuring zero contamination risk'
                  },
                  {
                    icon: Activity,
                    title: 'Digital ECG & Biochemistry',
                    desc: 'Instant 3-lead cardiac ECG, blood sugar, LFT, RFT & lipid panels'
                  }
                ].map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#061D38',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '14px',
                        padding: '14px 16px',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
                        transition: 'transform 0.25s ease, border-color 0.25s ease'
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: '#00B4D8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#061D38',
                        flexShrink: 0
                      }}>
                        <ItemIcon size={18} color="#061D38" />
                      </div>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '0.94rem' }}>
                          {item.title}
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', marginTop: '2px', lineHeight: '1.4' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>`;

const replacementLabFeaturesGrid = `              {/* 4 Feature Cards Grid (Dynamic from Sanity labFeatures) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '28px' }}>
                {labFeaturesList.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={item._key || idx}
                      style={{
                        backgroundColor: '#061D38',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '14px',
                        padding: '14px 16px',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
                        transition: 'transform 0.25s ease, border-color 0.25s ease'
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: '#00B4D8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#061D38',
                        flexShrink: 0
                      }}>
                        <ItemIcon size={18} color="#061D38" />
                      </div>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '0.94rem' }}>
                          {item.title}
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', marginTop: '2px', lineHeight: '1.4' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>`;

if (normContent.includes(normalize(targetLabFeaturesGrid))) {
  normContent = normContent.replace(normalize(targetLabFeaturesGrid), normalize(replacementLabFeaturesGrid));
}

// Now update Core Values section
const targetCoreValues = `      {/* 5. Core Values (Light - White) */}
      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container text-center" data-aos="fade-up">
          <h2 className="section-title">Our Core Values</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 40px auto', fontSize: '1.1rem' }}>
            The foundation of JB Healthcare is built upon strong ethical principles that guide our every action, decision, and interaction with our patients.
          </p>
          <div className="services-grid">
            <div className="service-card" data-aos="zoom-in" data-aos-delay="100" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontSize: '1.8rem', fontWeight: '800' }}>Compassion</h3>
              <p className="mt-2" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)' }}>Treating every patient with immense dignity, respect, and unconditional kindness, understanding their pain and emotional needs.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="200" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontSize: '1.8rem', fontWeight: '800' }}>Excellence</h3>
              <p className="mt-2" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)' }}>Maintaining the highest possible standards in clinical outcomes, patient safety, and medical technology integration.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="300" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontSize: '1.8rem', fontWeight: '800' }}>Integrity</h3>
              <p className="mt-2" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)' }}>Ensuring absolute transparency in all our medical, ethical, and billing practices without any hidden agendas.</p>
            </div>
          </div>
        </div>
      </section>`;

const replacementCoreValues = `      {/* 5. Core Values (Dynamic from Sanity coreValuesSection) */}
      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container text-center" data-aos="fade-up">
          <h2 className="section-title">{coreValuesHeading}</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 40px auto', fontSize: '1.1rem' }}>
            {coreValuesSubtitle}
          </p>
          <div className="services-grid">
            {coreValuesList.map((item, idx) => (
              <div 
                key={item._key || idx} 
                className="service-card" 
                data-aos="zoom-in" 
                data-aos-delay={(idx + 1) * 100} 
                style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}
              >
                <h3 style={{ color: '#061D38', fontSize: '1.8rem', fontWeight: '800' }}>{item.title}</h3>
                <p className="mt-2" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>`;

if (normContent.includes(normalize(targetCoreValues))) {
  normContent = normContent.replace(normalize(targetCoreValues), normalize(replacementCoreValues));
}

// Now update Why We Are Different section
const targetWhyDiff = `      {/* 6. Why We Are Different (Light - Secondary/Grey) */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container text-center" data-aos="fade-up">
          <h2 className="section-title">Why We Are Different</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 40px auto', fontSize: '1.1rem' }}>
            We don't just treat symptoms; we treat the person. At JB Healthcare, every protocol, every ward, and every consultation is designed with patient safety, comfort, and quick recovery at its core.
          </p>
          <div className="services-grid">
            <div className="service-card" data-aos="zoom-in" data-aos-delay="100" style={{ borderLeft: '4px solid #061D38', textAlign: 'left', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>Patient-First Approach</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.95)' }}>We prioritize your comfort, encourage clear communication, and design completely personalized treatment plans for every individual.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="200" style={{ borderLeft: '4px solid #061D38', textAlign: 'left', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>Experienced Specialists</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.95)' }}>Our board-certified doctors and surgeons bring decades of rich experience across multiple advanced medical disciplines.</p>
            </div>
            <div className="service-card" data-aos="zoom-in" data-aos-delay="300" style={{ borderLeft: '4px solid #061D38', textAlign: 'left', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <h3 style={{ color: '#061D38', fontWeight: '800' }}>Hygienic Environment</h3>
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.95)' }}>We adhere to the strictest international protocols for sanitation, waste management, and overall infection control.</p>
            </div>
          </div>
        </div>
      </section>`;

const replacementWhyDiff = `      {/* 6. Why We Are Different (Dynamic from Sanity whyDifferentSection) */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container text-center" data-aos="fade-up">
          <h2 className="section-title">{whyDifferentHeading}</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 40px auto', fontSize: '1.1rem' }}>
            {whyDifferentSubtitle}
          </p>
          <div className="services-grid">
            {whyDifferentList.map((item, idx) => (
              <div 
                key={item._key || idx} 
                className="service-card" 
                data-aos="zoom-in" 
                data-aos-delay={(idx + 1) * 100} 
                style={{ borderLeft: '4px solid #061D38', textAlign: 'left', backgroundColor: 'var(--primary)', color: 'var(--white)' }}
              >
                <h3 style={{ color: '#061D38', fontWeight: '800' }}>{item.title}</h3>
                <p className="mt-2" style={{ color: 'rgba(255,255,255,0.95)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>`;

if (normContent.includes(normalize(targetWhyDiff))) {
  normContent = normContent.replace(normalize(targetWhyDiff), normalize(replacementWhyDiff));
}

// Convert back to CRLF
const crlfContent = normContent.replace(/\n/g, '\r\n');
fs.writeFileSync(filePath, crlfContent, 'utf8');
console.log('Successfully applied all dynamic updates to src/pages/About.jsx!');
