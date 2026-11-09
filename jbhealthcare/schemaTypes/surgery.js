export default {
  name: 'surgery',
  title: '5. SURGERIES (அறுவை சிகிச்சைகள்)',
  type: 'document',
  fields: [
    {
      name: 'englishTitle',
      title: 'Surgery Title - English (அறுவை சிகிச்சையின் ஆங்கிலப் பெயர்)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Laparoscopic Hysterectomy, Laparoscopic Appendectomy, Laparoscopic Cholecystectomy, Laparoscopic Hernia Repair'
    },
    {
      name: 'tamilTitle',
      title: 'Tamil Name (தமிழ் பெயர்)',
      type: 'string',
      description: 'e.g. கருப்பை நீக்கம், குடல்வால், பித்தப்பை, குடல் இறக்கம்'
    },
    {
      name: 'subtitle',
      title: 'Subtitle / Procedure Type (துணைத் தலைப்பு)',
      type: 'string',
      description: 'e.g. Uterus Removal Surgery, Appendix Removal Surgery, Gall Bladder & Gallstone Surgery'
    },
    {
      name: 'description',
      title: 'Surgical Description (செயல்முறை விளக்கம்)',
      type: 'text',
      rows: 4
    },
    {
      name: 'features',
      title: 'Key Advantages & Highlights (முக்கிய பலன்கள்)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. ["Quick Recovery", "Minimal Scarring", "Painless Technique", "Same-day/Next-day Discharge"]'
    },
    {
      name: 'image',
      title: 'Surgery / OT Illustration Image (படம்)',
      type: 'image',
      options: { hotspot: true }
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
      title: 'englishTitle',
      tamil: 'tamilTitle',
      subtitle: 'subtitle',
      media: 'image'
    },
    prepare({ title, tamil, subtitle, media }) {
      return {
        title: title || 'Untitled Surgery',
        subtitle: `${tamil ? tamil + ' — ' : ''}${subtitle || ''}`,
        media
      }
    }
  }
}

