export const myStructure = (S) =>
  S.list()
    .title('🏥 JB Healthcare Hospital Admin')
    .items([
      // 1. HOME
      S.listItem()
        .title('1. 🏠 HOME (முகப்புப் பக்கம்)')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page Content')
        ),

      // 2. ABOUT US
      S.listItem()
        .title('2. ℹ️ ABOUT US (மருத்துவமனை அறிமுகம்)')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Us Page Content')
        ),

      // 3. DEPARTMENTS
      S.listItem()
        .title('3. 🩺 DEPARTMENTS (மருத்துவத் துறைகள்)')
        .child(
          S.list()
            .title('🩺 Departments Management (துறைகள் மேலாண்மை)')
            .items([
              S.listItem()
                .title('1. 📌 Page Header & Overview (பக்கத் தலைப்பு & அறிமுகம்)')
                .child(
                  S.document()
                    .schemaType('departmentsPage')
                    .documentId('departmentsPage')
                    .title('Departments Page Header & Overview')
                ),
              S.listItem()
                .title('2. 📋 All Departments List (14 துறைகள் - தனித்தனி விவரங்கள்)')
                .schemaType('service')
                .child(
                  S.documentTypeList('service')
                    .title('All Departments (14 துறைகள்)')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                )
            ])
        ),

      // 4. DOCTORS
      S.listItem()
        .title('4. 👨‍⚕️ DOCTORS (மருத்துவர்கள்)')
        .schemaType('doctor')
        .child(S.documentTypeList('doctor').title('All Doctors (மருத்துவர்கள் குழு)')),

      // 5. SURGERIES
      S.listItem()
        .title('5. 🔪 SURGERIES (அறுவை சிகிச்சைகள்)')
        .schemaType('surgery')
        .child(S.documentTypeList('surgery').title('Laparoscopic Surgeries (அறுவை சிகிச்சைகள்)')),

      // 6. FACILITIES
      S.listItem()
        .title('6. 🏢 FACILITIES (மருத்துவமனை வசதிகள்)')
        .schemaType('facility')
        .child(S.documentTypeList('facility').title('Hospital Facilities (வசதிகள்)')),

      // 7. EVENTS
      S.listItem()
        .title('7. 🎪 EVENTS (நிகழ்வுகள் & மருத்துவ முகாம்கள்)')
        .schemaType('event')
        .child(S.documentTypeList('event').title('Events & Medical Camps (முகாம்கள் & விழாக்கள்)')),

      // 8. CONTACT
      S.listItem()
        .title('8. 📞 CONTACT (தொடர்பு & எமர்ஜென்சி விவரங்கள்)')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Contact & Site Settings')
        ),

      S.divider(),

      // 9. APPOINTMENT (LEADS DATABASE)
      S.listItem()
        .title('9. 📋 APPOINTMENT (நோயாளி முன்பதிவுகள் - Live DB)')
        .schemaType('appointment')
        .child(
          S.documentTypeList('appointment')
            .title('Patient Appointments (முன்பதிவுகள்)')
            .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
        ),

      // 10. ENQUIRIES (LEADS DATABASE)
      S.listItem()
        .title('10. ✉️ CONTACT ENQUIRIES (வந்த விசாரணைகள் - Live DB)')
        .schemaType('enquiry')
        .child(
          S.documentTypeList('enquiry')
            .title('Patient Enquiries (விசாரணைகள்)')
            .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
        ),

      // 11. TESTIMONIALS
      S.listItem()
        .title('11. ⭐ TESTIMONIALS (நோயாளி கருத்துக்கள்)')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Patient Reviews & Ratings'))
    ])

