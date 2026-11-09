export default {
  name: 'doctorsPage',
  title: 'Doctors Page Content (மருத்துவர்கள் பக்க அமைப்புகள்)',
  type: 'document',
  groups: [
    { name: 'header', title: '1. Header & Overview (பக்கத் தலைப்பு)', default: true },
    { name: 'chiefDoctor', title: '2. Chief Doctor Spotlight (தலைமை மருத்துவர் விவரங்கள்)' },
    { name: 'consultantsHeader', title: '3. Consultants Header (சிறப்பு மருத்துவர்கள் பிரிவு)' },
    { name: 'guidelines', title: '4. Guidelines Box (முன்பதிவு வழிகாட்டுதல்கள்)' },
    { name: 'callout', title: '5. Emergency Callout Bar (அவசர உதவி பேனர்)' }
  ],
  fields: [
    // 1. Header & Overview
    {
      name: 'heroHeading',
      title: 'Hero Main Heading (பக்கத்தின் முக்கிய தலைப்பு)',
      type: 'string',
      group: 'header',
      initialValue: 'Meet Our Medical Team & Specialists'
    },
    {
      name: 'heroTag',
      title: 'Hero Tag / Subtitle (துணைத் தலைப்பு)',
      type: 'string',
      group: 'header',
      initialValue: 'சிறப்பு மருத்துவர்கள் குழு • Leading Surgeons & Consultants'
    },
    {
      name: 'heroDescription',
      title: 'Hero Description (விளக்கவுரை)',
      type: 'text',
      group: 'header',
      rows: 3,
      initialValue: 'Led by award-winning laparoscopic surgeon Dr. B. Saileshkumar, our multidisciplinary team of visiting super-specialists brings premier clinical expertise in cancer surgery, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics to Sivakasi.'
    },

    // 2. Chief Doctor Spotlight
    {
      name: 'chiefDoctorSpotlight',
      title: 'Chief Doctor Spotlight (டாக்டர் சைலேஷ் குமார் சிறப்பு அட்டை)',
      type: 'object',
      group: 'chiefDoctor',
      fields: [
        {
          name: 'tag',
          title: 'Top Tag',
          type: 'string',
          initialValue: 'JB Health Care • Head of surgery'
        },
        {
          name: 'name',
          title: 'Doctor Name (பெயர்)',
          type: 'string',
          initialValue: 'Dr. B. சைலேஷ்குமார்'
        },
        {
          name: 'degrees',
          title: 'Degrees (மருத்துவப் பட்டங்கள்)',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['MBBS', 'M.S.', 'FIAGES', 'FALS']
        },
        {
          name: 'image',
          title: 'Doctor Photo (புகைப்படம்)',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'stats',
          title: '5 Milestones Stats (5 சாதனைகள்)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Value (எண்)', type: 'string' },
                { name: 'label', title: 'Label (விளக்கம்)', type: 'string' }
              ],
              preview: { select: { title: 'value', subtitle: 'label' } }
            }
          ]
        },
        {
          name: 'educationTitle',
          title: 'Education Section Title',
          type: 'string',
          initialValue: 'கல்வி மற்றும் பயிற்சி'
        },
        {
          name: 'educationItems',
          title: 'Education & Training Timeline (கல்வி விவரங்கள்)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'degree', title: 'Degree / Training', type: 'string' },
                { name: 'institution', title: 'Institution / Details', type: 'string' }
              ],
              preview: { select: { title: 'degree', subtitle: 'institution' } }
            }
          ]
        },
        {
          name: 'serviceTitle',
          title: 'Public Service Section Title',
          type: 'string',
          initialValue: 'பொது சேவைகள் மற்றும் பொறுப்புகள்'
        },
        {
          name: 'serviceItems',
          title: 'Public Service Items (பொதுப்பணிகள்)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'role', title: 'Organization / Role', type: 'string' },
                { name: 'detail', title: 'Years / Detail', type: 'string' }
              ],
              preview: { select: { title: 'role', subtitle: 'detail' } }
            }
          ]
        },
        {
          name: 'awardTitle',
          title: 'Award Callout Title',
          type: 'string',
          initialValue: 'Best Doctor Award • 2017 மற்றும் 2018'
        },
        {
          name: 'awardDescription',
          title: 'Award Callout Description',
          type: 'text',
          rows: 2,
          initialValue: 'தொடர்ச்சியாக இரண்டு ஆண்டுகள் மாவட்ட ஆட்சியரால் வழங்கப்பட்ட சிறந்த மருத்துவர் விருது'
        },
        {
          name: 'opHoursLabel',
          title: 'OP Hours Label',
          type: 'string',
          initialValue: 'OP consultation hours'
        },
        {
          name: 'opHours',
          title: 'OP Consultation Timings',
          type: 'string',
          initialValue: '10:00 AM – 01:00 PM • 06:00 PM – 09:00 PM'
        }
      ]
    },

    // 3. Visiting Consultants Header
    {
      name: 'consultantsHeaderSection',
      title: 'Visiting Consultants Section Header',
      type: 'object',
      group: 'consultantsHeader',
      fields: [
        {
          name: 'tag',
          title: 'Top Tag',
          type: 'string',
          initialValue: 'Our Doctors'
        },
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Meet Our Consultants'
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          initialValue: 'Find the right specialist for you.'
        }
      ]
    },

    // 4. Consultation Guidelines
    {
      name: 'guidelinesSection',
      title: 'Visiting Specialist Guidelines (முன்பதிவு வழிகாட்டுதல்கள்)',
      type: 'object',
      group: 'guidelines',
      fields: [
        {
          name: 'title',
          title: 'Guidelines Box Title',
          type: 'string',
          initialValue: 'Visiting Specialist Consultation Guidelines • முன்பதிவு விவரங்கள்'
        },
        {
          name: 'subtitle',
          title: 'Guidelines Box Subtitle',
          type: 'string',
          initialValue: 'Please read before planning your hospital visit'
        },
        {
          name: 'guidelinesList',
          title: '3 Guidelines Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Guideline Title', type: 'string' },
                { name: 'description', title: 'Guideline Description', type: 'text', rows: 3 }
              ],
              preview: { select: { title: 'title', subtitle: 'description' } }
            }
          ]
        }
      ]
    },

    // 5. Emergency Callout Bar
    {
      name: 'calloutSection',
      title: 'Emergency Callout CTA Bar (அவசர உதவி பேனர்)',
      type: 'object',
      group: 'callout',
      fields: [
        {
          name: 'heading',
          title: 'Callout Heading',
          type: 'string',
          initialValue: 'Need Immediate Assistance or Surgery Consultation?'
        },
        {
          name: 'subtitle',
          title: 'Callout Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Our hospital front desk is available 24/7 to connect you with our medical team and schedule priority appointments.'
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
          initialValue: 'Call +91 93455 10905'
        },
        {
          name: 'phoneNumber',
          title: 'Phone Dial Number',
          type: 'string',
          initialValue: '919345510905'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: '👨‍⚕️ Doctors Page Content (மருத்துவர்கள் பக்க அமைப்புகள்)'
      }
    }
  }
}
