const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/pages/Doctors.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Ensure urlFor is imported
if (!content.includes('urlFor')) {
  content = content.replace("import { client } from '../sanity';", "import { client, urlFor } from '../sanity';");
}

// 2. Add pageData state & fetch
const targetState = `  const [activeTab, setActiveTab] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sanityDoctors, setSanityDoctors] = useState(null);

  useEffect(() => {
    client.fetch(\`*[_type == "doctor"] | order(order asc)\`).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setSanityDoctors(data);
      }
    }).catch((err) => {
      console.warn('Using offline doctors fallback:', err);
    });
  }, []);`;

const newState = `  const [activeTab, setActiveTab] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sanityDoctors, setSanityDoctors] = useState(null);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    client.fetch(\`*[_type == "doctorsPage" && _id == "doctorsPage"][0]\`).then((data) => {
      if (data) setPageData(data);
    }).catch(console.error);

    client.fetch(\`*[_type == "doctor"] | order(order asc)\`).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setSanityDoctors(data);
      }
    }).catch((err) => {
      console.warn('Using offline doctors fallback:', err);
    });
  }, []);

  const chiefSpotlight = pageData?.chiefDoctorSpotlight;
  const defaultChiefStats = [
    { value: '10,000+', label: 'அறுவை சிகிச்சைகள்' },
    { value: '2,000+', label: 'லேப்ரோஸ்கோபிக்' },
    { value: '3,000+', label: 'சிசேரியன்' },
    { value: '100+', label: 'புற்றுநோய் அறுவை' },
    { value: '50+', label: 'COVID நோயாளிகள்' }
  ];
  const chiefStats = (chiefSpotlight?.stats && chiefSpotlight.stats.length > 0) ? chiefSpotlight.stats : defaultChiefStats;

  const defaultEduItems = [
    { degree: 'MBBS', institution: 'மெட்ராஸ் மருத்துவக் கல்லூரி' },
    { degree: 'M.S.', institution: 'மதுரை மருத்துவக் கல்லூரி' },
    { degree: 'லேப்ரோஸ்கோப்பி பயிற்சி', institution: 'VG மருத்துவமனை, கோயம்புத்தூர்' },
    { degree: 'FIAGES / FALS', institution: 'இந்திய குடலியல் எண்டோ சர்ஜன் சங்கத்தின் சிறப்புப் பங்காளர் (Fellowship) சான்றிதழ்' }
  ];
  const eduItems = (chiefSpotlight?.educationItems && chiefSpotlight.educationItems.length > 0) ? chiefSpotlight.educationItems : defaultEduItems;

  const defaultServiceItems = [
    { role: 'IMA சிவகாசி கிளை', detail: 'செயலாளர், 2016–2017', icon: Building2 },
    { role: 'அரசு மருத்துவ சேவை', detail: '7 ஆண்டுகள் (2014–2021)', icon: Stethoscope },
    { role: 'விருதுநகர் மாவட்டம்', detail: 'அனைத்து முதன்மை சுகாதார மையங்களிலும் சிறப்பான பணி', icon: MapPin }
  ];
  const serviceItems = (chiefSpotlight?.serviceItems && chiefSpotlight.serviceItems.length > 0) ? chiefSpotlight.serviceItems : defaultServiceItems;

  const defaultGuidelines = [
    {
      title: '📌 Prior Appointment Recommended',
      description: 'Visiting consultants visit on specific days of the week and for scheduled surgeries. Patients are kindly requested to register their appointment in advance.'
    },
    {
      title: '📞 Direct Helpline & Schedule Confirmation',
      description: 'Call our reception at +91 93455 10905 for the exact consultation timings for the current week.'
    },
    {
      title: '🚨 24/7 Casualty & On-Call Emergency',
      description: 'Emergency surgical, trauma, and anaesthetic backup are accessible 24 hours a day with our dedicated medical duty officers.'
    }
  ];
  const guidelinesList = (pageData?.guidelinesSection?.guidelinesList && pageData.guidelinesSection.guidelinesList.length > 0)
    ? pageData.guidelinesSection.guidelinesList
    : defaultGuidelines;`;

