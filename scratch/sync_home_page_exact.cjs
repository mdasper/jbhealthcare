const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function uploadImageToSanity(filePath, filename, mime = 'image/png') {
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

async function run() {
  console.log('Uploading Founder & Co-Founder photos to Sanity...');
  const doctorAssetId = await uploadImageToSanity('public/doctor.png', 'dr_sailesh_profile.png', 'image/png');
  console.log('Doctor photo uploaded:', doctorAssetId);

  const cofounderAssetId = await uploadImageToSanity('public/cofounder.png', 'suganya_sailesh.png', 'image/png');
  console.log('Cofounder photo uploaded:', cofounderAssetId);

  // Upload 5 slider photos if needed or retrieve from current homePage
  const queryUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${encodeURIComponent('*[_id == "homePage"][0].heroSliders')}`;
  const queryRes = await fetch(queryUrl, { headers: { Authorization: `Bearer ${WRITE_TOKEN}` } });
  const queryData = await queryRes.json();
  let existingSliders = queryData.result || [];

  if (existingSliders.length < 5) {
    console.log('Re-uploading 5 slider images...');
    const sliderFiles = [
      'public/hospital_photos/hospital_building_exterior.jpg',
      'public/hospital_photos/surgical_team_perspective.jpg',
      'public/hospital_photos/dr_sailesh_ot_team.jpg',
      'public/hospital_photos/dr_sailesh_xray_consultation.jpg',
      'public/hospital_photos/hospital_lab_technician.jpg'
    ];
    existingSliders = [];
    const sliderTitles = [
      {
        title: 'Your Health, Our Greatest Priority',
        subtitle: 'At JB Healthcare, we bring world-class medical excellence right to Sivakasi. From routine check-ups to complex procedures, we are dedicated to providing compassionate, holistic care that focuses on healing your body and mind in a warm, welcoming environment.'
      },
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
    ];

    for (let i = 0; i < sliderFiles.length; i++) {
      const f = sliderFiles[i];
      const aid = await uploadImageToSanity(f, path.basename(f), 'image/jpeg');
      existingSliders.push({
        _key: `hero-slide-${i + 1}`,
        title: sliderTitles[i].title,
        subtitle: sliderTitles[i].subtitle,
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: aid }
        }
      });
    }
  }

  // Construct complete homePage document
  const homeDoc = {
    _id: 'homePage',
    _type: 'homePage',

    // 1. Hero Sliders
    heroSliders: existingSliders,

    // 2. Why Choose Us (5 Features)
    whyChooseUs: [
      {
        _key: 'wcu-1',
        icon: 'Award',
        title: 'Certified Experts',
        description: 'Highly qualified doctors and medical staff.'
      },
      {
        _key: 'wcu-2',
        icon: 'Activity',
        title: 'Modern Technology',
        description: 'State-of-the-art facilities and equipment.'
      },
      {
        _key: 'wcu-3',
        icon: 'ShieldPlus',
        title: '24/7 Support',
        description: 'Round-the-clock emergency services.'
      },
      {
        _key: 'wcu-4',
        icon: 'Users',
        title: 'Patient-Centric Care',
        description: 'Personalized treatment plans and emotional support.'
      },
      {
        _key: 'wcu-5',
        icon: 'CheckCircle',
        title: 'Strict Hygiene',
        description: '100% adherence to international safety protocols.'
      }
    ],

    // 3. Founder & Chief Surgeon
    doctorSaileshProfile: {
      tag: 'Founder & Chief Surgeon',
      name: 'Dr. B. Saileshkumar',
      degree: 'MBBS., M.S., FIAGES., FALS (Laparoscopic & General Surgeon)',
      quote: '"Healing Hands, Caring Hearts — Healing is not just about prescribing medicines; it\'s about listening to our patients, understanding their pain, and guiding them towards a healthier, happier life."',
      stats: [
        { _key: 'stat-1', number: '10,000+', label: 'Successful Surgeries' },
        { _key: 'stat-2', number: '2,000+', label: 'Laparoscopic Surgeries' },
        { _key: 'stat-3', number: 'Best Doctor Award', label: '2017 & 2018 (Collector)' }
      ],
      credentialsHeading: 'Medical Journey & Credentials',
      bio: 'Alumnus of Madras Medical College (MBBS) & Madurai Medical College (MS). Advanced Laparoscopic training from VG Hospital Coimbatore, with prestigious FIAGES / FALS Fellowships. Over 7 years of dedicated government medical service across Virudhunagar district and Secretary of IMA Sivakasi (2016-2017).',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: doctorAssetId }
      }
    },

    // 4. Co-Founder & Managing Director
    suganyaProfile: {
      tag: 'Co-Founder & Managing Director',
      name: 'V. Suganya Sailesh',
      degree: 'B.Tech (IT) — Thiagarajar College of Engineering',
      quote: '"Fostering a welcoming, patient-focused environment where every individual and family feels respected, cared for, and truly supported."',
      pillars: [
        { _key: 'pil-1', title: 'B.Tech (IT)', subtitle: 'Thiagarajar College of Engg' },
        { _key: 'pil-2', title: 'Hospital Administration', subtitle: 'Leadership & Operations' },
        { _key: 'pil-3', title: 'Certified Life Coach', subtitle: 'Parenting & Wellbeing Mentor' }
      ],
      bioParagraphs: [
        'Suganya Sailesh is an engineering graduate with a strong professional background and extensive experience in the corporate sector. As Co-founder and Managing Director, she plays an active role in the leadership, administration, and ongoing development of the hospital.',
        'Her background in engineering and corporate work brings a structured, organized, and problem-solving approach to hospital management. She is also a Certified Parenting Coach and Certified Life Coach, with a strong interest in communication, wellbeing, and supportive relationships.',
        'Beyond her hospital responsibilities, she is committed to strengthening healthcare services and passionate about building supportive communities that encourage healthier lifestyles, personal growth, and mutual wellbeing.'
      ],
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: cofounderAssetId }
      }
    },

    // 5. Consultation CTA
    consultationCTA: {
      heading: 'Need a Medical Consultation?',
      subheading: 'Our specialists are ready to provide you with the best healthcare.',
      phone: '+91 93455 10905',
      buttonText: 'Book Appointment'
    }
  };

  const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`;
  const mutation = {
    createOrReplace: homeDoc
  };

  console.log('Saving complete homePage document to Sanity...');
  const res = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WRITE_TOKEN}`
    },
    body: JSON.stringify({ mutations: [mutation] })
  });

  const resData = await res.json();
  if (resData.error) throw new Error(JSON.stringify(resData.error));
  console.log('🎉 homePage completely updated with 100% exact website sections!');
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
