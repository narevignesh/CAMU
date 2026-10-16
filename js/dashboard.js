/**
 * MY CAMU - Dashboard Visualizations & Controller
 * Integrates Chart.js and dynamic student dashboard widgets
 */

const CamuDashboard = {
  init() {
    this.renderHero();
    this.renderStatCards();
    this.renderCharts();
    this.renderTodaySchedule();
    this.renderDeadlines();
    this.renderAnnouncements();
    this.renderStudyMaterials();
    this.renderPlacementDrives();
    this.renderProjectProgress();
  },

  renderHero() {
    const profile = CamuStorage.getProfile();
    const heroContainer = document.getElementById("dashboardHeroContainer");
    if (!heroContainer) return;

    const todayStr = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    heroContainer.innerHTML = `
      <div class="dashboard-hero-card">
        <div class="hero-content">
          <div class="hero-student-meta">
            <div class="hero-avatar-wrap">
              <img src="${profile.photo}" alt="${profile.name}" class="hero-avatar" onerror="this.src='https://ui-avatars.com/api/?name=Vigneshwaran+R&background=2563eb&color=fff'">
              <span class="hero-status-dot" title="Active Student"></span>
            </div>
            <div class="hero-text">
              <span class="hero-greeting"><i class="bi bi-mortarboard-fill me-1"></i> ${profile.university}</span>
              <h2 class="hero-name">Welcome back, ${profile.name}!</h2>
              <div class="hero-badges-row">
                <span class="hero-badge highlight"><i class="bi bi-person-badge"></i> ID: ${profile.id}</span>
                <span class="hero-badge"><i class="bi bi-book"></i> ${profile.branch}</span>
                <span class="hero-badge"><i class="bi bi-calendar-event"></i> ${profile.currentSemester} (${profile.batch})</span>
                <span class="hero-badge"><i class="bi bi-building"></i> Sec: ${profile.section}</span>
                <span class="hero-badge"><i class="bi bi-clock"></i> ${todayStr}</span>
              </div>
            </div>
          </div>

          <div class="hero-actions">
            <a href="attendance.html" class="btn-hero-primary">
              <i class="bi bi-calendar-check"></i> Check Attendance
            </a>
            <a href="assignments.html" class="btn-hero-secondary">
              <i class="bi bi-journal-code"></i> Submit Assignment
            </a>
            <a href="examinations.html" class="btn-hero-secondary">
              <i class="bi bi-card-checklist"></i> Hall Ticket
            </a>
          </div>
        </div>
      </div>
    `;
  },

  renderStatCards() {
    const container = document.getElementById("dashboardStatsGrid");
    if (!container) return;

    const att = CamuStorage.getAttendance();
    const profile = CamuStorage.getProfile();
    const courses = CamuStorage.getCourses();
    const assignments = CamuStorage.getAssignments();
    const pendingAsg = assignments.filter(a => a.status === "Pending").length;
    const fees = CamuStorage.getFees();
    const projects = CamuStorage.getProjects();
    const placements = CamuStorage.getPlacements();
    const notifs = CamuStorage.getNotifications().filter(n => !n.read).length;

    const stats = [
      {
        label: "Overall Attendance",
        value: `${att.overallPercentage}%`,
        meta: `<span class="stat-trend positive"><i class="bi bi-shield-check"></i> Safe (${att.totalAttended}/${att.totalConducted})</span>`,
        icon: "bi-calendar-check-fill",
        theme: "accent-success",
        iconTheme: "success",
        link: "attendance.html"
      },
      {
        label: "Current SGPA",
        value: profile.currentSGPA.toFixed(2),
        meta: `<span class="stat-trend positive"><i class="bi bi-arrow-up-right"></i> Top 5% in Dept</span>`,
        icon: "bi-trophy-fill",
        theme: "accent-primary",
        iconTheme: "primary",
        link: "results.html"
      },
      {
        label: "Cumulative CGPA",
        value: profile.overallCGPA.toFixed(2),
        meta: `<span class="stat-trend neutral"><i class="bi bi-award"></i> 138/160 Credits Earned</span>`,
        icon: "bi-mortarboard-fill",
        theme: "accent-purple",
        iconTheme: "purple",
        link: "results.html"
      },
      {
        label: "Enrolled Courses",
        value: `${courses.length} Courses`,
        meta: `<span class="stat-trend neutral"><i class="bi bi-journals"></i> 24 Credits this Sem</span>`,
        icon: "bi-book-half",
        theme: "accent-info",
        iconTheme: "info",
        link: "courses.html"
      },
      {
        label: "Pending Assignments",
        value: `${pendingAsg} Due`,
        meta: `<span class="stat-trend ${pendingAsg > 0 ? 'negative' : 'positive'}"><i class="bi bi-clock-history"></i> Next due in 2 days</span>`,
        icon: "bi-journal-code",
        theme: "accent-warning",
        iconTheme: "warning",
        link: "assignments.html"
      },
      {
        label: "Upcoming Exam",
        value: "Nov 10",
        meta: `<span class="stat-trend neutral"><i class="bi bi-calendar2-week"></i> CS601 Deep Learning</span>`,
        icon: "bi-file-earmark-check-fill",
        theme: "accent-primary",
        iconTheme: "primary",
        link: "examinations.html"
      },
      {
        label: "Fee Payment Status",
        value: fees.outstandingBalance === 0 ? "₹0 Due" : CamuUtils.formatCurrency(fees.outstandingBalance),
        meta: `<span class="stat-trend positive"><i class="bi bi-check-circle"></i> Paid in Full</span>`,
        icon: "bi-credit-card-2-front-fill",
        theme: "accent-success",
        iconTheme: "success",
        link: "fees.html"
      },
      {
        label: "Active Projects",
        value: `${projects.length} Ongoing`,
        meta: `<span class="stat-trend neutral"><i class="bi bi-kanban"></i> Capstone 75% Completed</span>`,
        icon: "bi-kanban-fill",
        theme: "accent-info",
        iconTheme: "info",
        link: "projects.html"
      },
      {
        label: "Placement Status",
        value: "Shortlisted",
        meta: `<span class="stat-trend positive"><i class="bi bi-building"></i> Google (Tech Round 2)</span>`,
        icon: "bi-briefcase-fill",
        theme: "accent-purple",
        iconTheme: "purple",
        link: "placements.html"
      },
      {
        label: "Unread Notifications",
        value: `${notifs} New`,
        meta: `<span class="stat-trend ${notifs > 0 ? 'negative' : 'positive'}"><i class="bi bi-bell"></i> Action required</span>`,
        icon: "bi-bell-fill",
        theme: "accent-danger",
        iconTheme: "danger",
        link: "notifications.html"
      }
    ];

    let html = "";
    stats.forEach(s => {
      html += `
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
          <a href="${s.link}" class="stat-card ${s.theme}">
            <div class="stat-card-top">
              <span class="stat-label">${s.label}</span>
              <div class="stat-icon-wrapper ${s.iconTheme}">
                <i class="bi ${s.icon}"></i>
              </div>
            </div>
            <div>
              <div class="stat-value">${s.value}</div>
              <div class="stat-meta">${s.meta}</div>
            </div>
          </a>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderCharts() {
    if (typeof Chart === "undefined") {
      console.warn("Chart.js not loaded");
      return;
    }

    const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
    const textColor = isDark ? "#94a3b8" : "#64748b";
    const gridColor = isDark ? "#1f293d" : "#e2e8f0";

    // 1. Monthly Attendance Trend Chart
    const monthlyCanvas = document.getElementById("monthlyAttendanceChart");
    if (monthlyCanvas) {
      const att = CamuStorage.getAttendance();
      const labels = att.monthlyTrends.map(m => m.month.split(" ")[0]);
      const data = att.monthlyTrends.map(m => m.percentage);

      new Chart(monthlyCanvas, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Monthly Attendance %",
            data: data,
            borderColor: "#2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            fill: true,
            tension: 0.35,
            pointBackgroundColor: "#2563eb",
            pointRadius: 5,
            pointHoverRadius: 7
          }, {
            label: "Minimum Target (75%)",
            data: [75, 75, 75, 75],
            borderColor: "#ef4444",
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top", labels: { color: textColor } }
          },
          scales: {
            y: {
              min: 60,
              max: 100,
              grid: { color: gridColor },
              ticks: { color: textColor, callback: v => v + "%" }
            },
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor }
            }
          }
        }
      });
    }

    // 2. Subject-wise Attendance Bar Chart
    const subjectCanvas = document.getElementById("subjectAttendanceChart");
    if (subjectCanvas) {
      const att = CamuStorage.getAttendance();
      const labels = att.subjects.map(s => s.code);
      const data = att.subjects.map(s => s.percentage);

      new Chart(subjectCanvas, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Subject Attendance %",
            data: data,
            backgroundColor: data.map(val => val >= 85 ? "#10b981" : val >= 75 ? "#f59e0b" : "#ef4444"),
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              min: 50,
              max: 100,
              grid: { color: gridColor },
              ticks: { color: textColor, callback: v => v + "%" }
            },
            x: {
              grid: { display: false },
              ticks: { color: textColor }
            }
          }
        }
      });
    }

    // 3. Semester SGPA Progression
    const sgpaCanvas = document.getElementById("sgpaProgressionChart");
    if (sgpaCanvas) {
      const results = CamuStorage.get("results");
      const labels = results.historicalSGPA.map(s => s.semester.replace("Semester ", "Sem "));
      const data = results.historicalSGPA.map(s => s.sgpa);

      new Chart(sgpaCanvas, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "SGPA",
            data: data,
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            fill: true,
            tension: 0.3,
            pointBackgroundColor: "#8b5cf6",
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top", labels: { color: textColor } }
          },
          scales: {
            y: {
              min: 7.5,
              max: 10.0,
              grid: { color: gridColor },
              ticks: { color: textColor }
            },
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor }
            }
          }
        }
      });
    }

    // 4. Assignment Completion Doughnut
    const asgCanvas = document.getElementById("assignmentCompletionChart");
    if (asgCanvas) {
      const assignments = CamuStorage.getAssignments();
      const evaluated = assignments.filter(a => a.status === "Evaluated").length;
      const submitted = assignments.filter(a => a.status === "Submitted").length;
      const pending = assignments.filter(a => a.status === "Pending").length;

      new Chart(asgCanvas, {
        type: "doughnut",
        data: {
          labels: ["Evaluated", "Submitted", "Pending"],
          datasets: [{
            data: [evaluated, submitted, pending],
            backgroundColor: ["#10b981", "#3b82f6", "#f59e0b"],
            borderWidth: 2,
            borderColor: isDark ? "#111827" : "#ffffff"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom", labels: { color: textColor } }
          },
          cutout: "68%"
        }
      });
    }
  },

  renderTodaySchedule() {
    const container = document.getElementById("todayScheduleContainer");
    if (!container) return;

    // Fetch Thursday or Friday schedule
    const timetable = CamuStorage.get("timetable");
    const dayClasses = timetable.schedule["Thursday"] || timetable.schedule["Monday"];

    let html = "";
    dayClasses.forEach((cls, idx) => {
      const isLive = idx === 2; // Simulated ongoing slot
      html += `
        <div class="schedule-item-live ${isLive ? 'ongoing' : ''}">
          <div class="schedule-time-box">
            <span class="schedule-period">Period ${cls.period}</span>
            <span class="schedule-clock">${cls.period === 1 ? '08:30 - 09:30' : cls.period === 2 ? '09:30 - 10:30' : cls.period === 3 ? '10:45 - 11:45' : '01:45 - 03:45'}</span>
          </div>
          <div class="schedule-details">
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-primary-subtle text-primary fw-bold">${cls.code}</span>
              <span class="schedule-title mb-0">${cls.title}</span>
              ${isLive ? '<span class="badge bg-success ms-auto"><i class="bi bi-broadcast"></i> NOW ONGOING</span>' : ''}
            </div>
            <div class="schedule-meta mt-1">
              <span><i class="bi bi-person me-1"></i>${cls.faculty}</span>
              <span><i class="bi bi-geo-alt me-1"></i>${cls.room}</span>
              <span class="badge bg-light text-dark text-capitalize">${cls.type}</span>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderDeadlines() {
    const container = document.getElementById("dashboardDeadlinesContainer");
    if (!container) return;

    const assignments = CamuStorage.getAssignments().filter(a => a.status === "Pending");
    const exams = CamuStorage.get("examinations").upcomingSchedule.slice(0, 2);

    let html = "";
    assignments.forEach(a => {
      html += `
        <div class="d-flex align-items-center justify-content-between p-2.5 rounded-3 border mb-2 bg-surface">
          <div class="d-flex align-items-center gap-2">
            <div class="rounded-circle p-2 bg-warning-subtle text-warning">
              <i class="bi bi-journal-code fs-5"></i>
            </div>
            <div>
              <div class="fw-semibold small text-main">${a.title}</div>
              <div class="text-muted" style="font-size: 0.74rem;">${a.courseCode} &bull; Due: ${CamuUtils.formatDate(a.dueDate)}</div>
            </div>
          </div>
          <a href="assignments.html" class="btn btn-sm btn-outline-primary py-1 px-2.5 small">Submit</a>
        </div>
      `;
    });

    exams.forEach(ex => {
      html += `
        <div class="d-flex align-items-center justify-content-between p-2.5 rounded-3 border mb-2 bg-surface">
          <div class="d-flex align-items-center gap-2">
            <div class="rounded-circle p-2 bg-primary-subtle text-primary">
              <i class="bi bi-calendar-event fs-5"></i>
            </div>
            <div>
              <div class="fw-semibold small text-main">${ex.title} (End-Sem)</div>
              <div class="text-muted" style="font-size: 0.74rem;">${ex.date} &bull; ${ex.time}</div>
            </div>
          </div>
          <span class="badge bg-primary-subtle text-primary">Hall Ticket Ready</span>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderAnnouncements() {
    const container = document.getElementById("dashboardAnnouncementsContainer");
    if (!container) return;

    const list = CamuStorage.getAnnouncements().slice(0, 3);
    let html = "";

    list.forEach(item => {
      html += `
        <div class="p-3 rounded-3 border mb-2 bg-surface">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="badge ${item.priority === 'Urgent' ? 'bg-danger' : item.priority === 'High' ? 'bg-warning text-dark' : 'bg-primary'}">${item.category}</span>
            <span class="text-muted small">${CamuUtils.formatDate(item.publishedDate)}</span>
          </div>
          <h6 class="fw-bold mb-1"><a href="announcements.html" class="text-main">${item.title}</a></h6>
          <p class="text-muted small mb-0">${item.summary}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderStudyMaterials() {
    const container = document.getElementById("dashboardMaterialsContainer");
    if (!container) return;

    const materials = (CamuStorage.get("studyMaterials") || []).slice(0, 4);
    let html = "";

    materials.forEach(m => {
      html += `
        <div class="d-flex align-items-center justify-content-between p-2.5 rounded-3 border mb-2 bg-surface">
          <div class="d-flex align-items-center gap-2">
            <div class="rounded-2 p-2 bg-info-subtle text-info">
              <i class="bi bi-file-earmark-pdf-fill fs-5"></i>
            </div>
            <div>
              <div class="fw-semibold small text-main text-truncate" style="max-width: 280px;">${m.title}</div>
              <div class="text-muted" style="font-size: 0.74rem;">${m.courseCode} &bull; ${m.fileSize}</div>
            </div>
          </div>
          <a href="study-materials.html" class="btn btn-sm btn-light border py-1 px-2.5 small" title="View Material">
            <i class="bi bi-download"></i>
          </a>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderPlacementDrives() {
    const container = document.getElementById("dashboardPlacementContainer");
    if (!container) return;

    const drives = (CamuStorage.get("placements")?.upcomingDrives || []).slice(0, 3);
    let html = "";

    drives.forEach(d => {
      html += `
        <div class="p-3 rounded-3 border mb-2 bg-surface d-flex justify-content-between align-items-center">
          <div>
            <div class="fw-bold text-main">${d.company}</div>
            <div class="text-muted small">${d.role}</div>
            <div class="badge bg-success-subtle text-success mt-1">${d.package}</div>
          </div>
          <div class="text-end">
            <div class="text-muted small mb-1">Deadline: ${CamuUtils.formatDate(d.deadline)}</div>
            <a href="placements.html" class="btn btn-sm btn-outline-primary">View & Apply</a>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderProjectProgress() {
    const container = document.getElementById("dashboardProjectContainer");
    if (!container) return;

    const projects = CamuStorage.getProjects();
    const capstone = projects[0];

    if (!capstone) return;

    container.innerHTML = `
      <div class="p-3 rounded-3 border bg-surface">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-primary">${capstone.category}</span>
          <span class="fw-bold text-primary">${capstone.progress}% Completed</span>
        </div>
        <h6 class="fw-bold text-main mb-1">${capstone.title}</h6>
        <div class="text-muted small mb-3">Guide: ${capstone.guide}</div>
        <div class="camu-progress mb-3">
          <div class="camu-progress-bar" style="width: ${capstone.progress}%"></div>
        </div>
        <div class="d-flex justify-content-between small text-muted">
          <span>Target: ${CamuUtils.formatDate(capstone.targetDate)}</span>
          <a href="projects.html" class="text-primary fw-semibold">View Repository & Milestones &rarr;</a>
        </div>
      </div>
    `;
  }
};
