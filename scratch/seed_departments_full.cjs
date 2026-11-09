const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function uploadImageToSanity(filePath, filename, mime = 'image/jpeg') {
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

async function run() {
  console.log('Uploading photo for Departments Health Package promo...');
  let promoAssetId = null;
  try {
    promoAssetId = await uploadImageToSanity('public/hospital_photos/dr_sailesh_xray_consultation.jpg', 'dr_sailesh_xray_consultation.jpg');
  } catch (e) {
    console.warn('Upload error:', e.message);
  }

  const doc = {
    _id: 'departmentsPage',
    _type: 'departmentsPage',

    // 1. Header & Overview
    heroHeading: 'Comprehensive Medical & Surgical Departments',
    heroSubtitle: 'Led by award-winning Chief Laparoscopic Surgeon Dr. B. Saileshkumar (10,000+ Surgeries) alongside a distinguished team of visiting super-specialists in surgical oncology, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics in Sivakasi.',
    badge: '★ அனைத்து சிறப்பு பிரிவுகள்',
    sectionTitle: 'Specialized Clinical Departments',
    sectionDescription: 'Explore our full range of 12 clinical and surgical disciplines equipped with state-of-the-art operative technology and verified specialists.',

    // 2. Health Packages Section (From Image 1)
    healthPackagesSection: {
      tag: 'PREVENTIVE HEALTH CHECKUP',
      heading: 'Comprehensive Master Health Packages',
      description: 'Prevention is always superior to cure. JB Healthcare offers customized health screening packages designed for all age groups to detect asymptomatic risks early and maintain enduring health.',
      packages: [
        {
          _key: 'pkg-1',
          title: 'Master Health Check-up',
          badge: 'Most Popular',
          badgeColor: '#F59E0B',
          items: [
            'Complete Blood Count (CBC)',
            'Blood Sugar (Fasting & PP)',
            'HbA1c (Diabetes Marker)',
            'Liver Function Test (LFT)',
            'Kidney Function Test (RFT)',
            'Lipid Profile (Cholesterol)',
            'Digital 3-Lead ECG',
            'Urine Routine Analysis',
            'Thyroid Profile (T3, T4, TSH)',
            'Physician Consultation'
          ]
        },
        {
          _key: 'pkg-2',
          title: 'Global Elite Test Package',
          badge: 'Comprehensive',
          badgeColor: '#00B4D8',
          items: [
            'All Master Health Check-up tests',
            'Vitamin D & Vitamin B12',
            'Iron Studies & Serum Ferritin',
            'PSA (Prostate – Men)',
            'CA-125 Tumour Marker (Women)',
            'Chest X-Ray (PA View)',
            'Ultrasound Abdomen & Pelvis',
            'Eye Pressure Check (IOP)',
            'Dental & Nutritional Consult',
            'Senior Specialist Consultation'
          ]
        }
      ],
      sideCard: {
        badge: 'Special Offer',
        title: 'Master Health Checkup',
        priceText: 'Packages starting from ₹999/- only',
        ...(promoAssetId ? {
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: promoAssetId }
          }
        } : {})
      }
    },

    // 3. Patient Journey (From Image 2)
    journeySection: {
      badge: '3 எளிய படிகள் • Seamless Patient Care',
      heading: 'Your Seamless Healthcare Journey',
      steps: [
        {
          _key: 'step-1',
          stepNumber: '1',
          title: '1. Book Appointment',
          description: 'Easily schedule your visit via WhatsApp or call us directly at +91 93455 10905. Say goodbye to long waiting queues.'
        },
        {
          _key: 'step-2',
          stepNumber: '2',
          title: '2. Specialist Consultation',
          description: 'Consult with Dr. B. Saileshkumar or our visiting super-specialists for a detailed, caring, and precise clinical evaluation.'
        },
        {
          _key: 'step-3',
          stepNumber: '3',
          title: '3. Rapid Recovery & Care',
          description: 'Experience minimally invasive keyhole procedures, zero scars, and prompt discharge with regular follow-ups for full recovery.'
        }
      ]
    },

    // 4. Emergency Callout Bar (From Image 3)
    calloutSection: {
      heading: 'Need Immediate Assistance or Surgery Consultation?',
      subtitle: 'Our hospital reception is available 24/7 to connect you with our surgical and medical team.',
      buttonText: 'Book an Appointment',
      phoneText: 'Call 04562-299920',
      phoneNumber: '04562299920'
    }
  };

  const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`;
  const res = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WRITE_TOKEN}`
    },
    body: JSON.stringify({ mutations: [{ createOrReplace: doc }] })
  });

  const resData = await res.json();
  if (resData.error) throw new Error(JSON.stringify(resData.error));
  console.log('🎉 departmentsPage completely seeded with all 3 image sections in Sanity!');
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});

