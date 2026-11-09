export default {
  name: 'departmentsPage',
  title: 'Departments Page Content (துறைகள் பக்க அமைப்புகள்)',
  type: 'document',
  groups: [
    { name: 'header', title: '1. Header & Overview (பக்கத் தலைப்பு & அறிமுகம்)', default: true },
    { name: 'healthPackages', title: '2. Health Packages (பரிசோதனை திட்டங்கள்)' },
    { name: 'journey', title: '3. Patient Journey (3 எளிய படிகள்)' },
    { name: 'callout', title: '4. Emergency Callout Bar (அவசர உதவி பேனர்)' }
  ],
  fields: [
    // 1. Header & Overview
    {
      name: 'heroHeading',
      title: 'Hero Main Heading (பக்கத்தின் முக்கிய தலைப்பு)',
      type: 'string',
      group: 'header',
      initialValue: 'Comprehensive Medical & Surgical Departments'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle (துணை வாசகம் / அறிமுகம்)',
      type: 'text',
      group: 'header',
      rows: 3,
      initialValue: 'Led by award-winning Chief Laparoscopic Surgeon Dr. B. Saileshkumar (10,000+ Surgeries) alongside a distinguished team of visiting super-specialists in surgical oncology, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics in Sivakasi.'
    },
    {
      name: 'badge',
      title: 'Section Badge Tag (பிரிவு பேட்ஜ்)',
      type: 'string',
      group: 'header',
      initialValue: '★ அனைத்து சிறப்பு பிரிவுகள்'
    },
    {
      name: 'sectionTitle',
      title: 'Section Title (பிரிவின் தலைப்பு)',
      type: 'string',
      group: 'header',
      initialValue: 'Specialized Clinical Departments'
    },
    {
      name: 'sectionDescription',
      title: 'Section Description (பிரிவின் விளக்கம்)',
      type: 'text',
      group: 'header',
      rows: 3,
      initialValue: 'Explore our full range of 12 clinical and surgical disciplines equipped with state-of-the-art operative technology and verified specialists.'
    },

    // 2. Health Packages Section (Image 1)
    {
      name: 'healthPackagesSection',
      title: 'Comprehensive Master Health Packages Section',
      type: 'object',
      group: 'healthPackages',
      fields: [
        {
          name: 'tag',
          title: 'Top Tag (மேல் பேட்ஜ்)',
          type: 'string',
          initialValue: 'PREVENTIVE HEALTH CHECKUP'
        },
        {
          name: 'heading',
          title: 'Section Heading (தலைப்பு)',
          type: 'string',
          initialValue: 'Comprehensive Master Health Packages'
        },
        {
          name: 'description',
          title: 'Section Description (விளக்கம்)',
          type: 'text',
          rows: 3,
          initialValue: 'Prevention is always superior to cure. JB Healthcare offers customized health screening packages designed for all age groups to detect asymptomatic risks early and maintain enduring health.'
        },
        {
          name: 'packages',
          title: 'Checkup Packages Cards (பரிசோதனை கார்டுகள்)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Package Title (பெயர்)', type: 'string' },
                { name: 'badge', title: 'Badge Label (e.g. Most Popular / Comprehensive)', type: 'string' },
                { name: 'badgeColor', title: 'Badge Color (HEX)', type: 'string', initialValue: '#F59E0B' },
                {
                  name: 'items',
                  title: 'Included Tests List (பரிசோதனைகள் பட்டியல்)',
                  type: 'array',
                  of: [{ type: 'string' }]
                }
              ],
              preview: {
                select: { title: 'title', subtitle: 'badge' }
              }
            }
          ]
        },
        {
          name: 'sideCard',
          title: 'Right Side Promo Card (வலதுபுற விளம்பர அட்டை)',
          type: 'object',
          fields: [
            { name: 'badge', title: 'Card Badge (e.g. Special Offer)', type: 'string', initialValue: 'Special Offer' },
            { name: 'title', title: 'Card Title', type: 'string', initialValue: 'Master Health Checkup' },
            { name: 'priceText', title: 'Price Subtitle', type: 'string', initialValue: 'Packages starting from ₹999/- only' },
            { name: 'image', title: 'Promo Photo (புகைப்படம்)', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    },

    // 3. Patient Journey Section (Image 2)
    {
      name: 'journeySection',
      title: 'Your Seamless Healthcare Journey (3 எளிய படிகள்)',
      type: 'object',
      group: 'journey',
      fields: [
        {
          name: 'badge',
          title: 'Top Badge (பேட்ஜ்)',
          type: 'string',
          initialValue: '3 எளிய படிகள் • Seamless Patient Care'
        },
        {
          name: 'heading',
          title: 'Section Heading (தலைப்பு)',
          type: 'string',
          initialValue: 'Your Seamless Healthcare Journey'
        },
        {
          name: 'steps',
          title: '3 Journey Steps (3 வழிமுறைகள்)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'stepNumber', title: 'Step Number (1, 2, 3)', type: 'string' },
                { name: 'title', title: 'Step Title', type: 'string' },
                { name: 'description', title: 'Step Description', type: 'text', rows: 3 }
              ],
              preview: {
                select: { title: 'title', subtitle: 'description' }
              }
            }
          ]
        }
      ]
    },

    // 4. Emergency Callout Bar (Image 3)
    {
      name: 'calloutSection',
      title: 'Need Immediate Assistance / CTA Bar (அவசர உதவி பேனர்)',
      type: 'object',
      group: 'callout',
      fields: [
        {
          name: 'heading',
          title: 'Callout Heading (தலைப்பு)',
          type: 'string',
          initialValue: 'Need Immediate Assistance or Surgery Consultation?'
        },
        {
          name: 'subtitle',
          title: 'Callout Subtitle (விளக்கம்)',
          type: 'text',
          rows: 2,
          initialValue: 'Our hospital reception is available 24/7 to connect you with our surgical and medical team.'
        },
        {
          name: 'buttonText',
          title: 'Button 1 Text',
          type: 'string',
          initialValue: 'Book an Appointment'
        },
        {
          name: 'phoneText',
          title: 'Button 2 Display Text',
          type: 'string',
          initialValue: 'Call 04562-299920'
        },
        {
          name: 'phoneNumber',
          title: 'Phone Dial Number (எண்)',
          type: 'string',
          initialValue: '04562299920'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: '📋 Departments Page Content (துறைகள் பக்க அமைப்புகள்)'
      }
    }
  }
}
