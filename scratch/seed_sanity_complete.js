const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

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
  console.log('--- Starting Sanity Database Sync for Current Website ---');

  // 1. Doctors Data (13+ Doctors)
  const doctors = [
    {
      _id: 'doc-sailesh',
      _type: 'doctor',
      name: 'Dr. B. Saileshkumar',
      degree: 'MBBS, M.S., FIAGES, FALS',
      categoryHeader: 'CHIEF LAPAROSCOPIC & GENERAL SURGEON',
      department: 'Laparoscopic & General Surgery',
      category: 'Laparoscopic',
      schedule: 'Daily OPD & 24/7 OT',
      timing: '10:00 AM – 02:00 PM & 06:00 PM – 09:00 PM',
      availableDays: ['All', 'Daily', '24/7'],
      focusAreas: ['Advanced Keyhole Laparoscopy', 'Hernia, Appendix & Gallbladder', 'Trauma & Emergency Casualty', 'Diabetic Foot & General Surgery'],
      whatsappNumber: '919345510905',
      order: 1
    },
    {
      _id: 'doc-deepan',
      _type: 'doctor',
      name: 'Dr. Deepan Ramkumar',
      degree: 'MBBS, M.S. Ortho',
      categoryHeader: 'ORTHOPAEDIC & TRAUMA SURGERY',
      department: 'Orthopaedics & Trauma Surgery',
      category: 'Orthopaedics',
      schedule: 'On Surgery Days',
      timing: 'On-Call / Based on Cases',
      availableDays: ['All', 'OT Days'],
      focusAreas: ['Complex fracture fixation', 'Accident & trauma care', 'Joint arthritis management', 'Spine & sports injury care'],
      whatsappNumber: '919345510905',
      order: 2
    },
    {
      _id: 'doc-arun-ac',
      _type: 'doctor',
      name: 'Dr. A.C. Arun',
      degree: 'MBBS, M.D., D.M.',
      categoryHeader: 'MEDICAL GASTROENTEROLOGY & HEPATOLOGY',
      department: 'Medical Gastroenterology & Hepatology',
      category: 'Gastroenterology',
      schedule: 'Every Friday',
      timing: '09:00 PM (Night)',
      availableDays: ['All', 'Friday'],
      focusAreas: ['Diagnostic endoscopy', 'Liver disease & cirrhosis', 'GERD & peptic ulcer care', 'GI bleed management'],
      whatsappNumber: '919345510905',
      order: 3
    },
    {
      _id: 'doc-sangeetha',
      _type: 'doctor',
      name: 'Dr. Sangeetha',
      degree: 'MBBS, DGO',
      categoryHeader: 'OBSTETRICS & GYNAECOLOGY',
      department: 'Obstetrics & Gynaecology',
      category: 'Gynaecology',
      schedule: 'Wednesday & Saturday',
      timing: '10:00 AM – 01:00 PM',
      availableDays: ['All', 'Wednesday', 'Saturday'],
      focusAreas: ['Antenatal & high-risk pregnancy', 'PCOS & menstrual health', 'Normal & Caesarean delivery', 'Infertility workup'],
      whatsappNumber: '919345510905',
      order: 4
    },
    {
      _id: 'doc-onco',
      _type: 'doctor',
      name: 'Dr. Gurumoorthi & Dr. Manikandan',
      degree: 'MBBS, M.S., M.Ch.',
      categoryHeader: 'SURGICAL ONCOLOGY (CANCER SURGERY)',
      department: 'Surgical Oncology',
      category: 'Oncology',
      schedule: 'On Surgery Days',
      timing: 'Based on Cases',
      availableDays: ['All', 'OT Days'],
      focusAreas: ['Gastrointestinal cancer surgery', 'Breast & gynaecologic oncology', 'Head & neck tumor resection', 'Oncological staging'],
      whatsappNumber: '919345510905',
      order: 5
    },
    {
      _id: 'doc-sankar',
      _type: 'doctor',
      name: 'Dr. Sankar',
      degree: 'MBBS, M.S., M.Ch.',
      categoryHeader: 'UROLOGY & ANDROLOGY',
      department: 'Urology & Andrology',
      category: 'Urology',
      schedule: 'On Surgery Days',
      timing: 'Based on Cases',
      availableDays: ['All', 'OT Days'],
      focusAreas: ['Kidney stone laser surgery', 'Prostate enlargement (TURP)', 'Urinary tract infections', 'Male infertility & andrology'],
      whatsappNumber: '919345510905',
      order: 6
    },
    {
      _id: 'doc-plastic',
      _type: 'doctor',
      name: 'Dr. Arun Kumar (Plastic)',
      degree: 'MBBS, M.S., M.Ch.',
      categoryHeader: 'PLASTIC & RECONSTRUCTIVE SURGERY',
      department: 'Plastic & Reconstructive Surgery',
      category: 'Plastic Surgery',
      schedule: 'On Surgery Days',
      timing: 'Based on Cases',
      availableDays: ['All', 'OT Days'],
      focusAreas: ['Trauma tissue reconstruction', 'Cosmetic procedures & scar revision', 'Burn contracture correction', 'Diabetic wound reconstruction'],
      whatsappNumber: '919345510905',
      order: 7
    },
    {
      _id: 'doc-paediatric',
      _type: 'doctor',
      name: 'Dr. Arun Kumar (Paediatric)',
      degree: 'MBBS, M.S., M.Ch.',
      categoryHeader: 'PAEDIATRIC SURGERY',
      department: 'Paediatric Surgery',
      category: 'Paediatric Surgery',
      schedule: 'On Surgery Days',
      timing: 'Based on Cases',
      availableDays: ['All', 'OT Days'],
      focusAreas: ['Neonatal & infant surgery', 'Congenital malformation repair', 'Pediatric hernia & hydrocele', 'Pediatric keyhole procedures'],
      whatsappNumber: '919345510905',
      order: 8
    },
    {
      _id: 'doc-sivaram',
      _type: 'doctor',
      name: 'Dr. Sivaram',
      degree: 'MBBS, DNB (ENT)',
      categoryHeader: 'ENT (EAR, NOSE & THROAT)',
      department: 'ENT (Ear, Nose & Throat)',
      category: 'ENT',
      schedule: 'Weekly Consultations',
      timing: '10:00 AM – 01:00 PM',
      availableDays: ['All', 'Weekly'],
      focusAreas: ['Endoscopic sinus surgery', 'Tympanoplasty & ear disease', 'Tonsil & adenoid surgery', 'Vertigo & hearing assessments'],
      whatsappNumber: '919345510905',
      order: 9
    },
    {
      _id: 'doc-anaesthesia',
      _type: 'doctor',
      name: 'Dr. Kishore Ganesh, Dr. Jaganatha Prabhu, Dr. Karthikeyan',
      degree: 'MBBS, DA / MBBS, MD',
      categoryHeader: 'ANAESTHESIOLOGY & CRITICAL CARE',
      department: 'Anaesthesiology & Critical Care',
      category: 'Anaesthesiology',
      schedule: '24/7 OT & Casualty Coverage',
      timing: 'Round-the-clock',
      availableDays: ['All', '24/7'],
      focusAreas: ['Advanced surgical anaesthesia', 'Pain management & epidural analgesia', 'Critical care & post-op monitoring', 'Emergency trauma resuscitation'],
      whatsappNumber: '919345510905',
      order: 10
    },
    {
      _id: 'doc-psychology',
      _type: 'doctor',
      name: 'Sowdambika @ Reethika M',
      degree: 'M.Sc., M.Phil. (Clinical Psychology)',
      categoryHeader: 'CLINICAL PSYCHOLOGY & COUNSELLING',
      department: 'Clinical Psychology & Counselling',
      category: 'Psychology',
      schedule: 'Every Wednesday',
      timing: '10:00 AM – 12:00 PM',
      availableDays: ['All', 'Wednesday'],
      focusAreas: ['Cognitive behavioral therapy (CBT)', 'Stress, anxiety & depression', 'Child & adolescent behavioral issues', 'Family & marital counseling'],
      whatsappNumber: '919345510905',
      order: 11
    }
  ];

  // 2. Departments Data (14 Departments)
  const departments = [
    {
      _id: 'dept-1',
      _type: 'service',
      title: 'Laparoscopic & Keyhole Surgery',
      tamilTitle: 'நவீன லேப்ராஸ்கோபிக் & பொது அறுவை சிகிச்சை',
      category: 'Surgical Excellence',
      icon: 'Scissors',
      doctor: 'Dr. B. Saileshkumar',
      doctorRole: 'Founder & Chief Laparoscopic Surgeon',
      degree: 'MBBS, M.S., FIAGES, FALS',
      badge: '10,000+ Surgeries Performed',
      isFeaturedOnHome: true,
      description: 'Gold-standard minimally invasive keyhole procedures ensuring tiny incisions, zero ugly scarring, negligible post-op pain, and same-day or next-day discharge.',
      keyProcedures: ['Laparoscopic Appendix & Gallbladder Removal', 'Advanced Laparoscopic Hernia Mesh Repairs', 'Laparoscopic Uterus Removal (Hysterectomy)', 'Colorectal & Gastrointestinal Keyhole Procedures'],
      order: 1
    },
    {
      _id: 'dept-2',
      _type: 'service',
      title: 'Surgical Oncology (Cancer Surgery)',
      tamilTitle: 'புற்றுநோய் அறுவை சிகிச்சை துறை',
      category: 'Super-Specialties',
      icon: 'ShieldAlert',
      doctor: 'Dr. Gurumoorthi & Dr. Manikandan',
      doctorRole: 'Visiting Surgical Oncologists',
      degree: 'MBBS, M.S., M.Ch. (Surgical Oncology)',
      badge: 'On Surgery Days • Based on Cases',
      isFeaturedOnHome: true,
      description: 'Advanced surgical oncological care bringing tertiary-tier cancer resection, staging, and comprehensive oncological multidisciplinary surgical expertise directly to patients in Sivakasi.',
      keyProcedures: ['Tumor Resection & Clinical Staging', 'Gastrointestinal & Colorectal Cancer Surgery', 'Breast Cancer Surgery & Lumpectomy', 'Head, Neck & Oral Cavity Oncological Care'],
      order: 2
    },
    {
      _id: 'dept-3',
      _type: 'service',
      title: 'Medical & Surgical Gastroenterology',
      tamilTitle: 'குடல் மற்றும் கல்லீரல் சிறப்பு சிகிச்சை',
      category: 'Super-Specialties',
      icon: 'Activity',
      doctor: 'Dr. A.C. Arun',
      doctorRole: 'Visiting Medical Gastroenterologist',
      degree: 'MBBS, M.D., D.M. (Gastroenterology)',
      badge: 'Every Friday • 9:00 PM (Night)',
      isFeaturedOnHome: true,
      description: 'Specialized diagnosis and expert therapeutic management of complex digestive disorders, liver cirrhosis, chronic hepatitis, acid reflux, peptic ulcers, and bowel conditions.',
      keyProcedures: ['Diagnostic & Therapeutic Endoscopy', 'Liver Cirrhosis, Fatty Liver & Hepatitis Care', 'Severe Chronic Acid Reflux & Ulcer Therapies', 'Inflammatory Bowel Disease & Colon Health'],
      order: 3
    },
    {
      _id: 'dept-4',
      _type: 'service',
      title: 'Orthopaedics & Trauma Surgery',
      tamilTitle: 'எலும்பு முறிவு & விபத்து அறுவை சிகிச்சை',
      category: 'Surgical Excellence',
      icon: 'Activity',
      doctor: 'Dr. Deepan Ramkumar',
      doctorRole: 'Visiting Orthopaedic Surgeon',
      degree: 'MBBS, M.S. Ortho',
      badge: 'On Surgery Days • 24/7 Fracture Emergency',
      isFeaturedOnHome: true,
      description: 'Fast-track emergency fracture care, road accident trauma resuscitation, bone fixation with modern plates and nails, joint arthritis management, and spine pain rehabilitation.',
      keyProcedures: ['Emergency Fracture Fixation & Plating', 'Knee, Hip & Joint Degeneration Therapy', 'Chronic Low Back & Neck Spine Management', 'Tendon, Ligament & Sports Injury Care'],
      order: 4
    },
    {
      _id: 'dept-5',
      _type: 'service',
      title: 'Plastic, Cosmetic & Reconstructive Surgery',
      tamilTitle: 'ஒட்டுறுப்பு அறுவை சிகிச்சை துறை',
      category: 'Super-Specialties',
      icon: 'Sparkles',
      doctor: 'Dr. Arun Kumar',
      doctorRole: 'Visiting Plastic & Reconstructive Surgeon',
      degree: 'MBBS, M.S., M.Ch. (Plastic Surgery)',
      badge: 'On Surgery Days • Based on Cases',
      isFeaturedOnHome: false,
      description: 'Specialized aesthetic and functional reconstruction for acute traumatic wounds, burn contractures, post-cancer surgical defects, cosmetic reshaping, and diabetic limb preservation.',
      keyProcedures: ['Traumatic Wound & Flap Reconstructions', 'Scar Revisions & Aesthetic Contouring', 'Burn Injury Rehabilitation & Contractures', 'Diabetic Foot Tissue Salvage & Grafting'],
      order: 5
    },
    {
      _id: 'dept-6',
      _type: 'service',
      title: 'Urology & Andrology',
      tamilTitle: 'சிறுநீரக & ஆண் மலட்டுத்தன்மை சிகிச்சை',
      category: 'Super-Specialties',
      icon: 'Activity',
      doctor: 'Dr. Sankar',
      doctorRole: 'Visiting Urologist & Andrologist',
      degree: 'MBBS, M.S., M.Ch. (Urology)',
      badge: 'On Surgery Days • Based on Cases',
      isFeaturedOnHome: false,
      description: 'Advanced clinical and surgical management of kidney stones, enlarged prostate (BPH), urinary tract obstructions, male fertility issues, and bladder conditions.',
      keyProcedures: ['Laser Kidney Stone Fragmentation (URS/RIRS)', 'Transurethral Prostate Resection (TURP)', 'Urinary Incontinence & Stricture Therapies', 'Male Infertility Diagnostic & Operative Care'],
      order: 6
    },
    {
      _id: 'dept-7',
      _type: 'service',
      title: 'Paediatric Surgery',
      tamilTitle: 'குழந்தைகள் அறுவை சிகிச்சை துறை',
      category: 'Super-Specialties',
      icon: 'Baby',
      doctor: 'Dr. Arun Kumar',
      doctorRole: 'Visiting Paediatric Surgeon',
      degree: 'MBBS, M.S., M.Ch. (Paediatric Surgery)',
      badge: 'On Surgery Days • Based on Cases',
      isFeaturedOnHome: false,
      description: 'Specialized operative care tailored exclusively for newborns, infants, and growing children, ensuring gentle surgical handling, pediatric safety, and warm bedside care.',
      keyProcedures: ['Congenital Malformation Corrections', 'Paediatric Hernia, Hydrocele & Phimosis Care', 'Neonatal Surgical Emergencies & Anomalies', 'Pediatric Abdominal Keyhole Interventions'],
      order: 7
    },
    {
      _id: 'dept-8',
      _type: 'service',
      title: 'Obstetrics & Gynaecology',
      tamilTitle: 'மகப்பேறு & மகளிர் நலம்',
      category: 'Clinical & Emergency',
      icon: 'HeartPulse',
      doctor: 'Dr. Sangeetha',
      doctorRole: 'Consultant Gynaecologist & Surgeon',
      degree: 'MBBS, DGO',
      badge: 'Wednesday & Saturday • 10:00 AM – 1:00 PM',
      isFeaturedOnHome: false,
      description: 'Holistic women-centric wellness covering prenatal guidance, safe maternal care, PCOS treatments, cervical cancer prevention, and gentle gynaecological interventions.',
      keyProcedures: ['Antenatal, Natal & Postnatal Mother Care', 'PCOS, Hormonal & Irregular Cycle Therapy', 'Infertility Evaluations & Ultrasound Tracking', 'Cervical Health & Gynecological Keyhole Care'],
      order: 8
    },
    {
      _id: 'dept-9',
      _type: 'service',
      title: 'ENT (Ear, Nose & Throat)',
      tamilTitle: 'காது, மூக்கு, தொண்டை சிறப்பு சிகிச்சை',
      category: 'Clinical & Emergency',
      icon: 'Stethoscope',
      doctor: 'Dr. Sivaram',
      doctorRole: 'Consultant ENT Specialist',
      degree: 'MBBS, DNB (ENT)',
      badge: 'Weekly Consultations • Morning OPD',
      isFeaturedOnHome: false,
      description: 'Comprehensive diagnostic and surgical therapies for ear infections, persistent sinusitis, deviated nasal septum, tonsillitis, hearing impairment, and throat disorders.',
      keyProcedures: ['Functional Endoscopic Sinus Surgery (FESS)', 'Tympanoplasty & Chronic Otitis Media Care', 'Tonsillectomy & Adenoidectomy', 'Microscopic Ear Procedures & Audiometry'],
      order: 9
    },
    {
      _id: 'dept-10',
      _type: 'service',
      title: 'Anaesthesiology & Critical Care',
      tamilTitle: 'மயக்கவியல் & தீவிர நோயாளி கண்காணிப்பு',
      category: 'Clinical & Emergency',
      icon: 'ShieldPlus',
      doctor: 'Dr. Kishore Ganesh, Dr. Jaganatha Prabhu, Dr. Karthikeyan',
      doctorRole: 'Consultant Anaesthesiologists',
      degree: 'MBBS, DA / MBBS, MD',
      badge: '24/7 Surgical Support & Critical Care',
      isFeaturedOnHome: false,
      description: 'Continuous patient safety, multi-parameter vital monitoring, customized painless general & regional anaesthesia, and rapid critical-care resuscitation in operation theatres.',
      keyProcedures: ['General, Spinal & Epidural Anaesthesia', 'Post-Operative Acute Pain Protocols', 'Critical Care Airway & Hemodynamic Support', 'Emergency Resuscitation & Trauma Triage'],
      order: 10
    },
    {
      _id: 'dept-11',
      _type: 'service',
      title: 'Clinical Psychology & Counselling',
      tamilTitle: 'மனநலம் & உளவியல் ஆலோசனை பிரிவு',
      category: 'Clinical & Emergency',
      icon: 'Brain',
      doctor: 'Sowdambika @ Reethika M',
      doctorRole: 'Consultant Psychologist & Counsellor',
      degree: 'M.Sc., M.Phil. (Clinical Psychology)',
      badge: 'Every Wednesday • 10:00 AM – 12:00 PM',
      isFeaturedOnHome: false,
      description: 'Professional, confidential mental wellness support, cognitive behavioral therapy, stress management, adolescent counseling, and family emotional health guidance.',
      keyProcedures: ['Stress, Anxiety & Depressive Care Therapy', 'Adolescent & Child Behavioral Guidance', 'Marital & Family Conflict Counseling', 'Psychometric Assessments & Lifestyle Wellbeing'],
      order: 11
    },
    {
      _id: 'dept-12',
      _type: 'service',
      title: '24/7 Casualty & Trauma Center',
      tamilTitle: '24/7 அவசர சிகிச்சை & விபத்து மீட்பு பிரிவு',
      category: 'Clinical & Emergency',
      icon: 'ShieldPlus',
      doctor: 'Dr. B. Saileshkumar & Emergency Team',
      doctorRole: 'Chief Surgeon & 24/7 Trauma Team',
      degree: 'MBBS, M.S., FIAGES, FALS',
      badge: 'Open 24 Hours • Rapid Emergency Triage',
      isFeaturedOnHome: false,
      description: 'Uninterrupted round-the-clock emergency casualty staffed with emergency medical officers, trauma resuscitation bays, immediate surgical availability, and ambulance access.',
      keyProcedures: ['Accident & Severe Trauma Stabilization', 'Acute Abdominal & Surgical Emergencies', 'Immediate Wound Suturing & Burn Triage', 'Rapid Cardiac & Respiratory Resuscitation'],
      order: 12
    },
    {
      _id: 'dept-13',
      _type: 'service',
      title: 'In-House Diagnostics & Digital ECG',
      tamilTitle: 'தானியங்கி இரத்த பரிசோதனை கூடம் & ஈசிஜி',
      category: 'Diagnostics & Support',
      icon: 'Microscope',
      doctor: 'Diagnostic Laboratory Division',
      doctorRole: 'Diagnostic Laboratory Division',
      degree: 'Automated Diagnostic Suite',
      badge: 'Fast Results • Accurate Reporting',
      isFeaturedOnHome: false,
      description: 'High-precision automated clinical pathology, biochemistry analyzers, hematology counters, and high-resolution 3-lead digital electrocardiograms (ECG).',
      keyProcedures: ['Automated Complete Blood Counts (CBC)', 'Diabetes, Lipid & Kidney Function Panels', 'High-Precision 3-Lead Digital ECG', 'Pre-Operative Fitness Diagnostic Triage'],
      order: 13
    },
    {
      _id: 'dept-14',
      _type: 'service',
      title: 'General Medicine & Diabetology',
      tamilTitle: 'பொது மருத்துவம் & சர்க்கரை நோய் சிகிச்சை',
      category: 'Clinical & Emergency',
      icon: 'HeartPulse',
      doctor: 'Dr. B. Saileshkumar',
      doctorRole: 'Chief Physician & Surgeon',
      degree: 'MBBS, M.S., FIAGES, FALS',
      badge: 'Daily Consultations • Comprehensive Care',
      isFeaturedOnHome: false,
      description: 'Holistic clinical management of chronic lifestyle conditions including type-2 diabetes mellitus, hypertension, thyroid abnormalities, seasonal infections, and fever syndromes.',
      keyProcedures: ['Targeted Glycemic & Diabetes Regulation', 'Hypertension & Cardiovascular Monitoring', 'Acute Infectious Disease & Fever Care', 'Preventive Adult Health Screening'],
      order: 14
    }
  ];

  // 3. Laparoscopic Surgeries
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
    }
  ];

  // 4. Hospital Facilities (6 Facilities)
  const facilities = [
    {
      _id: 'fac-1',
      _type: 'facility',
      title: '24/7 Emergency & Surgical Care Unit',
      subtitle: 'Immediate Trauma Care & OT Response',
      description: 'Round-the-clock emergency casualty, trauma care, and fully equipped surgical theatres ready for immediate surgical interventions at any time of day or night.',
      icon: 'ShieldPlus',
      order: 1
    },
    {
      _id: 'fac-2',
      _type: 'facility',
      title: 'Rapid Blood Diagnostics & ECG',
      subtitle: 'Automated In-House Laboratory',
      description: 'Fast-track computerized laboratory delivering quick blood test results, biochemistry, and 3-lead digital ECG to initiate accurate medical treatment without delay.',
      icon: 'Microscope',
      order: 2
    },
    {
      _id: 'fac-3',
      _type: 'facility',
      title: 'Visiting Specialists Consultation',
      subtitle: 'Leading Superspecialist Doctors',
      description: 'Regular outpatient visits, second opinions, and multi-disciplinary treatment planning by top consulting specialists from major medical centers.',
      icon: 'Stethoscope',
      order: 3
    },
    {
      _id: 'fac-4',
      _type: 'facility',
      title: 'Inpatient (IP) & Outpatient (OP) Wards',
      subtitle: 'Spacious & Clean Patient Rooms',
      description: 'Hygienic, comfortable inpatient recovery rooms, patient monitoring suites, and a patient-friendly outpatient consultation wing with full amenities.',
      icon: 'HeartPulse',
      order: 4
    },
    {
      _id: 'fac-5',
      _type: 'facility',
      title: 'Advanced Well-Equipped Operation Theatre',
      subtitle: 'Sterile Modern Surgical Suites',
      description: 'Fully equipped modern surgical theatre custom-fitted with high-definition laparoscopic towers, advanced electrocautery, and comprehensive patient monitoring for laparoscopic, general, and emergency procedures.',
      icon: 'Activity',
      order: 5
    },
    {
      _id: 'fac-6',
      _type: 'facility',
      title: '24/7 In-House Pharmacy',
      subtitle: 'Essential & Emergency Medicines',
      description: 'Fully stocked pharmacy on hospital premises ensuring round-the-clock availability of critical emergency drugs, surgical supplies, and patient prescriptions.',
      icon: 'Pill',
      order: 6
    }
  ];

  // 5. Events & Medical Camps (All 6 Verified Camps & Events)
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
      order: 4
    },
    {
      _id: 'event-rsr',
      _type: 'event',
      title: 'RSR SCHOOL CAMP',
      subtitle: 'ஆர்.எஸ்.ஆர் பள்ளி மாணவர் நல்வாழ்வு மருத்துவ முகாம்',
      category: 'camps',
      date: '2025-07-16',
      time: '09:00 AM – 03:00 PM',
      location: 'RSR School Campus, Sivakasi',
      badge: 'Child Health',
      description: 'Annual comprehensive school medical checkup focusing on pediatric wellness, postural screening, vision assessment, and student growth tracking.',
      highlights: ['Growth & Posture Check', 'Pediatric Specialist Advice', 'Student Wellness Drive'],
      order: 5
    },
    {
      _id: 'event-thozhirpettai',
      _type: 'event',
      title: 'THOZHIRPETTAI CAMP',
      subtitle: 'தொழிற்பேட்டை தொழிலாளர்கள் & பொதுமக்கள் சிறப்பு மருத்துவ முகாம்',
      category: 'camps',
      date: '2025-06-20',
      time: '08:00 AM – 03:00 PM',
      location: 'Industrial Estate Community Center, Sivakasi',
      badge: 'Workers Health',
      description: 'Special occupational health screening for industrial workforce and surrounding community, focusing on ergonomics, pulmonary health, and preventive checkups.',
      highlights: ['Occupational Health Triage', 'Workers Health Screening', 'Doctor Consultations'],
      order: 6
    }
  ];

  // 6. Home Page Document
  const homeDoc = {
    _id: 'homePage',
    _type: 'homePage',
    heroSliders: [
      {
        title: 'Premier Centre for Advanced Laparoscopic Surgery',
        subtitle: 'Led by Dr. B. Saileshkumar (MBBS, MS, FIAGES, FALS), our surgical team delivers world-class minimally invasive keyhole procedures — minimal pain, zero ugly scars, and rapid same-day recovery.'
      },
      {
        title: '24/7 Expert Emergency Care',
        subtitle: 'Emergencies don\'t wait, and neither do we. Our multi-disciplinary team of highly experienced doctors, surgeons, and nurses are available round the clock, ensuring rapid, expert response whenever you need us most.'
      },
      {
        title: 'Specialists You Can Trust',
        subtitle: 'Our panel of distinguished visiting consultants and resident specialists brings together decades of expertise across Surgery, Medicine, Orthopaedics, ENT, and more — all under one roof for your convenience.'
      },
      {
        title: 'Accurate Diagnostics. Swift Results.',
        subtitle: 'Our fully automated laboratory and advanced diagnostic centre delivers fast, precise results — from routine blood work to complex pathology — enabling our doctors to make the right decisions for your health, faster.'
      }
    ],
    quickStats: [
      { number: '10,000+', label: 'Successful Surgeries', subtext: 'Decade of surgical excellence' },
      { number: '12+', label: 'Visiting Super-Specialists', subtext: 'Premier multi-disciplinary panel' },
      { number: '24/7', label: 'Emergency & OT Ready', subtext: 'Round-the-clock rapid trauma care' },
      { number: '98.6%', label: 'Patient Satisfaction', subtext: 'Trusted by families across Sivakasi' }
    ],
    doctorSaileshProfile: {
      name: 'Dr. B. Saileshkumar',
      role: 'Founder & Chief Laparoscopic Surgeon',
      degree: 'MBBS, M.S., FIAGES, FALS',
      experienceTag: '10,000+ Surgeries Performed • 15+ Years Clinical Experience',
      message: 'At JB Healthcare, our driving philosophy is rooted in combining surgical excellence with deep human empathy. Every surgical procedure is planned meticulously with minimally invasive techniques to ensure patients return to their families quickly and without unnecessary pain.'
    },
    suganyaProfile: {
      name: 'V. Suganya Sailesh',
      role: 'Co-founder & Managing Director',
      degree: 'Engineering Graduate & Healthcare Administrator',
      message: 'Suganya Sailesh is an engineering graduate with a strong professional background and extensive experience in the corporate sector. As Co-founder and Managing Director, she plays an active role in the leadership, administration, and ongoing development of the hospital.'
    },
    emergencyCareStrip: {
      heading: '24/7 Emergency Casualty & Rapid Trauma Response',
      subheading: 'Immediate attention by on-duty medical officers, surgical team, and critical care units.',
      phone: '+91 93455 10905'
    }
  };

  // 7. Site Settings Document
  const siteSettingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    hospitalName: 'JB Healthcare',
    tagline: 'Healing Hands, Caring Hearts',
    emergencyNumber: '+91 93455 10905',
    receptionNumber: '+91 93455 10905',
    whatsappNumber: '919345510905',
    email: 'jbhealthcare.sivakasi@gmail.com',
    address: '2/571A, Bharathi Nagar, Reserve line, Sivakasi, Tamil Nadu 626124',
    opdTimings: 'Daily OPD: 09:00 AM – 09:00 PM • 24/7 Casualty & OT',
    googleMapsUrl: 'https://maps.app.goo.gl/jbhealthcare'
  };

  // 8. About Page Document
  const aboutDoc = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    heroTitle: 'A Legacy of Clinical Excellence & Compassionate Healing',
    heroSubtitle: 'Founded with a vision to deliver world-class surgical precision and community-first medical care in Sivakasi.',
    legacyHeading: 'Our Story & Medical Journey',
    legacyText: 'JB Healthcare was established to bridge the gap between world-class surgical precision and compassionate healthcare in Sivakasi. Led by award-winning laparoscopic surgeon Dr. B. Saileshkumar, our medical center has touched thousands of lives with uncompromising quality and affordable treatment.',
    vision: 'To be the most trusted and advanced surgical and multi-speciality healthcare center in southern Tamil Nadu, renowned for excellence and empathy.',
    mission: 'Providing round-the-clock emergency medical response, advanced keyhole surgeries with zero compromise on safety, and continuous community health outreach.',
    awards: [
      {
        title: 'Best Doctor Award (2017 & 2018)',
        year: '2017-2018',
        conferredBy: 'District Collector, Virudhunagar District',
        description: 'Conferred for outstanding public health service, exemplary surgical care, and relentless rural health outreach.'
      },
      {
        title: 'Secretary of Indian Medical Association (IMA)',
        year: '2016-2017',
        conferredBy: 'IMA Sivakasi Branch',
        description: 'Led community healthcare initiatives, CME programs, and public health awareness drives.'
      }
    ]
  };

  // Compile all documents for createOrReplace mutations
  const allDocs = [
    ...doctors,
    ...departments,
    ...surgeries,
    ...facilities,
    ...events,
    homeDoc,
    siteSettingsDoc,
    aboutDoc
  ];

  console.log(`Preparing to seed ${allDocs.length} complete documents into Sanity...`);

  // Send mutations in chunks of 10
  const chunkSize = 10;
  for (let i = 0; i < allDocs.length; i += chunkSize) {
    const chunk = allDocs.slice(i, i + chunkSize);
    const mutations = chunk.map(doc => ({ createOrReplace: doc }));
    console.log(`Uploading batch ${i / chunkSize + 1} (${chunk.length} docs)...`);
    const res = await mutate(mutations);
    console.log(`Batch ${i / chunkSize + 1} uploaded successfully!`);
  }

  console.log('✅ ALL current website data successfully seeded into Sanity CMS!');
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});

