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
                .title('2. 📋 All Departments List (14 துறைகள் - வரிசைப்படி 1 to 14)')
                .child(
                  S.documentList()
                    .title('All Departments (1 முதல் 14 வரிசையில்)')
                    .schemaType('service')
                    .filter('_type == "service"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                )
            ])
        ),

      // 4. DOCTORS
      S.listItem()
        .title('4. 👨‍⚕️ DOCTORS (மருத்துவர்கள்)')
        .child(
          S.list()
            .title('👨‍⚕️ Doctors Management (மருத்துவர்கள் மேலாண்மை)')
            .items([
              S.listItem()
                .title('1. 📌 Page Content & Guidelines (பக்கத் தலைப்பு & அமைப்புகள்)')
                .child(
                  S.document()
                    .schemaType('doctorsPage')
                    .documentId('doctorsPage')
                    .title('Doctors Page Content & Guidelines')
                ),
              S.listItem()
                .title('2. 📋 All Doctors List (14 மருத்துவர்கள் - வரிசைப்படி 1 to 14)')
                .child(
                  S.documentList()
                    .title('All Doctors (1 முதல் 14 வரிசையில்)')
                    .schemaType('doctor')
                    .filter('_type == "doctor"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                )
            ])
        ),

      // 5. SURGERIES
      S.listItem()
        .title('5. 🔪 SURGERIES (அறுவை சிகிச்சைகள்)')
        .child(
          S.list()
            .title('🔪 Surgeries Management (அறுவை சிகிச்சைகள் மேலாண்மை)')
            .items([
              S.listItem()
                .title('1. 📌 Page Content & Gallery (பக்கத் தலைப்பு, அரங்க படங்கள் & பிரிவுகள்)')
                .child(
                  S.document()
                    .schemaType('surgeriesPage')
                    .documentId('surgeriesPage')
                    .title('Surgeries Page Content & Gallery')
                ),
              S.listItem()
                .title('2. 📋 All Laparoscopic Surgeries (6 அறுவை சிகிச்சைகள் - வரிசைப்படி 1 to 6)')
                .child(
                  S.documentList()
                    .title('All Surgeries (1 முதல் 6 வரிசையில்)')
                    .schemaType('surgery')
                    .filter('_type == "surgery"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                )
            ])
        ),

      // 6. FACILITIES
      S.listItem()
        .title('6. 🏢 FACILITIES (மருத்துவமனை வசதிகள்)')
        .child(
          S.list()
            .title('🏢 Facilities Management (வசதிகள் மேலாண்மை)')
            .items([
              S.listItem()
                .title('1. 📌 Page Content & Banner (பக்கத் தலைப்பு & அவசர உதவி)')
                .child(
                  S.document()
                    .schemaType('facilitiesPage')
                    .documentId('facilitiesPage')
                    .title('Facilities Page Content & Banner')
                ),
              S.listItem()
                .title('2. 📋 All Hospital Facilities (6 வசதிகள் - வரிசைப்படி 1 to 6)')
                .child(
                  S.documentList()
                    .title('All Facilities (1 முதல் 6 வரிசையில்)')
                    .schemaType('facility')
                    .filter('_type == "facility"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                )
            ])
        ),

      // 7. EVENTS
      S.listItem()
        .title('7. 🎪 EVENTS (நிகழ்வுகள் & மருத்துவ முகாம்கள்)')
        .child(
          S.list()
            .title('🎪 Events Management (நிகழ்வுகள் மேலாண்மை)')
            .items([
              S.listItem()
                .title('1. 📌 Page Content & Guidelines (பக்கத் தலைப்பு & பிரிவுகள்)')
                .child(
                  S.document()
                    .schemaType('eventsPage')
                    .documentId('eventsPage')
                    .title('Events Page Content & Guidelines')
                ),
              S.listItem()
                .title('2. 📋 All Events & Photo Albums (6 நிகழ்வுகள் - வரிசைப்படி 1 to 6)')
                .child(
                  S.documentList()
                    .title('All Events & Camps (1 முதல் 6 வரிசையில்)')
                    .schemaType('event')
                    .filter('_type == "event"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                )
            ])
        ),

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

      // 9. APPOINTMENT (CONTENT + LEADS DASHBOARD)
      S.listItem()
        .title('9. 📋 APPOINTMENT (முன்பதிவு மேலாண்மை)')
        .child(
          S.list()
            .title('📋 Appointment Management (முன்பதிவு மேலாண்மை)')
            .items([
              // 1. Page Content
              S.listItem()
                .title('1. 📌 Page Content & Instructions (பக்கத் தலைப்பு & அமைப்புகள்)')
                .child(
                  S.document()
                    .schemaType('appointmentPage')
                    .documentId('appointmentPage')
                    .title('Appointment Page Content')
                ),

              S.divider(),

              // 2. New / Pending Appointments (Highest Priority)
              S.listItem()
                .title('2. 🔴 NEW / PENDING REVIEW (புதிய முன்பதிவுகள் - உடனடி கவனிப்பிற்கு)')
                .child(
                  S.documentList()
                    .title('New Appointments (உறுதி செய்ய வேண்டியவை)')
                    .schemaType('appointment')
                    .filter('_type == "appointment" && (status == "new" || !defined(status))')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),

              // 3. Month-wise Folders
              S.listItem()
                .title('3. 🗓️ MONTH-WISE BOOKINGS (மாத வாரியாக)')
                .child(
                  S.list()
                    .title('Month-wise Appointments (மாத வாரியாக)')
                    .items([
                      S.listItem()
                        .title('📅 November 2026')
                        .child(
                          S.documentList()
                            .title('November 2026 Bookings')
                            .schemaType('appointment')
                            .filter('_type == "appointment" && (preferredDate match "2026-11*" || _createdAt match "2026-11*")')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('📅 December 2026')
                        .child(
                          S.documentList()
                            .title('December 2026 Bookings')
                            .schemaType('appointment')
                            .filter('_type == "appointment" && (preferredDate match "2026-12*" || _createdAt match "2026-12*")')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('📅 January 2027')
                        .child(
                          S.documentList()
                            .title('January 2027 Bookings')
                            .schemaType('appointment')
                            .filter('_type == "appointment" && (preferredDate match "2027-01*" || _createdAt match "2027-01*")')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('📅 February 2027')
                        .child(
                          S.documentList()
                            .title('February 2027 Bookings')
                            .schemaType('appointment')
                            .filter('_type == "appointment" && (preferredDate match "2027-02*" || _createdAt match "2027-02*")')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('📅 March 2027')
                        .child(
                          S.documentList()
                            .title('March 2027 Bookings')
                            .schemaType('appointment')
                            .filter('_type == "appointment" && (preferredDate match "2027-03*" || _createdAt match "2027-03*")')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        )
                    ])
                ),

              // 4. By Consultation Type
              S.listItem()
                .title('4. ⏰ BY CONSULTATION TYPE (வகை வாரியாக)')
                .child(
                  S.list()
                    .title('Consultation Type (வகை வாரியாக)')
                    .items([
                      S.listItem()
                        .title('🏥 Clinic Visits (நேரடி மருத்துவமனை வருகை)')
                        .child(
                          S.documentList()
                            .title('In-Person Clinic Visits')
                            .schemaType('appointment')
                            .filter('_type == "appointment" && consultationType == "In-Person"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('💻 Online Video Consultations (12:00-12:30 PM)')
                        .child(
                          S.documentList()
                            .title('Online Video Calls')
                            .schemaType('appointment')
                            .filter('_type == "appointment" && consultationType == "Online Consultation"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        )
                    ])
                ),

              // 5. Confirmed & Completed
              S.listItem()
                .title('5. 🟢 CONFIRMED & COMPLETED (உறுதி செய்யப்பட்டவை & முடிந்தவை)')
                .child(
                  S.documentList()
                    .title('Confirmed & Completed Appointments')
                    .schemaType('appointment')
                    .filter('_type == "appointment" && (status == "confirmed" || status == "completed")')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),

              // 6. All Patient Bookings (Complete Database)
              S.listItem()
                .title('6. 📋 ALL PATIENT BOOKINGS (முழு முன்பதிவு பட்டியல் - Newest First)')
                .child(
                  S.documentList()
                    .title('All Patient Bookings (புதியது முதல் பழையது வரை)')
                    .schemaType('appointment')
                    .filter('_type == "appointment"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                )
            ])
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
