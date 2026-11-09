const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

const schemaFieldNames = [
  'title',
  'subtitle',
  'category',
  'date',
  'time',
  'location',
  'badge',
  'description',
  'highlights',
  'thumbnail',
  'gallery',
  'order',
  'image'
];

async function checkUnknowns() {
  const query = encodeURIComponent('*[_type == "event"]');
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${query}`, {
    headers: { Authorization: `Bearer ${WRITE_TOKEN}` }
  });
  const data = await res.json();
  let unknownCount = 0;
  data.result.forEach(doc => {
    const systemFields = ['_id', '_type', '_createdAt', '_updatedAt', '_rev'];
    const docKeys = Object.keys(doc).filter(k => !systemFields.includes(k));
    const unknowns = docKeys.filter(k => !schemaFieldNames.includes(k));
    if (unknowns.length > 0) {
      console.log(`Document [${doc._id}] "${doc.title}" has unknown fields:`, unknowns);
      unknownCount++;
    }
  });
  if (unknownCount === 0) {
    console.log('✓ SUCCESS: Exactly 0 unknown fields across all event documents!');
  }
}

checkUnknowns().catch(console.error);
