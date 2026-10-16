# MY CAMU — Mohan Babu University Student Portal

A comprehensive, responsive university student portal inspired by modern academic ERP and LMS platforms, built for **Mohan Babu University (MBU)**.

---

## 🌟 Overview & Key Features

### 1. 🎓 Student Dashboard
- **Personalized Hero Banner**: Displays student portrait, registration number (`21BCE1042`), degree (`B.Tech CSE - AI & ML`), section, batch (`2022 - 2026`), and university name.
- **10 Real-Time KPI Cards**:
  - Overall Attendance (88.41% - Safe)
  - Semester SGPA (9.12) & Cumulative CGPA (8.94)
  - Enrolled Courses (7 Courses, 24 Credits)
  - Pending Assignments & Upcoming Examination Alerts
  - Fee Payment Status (Paid in Full / ₹0 Dues)
  - Placement Status (Google India - Shortlisted)
- **Interactive Visualizations (Chart.js)**:
  - Monthly attendance progression line chart
  - Subject-wise attendance bar chart
  - 6-Semester SGPA trajectory chart
  - Assignment submission status doughnut chart
- **Live Class Schedule**: Highlights ongoing periods with instructor details and lecture hall numbers.

### 2. 📊 Attendance Management & Smart Calculator
- Comprehensive ledger covering theory and laboratory sessions.
- **Configurable Attendance Shortage Predictor**:
  - Enter desired target percentage (&ge;75%, 80%, etc.).
  - Calculates exactly how many classes you can safely miss or how many consecutive classes you must attend to satisfy exam eligibility criteria.
- Biometric attendance history with subject and status filters (Present, Absent, Late).

### 3. 📚 Academics & LMS Suite
- **My Courses & Course Details**: Detailed curriculum units (Units 1 to 5) with toggleable topic lists for all enrolled subjects.
- **Weekly Master Timetable**: Period-by-period interactive schedule for Monday through Saturday with day filters and printable view.
- **Academic Results & Marksheet**: Semester-wise SGPA, internal (out of 40) and external (out of 60) marks breakdown, and downloadable official grade sheet with university seal.
- **Examinations & Hall Ticket**: Upcoming End-Semester timetable, venue seats, and printable digital admit card with QR code.
- **LMS Courseware & Study Materials**: Downloadable lecture slides, code notebooks, previous year question papers, and video lectures.
- **Assignments**: Submission interface with file upload and faculty evaluation feedback.
- **Interactive Assessments Engine**: Real-time timed MCQ quiz with question palette navigation, instant score calculation, and question-by-question answer key reviews with explanations.

### 4. 💼 Career, Placements & Projects
- **Campus Placement Portal**: Tier-1 Super Dream (&gt;₹30 LPA) drives (Google, Microsoft, Amazon, NVIDIA, Goldman Sachs, Zoho).
- **Application Tracking**: Multi-round status tracker (OA &rarr; Technical Round 1 &rarr; Technical Round 2 &rarr; Offer Released).
- **Internships & Fellowships**: Summer 2026 industrial internships and stipendiary R&D fellowships.
- **Engineering Projects**: Capstone AI project manager with milestone progress, GitHub repository links, and live demonstration URLs.

### 5. 🏛️ Campus Modules & Account Tools
- **Fees & Payments**: Tuition breakdown, concession ledger, transaction history, and demo payment simulation with receipt generator.
- **Library & E-Resources**: Book catalog search, borrowed volume due-date tracking, renewal button, and institutional access links (IEEE Xplore, ACM DL).
- **Certificates & Document Vault**: Bonafide certificate requests, transcript requests, verified marksheet vault, and digital student ID card.
- **Student Grievances & Helpdesk**: Ticket submission and resolution timeline.
- **Universal Navigation & Themes**: Collapsible deep-navy sidebar, global live search (`Ctrl + K`), notification drawer, and dark mode toggle with saved local preferences.

---

## 🛠️ Technology Stack

- **HTML5 & Vanilla CSS3**
- **Vanilla JavaScript (ES6+)**
- **Bootstrap 5.3.3**
- **Bootstrap Icons 1.11.3**
- **Chart.js 4.4.2**
- **LocalStorage API** for browser-side persistence

---

## 🚀 Running Locally

You can run this application directly in any modern browser without installing Node.js or backend frameworks.

### Option 1: Direct File Open
Double-click `index.html` or `login.html` to open directly in your web browser.

### Option 2: Local Python Server (Recommended)
```bash
python -m http.server 8080
```
Then visit:
```
http://localhost:8080
```

---

## 🔑 Demo Credentials

- **Student ID / Reg No**: `21BCE1042`
- **Password**: `demo123`
- *Or click "Auto-Fill" on the login page for 1-click access.*

---

## 📄 License & Attribution
Designed and built for **Mohan Babu University (MBU)** student demonstration portal. All data presented is simulated for educational and platform evaluation purposes.
