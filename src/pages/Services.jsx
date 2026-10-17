import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  ClipboardList, 
  Clock, 
  PhoneCall, 
  Heart, 
  Baby, 
  Brain, 
  Syringe, 
  Stethoscope, 
  Scissors, 
  ShieldAlert, 
  Sparkles, 
  Search, 
  Award, 
  CheckCircle2, 
  Calendar,
  Phone,
  ArrowRight,
  Filter
} from 'lucide-react';

const realDepartments = [
  {
    _id: 'dept-1',
    title: 'Laparoscopic & Keyhole Surgery',
    tamilTitle: 'லேப்ரோஸ்கோபிக் அறுவை சிகிச்சை மையம்',
    category: 'Surgical Excellence',
    icon: 'Scissors',
    doctor: 'Dr. B. Saileshkumar',
    doctorRole: 'Founder & Chief Laparoscopic Surgeon',
    degree: 'MBBS, M.S., FIAGES, FALS',
    badge: '10,000+ Surgeries • 2,000+ Laparoscopic',
    description: 'Sivakasi’s premier center for advanced minimally invasive keyhole procedures. High-definition camera towers and fine instruments ensure tiny incisions, zero ugly stitches, minimal pain, and rapid discharge.',
    keyProcedures: [
      'Laparoscopic Hysterectomy (கருப்பை நீக்கம்)',
      'Laparoscopic Appendectomy (குடல்வால் அறுவை)',
      'Laparoscopic Cholecystectomy (பித்தப்பை கல்)',
      'Hernia Repair & Ovarian Cyst (குடல் இறக்கம் & நீர்க்கட்டி)'
    ]
  },
  {
    _id: 'dept-2',
    title: 'Surgical Oncology (Cancer Surgery)',
    tamilTitle: 'புற்றுநோய் அறுவை சிகிச்சை துறை',
    category: 'Super-Specialties',
    icon: 'ShieldAlert',
    doctor: 'Dr. Gurumoorthi & Dr. Manikandan',
    doctorRole: 'Visiting Surgical Oncologists',
    degree: 'M.S., M.Ch. (Surgical Oncology)',
    badge: '100+ Cancer Surgeries Concluded',
    description: 'Advanced surgical oncological care bringing tertiary-tier cancer resection, staging, and comprehensive oncological multidisciplinary surgical expertise directly to patients in Virudhunagar district.',
    keyProcedures: [
      'Tumor Resection & Clinical Staging',
      'Gastrointestinal & Colorectal Cancer Surgery',
      'Breast Cancer Surgery & Lumpectomy',
      'Head, Neck & Oral Cavity Oncological Care'
    ]
  },
  {
    _id: 'dept-3',
    title: 'Medical & Surgical Gastroenterology',
    tamilTitle: 'குடல் மற்றும் கல்லீரல் சிறப்பு சிகிச்சை',
    category: 'Super-Specialties',
    icon: 'Activity',
    doctor: 'Dr. A.C. Arun',
    doctorRole: 'Visiting Medical Gastroenterologist',
    degree: 'M.D., D.M. (Gastroenterology)',
    badge: 'Comprehensive Liver & GI Center',
    description: 'Specialized diagnosis and expert therapeutic management of complex digestive disorders, liver cirrhosis, chronic hepatitis, acid reflux, peptic ulcers, and bowel conditions.',
    keyProcedures: [
      'Diagnostic & Therapeutic Endoscopy',
      'Liver Cirrhosis, Fatty Liver & Hepatitis Care',
      'Severe Chronic Acid Reflux & Ulcer Therapies',
      'Inflammatory Bowel Disease & Colon Health'
    ]
  },
  {
    _id: 'dept-4',
    title: 'Plastic & Cosmetic Reconstructive Surgery',
    tamilTitle: 'ஒட்டுறுப்பு அறுவை சிகிச்சை துறை',
    category: 'Super-Specialties',
    icon: 'Sparkles',
    doctor: 'Dr. R. Arunkumar',
    doctorRole: 'Visiting Plastic & Reconstructive Surgeon',
    degree: 'M.S., M.Ch. (Plastic Surgery)',
    badge: 'Precision Aesthetics & Trauma Reconstruction',
    description: 'Fine microsurgical interventions for accidental trauma, deep soft tissue injuries, burn contracture releases, aesthetic contouring, and diabetic foot limb-salvage reconstruction.',
    keyProcedures: [
      'Accident Trauma & Soft Tissue Reconstruction',
      'Burn Wound Contracture Release & Skin Grafting',
      'Diabetic Foot Ulcer Limb-Salvage Surgeries',
      'Cosmetic Scar Revision & Facial Contouring'
    ]
  },
  {
    _id: 'dept-5',
    title: 'Paediatric Surgery & Neonatal Care',
    tamilTitle: 'குழந்தைகள் அறுவை சிகிச்சை துறை',
    category: 'Women & Child',
    icon: 'Baby',
    doctor: 'Dr. J. Arunkumar',
    doctorRole: 'Visiting Paediatric Surgeon',
    degree: 'M.S., M.Ch. (Paediatric Surgery)',
    badge: 'Gentle, Compassionate Pediatric Care',
    description: 'Specialized operative care tailored exclusively for newborns, infants, and growing children, ensuring gentle surgical handling, pediatric safety, and warm bedside care.',
    keyProcedures: [
      'Congenital Malformation Corrections',
      'Paediatric Hernia, Hydrocele & Phimosis Care',
      'Neonatal Surgical Emergencies & Anomalies',
      'Pediatric Abdominal Keyhole Interventions'
    ]
  },
  {
    _id: 'dept-6',
    title: 'Urology & Laser Stone Care',
    tamilTitle: 'சிறுநீரக & கல் அறுவை சிகிச்சை',
    category: 'Super-Specialties',
    icon: 'Activity',
    doctor: 'Dr. G. Sankar',
    doctorRole: 'Visiting Urologist & Renal Surgeon',
    degree: 'M.S., M.Ch. (Urology)',
    badge: 'Modern Endoscopic & Laser Urology',
    description: 'Comprehensive treatment for urinary tract and kidney disorders. Advanced minimally invasive laser stone dissolution, prostate enlargement therapies, and uro-surgical corrections.',
    keyProcedures: [
      'Laser Kidney & Ureteric Stone Lithotripsy',
      'Prostate Enlargement (BPH) Assessment & Care',
      'Urinary Tract Infection & Stricture Relief',
      'Bladder Tumors & Hematuria Evaluation'
    ]
  },
  {
    _id: 'dept-7',
    title: 'Orthopaedics & Fracture Trauma',
    tamilTitle: 'எலும்பு முறிவு & மூட்டு அறுவை சிகிச்சை',
    category: 'Surgical Excellence',
    icon: 'Activity',
    doctor: 'Dr. Deepan Ramkumar',
    doctorRole: 'Visiting Orthopaedic Surgeon',
    degree: 'M.S. Ortho',
    badge: '24/7 Fracture Emergency & Joint Mobility',
    description: 'Fast-track emergency fracture care, road accident trauma resuscitation, bone fixation with modern plates and nails, joint arthritis management, and spine pain rehabilitation.',
    keyProcedures: [
      '24/7 Emergency Fracture Fixation & Plating',
      'Knee, Hip & Joint Degeneration Therapy',
      'Chronic Low Back & Neck Spine Management',
      'Tendon, Ligament & Sports Injury Care'
    ]
  },
  {
    _id: 'dept-8',
    title: 'Obstetrics & Gynaecology',
    tamilTitle: 'மகப்பேறு & மகளிர் நல அறுவை சிகிச்சை',
    category: 'Women & Child',
    icon: 'Baby',
    doctor: 'Dr. Sangeetha & Surgical Team',
    doctorRole: 'Consultant Obstetrician & Gynaecologist',
    degree: 'MBBS, DGO',
    badge: '3,000+ Successful Deliveries & C-Sections',
    description: 'Complete, gentle healthcare for women through every chapter of life. From pre-conceptional counseling, high-risk maternity care, painless normal delivery, to laparoscopic gynaecological surgeries.',
    keyProcedures: [
      'Safe Normal Deliveries & Planned C-Sections',
      'High-Risk Pregnancy & Fetal Heart Monitoring',
      'Fibroid Uterus & Ovarian Cyst Management',
      'PCOS, Irregular Cycles & Infertility Workup'
    ]
  },
  {
    _id: 'dept-9',
    title: 'General Medicine & Diabetology',
    tamilTitle: 'பொது மருத்துவம் & நீரிழிவு சிறப்பு சிகிச்சை',
    category: 'Clinical & Emergency',
    icon: 'Stethoscope',
    doctor: 'Dr. Sivram & Dr. P. Karthikeyan',
    doctorRole: 'Consultant Physicians',
    degree: 'MBBS, DNB / MBBS, MD',
    badge: 'Holistic Adult Wellness & Chronic Care',
    description: 'Evidence-based internal medicine diagnosing and managing infectious illnesses, dengue, fever spikes, uncontrolled diabetes mellitus, hypertension, cholesterol, and respiratory diseases.',
    keyProcedures: [
      'Uncontrolled Diabetes & Neuropathy Management',
      'Hypertension & Cardiovascular Risk Assessment',
      'Infectious Fevers (Dengue, Typhoid, Viral Fevers)',
      'Executive Whole-Body Preventive Health Checkups'
    ]
  },
  {
    _id: 'dept-10',
    title: 'Anaesthesiology & Critical Care',
    tamilTitle: 'மயக்கவியல் & தீவிர அவசர சிகிச்சை பிரிவு',
    category: 'Clinical & Emergency',
    icon: 'Syringe',
    doctor: 'Dr. S. Sri Kishore Ganesh & Dr. M. Jeganatha Prabhu',
    doctorRole: 'Consultant Anaesthesiologists',
    degree: 'M.D. / D.A.',
    badge: 'Painless Labor & Safe Surgical Anaesthesia',
    description: 'Round-the-clock perioperative vigilance ensuring total pain-free surgical procedures, state-of-the-art epidural labour analgesia, and intensive post-operative critical care monitoring.',
    keyProcedures: [
      'Multi-Modal Surgical General & Spinal Anaesthesia',
      'Painless Labour Delivery (Epidural Analgesia)',
      'Post-Operative Acute Pain Relief Protocols',
      'ICU Patient Resuscitation & Oxygen Monitoring'
    ]
  },
  {
    _id: 'dept-11',
    title: '24/7 Casualty & Trauma Center',
    tamilTitle: '24 மணி நேர அவசர விபத்து சிகிச்சை பிரிவு',
    category: 'Clinical & Emergency',
    icon: 'Activity',
    doctor: 'Emergency Medical Officers & On-Call Surgeons',
    doctorRole: 'Round-the-Clock Emergency Team',
    degree: 'Emergency Triage & Surgical Support',
    badge: 'Always Open • Zero Wait Time Triage',
    description: 'Equipped with multi-parameter cardiac monitors, oxygen delivery units, emergency trauma resuscitation kits, and an on-call surgical theatre ready to respond immediately to critical emergencies.',
    keyProcedures: [
      'Acute Accident Trauma, Cuts & Burn Triage',
      'Severe Abdominal Pain & Bleeding Management',
      'Asthma, Respiratory Distress & Nebulisation',
      'Immediate 24/7 Doctor Evaluation & Stabilization'
    ]
  },
  {
    _id: 'dept-12',
    title: 'In-House Diagnostics & Digital ECG',
    tamilTitle: 'துல்லிய ஆய்வகம் & டிஜிட்டல் ECG பிரிவு',
    category: 'Clinical & Emergency',
    icon: 'Activity',
    doctor: 'Certified Pathologists & Bio-Technicians',
    doctorRole: 'Diagnostic Laboratory Division',
    degree: 'Automated Pathology & ECG',
    badge: 'Fast, Accurate Computerized Reports',
    description: 'In-house automated lab analyzing blood, biochemistry, and computerized 12-lead digital ECGs swiftly to provide our doctors and visiting specialists with prompt diagnostic clarity.',
    keyProcedures: [
      'Computerized 12-Lead Digital ECG Testing',
      'Complete Blood Counts (CBC), ESR & Coagulation',
      'Liver & Kidney Function Profiles (LFT, RFT)',
      'Blood Sugar, HbA1c, Urine & Lipid Panels'
    ]
  }
];

