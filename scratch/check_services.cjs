const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'qoi5yrg2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm'
});

async function checkServices() {
  const services = await client.fetch('*[_type == "service"] | order(order asc)');
  console.log('Total services in Sanity:', services.length);
  for (const s of services) {
    console.log(`- [${s.order}] ${s.title} | Tamil: ${s.tamilTitle} | Doc: ${s.doctor}`);
  }
}

checkServices().catch(console.error);
