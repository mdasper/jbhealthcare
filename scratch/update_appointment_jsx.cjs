const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/pages/Appointment.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Add pageData state and fetch
if (!content.includes('const [pageData, setPageData] = useState(null);')) {
  content = content.replace(
    'const [settings, setSettings] = useState(null);',
    `const [settings, setSettings] = useState(null);\n  const [pageData, setPageData] = useState(null);`
  );

  content = content.replace(
    `client.fetch(\`*[_type == "siteSettings"][0]\`).then((data) => {
      setSettings(data);
    }).catch(console.error);`,
    `client.fetch(\`*[_type == "siteSettings"][0]\`).then((data) => {
      setSettings(data);
    }).catch(console.error);

    client.fetch(\`*[_type == "appointmentPage"][0]\`).then((data) => {
      if (data) setPageData(data);
    }).catch(console.error);`
  );
}

// 2. Replace Hero Heading and Subtitle
content = content.replace(
  `<h1 style={{ color: '#FFFFFF', fontSize: '3.5rem', marginBottom: '20px', letterSpacing: '1px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>Book Your Consultation</h1>`,
  `<h1 style={{ color: '#FFFFFF', fontSize: '3.5rem', marginBottom: '20px', letterSpacing: '1px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>{pageData?.heroHeading || 'Book Your Consultation'}</h1>`
);

content = content.replace(
  `Experience world-class healthcare. Schedule an in-person visit or an exclusive online video consultation from the comfort of your home.`,
  `{pageData?.heroSubtitle || 'Experience world-class healthcare. Schedule an in-person visit or an exclusive online video consultation from the comfort of your home.'}`
);

// 3. Replace Why Choose Heading & Subtitle
content = content.replace(
  `<h2 style={{ color: '#061D38', fontSize: '2.2rem', marginBottom: '20px', position: 'relative', zIndex: 1, fontWeight: '800' }}>Why Choose JB Healthcare?</h2>`,
  `<h2 style={{ color: '#061D38', fontSize: '2.2rem', marginBottom: '20px', position: 'relative', zIndex: 1, fontWeight: '800' }}>{pageData?.whyChooseHeading || 'Why Choose JB Healthcare?'}</h2>`
);

content = content.replace(
  `Our commitment to your well-being goes beyond treatments. We offer compassionate care backed by cutting-edge technology.`,
  `{pageData?.whyChooseSubtitle || 'Our commitment to your well-being goes beyond treatments. We offer compassionate care backed by cutting-edge technology.'}`
);

// 4. Replace Urgent Help box
content = content.replace(
  `<h4 style={{ color: '#061D38', fontSize: '1.2rem', marginBottom: '16px', fontWeight: '800' }}>Need Urgent Help?</h4>`,
  `<h4 style={{ color: '#061D38', fontSize: '1.2rem', marginBottom: '16px', fontWeight: '800' }}>{pageData?.urgentHeading || 'Need Urgent Help?'}</h4>`
);

content = content.replace(
  `<span style={{ color: '#061D38', opacity: 0.9, fontSize: '0.85rem', fontWeight: '600' }}>Hospital Front Desk</span>`,
  `<span style={{ color: '#061D38', opacity: 0.9, fontSize: '0.85rem', fontWeight: '600' }}>{pageData?.frontDeskLabel || 'Hospital Front Desk'}</span>`
);

content = content.replace(
  `<span style={{ color: '#061D38', opacity: 0.9, fontSize: '0.85rem', fontWeight: '600' }}>Appointments & WhatsApp</span>`,
  `<span style={{ color: '#061D38', opacity: 0.9, fontSize: '0.85rem', fontWeight: '600' }}>{pageData?.appointmentLabel || 'Appointments & WhatsApp'}</span>`
);

content = content.replace(
  `<span style={{ color: '#061D38', fontSize: '0.95rem', fontWeight: '800' }}>24/7 Casualty & Emergency Available</span>`,
  `<span style={{ color: '#061D38', fontSize: '0.95rem', fontWeight: '800' }}>{pageData?.emergencyAvailabilityText || '24/7 Casualty & Emergency Available'}</span>`
);

// 5. Replace Form Header and Online Consultation note
content = content.replace(
  `<h3 style={{ color: 'var(--primary)', fontSize: '1.8rem', marginBottom: '5px' }}>Patient Details</h3>`,
  `<h3 style={{ color: 'var(--primary)', fontSize: '1.8rem', marginBottom: '5px' }}>{pageData?.formHeaderTitle || 'Patient Details'}</h3>`
);

content = content.replace(
  `Please fill out the information below to request a consultation.`,
  `{pageData?.formHeaderSubtitle || 'Please fill out the information below to request a consultation.'}`
);

content = content.replace(
  `<Clock size={16} /> Note: Online video consultations are strictly allocated between 12:00 PM and 12:30 PM daily.`,
  `<Clock size={16} /> {pageData?.onlineConsultNotice || 'Note: Online video consultations are strictly allocated between 12:00 PM and 12:30 PM daily.'}`
);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('✓ Successfully updated Appointment.jsx with dynamic Sanity integration!');
