const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/services/leadService.js');

const code = `import { createClient } from '@sanity/client';

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

// Official Sanity client configured with write token
export const writeClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2023-01-01',
  token: WRITE_TOKEN,
  useCdn: false
});

/**
 * Save an appointment booking to Sanity
 */
export async function saveAppointmentToSanity(appointmentData) {
  const document = {
    _type: 'appointment',
    patientName: appointmentData.name || 'Anonymous Patient',
    phone: appointmentData.phone || '',
    consultationType: appointmentData.type || 'In-Person',
    department: appointmentData.department || 'General',
    doctor: appointmentData.doctor || '',
    preferredDate: appointmentData.date || '',
    preferredTime: appointmentData.type === 'Online Consultation' ? '12:00 PM - 12:30 PM (Fixed)' : (appointmentData.time || 'Regular OPD'),
    message: appointmentData.message || '',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  try {
    const result = await writeClient.create(document);
    console.log('Sanity appointment saved successfully via client:', result._id);
    return { success: true, result };
  } catch (clientErr) {
    console.warn('writeClient failed, attempting direct fetch fallback:', clientErr);
    try {
      const response = await fetch(\`https://\${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/\${DATASET}\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: \`Bearer \${WRITE_TOKEN}\`
        },
        body: JSON.stringify({
          mutations: [{ create: document }]
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(JSON.stringify(data.error));
      console.log('Sanity appointment saved successfully via fallback:', data);
      return { success: true, result: data };
    } catch (fetchErr) {
      console.error('All Sanity save attempts failed:', fetchErr);
      return { success: false, error: fetchErr };
    }
  }
}

/**
 * Save a contact enquiry to Sanity
 */
export async function saveEnquiryToSanity(enquiryData) {
  const document = {
    _type: 'enquiry',
    name: enquiryData.name || 'Anonymous',
    email: enquiryData.email || '',
    phone: enquiryData.phone || '',
    subject: enquiryData.subject || 'General Inquiry',
    message: enquiryData.message || '',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  try {
    const result = await writeClient.create(document);
    console.log('Sanity enquiry saved successfully via client:', result._id);
    return { success: true, result };
  } catch (err) {
    console.error('Failed to save enquiry:', err);
    return { success: false, error: err };
  }
}
`;

fs.writeFileSync(targetPath, code, 'utf8');
console.log('✓ Successfully upgraded leadService.js to use official @sanity/client!');
