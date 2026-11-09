export default {
  name: 'doctor',
  title: '4. DOCTORS (மருத்துவர்கள்)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Doctor Name (மருத்துவர் பெயர்)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Dr. B. Saileshkumar, Dr. Deepan Ramkumar, Dr. A.C. Arun'
    },
    {
      name: 'degree',
      title: 'Qualifications / Degrees (மருத்துவப் பட்டங்கள்)',
      type: 'string',
      description: 'e.g. MBBS, M.S. Ortho / MBBS, M.S., FIAGES, FALS / MBBS, M.D., D.M.'
    },
    {
      name: 'categoryHeader',
      title: 'Specialty Header Tag (துறை தலைப்பு)',
      type: 'string',
      description: 'e.g. ORTHOPAEDIC & TRAUMA SURGERY, MEDICAL GASTROENTEROLOGY & HEPATOLOGY'
    },
    {
      name: 'department',
      title: 'Department Name (துறையின் பெயர்)',
      type: 'string',
      description: 'e.g. Orthopaedics & Trauma Surgery, Medical Gastroenterology & Hepatology'
    },
    {
      name: 'category',
      title: 'Filter Category (பிரிவு)',
      type: 'string',
      options: {
        list: [
          { title: 'Laparoscopic Surgery', value: 'Laparoscopic' },
          { title: 'Surgical Oncology (Cancer)', value: 'Oncology' },
          { title: 'Gastroenterology', value: 'Gastroenterology' },
          { title: 'Obstetrics & Gynaecology', value: 'Gynaecology' },
          { title: 'Urology & Andrology', value: 'Urology' },
          { title: 'Plastic & Reconstructive Surgery', value: 'Plastic Surgery' },
          { title: 'Paediatric Surgery', value: 'Paediatric Surgery' },
          { title: 'Orthopaedics & Trauma', value: 'Orthopaedics' },
          { title: 'ENT (Ear, Nose, Throat)', value: 'ENT' },
          { title: 'Anaesthesiology & Critical Care', value: 'Anaesthesiology' },
          { title: 'Clinical Psychology', value: 'Psychology' },
          { title: 'General Medicine & Diabetology', value: 'General Medicine' }
        ]
      }
    },
    {
      name: 'schedule',
      title: 'Visiting Schedule (வருகை நாட்கள்)',
      type: 'string',
      description: 'e.g. Every Friday, On Surgery Days, Wednesday & Saturday, Daily'
    },
    {
      name: 'timing',
      title: 'Consultation Timings (ஆலோசனை நேரம்)',
      type: 'string',
      description: 'e.g. 09:00 PM (Night), On-Call / Based on Cases, 10:00 AM – 01:00 PM'
    },
    {
      name: 'availableDays',
      title: 'Available Filter Days (நாட்கள் பட்டியல்)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. ["All", "Friday"]'
    },
    {
      name: 'focusAreas',
      title: 'Clinical Focus & Expertise (சிறப்பு சிகிச்சைப் பகுதிகள்)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key areas of clinical practice (bullet points)'
    },
    {
      name: 'image',
      title: 'Doctor Photo (மருத்துவர் புகைப்படம்)',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Booking Number',
      type: 'string',
      initialValue: '919345510905'
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
      title: 'name',
      subtitle: 'categoryHeader',
      timing: 'timing',
      media: 'image'
    },
    prepare({ order, title, subtitle, timing, media }) {
      const numPrefix = order ? `${order}. ` : '';
      return {
        title: `${numPrefix}${title || 'Unnamed Doctor'}`,
        subtitle: `${subtitle || 'Specialist'} • ${timing || ''}`,
        media
      }
    }
  }
}
