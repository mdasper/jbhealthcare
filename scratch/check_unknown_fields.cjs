const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'qoi5yrg2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm'
});

async function check() {
  const doc = await client.fetch('*[_type == "aboutPage"]');
  console.log('Docs found:', doc.length);
  for (const d of doc) {
    console.log('Document ID:', d._id);
    console.log('Keys in document:', Object.keys(d));
    // Let's also check if there are drafts
  }

  const drafts = await client.fetch('*[_id in path("drafts.**")]');
  console.log('Drafts found count:', drafts.length);
  for (const dr of drafts) {
    if (dr._type === 'aboutPage') {
      console.log('Draft aboutPage ID:', dr._id);
      console.log('Draft keys:', Object.keys(dr));
    }
  }
}

check().catch(console.error);

