export default {
  name: 'siteSettings',
  title: '8. CONTACT & SITE SETTINGS (தொடர்பு & பொது அமைப்புகள்)',
  type: 'document',
  fields: [
    {
      name: 'hospitalName',
      title: 'Hospital Name (மருத்துவமனை பெயர்)',
      type: 'string',
      initialValue: 'JB Healthcare'
    },
    {
      name: 'tagline',
      title: 'Hospital Tagline (முக்கிய வாசகம்)',
      type: 'string',
      initialValue: 'Healing Hands, Caring Hearts'
    },
    {
      name: 'emergencyNumber',
      title: '24/7 Emergency Casualty Phone (அவசர உதவி எண்)',
      type: 'string',
      initialValue: '+91 93455 10905'
    },
    {
      name: 'receptionNumber',
      title: 'Front Desk / Appointments Phone (முன்பதிவு எண்)',
      type: 'string',
      initialValue: '+91 93455 10905'
    },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Chat Number (வாட்ஸ்அப் எண்)',
      type: 'string',
      initialValue: '919345510905'
    },
    {
      name: 'email',
      title: 'Official Email (மின்னஞ்சல் முகவரி)',
      type: 'string',
      initialValue: 'jbhealthcare.sivakasi@gmail.com'
    },
    {
      name: 'address',
      title: 'Hospital Physical Address (முகவரி)',
      type: 'text',
      rows: 3,
      initialValue: '2/571A, Bharathi Nagar, Reserve line, Sivakasi, Tamil Nadu 626124'
    },
    {
      name: 'opdTimings',
      title: 'OPD Operating Hours (வேலை நேரம்)',
      type: 'string',
      initialValue: 'Daily OPD: 09:00 AM – 09:00 PM • 24/7 Casualty, Trauma & OT'
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps Directions Link',
      type: 'url'
    },
    {
      name: 'logo',
      title: 'Hospital Official Logo',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  preview: {
    prepare() {
      return {
        title: '📞 Contact & Site Settings (தொடர்பு விவரங்கள்)'
      }
    }
  }
}
