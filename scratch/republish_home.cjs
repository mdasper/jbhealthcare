const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function checkAndRepublish() {
  const queryUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${encodeURIComponent('*[_id in ["homePage", "drafts.homePage"]]')}`;
  const queryRes = await fetch(queryUrl, {
    headers: { Authorization: `Bearer ${WRITE_TOKEN}` }
  });
  const queryData = await queryRes.json();
  console.log('Found docs:', queryData.result.map(d => d._id));

  const draft = queryData.result.find(d => d._id === 'drafts.homePage');
  const published = queryData.result.find(d => d._id === 'homePage');

  const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`;
  const mutations = [];

  if (draft) {
    console.log('Publishing draft to homePage...');
    const publishedDoc = { ...draft, _id: 'homePage' };
    delete publishedDoc._updatedAt;
    delete publishedDoc._createdAt;
    mutations.push({ createOrReplace: publishedDoc });
    // Also delete the draft document so it is cleanly marked published
    mutations.push({ delete: { id: 'drafts.homePage' } });
  } else if (!published) {
    console.log('No published homePage found, re-running upload_slider_images_to_sanity...');
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
    console.log('Mutation result:', resData);
  }

  console.log('✅ Home Page successfully republished and active in Sanity!');
}

checkAndRepublish().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

