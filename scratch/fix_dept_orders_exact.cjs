const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'qoi5yrg2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm'
});

const exactMapping = {
  'dept-1': { order: 1, title: 'Laparoscopic & Keyhole Surgery' },
  'dept-14': { order: 2, title: 'General Medicine & Diabetology' },
  'dept-10': { order: 3, title: 'Anaesthesiology & Critical Care' },
  'dept-3': { order: 4, title: 'Medical & Surgical Gastroenterology' },
  'dept-5': { order: 5, title: 'Plastic, Cosmetic & Reconstructive Surgery' },
  'dept-6': { order: 6, title: 'Urology & Andrology' },
  'dept-7': { order: 7, title: 'Paediatric Surgery' },
  'dept-4': { order: 8, title: 'Orthopaedics & Trauma Surgery' },
  'dept-9': { order: 9, title: 'ENT (Ear, Nose & Throat)' },
  'dept-8': { order: 10, title: 'Obstetrics & Gynaecology' },
  'dept-2': { order: 11, title: 'Surgical Oncology (Cancer Surgery)' },
  'dept-11': { order: 12, title: 'Clinical Psychology & Counselling' },
  'dept-12': { order: 13, title: '24/7 Casualty & Trauma Center' },
  'dept-13': { order: 14, title: 'In-House Diagnostics & Digital ECG' }
};

async function fixExact() {
  for (const [id, info] of Object.entries(exactMapping)) {
    console.log(`Setting ${id} (${info.title}) -> order: ${info.order}`);
    await client.patch(id).set({ order: info.order }).commit();
  }
  console.log('✅ Exact 1-14 order set on all 14 departments!');
}

fixExact().catch(console.error);
