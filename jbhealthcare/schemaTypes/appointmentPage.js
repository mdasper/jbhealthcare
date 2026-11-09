export default {
  name: 'appointmentPage',
  title: 'Appointment Page Content (முன்பதிவு பக்க விவரங்கள்)',
  type: 'document',
  groups: [
    { name: 'header', title: '1. Header & Overview (பக்கத் தலைப்பு)' },
    { name: 'whyChoose', title: '2. Why Choose Us Box (நம்பகத்தன்மை விவரங்கள்)' },
    { name: 'urgent', title: '3. Urgent Help & Numbers (அவசர உதவி எண்கள்)' },
    { name: 'formSettings', title: '4. Form Labels & Timings (படிவ அமைப்புகள்)' }
  ],
  fields: [
    // 1. Header & Overview
    {
      name: 'heroHeading',
      title: 'Hero Heading (முதன்மை தலைப்பு)',
      type: 'string',
      group: 'header',
      initialValue: 'Book Your Consultation'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle (துணை விளக்கம்)',
      type: 'text',
      rows: 3,
      group: 'header',
      initialValue: 'Experience world-class healthcare. Schedule an in-person visit or an exclusive online video consultation from the comfort of your home.'
    },

    // 2. Why Choose Us Box
    {
      name: 'whyChooseHeading',
      title: 'Why Choose Heading (தலைப்பு)',
      type: 'string',
      group: 'whyChoose',
      initialValue: 'Why Choose JB Healthcare?'
    },
    {
      name: 'whyChooseSubtitle',
      title: 'Why Choose Description (விளக்கம்)',
      type: 'text',
      rows: 3,
      group: 'whyChoose',
      initialValue: 'Our commitment to your well-being goes beyond treatments. We offer compassionate care backed by cutting-edge technology.'
    },
    {
      name: 'trustPoints',
      title: 'Trust Keypoints (3 முக்கிய சிறப்பம்சங்கள்)',
      type: 'array',
      group: 'whyChoose',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Point Title (தலைப்பு)', type: 'string' },
            { name: 'description', title: 'Point Description (விளக்கம்)', type: 'string' }
          ]
        }
      ]
    },

    // 3. Urgent Help Box
    {
      name: 'urgentHeading',
      title: 'Urgent Help Heading (அவசர உதவி தலைப்பு)',
      type: 'string',
      group: 'urgent',
      initialValue: 'Need Urgent Help?'
    },
    {
      name: 'frontDeskPhone',
      title: 'Front Desk Phone Number (முன் அலுவலக எண்)',
      type: 'string',
      group: 'urgent',
      initialValue: '+91 93455 10905'
    },
    {
      name: 'frontDeskLabel',
      title: 'Front Desk Label (பெயர்)',
      type: 'string',
      group: 'urgent',
      initialValue: 'Hospital Front Desk'
    },
    {
      name: 'appointmentPhone',
      title: 'Appointments / WhatsApp Phone (முன்பதிவு எண்)',
      type: 'string',
      group: 'urgent',
      initialValue: '+91 93455 10905'
    },
    {
      name: 'appointmentLabel',
      title: 'Appointment Phone Label (பெயர்)',
      type: 'string',
      group: 'urgent',
      initialValue: 'Appointments & WhatsApp'
    },
    {
      name: 'emergencyAvailabilityText',
      title: 'Emergency 24/7 Availability Note (அவசர உதவி குறிப்பு)',
      type: 'string',
      group: 'urgent',
      initialValue: '24/7 Casualty & Emergency Available'
    },

    // 4. Form Settings
    {
      name: 'formHeaderTitle',
      title: 'Form Heading (படிவ தலைப்பு)',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Patient Details'
    },
    {
      name: 'formHeaderSubtitle',
      title: 'Form Subtitle (படிவ துணை விளக்கம்)',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Please fill out the information below to request a consultation.'
    },
    {
      name: 'onlineConsultNotice',
      title: 'Online Video Consult Slot Notice (வீடியோ அழைப்பு நேர அறிவிப்பு)',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Note: Online video consultations are strictly allocated between 12:00 PM and 12:30 PM daily.'
    }
  ],
  preview: {
    select: {
      title: 'heroHeading',
      subtitle: 'heroSubtitle'
    }
  }
}

