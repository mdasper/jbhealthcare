const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'qoi5yrg2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm'
});

async function run() {
  const queryFirst = await client.fetch('*[_type == "aboutPage"][0]');
  console.log('Query [0] _id:', queryFirst._id);

  const queryById = await client.fetch('*[_type == "aboutPage" && _id == "aboutPage"][0]');
  console.log('Query by ID _id:', queryById._id);

  const all = await client.fetch('*[_type == "aboutPage"]');
  console.log('All aboutPage docs:', all.map(d => ({ id: d._id, type: d._type })));
}

run().catch(console.error);

