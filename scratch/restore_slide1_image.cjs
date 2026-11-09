const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function uploadImageToSanity(filePath, filename) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`;
  const buffer = fs.readFileSync(filePath);
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WRITE_TOKEN}`,
      'Content-Type': 'image/jpeg'
    },
    body: buffer
  });

  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data.document._id;
}

async function restoreImage() {
  console.log('Uploading hospital_building_exterior.jpg to Sanity...');
  const assetId = await uploadImageToSanity(
    'public/hospital_photos/hospital_building_exterior.jpg',
    'hospital_building_exterior.jpg'
  );
  console.log('Asset ID:', assetId);

  // We should patch both 'homePage' and 'drafts.homePage' if user is currently editing in draft mode
  const queryUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${encodeURIComponent('*[_id in ["homePage", "drafts.homePage"]]')}`;
  const queryRes = await fetch(queryUrl, {
    headers: { Authorization: `Bearer ${WRITE_TOKEN}` }
  });
  const queryData = await queryRes.json();
  const docs = queryData.result;

  const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`;
  const mutations = [];

  for (const doc of docs) {
    if (doc.heroSliders && doc.heroSliders.length > 0) {
      const updatedSliders = doc.heroSliders.map((s, idx) => {
        if (s._key === 'hero-slide-1' || s.title?.includes('Greatest Priority') || idx === 0) {
          return {
            ...s,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: assetId
              }
            }
          };
        }
        return s;
      });

      mutations.push({
        patch: {
          id: doc._id,
          set: {
            heroSliders: updatedSliders
          }
        }
      });
    }
  }

  if (mutations.length > 0) {
    const res = await fetch(mutateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${WRITE_TOKEN}`
      },
      body: JSON.stringify({ mutations })
    });
    const resData = await res.json();
    console.log('Mutated:', resData);
  }

  console.log('✅ Successfully restored the photo for "Your Health, Our Greatest Priority"!');
}

restoreImage().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});

