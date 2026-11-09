export default {
  name: 'homePage',
  title: '1. HOME PAGE (முகப்புப் பக்கம்)',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero Sliders (சுழலும் பேனர்கள்)', default: true },
    { name: 'whyChooseUs', title: '2. Why Choose Us (5 சிறப்புகள்)' },
    { name: 'founder', title: '3. Founder Dr. Saileshkumar' },
    { name: 'cofounder', title: '4. Co-Founder Suganya Sailesh' },
    { name: 'cta', title: '5. Consultation Call-to-Action' }
  ],
  fields: [
    // 1. Hero Sliders (சுழலும் பேனர்கள்)
    {
      name: 'heroSliders',
      title: 'Hero Sliders (முகப்புப் பக்கத்தில் சுழலும் பேனர்கள்)',
      type: 'array',
      group: 'hero',
      description: 'Add, reorder, or edit the large image sliders displayed at the top of the Home Page',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Banner Headline (முக்கிய தலைப்பு)', type: 'string' },
            { name: 'subtitle', title: 'Subtitle (துணை வாசகம்)', type: 'text', rows: 3 },
            { name: 'image', title: 'Background Photo (படம்)', type: 'image', options: { hotspot: true } }
          ],
          preview: {
            select: { title: 'title', media: 'image' }
          }
        }
      ]
    },

    // 2. Why Choose Us (5 சிறப்புகள்)
    {
      name: 'whyChooseUs',
      title: 'Why Choose Us Features (ஏன் ஜேபி மருத்துவமனை? - 5 சிறப்புகள்)',
      type: 'array',
      group: 'whyChooseUs',
      description: 'The 5 highlight feature cards displayed directly below the Hero Slider',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'icon', 
              title: 'Icon Type (சின்னம்)', 
              type: 'string',
              options: {
                list: [
                  { title: 'Award (Certified Experts)', value: 'Award' },
                  { title: 'Activity (Modern Technology)', value: 'Activity' },
                  { title: 'ShieldPlus (24/7 Support)', value: 'ShieldPlus' },
                  { title: 'Users (Patient-Centric Care)', value: 'Users' },
                  { title: 'CheckCircle (Strict Hygiene)', value: 'CheckCircle' }
                ]
              }
            },
            { name: 'title', title: 'Feature Title (தலைப்பு)', type: 'string' },
            { name: 'description', title: 'Description (விளக்கம்)', type: 'text', rows: 2 }
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' }
          }
        }
      ]
    },

    // 3. Founder & Chief Surgeon - Dr. B. Saileshkumar
    {
      name: 'doctorSaileshProfile',
      title: 'Founder & Chief Surgeon Profile (டாக்டர் சைலேஷ் குமார் விவரம்)',
      type: 'object',
      group: 'founder',
      fields: [
        { name: 'tag', title: 'Section Badge (பிரிவு பேட்ஜ்)', type: 'string', initialValue: 'Founder & Chief Surgeon' },
        { name: 'name', title: 'Doctor Name (பெயர்)', type: 'string', initialValue: 'Dr. B. Saileshkumar' },
        { name: 'degree', title: 'Degrees & Specialization (பட்டங்கள்)', type: 'string', initialValue: 'MBBS., M.S., FIAGES., FALS (Laparoscopic & General Surgeon)' },
        { name: 'quote', title: 'Doctor Quote / Philosophy (பொன்மொழி)', type: 'text', rows: 3 },
        {
          name: 'stats',
          title: 'Founder Highlights & Key Stats (3 முக்கிய சாதனைகள்)',
          type: 'array',
          description: 'The 3 high-contrast navy stat cards (10,000+ Surgeries, 2,000+ Laparoscopies, Collector Award)',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'number', title: 'Stat Number / Heading (எண் / சாதனை)', type: 'string' },
                { name: 'label', title: 'Label / Year (விவரம்)', type: 'string' }
              ],
              preview: { select: { title: 'number', subtitle: 'label' } }
            }
          ]
        },
        { name: 'credentialsHeading', title: 'Medical Journey Heading', type: 'string', initialValue: 'Medical Journey & Credentials' },
        { name: 'bio', title: 'Full Bio / Experience Text (மருத்துவ வரலாறு)', type: 'text', rows: 4 },
        { name: 'image', title: 'Doctor Photo (மருத்துவர் புகைப்படம்)', type: 'image', options: { hotspot: true } }
      ]
    },

    // 4. Co-Founder & Managing Director - V. Suganya Sailesh
    {
      name: 'suganyaProfile',
      title: 'Co-Founder & Managing Director Profile (சுகன்யா சைலேஷ் விவரம்)',
      type: 'object',
      group: 'cofounder',
      fields: [
        { name: 'tag', title: 'Section Badge (பிரிவு பேட்ஜ்)', type: 'string', initialValue: 'Co-Founder & Managing Director' },
        { name: 'name', title: 'Name (பெயர்)', type: 'string', initialValue: 'V. Suganya Sailesh' },
        { name: 'degree', title: 'Education / Degrees (கல்வித் தகுதி)', type: 'string', initialValue: 'B.Tech (IT) — Thiagarajar College of Engineering' },
        { name: 'quote', title: 'Leadership Quote / Mission (பொன்மொழி)', type: 'text', rows: 3 },
        {
          name: 'pillars',
          title: 'Leadership Pillars (3 முக்கிய தூண்கள்)',
          type: 'array',
          description: 'The 3 navy pillar badges (B.Tech IT, Hospital Administration, Certified Life Coach)',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Pillar Title', type: 'string' },
                { name: 'subtitle', title: 'Pillar Subtitle', type: 'string' }
              ],
              preview: { select: { title: 'title', subtitle: 'subtitle' } }
            }
          ]
        },
        {
          name: 'bioParagraphs',
          title: 'Leadership Bio Paragraphs (வாழ்க்கை வரலாறு பத்திகள்)',
          type: 'array',
          of: [{ type: 'text', rows: 3 }]
        },
        { name: 'image', title: 'Director Photo (இயக்குனர் புகைப்படம்)', type: 'image', options: { hotspot: true } }
      ]
    },

    // 5. Consultation Call-to-Action
    {
      name: 'consultationCTA',
      title: 'Bottom Consultation CTA (கீழ் பக்க கலந்தாய்வு அழைப்பு)',
      type: 'object',
      group: 'cta',
      fields: [
        { name: 'heading', title: 'Heading (தலைப்பு)', type: 'string', initialValue: 'Need a Medical Consultation?' },
        { name: 'subheading', title: 'Subheading (துணை வாசகம்)', type: 'string', initialValue: 'Our specialists are ready to provide you with the best healthcare.' },
        { name: 'phone', title: 'Emergency Contact Phone', type: 'string', initialValue: '+91 93455 10905' },
        { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Book Appointment' }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: '🏠 HOME PAGE (முகப்புப் பக்கம்)'
      }
    }
  }
}
