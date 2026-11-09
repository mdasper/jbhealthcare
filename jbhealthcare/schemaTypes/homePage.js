export default {
  name: 'homePage',
  title: '1. HOME PAGE (முகப்புப் பக்கம்)',
  type: 'document',
  fields: [
    {
      name: 'heroSliders',
      title: 'Hero Sliders (முகப்புப் பக்கத்தில் சுழலும் பேனர்கள்)',
      type: 'array',
      description: 'Add, reorder, or edit the large image sliders displayed at the top of the Home Page',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Banner Headline (முக்கிய தலைப்பு)', type: 'string' },
            { name: 'subtitle', title: 'Subtitle (துணை வாசகம்)', type: 'text', rows: 3 },
            { name: 'image', title: 'Background Photo (படம்)', type: 'image', options: { hotspot: true } }
          ],
          preview: {
            select: { title: 'title', media: 'image' }
          }
        }
      ]
    },
    {
      name: 'quickStats',
      title: 'Hospital Core Statistics Counter (மருத்துவமனை சாதனைகள்)',
      type: 'array',
      description: 'e.g. 10,000+ Surgeries, 12+ Super-Specialists, 24/7 Casualty Care, 98.6% Patient Satisfaction',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Statistic Number (எண் / சாதனை அளவு)', type: 'string', description: 'e.g. 10,000+ / 12+ / 24/7 / 98.6%' },
            { name: 'label', title: 'Metric Label (பெயர்)', type: 'string', description: 'e.g. Successful Surgeries Performed / Super-Specialists Panel' },
            { name: 'subtext', title: 'Small Description', type: 'string' }
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' }
          }
        }
      ]
    },
    {
      name: 'whyChooseUs',
      title: 'Why Choose Us Features (ஏன் ஜேபி மருத்துவமனை?)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 }
          ]
        }
      ]
    },
    {
      name: 'doctorSaileshProfile',
      title: 'Founder & Chief Surgeon Profile (டாக்டர் சைலேஷ் குமார் விவரம்)',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string', initialValue: 'Dr. B. Saileshkumar' },
        { name: 'role', title: 'Designation', type: 'string', initialValue: 'Founder & Chief Laparoscopic Surgeon' },
        { name: 'degree', title: 'Degrees', type: 'string', initialValue: 'MBBS, M.S., FIAGES, FALS' },
        { name: 'experienceTag', title: 'Experience Badge', type: 'string', initialValue: '10,000+ Laparoscopic & General Surgeries' },
        { name: 'message', title: 'Founder Message / Bio', type: 'text', rows: 4 },
        { name: 'image', title: 'Doctor Photo', type: 'image', options: { hotspot: true } }
      ]
    },
    {
      name: 'suganyaProfile',
      title: 'Managing Director Profile (சுகன்யா சைலேஷ் விவரம்)',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string', initialValue: 'V. Suganya Sailesh' },
        { name: 'role', title: 'Designation', type: 'string', initialValue: 'Co-founder & Managing Director' },
        { name: 'degree', title: 'Education / Tag', type: 'string', initialValue: 'Engineering Graduate & Healthcare Administrator' },
        { name: 'message', title: 'Director Message / Bio', type: 'text', rows: 4 },
        { name: 'image', title: 'Director Photo', type: 'image', options: { hotspot: true } }
      ]
    },
    {
      name: 'emergencyCareStrip',
      title: '24/7 Emergency Care Callout Strip',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string', initialValue: '24/7 Emergency Casualty & Rapid Trauma Response' },
        { name: 'subheading', title: 'Subheading', type: 'string', initialValue: 'Immediate attention by on-duty medical officers, surgical team, and critical care units.' },
        { name: 'phone', title: 'Emergency Phone', type: 'string', initialValue: '+91 93455 10905' }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: '🏠 Home Page Content (முகப்புப் பக்க அமைப்புகள்)'
      }
    }
  }
}