// 3. Update Hero JSX
const targetHeroJSX = `        <div className="container" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: '3.3rem', marginBottom: '15px', letterSpacing: '0.5px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>
            Meet Our Medical Team & Specialists
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#061D38', fontWeight: '800', marginBottom: '15px' }}>
            சிறப்பு மருத்துவர்கள் குழு • Leading Surgeons & Consultants
          </p>
          <p style={{ fontSize: '1.1rem', maxWidth: '820px', margin: '0 auto', color: '#FFFFFF', lineHeight: '1.7', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
            Led by award-winning laparoscopic surgeon <strong>Dr. B. Saileshkumar</strong>, our multidisciplinary team of visiting super-specialists brings premier clinical expertise in cancer surgery, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics to Sivakasi.
          </p>
        </div>`;

const newHeroJSX = `        <div className="container" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: '3.3rem', marginBottom: '15px', letterSpacing: '0.5px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>
            {pageData?.heroHeading || "Meet Our Medical Team & Specialists"}
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#061D38', fontWeight: '800', marginBottom: '15px' }}>
            {pageData?.heroTag || "சிறப்பு மருத்துவர்கள் குழு • Leading Surgeons & Consultants"}
          </p>
          <p style={{ fontSize: '1.1rem', maxWidth: '820px', margin: '0 auto', color: '#FFFFFF', lineHeight: '1.7', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
            {pageData?.heroDescription || "Led by award-winning laparoscopic surgeon Dr. B. Saileshkumar, our multidisciplinary team of visiting super-specialists brings premier clinical expertise in cancer surgery, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics to Sivakasi."}
          </p>
        </div>`;

// 4. Update Chief Doctor Photo & Info
const targetDoctorPhoto = `<img 
                  src="/doctor.png" 
                  alt="Dr. B. Saileshkumar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                />`;

const newDoctorPhoto = `<img 
                  src={(chiefSpotlight?.image ? urlFor(chiefSpotlight.image).url() : null) || "/doctor.png"} 
                  alt={chiefSpotlight?.name || "Dr. B. Saileshkumar"} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                />`;

const targetDoctorIdentity = `                <div style={{
                  color: '#00B4D8',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}>
                  JB Health Care • Head of surgery
                </div>

                <h2 style={{
                  color: 'var(--white)',
                  fontSize: 'clamp(1.85rem, 3.5vw, 2.4rem)',
                  fontWeight: '700',
                  margin: '0 0 16px',
                  lineHeight: '1.2'
                }}>
                  Dr. B. சைலேஷ்குமார்
                </h2>

                {/* Degree Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['MBBS', 'M.S.', 'FIAGES', 'FALS'].map((deg) => (
                    <span 
                      key={deg} 
                      style={{
                        border: '1.5px solid #00B4D8',
                        color: 'var(--white)',
                        padding: '3px 14px',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        backgroundColor: 'rgba(0, 180, 216, 0.15)'
                      }}
                    >
                      {deg}
                    </span>
                  ))}
                </div>`;

const newDoctorIdentity = `                <div style={{
                  color: '#00B4D8',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}>
                  {chiefSpotlight?.tag || "JB Health Care • Head of surgery"}
                </div>

                <h2 style={{
                  color: 'var(--white)',
                  fontSize: 'clamp(1.85rem, 3.5vw, 2.4rem)',
                  fontWeight: '700',
                  margin: '0 0 16px',
                  lineHeight: '1.2'
                }}>
                  {chiefSpotlight?.name || "Dr. B. சைலேஷ்குமார்"}
                </h2>

                {/* Degree Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {(chiefSpotlight?.degrees || ['MBBS', 'M.S.', 'FIAGES', 'FALS']).map((deg) => (
                    <span 
                      key={deg} 
                      style={{
                        border: '1.5px solid #00B4D8',
                        color: 'var(--white)',
                        padding: '3px 14px',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        backgroundColor: 'rgba(0, 180, 216, 0.15)'
                      }}
                    >
                      {deg}
                    </span>
                  ))}
                </div>`;

