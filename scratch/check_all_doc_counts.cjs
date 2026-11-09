const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function checkAllDocTypes() {
  const query = encodeURIComponent('*[!(_id in path("_.**"))]{_type, _id, title, englishTitle}');
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${query}`, {
    headers: { Authorization: `Bearer ${WRITE_TOKEN}` }
  });
  const data = await res.json();
  const byType = {};
  data.result.forEach(d => {
    byType[d._type] = (byType[d._type] || 0) + 1;
  });
  console.log('Doc counts by type:', byType);
}

checkAllDocTypes().catch(console.error);

