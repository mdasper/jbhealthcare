const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function uploadImageToSanity(filePath, filename, mime = 'image/jpeg') {
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
  console.log('Uploading images for About Us page...');
  const teamAssetId = await uploadImageToSanity('public/hospital_photos/jb_hospital_full_team.jpg', 'jb_hospital_full_team.jpg', 'image/jpeg');
  console.log('Team photo uploaded:', teamAssetId);

  const labAssetId = await uploadImageToSanity('public/hospital_photos/hospital_lab_technician.jpg', 'hospital_lab_technician.jpg', 'image/jpeg');
  console.log('Lab photo uploaded:', labAssetId);

  const doctorAssetId = await uploadImageToSanity('public/doctor.png', 'dr_sailesh_profile.png', 'image/png');
  console.log('Doctor photo uploaded:', doctorAssetId);

  const aboutDoc = {
    _id: 'aboutPage',
    _type: 'aboutPage',

    // 1. Header & Stats
    mainHeading: 'About JB Healthcare',
    subHeading: 'Committed to providing world-class medical facilities, innovative treatments, and compassionate care to our community. We believe in treating the whole person, not just the disease.',
    milestones: [
      { _key: 'ms-1', number: '10,000+', label: 'Successful Surgeries' },
      { _key: 'ms-2', number: '2,000+', label: 'Laparoscopic Cases' },
      { _key: 'ms-3', number: '3,000+', label: 'C-Section Deliveries' },
      { _key: 'ms-4', number: '100+', label: 'Cancer Surgeries' },
      { _key: 'ms-5', number: '7 Yrs', label: 'Govt Service Record' }
    ],

    // 2. Founder Spotlight
    founderSpotlight: {
      badge: 'Leadership & Clinical Vision',
      name: 'Dr. B. Saileshkumar',
      degree: 'MBBS., M.S., FIAGES., FALS — Founder & Chief Surgeon',
      awardTag: '★ Best Doctor Award (2017 & 2018)',
      bio: 'A native clinical leader with an extraordinary track record of more than 10,000 successful surgical operations and 2,000+ advanced laparoscopic procedures.',
      infoCards: [
        {
          _key: 'info-1',
          title: 'Education & Fellowships',
          description: 'MBBS (Madras Medical College), MS (Madurai Medical College), Laparoscopic Surgery Training (VG Hospital Coimbatore), FIAGES & FALS Fellowships.'
        },
        {
          _key: 'info-2',
          title: 'Public Service & Honor',
          description: 'Conferred the Best Doctor Award for two consecutive years (2017 & 2018) by the District Collector. Secretary of IMA Sivakasi (2016-2017) and 7 years of public health service across Virudhunagar district.'
        }
      ],
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: doctorAssetId }
      }
    },

    // 3. Legacy Section
    legacySection: {
      heading: 'Our Legacy of Care',
      historyText: 'Established with a bold vision to make premium, international-standard healthcare accessible to everyone, JB Healthcare has grown into a trusted name in Sivakasi, Tamil Nadu. Over the years, we have built a reputation based on trust, clinical excellence, and deep-rooted empathy.',
      infrastructureText: 'Our state-of-the-art infrastructure was designed from the ground up keeping patient comfort and advanced medical requirements in mind. We believe that healing is a holistic process, which is why our facilities look and feel welcoming rather than clinical.',
      floatingTitle: 'Healing Hands, Caring Hearts',
      floatingSubtitle: 'Every patient is treated with deep empathy like family',
      aboutImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: teamAssetId }
      },
      features: [
        {
          _key: 'feat-1',
          title: '24/7 Dedicated Emergency Care',
          description: 'Always ready with emergency surgical casualty & on-call surgeons'
        },
        {
          _key: 'feat-2',
          title: 'Award-Winning Specialists',
          description: 'Expert laparoscopic surgeons & multi-speciality consultants'
        },
        {
          _key: 'feat-3',
          title: 'Rapid Diagnostics & ECG',
          description: 'In-house automated lab results and digital ECG monitoring'
        },
        {
          _key: 'feat-4',
          title: 'Hygienic IP & OP Wards',
          description: 'Spacious inpatient recovery suites & tranquil outpatient rooms'
        }
      ]
    },

    // 4. Vision & Mission
    vision: 'To be the most trusted and respected healthcare partner in the region, recognized globally for our clinical excellence, compassionate care, and unwavering commitment to community wellness and health education.',
    mission: 'We strive to deliver comprehensive, high-quality, and affordable healthcare services under one roof. Our mission is to continuously upgrade our medical technology, empower our staff through regular training, and provide a healing environment that consistently exceeds patient expectations.',

    // 5. In-House Diagnostic Lab
    labSection: {
      heading: 'In-House Diagnostic Center',
      subheading: 'Automated Pathology, Biochemistry & 3-Lead Digital ECG',
      description: "At JB Healthcare, we know that waiting for test results can be stressful for you and your family. That's why we've set up our own fully equipped diagnostic center right here inside our hospital.",
      reliabilityText: 'Whether it\'s a routine preventive health check-up or an urgent surgical casualty evaluation in the middle of the night, our certified laboratory technicians and modern analyzers ensure zero delay and complete clinical reliability.',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: labAssetId }
      }
    }
  };

  const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`;
  const mutation = {
    createOrReplace: aboutDoc
  };

  console.log('Writing 100% exact About Us document to Sanity...');
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
  console.log('🎉 aboutPage completely updated with 100% exact website sections!');
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});

