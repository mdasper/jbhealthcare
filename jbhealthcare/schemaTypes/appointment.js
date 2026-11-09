export default {
  name: 'appointment',
  title: 'Appointments (முன்பதிவுகள்)',
  type: 'document',
  groups: [
    { name: 'patient', title: '1. 👤 Patient Info (நோயாளி விவரங்கள்)' },
    { name: 'schedule', title: '2. 📅 Date & Timing (முன்பதிவு தேதிகள்)' },
    { name: 'clinical', title: '3. 🩺 Clinical Details (மருத்துவத் துறை)' },
    { name: 'admin', title: '4. 🏥 Hospital Action (நிர்வாக நிலை & குறிப்புகள்)' }
  ],
  fields: [
    // 1. Patient Information
    {
      name: 'patientName',
      title: 'Patient Name (நோயாளியின் பெயர்)',
      type: 'string',
      group: 'patient',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Mobile Phone Number (தொலைபேசி எண்)',
      type: 'string',
      group: 'patient',
      validation: (Rule) => Rule.required(),
    },

    // 2. Schedule & Consultation Type
    {
      name: 'consultationType',
      title: 'Consultation Type (ஆலோசனை வகை)',
      type: 'string',
      group: 'schedule',
      options: {
        list: [
          { title: '🏥 Clinic Visit (நேரடி வருகை - Hospital OPD)', value: 'In-Person' },
          { title: '💻 Video Consultation (வீடியோ அழைப்பு - 12:00-12:30 PM)', value: 'Online Consultation' },
        ],
        layout: 'radio'
      },
      initialValue: 'In-Person',
    },
    {
      name: 'preferredDate',
      title: 'Preferred Visit Date (நோயாளி வர விரும்பும் தேதி)',
      type: 'string',
      group: 'schedule',
      description: 'Format: YYYY-MM-DD'
    },
    {
      name: 'preferredTime',
      title: 'Preferred Time Slot (நேரம்)',
      type: 'string',
      group: 'schedule',
      description: 'e.g. Regular OPD / 12:00 PM - 12:30 PM (Fixed)'
    },
    {
      name: 'createdAt',
      title: 'Form Submitted At (படிவம் சமர்ப்பிக்கப்பட்ட நேரம்)',
      type: 'datetime',
      group: 'schedule',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    },

    // 3. Clinical Details
    {
      name: 'department',
      title: 'Clinical Department (மருத்துவத் துறை)',
      type: 'string',
      group: 'clinical',
    },
    {
      name: 'doctor',
      title: 'Preferred Doctor (தேர்வு செய்த மருத்துவர்)',
      type: 'string',
      group: 'clinical',
    },
    {
      name: 'message',
      title: 'Symptoms / Patient Notes (நோயாளி குறிப்பிட்ட அறிகுறிகள்)',
      type: 'text',
      rows: 4,
      group: 'clinical',
    },

    // 4. Hospital Admin Management
    {
      name: 'status',
      title: 'Appointment Status (தற்போதைய நிலை)',
      type: 'string',
      group: 'admin',
      options: {
        list: [
          { title: '🟡 New / Pending Review (புதிய முன்பதிவு)', value: 'new' },
          { title: '🟢 Confirmed with Patient (உறுதி செய்யப்பட்டது)', value: 'confirmed' },
          { title: '✅ Completed / Consultation Done (முடிவடைந்தது)', value: 'completed' },
          { title: '❌ Cancelled / Patient Did Not Visit (ரத்து செய்யப்பட்டது)', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    },
    {
      name: 'adminNotes',
      title: 'Hospital Staff Internal Notes (மருத்துவமனை உள் குறிப்புகள்)',
      type: 'text',
      rows: 3,
      group: 'admin',
      description: 'e.g. போனில் பேசி 10:30 AM-க்கு வர உறுதி செய்யப்பட்டது / டோக்கன் எண் வழங்கப்பட்டது'
    }
  ],
  preview: {
    select: {
      title: 'patientName',
      phone: 'phone',
      status: 'status',
      preferredDate: 'preferredDate',
      preferredTime: 'preferredTime',
      dept: 'department',
      type: 'consultationType',
      created: '_createdAt',
      createdAt: 'createdAt'
    },
    prepare(selection) {
      const { title, phone, status, preferredDate, preferredTime, dept, type, created, createdAt } = selection;

      // Status indicator
      const statusIcon = 
        status === 'confirmed' ? '🟢 Confirmed' :
        status === 'completed' ? '✅ Completed' :
        status === 'cancelled' ? '❌ Cancelled' : '🟡 NEW';

      // Type badge
      const typeBadge = type === 'Online Consultation' ? '💻 Video' : '🏥 Clinic';

      // Format Visit Date nicely
      let formattedVisit = preferredDate || 'No Date';
      if (preferredDate && preferredDate.includes('-')) {
        try {
          const parts = preferredDate.split('-');
          if (parts.length === 3) {
            const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            const mIdx = parseInt(parts[1], 10) - 1;
            formattedVisit = `${parts[2]}-${months[mIdx] || parts[1]}-${parts[0]}`;
          }
        } catch (e) {}
      }

      // Format Submitted timestamp
      let submittedDateStr = '';
      const rawTimestamp = createdAt || created;
      if (rawTimestamp) {
        try {
          const d = new Date(rawTimestamp);
          submittedDateStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        } catch (e) {}
      }

      return {
        title: `[${statusIcon}] ${title || 'Unnamed Patient'} (${typeBadge})`,
        subtitle: `📅 Visit: ${formattedVisit} (${preferredTime || 'OPD'}) • 📞 ${phone || '-'}`,
        description: `${dept || 'General'} • Submitted: ${submittedDateStr || 'Recent'}`
      };
    },
  },
};
