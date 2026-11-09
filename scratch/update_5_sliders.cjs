const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function updateAll5Sliders() {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`;
  
  const all5Sliders = [
    {
      _key: 'hero-slide-1',
      title: 'Your Health, Our Greatest Priority',
      subtitle: 'At JB Healthcare, we bring world-class medical excellence right to Sivakasi. From routine check-ups to complex procedures, we are dedicated to providing compassionate, holistic care that focuses on healing your body and mind in a warm, welcoming environment.'
    },
    {
      _key: 'hero-slide-2',
      title: 'Premier Centre for Advanced Laparoscopic Surgery',
      subtitle: 'Led by Dr. B. Saileshkumar (MBBS, MS, FIAGES, FALS), our surgical team delivers world-class minimally invasive keyhole procedures — minimal pain, zero ugly scars, and rapid same-day recovery.'
    },
    {
      _key: 'hero-slide-3',
      title: '24/7 Expert Emergency Care',
      subtitle: 'Emergencies don\'t wait, and neither do we. Our multi-disciplinary team of highly experienced doctors, surgeons, and nurses are available round the clock, ensuring rapid, expert response whenever you need us most.'
    },
    {
      _key: 'hero-slide-4',
      title: 'Specialists You Can Trust',
      subtitle: 'Our panel of distinguished visiting consultants and resident specialists brings together decades of expertise across Surgery, Medicine, Orthopaedics, ENT, and more — all under one roof for your convenience.'
    },
    {
      _key: 'hero-slide-5',
      title: 'Accurate Diagnostics. Swift Results.',
      subtitle: 'Our fully automated laboratory and advanced diagnostic centre delivers fast, precise results — from routine blood work to complex pathology — enabling our doctors to make the right decisions for your health, faster.'
    }
  ];

  const mutation = {
    patch: {
      id: 'homePage',
      set: {
        heroSliders: all5Sliders
      }
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WRITE_TOKEN}`
    },
    body: JSON.stringify({ mutations: [mutation] })
  });

  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  console.log('✅ Successfully updated Sanity with all 5 Hero Sliders!');
}

updateAll5Sliders().catch(err => {
  console.error('Update failed:', err);
  process.exit(1);
});
