import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity';
import TiltCard from '../components/TiltCard';
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
  MapPin,
  ArrowRight
} from 'lucide-react';

const chiefDoctorSummary = {
  _id: 'chief-1',
  name: 'Dr. B. Saileshkumar',
  degree: 'MBBS, M.S., FIAGES, FALS',
  categoryHeader: 'GENERAL & ADVANCED LAPAROSCOPIC SURGERY',
  department: 'Founder & Chief Laparoscopic Surgeon',
  category: 'General Surgery',
  schedule: 'Monday – Saturday',
  timing: '10:00 AM – 1:00 PM & 6:00 PM – 9:00 PM',
  availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  focusAreas: [
    'Advanced Laparoscopy (2,000+ cases)',
    'Gallbladder & Appendix removal',
    'Hernia & Hydrocele repair',
    'Laser Proctology (Piles, Fistula)'
  ]
};


const visitingSpecialists = [
  {
    _id: 'v-1',
    name: 'Dr. Jaganatha Prabhu',
    degree: 'MBBS, MD',
    categoryHeader: 'ANAESTHESIOLOGY & PERIOPERATIVE CARE',
    department: 'Anaesthesiology & Critical Care',
    category: 'Anaesthesiology',
    schedule: 'All Surgical Days',
    timing: 'As per OT Schedule',
    availableDays: ['All', 'OT Days'],
    focusAreas: [
      'General anaesthesia',
      'Regional & spinal blocks',
      'Trauma sedation',
      'Emergency surgical resuscitation'
    ]
  },
  {
    _id: 'v-2',
    name: 'Dr. Kishore Ganesh',
    degree: 'MBBS, DA',
    categoryHeader: 'ANAESTHESIOLOGY & CRITICAL CARE',
    department: 'Anaesthesiology & Critical Care',
    category: 'Anaesthesiology',
    schedule: 'All Surgical Days',
    timing: 'As per OT Schedule',
    availableDays: ['All', 'OT Days'],
    focusAreas: [
      'Surgical anaesthesia',
      'Painless labor delivery',
      'ICU & critical care',
      'Post-operative acute pain relief'
    ]
  },
  {
    _id: 'v-3',
    name: 'Dr. Karthikeyan',
    degree: 'MBBS, MD',
    categoryHeader: 'ANAESTHESIOLOGY & CRITICAL CARE',
    department: 'Anaesthesiology & Critical Care',
    category: 'Anaesthesiology',
    schedule: 'All Surgical Days',
    timing: 'As per OT Schedule',
    availableDays: ['All', 'OT Days'],
    focusAreas: [
      'Surgical anaesthesia & sedation',
      'Post-operative pain management',
      'Critical care monitoring',
      'Emergency resuscitation'
    ]
  },
  {
    _id: 'v-4',
    name: 'Dr. A.C. Arun',
    degree: 'MBBS, M.D., D.M.',
    categoryHeader: 'MEDICAL GASTROENTEROLOGY & HEPATOLOGY',
    department: 'Medical Gastroenterology & Hepatology',
    category: 'Gastroenterology',
    schedule: 'Every Friday',
    timing: '09:00 PM (Night)',
    availableDays: ['All', 'Friday'],
    focusAreas: [
      'Diagnostic endoscopy',
      'Liver disease & cirrhosis',
      'GERD & peptic ulcer care',
      'GI bleed management'
    ]
  },
  {
    _id: 'v-5',
    name: 'Dr. Sangeetha',
    degree: 'MBBS, DGO',
    categoryHeader: 'OBSTETRICS & GYNAECOLOGY',
    department: 'Obstetrics & Gynaecology',
    category: 'Gynaecology',
    schedule: 'Wednesday & Saturday',
    timing: '04:00 PM – 05:00 PM',
    availableDays: ['All', 'Wednesday', 'Saturday'],
    focusAreas: [
      'Laparoscopic gynaecology',
      'Fibroid & ovarian cyst care',
      'PCOD & menstrual wellness',
      'Pelvic & women health'
    ]
  },
  {
    _id: 'v-6',
    name: 'Dr. Sivaram',
    degree: 'MBBS, DNB (ENT)',
    categoryHeader: 'ENT (EAR, NOSE & THROAT)',
    department: 'ENT & Otorhinolaryngology',
    category: 'ENT',
    schedule: 'On Surgery Days',
    timing: 'On-Call / Based on Cases',
    availableDays: ['All', 'OT Days'],
    focusAreas: [
      'Micro-ear surgery',
      'Endoscopic sinus surgery',
      'Tonsil & adenoid treatment',
      'Allergy, vertigo & hearing care'
    ]
  },
  {
    _id: 'v-7',
    name: 'Dr. Gurumoorthi',
    degree: 'MBBS, M.S., M.Ch.',
    categoryHeader: 'SURGICAL ONCOLOGY',
    department: 'Surgical Oncology',
    category: 'Surgical Oncology',
    schedule: 'On Surgery Days',
    timing: 'On-Call / Based on Cases',
    availableDays: ['All', 'OT Days'],
    focusAreas: [
      'Tumor resection',
      'Gastrointestinal cancer',
      'Breast oncology',
      'Cancer clinical staging'
    ]
  },
  {
    _id: 'v-8',
    name: 'Dr. Manikandan',
    degree: 'MBBS, M.S., M.Ch.',
    categoryHeader: 'SURGICAL ONCOLOGY',
    department: 'Surgical Oncology',
    category: 'Surgical Oncology',
    schedule: 'On Surgery Days',
    timing: 'On-Call / Based on Cases',
    availableDays: ['All', 'OT Days'],
    focusAreas: [
      'Advanced onco-surgery',
      'Biopsy procedures',
      'Head & neck oncology',
      'Cancer staging & care'
    ]
  },
  {
    _id: 'v-9',
    name: 'Dr. Arun Kumar',
    degree: 'MBBS, M.S., M.Ch.',
    categoryHeader: 'PLASTIC & RECONSTRUCTIVE SURGERY',
    department: 'Plastic, Cosmetic & Reconstructive Surgery',
    category: 'Plastic Surgery',
    schedule: 'On Surgery Days',
    timing: 'On-Call / Based on Cases',
    availableDays: ['All', 'OT Days'],
    focusAreas: [
      'Trauma reconstruction',
      'Microvascular surgery',
      'Burn care & grafting',
      'Diabetic foot limb-salvage'
    ]
  },
  {
    _id: 'v-10',
    name: 'Dr. Arun Kumar',
    degree: 'MBBS, M.S., M.Ch.',
    categoryHeader: 'PAEDIATRIC SURGERY',
    department: 'Paediatrics & Neonatal Surgery',
    category: 'Paediatric Surgery',
    schedule: 'On Surgery Days',
    timing: 'On-Call / Based on Cases',
    availableDays: ['All', 'OT Days'],
    focusAreas: [
      'Neonatal surgery',
      'Congenital anomalies',
      'Pediatric hernia & hydrocele',
      'Pediatric keyhole procedures'
    ]
  },
  {
    _id: 'v-11',
    name: 'Dr. Sankar',
    degree: 'MBBS, M.S., M.Ch.',
    categoryHeader: 'UROLOGY & ANDROLOGY',
    department: 'Urology & Andrology',
    category: 'Urology',
    schedule: 'On Surgery Days',
    timing: 'On-Call / Based on Cases',
    availableDays: ['All', 'OT Days'],
    focusAreas: [
      'Laser stone removal',
      'Prostate care & TURP',
      'Andrology & male wellness',
      'Urinary tract disorders'
    ]
  },
  {
    _id: 'v-12',
    name: 'Dr. Deepan Ramkumar',
    degree: 'MBBS, M.S. Ortho',
    categoryHeader: 'ORTHOPAEDIC & TRAUMA SURGERY',
    department: 'Orthopaedics & Trauma Surgery',
    category: 'Orthopaedics',
    schedule: 'On Surgery Days',
    timing: 'On-Call / Based on Cases',
    availableDays: ['All', 'OT Days'],
    focusAreas: [
      'Complex fracture fixation',
      'Accident & trauma care',
      'Joint arthritis management',
      'Spine & sports injury care'
    ]
  },
  {
    _id: 'v-13',
    name: 'Sowdambika @ Reethika M',
    degree: 'M.Sc. (Counselling & Psychotherapy)',
    categoryHeader: 'PSYCHOTHERAPY & COUNSELLING',
    department: 'Counselling & Psychotherapy',
    category: 'Psychology',
    schedule: 'Every Wednesday',
    timing: '10:00 AM – 12:00 PM',
    availableDays: ['All', 'Wednesday'],
    focusAreas: [
      'Stress & anxiety therapy',
      'Cognitive behavioral counseling',
      'Adolescent & child behavior',
      'Family & emotional wellbeing'
    ]
  }
];

