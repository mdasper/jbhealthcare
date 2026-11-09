const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function fetchAppointments() {
  const q = encodeURIComponent('*[_type == "appointment"] | order(createdAt desc)[0..2]');
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${q}`, {
    headers: { Authorization: `Bearer ${WRITE_TOKEN}` }
  });
  const data = await res.json();
  console.log('Latest Appointments in DB:');
  console.log(JSON.stringify(data.result, null, 2));
}

fetchAppointments().catch(console.error);
