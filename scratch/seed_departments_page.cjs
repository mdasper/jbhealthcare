const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'qoi5yrg2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm'
});

async function run() {
  const doc = {
    _id: 'departmentsPage',
    _type: 'departmentsPage',
    heroHeading: 'Comprehensive Medical & Surgical Departments',
    heroSubtitle: 'Led by award-winning Chief Laparoscopic Surgeon Dr. B. Saileshkumar (10,000+ Surgeries) alongside a distinguished team of visiting super-specialists in surgical oncology, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics in Sivakasi.',
    badge: '★ அனைத்து சிறப்பு பிரிவுகள்',
    sectionTitle: 'Specialized Clinical Departments',
    sectionDescription: 'Explore our full range of 12 clinical and surgical disciplines equipped with state-of-the-art operative technology and verified specialists.'
  };

  const res = await client.createOrReplace(doc);
  console.log('Created departmentsPage document successfully:', res._id);
}

run().catch(console.error);

