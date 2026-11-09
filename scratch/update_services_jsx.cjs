const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/pages/Services.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetState = `const Services = () => {
  const [departments, setDepartments] = useState(() => sanitizeDepartmentDoctors(realDepartments));
  const [selectedCategory, setSelectedCategory] = useState('All Departments');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    client.fetch(\`*[_type == "service" && defined(keyProcedures)] | order(order asc)\`).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setDepartments(sanitizeDepartmentDoctors(data));
      }
    }).catch((err) => {
      console.warn('Using offline verified departments fallback:', err);
    });
  }, []);`;

const replacementState = `const Services = () => {
  const [departments, setDepartments] = useState(() => sanitizeDepartmentDoctors(realDepartments));
  const [selectedCategory, setSelectedCategory] = useState('All Departments');
  const [searchQuery, setSearchQuery] = useState('');
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    client.fetch(\`*[_type == "departmentsPage" && _id == "departmentsPage"][0]\`).then((data) => {
      if (data) setHeaderData(data);
    }).catch(console.error);

    client.fetch(\`*[_type == "service" && defined(keyProcedures)] | order(order asc)\`).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setDepartments(sanitizeDepartmentDoctors(data));
      }
    }).catch((err) => {
      console.warn('Using offline verified departments fallback:', err);
    });
  }, []);`;

const targetHeader = `        <div className="container" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginBottom: '16px', letterSpacing: '0.5px', fontWeight: '800', lineHeight: '1.2', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>
            Comprehensive Medical & Surgical Departments
          </h1>

          <p style={{ fontSize: '1.2rem', maxWidth: '820px', margin: '0 auto', color: '#FFFFFF', lineHeight: '1.8', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
            Led by award-winning Chief Laparoscopic Surgeon <strong>Dr. B. Saileshkumar</strong> (10,000+ Surgeries) alongside a distinguished team of visiting super-specialists in surgical oncology, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics in Sivakasi.
          </p>
        </div>`;

const replacementHeader = `        <div className="container" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginBottom: '16px', letterSpacing: '0.5px', fontWeight: '800', lineHeight: '1.2', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>
            {headerData?.heroHeading || "Comprehensive Medical & Surgical Departments"}
          </h1>

          <p style={{ fontSize: '1.2rem', maxWidth: '820px', margin: '0 auto', color: '#FFFFFF', lineHeight: '1.8', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
            {headerData?.heroSubtitle || "Led by award-winning Chief Laparoscopic Surgeon Dr. B. Saileshkumar (10,000+ Surgeries) alongside a distinguished team of visiting super-specialists in surgical oncology, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics in Sivakasi."}
          </p>
        </div>`;

const targetSection = `          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '35px' }} data-aos="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(10, 43, 78, 0.08)', color: 'var(--primary)', padding: '6px 18px', borderRadius: '25px', fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px', border: '1px solid rgba(10, 43, 78, 0.15)' }}>
              ★ அனைத்து சிறப்பு பிரிவுகள்
            </div>
            <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '10px' }}>
              Specialized Clinical Departments
            </h2>
            <p style={{ color: '#555', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
              Explore our full range of 12 clinical and surgical disciplines equipped with state-of-the-art operative technology and verified specialists.
            </p>
          </div>`;

const replacementSection = `          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '35px' }} data-aos="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(10, 43, 78, 0.08)', color: 'var(--primary)', padding: '6px 18px', borderRadius: '25px', fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px', border: '1px solid rgba(10, 43, 78, 0.15)' }}>
              {headerData?.badge || "★ அனைத்து சிறப்பு பிரிவுகள்"}
            </div>
            <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '10px' }}>
              {headerData?.sectionTitle || "Specialized Clinical Departments"}
            </h2>
            <p style={{ color: '#555', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
              {headerData?.sectionDescription || "Explore our full range of 12 clinical and surgical disciplines equipped with state-of-the-art operative technology and verified specialists."}
            </p>
          </div>`;

const normalize = (str) => str.replace(/\r\n/g, '\n');

let norm = normalize(content);
norm = norm.replace(normalize(targetState), normalize(replacementState));
norm = norm.replace(normalize(targetHeader), normalize(replacementHeader));
norm = norm.replace(normalize(targetSection), normalize(replacementSection));

fs.writeFileSync(filePath, norm.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated src/pages/Services.jsx!');
