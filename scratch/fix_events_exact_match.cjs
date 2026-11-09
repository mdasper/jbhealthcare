const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function uploadImageToSanity(filePath, filename, mime = 'image/jpeg') {
  if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
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
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WRITE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mutations })
  });
  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data;
}

// 6 real website events exactly matching src/data/eventsData.js
const realEvents = [
  {
    _id: 'event-pongal',
    order: 1,
    category: 'completed',
    title: 'Pongal celebration',
    subtitle: 'ஜேபி மருத்துவமனை பொங்கல் திருநாள் கொண்டாட்டம்',
    date: '2026-01-14',
    time: '10:00 AM – 02:00 PM',
    location: 'JB Healthcare Campus, Sivakasi',
    badge: 'Hospital Festival',
    description: 'Traditional Pongal celebrations with the hospital medical staff, doctors, and leadership. Joyous traditional festivities, games, and blessings for community well-being.',
    highlights: [
      'Staff & Doctors Gathering',
      'Traditional Festivities',
      'Hospital Cultural Celebration'
    ],
    coverRelative: 'public/events/pongal_celebration/image_1.jpg',
    galleryRelatives: [
      'public/events/pongal_celebration/image_1.jpg',
      'public/events/pongal_celebration/image_2.jpg',
      'public/events/pongal_celebration/image_3.jpg',
      'public/events/pongal_celebration/image_4.jpg',
      'public/events/pongal_celebration/image_5.jpg'
    ]
  },
  {
    _id: 'event-expo',
    order: 2,
    category: 'camps',
    title: 'Expo camp',
    subtitle: 'தொழில் & வணிக கண்காட்சி சிறப்பு மருத்துவ முகாம்',
    date: '2025-11-18',
    time: '09:00 AM – 05:00 PM',
    location: 'Sivakasi Trade & Industrial Exhibition Ground',
    badge: 'Mega Expo Camp',
    description: 'Special corporate and public health pavilion conducted during the Industrial Expo, offering comprehensive health checkups, blood sugar & BP testing, and specialist doctor reviews.',
    highlights: [
      'Industrial Workforce Checkup',
      'Free BP & Sugar Testing',
      'Specialist Doctor Advice'
    ],
    coverRelative: 'public/events/expo_camp/image_6.jpg',
    galleryRelatives: [
      'public/events/expo_camp/image_1.jpg',
      'public/events/expo_camp/image_2.jpg',
      'public/events/expo_camp/image_3.jpg',
      'public/events/expo_camp/image_4.jpg',
      'public/events/expo_camp/image_5.jpg',
      'public/events/expo_camp/image_6.jpg',
      'public/events/expo_camp/image_7.jpg',
      'public/events/expo_camp/image_8.jpg',
      'public/events/expo_camp/image_9.jpg',
      'public/events/expo_camp/image_10.jpg',
      'public/events/expo_camp/image_11.jpg',
      'public/events/expo_camp/image_12.jpg',
      'public/events/expo_camp/image_13.jpg',
      'public/events/expo_camp/image_14.jpg'
    ]
  },
  {
    _id: 'event-vskd',
    order: 3,
    category: 'camps',
    title: 'VSKD SCHOOL CAMP',
    subtitle: 'வி.எஸ்.கே.டி பள்ளி மாணவர்களுக்கான இலவச மருத்துவ முகாம்',
    date: '2025-10-12',
    time: '09:30 AM – 02:30 PM',
    location: 'VSKD Matriculation Higher Secondary School, Sivakasi',
    badge: 'School Wellness',
    description: 'Dedicated student health screening camp covering pediatric physical examinations, ENT evaluation, vision health, and nutritional guidance for children.',
    highlights: [
      'Pediatric Screening',
      'ENT & Dental Review',
      'Student Health Cards'
    ],
    coverRelative: 'public/events/vskd_school_camp/image_6.jpg',
    galleryRelatives: [
      'public/events/vskd_school_camp/image_1.jpg',
      'public/events/vskd_school_camp/image_2.jpg',
      'public/events/vskd_school_camp/image_3.jpg',
      'public/events/vskd_school_camp/image_4.jpg',
      'public/events/vskd_school_camp/image_5.jpg',
      'public/events/vskd_school_camp/image_6.jpg',
      'public/events/vskd_school_camp/image_7.jpg',
      'public/events/vskd_school_camp/image_8.jpg',
      'public/events/vskd_school_camp/image_9.jpg'
    ]
  },
  {
    _id: 'event-lakshmiyapuram',
    order: 4,
    category: 'camps',
    title: 'LAKSHMIYAPURAM CAMP',
    subtitle: 'லட்சுமியாபுரம் கிராமப்புற இலவச பொது மருத்துவ முகாம்',
    date: '2025-08-24',
    time: '08:30 AM – 02:00 PM',
    location: 'Community Hall, Lakshmiyapuram',
    badge: 'Rural Outreach',
    description: 'Free multi-specialty outreach camp for rural families, featuring general health consultations, chronic disease management, and free basic medicine dispensing.',
    highlights: [
      'Rural Healthcare Access',
      'Free Consultation',
      'Free Medicine Distribution'
    ],
    coverRelative: 'public/events/lakshmiyapuram_camp/image_7.jpg',
    galleryRelatives: [
      'public/events/lakshmiyapuram_camp/image_1.jpg',
      'public/events/lakshmiyapuram_camp/image_2.jpg',
      'public/events/lakshmiyapuram_camp/image_3.jpg',
      'public/events/lakshmiyapuram_camp/image_4.jpg',
      'public/events/lakshmiyapuram_camp/image_5.jpg',
      'public/events/lakshmiyapuram_camp/image_6.jpg',
      'public/events/lakshmiyapuram_camp/image_7.jpg',
      'public/events/lakshmiyapuram_camp/image_8.jpg',
      'public/events/lakshmiyapuram_camp/image_9.jpg',
      'public/events/lakshmiyapuram_camp/image_10.jpg',
      'public/events/lakshmiyapuram_camp/image_11.jpg',
      'public/events/lakshmiyapuram_camp/image_12.jpg',
      'public/events/lakshmiyapuram_camp/image_13.jpg',
      'public/events/lakshmiyapuram_camp/image_14.jpg'
    ]
  },
  {
    _id: 'event-rsr',
    order: 5,
    category: 'camps',
    title: 'RSR SCHOOL CAMP',
    subtitle: 'ஆர்.எஸ்.ஆர் பள்ளி மாணவர் நல்வாழ்வு மருத்துவ முகாம்',
    date: '2025-07-16',
    time: '09:00 AM – 03:00 PM',
    location: 'RSR School Campus, Sivakasi',
    badge: 'Child Health',
    description: 'Annual comprehensive school medical checkup focusing on pediatric wellness, postural screening, vision assessment, and student growth tracking.',
    highlights: [
      'Growth & Posture Check',
      'Pediatric Specialist Advice',
      'Student Wellness Drive'
    ],
    coverRelative: 'public/events/rsr_school_camp/image_23.jpg',
    galleryRelatives: [
      'public/events/rsr_school_camp/image_1.jpg',
      'public/events/rsr_school_camp/image_2.jpg',
      'public/events/rsr_school_camp/image_3.jpg',
      'public/events/rsr_school_camp/image_4.jpg',
      'public/events/rsr_school_camp/image_5.jpg',
      'public/events/rsr_school_camp/image_6.jpg',
      'public/events/rsr_school_camp/image_7.jpg',
      'public/events/rsr_school_camp/image_8.jpg',
      'public/events/rsr_school_camp/image_9.jpg',
      'public/events/rsr_school_camp/image_10.jpg',
      'public/events/rsr_school_camp/image_23.jpg'
    ]
  },
  {
    _id: 'event-thozhirpettai',
    order: 6,
    category: 'camps',
    title: 'THOZHIRPETTAI CAMP',
    subtitle: 'தொழிற்பேட்டை தொழிலாளர்கள் & பொதுமக்கள் சிறப்பு மருத்துவ முகாம்',
    date: '2025-06-20',
    time: '08:00 AM – 03:00 PM',
    location: 'Industrial Estate Community Center, Sivakasi',
    badge: 'Workers Health',
    description: 'Special occupational health screening for industrial workforce and surrounding community, focusing on ergonomics, pulmonary health, and preventive checkups.',
    highlights: [
      'Occupational Health Triage',
      'Workers Health Screening',
      'Doctor Consultations'
    ],
    coverRelative: 'public/events/thozhirpettai_camp/image_1.jpg',
    galleryRelatives: [
      'public/events/thozhirpettai_camp/image_1.jpg',
      'public/events/thozhirpettai_camp/image_2.jpg',
      'public/events/thozhirpettai_camp/image_3.jpg',
      'public/events/thozhirpettai_camp/image_4.jpg',
      'public/events/thozhirpettai_camp/image_5.jpg',
      'public/events/thozhirpettai_camp/image_6.jpg'
    ]
  }
];

