export default {
  name: 'aboutPage',
  title: 'About Page Content',
  type: 'document',
  fields: [
    {
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'string',
    },
    {
      name: 'historyText',
      title: 'Hospital History / Legacy (Paragraph 1)',
      type: 'text',
    },
    {
      name: 'vision',
      title: 'Our Vision',
      type: 'text',
    },
    {
      name: 'mission',
      title: 'Our Mission (Paragraph 2)',
      type: 'text',
    },
    {
      name: 'labHeading',
      title: 'Laboratory Section Heading',
      type: 'string',
    },
    {
      name: 'labDescription',
      title: 'Laboratory Section Description',
      type: 'text',
    },
    {
      name: 'aboutImage',
      title: 'About Us Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'coreValues',
      title: 'Core Values (e.g. Compassion, Excellence)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Value Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'whyDifferent',
      title: 'Why We Are Different',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Point Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' }
          ]
        }
      ]
    }
  ],
}
