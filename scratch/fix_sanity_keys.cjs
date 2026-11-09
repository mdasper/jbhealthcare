const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function mutate(mutations) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WRITE_TOKEN}`
    },
    body: JSON.stringify({ mutations })
  });
  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data;
}

async function fixKeys() {
  console.log('Fixing missing keys for Sanity array items...');

  // Update homePage with _key on each item in heroSliders and quickStats
  const homePatch = {
    patch: {
      id: 'homePage',
      set: {
        heroSliders: [
          {
            _key: 'hero-slide-1',
            title: 'Premier Centre for Advanced Laparoscopic Surgery',
            subtitle: 'Led by Dr. B. Saileshkumar (MBBS, MS, FIAGES, FALS), our surgical team delivers world-class minimally invasive keyhole procedures — minimal pain, zero ugly scars, and rapid same-day recovery.'
          },
          {
            _key: 'hero-slide-2',
            title: '24/7 Expert Emergency Care',
            subtitle: 'Emergencies don\'t wait, and neither do we. Our multi-disciplinary team of highly experienced doctors, surgeons, and nurses are available round the clock, ensuring rapid, expert response whenever you need us most.'
          },
          {
            _key: 'hero-slide-3',
            title: 'Specialists You Can Trust',
            subtitle: 'Our panel of distinguished visiting consultants and resident specialists brings together decades of expertise across Surgery, Medicine, Orthopaedics, ENT, and more — all under one roof for your convenience.'
          },
          {
            _key: 'hero-slide-4',
            title: 'Accurate Diagnostics. Swift Results.',
            subtitle: 'Our fully automated laboratory and advanced diagnostic centre delivers fast, precise results — from routine blood work to complex pathology — enabling our doctors to make the right decisions for your health, faster.'
          }
        ],
        quickStats: [
          { _key: 'stat-1', number: '10,000+', label: 'Successful Surgeries', subtext: 'Decade of surgical excellence' },
          { _key: 'stat-2', number: '12+', label: 'Visiting Super-Specialists', subtext: 'Premier multi-disciplinary panel' },
          { _key: 'stat-3', number: '24/7', label: 'Emergency & OT Ready', subtext: 'Round-the-clock rapid trauma care' },
          { _key: 'stat-4', number: '98.6%', label: 'Patient Satisfaction', subtext: 'Trusted by families across Sivakasi' }
        ]
      }
    }
  };

  // Update aboutPage with _key on awards array
  const aboutPatch = {
    patch: {
      id: 'aboutPage',
      set: {
        awards: [
          {
            _key: 'award-1',
            title: 'Best Doctor Award (2017 & 2018)',
            year: '2017-2018',
            conferredBy: 'District Collector, Virudhunagar District',
            description: 'Conferred for outstanding public health service, exemplary surgical care, and relentless rural health outreach.'
          },
          {
            _key: 'award-2',
            title: 'Secretary of Indian Medical Association (IMA)',
            year: '2016-2017',
            conferredBy: 'IMA Sivakasi Branch',
            description: 'Led community healthcare initiatives, CME programs, and public health awareness drives.'
          }
        ]
      }
    }
  };

  await mutate([homePatch, aboutPatch]);
  console.log('✅ Successfully added _key to all items in homePage and aboutPage!');
}

fixKeys().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
