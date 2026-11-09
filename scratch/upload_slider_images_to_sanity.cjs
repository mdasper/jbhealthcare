const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function uploadImageToSanity(filePath, filename) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`;
  const buffer = fs.readFileSync(filePath);
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WRITE_TOKEN}`,
      'Content-Type': 'image/jpeg'
    },
    body: buffer
  });

  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data.document._id;
}

async function uploadAll() {
  console.log('Uploading 5 slide images to Sanity Asset Store...');

  const slidesData = [
    {
      _key: 'hero-slide-1',
      title: 'Your Health, Our Greatest Priority',
      subtitle: 'At JB Healthcare, we bring world-class medical excellence right to Sivakasi. From routine check-ups to complex procedures, we are dedicated to providing compassionate, holistic care that focuses on healing your body and mind in a warm, welcoming environment.',
      file: 'public/hospital_photos/hospital_building_exterior.jpg'
    },
    {
      _key: 'hero-slide-2',
      title: 'Premier Centre for Advanced Laparoscopic Surgery',
      subtitle: 'Led by Dr. B. Saileshkumar (MBBS, MS, FIAGES, FALS), our surgical team delivers world-class minimally invasive keyhole procedures — minimal pain, zero ugly scars, and rapid same-day recovery.',
      file: 'public/hospital_photos/surgical_team_perspective.jpg'
    },
    {
      _key: 'hero-slide-3',
      title: '24/7 Expert Emergency Care',
      subtitle: 'Emergencies don\'t wait, and neither do we. Our multi-disciplinary team of highly experienced doctors, surgeons, and nurses are available round the clock, ensuring rapid, expert response whenever you need us most.',
      file: 'public/hospital_photos/dr_sailesh_ot_team.jpg'
    },
    {
      _key: 'hero-slide-4',
      title: 'Specialists You Can Trust',
      subtitle: 'Our panel of distinguished visiting consultants and resident specialists brings together decades of expertise across Surgery, Medicine, Orthopaedics, ENT, and more — all under one roof for your convenience.',
      file: 'public/hospital_photos/dr_sailesh_xray_consultation.jpg'
    },
    {
      _key: 'hero-slide-5',
      title: 'Accurate Diagnostics. Swift Results.',
      subtitle: 'Our fully automated laboratory and advanced diagnostic centre delivers fast, precise results — from routine blood work to complex pathology — enabling our doctors to make the right decisions for your health, faster.',
      file: 'public/hospital_photos/hospital_lab_technician.jpg'
    }
  ];

  const updatedSliders = [];

  for (const s of slidesData) {
    const filename = path.basename(s.file);
    console.log(`Uploading ${filename}...`);
    const assetId = await uploadImageToSanity(s.file, filename);
    console.log(`Uploaded ${filename} -> Asset ID: ${assetId}`);

    updatedSliders.push({
      _key: s._key,
      title: s.title,
      subtitle: s.subtitle,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId
        }
      }
    });
  }

  console.log('Patching homePage with real photo assets...');
  const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`;
  const mutation = {
    patch: {
      id: 'homePage',
      set: {
        heroSliders: updatedSliders
      }
    }
  };

  const res = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WRITE_TOKEN}`
    },
    body: JSON.stringify({ mutations: [mutation] })
  });

  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  console.log('🎉 Successfully linked all 5 real images inside Sanity Studio!');
}

uploadAll().catch(err => {
  console.error('Failed to upload images:', err);
  process.exit(1);
});

