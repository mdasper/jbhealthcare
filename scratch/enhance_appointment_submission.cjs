const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/pages/Appointment.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// Add isSubmitting and isSubmitted state
if (!content.includes('const [isSubmitting, setIsSubmitting] = useState(false);')) {
  content = content.replace(
    'const [dateError, setDateError] = useState(\'\');',
    `const [dateError, setDateError] = useState('');\n  const [isSubmitting, setIsSubmitting] = useState(false);\n  const [isSubmitted, setIsSubmitted] = useState(false);`
  );
}

// Update handleSubmit to be async and handle loading / success
const oldHandleSubmit = `  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;

    if (formData.date < minDate || formData.date > maxDate) {
      setDateError('Please choose a date within the next 3 days.');
      return;
    }
    
    // Save to Sanity database in background
    saveAppointmentToSanity(formData);

    const whatsappNumber = '919345510905';
    let text = \`*🏥 JB Healthcare - Appointment Booking*\\n\\n\`;
    text += \`*Patient Name:* \${formData.name}\\n\`;
    text += \`*Phone:* \${formData.phone}\\n\`;
    text += \`*Consultation Type:* \${formData.type}\\n\`;
    text += \`*Department:* \${formData.department}\\n\`;
    if (formData.doctor) {
      text += \`*Preferred Doctor:* \${formData.doctor}\\n\`;
    }
    text += \`*Preferred Date:* \${formData.date}\\n\`;
    
    if (formData.type === 'Online Consultation') {
      text += \`*Preferred Time:* 12:00 PM - 12:30 PM (Fixed)\\n\`;
    }
    
    if (formData.message) {
      text += \`*Notes:* \${formData.message}\\n\`;
    }
    
    window.open(\`https://api.whatsapp.com/send?phone=\${whatsappNumber}&text=\${encodeURIComponent(text)}\`, '_blank');
  };`;

const newHandleSubmit = `  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed || isSubmitting) return;

    if (formData.date < minDate || formData.date > maxDate) {
      setDateError('Please choose a date within the next 3 days.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Instantly save to Sanity CMS database
      await saveAppointmentToSanity(formData);

      setIsSubmitted(true);

      // 2. Open WhatsApp confirmation for the patient
      const whatsappNumber = '919345510905';
      let text = \`*🏥 JB Healthcare - Appointment Booking*\\n\\n\`;
      text += \`*Patient Name:* \${formData.name}\\n\`;
      text += \`*Phone:* \${formData.phone}\\n\`;
      text += \`*Consultation Type:* \${formData.type}\\n\`;
      text += \`*Department:* \${formData.department}\\n\`;
      if (formData.doctor) {
        text += \`*Preferred Doctor:* \${formData.doctor}\\n\`;
      }
      text += \`*Preferred Date:* \${formData.date}\\n\`;
      
      if (formData.type === 'Online Consultation') {
        text += \`*Preferred Time:* 12:00 PM - 12:30 PM (Fixed)\\n\`;
      }
      
      if (formData.message) {
        text += \`*Notes:* \${formData.message}\\n\`;
      }
      
      window.open(\`https://api.whatsapp.com/send?phone=\${whatsappNumber}&text=\${encodeURIComponent(text)}\`, '_blank');
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };`;

content = content.replace(oldHandleSubmit, newHandleSubmit);

// Show success UI if isSubmitted is true
const oldFormStart = `<form onSubmit={handleSubmit}>`;
const newFormStart = `{isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#F0FDF4', border: '2px solid #86EFAC', borderRadius: '16px' }} data-aos="zoom-in">
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#22C55E', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 8px 24px rgba(34, 197, 94, 0.35)' }}>
                    <CheckCircle size={38} />
                  </div>
                  <h3 style={{ color: '#15803D', fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px' }}>
                    Appointment Request Stored in Database!
                  </h3>
                  <div style={{ color: '#166534', fontSize: '1rem', fontWeight: '700', marginBottom: '14px' }}>
                    முன்பதிவு மருத்துவமனை அமைப்பில் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!
                  </div>
                  <p style={{ color: '#374151', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
                    Thank you <strong>{formData.name}</strong>. Your consultation details for <strong>{formData.department || 'General'}</strong> have been saved in our hospital database. Our team will contact you at <strong>{formData.phone}</strong> shortly to confirm your time slot.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          department: '',
                          doctor: '',
                          type: 'In-Person',
                          date: '',
                          message: ''
                        });
                      }}
                      className="btn btn-primary"
                      style={{ padding: '12px 24px', borderRadius: '25px', fontWeight: '700' }}
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>`;

content = content.replace(oldFormStart, newFormStart);

// Close the conditional
content = content.replace(
  `</form>\n            </div>`,
  `</form>\n              )}\n            </div>`
);

// Update button text when isSubmitting
content = content.replace(
  `Submit Appointment Request`,
  `{isSubmitting ? 'Saving to Database...' : 'Submit Appointment Request'}`
);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('✓ Successfully enhanced Appointment.jsx with instant feedback!');