const categoryList = [
  'All Departments',
  'Surgical Excellence',
  'Super-Specialties',
  'Women & Child',
  'Clinical & Emergency'
];

const IconMapper = ({ name, size = 32, color = 'var(--accent)' }) => {
  switch (name) {
    case 'Heart': return <Heart size={size} color={color} />;
    case 'Baby': return <Baby size={size} color={color} />;
    case 'Brain': return <Brain size={size} color={color} />;
    case 'Stethoscope': return <Stethoscope size={size} color={color} />;
    case 'Scissors': return <Scissors size={size} color={color} />;
    case 'Syringe': return <Syringe size={size} color={color} />;
    case 'ShieldAlert': return <ShieldAlert size={size} color={color} />;
    case 'Sparkles': return <Sparkles size={size} color={color} />;
    default: return <Activity size={size} color={color} />;
  }
};

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Departments');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepts = realDepartments.filter((dept) => {
    const matchesCategory = selectedCategory === 'All Departments' || dept.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery = 
      dept.title.toLowerCase().includes(q) ||
      dept.tamilTitle.toLowerCase().includes(q) ||
      dept.doctor.toLowerCase().includes(q) ||
      dept.description.toLowerCase().includes(q) ||
      dept.keyProcedures.some((p) => p.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="page-transition" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      
      {/* 1. Ultra Premium Header */}
      <section style={{ 
        padding: '160px 0 90px', 
        background: 'linear-gradient(rgba(10, 43, 78, 0.94), rgba(10, 43, 78, 0.88)), url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        <div className="container" data-aos="fade-up">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(224, 169, 109, 0.15)',
            border: '1px solid rgba(224, 169, 109, 0.4)',
            color: 'var(--accent)',
            padding: '6px 20px',
            borderRadius: '25px',
            fontSize: '0.88rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            <Sparkles size={16} /> சிறப்பு மருத்துவ துறைகள் • Centers of Clinical Excellence
          </div>

          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginBottom: '16px', letterSpacing: '0.5px', fontWeight: 'bold', lineHeight: '1.2' }}>
            Comprehensive Medical & Surgical Departments
          </h1>

          <p style={{ fontSize: '1.2rem', maxWidth: '820px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8' }}>
            Led by award-winning Chief Laparoscopic Surgeon <strong>Dr. B. Saileshkumar</strong> (10,000+ Surgeries) alongside a distinguished team of visiting super-specialists in surgical oncology, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics in Sivakasi.
          </p>
        </div>
      </section>

      {/* 2. Interactive Search & Category Filter Section */}
      <section style={{ 
        padding: '60px 0 90px', 
        background: 'linear-gradient(180deg, #EBF2F8 0%, #F3F7FA 50%, #EAEFF5 100%)',
        borderBottom: '1px solid rgba(10, 43, 78, 0.08)'
      }}>
        <div className="dept-fullwidth-wrap">

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '35px' }} data-aos="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(10, 43, 78, 0.08)', color: 'var(--primary)', padding: '6px 18px', borderRadius: '25px', fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px', border: '1px solid rgba(10, 43, 78, 0.15)' }}>
              ★ அனைத்து சிறப்பு பிரிவுகள்
            </div>
            <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '10px' }}>
              Specialized Clinical Departments
            </h2>
            <p style={{ color: '#555', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
              Explore our full range of 12 clinical and surgical disciplines equipped with state-of-the-art operative technology and verified specialists.
            </p>
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto 25px', position: 'relative' }} data-aos="fade-up">
            <Search size={20} color="#888" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search department, procedure (e.g. Hysterectomy, Oncology, Kidney Stone)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 50px',
                borderRadius: '30px',
                border: '2px solid rgba(10, 43, 78, 0.15)',
                backgroundColor: '#ffffff',
                fontSize: '0.98rem',
                outline: 'none',
                boxShadow: '0 6px 20px rgba(10, 43, 78, 0.06)',
                transition: 'all 0.3s ease'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '40px' }} data-aos="fade-up">
            {categoryList.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = cat === 'All Departments' 
                ? realDepartments.length 
                : realDepartments.filter(d => d.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? '700' : '500',
                    border: isActive ? '2px solid var(--accent)' : '1px solid rgba(10, 43, 78, 0.12)',
                    backgroundColor: isActive ? 'var(--primary)' : '#ffffff',
                    color: isActive ? 'var(--accent)' : 'var(--primary)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isActive ? '0 4px 14px rgba(10, 43, 78, 0.25)' : '0 2px 6px rgba(0,0,0,0.04)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{cat}</span>
                  <span style={{ 
                    backgroundColor: isActive ? 'rgba(224, 169, 109, 0.25)' : 'rgba(10, 43, 78, 0.08)', 
                    color: isActive ? 'var(--accent)' : '#555',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    fontWeight: '700'
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback for query */}
          {searchQuery && (
            <div style={{ textAlign: 'center', marginBottom: '25px', color: '#555', fontSize: '0.95rem' }}>
              Found <strong>{filteredDepts.length}</strong> department(s) matching "{searchQuery}"
            </div>
          )}

          {/* 3. Departments Grid - Square-Proportioned Luxe Tiles */}
          {filteredDepts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
              <Award size={48} color="#ccc" style={{ marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--primary)', marginBottom: '8px' }}>No departments found</h3>
              <p style={{ color: '#777', marginBottom: '20px' }}>Try searching with a different term or reset filters.</p>
              <button 
                onClick={() => { setSelectedCategory('All Departments'); setSearchQuery(''); }}
                className="btn btn-accent"
                style={{ padding: '8px 24px', borderRadius: '20px', fontSize: '0.9rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="dept-grid-container">
              {filteredDepts.map((dept, index) => (
                <div 
                  key={`${dept._id}-${selectedCategory}`} 
                  className="dept-luxe-card tile-stream-in"
                  data-aos="fade-up" 
                  data-aos-delay={`${(index % 3 + 1) * 80}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="dept-luxe-inner">
                    
                    {/* Header Row: Category Badge + Highlight Badge (Left) and Department Icon (Right) */}
                    <div className="dept-header-row">
                      <div className="dept-badges-group">
                        <span className="dept-category-tag">
                          {dept.category}
                        </span>
                        <span className="dept-highlight-tag">
                          <CheckCircle2 size={13} color="var(--accent)" /> {dept.badge}
                        </span>
                      </div>

                      <div className="dept-icon-box">
                        <IconMapper name={dept.icon} size={22} color="var(--accent)" />
                      </div>
                    </div>

                    {/* Department Title (English & Tamil) */}
                    <div className="dept-title-block">
                      <h3 className="dept-title-en">
                        {dept.title}
                      </h3>
                      <div className="dept-title-ta">
                        {dept.tamilTitle}
                      </div>
                    </div>

                    {/* Doctor Association Box */}
                    <div className="dept-doctor-card">
                      <div className="dept-doc-role">
                        {dept.doctorRole}
                      </div>
                      <div className="dept-doc-name-wrap">
                        <span className="dept-doc-name">{dept.doctor}</span>
                        <span className="dept-doc-degree">• {dept.degree}</span>
                      </div>
                    </div>

                    {/* Department Description */}
                    <p className="dept-desc-text">
                      {dept.description}
                    </p>

                    {/* Key Procedures (All 4 Preserved) */}
                    <div className="dept-proc-box">
                      <div className="dept-proc-heading">
                        Key Procedures & Clinical Focus:
                      </div>
                      <div className="dept-proc-list">
                        {dept.keyProcedures.map((proc, pIdx) => (
                          <div key={pIdx} className="dept-proc-item">
                            <span className="dept-proc-bullet">•</span>
                            <span className="dept-proc-text">{proc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer: Book Consultation Action Button */}
                    <div className="dept-card-footer">
                      <Link 
                        to="/appointment" 
                        state={{ department: dept.title, doctorName: dept.doctor }}
                        className="dept-book-btn"
                      >
                        <Calendar size={15} /> Book Consultation <ArrowRight size={15} />
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 4. Preventive Health Packages Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '50px' }}>
            
            <div data-aos="fade-right" style={{ flex: '1 1 500px' }}>
              <div style={{
                color: 'var(--accent)',
                fontSize: '0.85rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px'
              }}>
                Preventive Health Checkup
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--white)' }}>
                Comprehensive Master Health Packages
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '25px', color: 'rgba(255,255,255,0.88)' }}>
                Prevention is always superior to cure. JB Healthcare offers customized health screening packages designed for all age groups to detect asymptomatic risks early and maintain enduring health.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                {[
                  { title: 'Master Diabetic Profile', desc: 'Fasting sugar, HbA1c, urine microalbumin & nerve checks' },
                  { title: 'Senior Citizen Health Care', desc: 'Renal, cardiac, liver & complete bone health profiles' },
                  { title: 'Women Wellness Screening', desc: 'Gynaec consult, pelvic check, anaemia & hormone panel' },
                  { title: 'Complete Cardiac Evaluation', desc: 'Digital ECG, blood lipid profile & blood pressure review' }
                ].map((pkg, i) => (
                  <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(224, 169, 109, 0.25)' }}>
                    <div style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Activity size={16} /> {pkg.title}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', lineHeight: '1.4' }}>
                      {pkg.desc}
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/appointment" 
                state={{ department: "Master Health Checkup" }}
                className="btn btn-accent" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', fontSize: '1rem', borderRadius: '30px', fontWeight: 'bold' }}
              >
                <Calendar size={18} /> Enquire / Book Health Package
              </Link>
            </div>
            
            <div data-aos="fade-left" style={{ flex: '1 1 400px' }}>
              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.35)', border: '2px solid rgba(224, 169, 109, 0.3)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="JB Healthcare Health Packages" 
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} 
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 30px 25px', background: 'linear-gradient(to top, rgba(10, 43, 78, 0.98) 0%, rgba(10, 43, 78, 0.7) 65%, transparent 100%)' }}>
                  <span style={{ backgroundColor: 'var(--accent)', color: '#0A2540', padding: '3px 12px', borderRadius: '15px', fontSize: '0.78rem', fontWeight: 'bold' }}>
                    Special Offer
                  </span>
                  <h3 style={{ color: 'var(--white)', fontSize: '1.6rem', marginTop: '8px', marginBottom: '4px' }}>Master Health Checkup</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '0.95rem' }}>Packages starting from ₹1,999/- only</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. How It Works / Patient Journey */}
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
          <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--accent)', margin: '0 auto 50px auto', borderRadius: '2px' }} data-aos="fade-up"></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '40px 30px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(10,43,78,0.08)' }} data-aos="fade-up" data-aos-delay="100">
              <div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(224, 169, 109, 0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px auto', border: '1.5px solid rgba(224, 169, 109, 0.3)' }}>
                <PhoneCall size={34} color="var(--accent)" />
              </div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.35rem', marginBottom: '10px' }}>1. Book Appointment</h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>Easily schedule your visit via WhatsApp or call us directly at 04562-299920. Say goodbye to long waiting queues.</p>
            </div>
            
            <div style={{ backgroundColor: '#ffffff', padding: '40px 30px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(10,43,78,0.08)' }} data-aos="fade-up" data-aos-delay="200">
              <div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(224, 169, 109, 0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px auto', border: '1.5px solid rgba(224, 169, 109, 0.3)' }}>
                <ClipboardList size={34} color="var(--accent)" />
              </div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.35rem', marginBottom: '10px' }}>2. Specialist Consultation</h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>Consult with Dr. B. Saileshkumar or our visiting super-specialists for a detailed, caring, and precise clinical evaluation.</p>
            </div>
            
            <div style={{ backgroundColor: '#ffffff', padding: '40px 30px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(10,43,78,0.08)' }} data-aos="fade-up" data-aos-delay="300">
              <div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(224, 169, 109, 0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px auto', border: '1.5px solid rgba(224, 169, 109, 0.3)' }}>
                <Clock size={34} color="var(--accent)" />
              </div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.35rem', marginBottom: '10px' }}>3. Rapid Recovery & Care</h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>Experience minimally invasive keyhole procedures, zero scars, and prompt discharge with regular follow-ups for full recovery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Emergency Callout Bar */}
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
      </section>

      <style>{`
        .dept-fullwidth-wrap {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 30px;
        }

        .dept-grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          width: 100%;
        }
        @media (max-width: 1120px) {
          .dept-grid-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 22px;
          }
        }
        @media (max-width: 680px) {
          .dept-grid-container {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }

        @keyframes tileStreamIn {
          0% {
            opacity: 0;
            transform: translateY(32px) scale(0.95);
            filter: blur(4px);
          }
          60% {
            opacity: 0.95;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        .tile-stream-in {
          animation: tileStreamIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .dept-luxe-card {
          background: linear-gradient(145deg, #07192d 0%, #0b243d 100%);
          border-radius: 18px;
          padding: 8px;
          box-shadow: 0 12px 32px rgba(7, 25, 45, 0.28);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .dept-luxe-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 20px 48px rgba(7, 25, 45, 0.45) !important;
        }
        .dept-luxe-inner {
          border: 1.5px solid rgba(224, 169, 109, 0.45);
          border-radius: 13px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .dept-luxe-card:hover .dept-luxe-inner {
          border-color: #e0a96d !important;
          box-shadow: inset 0 0 24px rgba(224, 169, 109, 0.06);
        }

        .dept-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
        }
        .dept-badges-group {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .dept-category-tag {
          background-color: rgba(224, 169, 109, 0.14);
          color: var(--accent);
          border: 1px solid rgba(224, 169, 109, 0.4);
          padding: 3px 10px;
          border-radius: 14px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }
        .dept-highlight-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.92);
          padding: 3px 10px;
          border-radius: 14px;
          font-size: 0.73rem;
          font-weight: 600;
        }
        .dept-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(224, 169, 109, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dept-title-block {
          margin-bottom: 12px;
        }
        .dept-title-en {
          color: var(--white);
          font-size: 1.26rem;
          font-weight: 700;
          margin: 0 0 3px;
          line-height: 1.25;
        }
        .dept-title-ta {
          color: var(--accent);
          font-size: 0.86rem;
          font-weight: 600;
        }

        .dept-doctor-card {
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9px;
          padding: 8px 12px;
          margin-bottom: 12px;
        }
        .dept-doc-role {
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .dept-doc-name-wrap {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 1px;
        }
        .dept-doc-name {
          color: var(--white);
          font-size: 0.92rem;
          font-weight: 700;
        }
        .dept-doc-degree {
          color: rgba(224, 169, 109, 0.92);
          font-size: 0.78rem;
          font-weight: 500;
        }

        .dept-desc-text {
          color: rgba(255, 255, 255, 0.82);
          font-size: 0.85rem;
          line-height: 1.52;
          margin: 0 0 12px;
        }

        .dept-proc-box {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 9px;
          padding: 10px 12px;
          margin-bottom: 14px;
          flex: 1;
        }
        .dept-proc-heading {
          color: var(--accent);
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 8px;
        }
        .dept-proc-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .dept-proc-item {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .dept-proc-bullet {
          color: var(--accent);
          font-size: 0.95rem;
          line-height: 1;
          flex-shrink: 0;
        }
        .dept-proc-text {
          color: rgba(255, 255, 255, 0.88);
          font-size: 0.82rem;
          line-height: 1.38;
        }

        .dept-card-footer {
          margin-top: auto;
        }
        .dept-book-btn {
          background-color: rgba(224, 169, 109, 0.14);
          border: 1px solid rgba(224, 169, 109, 0.45);
          color: var(--accent);
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.25s ease;
          width: 100%;
        }
        .dept-book-btn:hover {
          background-color: var(--accent) !important;
          color: #0A2540 !important;
        }
      `}</style>
      
    </div>
  );
};

export default Services;

