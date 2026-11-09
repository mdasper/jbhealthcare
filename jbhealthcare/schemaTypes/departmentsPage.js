export default {
  name: 'departmentsPage',
  title: 'Departments Page Header & Overview (துறைகள் பக்கத் தலைப்பு & அறிமுகம்)',
  type: 'document',
  fields: [
    {
      name: 'heroHeading',
      title: 'Hero Main Heading (பக்கத்தின் முக்கிய தலைப்பு)',
      type: 'string',
      initialValue: 'Comprehensive Medical & Surgical Departments'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle (துணை வாசகம் / அறிமுகம்)',
      type: 'text',
      rows: 3,
      initialValue: 'Led by award-winning Chief Laparoscopic Surgeon Dr. B. Saileshkumar (10,000+ Surgeries) alongside a distinguished team of visiting super-specialists in surgical oncology, gastroenterology, plastic surgery, urology, paediatrics, and orthopaedics in Sivakasi.'
    },
    {
      name: 'badge',
      title: 'Section Badge Tag (பிரிவு பேட்ஜ்)',
      type: 'string',
      initialValue: '★ அனைத்து சிறப்பு பிரிவுகள்'
    },
    {
      name: 'sectionTitle',
      title: 'Section Title (பிரிவின் தலைப்பு)',
      type: 'string',
      initialValue: 'Specialized Clinical Departments'
    },
    {
      name: 'sectionDescription',
      title: 'Section Description (பிரிவின் விளக்கம்)',
      type: 'text',
      rows: 3,
      initialValue: 'Explore our full range of 12 clinical and surgical disciplines equipped with state-of-the-art operative technology and verified specialists.'
    }
  ],
  preview: {
    prepare() {
      return {
        title: '📌 Departments Page Header & Overview'
      }
    }
  }
}

