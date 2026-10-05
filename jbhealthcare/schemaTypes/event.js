export default {
  name: 'event',
  title: 'Events & Camps',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'thumbnail',
      title: 'Cover Image (Thumbnail)',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'gallery',
      title: 'Event Gallery (Multiple Photos)',
      type: 'array',
      of: [{ type: 'image' }]
    }
  ]
}
