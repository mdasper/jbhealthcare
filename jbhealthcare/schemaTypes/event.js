export default {
  name: 'event',
  title: '7. EVENTS & CAMPS (நிகழ்வுகள் & முகாம்கள்)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title (நிகழ்வின் பெயர்)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Expo camp, VSKD SCHOOL CAMP, RSR SCHOOL CAMP, Pongal celebration'
    },
    {
      name: 'subtitle',
      title: 'Tamil Subtitle (தமிழ் விளக்கம்)',
      type: 'string',
      description: 'e.g. தொழில் & வணிக கண்காட்சி சிறப்பு மருத்துவ முகாம், வி.எஸ்.கே.டி பள்ளி மாணவர்களுக்கான இலவச மருத்துவ முகாம்'
    },
    {
      name: 'category',
      title: 'Category Tab (எந்த Tab-ல் காட்ட வேண்டும்?)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: '⛺ Medical Camps (மருத்துவ முகாம்கள்)', value: 'camps' },
          { title: '🏆 Completed Events (நடந்து முடிந்த விழாக்கள்)', value: 'completed' },
          { title: '📅 Upcoming Programs (வரவிருக்கும் முகாம்கள்)', value: 'upcoming' }
        ],
        layout: 'radio'
      },
      initialValue: 'camps'
    },
    {
      name: 'date',
      title: 'Event Date (நடைபெற்ற / நடைபெறும் தேதி)',
      type: 'date',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'time',
      title: 'Event Timings (நேரம்)',
      type: 'string',
      description: 'e.g. 09:00 AM – 05:00 PM / 10:00 AM – 02:00 PM'
    },
    {
      name: 'location',
      title: 'Location / Venue (நடைபெற்ற இடம்)',
      type: 'string',
      description: 'e.g. Sivakasi Trade Exhibition Ground / VSKD School Campus / JB Healthcare Campus'
    },
    {
      name: 'badge',
      title: 'Badge Tag (முக்கிய குறிச்சொல்)',
      type: 'string',
      description: 'e.g. Mega Expo Camp, School Wellness, Rural Outreach, Hospital Festival'
    },
    {
      name: 'description',
      title: 'Detailed Description (விரிவான விவரம்)',
      type: 'text',
      rows: 4
    },
    {
      name: 'highlights',
      title: 'Event Highlights (முக்கிய சிறப்பம்சங்கள்)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key takeaways or services offered in this camp (bullet points)'
    },
    {
      name: 'thumbnail',
      title: 'Card Thumbnail Cover (கார்டின் முகப்புப் படம்)',
      type: 'image',
      options: { hotspot: true },
      description: 'The main landscape photo shown on the event card'
    },
    {
      name: 'gallery',
      title: '📸 Event Photo Gallery (முழு போட்டோ கேலரி - Multiple Photos)',
      type: 'array',
      description: 'Upload all photos from this event here. Visitors can click and view the full gallery album!',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    {
      name: 'order',
      title: 'Display Order (வரிசை எண்)',
      type: 'number',
      initialValue: 1
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'date',
      media: 'thumbnail'
    },
    prepare({ title, category, date, media }) {
      const catLabel = category === 'upcoming' ? '📅 Upcoming' : (category === 'camps' ? '⛺ Medical Camp' : '🏆 Completed');
      return {
        title: title || 'Untitled Event',
        subtitle: `${catLabel} • Date: ${date || 'No date'}`,
        media
      }
    }
  }
}
