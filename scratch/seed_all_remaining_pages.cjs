const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'qoi5yrg2';
const DATASET = 'production';
const WRITE_TOKEN = 'skkyHygxOoPBODtE2n5sdHYgObfOCUUPcPxNHDGftUZufddEObopZLVLPPrxm7rVAr5JiiyKdSsVpfgyplGRJoBFLU9kU6mVQx8R0zTg5j0iGMykCS4uqtpkMSNwnKZ0vx0K9fxdtR2LuWjHH043msWy0PtunZf41uIWx6uRNuDc8ophUjlm';

async function uploadImageToSanity(filePath, filename, mime = 'image/jpeg') {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return null;
  }
  const url = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`;
  const buffer = fs.readFileSync(filePath);
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WRITE_TOKEN}`,
      'Content-Type': mime
    },
    body: buffer
  });

  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data.document._id;
}

async function mutateDoc(doc) {
  const mutations = [{ createOrReplace: doc }];
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WRITE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mutations })
  });
  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data;
}

async function main() {
  console.log('--- 1. Uploading OT and Surgery Photos ---');
  const ot815 = await uploadImageToSanity(path.join(__dirname, '../public/ot_photos/1I8A0815.JPG'), '1I8A0815.JPG');
  const ot841 = await uploadImageToSanity(path.join(__dirname, '../public/ot_photos/1I8A0841.JPG'), '1I8A0841.JPG');
  const ot850 = await uploadImageToSanity(path.join(__dirname, '../public/ot_photos/1I8A0850.JPG'), '1I8A0850.JPG');
  const ot785 = await uploadImageToSanity(path.join(__dirname, '../public/ot_photos/1I8A0785.JPG'), '1I8A0785.JPG');
  const ot797 = await uploadImageToSanity(path.join(__dirname, '../public/ot_photos/1I8A0797.JPG'), '1I8A0797.JPG');
  const ot835 = await uploadImageToSanity(path.join(__dirname, '../public/ot_photos/1I8A0835.JPG'), '1I8A0835.JPG');

  console.log('Uploaded OT Photos:', { ot815, ot841, ot850, ot785, ot797, ot835 });

  console.log('--- 2. Creating Surgeries Page Document ---');
  const surgeriesPageDoc = {
    _id: 'surgeriesPage',
    _type: 'surgeriesPage',
    // 1. Header
    heroHeading: 'Surgeries & Advanced Laparoscopy',
    heroSubtitle: 'JB Healthcare is a premier surgical center of excellence in Sivakasi & Virudhunagar district. Under the expertise of Dr. B. Saileshkumar (10,000+ Surgeries), we specialize in world-class minimally invasive laparoscopic procedures.',

    // 2. Laparoscopic Section Header
    lapSectionBadge: 'Speciality Highlight',
    lapSectionTitle: 'Advanced Laparoscopic Surgeries',
    lapSectionDescription: 'Keyhole Minimally Invasive Surgeries Performed with Advanced High-Definition Medical Systems',

    // 3. Core Specialties
    coreSectionBadge: 'Surgical Services',
    coreSectionTitle: 'Our Core Surgery Specialties',
    coreSectionDescription: 'State-of-the-art operative care across three key surgical domains — every procedure performed with precision, care, and the highest safety standards.',
    coreSpecialtiesList: [
      {
        _key: 'core-open',
        title: 'Open Surgery',
        subtitle: 'அறுவை சிகிச்சை',
        desc: 'Traditional open surgical procedures performed with precision for complex abdominal, gastrointestinal, and trauma cases requiring direct operative access.',
        tags: ['Complex Abdominal', 'GI Surgery', 'Trauma Care', 'Emergency Procedures'],
        image: ot815 ? { _type: 'image', asset: { _type: 'reference', _ref: ot815 } } : undefined
      },
      {
        _key: 'core-lap',
        title: 'Laparoscopic Surgery',
        subtitle: 'குறைந்த வலி • விரைவு மீட்சி',
        desc: 'Minimally invasive keyhole surgery using HD camera systems. Tiny incisions, zero visible scarring, minimal pain, and same-day or next-day discharge.',
        tags: ['Keyhole Incision', 'Faster Recovery', 'Minimal Scarring', '2,000+ Done'],
        image: ot841 ? { _type: 'image', asset: { _type: 'reference', _ref: ot841 } } : undefined
      },
      {
        _key: 'core-cancer',
        title: 'Cancer Surgery',
        subtitle: 'புற்றுநோய் அறுவை சிகிச்சை',
        desc: 'Dedicated surgical oncology services with visiting M.Ch. oncological surgeons for tumor resection, staging, breast cancer, GI cancer, and comprehensive chemotherapy care.',
        tags: ['Tumor Resection', 'Oncology Specialists', 'Chemotherapy Care', 'Breast Cancer', 'GI Oncology'],
        image: ot850 ? { _type: 'image', asset: { _type: 'reference', _ref: ot850 } } : undefined
      }
    ],

    // 4. Center of Excellence Card
    whyChooseBadge: 'Center of Surgical Excellence',
    whyChooseTitle: 'Why Choose JB Healthcare for Laparoscopy?',
    whyChooseLeadDoctor: 'Under the lead of Dr. B. Saileshkumar (MBBS, MS, FIAGES, FALS),',
    whyChooseDescription: 'JB Healthcare has performed over 2,000+ laparoscopic surgeries and 10,000+ total surgical procedures. With high-resolution camera towers, ultra-fine instrumentation, and advanced anesthesia protocols, patients experience less pain, zero ugly stitches, and prompt return to home.',
    whyChoosePrimaryCtaText: 'Book Surgical Consultation',
    whyChoosePhone: '+91 93455 10905',
    whyChooseImage: ot785 ? { _type: 'image', asset: { _type: 'reference', _ref: ot785 } } : undefined,

    // 5. Operation Theatre Photo Gallery (6 Photos)
    otGalleryBadge: 'Real Surgical Facility',
    otGalleryTitle: 'Inside Our Well-Equipped Operation Theatre',
    otGalleryDescription: 'Real-time surgical procedures led by Chief Laparoscopic Surgeon Dr. B. Saileshkumar alongside specialized anesthesia and sterile nursing teams.',
    otPhotos: [ot815, ot841, ot850, ot785, ot797, ot835].filter(Boolean).map((ref, idx) => ({
      _key: `ot-photo-${idx + 1}`,
      _type: 'image',
      asset: { _type: 'reference', _ref: ref }
    })),

    // 6. Visiting Specialists CTA
    visitingBadge: 'Multidisciplinary Surgical Care',
    visitingTitle: 'Visiting Super-Specialists & Second Opinions',
    visitingDescription: 'Beyond general and laparoscopic surgery, JB Healthcare hosts top visiting consultants in Cancer Surgery, Gastroenterology, Plastic Surgery, Urology, Paediatrics, and Orthopaedics.',
    visitingButton1Text: 'View Visiting Specialists',
    visitingButton2Text: 'Schedule Consultation'
  };

  await mutateDoc(surgeriesPageDoc);
  console.log('✓ Surgeries Page document created successfully!');

  console.log('--- 3. Creating Facilities Page Document ---');
  const facilitiesPageDoc = {
    _id: 'facilitiesPage',
    _type: 'facilitiesPage',
    heroHeading: '24/7 Hospital Facilities',
    heroSubtitle: 'At JB Healthcare, we provide round-the-clock emergency medical services, rapid diagnostics, and comfortable inpatient care with the highest standards of clinical safety.',
    ctaHeading: 'Need Immediate Medical Assistance?',
    ctaDescription: 'Our emergency and critical care departments are operational 24/7. Contact us immediately for swift response and expert care.',
    ctaButtonText: 'Contact Emergency Services'
  };
  await mutateDoc(facilitiesPageDoc);
  console.log('✓ Facilities Page document created successfully!');

  console.log('--- 4. Creating Events Page Document ---');
  const eventsPageDoc = {
    _id: 'eventsPage',
    _type: 'eventsPage',
    heroHeading: 'Events & Medical Camps',
    heroSubtitle: 'Explore our specialized health screening camps, upcoming hospital consultations, and community welfare programs in Sivakasi.',
    upcomingTabTitle: 'Upcoming Events & Consultations',
    upcomingTabSubtitle: 'Scheduled hospital health screening, consultations, and medical drives.',
    campsTabTitle: 'Free Community Medical Camps',
    campsTabSubtitle: 'Rural and community outreach providing free doctor consultations and basic tests.',
    completedTabTitle: 'Hospital Milestones & Concluded Events',
    completedTabSubtitle: 'Retrospective archive of past health awareness seminars and hospital milestones.',
    emptyUpcomingHeading: 'No Upcoming Events at the Moment',
    emptyUpcomingDescription: 'We are currently organizing our upcoming healthcare consultation camps. Please check back soon or browse our community medical camps and achievements!'
  };
  await mutateDoc(eventsPageDoc);
  console.log('✓ Events Page document created successfully!');

  console.log('--- 5. Creating Appointment Page Document ---');
  const appointmentPageDoc = {
    _id: 'appointmentPage',
    _type: 'appointmentPage',
    heroHeading: 'Book Your Consultation',
    heroSubtitle: 'Experience world-class healthcare. Schedule an in-person visit or an exclusive online video consultation from the comfort of your home.',
    whyChooseHeading: 'Why Choose JB Healthcare?',
    whyChooseSubtitle: 'Our commitment to your well-being goes beyond treatments. We offer compassionate care backed by cutting-edge technology.',
    trustPoints: [
      {
        _key: 'trust-1',
        title: '100% Confidential & Secure',
        description: 'Your medical records and details are strictly private.'
      },
      {
        _key: 'trust-2',
        title: 'No Hidden Wait Times',
        description: 'Book in advance and get priority consultation slots.'
      },
      {
        _key: 'trust-3',
        title: 'Top Medical Experts',
        description: 'Consult with the most experienced doctors in Sivakasi.'
      }
    ],
    urgentHeading: 'Need Urgent Help?',
    frontDeskPhone: '+91 93455 10905',
    frontDeskLabel: 'Hospital Front Desk',
    appointmentPhone: '+91 93455 10905',
    appointmentLabel: 'Appointments & WhatsApp',
    emergencyAvailabilityText: '24/7 Casualty & Emergency Available',
    formHeaderTitle: 'Patient Details',
    formHeaderSubtitle: 'Please fill out the information below to request a consultation.',
    onlineConsultNotice: 'Note: Online video consultations are strictly allocated between 12:00 PM and 12:30 PM daily.'
  };
  await mutateDoc(appointmentPageDoc);
  console.log('✓ Appointment Page document created successfully!');

  console.log('ALL REMAINING TAB DOCUMENTS SUCCESSFULLY SEEDED IN SANITY!');
}

main().catch(console.error);
