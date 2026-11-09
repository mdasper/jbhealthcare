const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function checkOldEvents() {
  const query = encodeURIComponent('*[_id in ["event-1", "event-2", "event-3", "event-4", "event-5"]]');
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${query}`, {
    headers: { Authorization: `Bearer ${WRITE_TOKEN}` }
  });
  const data = await res.json();
  console.log(JSON.stringify(data.result, null, 2));
}

checkOldEvents().catch(console.error);
