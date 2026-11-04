export default {
  name: 'enquiry',
  title: 'Patient Enquiries (விசாரணைகள்)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Sender Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'subject',
      title: 'Subject / Topic',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message Content',
      type: 'text',
      rows: 4,
    },
    {
      name: 'status',
      title: 'Inquiry Status',
      type: 'string',
      options: {
        list: [
          { title: '🟡 New Enquiry', value: 'new' },
          { title: '🟢 Followed Up / Responded', value: 'responded' },
          { title: '📁 Closed', value: 'closed' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    },
    {
      name: 'createdAt',
      title: 'Received At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject',
      status: 'status',
      email: 'email',
    },
    prepare(selection) {
      const { title, subtitle, status, email } = selection;
      const statusIcon = status === 'responded' ? '🟢' : (status === 'closed' ? '📁' : '🟡');
      return {
        title: `${statusIcon} ${title || 'Anonymous'} - ${subtitle || 'General Inquiry'}`,
        subtitle: `✉️ ${email || 'No email provided'}`,
      };
    },
  },
};

