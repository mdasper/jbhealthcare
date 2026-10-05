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
    }
  ],
}