async function main() {
  console.log('--- 1. Deleting 5 Old Dummy Events (event-1 to event-5) ---');
  const dummyIds = ['event-1', 'event-2', 'event-3', 'event-4', 'event-5'];
  const deleteMutations = dummyIds.map(id => ({ delete: { id } }));
  await mutate(deleteMutations);
  console.log('✓ Successfully deleted 5 dummy events.');

  console.log('--- 2. Uploading Exact Real Event Photos & Syncing Documents ---');
  const baseDir = path.join(__dirname, '..');

  for (const item of realEvents) {
    console.log(`Processing ${item.title}...`);
    // 1. Upload Cover Image
    const coverPath = path.join(baseDir, item.coverRelative);
    const coverAssetId = await uploadImageToSanity(coverPath, path.basename(item.coverRelative));
    console.log(`  Uploaded cover: ${coverAssetId}`);

    // 2. Upload Gallery Images (first 5 to keep album neat and fast)
    const galleryAssetRefs = [];
    for (let i = 0; i < Math.min(item.galleryRelatives.length, 5); i++) {
      const gPath = path.join(baseDir, item.galleryRelatives[i]);
      const gAssetId = await uploadImageToSanity(gPath, path.basename(item.galleryRelatives[i]));
      if (gAssetId) {
        galleryAssetRefs.push({
          _key: `gal-${i + 1}`,
          _type: 'image',
          asset: { _type: 'reference', _ref: gAssetId }
        });
      }
    }
    console.log(`  Uploaded ${galleryAssetRefs.length} gallery photos.`);

    // 3. Upsert Event Document
    const eventDoc = {
      _id: item._id,
      _type: 'event',
      title: item.title,
      subtitle: item.subtitle,
      category: item.category,
      date: item.date,
      time: item.time,
      location: item.location,
      badge: item.badge,
      description: item.description,
      highlights: item.highlights,
      order: item.order,
      image: coverAssetId ? { _type: 'image', asset: { _type: 'reference', _ref: coverAssetId } } : undefined,
      thumbnail: coverAssetId ? { _type: 'image', asset: { _type: 'reference', _ref: coverAssetId } } : undefined,
      gallery: galleryAssetRefs
    };

    await mutate([{ createOrReplace: eventDoc }]);
    console.log(`✓ ${item.title} fully updated with exact photo and gallery!`);
  }

  console.log('\n--- 3. Verifying Final Events in Sanity ---');
  const q = encodeURIComponent('*[_type == "event"] | order(order asc){_id, title, category, order}');
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${q}`, {
    headers: { Authorization: `Bearer ${WRITE_TOKEN}` }
  });
  const { result } = await res.json();
  console.log('Final Events in Sanity (Total: ' + result.length + '):');
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
