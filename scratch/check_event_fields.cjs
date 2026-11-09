const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function checkEventFields() {
  const query = encodeURIComponent('*[_type == "event"]');
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${query}`, {
    headers: { Authorization: `Bearer ${WRITE_TOKEN}` }
  });
  const data = await res.json();
  console.log('Total event docs:', data.result.length);
  data.result.forEach(doc => {
    console.log(`\nDoc ID: ${doc._id}, Title: ${doc.title}`);
    console.log('Field keys:', Object.keys(doc));
  });
}

checkEventFields().catch(console.error);
