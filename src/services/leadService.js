// Service to submit appointments and enquiries directly to Sanity CMS database

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const PROJECT_ID = env.VITE_SANITY_PROJECT_ID || 'qoi5yrg2';
const DATASET = env.VITE_SANITY_DATASET || 'production';
const WRITE_TOKEN = env.VITE_SANITY_WRITE_TOKEN || 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

/**
 * Save an appointment booking to Sanity
 */
export async function saveAppointmentToSanity(appointmentData) {
  try {
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

    const response = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${WRITE_TOKEN}`
      },
      body: JSON.stringify({
        mutations: [{ create: document }]
      })
    });

    const result = await response.json();
    console.log('Sanity appointment saved successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to save appointment to Sanity:', error);
    return { success: false, error };
  }
}

/**
 * Save a contact enquiry to Sanity
 */
export async function saveEnquiryToSanity(enquiryData) {
  try {
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

    const response = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${WRITE_TOKEN}`
      },
      body: JSON.stringify({
        mutations: [{ create: document }]
      })
    });

    const result = await response.json();
    console.log('Sanity enquiry saved successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to save enquiry to Sanity:', error);
    return { success: false, error };
  }
}
