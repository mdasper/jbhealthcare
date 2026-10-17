export default {
  name: 'service',
  title: 'Departments & Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Department Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tamilTitle',
      title: 'Tamil Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Surgical Excellence',
          'Super-Specialties',
          'Women & Child',
          'Clinical & Emergency'
        ]
      }
    },
    {
      name: 'icon',
      title: 'Icon Name (e.g. Scissors, Heart, Baby, Brain, Stethoscope, Syringe, Activity, Sparkles, ShieldAlert)',
      type: 'string',
    },
    {
      name: 'doctor',
      title: 'Assigned Doctor / Team',
      type: 'string',
    },
    {
      name: 'doctorRole',
      title: 'Doctor Role / Designation',
      type: 'string',
    },
    {
      name: 'degree',
      title: 'Doctor Qualifications / Degree',
      type: 'string',
    },
    {
      name: 'badge',
      title: 'Highlight Badge (e.g. 10,000+ Surgeries Performed)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Department Description',
      type: 'text',
    },
    {
      name: 'keyProcedures',
      title: 'Key Procedures & Clinical Focus',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'image',
      title: 'Department Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }
  ],
}
