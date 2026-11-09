export default {
  name: 'eventsPage',
  title: 'Events Page Content (நிகழ்வுகள் பக்க விவரங்கள்)',
  type: 'document',
  groups: [
    { name: 'header', title: '1. Header & Overview (பக்கத் தலைப்பு)' },
    { name: 'tabHeaders', title: '2. Tab Category Descriptions (பிரிவு விளக்கங்கள்)' },
    { name: 'emptyState', title: '3. Upcoming Empty State (வரவிருக்கும் நிகழ்வுகள் இல்லாத போது)' }
  ],
  fields: [
    // 1. Header & Overview
    {
      name: 'heroHeading',
      title: 'Hero Heading (முதன்மை தலைப்பு)',
      type: 'string',
      group: 'header',
      initialValue: 'Events & Medical Camps'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle (துணை விளக்கம்)',
      type: 'text',
      rows: 3,
      group: 'header',
      initialValue: 'Explore our specialized health screening camps, upcoming hospital consultations, and community welfare programs in Sivakasi.'
    },

    // 2. Tab Category Descriptions
    {
      name: 'upcomingTabTitle',
      title: 'Upcoming Tab Header (வரவிருக்கும் நிகழ்வுகள் தலைப்பு)',
      type: 'string',
      group: 'tabHeaders',
      initialValue: 'Upcoming Events & Consultations'
    },
    {
      name: 'upcomingTabSubtitle',
      title: 'Upcoming Tab Description (துணை விளக்கம்)',
      type: 'string',
      group: 'tabHeaders',
      initialValue: 'Scheduled hospital health screening, consultations, and medical drives.'
    },
    {
      name: 'campsTabTitle',
      title: 'Medical Camps Tab Header (மருத்துவ முகாம்கள் தலைப்பு)',
      type: 'string',
      group: 'tabHeaders',
      initialValue: 'Free Community Medical Camps'
    },
    {
      name: 'campsTabSubtitle',
      title: 'Medical Camps Tab Description (துணை விளக்கம்)',
      type: 'string',
      group: 'tabHeaders',
      initialValue: 'Rural and community outreach providing free doctor consultations and basic tests.'
    },
    {
      name: 'completedTabTitle',
      title: 'Completed Tab Header (நடந்து முடிந்த விழாக்கள் தலைப்பு)',
      type: 'string',
      group: 'tabHeaders',
      initialValue: 'Hospital Milestones & Concluded Events'
    },
    {
      name: 'completedTabSubtitle',
      title: 'Completed Tab Description (துணை விளக்கம்)',
      type: 'string',
      group: 'tabHeaders',
      initialValue: 'Retrospective archive of past health awareness seminars and hospital milestones.'
    },

    // 3. Empty State Text
    {
      name: 'emptyUpcomingHeading',
      title: 'No Upcoming Heading (நிகழ்வுகள் இல்லாத தலைப்பு)',
      type: 'string',
      group: 'emptyState',
      initialValue: 'No Upcoming Events at the Moment'
    },
    {
      name: 'emptyUpcomingDescription',
      title: 'No Upcoming Description (விளக்கம்)',
      type: 'text',
      rows: 3,
      group: 'emptyState',
      initialValue: 'We are currently organizing our upcoming healthcare consultation camps. Please check back soon or browse our community medical camps and achievements!'
    }
  ],
  preview: {
    select: {
      title: 'heroHeading',
      subtitle: 'heroSubtitle'
    }
  }
}

