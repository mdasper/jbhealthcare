const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'qoi5yrg2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm'
});

async function check() {
  const published = await client.getDocument('aboutPage');
  console.log('=== Published aboutPage ===');
  console.log(JSON.stringify(published, null, 2));

  const draft = await client.getDocument('drafts.aboutPage');
  console.log('=== Draft aboutPage ===');
  console.log(JSON.stringify(draft, null, 2));
}

check().catch(console.error);

