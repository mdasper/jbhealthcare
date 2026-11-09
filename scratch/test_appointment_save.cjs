const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function testAppointment() {
  const document = {
    _type: 'appointment',
    patientName: 'Test Patient (End User Trigger)',
    phone: '9876543210',
    consultationType: 'In-Person',
    department: 'General Surgery',
    doctor: 'Dr. B. Saileshkumar',
    preferredDate: '2026-11-12',
    preferredTime: 'Regular OPD',
    message: 'Testing instant DB storage trigger',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WRITE_TOKEN}`
    },
    body: JSON.stringify({ mutations: [{ create: document }] })
  });

  const data = await res.json();
  console.log('Result:', JSON.stringify(data, null, 2));
}

testAppointment().catch(console.error);
