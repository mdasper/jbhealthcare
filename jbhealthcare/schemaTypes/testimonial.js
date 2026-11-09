export default {
  name: 'testimonial',
  title: '10. TESTIMONIALS (நோயாளி கருத்துக்கள்)',
  type: 'document',
  fields: [
    {
      name: 'patientName',
      title: 'Patient Name (நோயாளி பெயர்)',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'department',
      title: 'Treated Department / Surgery (சிகிச்சை பெற்ற பிரிவு)',
      type: 'string',
      description: 'e.g. Laparoscopic Surgery, Orthopaedics, General Medicine'
    },
    {
      name: 'review',
      title: 'Patient Feedback / Review (நோயாளி கருத்து)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required()
    },
    {
      name: 'rating',
      title: 'Star Rating (1 to 5 Stars)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5)
    },
    {
      name: 'date',
      title: 'Review Date',
      type: 'date'
    }
  ],
  preview: {
    select: {
      title: 'patientName',
      subtitle: 'department',
      rating: 'rating'
    },
    prepare({ title, subtitle, rating }) {
      const stars = '⭐'.repeat(rating || 5);
      return {
        title: `${title || 'Anonymous'} (${stars})`,
        subtitle: subtitle || 'Verified Patient'
      }
    }
  }
}
