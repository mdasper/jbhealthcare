# JB Health Care — Website Development Plan

> **Based on Client Requirements Document (Oct 2026)**
> Namma already pannirukkra base project-a ithai mela build pannidalam.

---

## 🏗️ Phase 1 — MUST HAVE (Go-Live Minimum)
*Estimated: 4–6 weeks*

### Pages to Build / Upgrade

| # | Page / Module | Status | Notes |
|---|---|---|---|
| 1 | **Home Page** — Full redesign | 🔄 Partial | Hero slider done. Departments, Doctors, Milestones, Testimonials, Videos, Events sections add pannanum |
| 2 | **About JB Health Care** | 🔄 Partial | Story, Vision/Mission, Leadership, Milestones section expand pannanum |
| 3 | **Departments & Specialities** | ❌ New | Each dept-ku separate page, services list, doctors, booking CTA |
| 4 | **Doctors** | 🔄 Partial | Individual profile pages, filter by dept, consultation timings add pannanum |
| 5 | **Facilities** | ❌ New | OT, ICU, Lab, Pharmacy, Rooms — image gallery with descriptions |
| 6 | **Surgeries & Treatments** | ❌ New | Laparoscopic + other key services — patient-friendly pages |
| 7 | **Appointment Booking** | ❌ New | Dept → Doctor → Date → Slot → Patient Details → Confirmation flow |
| 8 | **Online Consultation** | ❌ New | Separate journey, 12:00–12:30 PM exclusive window |
| 9 | **Contact & Location** | 🔄 Partial | Google Maps, WhatsApp, timings, OPD hours expand pannanum |
| 10 | **Mobile Quick Actions** | ❌ New | Sticky bottom bar: Call, WhatsApp, Book, Directions |

### Core Features (Phase 1)

| Feature | Details |
|---|---|
| **WhatsApp Integration** | Floating button (done) + Prefilled messages per page + Dept enquiry shortcuts |
| **CMS (Sanity)** | Doctors, Depts, Facilities, Sliders, Milestones, Contact info — all editable |
| **Mobile-First Design** | Fully responsive across all pages |
| **SSL / Security** | Already on Vercel (SSL free) |
| **SEO Basics** | Page titles, meta descriptions, local SEO for Sivakasi |

---

## 🚀 Phase 2 — HIGH PRIORITY (Launch + 2–4 weeks)

| # | Module | Notes |
|---|---|---|
| 1 | **Health & Wellness Blog** | Doctor articles, categories, search/filter, SEO-friendly |
| 2 | **Health Camps & Events** | Upcoming registration + Past archive (already partial — expand pannanum) |
| 3 | **Video Library** | YouTube embed, doctor talks, surgery awareness |
| 4 | **Patient Information** | Before-visit guide, online consultation instructions |
| 5 | **Health Packages** | Preventive checkup packages, enquiry CTA |
| 6 | **Testimonials** | Approved reviews, optional Google review link |
| 7 | **Enquiry & Lead Management** | Forms, admin notifications, status tracking |
| 8 | **Trust & Milestones Section** | 10+ years, 10,000+ surgeries, 1,000+ families |
| 9 | **Google Analytics** | Setup + Search Console connection |
| 10 | **Find the Right Doctor** | Concern → Department → Doctor guided flow |

---

## 🔮 Phase 3 — OPTIONAL / Future (Quote Separately)

| Module | Notes |
|---|---|
| Advanced WhatsApp API Automation | Automated booking confirmation, reminders |
| Online Consultation Video Platform | Zoom/Google Meet integration or custom |
| Payment Gateway | If packages need online payment |
| Patient Portal | Records, prescription history |
| HMS Integration | Link to existing hospital management software |
| AI FAQ Bot | Automated patient query handling |

---

## 📋 Sanity CMS — What Client Can Manage (No Developer Needed)

```
✅ Doctors & availability
✅ Departments & services
✅ Facilities content
✅ Blog / articles
✅ Videos
✅ Events / camps
✅ Testimonials
✅ Home sliders / banners
✅ Milestone numbers
✅ Contact info & timings
✅ Social links
⚙️  Appointment slots (booking system decision needed first)
```

---

## 🛠️ Technical Decision Points

### Appointment Booking — 3 Options

| Option | Cost | Complexity |
|---|---|---|
| **Simple Form + WhatsApp** | Free | Low — Namma ippo pannalam |
| **Custom Slot System (Sanity)** | Dev time only | Medium — Doctor-wise slots, admin manageable |
| **Third-party (Calendly / SimplyBook)** | ₹500–2000/month | Low dev, more features out-of-box |

**Recommendation:** Phase 1-ku Custom Slot System using Sanity (doctor-wise days/timings, client manage pannalam). Advanced automation Phase 2/3.

### Online Consultation

| Option | Notes |
|---|---|
| **Google Meet / Zoom link (manual)** | Simple — Doctor sends link manually after booking |
| **Auto-send Meet link** | 12:00–12:30 PM window, booking confirmation-la auto link send |

**Recommendation:** Phase 1 — Booking form + Google Meet link via WhatsApp/email confirmation. Phase 3 — custom video platform.

### WhatsApp

- **Phase 1:** Click-to-chat + prefilled messages per page (FREE — partially done already)
- **Phase 2:** WhatsApp Business API — automated confirmations / reminders (₹ separate)

---

## 📅 Build Order (Week by Week)

```
Week 1–2:  Appointment booking system + Online Consultation page
Week 2–3:  Departments pages + Facilities page
Week 3–4:  Individual Doctor profiles + Find Right Doctor flow
Week 4–5:  Surgeries/Treatments pages + Patient Information page
Week 5–6:  Health Blog setup + Video Library
Week 6:    Lead management + Final SEO + Testing + Go-live
```

---

## 📦 Content Client Must Supply

> [!IMPORTANT]
> Intha items client kita irunthu confirm panni vaangunga before development starts:

- [ ] Hospital logo (high-res PNG/SVG)
- [ ] All doctor photos + profiles (qualifications, experience, consultation timings)
- [ ] Department list + services under each department
- [ ] Facility photos (OT, ICU, rooms, reception, lab, pharmacy etc.)
- [ ] Verified milestone numbers (10,000+ surgeries, years etc.)
- [ ] Surgery / treatment list
- [ ] Consultation timings per doctor (in-person + online)
- [ ] Contact details, OPD hours, online consultation hours
- [ ] Google Maps location pin / embed link
- [ ] Approved patient testimonials
- [ ] Social media handles (Instagram, Facebook, YouTube)
- [ ] Camp/event details and photos

---

## ❓ Questions to Clarify with Client

1. **Appointment booking** — Simple WhatsApp form or real-time slot system?
2. **Online consultation video** — Google Meet manual or auto-send link?
3. **WhatsApp** — Basic click-to-chat (free) or Business API automation (paid)?
4. **Payment** — Online payment needed for health packages?
5. **Language** — English only or Tamil also needed?
6. **Existing software** — Any HMS / appointment software currently in use?

---

> [!TIP]
> **Next Step:** Intha plan-a client kita share pannunga. Content supply list confirm aana udane, Phase 1 build immediately start pannidalam. Appointment booking system decision mukkiyam — athula based-a namma architecture decide pannuvom.
