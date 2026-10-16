/**
 * MY CAMU - LocalStorage Persistence & State Manager
 * Handles local persistence of demo student data with automatic fallback to defaults.
 */

const STORAGE_PREFIX = "mycamu_v1_";

const CamuStorage = {
  /**
   * Initialize default data if not already saved in localStorage
   */
  init() {
    if (!localStorage.getItem(STORAGE_PREFIX + "initialized")) {
      this.resetAll();
    } else {
      // Sync university name
      const p = this.getProfile();
      if (p && p.university !== "Mohan Babu University") {
        p.university = "Mohan Babu University";
        this.set("profile", p);
      }
    }
  },

  /**
   * Reset all data to default demo state
   */
  resetAll() {
    Object.keys(CAMU_DEFAULT_DATA).forEach(key => {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(CAMU_DEFAULT_DATA[key]));
    });
    // Set default auth state (logged in for demo convenience)
    localStorage.setItem(STORAGE_PREFIX + "auth", JSON.stringify({
      isLoggedIn: true,
      studentId: "21BCE1042",
      loginTime: new Date().toISOString()
    }));
    localStorage.setItem(STORAGE_PREFIX + "initialized", "true");
  },

  /**
   * Generic get
   */
  get(key) {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : (CAMU_DEFAULT_DATA[key] || null);
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return CAMU_DEFAULT_DATA[key] || null;
    }
  },

  /**
   * Generic set
   */
  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error writing ${key} to storage:`, e);
      return false;
    }
  },

  // Auth Management
  getAuth() {
    try {
      const auth = localStorage.getItem(STORAGE_PREFIX + "auth");
      return auth ? JSON.parse(auth) : { isLoggedIn: true, studentId: "21BCE1042" };
    } catch (e) {
      return { isLoggedIn: true, studentId: "21BCE1042" };
    }
  },

  login(studentId, password) {
    // Demonstration authentication mode
    // Validates sample student or accepts demo credentials
    const authState = {
      isLoggedIn: true,
      studentId: studentId.trim(),
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_PREFIX + "auth", JSON.stringify(authState));
    return true;
  },

  logout() {
    const authState = { isLoggedIn: false, studentId: null, loginTime: null };
    localStorage.setItem(STORAGE_PREFIX + "auth", JSON.stringify(authState));
  },

  // Profile Management
  getProfile() {
    return this.get("profile");
  },

  updateProfile(updatedFields) {
    const current = this.getProfile();
    const merged = { ...current, ...updatedFields };
    this.set("profile", merged);
    return merged;
  },

  // Attendance Management
  getAttendance() {
    return this.get("attendance");
  },

  // Courses & LMS
  getCourses() {
    return this.get("courses");
  },

  getCourseByCode(code) {
    const courses = this.getCourses();
    return courses.find(c => c.code.toLowerCase() === (code || "").toLowerCase()) || courses[0];
  },

  // Assignments
  getAssignments() {
    return this.get("assignments");
  },

  submitAssignment(assignmentId, fileName, comments) {
    const assignments = this.getAssignments();
    const updated = assignments.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: "Submitted",
          submissionFile: fileName || "Assignment_Submission.pdf",
          submissionDate: new Date().toISOString().split("T")[0],
          studentComments: comments || ""
        };
      }
      return a;
    });
    this.set("assignments", updated);

    // Create a notification for successful submission
    this.addNotification({
      title: "Assignment Submitted",
      message: `Your work for ${assignmentId} has been successfully submitted.`,
      category: "assignment",
      icon: "bi-check2-circle",
      color: "success",
      link: "assignments.html"
    });

    return updated;
  },

  // Quizzes & Assessments
  getQuizzes() {
    return this.get("quizzes");
  },

  getQuizById(quizId) {
    const quizzes = this.getQuizzes();
    return quizzes.find(q => q.id === quizId) || quizzes[0];
  },

  saveQuizResult(quizId, score, answers) {
    const quizzes = this.getQuizzes();
    const updated = quizzes.map(q => {
      if (q.id === quizId) {
        return {
          ...q,
          lastScore: score,
          completedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          userAnswers: answers
        };
      }
      return q;
    });
    this.set("quizzes", updated);
    return updated;
  },

  // Fees & Payments
  getFees() {
    return this.get("fees");
  },

  recordPayment(amount, paymentMode, term) {
    const fees = this.getFees();
    const receiptNo = "REC-" + new Date().getFullYear() + "-DEMO-" + Math.floor(1000 + Math.random() * 9000);
    const newTransaction = {
      receiptNo: receiptNo,
      date: new Date().toISOString().split("T")[0],
      term: term || "Even Semester Academic Fees (Demo)",
      amount: Number(amount),
      paymentMode: paymentMode || "Online Banking Simulation",
      transactionRef: "DEMO-TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      status: "Success",
      downloadable: true
    };

    const newPaid = (fees.paidAmount || 0) + Number(amount);
    const newOutstanding = Math.max(0, (fees.totalFee || 0) - newPaid);

    const updated = {
      ...fees,
      paidAmount: newPaid,
      outstandingBalance: newOutstanding,
      paymentStatus: newOutstanding === 0 ? "Paid in Full" : "Partially Paid",
      history: [newTransaction, ...(fees.history || [])]
    };

    this.set("fees", updated);

    // Add notification
    this.addNotification({
      title: "Fee Payment Verified",
      message: `Simulated receipt #${receiptNo} generated for ₹${amount.toLocaleString('en-IN')}.`,
      category: "fee",
      icon: "bi-receipt-cutoff",
      color: "success",
      link: "fees.html"
    });

    return { updated, receipt: newTransaction };
  },

  // Projects
  getProjects() {
    return this.get("projects");
  },

  addProject(project) {
    const projects = this.getProjects();
    const newProj = {
      ...project,
      id: "proj-" + (projects.length + 1) + "-" + Date.now().toString().slice(-4),
      progress: Number(project.progress) || 10,
      status: project.status || "In Progress"
    };
    projects.unshift(newProj);
    this.set("projects", projects);
    return newProj;
  },

  updateProject(id, updatedFields) {
    const projects = this.getProjects();
    const updated = projects.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    this.set("projects", updated);
    return updated;
  },

  deleteProject(id) {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    this.set("projects", filtered);
    return filtered;
  },

  // Placements
  getPlacements() {
    return this.get("placements");
  },

  applyPlacement(driveId, role, company) {
    const placements = this.getPlacements();
    const newApp = {
      id: "app-" + Date.now().toString().slice(-4),
      company: company,
      role: role,
      package: "₹" + (Math.floor(Math.random() * 20) + 12) + ".0 LPA",
      location: "Bengaluru / Remote",
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Application Submitted",
      badgeColor: "info",
      rounds: [
        { name: "Online Resume & Eligibility Screening", status: "In Progress", date: new Date().toISOString().split("T")[0] },
        { name: "Technical Online Assessment", status: "Pending", date: "--" }
      ]
    };

    placements.applications.unshift(newApp);
    placements.metrics.applicationsSubmitted += 1;
    this.set("placements", placements);

    this.addNotification({
      title: `Applied to ${company}`,
      message: `Your demo application for ${role} has been submitted successfully.`,
      category: "placement",
      icon: "bi-briefcase-fill",
      color: "primary",
      link: "placements.html"
    });

    return newApp;
  },

  // Notifications
  getNotifications() {
    return this.get("notifications");
  },

  markNotificationRead(id) {
    const notifs = this.getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    this.set("notifications", updated);
    return updated;
  },

  markAllNotificationsRead() {
    const notifs = this.getNotifications();
    const updated = notifs.map(n => ({ ...n, read: true }));
    this.set("notifications", updated);
    return updated;
  },

  addNotification(notif) {
    const notifs = this.getNotifications();
    const newNotif = {
      id: "notif-" + Date.now(),
      time: "Just now",
      read: false,
      ...notif
    };
    notifs.unshift(newNotif);
    this.set("notifications", notifs);
    return newNotif;
  },

  // Announcements
  getAnnouncements() {
    return this.get("announcements");
  },

  markAnnouncementRead(id) {
    const list = this.getAnnouncements();
    const updated = list.map(a => a.id === id ? { ...a, read: true } : a);
    this.set("announcements", updated);
    return updated;
  },

  // Calendar
  getCalendarEvents() {
    return this.get("calendarEvents");
  },

  addCalendarEvent(event) {
    const events = this.getCalendarEvents();
    events.push(event);
    this.set("calendarEvents", events);
    return events;
  },

  // Grievances
  getGrievances() {
    return this.get("grievances");
  },

  addGrievance(ticket) {
    const list = this.getGrievances();
    const newTicket = {
      id: "GRV-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
      submissionDate: new Date().toISOString().split("T")[0],
      status: "In Progress",
      priority: ticket.priority || "Normal",
      category: ticket.category,
      subject: ticket.subject,
      description: ticket.description,
      timeline: [
        {
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
          author: "Student",
          text: "Ticket submitted with attachment verification."
        },
        {
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
          author: "Helpdesk Auto-Route",
          text: `Routed to ${ticket.category} Department Head for investigation.`
        }
      ]
    };
    list.unshift(newTicket);
    this.set("grievances", list);
    return newTicket;
  },

  // Certificates & Requests
  getCertificates() {
    return this.get("certificates");
  },

  requestCertificate(type, purpose) {
    const certs = this.getCertificates();
    const newReq = {
      id: "req-" + Math.floor(100 + Math.random() * 900),
      type: type,
      purpose: purpose,
      submittedDate: new Date().toISOString().split("T")[0],
      status: "Processing in Academic Section",
      remarks: "Verification initiated. Ready in 2-3 business days."
    };
    certs.recentRequests.unshift(newReq);
    this.set("certificates", certs);
    return newReq;
  },

  // Settings
  getSettings() {
    return this.get("settings");
  },

  saveSettings(settings) {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.set("settings", updated);
    return updated;
  }
};

// Initialize on script load
CamuStorage.init();
