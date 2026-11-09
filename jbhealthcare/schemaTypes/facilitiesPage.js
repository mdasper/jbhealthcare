export default {
  name: 'facilitiesPage',
  title: 'Facilities Page Content (வசதிகள் பக்க விவரங்கள்)',
  type: 'document',
  groups: [
    { name: 'header', title: '1. Header & Overview (பக்கத் தலைப்பு)' },
    { name: 'cta', title: '2. Emergency Assistance Callout (அவசர உதவி பேனர்)' }
  ],
  fields: [
    // 1. Header & Overview
    {
      name: 'heroHeading',
      title: 'Hero Heading (முதன்மை தலைப்பு)',
      type: 'string',
      group: 'header',
      initialValue: '24/7 Hospital Facilities'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle (துணை விளக்கம்)',
      type: 'text',
      rows: 3,
      group: 'header',
      initialValue: 'At JB Healthcare, we provide round-the-clock emergency medical services, rapid diagnostics, and comfortable inpatient care with the highest standards of clinical safety.'
    },

    // 2. CTA Section
    {
      name: 'ctaHeading',
      title: 'Emergency CTA Heading (அழைப்புத் தலைப்பு)',
      type: 'string',
      group: 'cta',
      initialValue: 'Need Immediate Medical Assistance?'
    },
    {
      name: 'ctaDescription',
      title: 'CTA Description (விளக்கம்)',
      type: 'text',
      rows: 3,
      group: 'cta',
      initialValue: 'Our emergency and critical care departments are operational 24/7. Contact us immediately for swift response and expert care.'
    },
    {
      name: 'ctaButtonText',
      title: 'Button Text (பொத்தான் உரை)',
      type: 'string',
      group: 'cta',
      initialValue: 'Contact Emergency Services'
    }
  ],
  preview: {
    select: {
      title: 'heroHeading',
      subtitle: 'heroSubtitle'
    }
  }
}

