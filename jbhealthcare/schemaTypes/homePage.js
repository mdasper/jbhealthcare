export default {
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Main Banner Title',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: 'Main Banner Subtitle',
      type: 'text',
    },
    {
      name: 'heroImage',
      title: 'Main Banner Background Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'emergencyNumber',
      title: 'Emergency Contact Number',
      type: 'string',
    },
    {
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
    },
    {
      name: 'founderRole',
      title: 'Founder Role',
      type: 'string',
    },
    {
      name: 'founderQuote',
      title: 'Founder Quote',
      type: 'text',
    },
    {
      name: 'founderMessage',
      title: 'Founder Message (Detailed)',
      type: 'text',
    },
    {
      name: 'founderImage',
      title: 'Founder/Doctor Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'features',
      title: 'Why Choose Us (5 Points)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title (e.g. Certified Experts)', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' }
          ]
        }
      ]
    }
  ],
}