const Doctors = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sanityDoctors, setSanityDoctors] = useState(null);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "doctorsPage" && _id == "doctorsPage"][0]`).then((data) => {
      if (data) setPageData(data);
    }).catch(console.error);

    client.fetch(`*[_type == "doctor"] | order(order asc)`).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setSanityDoctors(data);
      }
    }).catch((err) => {
      console.warn('Using offline doctors fallback:', err);
    });
  }, []);

  const chiefSpotlight = pageData?.chiefDoctorSpotlight;
  const defaultChiefStats = [
    { value: '10,000+', label: 'அறுவை சிகிச்சைகள்' },
    { value: '2,000+', label: 'லேப்ரோஸ்கோபிக்' },
    { value: '3,000+', label: 'சிசேரியன்' },
    { value: '100+', label: 'புற்றுநோய் அறுவை' },
    { value: '50+', label: 'COVID நோயாளிகள்' }
  ];
  const chiefStats = (chiefSpotlight?.stats && chiefSpotlight.stats.length > 0) ? chiefSpotlight.stats : defaultChiefStats;

  const defaultEduItems = [
    { degree: 'MBBS', institution: 'மெட்ராஸ் மருத்துவக் கல்லூரி' },
    { degree: 'M.S.', institution: 'மதுரை மருத்துவக் கல்லூரி' },
    { degree: 'லேப்ரோஸ்கோப்பி பயிற்சி', institution: 'VG மருத்துவமனை, கோயம்புத்தூர்' },
    { degree: 'FIAGES / FALS', institution: 'இந்திய குடலியல் எண்டோ சர்ஜன் சங்கத்தின் சிறப்புப் பங்காளர் (Fellowship) சான்றிதழ்' }
  ];
  const eduItems = (chiefSpotlight?.educationItems && chiefSpotlight.educationItems.length > 0) ? chiefSpotlight.educationItems : defaultEduItems;

  const defaultServiceItems = [
    { role: 'IMA சிவகாசி கிளை', detail: 'செயலாளர், 2016–2017', icon: Building2 },
    { role: 'அரசு மருத்துவ சேவை', detail: '7 ஆண்டுகள் (2014–2021)', icon: Stethoscope },
    { role: 'விருதுநகர் மாவட்டம்', detail: 'அனைத்து முதன்மை சுகாதார மையங்களிலும் சிறப்பான பணி', icon: MapPin }
  ];
  const serviceItems = (chiefSpotlight?.serviceItems && chiefSpotlight.serviceItems.length > 0) ? chiefSpotlight.serviceItems : defaultServiceItems;

  const defaultGuidelines = [
    {
      title: '📌 Prior Appointment Recommended',
      description: 'Visiting consultants visit on specific days of the week and for scheduled surgeries. Patients are kindly requested to register their appointment in advance.'
    },
    {
      title: '📞 Direct Helpline & Schedule Confirmation',
      description: 'Call our reception at +91 93455 10905 for the exact consultation timings for the current week.'
    },
    {
      title: '🚨 24/7 Casualty & On-Call Emergency',
      description: 'Emergency surgical, trauma, and anaesthetic backup are accessible 24 hours a day with our dedicated medical duty officers.'
    }
  ];
  const guidelinesList = (pageData?.guidelinesSection?.guidelinesList && pageData.guidelinesSection.guidelinesList.length > 0)
    ? pageData.guidelinesSection.guidelinesList
    : defaultGuidelines;

  const activeChief = sanityDoctors 
    ? (sanityDoctors.find(d => d.order === 1 || d.name?.includes('Saileshkumar')) || chiefDoctorSummary) 
    : chiefDoctorSummary;
  const activeVisitingSpecialists = sanityDoctors 
    ? sanityDoctors.filter(d => d._id !== activeChief._id && !d.name?.includes('Saileshkumar')) 
    : visitingSpecialists;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayIndex = new Date().getDay();
  const todayName = dayNames[currentDayIndex];

  // Dynamically compute doctors available today
  const getTodayDoctors = () => {
    const list = [];
    
    // Chief Doctor Monday to Saturday
    if (currentDayIndex !== 0) {
      list.push(activeChief);
    } else {
      list.push({
        ...activeChief,
        _id: 'chief-sun',
        categoryHeader: 'EMERGENCY SURGERY & ON-CALL OT',
        schedule: 'Sunday Emergency & On-Call',
        timing: 'Emergency & OT Available',
        focusAreas: ['Emergency laparoscopy', 'Acute abdominal surgery', '24/7 on-call surgical backup']
      });
    }

    // Visiting specialists on specific days
    if (currentDayIndex === 5) {
      const arun = activeVisitingSpecialists.find(d => d.name?.includes('A.C. Arun') || d._id === 'v-4' || d._id === 'doc-arun-ent');
      if (arun) list.push(arun);
    }
    if (currentDayIndex === 3) {
      const sang = activeVisitingSpecialists.find(d => d.name?.includes('Sangeetha') || d._id === 'v-5' || d._id === 'doc-sangeetha');
      const psych = activeVisitingSpecialists.find(d => d.name?.includes('Sowdambika') || d._id === 'v-13' || d._id === 'doc-sowdambika');
      if (sang) list.push(sang);
      if (psych) list.push(psych);
    }
    if (currentDayIndex === 6) {
      const sang = activeVisitingSpecialists.find(d => d.name?.includes('Sangeetha') || d._id === 'v-5' || d._id === 'doc-sangeetha');
      if (sang) list.push(sang);
    }

    return list;
  };

  const todayDoctors = getTodayDoctors();

  // Visiting Consultants (Fixed weekly OPD)
  const visitingDoctors = activeVisitingSpecialists.filter(d => 
    d.name?.includes('A.C. Arun') || d.name?.includes('Sangeetha') || d.name?.includes('Sowdambika') || ['v-4', 'v-5', 'v-13', 'doc-arun-ent', 'doc-sangeetha', 'doc-sowdambika'].includes(d._id)
  );

  // Surgical Team (Anaesthesiologists + On-call super-specialists)
  const surgicalTeam = activeVisitingSpecialists.filter(d => 
    !visitingDoctors.some(vd => vd._id === d._id)
  );

  // All doctors combined
  const allDoctors = [
    activeChief,
    ...activeVisitingSpecialists
  ];

  const categories = [
    { id: 'All', label: 'All Specialists' },
    { id: 'Anaesthesiology', label: 'Anaesthesiology' },
    { id: 'Gastroenterology', label: 'Gastroenterology' },
    { id: 'Gynaecology', label: 'Obstetrics & Gynaecology' },
    { id: 'ENT', label: 'ENT' },
    { id: 'Surgical Oncology', label: 'Surgical Oncology' },
    { id: 'Plastic Surgery', label: 'Plastic Surgery' },
    { id: 'Paediatric Surgery', label: 'Paediatric Surgery' },
    { id: 'Urology', label: 'Urology & Andrology' },
    { id: 'Orthopaedics', label: 'Orthopaedics' },
    { id: 'Psychology', label: 'Psychology' }
  ].map(cat => ({
    ...cat,
    count: cat.id === 'All' ? allDoctors.length : allDoctors.filter(d => d.category === cat.id).length
  }));

  const filteredAllDoctors = allDoctors.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    return matchesCategory && (
      doc.name.toLowerCase().includes(query) ||
      doc.degree.toLowerCase().includes(query) ||
      doc.department.toLowerCase().includes(query) ||
      (doc.categoryHeader && doc.categoryHeader.toLowerCase().includes(query)) ||
      (doc.focusAreas && doc.focusAreas.some(fa => fa.toLowerCase().includes(query)))
    );
  });

  const renderDoctorCard = (doc) => (
    <div 
      key={doc._id}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '22px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.25s ease'
      }}
      className="doctor-card-hover"
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            backgroundColor: '#F0F9FF',
            border: '1.5px solid #BAE6FD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0077B6',
            flexShrink: 0
          }}>
            <Stethoscope size={22} color="#0077B6" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 style={{ color: '#061D38', fontSize: '1.12rem', fontWeight: '800', margin: '0 0 3px 0', lineHeight: '1.3' }}>
              {doc.name}
            </h4>
            <span style={{
              display: 'inline-block',
              backgroundColor: '#F1F5F9',
              color: '#0F172A',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.74rem',
              fontWeight: '700',
              letterSpacing: '0.3px',
              textTransform: 'uppercase'
            }}>
              {doc.degree}
            </span>
            <div style={{ color: '#0284C7', fontSize: '0.82rem', fontWeight: '700', marginTop: '5px' }}>
              {doc.department}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
            <Calendar size={15} color="#0077B6" style={{ flexShrink: 0 }} />
            <span style={{ fontWeight: '700', color: '#1E293B' }}>{doc.schedule}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
            <Clock size={15} color="#0077B6" style={{ flexShrink: 0 }} />
            <span style={{ color: '#64748B' }}>{doc.timing}</span>
          </div>
        </div>

        {doc.focusAreas && doc.focusAreas.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
            {doc.focusAreas.slice(0, 3).map((fa, fIdx) => (
              <span key={fIdx} style={{ fontSize: '0.72rem', backgroundColor: '#F8FAFC', color: '#475569', padding: '2px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                ✓ {fa}
              </span>
            ))}
          </div>
        )}
      </div>

      <Link 
        to="/appointment" 
        state={{ doctorName: `${doc.name} (${doc.degree})`, department: doc.department }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '8px',
          backgroundColor: '#061D38',
          color: '#FFFFFF',
          fontSize: '0.86rem',
          fontWeight: '700',
          textDecoration: 'none',
          transition: 'background-color 0.2s ease',
          marginTop: '6px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0077B6'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#061D38'}
      >
        <Calendar size={15} /> Book Consultation
      </Link>
    </div>
  );

  return (
    <div className="page-transition" style={{ backgroundColor: 'var(--secondary)', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <section style={{ 
        padding: '160px 0 90px', 
        background: 'linear-gradient(rgba(0, 180, 216, 0.92), rgba(0, 140, 190, 0.94)), url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        <div className="container" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: '3.3rem', marginBottom: '15px', letterSpacing: '0.5px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>
            {pageData?.heroHeading || "Meet Our Medical Team & Specialists"}
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#061D38', fontWeight: '800', marginBottom: '15px' }}>
            {pageData?.heroTag || "சிறப்பு மருத்துவர்கள் குழு • Leading Surgeons & Consultants"}
          </p>
          <p style={{ fontSize: '1.1rem', maxWidth: '820px', margin: '0 auto', color: '#FFFFFF', lineHeight: '1.7', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
            {pageData?.heroDescription || "Led by award-winning laparoscopic surgeon Dr. B. Saileshkumar, our multidisciplinary team of visiting super-specialists brings premier clinical expertise in cancer surgery, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics to Sivakasi."}
          </p>
        </div>
      </section>

      {/* Chief Doctor Spotlight Section (Executive Multi-Tier Profile Card) */}
      <section style={{ padding: '60px 0 35px' }}>
        <div className="container">
          <TiltCard 
            maxTilt={3.5}
            scale={1.01}
            glareColor="rgba(0, 180, 216, 0.16)"
            style={{ 
              backgroundColor: '#0A2540', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              boxShadow: '0 25px 55px rgba(10,43,78,0.22)', 
              border: '2px solid rgba(0, 180, 216, 0.4)',
              maxWidth: '1080px',
              margin: '0 auto'
            }} 
            data-aos="fade-up"
          >

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
                border: '2px solid rgba(0, 180, 216, 0.45)',
                flexShrink: 0
              }}>
                <img 
                  src={(chiefSpotlight?.image ? urlFor(chiefSpotlight.image).url() : null) || "/doctor.png"} 
                  alt={chiefSpotlight?.name || "Dr. B. Saileshkumar"} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#00B4D8',
                  color: '#061D38',
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
                  color: '#00B4D8',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}>
                  {chiefSpotlight?.tag || "JB Health Care • Head of surgery"}
                </div>

                <h2 style={{
                  color: 'var(--white)',
                  fontSize: 'clamp(1.85rem, 3.5vw, 2.4rem)',
                  fontWeight: '700',
                  margin: '0 0 16px',
                  lineHeight: '1.2'
                }}>
                  {chiefSpotlight?.name || "Dr. B. சைலேஷ்குமார்"}
                </h2>

                {/* Degree Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {(chiefSpotlight?.degrees || ['MBBS', 'M.S.', 'FIAGES', 'FALS']).map((deg) => (
                    <span 
                      key={deg} 
                      style={{
                        border: '1.5px solid #00B4D8',
                        color: 'var(--white)',
                        padding: '3px 14px',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        backgroundColor: 'rgba(0, 180, 216, 0.15)'
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
              {chiefStats.map((stat, idx) => (
                <div key={stat._key || idx} className="chief-doctor-stat-item">
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
            <div className="chief-doctor-body" style={{ backgroundColor: '#ffffff', color: '#1a202c', padding: '36px 36px 32px' }}>
              <div className="chief-doctor-info-grid">
                {/* Left Column: Education and training */}
                <div>
                  <div style={{
                    color: '#0077B6',
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
                    borderLeft: '2px solid #00B4D8',
                    marginLeft: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    {eduItems.map((item, idx) => (
                      <div key={item._key || idx} style={{ position: 'relative' }}>
                        <div style={{
                          position: 'absolute',
                          left: '-30px',
                          top: '5px',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#00B4D8'
                        }} />
                        <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>{item.degree}</div>
                        <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px', lineHeight: '1.5' }}>{item.institution}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Public service */}
                <div>
                  <div style={{
                    color: '#0077B6',
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
                    {serviceItems.map((item, idx) => {
                      const icons = [Building2, Stethoscope, MapPin];
                      const ItemIcon = icons[idx % icons.length];
                      return (
                        <div key={item._key || idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                          <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(0, 180, 216, 0.1)',
                            border: '1.5px solid rgba(0, 180, 216, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#0077B6',
                            flexShrink: 0
                          }}>
                            <ItemIcon size={22} />
                          </div>
                          <div>
                            <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>
                              {item.role}
                            </div>
                            <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>
                              {item.detail}
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
                    {chiefSpotlight?.awardTitle || "Best Doctor Award • 2017 மற்றும் 2018"}
                  </div>
                  <div style={{ color: '#6C5539', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {chiefSpotlight?.awardDescription || "தொடர்ச்சியாக இரண்டு ஆண்டுகள் மாவட்ட ஆட்சியரால் வழங்கப்பட்ட சிறந்த மருத்துவர் விருது"}
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
                  {chiefSpotlight?.opHoursLabel || "OP consultation hours"}
                </div>
                <div style={{
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '1.05rem',
                  letterSpacing: '0.3px'
                }}>
                  {chiefSpotlight?.opHours || "10:00 AM – 01:00 PM • 06:00 PM – 09:00 PM"}
                </div>
              </div>

              {/* Right: Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Link 
                  to="/appointment" 
                  state={{ doctorName: "Dr. B. Saileshkumar", department: "Laparoscopic & General Surgery" }}
                  style={{
                    backgroundColor: '#00B4D8',
                    color: '#061D38',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    padding: '10px 24px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(0, 180, 216, 0.35)',
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

          </TiltCard>
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
          
          {/* Section Header - Mathi Hospital Style */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }} data-aos="fade-up">
            <span style={{
              display: 'inline-block',
              fontSize: '0.85rem',
              fontWeight: '800',
              color: '#0077B6',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '8px'
            }}>
              {pageData?.consultantsHeaderSection?.tag || "Our Doctors"}
            </span>
            <h2 style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 2.85rem)',
              fontWeight: '800',
              color: '#061D38',
              margin: '0 0 14px',
              letterSpacing: '-0.3px'
            }}>
              {pageData?.consultantsHeaderSection?.heading || "Meet Our Consultants"}
            </h2>
            <div style={{
              width: '52px',
              height: '3.5px',
              background: 'linear-gradient(90deg, #00B4D8, #0077B6)',
              margin: '0 auto 16px',
              borderRadius: '2px'
            }} />
            <p style={{
              color: '#64748B',
              fontSize: '1.15rem',
              fontWeight: '500',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              {pageData?.consultantsHeaderSection?.subtitle || "Find the right specialist for you."}
            </p>
          </div>

          {/* Tab Switcher - Exact Mathi Hospital 3-Tab Style (+ All Specialists) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '32px'
          }} data-aos="fade-up" role="tablist">
            
            {/* Tab 1: Available Today */}
            <button
              type="button"
              onClick={() => setActiveTab('today')}
              role="tab"
              aria-selected={activeTab === 'today'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 24px',
                borderRadius: '30px',
                fontSize: '0.92rem',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                border: activeTab === 'today' ? '2px solid #00B4D8' : '1.5px solid #CBD5E1',
                backgroundColor: activeTab === 'today' ? '#061D38' : '#FFFFFF',
                color: activeTab === 'today' ? '#FFFFFF' : '#0F172A',
                boxShadow: activeTab === 'today' ? '0 6px 20px rgba(6, 29, 56, 0.22)' : '0 2px 6px rgba(0, 0, 0, 0.04)'
              }}
            >
              <span style={{ position: 'relative', display: 'inline-flex', width: '10px', height: '10px' }}>
                <span style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#4ADE80',
                  opacity: 0.75,
                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }} />
                <span style={{
                  position: 'relative',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: activeTab === 'today' ? '#22C55E' : '#16A34A'
                }} />
              </span>
              <span>Available Today</span>
            </button>

            {/* Tab 2: Visiting Consultants */}
            <button
              type="button"
              onClick={() => setActiveTab('visiting')}
              role="tab"
              aria-selected={activeTab === 'visiting'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 24px',
                borderRadius: '30px',
                fontSize: '0.92rem',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                border: activeTab === 'visiting' ? '2px solid #00B4D8' : '1.5px solid #CBD5E1',
                backgroundColor: activeTab === 'visiting' ? '#061D38' : '#FFFFFF',
                color: activeTab === 'visiting' ? '#FFFFFF' : '#0F172A',
                boxShadow: activeTab === 'visiting' ? '0 6px 20px rgba(6, 29, 56, 0.22)' : '0 2px 6px rgba(0, 0, 0, 0.04)'
              }}
            >
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#0284C7'
              }} />
              <span>Visiting Consultants</span>
            </button>

            {/* Tab 3: Surgical Team */}
            <button
              type="button"
              onClick={() => setActiveTab('surgical')}
              role="tab"
              aria-selected={activeTab === 'surgical'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 24px',
                borderRadius: '30px',
                fontSize: '0.92rem',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                border: activeTab === 'surgical' ? '2px solid #00B4D8' : '1.5px solid #CBD5E1',
                backgroundColor: activeTab === 'surgical' ? '#061D38' : '#FFFFFF',
                color: activeTab === 'surgical' ? '#FFFFFF' : '#0F172A',
                boxShadow: activeTab === 'surgical' ? '0 6px 20px rgba(6, 29, 56, 0.22)' : '0 2px 6px rgba(0, 0, 0, 0.04)'
              }}
            >
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#A855F7'
              }} />
              <span>Surgical Team</span>
            </button>

            {/* Tab 4: All Specialists */}
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              role="tab"
              aria-selected={activeTab === 'all'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 24px',
                borderRadius: '30px',
                fontSize: '0.92rem',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                border: activeTab === 'all' ? '2px solid #00B4D8' : '1.5px solid #CBD5E1',
                backgroundColor: activeTab === 'all' ? '#061D38' : '#FFFFFF',
                color: activeTab === 'all' ? '#FFFFFF' : '#0F172A',
                boxShadow: activeTab === 'all' ? '0 6px 20px rgba(6, 29, 56, 0.22)' : '0 2px 6px rgba(0, 0, 0, 0.04)'
              }}
            >
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#0D9488'
              }} />
              <span>All Specialists ({allDoctors.length})</span>
            </button>

          </div>

          {/* Doctor Panels Container */}
          <div style={{ maxWidth: '1140px', margin: '0 auto 30px' }} data-aos="fade-up">

            {/* Panel 1: Available Today */}
            {activeTab === 'today' && (
              <div style={{
                backgroundColor: 'rgba(236, 253, 245, 0.75)',
                borderRadius: '24px',
                padding: '28px 26px',
                border: '1.5px solid #A7F3D0',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.06)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingBottom: '18px',
                  marginBottom: '24px',
                  borderBottom: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ position: 'relative', display: 'inline-flex', width: '12px', height: '12px' }}>
                      <span style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#34D399', opacity: 0.75, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                      <span style={{ position: 'relative', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#059669' }} />
                    </span>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#064E3B', margin: 0 }}>
                        Available Today • {todayName}
                      </h3>
                      <p style={{ color: '#047857', fontSize: '0.88rem', margin: '3px 0 0', fontWeight: '500' }}>
                        Doctors consulting at JB Health Care today with active OPD & round-the-clock emergency surgical care.
                      </p>
                    </div>
                  </div>
                  <span style={{
                    backgroundColor: '#064E3B',
                    color: '#FFFFFF',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}>
                    LIVE SCHEDULE
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  {todayDoctors.map(renderDoctorCard)}
                </div>
              </div>
            )}

            {/* Panel 2: Visiting Consultants */}
            {activeTab === 'visiting' && (
              <div style={{
                backgroundColor: 'rgba(240, 249, 255, 0.8)',
                borderRadius: '24px',
                padding: '28px 26px',
                border: '1.5px solid #BAE6FD',
                boxShadow: '0 10px 30px rgba(2, 132, 199, 0.06)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingBottom: '18px',
                  marginBottom: '24px',
                  borderBottom: '1px solid rgba(2, 132, 199, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#0284C7', display: 'inline-block' }} />
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0C4A6E', margin: 0 }}>
                        Visiting Consultants • வாராந்திர சிறப்பு மருத்துவர்கள்
                      </h3>
                      <p style={{ color: '#0369A1', fontSize: '0.88rem', margin: '3px 0 0', fontWeight: '500' }}>
                        Premier super-specialists visiting JB Health Care on dedicated days of the week.
                      </p>
                    </div>
                  </div>
                  <span style={{
                    backgroundColor: '#0C4A6E',
                    color: '#FFFFFF',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: '700'
                  }}>
                    WEEKLY OPD CLINICS
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  {visitingDoctors.map(renderDoctorCard)}
                </div>
              </div>
            )}

            {/* Panel 3: Surgical Team */}
            {activeTab === 'surgical' && (
              <div style={{
                backgroundColor: 'rgba(250, 245, 255, 0.8)',
                borderRadius: '24px',
                padding: '28px 26px',
                border: '1.5px solid #E9D5FF',
                boxShadow: '0 10px 30px rgba(147, 51, 234, 0.06)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingBottom: '18px',
                  marginBottom: '24px',
                  borderBottom: '1px solid rgba(147, 51, 234, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#9333EA', display: 'inline-block' }} />
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#581C87', margin: 0 }}>
                        Surgical Team & Anaesthesiology • அறுவை சிகிச்சை குழு
                      </h3>
                      <p style={{ color: '#7E22CE', fontSize: '0.88rem', margin: '3px 0 0', fontWeight: '500' }}>
                        Anaesthesiology panel for all surgical days & specialized on-call surgeons.
                      </p>
                    </div>
                  </div>
                  <span style={{
                    backgroundColor: '#581C87',
                    color: '#FFFFFF',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: '700'
                  }}>
                    SURGERY & OT PANEL
                  </span>
                </div>

                {/* Subgroup 1: Anaesthesiologists */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#FFFFFF',
                    padding: '7px 18px',
                    borderRadius: '20px',
                    fontSize: '0.84rem',
                    fontWeight: '800',
                    color: '#581C87',
                    border: '1px solid #E9D5FF',
                    marginBottom: '16px'
                  }}>
                    ✦ Anaesthesiology & Critical Care Panel (All Surgical Days)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                    {surgicalTeam.slice(0, 3).map(renderDoctorCard)}
                  </div>
                </div>

                {/* Subgroup 2: On-Call Super-Specialists */}
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#FFFFFF',
                    padding: '7px 18px',
                    borderRadius: '20px',
                    fontSize: '0.84rem',
                    fontWeight: '800',
                    color: '#581C87',
                    border: '1px solid #E9D5FF',
                    marginBottom: '16px'
                  }}>
                    ✦ Visiting Super-Specialist Surgeons (On Surgery Days & On-Call)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                    {surgicalTeam.slice(3).map(renderDoctorCard)}
                  </div>
                </div>
              </div>
            )}

            {/* Panel 4: All Specialists */}
            {activeTab === 'all' && (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '28px 26px',
                border: '1.5px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingBottom: '18px',
                  marginBottom: '20px',
                  borderBottom: '1px solid #E2E8F0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#0D9488', display: 'inline-block' }} />
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#134E4A', margin: 0 }}>
                        All Medical Specialists & Super-Consultants
                      </h3>
                      <p style={{ color: '#0F766E', fontSize: '0.88rem', margin: '3px 0 0', fontWeight: '500' }}>
                        Browse full medical directory, filter by clinical department, or search by name.
                      </p>
                    </div>
                  </div>
                  <span style={{
                    backgroundColor: '#134E4A',
                    color: '#FFFFFF',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: '700'
                  }}>
                    {filteredAllDoctors.length} SPECIALISTS
                  </span>
                </div>

                {/* Search Bar */}
                <div style={{ maxWidth: '600px', margin: '0 auto 20px', position: 'relative' }}>
                  <Search size={20} color="#888" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text"
                    placeholder="Search specialist by name or department (e.g. Arun, Sangeetha, ENT, Urology)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '13px 20px 13px 50px',
                      borderRadius: '30px',
                      border: '1.5px solid #CBD5E1',
                      backgroundColor: '#F8FAFC',
                      fontSize: '0.96rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#00B4D8'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
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
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '0.84rem',
                          fontWeight: isActive ? '700' : '500',
                          border: isActive ? '2px solid #00B4D8' : '1px solid #CBD5E1',
                          backgroundColor: isActive ? '#0077B6' : '#FFFFFF',
                          color: isActive ? '#FFFFFF' : '#334155',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{cat.label}</span>
                        <span style={{ 
                          backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(10, 43, 78, 0.08)', 
                          color: isActive ? '#FFFFFF' : '#64748B',
                          padding: '1px 6px',
                          borderRadius: '8px',
                          fontSize: '0.72rem',
                          fontWeight: '700'
                        }}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Cards Grid */}
                {filteredAllDoctors.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#F8FAFC', borderRadius: '16px' }}>
                    <Award size={40} color="#94A3B8" style={{ marginBottom: '12px' }} />
                    <h4 style={{ color: '#061D38', marginBottom: '6px' }}>No specialists found matching criteria</h4>
                    <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '16px' }}>Try clearing the search or category filter.</p>
                    <button 
                      onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                      style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', backgroundColor: '#0077B6', color: '#FFFFFF', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                    {filteredAllDoctors.map(renderDoctorCard)}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Direct Call Action Button - Mathi Hospital Style */}
          <div style={{ textAlign: 'center', marginTop: '24px', marginBottom: '45px' }} data-aos="fade-up">
            <a 
              href="tel:+919345510905" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#061D38',
                color: '#FFFFFF',
                padding: '14px 34px',
                borderRadius: '35px',
                fontSize: '1rem',
                fontWeight: '800',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(6, 29, 56, 0.22)',
                border: '2px solid #00B4D8',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0077B6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#061D38';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Phone size={18} color="#00B4D8" />
              <span>Call to Book an Appointment • +91 93455 10905</span>
            </a>
          </div>
          
          {/* Schedule Notice Info Box */}
          <div style={{
            marginTop: '55px',
            backgroundColor: 'var(--white)',
            borderRadius: '18px',
            padding: '30px 35px',
            border: '2px dashed rgba(0, 180, 216, 0.45)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }} data-aos="fade-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(0, 180, 216, 0.15)', padding: '10px', borderRadius: '12px', color: '#0077B6' }}>
                <Clock size={24} />
              </div>
              <div>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.25rem', margin: 0 }}>
                  {pageData?.guidelinesSection?.title || "Visiting Specialist Consultation Guidelines • முன்பதிவு விவரங்கள்"}
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '3px 0 0' }}>
                  {pageData?.guidelinesSection?.subtitle || "Please read before planning your hospital visit"}
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', color: '#475569', fontSize: '0.92rem', lineHeight: '1.6' }}>
              {guidelinesList.map((g, idx) => (
                <div key={g._key || idx}>
                  <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                    {g.title}
                  </strong>
                  {g.description}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{ backgroundColor: '#071A2E', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <div className="container" data-aos="fade-up">
          <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginBottom: '12px' }}>
            {pageData?.calloutSection?.heading || "Need Immediate Assistance or Surgery Consultation?"}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 30px' }}>
            {pageData?.calloutSection?.subtitle || "Our hospital front desk is available 24/7 to connect you with our medical team and schedule priority appointments."}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn btn-accent" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', fontWeight: 'bold' }}>
              {pageData?.calloutSection?.buttonText || "Book an Appointment"}
            </Link>
            <a href={`tel:${pageData?.calloutSection?.phoneNumber || "919345510905"}`} className="btn btn-outline" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', borderColor: 'var(--white)', color: 'var(--white)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} /> {pageData?.calloutSection?.phoneText || "Call +91 93455 10905"}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .doctor-card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .doctor-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(10, 43, 78, 0.1) !important;
          border-color: #00B4D8 !important;
        }

        .chief-doctor-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 36px;
        }
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        @media (max-width: 600px) {
          .chief-doctor-body {
            padding: 20px 16px !important;
          }
          .chief-doctor-info-grid,
          .doctors-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        .doctor-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
          border-color: var(--accent) !important;
        }
      `}</style>
      
    </div>
  );
};

export default Doctors;
