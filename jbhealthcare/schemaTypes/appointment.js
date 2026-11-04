export default {
  name: 'appointment',
  title: 'Appointments (முன்பதிவுகள்)',
  type: 'document',
  fields: [
    {
      name: 'patientName',
      title: 'Patient Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Mobile Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'consultationType',
      title: 'Consultation Type',
      type: 'string',
      options: {
        list: [
          { title: 'Clinic Visit (In-Person)', value: 'In-Person' },
          { title: 'Online Video Call', value: 'Online Consultation' },
        ],
      },
      initialValue: 'In-Person',
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
    },
    {
      name: 'doctor',
      title: 'Preferred Doctor',
      type: 'string',
    },
    {
      name: 'preferredDate',
      title: 'Preferred Date',
      type: 'string',
    },
    {
      name: 'preferredTime',
      title: 'Preferred Time Slot',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Patient Symptoms / Notes',
      type: 'text',
      rows: 3,
    },
    {
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          { title: '🟡 New / Pending Review', value: 'new' },
          { title: '🟢 Confirmed with Patient', value: 'confirmed' },
          { title: '✅ Completed / Visited', value: 'completed' },
          { title: '❌ Cancelled', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    },
    {
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'patientName',
      subtitle: 'phone',
      status: 'status',
      date: 'preferredDate',
      dept: 'department',
    },
    prepare(selection) {
      const { title, subtitle, status, date, dept } = selection;
      const statusIcon = status === 'confirmed' ? '🟢' : (status === 'completed' ? '✅' : (status === 'cancelled' ? '❌' : '🟡'));
      return {
        title: `${statusIcon} ${title || 'Unnamed Patient'} (${dept || 'General'})`,
        subtitle: `📞 ${subtitle || '-'} • Date: ${date || 'Not specified'}`,
      };
    },
  },
};

