import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Search, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Filter,
  Building2,
  Stethoscope,
  MapPin
} from 'lucide-react';

const visitingSpecialists = [
  {
    _id: 'v-1',
    name: 'Dr. S. Sri Kishore Ganesh',
    degree: 'M.D.',
    categoryHeader: 'ANAESTHESIOLOGY & CRITICAL CARE',
    department: 'Anaesthesiology & Critical Care',
    category: 'Anaesthesiology',
    focusAreas: [
      'Surgical anaesthesia',
      'Painless delivery',
      'ICU & critical care',
      'Post-operative pain relief'
    ]
  },
  {
    _id: 'v-2',
    name: 'Dr. M. Jeganatha Prabhu',
    degree: 'D.A.',
    categoryHeader: 'ANAESTHESIOLOGY',
    department: 'Anaesthesiology',
    category: 'Anaesthesiology',
    focusAreas: [
      'General anaesthesia',
      'Regional anaesthesia',
      'Trauma sedation',
      'Emergency surgery care'
    ]
  },
  {
    _id: 'v-3',
    name: 'Dr. A.C. Arun',
    degree: 'M.D., D.M.',
    categoryHeader: 'GASTROENTEROLOGY',
    department: 'Medical Gastroenterology & Hepatology',
    category: 'Gastroenterology',
    focusAreas: [
      'Diagnostic endoscopy',
      'Liver disease & cirrhosis',
      'GERD & ulcer care',
      'GI bleed management'
    ]
  },
  {
    _id: 'v-4',
    name: 'Dr. Gurumoorthi',
    degree: 'M.S., M.Ch.',
    categoryHeader: 'SURGICAL ONCOLOGY',
    department: 'Surgical Oncology',
    category: 'Surgical Oncology',
    focusAreas: [
      'Tumor resection',
      'Gastrointestinal cancer',
      'Breast oncology',
      'Cancer staging'
    ]
  },
  {
    _id: 'v-5',
    name: 'Dr. Manikandan',
    degree: 'M.S., M.Ch.',
    categoryHeader: 'SURGICAL ONCOLOGY',
    department: 'Surgical Oncology',
    category: 'Surgical Oncology',
    focusAreas: [
      'Advanced onco-surgery',
      'Biopsy procedures',
      'Head & neck oncology',
      'Cancer staging & care'
    ]
  },
  {
    _id: 'v-6',
    name: 'Dr. R. Arunkumar',
    degree: 'M.S., M.Ch.',
    categoryHeader: 'PLASTIC SURGERY',
    department: 'Plastic & Reconstructive Surgery',
    category: 'Plastic Surgery',
    focusAreas: [
      'Trauma reconstruction',
      'Microvascular surgery',
      'Burn care & grafting',
      'Scar revision & cosmetic'
    ]
  },
  {
    _id: 'v-7',
    name: 'Dr. J. Arunkumar',
    degree: 'M.S., M.Ch.',
    categoryHeader: 'PAEDIATRIC SURGERY',
    department: 'Paediatric Surgery',
    category: 'Paediatric Surgery',
    focusAreas: [
      'Neonatal surgery',
      'Congenital anomalies',
      'Pediatric hernia',
      'Pediatric urology'
    ]
  },
  {
    _id: 'v-8',
    name: 'Dr. G. Sankar',
    degree: 'M.S., M.Ch.',
    categoryHeader: 'UROLOGY & RENAL',
    department: 'Urology & Renal Sciences',
    category: 'Urology',
    focusAreas: [
      'Kidney stone removal',
      'Prostate care & TURP',
      'Endo-urology',
      'Urinary tract disorders'
    ]
  },
  {
    _id: 'v-9',
    name: 'Dr. Deepan Ramkumar',
    degree: 'M.S. Ortho',
    categoryHeader: 'ORTHOPAEDIC SURGERY',
    department: 'Orthopaedics & Trauma Surgery',
    category: 'Orthopaedics',
    focusAreas: [
      'Complex fracture fixation',
      'Accident & trauma care',
      'Joint pain & arthritis',
      'Bone deformity correction'
    ]
  },
  {
    _id: 'v-10',
    name: 'Dr. Sivaram',
    degree: 'MBBS, DNB',
    categoryHeader: 'GENERAL MEDICINE',
    department: 'General Medicine & Diabetology',
    category: 'General Medicine',
    focusAreas: [
      'Diabetes management',
      'Hypertension care',
      'Infectious diseases',
      'Adult critical medicine'
    ]
  },
  {
    _id: 'v-11',
    name: 'Dr. Sangeetha',
    degree: 'MBBS, DGO',
    categoryHeader: 'OBSTETRICS & GYNAECOLOGY',
    department: 'Obstetrics & Gynaecology',
    category: 'Gynaecology',
    focusAreas: [
      'Antenatal care & delivery',
      'Normal & C-sections',
      'PCOD & menstrual care',
      'Women reproductive health'
    ]
  },
  {
    _id: 'v-12',
    name: 'Dr. P. Karthikeyan',
    degree: 'MBBS, MD',
    categoryHeader: 'GENERAL & INTERNAL MEDICINE',
    department: 'General & Internal Medicine',
    category: 'General Medicine',
    focusAreas: [
      'Internal medicine',
      'Lifestyle disease care',
      'Cardiovascular health',
      'Geriatric long-term care'
    ]
  }
];

