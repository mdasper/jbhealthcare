export default {
  name: 'aboutPage',
  title: '2. ABOUT US (மருத்துவமனை அறிமுகம்)',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Header & Overview', default: true },
    { name: 'history', title: '2. Story & Background' },
    { name: 'visionMission', title: '3. Vision & Mission' },
    { name: 'awards', title: '4. Awards & Milestones' },
    { name: 'lab', title: '5. Diagnostic Lab Section' }
  ],
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Heading (தலைப்பு)',
      type: 'string',
      group: 'hero',
      initialValue: 'A Legacy of Clinical Excellence & Compassionate Healing'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle (துணைத் தலைப்பு)',
      type: 'text',
      group: 'hero',
      rows: 2,
      initialValue: 'Founded with a vision to deliver world-class surgical precision and community-first medical care in Sivakasi.'
    },
    {
      name: 'legacyHeading',
      title: 'Hospital Legacy Heading',
      type: 'string',
      group: 'history',
      initialValue: 'Our Story & Medical Journey'
    },
    {
      name: 'legacyText',
      title: 'Hospital History & Background (வரலாறு)',
      type: 'text',
      group: 'history',
      rows: 5
    },
    {
      name: 'vision',
      title: 'Our Vision (தொலைநோக்குப் பார்வை)',
      type: 'text',
      group: 'visionMission',
      rows: 3
    },
    {
      name: 'mission',
      title: 'Our Mission (மருத்துவமனை இலக்கு)',
      type: 'text',
      group: 'visionMission',
      rows: 3
    },
    {
      name: 'awards',
      title: 'Awards & Recognitions (பெற்ற விருதுகள்)',
      type: 'array',
      group: 'awards',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Award Title', type: 'string' },
            { name: 'year', title: 'Year', type: 'string' },
            { name: 'conferredBy', title: 'Conferred By', type: 'string' },
            { name: 'description', title: 'Short Description', type: 'string' }
          ],
          preview: {
            select: { title: 'title', subtitle: 'year' }
          }
        }
      ]
    },
    {
      name: 'coreValues',
      title: 'Core Values (மருத்துவமனையின் நற்பண்புகள்)',
      type: 'array',
      group: 'visionMission',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Value Title (e.g. Clinical Excellence, Compassion, Integrity)', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 }
          ]
        }
      ]
    },
    {
      name: 'labFeature',
      title: 'In-House Diagnostic Lab Section',
      type: 'object',
      group: 'lab',
      fields: [
        { name: 'heading', title: 'Lab Heading', type: 'string', initialValue: 'State-of-the-Art In-House Diagnostic Lab' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'image', title: 'Lab Technician / Analyzer Photo', type: 'image', options: { hotspot: true } }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'ℹ️ About Us Content (மருத்துவமனை அறிமுகப் பக்கம்)'
      }
    }
  }
}
