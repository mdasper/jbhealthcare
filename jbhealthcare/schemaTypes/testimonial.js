export default {
  name: 'testimonial',
  title: 'Testimonials (Patient Reviews)',
  type: 'document',
  fields: [
    {
      name: 'patientName',
      title: 'Patient Name',
      type: 'string',
    },
    {
      name: 'review',
      title: 'Review / Feedback',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Rating (1 to 5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5)
    }
  ],
}
