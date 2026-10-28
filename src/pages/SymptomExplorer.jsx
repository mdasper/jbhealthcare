import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import { 
  Activity, 
  Stethoscope, 
  Sparkles, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Search, 
  RotateCcw,
  ShieldCheck,
  Award,
  Zap
} from 'lucide-react';

const BodyViewer3D = lazy(() => import('../components/BodyViewer3D'));

const bodyHotspots = [
  // FRONT VIEW HOTSPOTS
  {
    id: 'head',
    view: 'front',
    labelEn: 'Head & Brain',
    labelTa: 'தலை மற்றும் மூளை',
    category: 'Neurology & Medicine',
    cx: 50,
    cy: 8.5,
    r: 4.8,
    symptoms: [
      'Severe headache or persistent migraine (கடுமையான தலைவலி)',
      'Dizziness, vertigo & balancing issues (தலைசுற்றல்)',
      'Facial numbness, vision blur or weakness (முக உணர்வின்மை)',
      'Sinus congestion & persistent head heaviness (சைனஸ் நீர் கோர்த்தல்)'
    ],
    department: 'General Medicine & Diabetology',
    deptTa: 'பொது மருத்துவம் & நரம்பியல் பரிசோதனை',
    doctor: 'Dr. Sivaram & Dr. P. Karthikeyan',
    degrees: 'MBBS, DNB / MBBS, MD',
    techHighlight: 'Comprehensive neuro-vascular workup, in-house emergency stabilization, and rapid clinical triage.',
    severityNote: 'Sudden severe headache with speech difficulty requires immediate 24/7 Casualty triage.',
    badge: 'Same-Day Diagnostics Available'
  },
  {
    id: 'neck',
    view: 'front',
    labelEn: 'Neck, Throat & Thyroid',
    labelTa: 'கழுத்து, தொண்டை & தைராய்டு',
    category: 'Surgical Oncology & ENT',
    cx: 50,
    cy: 16.5,
    r: 4.2,
    symptoms: [
      'Neck swelling or visible thyroid nodule (தைராய்டு வீக்கம்)',
      'Difficulty or pain while swallowing (விழுங்குவதில் வலி)',
      'Chronic hoarseness or persistent voice change (குரல் மாற்றம்)',
      'Lump or enlarged lymph node in neck (கழுத்துக் கட்டிகள்)'
    ],
    department: 'Surgical Oncology (Cancer Surgery)',
    deptTa: 'புற்றுநோய் அறுவை சிகிச்சை & கட்டிகள் பிரிவு',
    doctor: 'Dr. Gurumoorthi & Dr. Manikandan',
    degrees: 'M.S., M.Ch. (Surgical Oncology)',
    techHighlight: 'Fine-needle biopsy (FNAC), head & neck tumor clinical staging, and precision thyroid resections.',
    severityNote: 'Progressive painless swelling in the neck should be clinically staged without delay.',
    badge: 'Visiting Super-Specialists'
  },
  {
    id: 'chest',
    view: 'front',
    labelEn: 'Chest, Heart & Lungs',
    labelTa: 'நெஞ்சு, இதயம் & நுரையீரல்',
    category: 'Critical Diagnostics',
    cx: 50,
    cy: 26,
    r: 5.5,
    symptoms: [
      'Chest tightness, squeezing sensation or left arm radiation (நெஞ்சு வலி)',
      'Shortness of breath on mild exertion or lying down (மூச்சுத்திணறல்)',
      'Rapid palpitations or irregular heartbeat (படபடப்பு)',
      'Persistent chronic cough, wheezing & asthma (ஆஸ்துமா / சளி)'
    ],
    department: 'In-House Diagnostics & Digital ECG',
    deptTa: 'டிஜிட்டல் ECG & இதய பரிசோதனை மையம்',
    doctor: 'Dr. Sivaram & Critical Care Team',
    degrees: 'MBBS, DNB (Internal Medicine)',
    techHighlight: 'Computerized 12-lead digital ECG testing, cardiac biomarker profiling (Troponin/CPK), and 24/7 oxygenation therapy.',
    severityNote: 'Chest pain radiating to the jaw, back or left arm is an emergency. Contact our 24/7 Casualty immediately.',
    badge: 'Instant 12-Lead Digital ECG'
  },
  {
    id: 'upper_abdomen',
    view: 'front',
    labelEn: 'Upper Abdomen (Gallbladder & Liver)',
    labelTa: 'மேல் வயிறு, பித்தப்பை & கல்லீரல்',
    category: 'Keyhole Surgical Excellence',
    cx: 47,
    cy: 37,
    r: 5.2,
    symptoms: [
      'Severe pain in right upper abdomen after oily food (பித்தப்பை கல் வலி)',
      'Acid reflux, sour belching & epigastric burning (நெஞ்செரிச்சல் / அல்சர்)',
      'Nausea, recurrent vomiting & food intolerance (வாந்தி, செரிமானமின்மை)',
      'Yellowish eye tint, jaundice & fatty liver symptoms (கல்லீரல் பிரச்சனை)'
    ],
    department: 'Laparoscopic & Keyhole Surgery',
    deptTa: 'லேப்ரோஸ்கோபிக் அறுவை சிகிச்சை மையம்',
    doctor: 'Dr. B. Saileshkumar',
    degrees: 'MBBS, M.S., FIAGES, FALS',
    techHighlight: '4K Ultra-HD Laparoscopic Cholecystectomy (பித்தப்பை கல் அகற்றுதல்) through tiny 5mm keyholes. No scars, minimal pain, 24-hr discharge.',
    severityNote: 'Gallstones can trigger severe acute pancreatitis or bile blockage if neglected.',
    badge: 'Founder & Chief Laparoscopic Surgeon • 10,000+ Surgeries'
  },
  {
    id: 'lower_abdomen',
    view: 'front',
    labelEn: 'Lower Abdomen (Appendix & Hernia)',
    labelTa: 'கீழ் வயிறு, குடல்வால் & குடல் இறக்கம்',
    category: 'Keyhole Surgical Excellence',
    cx: 50,
    cy: 46,
    r: 5.4,
    symptoms: [
      'Sharp sudden stabbing pain in right lower abdomen (குடல்வால் வலி - Appendix)',
      'Bulge or swelling in groin/navel that enlarges on coughing (குடல் இறக்கம் - Hernia)',
      'Severe bloating, inability to pass gas or constipation (குடல் அடைப்பு)',
      'Abdominal wall tenderness with high-grade fever'
    ],
    department: 'Laparoscopic & Keyhole Surgery',
    deptTa: 'லேப்ரோஸ்கோபிக் குடல்வால் & குடல் இறக்க அறுவை',
    doctor: 'Dr. B. Saileshkumar',
    degrees: 'MBBS, M.S., FIAGES, FALS',
    techHighlight: 'Laparoscopic Appendectomy & Tension-Free 3D Mesh Hernia Repair. Rapid return to work in 48 hours.',
    severityNote: 'Acute appendicitis carries a risk of rupture/peritonitis; emergency surgery is available 24/7.',
    badge: 'Over 2,000+ Keyhole Surgeries Concluded'
  },
  {
    id: 'pelvis_urinary',
    view: 'front',
    labelEn: 'Kidneys, Bladder & Urology',
    labelTa: 'சிறுநீரகம் & கல் அறுவை சிகிச்சை',
    category: 'Super-Specialties',
    cx: 50,
    cy: 55,
    r: 4.8,
    symptoms: [
      'Intense shooting flank pain radiating from back to groin (சிறுநீரக கல் வலி)',
      'Burning sensation or blood in urine (சிறுநீரில் எரிச்சல் / ரத்தம்)',
      'Frequent nighttime urination or weak urinary stream (ப்ராஸ்டேட் வீக்கம்)',
      'Incontinence or recurrent urinary tract infections (UTI)'
    ],
    department: 'Urology & Laser Stone Care',
    deptTa: 'சிறுநீரக & லேசர் கல் அறுவை சிகிச்சை துறை',
    doctor: 'Dr. G. Sankar',
    degrees: 'M.S., M.Ch. (Urology)',
    techHighlight: 'Minimally invasive laser lithotripsy (URS/PCNL) for kidney and ureteric stones without open cuts, plus prostate BPH assessment.',
    severityNote: 'Hydronephrosis caused by an impacted urinary stone requires urgent stenting or laser dissolution.',
    badge: 'Modern Endoscopic Laser Care'
  },
  {
    id: 'female_pelvis',
    view: 'front',
    labelEn: 'Women’s Health & Gynaecology',
    labelTa: 'பெண்கள் நலம் & மகளிர் நலம்',
    category: 'Women Health',
    cx: 50,
    cy: 62.5,
    r: 4.5,
    symptoms: [
      'Irregular menstrual periods, severe cramps & PCOD (மாதவிடாய் பிரச்சனை)',
      'Lower abdominal heaviness, fibroids & ovarian cysts (கருப்பை நீர்க்கட்டி)',
      'White discharge, pelvic infection & hormonal imbalance',
      'Pelvic pain evaluation & laparoscopic consultation'
    ],
    department: 'Gynaecology & Women’s Health',
    deptTa: 'மகளிர் நலம் & லேப்ராஸ்கோபிக் சிகிச்சை',
    doctor: 'Dr. Sangeetha & Surgical Team',
    degrees: 'MBBS, DGO (Gynaecology & Women Health)',
    techHighlight: 'Advanced 4K Laparoscopic Hysterectomy (கருப்பை நீக்கம்), cystectomy, and minimally invasive procedures.',
    severityNote: 'Severe acute pelvic pain or heavy abnormal bleeding requires prompt medical consultation.',
    badge: 'Gentle, Compassionate Women Care'
  },
  {
    id: 'upper_joints',
    view: 'front',
    labelEn: 'Shoulder, Arm & Hand Trauma',
    labelTa: 'தோள்பட்டை, கைகள் & தசைநார்கள்',
    category: 'Surgical Excellence',
    cx: 26,
    cy: 34,
    r: 4.6,
    symptoms: [
      'Shoulder dislocation or frozen shoulder stiffness (தோள்பட்டை வலி)',
      'Elbow joint pain, tennis elbow or wrist swelling (கை மூட்டு வலி)',
      'Accidental cut injury, nerve/tendon trauma in fingers (வெட்டுக் காயங்கள்)',
      'Numbness or tingling sensation in fingertips'
    ],
    department: 'Orthopaedics & Plastic Reconstruction',
    deptTa: 'எலும்பு முறிவு & ஒட்டுறுப்பு அறுவை சிகிச்சை',
    doctor: 'Dr. Deepan Ramkumar & Dr. R. Arunkumar',
    degrees: 'M.S. Ortho / M.Ch. Plastic Surgery',
    techHighlight: 'Tendon repairs, microvascular reconstruction for deep accidental cuts, and C-arm fluoroscopy guided fracture plating.',
    severityNote: 'Deep lacerations with active arterial bleeding must be stabilized under 24/7 casualty protocol.',
    badge: 'Trauma & Microsurgery Experts'
  },
  {
    id: 'lower_joints',
    view: 'front',
    labelEn: 'Knee, Hip & Leg Bones',
    labelTa: 'முழங்கால், இடுப்பு & கால் எலும்புகள்',
    category: 'Surgical Excellence',
    cx: 41,
    cy: 78,
    r: 5.2,
    symptoms: [
      'Severe knee joint pain, clicking sound & osteoarthritis (முழங்கால் தேய்மானம்)',
      'Inability to bear weight after fall, vehicle accident (எலும்பு முறிவு)',
      'Ligament tear (ACL/meniscus), sports injuries & swelling (தசைநார் கிழிவு)',
      'Hip joint stiffness, groin pain while walking'
    ],
    department: 'Orthopaedics & Fracture Trauma',
    deptTa: 'எலும்பு முறிவு & மூட்டு அறுவை சிகிச்சை துறை',
    doctor: 'Dr. Deepan Ramkumar',
    degrees: 'M.S. Ortho (Orthopaedic Surgeon)',
    techHighlight: 'Intra-articular therapeutic injections, closed fracture reduction, dynamic compression plating, and arthritis management.',
    severityNote: 'Inability to move the limb after an accident indicates an acute fracture requiring immediate X-ray splinting.',
    badge: 'Precision C-Arm Guided Surgery'
  },
  {
    id: 'skin_wounds',
    view: 'front',
    labelEn: 'Skin, Burns & Diabetic Foot',
    labelTa: 'சருமம், தீக்காயங்கள் & சர்க்கரை புண்',
    category: 'Super-Specialties',
    cx: 58,
    cy: 88,
    r: 4.6,
    symptoms: [
      'Non-healing diabetic foot ulcer or blackened toe (சர்க்கரை நோய் கால் புண்)',
      'Fire, chemical or hot water burn injuries (தீக்காயங்கள்)',
      'Large facial scars, keloids or cosmetic disfigurement (தழும்புகள்)',
      'Soft tissue defects requiring skin grafting'
    ],
    department: 'Plastic & Cosmetic Reconstructive Surgery',
    deptTa: 'ஒட்டுறுப்பு & பிளாஸ்டிக் அறுவை சிகிச்சை',
    doctor: 'Dr. R. Arunkumar',
    degrees: 'M.S., M.Ch. (Plastic Surgery)',
    techHighlight: 'Diabetic foot limb-salvage wound debridement, split skin grafting (SSG), burn contracture release, and aesthetic scar revision.',
    severityNote: 'Spreading redness or foul smell from a diabetic foot wound requires urgent debridement to prevent amputation.',
    badge: 'Limb Salvage & Aesthetics'
  },

  // BACK VIEW HOTSPOTS
  {
    id: 'back_cervical',
    view: 'back',
    labelEn: 'Cervical Spine & Neck Back',
    labelTa: 'கழுத்து தண்டுவடம் & பிடரி வலி',
    category: 'Orthopaedics & Medicine',
    cx: 50,
    cy: 16,
    r: 4.6,
    symptoms: [
      'Persistent dull ache at the back of neck or base of skull (பிடரி வலி)',
      'Neck stiffness radiating into shoulders or shoulder blades',
      'Tingling, burning or electric sensation down either arm',
      'Loss of neck turning range of motion'
    ],
    department: 'Orthopaedics & Trauma Surgery',
    deptTa: 'தண்டுவடம் & எலும்பு மூட்டு சிகிச்சை',
    doctor: 'Dr. Deepan Ramkumar',
    degrees: 'M.S. Ortho',
    techHighlight: 'Cervical spondylosis clinical evaluation, cervical collar protocol, targeted nerve analgesia, and physio-rehabilitation.',
    severityNote: 'Arm weakness or sudden grip loss indicates severe cervical nerve root compression.',
    badge: 'Spine & Joint Assessment'
  },
  {
    id: 'back_lumbar',
    view: 'back',
    labelEn: 'Lumbar Spine & Sciatica (Lower Back)',
    labelTa: 'இடுப்பு தண்டுவடம், டிஸ்க் & சியாட்டிகா',
    category: 'Orthopaedics & Spine',
    cx: 50,
    cy: 45,
    r: 5.2,
    symptoms: [
      'Low back pain aggravating on bending or prolonged sitting (இடுப்பு வலி)',
      'Sharp shooting shock-like pain down the thigh and calf (Sciatica)',
      'Slipped disc / disc bulge sensation with morning stiffness',
      'Numbness or heavy feeling in both feet'
    ],
    department: 'Orthopaedics & Trauma Surgery',
    deptTa: 'இடுப்பு தண்டுவட சிகிச்சை பிரிவு',
    doctor: 'Dr. Deepan Ramkumar',
    degrees: 'M.S. Ortho',
    techHighlight: 'Lumbar disc decompressive therapies, ergonomic postural rehabilitation, and localized targeted spinal intervention.',
    severityNote: 'Loss of bladder control combined with lower back pain is a surgical emergency (Cauda Equina Syndrome).',
    badge: 'Spine & Trauma Center'
  },
  {
    id: 'back_kidneys',
    view: 'back',
    labelEn: 'Flank Area (Bilateral Kidneys)',
    labelTa: 'பக்கவாட்டு முதுகு & சிறுநீரகம்',
    category: 'Urology',
    cx: 41,
    cy: 39,
    r: 4.4,
    symptoms: [
      'Sudden excruciating flank spasms below rib cage (சிறுநீரக வலி)',
      'Colicky pain coming in intense waves with cold sweats & nausea',
      'Fever with shaking chills, cloudy urine (சிறுநீரக தொற்று - Pyelonephritis)',
      'Tenderness over the costovertebral angle'
    ],
    department: 'Urology & Laser Stone Care',
    deptTa: 'சிறுநீரக & லேசர் கல் அறுவை சிகிச்சை',
    doctor: 'Dr. G. Sankar',
    degrees: 'M.S., M.Ch. (Urology)',
    techHighlight: 'Endoscopic retrograde laser stone disintegration, emergency ureteric double-J stenting, and metabolic stone prevention.',
    severityNote: 'Kidney infection with high fever and obstructed stone requires urgent decompression.',
    badge: 'Laser Stone Specialists'
  },
  {
    id: 'back_anorectal',
    view: 'back',
    labelEn: 'Anorectal (Piles, Fistula & Fissure)',
    labelTa: 'மூலம், பௌத்திரம் & ஆசனவாய் வெடிப்பு',
    category: 'Keyhole Proctology',
    cx: 50,
    cy: 56,
    r: 4.4,
    symptoms: [
      'Painless bright red blood drops during bowel movements (மூல நோய் - Piles)',
      'Intense knife-like sharp anal pain after motion (ஆசனவாய் வெடிப்பு - Fissure)',
      'Pus discharge, swelling or painful boil near anal verge (பௌத்திரம் - Fistula)',
      'Prolapsing tissue mass requiring manual replacement'
    ],
    department: 'Laparoscopic & Keyhole Surgery',
    deptTa: 'லேப்ரோஸ்கோபிக் மூலம் & பௌத்திர அறுவை சிகிச்சை',
    doctor: 'Dr. B. Saileshkumar',
    degrees: 'MBBS, M.S., FIAGES, FALS',
    techHighlight: 'Painless Laser Proctology & Minimally Invasive Stapler Haemorrhoidectomy. Zero long open wound, rapid healing within 24 hours.',
    severityNote: 'Anal bleeding should always be evaluated to clinically exclude colorectal polyps or malignancies.',
    badge: '10,000+ Surgeries • Painless Proctology'
  }
];

