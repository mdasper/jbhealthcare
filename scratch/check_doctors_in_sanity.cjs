const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'qoi5yrg2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm'
});

async function check() {
  const docs = await client.fetch('*[_type == "doctor"] | order(order asc)');
  console.log('Total doctors in Sanity:', docs.length);
  for (const d of docs) {
    console.log(`- [${d.order}] ${d.name} (${d.degree}) - ${d.department}`);
  }
}

check().catch(console.error);