// 5. Update Stats Bar
const targetStatsBar = `            {/* Tier 2: 5-Column Milestone Stats Bar */}
            <div className="chief-doctor-stats-bar">
              {[
                { value: '10,000+', label: 'அறுவை சிகிச்சைகள்' },
                { value: '2,000+', label: 'லேப்ரோஸ்கோபிக்' },
                { value: '3,000+', label: 'சிசேரியன்' },
                { value: '100+', label: 'புற்றுநோய் அறுவை' },
                { value: '50+', label: 'COVID நோயாளிகள்' }
              ].map((stat, idx) => (
                <div key={idx} className="chief-doctor-stat-item">
                  <div style={{
                    color: '#ffffff',
                    fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)',
                    fontWeight: '800',
                    lineHeight: '1.2'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.82)',
                    fontSize: '0.82rem',
                    marginTop: '4px',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>`;

const newStatsBar = `            {/* Tier 2: 5-Column Milestone Stats Bar */}
            <div className="chief-doctor-stats-bar">
              {chiefStats.map((stat, idx) => (
                <div key={stat._key || idx} className="chief-doctor-stat-item">
                  <div style={{
                    color: '#ffffff',
                    fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)',
                    fontWeight: '800',
                    lineHeight: '1.2'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.82)',
                    fontSize: '0.82rem',
                    marginTop: '4px',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>`;

// 6. Update Education and Public service
const targetEduTimeline = `                  {/* Vertical Timeline */}
                  <div style={{
                    position: 'relative',
                    paddingLeft: '24px',
                    borderLeft: '2px solid #00B4D8',
                    marginLeft: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    {/* Item 1 */}
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-30px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#00B4D8'
                      }} />
                      <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>MBBS</div>
                      <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>மெட்ராஸ் மருத்துவக் கல்லூரி</div>
                    </div>

                    {/* Item 2 */}
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-30px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#00B4D8'
                      }} />
                      <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>M.S.</div>
                      <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>மதுரை மருத்துவக் கல்லூரி</div>
                    </div>

                    {/* Item 3 */}
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-30px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#00B4D8'
                      }} />
                      <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>லேப்ரோஸ்கோப்பி பயிற்சி</div>
                      <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>VG மருத்துவமனை, கோயம்புத்தூர்</div>
                    </div>

                    {/* Item 4 */}
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-30px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#00B4D8'
                      }} />
                      <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>FIAGES / FALS</div>
                      <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px', lineHeight: '1.5' }}>
                        இந்திய குடலியல் எண்டோ சர்ஜன் சங்கத்தின் சிறப்புப் பங்காளர் (Fellowship) சான்றிதழ்
                      </div>
                    </div>
                  </div>`;

const newEduTimeline = `                  {/* Vertical Timeline */}
                  <div style={{
                    position: 'relative',
                    paddingLeft: '24px',
                    borderLeft: '2px solid #00B4D8',
                    marginLeft: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    {eduItems.map((item, idx) => (
                      <div key={item._key || idx} style={{ position: 'relative' }}>
                        <div style={{
                          position: 'absolute',
                          left: '-30px',
                          top: '5px',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#00B4D8'
                        }} />
                        <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>{item.degree}</div>
                        <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px', lineHeight: '1.5' }}>{item.institution}</div>
                      </div>
                    ))}
                  </div>`;

