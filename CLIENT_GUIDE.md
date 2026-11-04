# JB Healthcare (JP Hospital) - Website & Admin Portal Guide

Welcome to the comprehensive documentation for the **JB Healthcare** website and Hospital Admin Portal.

---

## 🏥 Quick Access Links

| Portal | URL | Purpose |
| :--- | :--- | :--- |
| **Live Website** | [https://jbhealthcaresivakasi.in](https://jbhealthcaresivakasi.in) | Public patient website & booking |
| **Hospital Admin Panel** | [https://jbhealthcare.sanity.studio/](https://jbhealthcare.sanity.studio/) | View Appointments, Inquiries & Edit Site Content |
| **Sanity Project Console** | [https://www.sanity.io/manage](https://www.sanity.io/manage) | Manage admins & API access |

---

## 🔐 1. Hospital Admin Panel (Sanity Studio)

Hospital administrators, doctors, and front-desk staff can log in securely at:
👉 **[https://jbhealthcare.sanity.studio/](https://jbhealthcare.sanity.studio/)**

### How to Log In:
1. Open [https://jbhealthcare.sanity.studio/](https://jbhealthcare.sanity.studio/) in any web browser (Desktop or Mobile).
2. Click **Log In** with your authorized Google or Sanity Account.
3. You will see the Hospital Dashboard on the left sidebar.

### Sections in the Admin Panel:
1. **📋 Appointments (முன்பதிவுகள்):**
   - Automatically records all appointment bookings submitted from the website.
   - Shows **Patient Name**, **Phone Number**, **Consultation Type** (Clinic Visit / Video Call), **Department**, **Doctor**, **Preferred Date**, and **Patient Notes**.
   - **Status Tracker:**
     - 🟡 `New / Pending Review` (Fresh booking)
     - 🟢 `Confirmed with Patient` (Front desk contacted and confirmed)
     - ✅ `Completed / Visited` (Patient consultation finished)
     - ❌ `Cancelled` (Patient cancelled or rescheduled)
2. **✉️ Patient Enquiries (விசாரணைகள்):**
   - Automatically logs all inquiries submitted via the Contact page.
   - Shows Name, Mobile Phone, Email, Subject, and detailed Message.
   - **Status Tracker:** 🟡 `New` ➡️ 🟢 `Followed Up` ➡️ 📁 `Closed`.
3. **👨‍⚕️ Doctors (மருத்துவர்கள்):**
   - Add new doctors, update qualifications, experience, and photos.
4. **🏥 Departments & Surgeries (துறைகள் & அறுவை சிகிச்சைகள்):**
   - Update department descriptions, key procedures, and clinical focus.
5. **🖼️ Hero Slider & Site Settings:**
   - Change headline banners, emergency contact numbers, and OPD timings.

---

## 📲 2. Patient Lead Flow (How Bookings Work)

1. **Appointment Form:**
   - Patient fills out the appointment form on `/appointment`.
   - **Step 1 (Database):** Details are immediately saved into the Sanity Database (`appointment` collection).
   - **Step 2 (Instant Alert):** The booking automatically triggers a pre-filled WhatsApp message directly to the Hospital Front Desk at **`+91 93455 10905`**.
2. **Contact Inquiry Form:**
   - Patient submits a message on `/contact`.
   - Saved to Sanity Database (`enquiry` collection).
   - Screen displays an instant confirmation card with the hospital phone number.

---

## 💻 3. Local Developer Setup (Running Locally)

1. Clone or open the project folder `JP_HOSPITAL` in VS Code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173/` in your browser.

---

## 🚀 4. Production Deployment

- **Website Frontend:** Hosted via Vercel (connected to GitHub repository `mdasper/jbhealthcare`). Pushing commits to `main` branch automatically triggers live production builds.
- **Admin Studio:** Hosted natively on Sanity Cloud at [https://jbhealthcare.sanity.studio/](https://jbhealthcare.sanity.studio/).

---

## 📞 Hospital Front Desk & Support
- **Address:** 2/571A, Bharathi Nagar, Reserve line, Sivakasi, Tamil Nadu 626124
- **Phone:** +91 93455 10905
- **Email:** jbhealthcare.sivakasi@gmail.com