const SymptomExplorer = () => {
  const [activeView, setActiveView] = useState('front'); // 'front' | 'back'
  const [selectedHotspot, setSelectedHotspot] = useState(bodyHotspots[3]); // default to upper abdomen (Gallbladder / Laparoscopy)
  const [searchQuery, setSearchQuery] = useState('');

  // Filter hotspots for current view
  const currentViewHotspots = bodyHotspots.filter(h => h.view === activeView);

  // Search filter matching
  const matchingHotspots = searchQuery.trim() === '' 
    ? [] 
    : bodyHotspots.filter(h => {
        const q = searchQuery.toLowerCase().trim();
        return (
          h.labelEn.toLowerCase().includes(q) ||
          h.labelTa.toLowerCase().includes(q) ||
          h.department.toLowerCase().includes(q) ||
          h.doctor.toLowerCase().includes(q) ||
          h.symptoms.some(s => s.toLowerCase().includes(q))
        );
      });

  const handleSelectHotspot = (hotspot) => {
    setSelectedHotspot(hotspot);
    if (hotspot.view !== activeView) {
      setActiveView(hotspot.view);
    }
  };

  return (
    <div className="page-transition" style={{ backgroundColor: '#061628', color: '#ffffff', minHeight: '100vh' }}>
      
      {/* 1. Futuristic Medical Header */}
      <section style={{
        padding: '160px 0 60px',
        background: 'radial-gradient(circle at 50% 20%, rgba(10, 43, 78, 0.95), #061628 85%)',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '1px solid rgba(0, 180, 216, 0.2)'
      }}>
        <div className="container" data-aos="fade-up">
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(0, 180, 216, 0.15)',
            border: '1px solid rgba(0, 180, 216, 0.45)',
            color: '#00B4D8',
            padding: '7px 22px',
            borderRadius: '30px',
            fontSize: '0.86rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '18px'
          }}>
            <Sparkles size={16} /> 3D Body Symptom Explorer • உடல் உறுப்பு வழி பரிசோதனை
          </div>

          <h1 style={{
            color: '#ffffff',
            fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '16px',
            letterSpacing: '0.5px'
          }}>
            Where Does It Hurt?
          </h1>

          <p style={{
            fontSize: '1.2rem',
            maxWidth: '820px',
            margin: '0 auto 25px',
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: '1.7'
          }}>
            மருத்துவத் துறை பெயர்கள் தெரியாவிட்டாலும் பரவாயில்லை! மனித உடலின் வலிக்கும் பகுதியை க்ளிக் செய்து, அதற்குரிய <strong>சிறப்பு மருத்துவர், நவீன சிகிச்சைகள்</strong> மற்றும் உடனடி முன்பதிவை 5 வினாடிகளில் கண்டறியுங்கள்.
          </p>

          {/* Quick Search Bar */}
          <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
            <Search 
              size={20} 
              color="#00B4D8" 
              style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input 
              type="text"
              placeholder="Search symptom or disease (e.g., Gallstones, Kidney stone, நெஞ்சு வலி, மூலம், கட்டி)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 45px 14px 50px',
                borderRadius: '30px',
                border: '1.5px solid rgba(0, 180, 216, 0.4)',
                backgroundColor: 'rgba(10, 43, 78, 0.7)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                fontSize: '0.98rem',
                outline: 'none',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Results Dropdown Pills */}
          {matchingHotspots.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              maxWidth: '850px',
              margin: '20px auto 0'
            }}>
              {matchingHotspots.map((match) => (
                <button
                  key={match.id}
                  onClick={() => {
                    handleSelectHotspot(match);
                    setSearchQuery('');
                  }}
                  className="btn-magnetic"
                  style={{
                    backgroundColor: 'rgba(0, 180, 216, 0.2)',
                    border: '1px solid #00B4D8',
                    color: '#ffffff',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.86rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Zap size={14} color="#00B4D8" />
                  <span><strong>{match.labelEn}</strong> ({match.labelTa})</span>
                  <ArrowRight size={13} color="#00B4D8" />
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 2. Interactive Anatomical Workbench Section */}
      <section style={{ padding: '50px 0 90px' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>

          {/* Orientation Controller Pills */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '40px'
          }}>
            <button
              onClick={() => setActiveView('front')}
              className="btn-magnetic"
              style={{
                padding: '10px 28px',
                borderRadius: '30px',
                fontSize: '0.95rem',
                fontWeight: '700',
                border: activeView === 'front' ? '2px solid #00B4D8' : '1px solid rgba(255,255,255,0.15)',
                backgroundColor: activeView === 'front' ? '#0A2B4E' : 'rgba(255,255,255,0.05)',
                color: activeView === 'front' ? '#00B4D8' : 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: activeView === 'front' ? '0 0 20px rgba(0, 180, 216, 0.35)' : 'none'
              }}
            >
              <span>🧍‍♂️ Front View (முன்புறம்)</span>
            </button>

            <button
              onClick={() => setActiveView('back')}
              className="btn-magnetic"
              style={{
                padding: '10px 28px',
                borderRadius: '30px',
                fontSize: '0.95rem',
                fontWeight: '700',
                border: activeView === 'back' ? '2px solid #00B4D8' : '1px solid rgba(255,255,255,0.15)',
                backgroundColor: activeView === 'back' ? '#0A2B4E' : 'rgba(255,255,255,0.05)',
                color: activeView === 'back' ? '#00B4D8' : 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: activeView === 'back' ? '0 0 20px rgba(0, 180, 216, 0.35)' : 'none'
              }}
            >
              <RotateCcw size={16} />
              <span>🔄 Back View (பின்புறம் & தண்டுவடம்)</span>
            </button>
          </div>

          {/* Workbench Grid: Left = Silhouette Canvas, Right = Diagnosis Card */}
          <div className="symptom-workbench-grid">

            {/* Left: 3D Holographic Silhouette Interactive Canvas */}
            <div 
              className="silhouette-stage"
              style={{
                backgroundColor: '#071A2E',
                borderRadius: '24px',
                border: '1.5px solid rgba(0, 180, 216, 0.35)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(10, 43, 78, 0.6)',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Holographic Radar Grid Overlay */}
              <div 
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 201, 167, 0.08) 0%, transparent 70%), linear-gradient(rgba(0, 180, 216, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 180, 216, 0.05) 1px, transparent 1px)',
                  backgroundSize: '100% 100%, 30px 30px, 30px 30px',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />

              {/* View Status Tag */}
              <div style={{
                position: 'absolute',
                top: '18px',
                left: '20px',
                zIndex: 5,
                backgroundColor: 'rgba(6, 22, 40, 0.85)',
                border: '1px solid rgba(0, 201, 167, 0.4)',
                color: '#00C9A7',
                padding: '4px 14px',
                borderRadius: '16px',
                fontSize: '0.78rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span className="live-casualty-beacon" style={{ width: '7px', height: '7px' }} />
                <span>{activeView === 'front' ? 'ANTERIOR (FRONT) SCAN' : 'POSTERIOR (BACK) SCAN'}</span>
              </div>

              {/* Helper text */}
              <div style={{
                position: 'absolute',
                top: '18px',
                right: '20px',
                zIndex: 5,
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Sparkles size={13} color="var(--accent)" /> Click glowing node to explore
              </div>

              {/* 3D Holographic Body Viewer */}
              <div style={{ width: '100%', height: '620px', zIndex: 3 }}>
                <Suspense fallback={null}>
                  <BodyViewer3D
                    hotspots={bodyHotspots}
                    activeView={activeView}
                    selectedId={selectedHotspot?.id}
                    onSelect={handleSelectHotspot}
                    onViewChange={setActiveView}
                  />
                </Suspense>
              </div>

              {/* Bottom Hotspots Quick Carousel Chips */}
              <div style={{
                marginTop: '15px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '8px',
                zIndex: 4,
                width: '100%'
              }}>
                {currentViewHotspots.map((spot) => {
                  const isSelected = selectedHotspot?.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => handleSelectHotspot(spot)}
                      style={{
                        backgroundColor: isSelected ? 'rgba(0, 230, 118, 0.2)' : 'rgba(10, 43, 78, 0.6)',
                        border: isSelected ? '1.5px solid #00E676' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: isSelected ? '#00E676' : 'rgba(255, 255, 255, 0.85)',
                        padding: '4px 12px',
                        borderRadius: '14px',
                        fontSize: '0.74rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {spot.labelEn}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Right: Ultra-Luxe Clinical Diagnosis & Booking Card */}
            {selectedHotspot && (
              <TiltCard
                key={selectedHotspot.id}
                maxTilt={4}
                scale={1.01}
                glareColor="rgba(0, 180, 216, 0.16)"
                style={{
                  backgroundColor: '#09213A',
                  borderRadius: '24px',
                  border: '1.5px solid #00B4D8',
                  boxShadow: '0 25px 65px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 180, 216, 0.25)',
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div>

                  {/* Header Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
                    <div style={{
                      backgroundColor: 'rgba(0, 180, 216, 0.18)',
                      border: '1px solid rgba(0, 180, 216, 0.45)',
                      color: '#00B4D8',
                      padding: '4px 14px',
                      borderRadius: '16px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px'
                    }}>
                      {selectedHotspot.category}
                    </div>

                    <div style={{
                      backgroundColor: 'rgba(0, 201, 167, 0.12)',
                      border: '1px solid rgba(0, 201, 167, 0.4)',
                      color: '#00C9A7',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '0.76rem',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <CheckCircle2 size={13} color="#00C9A7" /> {selectedHotspot.badge}
                    </div>
                  </div>

                  {/* Organ Titles */}
                  <h2 style={{
                    color: '#ffffff',
                    fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                    fontWeight: '800',
                    margin: '0 0 4px',
                    lineHeight: '1.2'
                  }}>
                    {selectedHotspot.labelEn}
                  </h2>
                  <div style={{ color: '#00B4D8', fontSize: '1.15rem', fontWeight: '600', marginBottom: '22px' }}>
                    {selectedHotspot.labelTa}
                  </div>

                  {/* Common Symptoms Checklist */}
                  <div style={{
                    backgroundColor: 'rgba(6, 22, 40, 0.75)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '20px 22px',
                    marginBottom: '22px'
                  }}>
                    <div style={{
                      fontSize: '0.82rem',
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      marginBottom: '12px'
                    }}>
                      Common Symptoms / அறிகுறிகள்:
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                      {selectedHotspot.symptoms.map((sym, sIdx) => (
                        <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ color: '#00B4D8', marginTop: '2px', fontWeight: 'bold' }}>•</span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.92)', fontSize: '0.94rem', lineHeight: '1.45' }}>
                            {sym}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Doctor & Department Recommendation Card */}
                  <div style={{
                    backgroundColor: 'rgba(10, 43, 78, 0.55)',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(0, 180, 216, 0.35)',
                    padding: '20px 22px',
                    marginBottom: '22px'
                  }}>
                    <div style={{ fontSize: '0.78rem', color: '#00B4D8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
                      Recommended Department & Specialist:
                    </div>

                    <div style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '800', marginBottom: '4px' }}>
                      {selectedHotspot.department}
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem', marginBottom: '14px' }}>
                      {selectedHotspot.deptTa}
                    </div>

                    {/* Specialist Doctor Pill */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      backgroundColor: 'rgba(0, 180, 216, 0.12)',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 180, 216, 0.3)'
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#00B4D8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0A2540',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        <Stethoscope size={20} />
                      </div>
                      <div>
                        <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.98rem' }}>
                          {selectedHotspot.doctor}
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem' }}>
                          {selectedHotspot.degrees}
                        </div>
                      </div>
                    </div>

                    {/* Technology description */}
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: '0.88rem',
                      lineHeight: '1.55',
                      margin: '14px 0 0'
                    }}>
                      {selectedHotspot.techHighlight}
                    </p>
                  </div>

                  {/* Clinical Alert Warning */}
                  {selectedHotspot.severityNote && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      backgroundColor: 'rgba(255, 107, 107, 0.12)',
                      border: '1px solid rgba(255, 107, 107, 0.35)',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      marginBottom: '26px'
                    }}>
                      <AlertCircle size={18} color="#FF6B6B" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: '#FFA8A8', fontSize: '0.85rem', lineHeight: '1.45' }}>
                        {selectedHotspot.severityNote}
                      </span>
                    </div>
                  )}

                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                  
                  {/* Primary Appointment Button */}
                  <Link
                    to="/appointment"
                    state={{
                      department: selectedHotspot.department,
                      doctorName: selectedHotspot.doctor,
                      symptomNote: `Consultation for ${selectedHotspot.labelEn} symptoms`
                    }}
                    className="btn btn-accent btn-magnetic"
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      fontSize: '1rem',
                      fontWeight: '800',
                      borderRadius: '12px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      textDecoration: 'none'
                    }}
                  >
                    <Calendar size={18} />
                    <span>Book Consultation for this Symptom</span>
                    <ArrowRight size={18} />
                  </Link>

                  {/* Secondary WhatsApp Help Button */}
                  <a
                    href={`https://api.whatsapp.com/send?phone=919345510905&text=${encodeURIComponent(`Hi JB Healthcare, I have symptoms in my ${selectedHotspot.labelEn} (${selectedHotspot.symptoms[0]}). I would like to consult ${selectedHotspot.doctor}. Please guide me.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-magnetic"
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      fontSize: '0.92rem',
                      fontWeight: '700',
                      borderRadius: '12px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(37, 211, 102, 0.15)',
                      border: '1.5px solid #25D366',
                      color: '#25D366',
                      textDecoration: 'none'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Instant WhatsApp Advice for this Symptom</span>
                  </a>

                </div>

              </TiltCard>
            )}

          </div>

        </div>
      </section>

      {/* 3. 24/7 Emergency Casualty Help Strip */}
      <section style={{
        backgroundColor: '#071A2E',
        borderTop: '1px solid rgba(0, 180, 216, 0.25)',
        padding: '35px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ color: '#00E676', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="live-casualty-beacon" /> 24/7 ROUND-THE-CLOCK EMERGENCY CASUALTY
            </div>
            <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.4rem' }}>
              Can't pinpoint your symptoms or having an emergency?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: '4px 0 0', fontSize: '0.92rem' }}>
              Our emergency casualty medical officers are on-duty 24/7 for immediate stabilization and triage.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <a
              href="tel:+919345510905"
              className="btn btn-accent btn-magnetic"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '0.95rem',
                fontWeight: '800'
              }}
            >
              <Phone size={16} /> +91 93455 10905
            </a>
            <Link
              to="/contact"
              className="btn-magnetic"
              style={{
                color: '#00B4D8',
                border: '1.5px solid rgba(0, 180, 216, 0.5)',
                padding: '11px 22px',
                borderRadius: '25px',
                fontSize: '0.92rem',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              Hospital Directions
            </Link>
          </div>
        </div>
      </section>

      {/* Embedded Responsive Styles */}
      <style>{`
        .symptom-workbench-grid {
          display: grid;
          grid-template-columns: 460px 1fr;
          gap: 36px;
          align-items: stretch;
        }

        @media (max-width: 1040px) {
          .symptom-workbench-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

    </div>
  );
};

export default SymptomExplorer;
