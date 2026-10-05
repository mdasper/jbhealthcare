export default {
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    {
      name: 'heroSliders',
      title: 'Hero Sliders (Banner Images & Text)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Banner Title', type: 'string' },
            { name: 'subtitle', title: 'Banner Subtitle', type: 'text' },
            { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
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
