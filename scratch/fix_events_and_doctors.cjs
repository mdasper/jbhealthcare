const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function fix() {
  console.log('--- 1. Syncing image & thumbnail on all 6 real events ---');
  const eventIds = ['event-pongal', 'event-expo', 'event-vskd', 'event-lakshmiyapuram', 'event-rsr', 'event-thozhirpettai'];
  
  for (const id of eventIds) {
    const q = encodeURIComponent(`*[_id == "${id}"][0]`);
    const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${q}`, {
      headers: { Authorization: `Bearer ${WRITE_TOKEN}` }
    });
    const { result } = await res.json();
    if (result && result.image) {
      const mutations = [{
        patch: {
          id: id,
          set: {
            image: result.image,
            thumbnail: result.image
          }
        }
      }];
      await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WRITE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mutations })
      });
      console.log(`Synced ${id}`);
    }
  }

  console.log('--- 2. Cleaning up 11 old duplicate doctor documents ---');
  const oldDoctorIds = [
    'doc-sailesh',
    'doc-deepan',
    'doc-arun-ac',
    'doc-sangeetha',
    'doc-onco',
    'doc-sankar',
    'doc-plastic',
    'doc-paediatric',
    'doc-sivaram',
    'doc-anaesthesia',
    'doc-psychology'
  ];

  const deleteMutations = oldDoctorIds.map(id => ({ delete: { id } }));
  const delRes = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WRITE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mutations: deleteMutations })
  });
  const delData = await delRes.json();
  console.log('Deleted old duplicate doctors:', delData);

  console.log('Done!');
}

fix().catch(console.error);

