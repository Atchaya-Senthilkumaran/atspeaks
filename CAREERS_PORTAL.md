# AT Speaks — Sales Intern Recruitment Portal Documentation

## 1. Overview
The **Sales & Business Development Intern Recruitment Portal** is a dedicated full-stack feature built directly into the AT Speaks platform. It allows prospective candidates to learn about the internship opportunity, understand performance-based earning potential, complete a comprehensive 7-step application form with resume uploading, receive automated confirmation emails, and join the official AT Speaks WhatsApp recruitment group.

It also provides an authenticated **Admin Application Management Portal** to review submissions, download resumes/certificates, update candidate statuses, and export data as CSV/Excel.

---

## 2. Architecture & File Structure

```
├── src/
│   ├── pages/
│   │   ├── SalesInternPage.jsx          # Public recruitment page with all 10 brief sections
│   │   └── AdminInternshipsPage.jsx     # Protected candidate review & CSV export dashboard
│   ├── components/
│   │   ├── SalesInternForm.jsx          # 7-step interactive application form with validation
│   │   ├── ApplicationSuccess.jsx       # Success screen with Application ID & WhatsApp CTA
│   │   ├── Navbar.jsx                   # Updated with Careers link & hash navigation
│   │   └── Footer.jsx                   # Updated with Careers link & hash navigation
│   ├── config/
│   │   ├── api.js                       # API URL routing (Local dev vs Production)
│   │   └── links.js                     # Configurable WhatsApp invite link
│   └── App.jsx                          # React Router configuration
│
├── server/
│   ├── controllers/
│   │   └── internApplicationController.js # Validation, uploads, email dispatch, admin queries
│   ├── middleware/
│   │   └── adminAuth.js                 # JWT authentication for admin routes
│   ├── models/
│   │   └── InternApplication.js         # Mongoose schema for all 7 steps & candidate lifecycle
│   ├── routes/
│   │   └── internApplicationRoutes.js   # Public & admin REST endpoints + rate limiters
│   ├── services/
│   │   ├── cloudinaryService.js         # Cloudinary file storage with authenticated signed URLs & local fallback
│   │   └── internEmailService.js        # HTML email templates for team and applicant notifications
│   ├── .env.example                     # Reference environment variables
│   └── server.js                        # Mounted route /api/intern-applications
│
└── CAREERS_PORTAL.md                    # This documentation file
```

---

## 3. Page Routes & URLs

| Route | Purpose | Access |
|---|---|---|
| `/careers/sales-intern` | Primary public recruitment page and application form | Public |
| `/careers` | Automatically redirects to `/careers/sales-intern` | Public |
| `/admin/internships` | Admin dashboard for reviewing applications and managing statuses | Protected (Admin JWT) |

---

## 4. Feature Specifications

### 4.1. Public Recruitment Page (`SalesInternPage.jsx`)
Implements all 10 sections defined in the developer brief:
1. **Hero Section:** "WE'RE HIRING", main heading, subheading, 4 key highlight badges (Remote, Flexible, Performance-Based, Freshers Welcome), earning potential badge (`₹5,000 - ₹2,00,000`), and smooth-scroll `APPLY NOW` CTA.
2. **About the Opportunity:** EdTech platform mission and value proposition.
3. **What You'll Do:** 6 interactive cards for Lead Generation, Student Outreach, Program Promotion, Sales & Conversions, Relationship Building, and Performance Tracking.
4. **What You'll Gain:** 7 core learning and career benefits.
5. **Who Can Apply:** Target audience criteria with "Prior sales experience is not mandatory" note.
6. **Compensation & Earning Potential:** Clean banner emphasizing `₹5,000 - ₹2,00,000` stipend potential and explicitly noting that actual earnings vary and are not guaranteed. (Internal commission structure is strictly kept private).
7. **Internship Details:** Clean grid displaying Position, Department, Work Mode, Duration, Location, Compensation, Openings, and Experience.
8. **Application Process:** 4-step workflow visual (Submit Application → Application Screening → Interview / Discussion → Selection & Onboarding).
9. **Frequently Asked Questions (FAQ):** Accordion answering top 6 candidate questions.
10. **Final Call to Action & Mobile Sticky Bar:** Direct CTA button to trigger the application form, plus a sticky mobile button on small viewports.

---

### 4.2. Multi-Step Application Form (`SalesInternForm.jsx`)
Features a responsive progress bar, step navigation pills, per-step validation, and state preservation:
- **Step 1: Personal Information:** Full Name, Email Address, Mobile Number, WhatsApp Number, Current Location (City & State), Age.
- **Step 2: Educational Details:** College / University Name, Degree / Department, Current Year of Study, Graduation Year, Currently Studying (Yes/No).
- **Step 3: Digital Presence & Social Profiles:** Instagram, LinkedIn, YouTube, Facebook, Portfolio/Website, Other Profiles (All optional, can be skipped).
- **Step 4: Experience & Skills:** Previous experience (Yes/No), Products/services sold, Campus ambassador history, Multiple-choice skills selection (Communication, Negotiation, Lead Gen, Marketing, Networking, Public Speaking, Sales, Social Media Management), Previous experience description.
- **Step 5: Sales & Business Understanding:** 
  1. How would you find and approach 50 potential students?
  2. How would you convince a student who is interested but hesitant?
  3. If a student says the fee is too expensive, how would you respond?
  4. Cold-call and follow-up comfort level (Very Comfortable, Moderately Comfortable, Willing to Learn).
  5. Why do you think you would be a good fit for AT Speaks?