const Doctors = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'All', label: 'All Specialists' },
    { id: 'Surgical Oncology', label: 'Surgical Oncology' },
    { id: 'Gastroenterology', label: 'Gastroenterology' },
    { id: 'Gynaecology', label: 'Obstetrics & Gynaecology' },
    { id: 'General Medicine', label: 'General Medicine' },
    { id: 'Plastic Surgery', label: 'Plastic Surgery' },
    { id: 'Paediatric Surgery', label: 'Paediatric Surgery' },
    { id: 'Urology', label: 'Urology' },
    { id: 'Orthopaedics', label: 'Orthopaedics' },
    { id: 'Anaesthesiology', label: 'Anaesthesiology' }
  ].map(cat => ({
    ...cat,
    count: cat.id === 'All' ? visitingSpecialists.length : visitingSpecialists.filter(d => d.category === cat.id).length
  }));

  const filteredDoctors = visitingSpecialists.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch = 
      doc.name.toLowerCase().includes(query) ||
      doc.degree.toLowerCase().includes(query) ||
      doc.categoryHeader.toLowerCase().includes(query) ||
      doc.department.toLowerCase().includes(query) ||
      doc.focusAreas.some(fa => fa.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-transition" style={{ backgroundColor: 'var(--secondary)', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <section style={{ 
        padding: '160px 0 90px', 
        background: 'linear-gradient(rgba(10, 43, 78, 0.92), rgba(10, 43, 78, 0.85)), url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        <div className="container" data-aos="fade-up">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(224, 169, 109, 0.2)', border: '1px solid rgba(224, 169, 109, 0.4)', color: 'var(--accent)', padding: '6px 18px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '18px' }}>
            <Sparkles size={16} /> JB HEALTHCARE MEDICAL TEAM
          </div>
          <h1 style={{ color: 'var(--white)', fontSize: '3.3rem', marginBottom: '15px', letterSpacing: '0.5px' }}>
            Meet Our Medical Team & Specialists
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--accent)', fontWeight: '500', marginBottom: '15px' }}>
            சிறப்பு மருத்துவர்கள் குழு • Leading Surgeons & Consultants
          </p>
          <p style={{ fontSize: '1.1rem', maxWidth: '820px', margin: '0 auto', color: 'rgba(255,255,255,0.88)', lineHeight: '1.7' }}>
            Led by award-winning laparoscopic surgeon <strong>Dr. B. Saileshkumar</strong>, our multidisciplinary team of visiting super-specialists brings premier clinical expertise in cancer surgery, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics to Sivakasi.
          </p>
        </div>
      </section>

      {/* Chief Doctor Spotlight Section (Executive Multi-Tier Profile Card) */}
      <section style={{ padding: '60px 0 35px' }}>
        <div className="container">
          <div style={{ 
            backgroundColor: '#0A2540', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            boxShadow: '0 25px 55px rgba(10,43,78,0.22)', 
            border: '2px solid rgba(224, 169, 109, 0.4)',
            maxWidth: '1080px',
            margin: '0 auto'
          }} data-aos="fade-up">

            {/* Tier 1: Profile Header */}
            <div style={{ 
              padding: '36px 36px 30px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '30px', 
              flexWrap: 'wrap',
              backgroundColor: '#0A2540'
            }}>
              {/* Doctor Photo Box with Founder Badge */}
              <div style={{
                position: 'relative',
                width: '145px',
                height: '155px',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#13355e',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                border: '2px solid rgba(224, 169, 109, 0.45)',
                flexShrink: 0
              }}>
                <img 
                  src="/doctor.png" 
                  alt="Dr. B. Saileshkumar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#E0A96D',
                  color: '#0A2540',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  padding: '3px 14px',
                  borderRadius: '12px',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  whiteSpace: 'nowrap'
                }}>
                  Founder
                </div>
              </div>

              {/* Doctor Identity & Degrees */}
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{
                  color: '#E0A96D',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}>
                  JB Health Care • Head of surgery
                </div>

                <h2 style={{
                  color: 'var(--white)',
                  fontSize: 'clamp(1.85rem, 3.5vw, 2.4rem)',
                  fontWeight: '700',
                  margin: '0 0 16px',
                  lineHeight: '1.2'
                }}>
                  Dr. B. சைலேஷ்குமார்
                </h2>

                {/* Degree Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['MBBS', 'M.S.', 'FIAGES', 'FALS'].map((deg) => (
                    <span 
                      key={deg} 
                      style={{
                        border: '1.5px solid #E0A96D',
                        color: 'var(--white)',
                        padding: '3px 14px',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        backgroundColor: 'rgba(224, 169, 109, 0.08)'
                      }}
                    >
                      {deg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tier 2: 5-Column Milestone Stats Bar */}
            <div className="chief-doctor-stats-bar">
              {[
                { value: '10,000+', label: 'அறுவை சிகிச்சைகள்' },
                { value: '2,000+', label: 'லேப்ரோஸ்கோபிக்' },
                { value: '3,000+', label: 'சிசேரியன்' },
                { value: '100+', label: 'புற்றுநோய் அறுவை' },
                { value: '50+', label: 'COVID நோயாளிகள்' }
              ].map((stat, idx) => (
                <div key={idx} className="chief-doctor-stat-item">
                  <div style={{
                    color: '#ffffff',
                    fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)',
                    fontWeight: '800',
                    lineHeight: '1.2'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.82)',
                    fontSize: '0.82rem',
                    marginTop: '4px',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tier 3: White Content Body */}
            <div style={{ backgroundColor: '#ffffff', color: '#1a202c', padding: '36px 36px 32px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '36px'
              }}>
                {/* Left Column: Education and training */}
                <div>
                  <div style={{
                    color: '#B37D4E',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    marginBottom: '4px'
                  }}>
                    Education and training
                  </div>
                  <h3 style={{
                    color: '#0A2540',
                    fontSize: '1.45rem',
                    fontWeight: '800',
                    marginBottom: '22px'
                  }}>
                    கல்வி மற்றும் பயிற்சி
                  </h3>

                  {/* Vertical Timeline */}
                  <div style={{
                    position: 'relative',
                    paddingLeft: '24px',
                    borderLeft: '2px solid #E0A96D',
                    marginLeft: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    {/* Item 1 */}
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-30px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#E0A96D'
                      }} />
                      <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>MBBS</div>
                      <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>மெட்ராஸ் மருத்துவக் கல்லூரி</div>
                    </div>

                    {/* Item 2 */}
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-30px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#E0A96D'
                      }} />
                      <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>M.S.</div>
                      <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>மதுரை மருத்துவக் கல்லூரி</div>
                    </div>

                    {/* Item 3 */}
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-30px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#E0A96D'
                      }} />
                      <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>லேப்ரோஸ்கோப்பி பயிற்சி</div>
                      <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>VG மருத்துவமனை, கோயம்புத்தூர்</div>
                    </div>

                    {/* Item 4 */}
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-30px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#E0A96D'
                      }} />
                      <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>FIAGES / FALS</div>
                      <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px', lineHeight: '1.5' }}>
                        இந்திய குடலியல் எண்டோ சர்ஜன் சங்கத்தின் சிறப்புப் பங்காளர் (Fellowship) சான்றிதழ்
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Public service */}
                <div>
                  <div style={{
                    color: '#B37D4E',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    marginBottom: '4px'
                  }}>
                    Public service
                  </div>
                  <h3 style={{
                    color: '#0A2540',
                    fontSize: '1.45rem',
                    fontWeight: '800',
                    marginBottom: '22px'
                  }}>
                    பொது சேவைகள் மற்றும் பொறுப்புகள்
                  </h3>

                  {/* Service Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Service 1 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: '#FAF2E8',
                        border: '1.5px solid #EED7BF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#B37D4E',
                        flexShrink: 0
                      }}>
                        <Building2 size={22} />
                      </div>
                      <div>
                        <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>
                          IMA சிவகாசி கிளை
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>
                          நிறுவனர் செயலாளர், <strong>2016–2017</strong>
                        </div>
                      </div>
                    </div>

                    {/* Service 2 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: '#FAF2E8',
                        border: '1.5px solid #EED7BF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#B37D4E',
                        flexShrink: 0
                      }}>
                        <Stethoscope size={22} />
                      </div>
                      <div>
                        <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>
                          அரசு மருத்துவ சேவை
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>
                          <strong>7 ஆண்டுகள்</strong> (2014–2021)
                        </div>
                      </div>
                    </div>

                    {/* Service 3 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: '#FAF2E8',
                        border: '1.5px solid #EED7BF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#B37D4E',
                        flexShrink: 0
                      }}>
                        <MapPin size={22} />
                      </div>
                      <div>
                        <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>
                          விருதுநகர் மாவட்டம்
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px', lineHeight: '1.5' }}>
                          அனைத்து முதன்மை சுகாதார மையங்களிலும் சிறப்பான பணி
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Award Callout Box */}
              <div style={{
                backgroundColor: '#FDF7ED',
                border: '1.5px solid #F3D8B4',
                borderRadius: '16px',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginTop: '32px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#D99B5B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(217, 155, 91, 0.35)'
                }}>
                  <Award size={26} />
                </div>
                <div>
                  <div style={{ color: '#8C5B24', fontWeight: '800', fontSize: '1.05rem', marginBottom: '3px' }}>
                    Best Doctor Award • 2017 மற்றும் 2018
                  </div>
                  <div style={{ color: '#6C5539', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    தொடர்ச்சியாக இரண்டு ஆண்டுகள் மாவட்ட ஆட்சியரால் வழங்கப்பட்ட சிறந்த மருத்துவர் விருது
                  </div>
                </div>
              </div>
            </div>

            {/* Tier 4: Navy Footer Bar */}
            <div style={{
              backgroundColor: '#0A2540',
              padding: '18px 36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {/* Left: OP Consultation Hours */}
              <div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  marginBottom: '3px'
                }}>
                  OP consultation hours
                </div>
                <div style={{
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '1.05rem',
                  letterSpacing: '0.3px'
                }}>
                  10:00 AM – 01:00 PM • 05:00 PM – 08:30 PM
                </div>
              </div>

              {/* Right: Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Link 
                  to="/appointment" 
                  state={{ doctorName: "Dr. B. Saileshkumar", department: "Laparoscopic & General Surgery" }}
                  style={{
                    backgroundColor: '#E0A96D',
                    color: '#0A2540',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    padding: '10px 24px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(224, 169, 109, 0.35)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Calendar size={18} /> Book appointment
                </Link>

                <a 
                  href="https://api.whatsapp.com/send?phone=919345510905&text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20with%20Dr.%20B.%20Saileshkumar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Dr. B. Saileshkumar"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Visiting Specialists Section */}
      <section 
        style={{ 
          padding: '60px 0 90px', 
          background: 'linear-gradient(180deg, #EBF2F8 0%, #F3F7FA 50%, #EAEFF5 100%)',
          borderTop: '1px solid rgba(10, 43, 78, 0.08)',
          borderBottom: '1px solid rgba(10, 43, 78, 0.08)',
          position: 'relative'
        }} 
        id="visiting-specialists"
      >
        <div className="container">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '35px' }} data-aos="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(10, 43, 78, 0.08)', color: 'var(--primary)', padding: '6px 18px', borderRadius: '25px', fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px', border: '1px solid rgba(10, 43, 78, 0.15)' }}>
              ★ சிறப்பு மருத்துவர்கள் வருகை
            </div>
            <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '10px' }}>
              Visiting & Consulting Specialists
            </h2>
            <p style={{ color: '#555', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
              Experienced consultants and surgical specialists visit JB Healthcare on scheduled days and on-call for advanced procedures, diagnostics, and second opinions.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div style={{ marginBottom: '35px' }} data-aos="fade-up">
            
            {/* Search Input */}
            <div style={{ maxWidth: '580px', margin: '0 auto 25px', position: 'relative' }}>
              <Search size={20} color="#888" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="Search specialist by name, specialty (e.g. Gurumoorthi, Oncology, Urology)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px 14px 50px',
                  borderRadius: '30px',
                  border: '2px solid rgba(10, 43, 78, 0.15)',
                  backgroundColor: 'var(--white)',
                  fontSize: '0.98rem',
                  outline: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
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
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '25px',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? '700' : '500',
                      border: isActive ? '2px solid var(--accent)' : '1px solid rgba(10, 43, 78, 0.12)',
                      backgroundColor: isActive ? 'var(--primary)' : 'var(--white)',
                      color: isActive ? 'var(--accent)' : 'var(--primary)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 4px 12px rgba(10, 43, 78, 0.2)' : 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{cat.label}</span>
                    <span style={{ 
                      backgroundColor: isActive ? 'rgba(224, 169, 109, 0.25)' : 'rgba(10, 43, 78, 0.08)', 
                      color: isActive ? 'var(--accent)' : '#555',
                      padding: '2px 7px',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter count feedback */}
          {searchQuery && (
            <div style={{ textAlign: 'center', marginBottom: '25px', color: '#555', fontSize: '0.95rem' }}>
              Found <strong>{filteredDoctors.length}</strong> specialist(s) matching "{searchQuery}"
            </div>
          )}

          {/* Doctor Cards Grid - Dark Luxe Luxury Style */}
          {filteredDoctors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--white)', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
              <Award size={48} color="#ccc" style={{ marginBottom: '15px' }} />
              <h3 style={{ color: 'var(--primary)', marginBottom: '8px' }}>No specialists found</h3>
              <p style={{ color: '#777', marginBottom: '20px' }}>Try searching with a different term or select "All Specialists".</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="btn btn-accent"
                style={{ padding: '8px 24px', borderRadius: '20px', fontSize: '0.9rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '28px' 
            }}>
              {filteredDoctors.map((doc, idx) => (
                <div 
                  key={doc._id}
                  className="dark-luxe-card"
                  data-aos="fade-up"
                  data-aos-delay={`${(idx % 3 + 1) * 60}`}
                >
                  <div className="dark-luxe-inner">
                    
                    {/* Category Label */}
                    <div className="dark-luxe-category">
                      {doc.categoryHeader}
                    </div>

                    {/* Doctor Name (Serif Elegance) */}
                    <h3 className="dark-luxe-name">
                      Dr.<br />{doc.name.replace(/^Dr\.\s*/i, '')}
                    </h3>

                    {/* Degree */}
                    <div className="dark-luxe-degree">
                      {doc.degree}
                    </div>

                    {/* Gold Divider Line */}
                    <div className="dark-luxe-divider" />

                    {/* Clinical Focus List */}
                    <div className="dark-luxe-focus-list">
                      {doc.focusAreas.map((fa, i) => (
                        <div key={i} className="dark-luxe-focus-item">
                          {fa}
                        </div>
                      ))}
                    </div>

                    {/* Book Consult Action */}
                    <Link 
                      to="/appointment" 
                      state={{ doctorName: `${doc.name} (${doc.degree})`, department: doc.department }}
                      className="dark-luxe-btn"
                    >
                      Book consult
                    </Link>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Schedule Notice Info Box */}
          <div style={{
            marginTop: '55px',
            backgroundColor: 'var(--white)',
            borderRadius: '18px',
            padding: '30px 35px',
            border: '2px dashed rgba(224, 169, 109, 0.5)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }} data-aos="fade-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(224, 169, 109, 0.2)', padding: '10px', borderRadius: '12px', color: 'var(--accent)' }}>
                <Clock size={24} />
              </div>
              <div>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.25rem', margin: 0 }}>
                  Visiting Specialist Consultation Guidelines • முன்பதிவு விவரங்கள்
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '3px 0 0' }}>
                  Please read before planning your hospital visit
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', color: '#475569', fontSize: '0.92rem', lineHeight: '1.6' }}>
              <div>
                <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                  📌 Prior Appointment Recommended
                </strong>
                Visiting consultants visit on specific days of the week and for scheduled surgeries. Patients are kindly requested to register their appointment in advance.
              </div>
              <div>
                <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                  📞 Direct Helpline & Schedule Confirmation
                </strong>
                Call our reception at <strong>04562-299920</strong> or WhatsApp <strong>+91 93455 10905</strong> for the exact consultation timings for the current week.
              </div>
              <div>
                <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                  🚨 24/7 Casualty & On-Call Emergency
                </strong>
                Emergency surgical, trauma, and anaesthetic backup are accessible 24 hours a day with our dedicated medical duty officers.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container" data-aos="fade-up">
          <h2 style={{ color: 'var(--accent)', fontSize: '2.4rem', marginBottom: '15px' }}>
            Need Immediate Assistance or Surgery Consultation?
          </h2>
          <p style={{ fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 30px', color: 'rgba(255,255,255,0.9)' }}>
            Our hospital front desk is available 24/7 to connect you with our medical team and schedule priority appointments.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn btn-accent" style={{ padding: '14px 32px', fontSize: '1.05rem', borderRadius: '30px', fontWeight: 'bold' }}>
              Book an Appointment
            </Link>
            <a href="tel:04562299920" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '1.05rem', borderRadius: '30px', borderColor: 'var(--white)', color: 'var(--white)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} /> Call 04562-299920
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .dark-luxe-card {
          background-color: #081d33;
          border-radius: 18px;
          padding: 12px;
          box-shadow: 0 14px 35px rgba(8, 29, 51, 0.28);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .dark-luxe-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 22px 50px rgba(8, 29, 51, 0.42) !important;
        }
        .dark-luxe-inner {
          border: 1.5px solid rgba(224, 169, 109, 0.55);
          border-radius: 12px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          transition: border-color 0.3s ease;
        }
        .dark-luxe-card:hover .dark-luxe-inner {
          border-color: #e0a96d !important;
        }
        .dark-luxe-category {
          color: #e0a96d;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .dark-luxe-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.1rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          margin: 0 0 6px;
          letter-spacing: 0.3px;
        }
        .dark-luxe-degree {
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.94rem;
          font-weight: 500;
        }
        .dark-luxe-divider {
          width: 44px;
          height: 2px;
          background-color: #e0a96d;
          margin: 18px 0 22px;
        }
        .dark-luxe-focus-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin-bottom: 32px;
          flex: 1;
        }
        .dark-luxe-focus-item {
          color: rgba(255, 255, 255, 0.92);
          font-size: 0.98rem;
          font-weight: 400;
          line-height: 1.4;
        }
        .dark-luxe-btn {
          display: block;
          width: 100%;
          padding: 13px 20px;
          border: 1.5px solid #e0a96d;
          border-radius: 8px;
          color: #e0a96d;
          background-color: transparent;
          font-weight: 700;
          font-size: 0.96rem;
          text-align: center;
          transition: all 0.3s ease;
          text-decoration: none;
          cursor: pointer;
          margin-top: auto;
        }
        .dark-luxe-btn:hover {
          background-color: #e0a96d !important;
          color: #081d33 !important;
          box-shadow: 0 4px 18px rgba(224, 169, 109, 0.45);
        }
      `}</style>
      
    </div>
  );
};

export default Doctors;
