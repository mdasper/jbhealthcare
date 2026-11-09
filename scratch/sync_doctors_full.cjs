const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function uploadImageToSanity(filePath, filename, mime = 'image/png') {
  if (!fs.existsSync(filePath)) return null;
  const url = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`;
  const buffer = fs.readFileSync(filePath);
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WRITE_TOKEN}`,
      'Content-Type': mime
    },
    body: buffer
  });

  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data.document._id;
}

// 14 real doctors exactly matching Doctors.jsx
const allRealDoctors = [
  {
    _id: 'doc-1',
    order: 1,
    name: 'Dr. B. Saileshkumar',
    degree: 'MBBS, M.S., FIAGES, FALS',
    categoryHeader: 'GENERAL & ADVANCED LAPAROSCOPIC SURGERY',
    department: 'Founder & Chief Laparoscopic Surgeon',
    category: 'Laparoscopic',
    schedule: 'Monday – Saturday',
    timing: '10:00 AM – 1:00 PM & 6:00 PM – 9:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    focusAreas: [
      'Advanced Laparoscopy (2,000+ cases)',
      'Gallbladder & Appendix removal',
      'Hernia & Hydrocele repair',
      'Laser Proctology (Piles, Fistula)'
    ]
  },
  {
    _id: 'doc-2',
    order: 2,
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
    _id: 'doc-3',
    order: 3,
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
    _id: 'doc-4',
    order: 4,
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
    _id: 'doc-5',
    order: 5,
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
    _id: 'doc-6',
    order: 6,
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
    _id: 'doc-7',
    order: 7,
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
    _id: 'doc-8',
    order: 8,
    name: 'Dr. Gurumoorthi',
    degree: 'MBBS, M.S., M.Ch.',
    categoryHeader: 'SURGICAL ONCOLOGY',
    department: 'Surgical Oncology',
    category: 'Oncology',
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
    _id: 'doc-9',
    order: 9,
    name: 'Dr. Manikandan',
    degree: 'MBBS, M.S., M.Ch.',
    categoryHeader: 'SURGICAL ONCOLOGY',
    department: 'Surgical Oncology',
    category: 'Oncology',
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
    _id: 'doc-10',
    order: 10,
    name: 'Dr. Arun Kumar (Plastic)',
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
    _id: 'doc-11',
    order: 11,
    name: 'Dr. Arun Kumar (Paediatric)',
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
    _id: 'doc-12',
    order: 12,
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
    _id: 'doc-13',
    order: 13,
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
    _id: 'doc-14',
    order: 14,
    name: 'Sowdambika @ Reethika M',
    degree: 'M.Sc., M.Phil. (Clinical Psychology)',
    categoryHeader: 'CLINICAL PSYCHOLOGY & COUNSELLING',
    department: 'Clinical Psychology & Counselling',
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

async function run() {
  const queryUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${encodeURIComponent('*[_type == "doctor"]')}`;
  const queryRes = await fetch(queryUrl, { headers: { Authorization: `Bearer ${WRITE_TOKEN}` } });
  const queryData = await queryRes.json();
  const existingDocs = queryData.result || [];

  console.log(`Found ${existingDocs.length} doctor documents currently in Sanity.`);

  // Dummy doctor names to delete
  const dummyNames = ['Anbumani', 'Meenakshi', 'Karthik M.', 'Priya V.', 'Rajesh K.', 'Nithya P.'];
  const mutations = [];

  for (const d of existingDocs) {
    if (dummyNames.some(dn => (d.name || '').includes(dn)) || !d.department) {
      console.log(`Scheduling deletion for dummy doctor: ${d.name} (${d._id})`);
      mutations.push({ delete: { id: d._id } });
    }
  }

  // Upload Dr. Sailesh profile picture
  let doctorAssetId = null;
  try {
    doctorAssetId = await uploadImageToSanity('public/doctor.png', 'doctor_sailesh.png', 'image/png');
  } catch (e) {
    console.warn('Photo upload warning:', e.message);
  }

  // Create or replace all 14 real doctors
  for (const doc of allRealDoctors) {
    mutations.push({
      createOrReplace: {
        _id: doc._id,
        _type: 'doctor',
        order: doc.order,
        name: doc.name,
        degree: doc.degree,
        categoryHeader: doc.categoryHeader,
        department: doc.department,
        category: doc.category,
        schedule: doc.schedule,
        timing: doc.timing,
        availableDays: doc.availableDays,
        focusAreas: doc.focusAreas,
        whatsappNumber: '919345510905',
        ...(doc._id === 'doc-1' && doctorAssetId ? {
          image: { _type: 'image', asset: { _type: 'reference', _ref: doctorAssetId } }
        } : {})
      }
    });
  }

  // Also build doctorsPage document
  const doctorsPageDoc = {
    _id: 'doctorsPage',
    _type: 'doctorsPage',

    // 1. Header & Overview
    heroHeading: 'Meet Our Medical Team & Specialists',
    heroTag: 'சிறப்பு மருத்துவர்கள் குழு • Leading Surgeons & Consultants',
    heroDescription: 'Led by award-winning laparoscopic surgeon Dr. B. Saileshkumar, our multidisciplinary team of visiting super-specialists brings premier clinical expertise in cancer surgery, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics to Sivakasi.',

    // 2. Chief Doctor Spotlight
    chiefDoctorSpotlight: {
      tag: 'JB Health Care • Head of surgery',
      name: 'Dr. B. சைலேஷ்குமார்',
      degrees: ['MBBS', 'M.S.', 'FIAGES', 'FALS'],
      ...(doctorAssetId ? {
        image: { _type: 'image', asset: { _type: 'reference', _ref: doctorAssetId } }
      } : {}),
      stats: [
        { _key: 's-1', value: '10,000+', label: 'அறுவை சிகிச்சைகள்' },
        { _key: 's-2', value: '2,000+', label: 'லேப்ரோஸ்கோபிக்' },
        { _key: 's-3', value: '3,000+', label: 'சிசேரியன்' },
        { _key: 's-4', value: '100+', label: 'புற்றுநோய் அறுவை' },
        { _key: 's-5', value: '50+', label: 'COVID நோயாளிகள்' }
      ],
      educationTitle: 'கல்வி மற்றும் பயிற்சி',
      educationItems: [
        { _key: 'edu-1', degree: 'MBBS', institution: 'மெட்ராஸ் மருத்துவக் கல்லூரி' },
        { _key: 'edu-2', degree: 'M.S.', institution: 'மதுரை மருத்துவக் கல்லூரி' },
        { _key: 'edu-3', degree: 'லேப்ரோஸ்கோப்பி பயிற்சி', institution: 'VG மருத்துவமனை, கோயம்புத்தூர்' },
        { _key: 'edu-4', degree: 'FIAGES / FALS', institution: 'இந்திய குடலியல் எண்டோ சர்ஜன் சங்கத்தின் சிறப்புப் பங்காளர் சான்றிதழ்' }
      ],
      serviceTitle: 'பொது சேவைகள் மற்றும் பொறுப்புகள்',
      serviceItems: [
        { _key: 'srv-1', role: 'IMA சிவகாசி கிளை', detail: 'செயலாளர், 2016–2017' },
        { _key: 'srv-2', role: 'அரசு மருத்துவ சேவை', detail: '7 ஆண்டுகள் (2014–2021)' },
        { _key: 'srv-3', role: 'விருதுநகர் மாவட்டம்', detail: 'அனைத்து முதன்மை சுகாதார மையங்களிலும் சிறப்பான பணி' }
      ],
      awardTitle: 'Best Doctor Award • 2017 மற்றும் 2018',
      awardDescription: 'தொடர்ச்சியாக இரண்டு ஆண்டுகள் மாவட்ட ஆட்சியரால் வழங்கப்பட்ட சிறந்த மருத்துவர் விருது',
      opHoursLabel: 'OP consultation hours',
      opHours: '10:00 AM – 01:00 PM • 06:00 PM – 09:00 PM'
    },

    // 3. Visiting Consultants Header
    consultantsHeaderSection: {
      tag: 'Our Doctors',
      heading: 'Meet Our Consultants',
      subtitle: 'Find the right specialist for you.'
    },

    // 4. Consultation Guidelines
    guidelinesSection: {
      title: 'Visiting Specialist Consultation Guidelines • முன்பதிவு விவரங்கள்',
      subtitle: 'Please read before planning your hospital visit',
      guidelinesList: [
        {
          _key: 'g-1',
          title: '📌 Prior Appointment Recommended',
          description: 'Visiting consultants visit on specific days of the week and for scheduled surgeries. Patients are kindly requested to register their appointment in advance.'
        },
        {
          _key: 'g-2',
          title: '📞 Direct Helpline & Schedule Confirmation',
          description: 'Call our reception at +91 93455 10905 for the exact consultation timings for the current week.'
        },
        {
          _key: 'g-3',
          title: '🚨 24/7 Casualty & On-Call Emergency',
          description: 'Emergency surgical, trauma, and anaesthetic backup are accessible 24 hours a day with our dedicated medical duty officers.'
        }
      ]
    },

    // 5. Emergency Callout Bar
    calloutSection: {
      heading: 'Need Immediate Assistance or Surgery Consultation?',
      subtitle: 'Our hospital front desk is available 24/7 to connect you with our medical team and schedule priority appointments.',
      buttonText: 'Book an Appointment',
      phoneText: 'Call +91 93455 10905',
      phoneNumber: '919345510905'
    }
  };

  mutations.push({ createOrReplace: doctorsPageDoc });

  console.log(`Executing ${mutations.length} mutations...`);
  const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`;
  const mutateRes = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WRITE_TOKEN}`
    },
    body: JSON.stringify({ mutations })
  });

  const resJson = await mutateRes.json();
  if (resJson.error) throw new Error(JSON.stringify(resJson.error));
  console.log('🎉 Doctors page & all 14 individual doctors 100% synchronized in Sanity!');
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});

