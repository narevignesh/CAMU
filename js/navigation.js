/**
 * MY CAMU - Universal Navigation & Application Shell Engine
 * Automatically injects responsive sidebar, topbar, search modal, and footer.
 */

const CamuNav = {
  // Navigation structure definition matching prompt requirements
  navSections: [
    {
      title: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", href: "dashboard.html", icon: "bi-grid-1x2-fill" },
        { id: "profile", label: "My Profile", href: "profile.html", icon: "bi-person-circle" },
        { id: "feed", label: "Activity Feed", href: "announcements.html?tab=feed", icon: "bi-rss" },
        { id: "announcements", label: "Announcements", href: "announcements.html", icon: "bi-megaphone-fill", badgeKey: "announcements" },
        { id: "calendar", label: "Calendar", href: "calendar.html", icon: "bi-calendar3" },
        { id: "notifications", label: "Notifications", href: "notifications.html", icon: "bi-bell-fill", badgeKey: "notifications" }
      ]
    },
    {
      title: "Academics",
      items: [
        { id: "attendance", label: "Attendance", href: "attendance.html", icon: "bi-calendar-check" },
        { id: "courses", label: "My Courses", href: "courses.html", icon: "bi-book-half" },
        { id: "timetable", label: "Timetable", href: "timetable.html", icon: "bi-clock-history" },
        { id: "results", label: "Academic Results", href: "results.html", icon: "bi-mortarboard-fill" },
        { id: "examinations", label: "Examination", href: "examinations.html", icon: "bi-file-earmark-check-fill" },
        { id: "lms", label: "Learning Portal (LMS)", href: "lms.html", icon: "bi-laptop-fill" },
        { id: "materials", label: "Study Materials", href: "study-materials.html", icon: "bi-folder2-open" },
        { id: "assignments", label: "Assignments", href: "assignments.html", icon: "bi-journal-code", badgeKey: "assignments" },
        { id: "assessments", label: "Online Assessments", href: "assessments.html", icon: "bi-patch-question-fill" },
        { id: "progress", label: "Academic Progress", href: "results.html#progress", icon: "bi-graph-up-arrow" }
      ]
    },
    {
      title: "Campus",
      items: [
        { id: "fees", label: "Fees & Payments", href: "fees.html", icon: "bi-credit-card-2-front-fill" },
        { id: "scholarships", label: "Scholarships", href: "scholarships.html", icon: "bi-award-fill" },
        { id: "projects", label: "Projects", href: "projects.html", icon: "bi-kanban-fill" },
        { id: "internships", label: "Internships", href: "opportunities.html?type=internship", icon: "bi-briefcase" },
        { id: "placements", label: "Placements & Careers", href: "placements.html", icon: "bi-briefcase-fill" },
        { id: "events", label: "Events & Clubs", href: "events.html", icon: "bi-stars" },
        { id: "library", label: "Library", href: "library.html", icon: "bi-collection-fill" },
        { id: "certificates", label: "Certificates", href: "certificates.html", icon: "bi-file-earmark-medical-fill" },
        { id: "grievances", label: "Grievances & Support", href: "grievances.html", icon: "bi-shield-check" }
      ]
    },
    {
      title: "Account",
      items: [
        { id: "documents", label: "Documents", href: "documents.html", icon: "bi-file-earmark-lock2-fill" },
        { id: "settings", label: "Settings", href: "settings.html", icon: "bi-gear-fill" },
        { id: "help", label: "Help & Support", href: "grievances.html?mode=help", icon: "bi-question-circle-fill" },
        { id: "logout", label: "Logout", href: "#", icon: "bi-box-arrow-right", action: "logout" }
      ]
    }
  ],

  /**
   * Initialize layout on page load
   */
  init(activePageId, breadcrumbTrail = []) {
    this.activePageId = activePageId || this.detectPageId();
    this.breadcrumbTrail = breadcrumbTrail;

    // Apply saved theme preference
    this.applyTheme();

    // Check Authentication
    this.verifyAuth();

    // Render components
    this.renderSidebar();
    this.renderTopbar();
    this.renderFooter();
    this.renderSearchModal();
    this.renderConfirmationModals();

    // Bind event handlers
    this.bindEvents();
  },

  /**
   * Determine current active page from URL
   */
  detectPageId() {
    const path = window.location.pathname.toLowerCase();
    const page = path.split("/").pop().replace(".html", "");
    return page || "dashboard";
  },

  /**
   * Check Auth status
   */
  verifyAuth() {
    const auth = CamuStorage.getAuth();
    const isLoginPage = window.location.pathname.includes("login.html");
    if (!auth.isLoggedIn && !isLoginPage) {
      window.location.href = "login.html";
    }
  },

  /**
   * Apply Theme from settings
   */
  applyTheme() {
    const settings = CamuStorage.getSettings();
    const currentTheme = settings.theme || "light";
    document.documentElement.setAttribute("data-bs-theme", currentTheme);
  },

  /**
   * Toggle Theme (Light / Dark)
   */
  toggleTheme() {
    const current = document.documentElement.getAttribute("data-bs-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", next);
    CamuStorage.saveSettings({ theme: next });
    
    // Update theme toggle icons
    const themeIcon = document.getElementById("topbarThemeIcon");
    if (themeIcon) {
      themeIcon.className = next === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    }
    CamuUtils.showToast(`Switched to ${next} mode`, "info", "Theme Preference");
  },

  /**
   * Render Left Sidebar
   */
  renderSidebar() {
    const sidebar = document.getElementById("appSidebar");
    if (!sidebar) return;

    const profile = CamuStorage.getProfile();
    const notifs = CamuStorage.getNotifications().filter(n => !n.read);
    const pendingAsg = CamuStorage.getAssignments().filter(a => a.status === "Pending");
    const unreadAnn = CamuStorage.getAnnouncements().filter(a => !a.read);

    let navHtml = `
      <div class="sidebar-header">
        <a href="dashboard.html" class="brand-logo">
          <div class="brand-icon-box">
            <i class="bi bi-mortarboard-fill"></i>
          </div>
          <div class="brand-text">
            <span class="brand-title">MY <span>CAMU</span></span>
            <span class="brand-sub">Student Portal</span>
          </div>
        </a>
        <button class="sidebar-toggle-btn" id="sidebarCollapseToggle" title="Collapse Sidebar">
          <i class="bi bi-layout-sidebar-inset"></i>
        </button>
      </div>

      <div class="sidebar-scrollable">
    `;

    this.navSections.forEach(section => {
      navHtml += `<div class="nav-section-title">${section.title}</div><ul class="sidebar-nav">`;

      section.items.forEach(item => {
        const isActive = this.activePageId === item.id;
        let badgeHtml = "";

        if (item.badgeKey === "notifications" && notifs.length > 0) {
          badgeHtml = `<span class="sidebar-badge bg-danger text-white">${notifs.length}</span>`;
        } else if (item.badgeKey === "assignments" && pendingAsg.length > 0) {
          badgeHtml = `<span class="sidebar-badge bg-warning text-dark">${pendingAsg.length}</span>`;
        } else if (item.badgeKey === "announcements" && unreadAnn.length > 0) {
          badgeHtml = `<span class="sidebar-badge bg-info text-white">${unreadAnn.length}</span>`;
        }

        const clickAttr = item.action === "logout" ? `onclick="CamuNav.confirmLogout(); return false;"` : "";

        navHtml += `
          <li>
            <a href="${item.href}" class="sidebar-link ${isActive ? 'active' : ''}" ${clickAttr} data-nav-id="${item.id}">
              <i class="bi ${item.icon} nav-icon"></i>
              <span>${item.label}</span>
              ${badgeHtml}
            </a>
          </li>
        `;
      });

      navHtml += `</ul>`;
    });

    navHtml += `
      </div>

      <div class="sidebar-footer">
        <a href="profile.html" class="sidebar-student-card">
          <img src="${profile.photo}" alt="${profile.name}" class="student-avatar" onerror="this.src='https://ui-avatars.com/api/?name=Vigneshwaran+R&background=2563eb&color=fff'">
          <div class="student-info">
            <span class="student-name">${profile.name}</span>
            <span class="student-roll">${profile.id} • ${profile.section}</span>
          </div>
        </a>
      </div>
    `;

    sidebar.innerHTML = navHtml;

    // Attach backdrop for mobile
    let backdrop = document.querySelector(".sidebar-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "sidebar-backdrop";
      backdrop.addEventListener("click", () => {
        document.body.classList.remove("sidebar-mobile-open");
      });
      document.body.appendChild(backdrop);
    }
  },

  /**
   * Render Top Navigation Bar
   */
  renderTopbar() {
    const topbar = document.getElementById("appTopbar");
    if (!topbar) return;

    const profile = CamuStorage.getProfile();
    const notifs = CamuStorage.getNotifications();
    const unreadCount = notifs.filter(n => !n.read).length;
    const settings = CamuStorage.getSettings();
    const currentTheme = settings.theme || "light";

    // Build breadcrumbs
    let breadcrumbHtml = `<a href="dashboard.html"><i class="bi bi-house-door-fill"></i> Home</a>`;
    if (this.breadcrumbTrail && this.breadcrumbTrail.length > 0) {
      this.breadcrumbTrail.forEach((crumb, index) => {
        breadcrumbHtml += ` <span class="separator">/</span> `;
        if (index === this.breadcrumbTrail.length - 1) {
          breadcrumbHtml += `<span class="current">${crumb.label}</span>`;
        } else {
          breadcrumbHtml += `<a href="${crumb.href}">${crumb.label}</a>`;
        }
      });
    }

    // Build notification dropdown items
    let notifListHtml = "";
    if (notifs.length === 0) {
      notifListHtml = `<div class="p-3 text-center text-muted small">No notifications</div>`;
    } else {
      notifs.slice(0, 5).forEach(n => {
        notifListHtml += `
          <a href="${n.link || 'notifications.html'}" class="dropdown-item d-flex gap-2 p-2.5 border-bottom ${!n.read ? 'bg-subtle font-weight-bold' : ''}" style="white-space: normal;">
            <div class="flex-shrink-0">
              <span class="badge rounded-circle p-2 bg-${n.color || 'primary'}"><i class="bi ${n.icon || 'bi-bell'} text-white"></i></span>
            </div>
            <div>
              <div class="small fw-semibold text-dark">${n.title}</div>
              <div class="text-muted" style="font-size: 0.76rem;">${n.message}</div>
              <div class="text-secondary" style="font-size: 0.7rem; margin-top: 2px;">${n.time}</div>
            </div>
          </a>
        `;
      });
    }

    topbar.innerHTML = `
      <div class="topbar-left">
        <button class="mobile-menu-btn" id="mobileMenuToggle" title="Open Navigation Menu">
          <i class="bi bi-list"></i>
        </button>
        <div class="topbar-breadcrumbs">
          ${breadcrumbHtml}
        </div>
      </div>

      <div class="d-flex align-items-center gap-3">
        <!-- Global Search Trigger -->
        <div class="topbar-search-trigger" id="topbarSearchTrigger" onclick="CamuNav.openSearchModal()">
          <i class="bi bi-search"></i>
          <span>Search courses, exams, projects...</span>
          <span class="search-shortcut-badge">Ctrl K</span>
        </div>

        <div class="topbar-actions">
          <!-- Mobile search icon -->
          <button class="topbar-btn mobile-search-btn d-none" onclick="CamuNav.openSearchModal()" title="Search">
            <i class="bi bi-search"></i>
          </button>

          <!-- Dark Mode Toggle -->
          <button class="topbar-btn" id="themeToggleBtn" onclick="CamuNav.toggleTheme()" title="Toggle Dark/Light Mode">
            <i id="topbarThemeIcon" class="bi ${currentTheme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'}"></i>
          </button>

          <!-- Notifications Dropdown -->
          <div class="dropdown">
            <button class="topbar-btn" id="notificationsDropdown" data-bs-toggle="dropdown" aria-expanded="false" title="Notifications">
              <i class="bi bi-bell"></i>
              ${unreadCount > 0 ? `<span class="topbar-badge">${unreadCount}</span>` : ''}
            </button>
            <div class="dropdown-menu dropdown-menu-end shadow-lg border-0 p-0" style="width: 340px; max-width: 90vw;" aria-labelledby="notificationsDropdown">
              <div class="p-3 border-bottom d-flex align-items-center justify-content-between bg-surface">
                <span class="fw-bold fs-6">Notifications</span>
                <span class="badge bg-primary rounded-pill">${unreadCount} new</span>
              </div>
              <div class="notification-scroll" style="max-height: 320px; overflow-y: auto;">
                ${notifListHtml}
              </div>
              <div class="p-2 border-top text-center bg-subtle">
                <a href="notifications.html" class="small fw-semibold text-primary">View All Notifications (${notifs.length})</a>
              </div>
            </div>
          </div>

          <!-- Academic Calendar Shortcut -->
          <a href="calendar.html" class="topbar-btn text-decoration-none" title="Academic Calendar">
            <i class="bi bi-calendar3"></i>
          </a>

          <!-- User Profile Menu -->
          <div class="dropdown">
            <button class="btn p-0 border-0 d-flex align-items-center gap-2" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="${profile.photo}" alt="${profile.name}" class="rounded-circle border" style="width: 38px; height: 38px; object-fit: cover; border-color: var(--camu-blue) !important;" onerror="this.src='https://ui-avatars.com/api/?name=Vigneshwaran+R&background=2563eb&color=fff'">
              <div class="d-none d-md-flex flex-column text-start" style="line-height: 1.2;">
                <span class="fw-bold small text-main">${profile.name}</span>
                <span class="text-muted" style="font-size: 0.72rem;">${profile.id}</span>
              </div>
              <i class="bi bi-chevron-down small text-muted d-none d-md-inline"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0" aria-labelledby="profileDropdown" style="min-width: 220px;">
              <li class="px-3 py-2 border-bottom">
                <div class="fw-bold text-main">${profile.name}</div>
                <div class="text-muted small">${profile.universityEmail}</div>
                <div class="badge bg-primary-subtle text-primary mt-1">${profile.branch.split('(')[0]}</div>
              </li>
              <li><a class="dropdown-item py-2" href="profile.html"><i class="bi bi-person me-2 text-primary"></i> My Full Profile</a></li>
              <li><a class="dropdown-item py-2" href="attendance.html"><i class="bi bi-calendar-check me-2 text-success"></i> Attendance Status</a></li>
              <li><a class="dropdown-item py-2" href="results.html"><i class="bi bi-mortarboard me-2 text-info"></i> Grade Sheets & SGPA</a></li>
              <li><a class="dropdown-item py-2" href="fees.html"><i class="bi bi-receipt me-2 text-warning"></i> Fee Receipts & Dues</a></li>
              <li><a class="dropdown-item py-2" href="settings.html"><i class="bi bi-gear me-2 text-secondary"></i> Account Preferences</a></li>
              <li><hr class="dropdown-divider my-1"></li>
              <li><a class="dropdown-item py-2 text-warning" href="#" onclick="CamuNav.confirmResetData(); return false;"><i class="bi bi-arrow-counterclockwise me-2"></i> Reset Demo Data</a></li>
              <li><a class="dropdown-item py-2 text-danger" href="#" onclick="CamuNav.confirmLogout(); return false;"><i class="bi bi-box-arrow-right me-2"></i> Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Render Footer
   */
  renderFooter() {
    const footer = document.getElementById("appFooter");
    if (!footer) return;

    footer.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <span class="fw-bold text-main">MY CAMU</span>
        <span>•</span>
        <span>Academic University Portal (Simulated Demonstration System)</span>
      </div>
      <div class="footer-links">
        <a href="dashboard.html">Dashboard</a>
        <a href="profile.html">Profile</a>
        <a href="attendance.html">Attendance</a>
        <a href="courses.html">Courses</a>
        <a href="grievances.html">Helpdesk</a>
        <a href="settings.html">Settings</a>
      </div>
    `;
  },

  /**
   * Render Global Search Modal
   */
  renderSearchModal() {
    if (document.getElementById("camuSearchModal")) return;

    const modalHtml = `
      <div class="modal fade" id="camuSearchModal" tabindex="-1" aria-labelledby="camuSearchModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content shadow-lg border-0 rounded-4 overflow-hidden">
            <div class="modal-header border-bottom p-3 bg-subtle">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-0 fs-5"><i class="bi bi-search text-primary"></i></span>
                <input type="text" class="form-control border-0 bg-transparent fs-5 py-2 shadow-none" id="globalSearchInput" placeholder="Search courses, assignments, study materials, announcements..." autofocus>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0" style="max-height: 420px; overflow-y: auto;">
              <div id="globalSearchResults" class="p-3">
                <div class="text-muted small text-center py-4">
                  <i class="bi bi-compass fs-1 d-block mb-2 text-secondary"></i>
                  Type anything to search across courses, study notes, assignments, exams, and projects.
                </div>
              </div>
            </div>
            <div class="modal-footer bg-subtle py-2 px-3 border-top d-flex justify-content-between">
              <span class="text-muted small"><kbd class="bg-surface text-main border">ESC</kbd> to close</span>
              <span class="text-muted small">Navigation: <kbd class="bg-surface text-main border">Tab</kbd> / <kbd class="bg-surface text-main border">Enter</kbd></span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);

    // Live search input handler
    const input = document.getElementById("globalSearchInput");
    if (input) {
      input.addEventListener("input", (e) => {
        CamuNav.executeGlobalSearch(e.target.value.trim());
      });
    }
  },

  /**
   * Open Search Modal
   */
  openSearchModal() {
    const modalElem = document.getElementById("camuSearchModal");
    if (modalElem && window.bootstrap) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalElem);
      modal.show();
      setTimeout(() => {
        const input = document.getElementById("globalSearchInput");
        if (input) input.focus();
      }, 300);
    }
  },

  /**
   * Execute Search Across All Datasets
   */
  executeGlobalSearch(query) {
    const resultsContainer = document.getElementById("globalSearchResults");
    if (!resultsContainer) return;

    if (!query || query.length < 2) {
      resultsContainer.innerHTML = `
        <div class="text-muted small text-center py-4">
          <i class="bi bi-compass fs-1 d-block mb-2 text-secondary"></i>
          Type at least 2 characters to search across all student modules.
        </div>
      `;
      return;
    }

    const q = query.toLowerCase();
    const courses = CamuStorage.getCourses().filter(c => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
    const assignments = CamuStorage.getAssignments().filter(a => a.title.toLowerCase().includes(q) || a.courseCode.toLowerCase().includes(q));
    const materials = (CamuStorage.get("studyMaterials") || []).filter(m => m.title.toLowerCase().includes(q) || m.courseCode.toLowerCase().includes(q));
    const announcements = CamuStorage.getAnnouncements().filter(a => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
    const projects = CamuStorage.getProjects().filter(p => p.title.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q));
    const jobs = (CamuStorage.get("placements")?.upcomingDrives || []).filter(j => j.company.toLowerCase().includes(q) || j.role.toLowerCase().includes(q));

    let html = "";

    if (courses.length > 0) {
      html += `<div class="fw-bold small text-uppercase text-muted mb-2"><i class="bi bi-book me-1"></i> Courses</div><div class="list-group mb-3">`;
      courses.forEach(c => {
        html += `<a href="course-details.html?code=${c.code}" class="list-group-item list-group-item-action py-2 d-flex justify-content-between align-items-center">
          <div><span class="badge bg-primary me-2">${c.code}</span><span class="fw-semibold">${c.title}</span></div>
          <span class="small text-muted">${c.credits} Credits</span>
        </a>`;
      });
      html += `</div>`;
    }

    if (assignments.length > 0) {
      html += `<div class="fw-bold small text-uppercase text-muted mb-2"><i class="bi bi-journal-code me-1"></i> Assignments</div><div class="list-group mb-3">`;
      assignments.forEach(a => {
        html += `<a href="assignments.html" class="list-group-item list-group-item-action py-2 d-flex justify-content-between align-items-center">
          <div><span class="badge bg-warning text-dark me-2">${a.courseCode}</span><span>${a.title}</span></div>
          <span class="badge bg-secondary">${a.status}</span>
        </a>`;
      });
      html += `</div>`;
    }

    if (materials.length > 0) {
      html += `<div class="fw-bold small text-uppercase text-muted mb-2"><i class="bi bi-folder2 me-1"></i> Study Materials</div><div class="list-group mb-3">`;
      materials.forEach(m => {
        html += `<a href="study-materials.html" class="list-group-item list-group-item-action py-2 d-flex justify-content-between align-items-center">
          <div><span class="badge bg-info text-white me-2">${m.type}</span><span>${m.title}</span></div>
          <span class="small text-muted">${m.courseCode}</span>
        </a>`;
      });
      html += `</div>`;
    }

    if (announcements.length > 0) {
      html += `<div class="fw-bold small text-uppercase text-muted mb-2"><i class="bi bi-megaphone me-1"></i> Announcements</div><div class="list-group mb-3">`;
      announcements.forEach(an => {
        html += `<a href="announcements.html" class="list-group-item list-group-item-action py-2">
          <div class="fw-semibold">${an.title}</div>
          <div class="small text-muted">${an.summary}</div>
        </a>`;
      });
      html += `</div>`;
    }

    if (projects.length > 0) {
      html += `<div class="fw-bold small text-uppercase text-muted mb-2"><i class="bi bi-kanban me-1"></i> Projects</div><div class="list-group mb-3">`;
      projects.forEach(p => {
        html += `<a href="projects.html" class="list-group-item list-group-item-action py-2 d-flex justify-content-between align-items-center">
          <div><span class="fw-semibold">${p.title}</span><div class="small text-muted">${p.domain}</div></div>
          <span class="badge bg-success">${p.progress}%</span>
        </a>`;
      });
      html += `</div>`;
    }

    if (jobs.length > 0) {
      html += `<div class="fw-bold small text-uppercase text-muted mb-2"><i class="bi bi-briefcase me-1"></i> Placements & Career Drives</div><div class="list-group mb-3">`;
      jobs.forEach(j => {
        html += `<a href="placements.html" class="list-group-item list-group-item-action py-2 d-flex justify-content-between align-items-center">
          <div><span class="fw-semibold">${j.company}</span> - <span>${j.role}</span></div>
          <span class="badge bg-primary">${j.package}</span>
        </a>`;
      });
      html += `</div>`;
    }

    if (!html) {
      html = `<div class="text-center py-4 text-muted"><i class="bi bi-emoji-frown fs-2 d-block mb-2"></i>No results found matching "<strong>${CamuUtils.escapeHtml(query)}</strong>"</div>`;
    }

    resultsContainer.innerHTML = html;
  },

  /**
   * Render Logout & Reset Modals
   */
  renderConfirmationModals() {
    if (document.getElementById("camuLogoutModal")) return;

    const modalHtml = `
      <!-- Logout Modal -->
      <div class="modal fade" id="camuLogoutModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content rounded-4 border-0 shadow">
            <div class="modal-body text-center p-4">
              <div class="rounded-circle bg-danger-subtle text-danger d-inline-flex p-3 mb-3">
                <i class="bi bi-box-arrow-right fs-2"></i>
              </div>
              <h5 class="fw-bold mb-2">Log out of MY CAMU?</h5>
              <p class="text-muted small mb-4">You will return to the student demonstration login portal.</p>
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-secondary flex-grow-1" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger flex-grow-1" onclick="CamuNav.performLogout()">Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reset Data Modal -->
      <div class="modal fade" id="camuResetModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-4 border-0 shadow">
            <div class="modal-body text-center p-4">
              <div class="rounded-circle bg-warning-subtle text-warning d-inline-flex p-3 mb-3">
                <i class="bi bi-arrow-counterclockwise fs-2"></i>
              </div>
              <h5 class="fw-bold mb-2">Reset All Demo Data?</h5>
              <p class="text-muted small mb-4">This will restore all default grades, sample assignments, attendance records, and project files. Any simulated submissions will be reset.</p>
              <div class="d-flex gap-2 justify-content-center">
                <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-warning px-4 fw-bold" onclick="CamuNav.performResetData()">Yes, Reset Data</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);
  },

  confirmLogout() {
    const modalElem = document.getElementById("camuLogoutModal");
    if (modalElem && window.bootstrap) {
      bootstrap.Modal.getOrCreateInstance(modalElem).show();
    }
  },

  performLogout() {
    CamuStorage.logout();
    window.location.href = "login.html";
  },

  confirmResetData() {
    const modalElem = document.getElementById("camuResetModal");
    if (modalElem && window.bootstrap) {
      bootstrap.Modal.getOrCreateInstance(modalElem).show();
    }
  },

  performResetData() {
    CamuStorage.resetAll();
    CamuUtils.showToast("All demonstration data restored to initial state.", "success", "System Reset");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  },

  /**
   * Bind DOM event listeners
   */
  bindEvents() {
    // Desktop Collapse Toggle
    const collapseBtn = document.getElementById("sidebarCollapseToggle");
    if (collapseBtn) {
      collapseBtn.addEventListener("click", () => {
        document.body.classList.toggle("sidebar-collapsed");
      });
    }

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById("mobileMenuToggle");
    if (mobileBtn) {
      mobileBtn.addEventListener("click", () => {
        document.body.classList.toggle("sidebar-mobile-open");
      });
    }

    // Ctrl + K global search shortcut
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        CamuNav.openSearchModal();
      }
    });
  }
};