// 7. Update Public Service Items
const targetServiceItems = `                  {/* Service Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Service 1 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(0, 180, 216, 0.1)',
                        border: '1.5px solid rgba(0, 180, 216, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0077B6',
                        flexShrink: 0
                      }}>
                        <Building2 size={22} />
                      </div>
                      <div>
                        <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>
                          IMA சிவகாசி கிளை
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>
                          செயலாளர், <strong>2016–2017</strong>
                        </div>
                      </div>
                    </div>

                    {/* Service 2 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(0, 180, 216, 0.1)',
                        border: '1.5px solid rgba(0, 180, 216, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0077B6',
                        flexShrink: 0
                      }}>
                        <Stethoscope size={22} />
                      </div>
                      <div>
                        <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>
                          அரசு மருத்துவ சேவை
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>
                          <strong>7 ஆண்டுகள்</strong> (2014–2021)
                        </div>
                      </div>
                    </div>

                    {/* Service 3 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(0, 180, 216, 0.1)',
                        border: '1.5px solid rgba(0, 180, 216, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0077B6',
                        flexShrink: 0
                      }}>
                        <MapPin size={22} />
                      </div>
                      <div>
                        <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>
                          விருதுநகர் மாவட்டம்
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px', lineHeight: '1.5' }}>
                          அனைத்து முதன்மை சுகாதார மையங்களிலும் சிறப்பான பணி
                        </div>
                      </div>
                    </div>
                  </div>`;

const newServiceItems = `                  {/* Service Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {serviceItems.map((item, idx) => {
                      const icons = [Building2, Stethoscope, MapPin];
                      const ItemIcon = icons[idx % icons.length];
                      return (
                        <div key={item._key || idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                          <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(0, 180, 216, 0.1)',
                            border: '1.5px solid rgba(0, 180, 216, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#0077B6',
                            flexShrink: 0
                          }}>
                            <ItemIcon size={22} />
                          </div>
                          <div>
                            <div style={{ color: '#0A2540', fontWeight: '800', fontSize: '0.98rem' }}>
                              {item.role}
                            </div>
                            <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '2px' }}>
                              {item.detail}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>`;

// 8. Update Award Callout Box & OP Hours
const targetAwardBox = `              {/* Award Callout Box */}
              <div style={{
                backgroundColor: '#FDF7ED',
                border: '1.5px solid #F3D8B4',
                borderRadius: '16px',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginTop: '32px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#D99B5B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(217, 155, 91, 0.35)'
                }}>
                  <Award size={26} />
                </div>
                <div>
                  <div style={{ color: '#8C5B24', fontWeight: '800', fontSize: '1.05rem', marginBottom: '3px' }}>
                    Best Doctor Award • 2017 மற்றும் 2018
                  </div>
                  <div style={{ color: '#6C5539', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    தொடர்ச்சியாக இரண்டு ஆண்டுகள் மாவட்ட ஆட்சியரால் வழங்கப்பட்ட சிறந்த மருத்துவர் விருது
                  </div>
                </div>
              </div>`;

const newAwardBox = `              {/* Award Callout Box */}
              <div style={{
                backgroundColor: '#FDF7ED',
                border: '1.5px solid #F3D8B4',
                borderRadius: '16px',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginTop: '32px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#D99B5B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(217, 155, 91, 0.35)'
                }}>
                  <Award size={26} />
                </div>
                <div>
                  <div style={{ color: '#8C5B24', fontWeight: '800', fontSize: '1.05rem', marginBottom: '3px' }}>
                    {chiefSpotlight?.awardTitle || "Best Doctor Award • 2017 மற்றும் 2018"}
                  </div>
                  <div style={{ color: '#6C5539', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {chiefSpotlight?.awardDescription || "தொடர்ச்சியாக இரண்டு ஆண்டுகள் மாவட்ட ஆட்சியரால் வழங்கப்பட்ட சிறந்த மருத்துவர் விருது"}
                  </div>
                </div>
              </div>`;

const targetOpHours = `                <div style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  marginBottom: '3px'
                }}>
                  OP consultation hours
                </div>
                <div style={{
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '1.05rem',
                  letterSpacing: '0.3px'
                }}>
                  10:00 AM – 01:00 PM • 06:00 PM – 09:00 PM
                </div>`;

