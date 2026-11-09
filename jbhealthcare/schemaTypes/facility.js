export default {
  name: 'facility',
  title: '6. FACILITIES (மருத்துவமனை வசதிகள்)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Facility Title (வசதியின் தலைப்பு)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. 24/7 Emergency & Surgical Care Unit, Inpatient (IP) & Outpatient (OP) Wards'
    },
    {
      name: 'subtitle',
      title: 'Subtitle (துணைத் தலைப்பு)',
      type: 'string',
      description: 'e.g. Immediate Trauma Care & OT Response, Spacious & Clean Patient Rooms'
    },
    {
      name: 'description',
      title: 'Description (விளக்கம்)',
      type: 'text',
      rows: 4
    },
    {
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'ShieldPlus (Emergency / Trauma)', value: 'ShieldPlus' },
          { title: 'Microscope (Laboratory / Diagnostics)', value: 'Microscope' },
          { title: 'Stethoscope (Consultations / Doctors)', value: 'Stethoscope' },
          { title: 'HeartPulse (Wards / Inpatient Care)', value: 'HeartPulse' },
          { title: 'Activity (Operation Theatre)', value: 'Activity' },
          { title: 'Pill (24/7 Pharmacy)', value: 'Pill' }
        ]
      }
    },
    {
      name: 'image',
      title: 'Primary Facility Photo (முக்கிய புகைப்படம்)',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'gallery',
      title: 'Dual / Multi Photo Views (இருவேறு படங்கள் - எ.கா: IP Ward & OP Lounge)',
      type: 'array',
      description: 'Optional: Use this if a facility has two views (like IP Ward room & OP waiting lounge)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'View Label (பெயர்)', type: 'string', description: 'e.g. Inpatient (IP) Ward / Outpatient (OP) Lounge' },
            { name: 'image', title: 'Photo (படம்)', type: 'image', options: { hotspot: true } }
          ],
          preview: {
            select: { title: 'label', media: 'image' }
          }
        }
      ]
    },
    {
      name: 'order',
      title: 'Display Order (வரிசை எண்)',
      type: 'number',
      initialValue: 1
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image'
    }
  }
}

