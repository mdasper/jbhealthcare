export default {
  name: 'surgeriesPage',
  title: 'Surgeries Page Content (அறுவை சிகிச்சை பக்க விவரங்கள்)',
  type: 'document',
  groups: [
    { name: 'header', title: '1. Header & Overview (தலைப்பு)' },
    { name: 'lapHeader', title: '2. Laparoscopic Title (லேப்ராஸ்கோபிக் தலைப்பு)' },
    { name: 'coreSpecialties', title: '3. Core Specialties (முக்கிய அறுவை சிகிச்சைகள்)' },
    { name: 'whyChoose', title: '4. Center of Excellence (சிறப்புப் பெட்டி)' },
    { name: 'otGallery', title: '5. OT Photo Gallery (அரங்கப் புகைப்படங்கள்)' },
    { name: 'visitingCta', title: '6. Visiting Specialists CTA (சிறப்பு மருத்துவர்கள் பேனர்)' }
  ],
  fields: [
    // 1. Header & Overview
    {
      name: 'heroHeading',
      title: 'Hero Heading (முதன்மை தலைப்பு)',
      type: 'string',
      group: 'header',
      initialValue: 'Surgeries & Advanced Laparoscopy'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle (துணை விளக்கம்)',
      type: 'text',
      rows: 3,
      group: 'header',
      initialValue: 'JB Healthcare is a premier surgical center of excellence in Sivakasi & Virudhunagar district. Under the expertise of Dr. B. Saileshkumar (10,000+ Surgeries), we specialize in world-class minimally invasive laparoscopic procedures.'
    },

    // 2. Laparoscopic Surgeries Section Header
    {
      name: 'lapSectionBadge',
      title: 'Section Badge (மேல் குறிச்சொல்)',
      type: 'string',
      group: 'lapHeader',
      initialValue: 'Speciality Highlight'
    },
    {
      name: 'lapSectionTitle',
      title: 'Section Title (பிரிவு தலைப்பு)',
      type: 'string',
      group: 'lapHeader',
      initialValue: 'Advanced Laparoscopic Surgeries'
    },
    {
      name: 'lapSectionDescription',
      title: 'Section Description (விளக்கம்)',
      type: 'string',
      group: 'lapHeader',
      initialValue: 'Keyhole Minimally Invasive Surgeries Performed with Advanced High-Definition Medical Systems'
    },

    // 3. Core Specialties Section
    {
      name: 'coreSectionBadge',
      title: 'Core Specialties Badge (மேல் குறிச்சொல்)',
      type: 'string',
      group: 'coreSpecialties',
      initialValue: 'Surgical Services'
    },
    {
      name: 'coreSectionTitle',
      title: 'Core Specialties Title (பிரிவு தலைப்பு)',
      type: 'string',
      group: 'coreSpecialties',
      initialValue: 'Our Core Surgery Specialties'
    },
    {
      name: 'coreSectionDescription',
      title: 'Core Specialties Description (விளக்கம்)',
      type: 'text',
      rows: 2,
      group: 'coreSpecialties',
      initialValue: 'State-of-the-art operative care across three key surgical domains — every procedure performed with precision, care, and the highest safety standards.'
    },
    {
      name: 'coreSpecialtiesList',
      title: '3 Core Specialties Cards (3 முக்கிய அறுவை சிகிச்சைப் பிரிவுகள்)',
      type: 'array',
      group: 'coreSpecialties',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Specialty Title (தலைப்பு)', type: 'string' },
            { name: 'subtitle', title: 'Tamil / Short Subtitle (துணைப் பெயர்)', type: 'string' },
            { name: 'image', title: 'Photo (படம்)', type: 'image', options: { hotspot: true } },
            { name: 'desc', title: 'Description (விளக்கம்)', type: 'text', rows: 3 },
            { name: 'tags', title: 'Tags / Checkpoints (சிறப்பம்சங்கள்)', type: 'array', of: [{ type: 'string' }] }
          ],
          preview: {
            select: { title: 'title', subtitle: 'subtitle', media: 'image' }
          }
        }
      ]
    },

    // 4. Center of Surgical Excellence Card
    {
      name: 'whyChooseBadge',
      title: 'Card Badge (சிறப்பு குறிச்சொல்)',
      type: 'string',
      group: 'whyChoose',
      initialValue: 'Center of Surgical Excellence'
    },
    {
      name: 'whyChooseTitle',
      title: 'Card Heading (தலைப்பு)',
      type: 'string',
      group: 'whyChoose',
      initialValue: 'Why Choose JB Healthcare for Laparoscopy?'
    },
    {
      name: 'whyChooseLeadDoctor',
      title: 'Lead Doctor Highlight Text (தலைமை மருத்துவர் அறிமுக வரி)',
      type: 'string',
      group: 'whyChoose',
      initialValue: 'Under the lead of Dr. B. Saileshkumar (MBBS, MS, FIAGES, FALS),'
    },
    {
      name: 'whyChooseDescription',
      title: 'Description (விளக்கம்)',
      type: 'text',
      rows: 4,
      group: 'whyChoose',
      initialValue: 'JB Healthcare has performed over 2,000+ laparoscopic surgeries and 10,000+ total surgical procedures. With high-resolution camera towers, ultra-fine instrumentation, and advanced anesthesia protocols, patients experience less pain, zero ugly stitches, and prompt return to home.'
    },
    {
      name: 'whyChooseImage',
      title: 'Card Photo (படம்)',
      type: 'image',
      group: 'whyChoose',
      options: { hotspot: true }
    },
    {
      name: 'whyChoosePrimaryCtaText',
      title: 'Primary Button Text (முக்கிய பொத்தான்)',
      type: 'string',
      group: 'whyChoose',
      initialValue: 'Book Surgical Consultation'
    },
    {
      name: 'whyChoosePhone',
      title: 'Helpline Phone (அழைப்பு எண்)',
      type: 'string',
      group: 'whyChoose',
      initialValue: '+91 93455 10905'
    },

    // 5. Operation Theatre Photo Gallery
    {
      name: 'otGalleryBadge',
      title: 'Gallery Badge (குறிச்சொல்)',
      type: 'string',
      group: 'otGallery',
      initialValue: 'Real Surgical Facility'
    },
    {
      name: 'otGalleryTitle',
      title: 'Gallery Heading (தலைப்பு)',
      type: 'string',
      group: 'otGallery',
      initialValue: 'Inside Our Well-Equipped Operation Theatre'
    },
    {
      name: 'otGalleryDescription',
      title: 'Gallery Description (விளக்கம்)',
      type: 'text',
      rows: 2,
      group: 'otGallery',
      initialValue: 'Real-time surgical procedures led by Chief Laparoscopic Surgeon Dr. B. Saileshkumar alongside specialized anesthesia and sterile nursing teams.'
    },
    {
      name: 'otPhotos',
      title: 'Operation Theatre Photos (அரங்கப் புகைப்படங்கள் - 6 Photos)',
      type: 'array',
      group: 'otGallery',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },

    // 6. Visiting Specialists CTA Banner
    {
      name: 'visitingBadge',
      title: 'Visiting Badge (குறிச்சொல்)',
      type: 'string',
      group: 'visitingCta',
      initialValue: 'Multidisciplinary Surgical Care'
    },
    {
      name: 'visitingTitle',
      title: 'Visiting Heading (தலைப்பு)',
      type: 'string',
      group: 'visitingCta',
      initialValue: 'Visiting Super-Specialists & Second Opinions'
    },
    {
      name: 'visitingDescription',
      title: 'Visiting Description (விளக்கம்)',
      type: 'text',
      rows: 3,
      group: 'visitingCta',
      initialValue: 'Beyond general and laparoscopic surgery, JB Healthcare hosts top visiting consultants in Cancer Surgery, Gastroenterology, Plastic Surgery, Urology, Paediatrics, and Orthopaedics.'
    },
    {
      name: 'visitingButton1Text',
      title: 'Button 1 Text (பொத்தான் 1)',
      type: 'string',
      group: 'visitingCta',
      initialValue: 'View Visiting Specialists'
    },
    {
      name: 'visitingButton2Text',
      title: 'Button 2 Text (பொத்தான் 2)',
      type: 'string',
      group: 'visitingCta',
      initialValue: 'Schedule Consultation'
    }
  ],
  preview: {
    select: {
      title: 'heroHeading',
      subtitle: 'heroSubtitle'
    }
  }
}
