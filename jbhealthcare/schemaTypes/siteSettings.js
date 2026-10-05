export default {
  name: 'siteSettings',
  title: 'Site Settings (Global)',
  type: 'document',
  fields: [
    {
      name: 'hospitalName',
      title: 'Hospital Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Contact Phone Number',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Hospital Address',
      type: 'text',
    },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Number (for chat)',
      type: 'string',
    }
  ],
}
