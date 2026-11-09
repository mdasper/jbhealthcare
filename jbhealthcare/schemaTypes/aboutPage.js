export default {
  name: 'aboutPage',
  title: '2. ABOUT US (மருத்துவமனை அறிமுகம்)',
  type: 'document',
  groups: [
    { name: 'header', title: '1. Header & Stats (தலைப்பு & சாதனைகள்)', default: true },
    { name: 'founder', title: '2. Founder Spotlight (டாக்டர் சைலேஷ்)' },
    { name: 'legacy', title: '3. Our Legacy of Care (வரலாறு & குழு)' },
    { name: 'visionMission', title: '4. Vision & Mission (நோக்கம் & இலக்கு)' },
    { name: 'lab', title: '5. Diagnostic Lab (ஆய்வகம்)' }
  ],
  fields: [
    // 1. Header & Stats
    {
      name: 'mainHeading',
      title: 'Main Heading (முக்கிய தலைப்பு)',
      type: 'string',
      group: 'header',
      initialValue: 'About JB Healthcare'
    },
    {
      name: 'subHeading',
      title: 'Header Subtitle (துணை வாசகம்)',
      type: 'text',
      group: 'header',
      rows: 3,
      initialValue: 'Committed to providing world-class medical facilities, innovative treatments, and compassionate care to our community. We believe in treating the whole person, not just the disease.'
    },
    {
      name: 'milestones',
      title: 'Key Milestones Strip (5 சாதனைகள் - Navy Banner)',
      type: 'array',
      group: 'header',
      description: 'The 5 statistics shown below the header (10,000+ Surgeries, 2,000+ Laparoscopies, 3,000+ C-Sections, 100+ Cancer, 7 Yrs Govt Service)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number / Metric (எண்)', type: 'string' },
            { name: 'label', title: 'Label (பெயர்)', type: 'string' }
          ],
          preview: { select: { title: 'number', subtitle: 'label' } }
        }
      ]
    },

    // 2. Founder Spotlight
    {
      name: 'founderSpotlight',
      title: 'Founder & Chief Doctor Spotlight (டாக்டர் சைலேஷ் குமார்)',
      type: 'object',
      group: 'founder',
      fields: [
        { name: 'badge', title: 'Top Category Tag', type: 'string', initialValue: 'Leadership & Clinical Vision' },
        { name: 'name', title: 'Doctor Name (பெயர்)', type: 'string', initialValue: 'Dr. B. Saileshkumar' },
        { name: 'degree', title: 'Degrees & Role', type: 'string', initialValue: 'MBBS., M.S., FIAGES., FALS — Founder & Chief Surgeon' },
        { name: 'awardTag', title: 'Award Badge (விருது பேட்ஜ்)', type: 'string', initialValue: '★ Best Doctor Award (2017 & 2018)' },
        { name: 'bio', title: 'Bio / Clinical Vision', type: 'text', rows: 3 },
        {
          name: 'infoCards',
          title: '2 Highlight Cards (கல்வி & அரசுப்பணி)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Card Title', type: 'string' },
                { name: 'description', title: 'Card Description', type: 'text', rows: 3 }
              ],
              preview: { select: { title: 'title', subtitle: 'description' } }
            }
          ]
        },
        { name: 'image', title: 'Doctor Photo', type: 'image', options: { hotspot: true } }
      ]
    },

    // 3. Our Legacy of Care
    {
      name: 'legacySection',
      title: 'Our Legacy of Care (மருத்துவமனை வரலாறு & குழு)',
      type: 'object',
      group: 'legacy',
      fields: [
        { name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Our Legacy of Care' },
        { name: 'historyText', title: 'Hospital History Paragraph (வரலாறு)', type: 'text', rows: 4 },
        { name: 'infrastructureText', title: 'Infrastructure & Care Paragraph', type: 'text', rows: 4 },
        { name: 'floatingTitle', title: 'Floating Banner Title', type: 'string', initialValue: 'Healing Hands, Caring Hearts' },
        { name: 'floatingSubtitle', title: 'Floating Banner Subtitle', type: 'string', initialValue: 'Every patient is treated with deep empathy like family' },
        { name: 'aboutImage', title: 'Hospital Team Photo (முழு குழு படம்)', type: 'image', options: { hotspot: true } },
        {
          name: 'features',
          title: '4 Feature Cards (4 சிறப்பம்சங்கள்)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Card Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'string' }
              ],
              preview: { select: { title: 'title', subtitle: 'description' } }
            }
          ]
        }
      ]
    },

    // 4. Vision & Mission
    {
      name: 'vision',
      title: 'Our Vision (தொலைநோக்குப் பார்வை)',
      type: 'text',
      group: 'visionMission',
      rows: 4
    },
    {
      name: 'mission',
      title: 'Our Mission (மருத்துவமனை இலக்கு)',
      type: 'text',
      group: 'visionMission',
      rows: 4
    },

    // 5. In-House Diagnostic Lab
    {
      name: 'labSection',
      title: 'In-House Diagnostic Lab Section (ஆய்வகம்)',
      type: 'object',
      group: 'lab',
      fields: [
        { name: 'heading', title: 'Lab Heading (தலைப்பு)', type: 'string', initialValue: 'In-House Diagnostic Center' },
        { name: 'subheading', title: 'Subheading / Tagline', type: 'string', initialValue: 'Automated Pathology, Biochemistry & 3-Lead Digital ECG' },
        { name: 'description', title: 'Primary Description (விளக்கம்)', type: 'text', rows: 4 },
        { name: 'reliabilityText', title: 'Reliability & Emergency Paragraph', type: 'text', rows: 3 },
        { name: 'image', title: 'Lab Photo (ஆய்வகப் புகைப்படம்)', type: 'image', options: { hotspot: true } }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'ℹ️ ABOUT US (மருத்துவமனை அறிமுகம்)'
      }
    }
  }
}