const newOpHours = `                <div style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  marginBottom: '3px'
                }}>
                  {chiefSpotlight?.opHoursLabel || "OP consultation hours"}
                </div>
                <div style={{
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '1.05rem',
                  letterSpacing: '0.3px'
                }}>
                  {chiefSpotlight?.opHours || "10:00 AM – 01:00 PM • 06:00 PM – 09:00 PM"}
                </div>`;

// 9. Update Visiting Consultants Header
const targetConsultantsHeader = `          {/* Section Header - Mathi Hospital Style */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }} data-aos="fade-up">
            <span style={{
              display: 'inline-block',
              fontSize: '0.85rem',
              fontWeight: '800',
              color: '#0077B6',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '8px'
            }}>
              Our Doctors
            </span>
            <h2 style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 2.85rem)',
              fontWeight: '800',
              color: '#061D38',
              margin: '0 0 14px',
              letterSpacing: '-0.3px'
            }}>
              Meet Our Consultants
            </h2>
            <div style={{
              width: '52px',
              height: '3.5px',
              background: 'linear-gradient(90deg, #00B4D8, #0077B6)',
              margin: '0 auto 16px',
              borderRadius: '2px'
            }} />
            <p style={{
              color: '#64748B',
              fontSize: '1.15rem',
              fontWeight: '500',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Find the right specialist for you.
            </p>
          </div>`;

const newConsultantsHeader = `          {/* Section Header - Mathi Hospital Style */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }} data-aos="fade-up">
            <span style={{
              display: 'inline-block',
              fontSize: '0.85rem',
              fontWeight: '800',
              color: '#0077B6',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '8px'
            }}>
              {pageData?.consultantsHeaderSection?.tag || "Our Doctors"}
            </span>
            <h2 style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 2.85rem)',
              fontWeight: '800',
              color: '#061D38',
              margin: '0 0 14px',
              letterSpacing: '-0.3px'
            }}>
              {pageData?.consultantsHeaderSection?.heading || "Meet Our Consultants"}
            </h2>
            <div style={{
              width: '52px',
              height: '3.5px',
              background: 'linear-gradient(90deg, #00B4D8, #0077B6)',
              margin: '0 auto 16px',
              borderRadius: '2px'
            }} />
            <p style={{
              color: '#64748B',
              fontSize: '1.15rem',
              fontWeight: '500',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              {pageData?.consultantsHeaderSection?.subtitle || "Find the right specialist for you."}
            </p>
          </div>`;

// 10. Update Guidelines Info Box
const targetGuidelinesBox = `          {/* Schedule Notice Info Box */}
          <div style={{
            marginTop: '55px',
            backgroundColor: 'var(--white)',
            borderRadius: '18px',
            padding: '30px 35px',
            border: '2px dashed rgba(0, 180, 216, 0.45)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }} data-aos="fade-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(0, 180, 216, 0.15)', padding: '10px', borderRadius: '12px', color: '#0077B6' }}>
                <Clock size={24} />
              </div>
              <div>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.25rem', margin: 0 }}>
                  Visiting Specialist Consultation Guidelines • முன்பதிவு விவரங்கள்
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '3px 0 0' }}>
                  Please read before planning your hospital visit
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', color: '#475569', fontSize: '0.92rem', lineHeight: '1.6' }}>
              <div>
                <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                  📌 Prior Appointment Recommended
                </strong>
                Visiting consultants visit on specific days of the week and for scheduled surgeries. Patients are kindly requested to register their appointment in advance.
              </div>
              <div>
                <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                  📞 Direct Helpline & Schedule Confirmation
                </strong>
                Call our reception at <strong>+91 93455 10905</strong> for the exact consultation timings for the current week.
              </div>
              <div>
                <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                  🚨 24/7 Casualty & On-Call Emergency
                </strong>
                Emergency surgical, trauma, and anaesthetic backup are accessible 24 hours a day with our dedicated medical duty officers.
              </div>
            </div>
          </div>`;

