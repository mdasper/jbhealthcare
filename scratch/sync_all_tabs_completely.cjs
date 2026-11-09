const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function uploadImageToSanity(filePath, filename, mime = 'image/jpeg') {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}, skipping upload.`);
    return null;
  }
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

async function mutate(mutations) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WRITE_TOKEN}`
    },
    body: JSON.stringify({ mutations })
  });
  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data;
}

async function run() {
  console.log('--- Starting Complete 10-Tab Synchronization into Sanity ---');

  // 1. Upload Facility Photos
  console.log('Uploading Facility Photos...');
  const facPhotos = {
    otTeam: await uploadImageToSanity('public/hospital_photos/dr_sailesh_ot_team.jpg', 'dr_sailesh_ot_team.jpg'),
    lab: await uploadImageToSanity('public/hospital_photos/hospital_lab_technician.jpg', 'hospital_lab_technician.jpg'),
    team: await uploadImageToSanity('public/hospital_photos/jb_hospital_full_team.jpg', 'jb_hospital_full_team.jpg'),
    ipWard: await uploadImageToSanity('public/hospital_photos/ip_ward_room.jpg', 'ip_ward_room.jpg'),
    opLounge: await uploadImageToSanity('public/hospital_photos/op_lounge.jpg', 'op_lounge.jpg'),
    brightOt: await uploadImageToSanity('public/hospital_photos/operation_theatre_bright.jpg', 'operation_theatre_bright.jpg'),
    pharmacy: await uploadImageToSanity('public/hospital_photos/hospital_pharmacy_counter.jpg', 'hospital_pharmacy_counter.jpg')
  };

  // 2. Upload Event Photos
  console.log('Uploading Event Photos...');
  const eventPhotos = {
    eye: await uploadImageToSanity('public/events/camp_eye_screening.jpg', 'camp_eye_screening.jpg'),
    blood: await uploadImageToSanity('public/events/camp_blood_donation.jpg', 'camp_blood_donation.jpg'),
    cardiac: await uploadImageToSanity('public/events/camp_cardiac_diabetes.jpg', 'camp_cardiac_diabetes.jpg'),
    mega: await uploadImageToSanity('public/events/camp_health_mega.jpg', 'camp_health_mega.jpg'),
    lap: await uploadImageToSanity('public/events/camp_laparoscopic_consult.jpg', 'camp_laparoscopic_consult.jpg'),
    pediatric: await uploadImageToSanity('public/events/event_pediatric_drive.jpg', 'event_pediatric_drive.jpg')
  };

  // 3. Upload Logo
  console.log('Uploading Logo...');
  const logoAssetId = await uploadImageToSanity('public/logo.jpg', 'logo.jpg');

  // 4. Surgeries (All 6 exact surgeries from Surgeries.jsx)
  const surgeries = [
    {
      _id: 'surg-hysterectomy',
      _type: 'surgery',
      englishTitle: 'Laparoscopic Hysterectomy',
      tamilTitle: 'கருப்பை நீக்கம்',
      subtitle: 'Uterus Removal Surgery',
      description: 'Minimally invasive keyhole removal of the uterus with minimal blood loss, no visible scarring, and faster return to routine life.',
      features: ['Quick Recovery', 'Minimal Scarring', 'Painless Technique', 'Same/Next Day Discharge'],
      order: 1
    },
    {
      _id: 'surg-appendectomy',
      _type: 'surgery',
      englishTitle: 'Laparoscopic Appendectomy',
      tamilTitle: 'குடல்வால்',
      subtitle: 'Appendix Removal Surgery',
      description: 'Precision keyhole removal for acute and chronic appendicitis, preventing rupture and ensuring immediate pain relief.',
      features: ['24/7 Emergency Care', 'Same-day/Next-day Discharge', 'Infection Free', 'Tiny Incisions'],
      order: 2
    },
    {
      _id: 'surg-cholecystectomy',
      _type: 'surgery',
      englishTitle: 'Laparoscopic Cholecystectomy',
      tamilTitle: 'பித்தப்பை',
      subtitle: 'Gall Bladder & Gallstone Surgery',
      description: 'Gold-standard laparoscopic procedure to safely remove gallstones and diseased gallbladder with supreme microscopic precision.',
      features: ['Gold Standard', 'No Large Incisions', 'Rapid Healing', 'Minimal Soreness'],
      order: 3
    },
    {
      _id: 'surg-hernia',
      _type: 'surgery',
      englishTitle: 'Laparoscopic Hernia Repair',
      tamilTitle: 'குடல் இறக்கம்',
      subtitle: 'Hernia Mesh Surgery',
      description: 'Minimally invasive keyhole mesh repair for inguinal, umbilical, and ventral hernias ensuring durable strength and low recurrence.',
      features: ['Advanced Mesh Fixation', 'Minimal Soreness', 'Early Mobility', 'Long-lasting Durability'],
      order: 4
    },
    {
      _id: 'surg-ovarian-cyst',
      _type: 'surgery',
      englishTitle: 'Laparoscopic Ovarian Cystectomy',
      tamilTitle: 'நீர்க்கட்டி',
      subtitle: 'Ovarian Cyst Removal Surgery',
      description: 'Delicate laparoscopic removal of ovarian cysts while protecting the ovary and preserving natural fertility.',
      features: ['Fertility Preservation', 'Microsurgical Care', 'Quick Discharge', 'Minimal Discomfort'],
      order: 5
    },
    {
      _id: 'surg-sterilization',
      _type: 'surgery',
      englishTitle: 'Laparoscopic Sterilization',
      tamilTitle: 'குடும்பக் கட்டுப்பாடு',
      subtitle: 'Keyhole Family Planning Procedure',
      description: 'Government-approved, safe, rapid, and painless permanent family planning procedure performed through a minute keyhole incision.',
      features: ['Govt. Recognized Center (அரசு அங்கீகாரம் பெற்றது)', 'Scarless Procedure', 'Same-day Discharge', 'High Safety Standard'],
      order: 6
    }
  ];

  // 5. Facilities (All 6 exact facilities with photos and IP/OP Ward Gallery)
  const facilities = [
    {
      _id: 'fac-1',
      _type: 'facility',
      title: '24/7 Emergency & Surgical Care Unit',
      subtitle: 'Immediate Trauma Care & OT Response',
      description: 'Round-the-clock emergency casualty, trauma care, and fully equipped surgical theatres ready for immediate surgical interventions at any time of day or night.',
      icon: 'ShieldPlus',
      image: { _type: 'image', asset: { _type: 'reference', _ref: facPhotos.otTeam } },
      order: 1
    },
    {
      _id: 'fac-2',
      _type: 'facility',
      title: 'Rapid Blood Diagnostics & ECG',
      subtitle: 'Automated In-House Laboratory',
      description: 'Fast-track computerized laboratory delivering quick blood test results, biochemistry, and 3-lead digital ECG to initiate accurate medical treatment without delay.',
      icon: 'Microscope',
      image: { _type: 'image', asset: { _type: 'reference', _ref: facPhotos.lab } },
      order: 2
    },
    {
      _id: 'fac-3',
      _type: 'facility',
      title: 'Visiting Specialists Consultation',
      subtitle: 'Leading Superspecialist Doctors',
      description: 'Regular outpatient visits, second opinions, and multi-disciplinary treatment planning by top consulting specialists from major medical centers.',
      icon: 'Stethoscope',
      image: { _type: 'image', asset: { _type: 'reference', _ref: facPhotos.team } },
      order: 3
    },
    {
      _id: 'fac-4',
      _type: 'facility',
      title: 'Inpatient (IP) & Outpatient (OP) Wards',
      subtitle: 'Spacious & Clean Patient Rooms',
      description: 'Hygienic, comfortable inpatient recovery rooms, patient monitoring suites, and a patient-friendly outpatient consultation wing with full amenities.',
      icon: 'HeartPulse',
      image: { _type: 'image', asset: { _type: 'reference', _ref: facPhotos.ipWard } },
      gallery: [
        {
          _key: 'gal-ip',
          label: 'Inpatient (IP) Ward',
          image: { _type: 'image', asset: { _type: 'reference', _ref: facPhotos.ipWard } }
        },
        {
          _key: 'gal-op',
          label: 'Outpatient (OP) Lounge',
          image: { _type: 'image', asset: { _type: 'reference', _ref: facPhotos.opLounge } }
        }
      ],
      order: 4
    },
    {
      _id: 'fac-5',
      _type: 'facility',
      title: 'Advanced Well-Equipped Operation Theatre',
      subtitle: 'Sterile Modern Surgical Suites',
      description: 'Fully equipped modern surgical theatre custom-fitted with high-definition laparoscopic towers, advanced electrocautery, and comprehensive patient monitoring for laparoscopic, general, and emergency procedures.',
      icon: 'Activity',
      image: { _type: 'image', asset: { _type: 'reference', _ref: facPhotos.brightOt } },
      order: 5
    },
    {
      _id: 'fac-6',
      _type: 'facility',
      title: '24/7 In-House Pharmacy',
      subtitle: 'Essential & Emergency Medicines',
      description: 'Fully stocked pharmacy on hospital premises ensuring round-the-clock availability of critical emergency drugs, surgical supplies, and patient prescriptions.',
      icon: 'Pill',
      image: { _type: 'image', asset: { _type: 'reference', _ref: facPhotos.pharmacy } },
      order: 6
    }
  ];

  // 6. Events & Camps (All 6 exact events with photos)
  const events = [
    {
      _id: 'event-pongal',
      _type: 'event',
      title: 'Pongal celebration',
      subtitle: 'ஜேபி மருத்துவமனை பொங்கல் திருநாள் கொண்டாட்டம்',
      category: 'completed',
      date: '2026-01-14',
      time: '10:00 AM – 02:00 PM',
      location: 'JB Healthcare Campus, Sivakasi',
      badge: 'Hospital Festival',
      description: 'Traditional Pongal celebrations with the hospital medical staff, doctors, and leadership. Joyous traditional festivities, games, and blessings for community well-being.',
      highlights: ['Staff & Doctors Gathering', 'Traditional Festivities', 'Hospital Cultural Celebration'],
      image: { _type: 'image', asset: { _type: 'reference', _ref: eventPhotos.mega } },
      order: 1
    },
    {
      _id: 'event-expo',
      _type: 'event',
      title: 'Expo camp',
      subtitle: 'தொழில் & வணிக கண்காட்சி சிறப்பு மருத்துவ முகாம்',
      category: 'camps',
      date: '2025-11-18',
      time: '09:00 AM – 05:00 PM',
      location: 'Sivakasi Trade & Industrial Exhibition Ground',
      badge: 'Mega Expo Camp',
      description: 'Special corporate and public health pavilion conducted during the Industrial Expo, offering comprehensive health checkups, blood sugar & BP testing, and specialist doctor reviews.',
      highlights: ['Industrial Workforce Checkup', 'Free BP & Sugar Testing', 'Specialist Doctor Advice'],
      image: { _type: 'image', asset: { _type: 'reference', _ref: eventPhotos.cardiac } },
      order: 2
    },
    {
      _id: 'event-vskd',
      _type: 'event',
      title: 'VSKD SCHOOL CAMP',
      subtitle: 'வி.எஸ்.கே.டி பள்ளி மாணவர்களுக்கான இலவச மருத்துவ முகாம்',
      category: 'camps',
      date: '2025-10-12',
      time: '09:30 AM – 02:30 PM',
      location: 'VSKD Matriculation Higher Secondary School, Sivakasi',
      badge: 'School Wellness',
      description: 'Dedicated student health screening camp covering pediatric physical examinations, ENT evaluation, vision health, and nutritional guidance for children.',
      highlights: ['Pediatric Screening', 'ENT & Dental Review', 'Student Health Cards'],
      image: { _type: 'image', asset: { _type: 'reference', _ref: eventPhotos.pediatric } },
      order: 3
    },
    {
      _id: 'event-lakshmiyapuram',
      _type: 'event',
      title: 'LAKSHMIYAPURAM CAMP',
      subtitle: 'லட்சுமியாபுரம் கிராமப்புற இலவச பொது மருத்துவ முகாம்',
      category: 'camps',
      date: '2025-08-24',
      time: '08:30 AM – 02:00 PM',
      location: 'Community Hall, Lakshmiyapuram',
      badge: 'Rural Outreach',
      description: 'Free multi-specialty outreach camp for rural families, featuring general health consultations, chronic disease management, and free basic medicine dispensing.',
      highlights: ['Rural Healthcare Access', 'Free Consultation', 'Free Medicine Distribution'],
      image: { _type: 'image', asset: { _type: 'reference', _ref: eventPhotos.blood } },
      order: 4
    },
    {
      _id: 'event-rsr',
      _type: 'event',
      title: 'RSR SCHOOL CAMP',
      subtitle: 'ஆர்.எஸ்.ஆர் பள்ளி மாணவ, மாணவிகளுக்கான நலவாழ்வு முகாம்',
      category: 'camps',
      date: '2025-07-15',
      time: '09:00 AM – 01:30 PM',
      location: 'RSR Higher Secondary School, Sivakasi',
      badge: 'Youth Health',
      description: 'Comprehensive adolescent and pediatric health checkup program. Focused on spinal posture, growth parameters, general clinical health, and adolescent emotional wellbeing.',
      highlights: ['Adolescent Screening', 'Posture & Ergonomics', 'Health Counselling'],
      image: { _type: 'image', asset: { _type: 'reference', _ref: eventPhotos.eye } },
      order: 5
    },
    {
      _id: 'event-thozhirpettai',
      _type: 'event',
      title: 'THOZHIRPETTAI CAMP',
      subtitle: 'தொழிற்பேட்டை தொழிலாளர்களுக்கான சிறப்பு மருத்துவ முகாம்',
      category: 'camps',
      date: '2025-06-20',
      time: '08:00 AM – 03:00 PM',
      location: 'Industrial Estate Community Center, Sivakasi',
      badge: 'Workers Health',
      description: 'Special occupational health screening for industrial workforce and surrounding community, focusing on ergonomics, pulmonary health, and preventive checkups.',
      highlights: ['Occupational Health Triage', 'Workers Health Screening', 'Doctor Consultations'],
      image: { _type: 'image', asset: { _type: 'reference', _ref: eventPhotos.lap } },
      order: 6
    }
  ];

  // 7. Site Settings
  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    hospitalName: 'JB Healthcare',
    tagline: 'Healing Hands, Caring Hearts',
    emergencyNumber: '+91 93455 10905',
    receptionNumber: '+91 93455 10905',
    whatsappNumber: '919345510905',
    email: 'jbhealthcare.sivakasi@gmail.com',
    address: '2/571A, Bharathi Nagar, Reserve line, Sivakasi, Tamil Nadu 626124',
    opdTimings: 'Daily OPD: 09:00 AM – 09:00 PM • 24/7 Casualty, Trauma & OT',
    googleMapsUrl: 'https://maps.app.goo.gl/jbhealthcare',
    logo: logoAssetId ? { _type: 'image', asset: { _type: 'reference', _ref: logoAssetId } } : undefined
  };

  const allDocs = [
    ...surgeries,
    ...facilities,
    ...events,
    siteSettings
  ];

  console.log(`Sending mutations for ${allDocs.length} updated documents...`);
  const chunkSize = 10;
  for (let i = 0; i < allDocs.length; i += chunkSize) {
    const chunk = allDocs.slice(i, i + chunkSize);
    const mutations = chunk.map(doc => ({ createOrReplace: doc }));
    console.log(`Uploading batch ${i / chunkSize + 1}...`);
    await mutate(mutations);
    console.log(`Batch ${i / chunkSize + 1} uploaded!`);
  }

  console.log('✅ ALL TABS FULLY SYNCHRONIZED AND UPDATED IN SANITY!');
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
