const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'qoi5yrg2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm'
});

// The exact website order (1 to 14)
const websiteOrder = [
  { match: 'laparoscopic', order: 1 },
  { match: 'general medicine', order: 2 },
  { match: 'anaesthes', order: 3 },
  { match: 'gastro', order: 4 },
  { match: 'plastic', order: 5 },
  { match: 'urology', order: 6 },
  { match: 'paediatric', order: 7 },
  { match: 'ortho', order: 8 },
  { match: 'ent', order: 9 },
  { match: 'obstetrics', order: 10 },
  { match: 'oncology', order: 11 },
  { match: 'psychology', order: 12 },
  { match: 'casualty', order: 13 },
  { match: 'diagnostics', order: 14 }
];

async function syncOrder() {
  const services = await client.fetch('*[_type == "service"]');
  console.log(`Found ${services.length} services in Sanity.`);

  for (const s of services) {
    const titleLower = (s.title || '').toLowerCase();
    let newOrder = 99;
    for (const item of websiteOrder) {
      if (titleLower.includes(item.match)) {
        newOrder = item.order;
        break;
      }
    }
    console.log(`Updating "${s.title}" (${s._id}) -> order: ${newOrder}`);
    await client.patch(s._id).set({ order: newOrder }).commit();
  }

  // Also check if any draft services exist
  const drafts = await client.fetch('*[_type == "service" && _id in path("drafts.**")]');
  for (const d of drafts) {
    const titleLower = (d.title || '').toLowerCase();
    let newOrder = 99;
    for (const item of websiteOrder) {
      if (titleLower.includes(item.match)) {
        newOrder = item.order;
        break;
      }
    }
    console.log(`Updating Draft "${d.title}" (${d._id}) -> order: ${newOrder}`);
    await client.patch(d._id).set({ order: newOrder }).commit();
  }

  console.log('✅ All services order updated successfully!');
}

syncOrder().catch(console.error);

