const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '../src/pages/About.jsx');
let code = fs.readFileSync(aboutPath, 'utf8');

// 1. Update Header Subtitle
code = code.replace(
  /<p style=\{\{ fontSize: '1\.2rem', maxWidth: '800px', margin: '0 auto', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba\(0, 30, 60, 0\.25\)' \}\}>\s*Committed to providing world-class medical facilities[\s\S]*?<\/p>/,
  `<p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#FFFFFF', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
            {aboutData?.subHeading || "Committed to providing world-class medical facilities, innovative treatments, and compassionate care to our community. We believe in treating the whole person, not just the disease."}
          </p>`
);

// 2. Update Legacy Image resolution
code = code.replace(
  /const aboutImage = aboutData\?\.aboutImage \? urlFor\(aboutData\.aboutImage\)\.url\(\) : "\/hospital_photos\/jb_hospital_full_team\.jpg";/,
  `const aboutImage = (aboutData?.legacySection?.aboutImage ? urlFor(aboutData.legacySection.aboutImage).url() : null) || (aboutData?.aboutImage ? urlFor(aboutData.aboutImage).url() : "/hospital_photos/jb_hospital_full_team.jpg");`
);

// 3. Update History text resolution
code = code.replace(
  /const rawHistoryText = aboutData\?\.historyText \|\| "Established with a bold vision to make premium[\s\S]*?";/,
  `const rawHistoryText = aboutData?.legacySection?.historyText || aboutData?.historyText || "Established with a bold vision to make premium, international-standard healthcare accessible to everyone, JB Healthcare has grown into a trusted name in Sivakasi, Tamil Nadu. Over the years, we have built a reputation based on trust, clinical excellence, and deep-rooted empathy.";`
);

// 4. Update Lab Heading and description resolution
code = code.replace(
  /const labHeading = aboutData\?\.labHeading \|\| "In-House Diagnostic Center";/,
  `const labHeading = aboutData?.labSection?.heading || aboutData?.labHeading || "In-House Diagnostic Center";`
);
code = code.replace(
  /const labDescription = aboutData\?\.labDescription \|\| "At JB Healthcare, we know that waiting for test results[\s\S]*?";/,
  `const labDescription = aboutData?.labSection?.description || aboutData?.labDescription || "At JB Healthcare, we know that waiting for test results can be stressful for you and your family. That's why we've set up our own fully equipped diagnostic center right here inside our hospital.";`
);

fs.writeFileSync(aboutPath, code, 'utf8');
console.log('✅ About.jsx updated with dynamic Sanity integration and safe fallbacks!');

