const { createClient } = require('@sanity/client');

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

const writeClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2023-01-01',
  token: WRITE_TOKEN,
  useCdn: false
});

async function testClientCreate() {
  const doc = {
    _type: 'appointment',
    patientName: 'Live Sanity Test',
    phone: '9876543210',
    consultationType: 'In-Person',
    department: 'General Surgery',
    doctor: 'Dr. B. Saileshkumar',
    preferredDate: '2026-11-12',
    preferredTime: 'Regular OPD',
    message: 'Testing official client create',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  const res = await writeClient.create(doc);
  console.log('Created successfully:', res._id);
  // delete it immediately after test
  await writeClient.delete(res._id);
  console.log('Cleaned up test document.');
}

testClientCreate().catch(console.error);
