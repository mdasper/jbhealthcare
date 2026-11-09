const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/pages/Events.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Add pageData state and fetch
if (!content.includes('const [pageData, setPageData] = useState(null);')) {
  content = content.replace(
    'const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);',
    `const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);\n  const [pageData, setPageData] = useState(null);`
  );

  content = content.replace(
    `client.fetch(\`*[_type == "event"] | order(date desc)\`).then((data) => {`,
    `client.fetch(\`*[_type == "eventsPage"][0]\`).then((data) => {
      if (data) setPageData(data);
    }).catch(console.error);

    client.fetch(\`*[_type == "event"] | order(date desc)\`).then((data) => {`
  );
}

// 2. Replace Hero Title & Sub
content = content.replace(
  `Events & Medical Camps`,
  `{pageData?.heroHeading || 'Events & Medical Camps'}`
);

content = content.replace(
  `Explore our specialized health screening camps, upcoming hospital consultations, and community welfare programs in Sivakasi.`,
  `{pageData?.heroSubtitle || 'Explore our specialized health screening camps, upcoming hospital consultations, and community welfare programs in Sivakasi.'}`
);

// 3. Replace Banner Title & Sub
content = content.replace(
  `{activeTab === 'upcoming' && 'Upcoming Events & Consultations'}
                  {activeTab === 'camps' && 'Free Community Medical Camps'}
                  {activeTab === 'completed' && 'Hospital Milestones & Concluded Events'}`,
  `{activeTab === 'upcoming' && (pageData?.upcomingTabTitle || 'Upcoming Events & Consultations')}
                  {activeTab === 'camps' && (pageData?.campsTabTitle || 'Free Community Medical Camps')}
                  {activeTab === 'completed' && (pageData?.completedTabTitle || 'Hospital Milestones & Concluded Events')}`
);

content = content.replace(
  `{activeTab === 'upcoming' && 'Scheduled hospital health screening, consultations, and medical drives.'}
                  {activeTab === 'camps' && 'Rural and community outreach providing free doctor consultations and basic tests.'}
                  {activeTab === 'completed' && 'Retrospective archive of past health awareness seminars and hospital milestones.'}`,
  `{activeTab === 'upcoming' && (pageData?.upcomingTabSubtitle || 'Scheduled hospital health screening, consultations, and medical drives.')}
                  {activeTab === 'camps' && (pageData?.campsTabSubtitle || 'Rural and community outreach providing free doctor consultations and basic tests.')}
                  {activeTab === 'completed' && (pageData?.completedTabSubtitle || 'Retrospective archive of past health awareness seminars and hospital milestones.')}`
);

// 4. Replace Empty State text
content = content.replace(
  `No Upcoming Events at the Moment`,
  `{pageData?.emptyUpcomingHeading || 'No Upcoming Events at the Moment'}`
);

content = content.replace(
  `We are currently organizing our upcoming healthcare consultation camps. Please check back soon or browse our community medical camps and achievements!`,
  `{pageData?.emptyUpcomingDescription || 'We are currently organizing our upcoming healthcare consultation camps. Please check back soon or browse our community medical camps and achievements!'}`
);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('✓ Successfully updated Events.jsx with dynamic Sanity integration!');