- **Step 6: Availability & Commitment:** Hours available per day (1-2h, 2-4h, 4-6h, 6+h), Days available per week, Preferred duration (1, 2, 3, 6 months), Earliest joining date, Comfortable working independently (Yes/No), Comfortable with performance-based earnings (Yes/No).
- **Step 7: Resume & Declaration:** 
  - Mandatory PDF resume upload (up to 5 MB).
  - Optional certificates upload (PDF/PNG/JPG up to 5 MB).
  - Optional additional notes.
  - 3 mandatory declaration checkboxes.

---

### 4.3. Application Success & WhatsApp Integration (`ApplicationSuccess.jsx`)
- Shows a confirmation badge with unique generated **Application ID** (`ATS-SI-YYYYMMDD-XXXX`).
- Displays confirmation details and notice of confirmation email sent.
- Primary CTA: **JOIN OUR WHATSAPP GROUP** opening official WhatsApp group in a new tab.
- Configurable invite link via `SALES_INTERN_WHATSAPP_GROUP_URL` in `src/config/links.js` or `VITE_SALES_INTERN_WHATSAPP_URL`.
- Disclaimer stating that joining the WhatsApp group does not guarantee selection.

---

### 4.4. Admin Portal (`AdminInternshipsPage.jsx`)
- **Authentication:** Protected login requiring `ADMIN_USERNAME` and `ADMIN_PASSWORD`. Issues a signed 12-hour JWT.
- **Status Counts & Filters:** Instant count badges for `Submitted`, `Under Review`, `Shortlisted`, `Interview Scheduled`, `Selected`, `Rejected`.
- **Search:** Real-time search across candidate name, email, phone number, and Application ID.
- **Candidate Details Modal:** View all answers from all 7 steps in a clean layout.
- **Secure File Download:** Download candidate resume and certificates via authenticated endpoint.
- **Status Updates:** Update candidate status dropdown on the fly.
- **CSV / Excel Export:** One-click export of filtered or all applications with UTF-8 BOM encoding for Excel compatibility.

---

## 5. Backend REST API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/intern-applications` | Submit application with multipart files (rate limited) | None |
| `POST` | `/api/intern-applications/admin/login` | Authenticate admin and receive JWT | None |
| `GET` | `/api/intern-applications` | List applications with search & status filters | Bearer JWT |
| `GET` | `/api/intern-applications/:id` | Get single application details | Bearer JWT |
| `PATCH` | `/api/intern-applications/:id/status` | Update candidate status | Bearer JWT |
| `GET` | `/api/intern-applications/:id/file` | Secure download for resume or certificates | Bearer JWT / Query token |
| `GET` | `/api/intern-applications/export/csv` | Download CSV of applications | Bearer JWT / Query token |

---

## 6. Email Automation (`internEmailService.js`)
Uses Nodemailer (`smtp.gmail.com:587`):
1. **Recruitment Team Notification (`connect.atspeaks@gmail.com`):**
   - Subject: `New Sales Intern Application - [Candidate Name] - [Application ID]`
   - Contains candidate contact details, college details, all sales assessment responses, and the resume attached directly as a PDF file.
2. **Applicant Confirmation:**
   - Subject: `Application Received - Sales & Business Development Intern | AT Speaks`
   - Contains candidate greeting, application ID, next steps, and a direct button to join the official AT Speaks WhatsApp recruitment group.

---

## 7. Environment Variables Reference

Create or edit `server/.env`:

```env
# MongoDB Connection (MongoDB Atlas in production or mongodb://127.0.0.1:27017/atspeaks in development)
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/atspeaks?retryWrites=true&w=majority

# Nodemailer Email Configuration
# Note: Use a 16-character Gmail App Password with 2FA enabled
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password

# Port and Environment
PORT=5000
NODE_ENV=development

# Recruitment Notifications & WhatsApp Group
RECRUITMENT_EMAIL=connect.atspeaks@gmail.com
SALES_INTERN_WHATSAPP_URL=https://chat.whatsapp.com/EtsdMfwoC8oJWnQdHi0uO0

# Optional: Cloudinary Storage (if omitted, falls back to private local storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Dashboard Security
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_strong_admin_password
ADMIN_JWT_SECRET=your_secure_random_jwt_secret
```

---

## 8. Running Locally

1. **Install Dependencies:**
   ```bash
   # Root / Frontend
   npm install

   # Backend
   npm --prefix server install
   ```

2. **Start Backend Server:**
   ```bash
   npm --prefix server start
   ```

3. **Start Frontend Dev Server:**
   ```bash
   npm run dev
   ```

4. **Access Applications:**
   - Public Recruitment Page: `http://localhost:5173/careers/sales-intern`
   - Admin Dashboard: `http://localhost:5173/admin/internships`
