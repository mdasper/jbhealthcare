export default {
  name: 'doctor',
  title: 'Doctors',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Doctor Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'specialization',
      title: 'Specialization',
      type: 'string',
      description: 'e.g., Cardiologist, General Physician',
    },
    {
      name: 'image',
      title: 'Doctor Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'experience',
      title: 'Years of Experience',
      type: 'string',
    }
  ],
}
