export default {
  name: 'service',
  title: '3. DEPARTMENTS (மருத்துவத் துறைகள்)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Department Title - English (துறையின் ஆங்கிலப் பெயர்)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Laparoscopic & General Surgery, Orthopaedics & Trauma Surgery'
    },
    {
      name: 'tamilTitle',
      title: 'Tamil Title (தமிழ் பெயர்)',
      type: 'string',
      description: 'e.g. நவீன லேப்ராஸ்கோபிக் & பொது அறுவை சிகிச்சை, எலும்பு முறிவு & விபத்து அறுவை சிகிச்சை'
    },
    {
      name: 'category',
      title: 'Category (பிரிவு)',
      type: 'string',
      options: {
        list: [
          { title: 'Surgical Excellence', value: 'Surgical Excellence' },
          { title: 'Super-Specialties', value: 'Super-Specialties' },
          { title: 'Clinical & Emergency', value: 'Clinical & Emergency' },
          { title: 'Diagnostics & Support', value: 'Diagnostics & Support' }
        ]
      }
    },
    {
      name: 'isFeaturedOnHome',
      title: '⭐ Show on Home Page (Top Departments-ல் காட்ட வேண்டுமா?)',
      type: 'boolean',
      initialValue: false,
      description: 'Check this box to automatically showcase this department on the Home Page Top Departments grid!'
    },
    {
      name: 'badge',
      title: 'Highlight Badge (சிறப்பம்சம்)',
      type: 'string',
      description: 'e.g. 10,000+ Surgeries Performed, On Surgery Days • 24/7 Fracture Emergency'
    },
    {
      name: 'doctor',
      title: 'Assigned Doctor / Team (மருத்துவர் பெயர்)',
      type: 'string',
      description: 'e.g. Dr. B. Saileshkumar, Dr. Deepan Ramkumar, Dr. A.C. Arun'
    },
    {
      name: 'doctorRole',
      title: 'Doctor Designation (பதவி / பங்கு)',
      type: 'string',
      description: 'e.g. Chief Laparoscopic Surgeon, Visiting Orthopaedic Surgeon'
    },
    {
      name: 'degree',
      title: 'Doctor Qualifications (மருத்துவப் பட்டங்கள்)',
      type: 'string',
      description: 'e.g. MBBS, M.S., FIAGES, FALS / MBBS, M.S. Ortho'
    },
    {
      name: 'description',
      title: 'Department Description (விளக்கவுரை)',
      type: 'text',
      rows: 4
    },
    {
      name: 'keyProcedures',
      title: 'Key Procedures & Clinical Focus (முக்கிய சிகிச்சை முறைகள்)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of specific surgeries or treatments performed in this department'
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      options: {
        list: [
          { title: 'Scissors (Surgery)', value: 'Scissors' },
          { title: 'Activity (Health & Heart)', value: 'Activity' },
          { title: 'ShieldAlert (Cancer / Oncology)', value: 'ShieldAlert' },
          { title: 'Brain (Neurology / Psychology)', value: 'Brain' },
          { title: 'Baby (Paediatrics)', value: 'Baby' },
          { title: 'Sparkles (Plastic / Cosmetic)', value: 'Sparkles' },
          { title: 'Microscope (Diagnostics & Lab)', value: 'Microscope' },
          { title: 'Stethoscope (General OPD)', value: 'Stethoscope' },
          { title: 'Pill (Pharmacy)', value: 'Pill' }
        ]
      }
    },
    {
      name: 'order',
      title: 'Display Order (வரிசை எண்)',
      type: 'number',
      initialValue: 1
    }
  ],
  orderings: [
    {
      title: 'Display Order (வரிசைப்படி 1-14)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      order: 'order',
      title: 'title',
      tamil: 'tamilTitle',
      doctor: 'doctor',
      featured: 'isFeaturedOnHome'
    },
    prepare({ order, title, tamil, doctor, featured }) {
      const numPrefix = order ? `${order}. ` : '';
      return {
        title: `${numPrefix}${featured ? '⭐ ' : ''}${title || 'Untitled Department'}`,
        subtitle: `${tamil ? tamil + ' • ' : ''}${doctor || 'No doctor assigned'}`
      }
    }
  }
}