const newGuidelinesBox = `          {/* Schedule Notice Info Box */}
          <div style={{
            marginTop: '55px',
            backgroundColor: 'var(--white)',
            borderRadius: '18px',
            padding: '30px 35px',
            border: '2px dashed rgba(0, 180, 216, 0.45)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }} data-aos="fade-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(0, 180, 216, 0.15)', padding: '10px', borderRadius: '12px', color: '#0077B6' }}>
                <Clock size={24} />
              </div>
              <div>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.25rem', margin: 0 }}>
                  {pageData?.guidelinesSection?.title || "Visiting Specialist Consultation Guidelines • முன்பதிவு விவரங்கள்"}
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '3px 0 0' }}>
                  {pageData?.guidelinesSection?.subtitle || "Please read before planning your hospital visit"}
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', color: '#475569', fontSize: '0.92rem', lineHeight: '1.6' }}>
              {guidelinesList.map((g, idx) => (
                <div key={g._key || idx}>
                  <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                    {g.title}
                  </strong>
                  {g.description}
                </div>
              ))}
            </div>
          </div>`;

// 11. Update Bottom CTA Bar
const targetCalloutBar = `      {/* Bottom CTA Banner */}
      <section style={{ backgroundColor: '#071A2E', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <div className="container" data-aos="fade-up">
          <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginBottom: '12px' }}>
            Need Immediate Assistance or Surgery Consultation?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 30px' }}>
            Our hospital front desk is available 24/7 to connect you with our medical team and schedule priority appointments.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn btn-accent" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', fontWeight: 'bold' }}>
              Book an Appointment
            </Link>
            <a href="tel:+919345510905" className="btn btn-outline" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', borderColor: 'var(--white)', color: 'var(--white)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} /> Call +91 93455 10905
            </a>
          </div>
        </div>
      </section>`;

const newCalloutBar = `      {/* Bottom CTA Banner */}
      <section style={{ backgroundColor: '#071A2E', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <div className="container" data-aos="fade-up">
          <h2 style={{ color: 'var(--white)', fontSize: '2.2rem', marginBottom: '12px' }}>
            {pageData?.calloutSection?.heading || "Need Immediate Assistance or Surgery Consultation?"}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 30px' }}>
            {pageData?.calloutSection?.subtitle || "Our hospital front desk is available 24/7 to connect you with our medical team and schedule priority appointments."}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn btn-accent" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', fontWeight: 'bold' }}>
              {pageData?.calloutSection?.buttonText || "Book an Appointment"}
            </Link>
            <a href={\`tel:\${pageData?.calloutSection?.phoneNumber || "919345510905"}\`} className="btn btn-outline" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: '30px', borderColor: 'var(--white)', color: 'var(--white)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} /> {pageData?.calloutSection?.phoneText || "Call +91 93455 10905"}
            </a>
          </div>
        </div>
      </section>`;

const normalize = (s) => s.replace(/\r\n/g, '\n');

let norm = normalize(content);
norm = norm.replace(normalize(targetState), normalize(newState));
norm = norm.replace(normalize(targetHeroJSX), normalize(newHeroJSX));
norm = norm.replace(normalize(targetDoctorPhoto), normalize(newDoctorPhoto));
norm = norm.replace(normalize(targetDoctorIdentity), normalize(newDoctorIdentity));
norm = norm.replace(normalize(targetStatsBar), normalize(newStatsBar));
norm = norm.replace(normalize(targetEduTimeline), normalize(newEduTimeline));
norm = norm.replace(normalize(targetServiceItems), normalize(newServiceItems));
norm = norm.replace(normalize(targetAwardBox), normalize(newAwardBox));
norm = norm.replace(normalize(targetOpHours), normalize(newOpHours));
norm = norm.replace(normalize(targetConsultantsHeader), normalize(newConsultantsHeader));
norm = norm.replace(normalize(targetGuidelinesBox), normalize(newGuidelinesBox));
norm = norm.replace(normalize(targetCalloutBar), normalize(newCalloutBar));

fs.writeFileSync(filePath, norm.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated src/pages/Doctors.jsx with dynamic doctorsPage data!');

