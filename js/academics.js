/**
 * MY CAMU - Academics Suite Controller
 * Handles Courses, Course Details, Timetable, Academic Results, and Examinations
 */

const CamuAcademics = {
  // COURSES PAGE
  initCourses() {
    this.renderCoursesList();
    this.bindCourseFilters();
  },

  renderCoursesList(filterType = "all", searchQuery = "") {
    const container = document.getElementById("coursesListContainer");
    if (!container) return;

    let courses = CamuStorage.getCourses();

    if (filterType !== "all") {
      courses = courses.filter(c => c.category === filterType);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      courses = courses.filter(c => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.faculty.toLowerCase().includes(q));
    }

    if (courses.length === 0) {
      container.innerHTML = `<div class="col-12 text-center py-5 text-muted"><i class="bi bi-search fs-2 d-block mb-2"></i>No courses found matching your criteria.</div>`;
      return;
    }

    let html = "";
    courses.forEach(c => {
      html += `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="camu-card">
            <div class="camu-card-header">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-primary">${c.code}</span>
                <span class="badge bg-light text-dark">${c.type}</span>
              </div>
              <span class="badge bg-secondary-subtle text-secondary">${c.credits} Credits</span>
            </div>
            <div class="camu-card-body">
              <h5 class="fw-bold mb-1"><a href="course-details.html?code=${c.code}" class="text-main">${c.title}</a></h5>
              <div class="text-muted small mb-3"><i class="bi bi-person me-1"></i>${c.faculty}</div>
              <p class="text-muted small mb-3 line-clamp-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${c.description}
              </p>

              <div class="d-flex justify-content-between small text-muted mb-1">
                <span>Syllabus Completion</span>
                <span class="fw-bold text-main">${c.syllabusCompletion}%</span>
              </div>
              <div class="camu-progress mb-3">
                <div class="camu-progress-bar" style="width: ${c.syllabusCompletion}%"></div>
              </div>

              <div class="row g-2 text-center small border-top pt-2">
                <div class="col-4 border-end">
                  <span class="text-muted d-block" style="font-size: 0.72rem;">MODULES</span>
                  <span class="fw-bold">${c.modulesCount}</span>
                </div>
                <div class="col-4 border-end">
                  <span class="text-muted d-block" style="font-size: 0.72rem;">MATERIALS</span>
                  <span class="fw-bold">${c.studyMaterialsCount}</span>
                </div>
                <div class="col-4">
                  <span class="text-muted d-block" style="font-size: 0.72rem;">TASKS</span>
                  <span class="fw-bold">${c.assignmentsCount}</span>
                </div>
              </div>
            </div>
            <div class="camu-card-footer">
              <span class="text-muted small"><i class="bi bi-geo-alt me-1"></i>${c.room}</span>
              <a href="course-details.html?code=${c.code}" class="fw-bold text-primary">View Course &rarr;</a>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  bindCourseFilters() {
    const searchInput = document.getElementById("courseSearchInput");
    const categoryFilter = document.getElementById("courseCategoryFilter");

    const update = () => {
      const q = searchInput ? searchInput.value.trim() : "";
      const cat = categoryFilter ? categoryFilter.value : "all";
      this.renderCoursesList(cat, q);
    };

    if (searchInput) searchInput.addEventListener("input", update);
    if (categoryFilter) categoryFilter.addEventListener("change", update);
  },

  // COURSE DETAILS PAGE
  initCourseDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code") || "CS601";
    const course = CamuStorage.getCourseByCode(code);

    if (!course) return;

    // Fill Header
    document.getElementById("courseCodeDisplay").textContent = course.code;
    document.getElementById("courseTypeDisplay").textContent = course.type;
    document.getElementById("courseCreditsDisplay").textContent = `${course.credits} Credits`;
    document.getElementById("courseTitleDisplay").textContent = course.title;
    document.getElementById("courseFacultyDisplay").textContent = `${course.faculty} (${course.facultyEmail})`;
    document.getElementById("courseRoomDisplay").textContent = course.room;
    document.getElementById("courseOverviewDisplay").textContent = course.overview;
    document.getElementById("courseProgressDisplay").textContent = `${course.syllabusCompletion}%`;
    document.getElementById("courseProgressBar").style.width = `${course.syllabusCompletion}%`;

    // Render Syllabus Units
    const syllabusContainer = document.getElementById("courseSyllabusContainer");
    if (syllabusContainer) {
      let html = "";
      course.syllabus.forEach((unit, idx) => {
        const isCompleted = unit.status === "Completed";
        const badgeColor = isCompleted ? "bg-success" : unit.status === "In Progress" ? "bg-primary" : "bg-secondary";

        let topicsHtml = "";
        unit.topics.forEach(t => {
          topicsHtml += `<li class="mb-1 text-muted small"><i class="bi bi-check2 text-primary me-2"></i>${t}</li>`;
        });

        html += `
          <div class="accordion-item border rounded-3 mb-3 overflow-hidden">
            <h2 class="accordion-header" id="heading${idx}">
              <button class="accordion-button ${idx !== 0 ? 'collapsed' : ''} bg-surface fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${idx}" aria-expanded="${idx === 0}">
                <div class="d-flex align-items-center justify-content-between w-100 me-3">
                  <div>
                    <span class="badge ${badgeColor} me-2">${unit.unit}</span>
                    <span>${unit.title}</span>
                  </div>
                  <span class="badge bg-light text-dark small border">${unit.status}</span>
                </div>
              </button>
            </h2>
            <div id="collapse${idx}" class="accordion-collapse collapse ${idx === 0 ? 'show' : ''}" data-bs-parent="#courseSyllabusContainer">
              <div class="accordion-body bg-subtle">
                <div class="fw-semibold small text-uppercase text-muted mb-2">Curriculum Topics Covered:</div>
                <ul class="list-unstyled mb-0">
                  ${topicsHtml}
                </ul>
              </div>
            </div>
          </div>
        `;
      });
      syllabusContainer.innerHTML = html;
    }
  },

  // TIMETABLE PAGE
  initTimetable() {
    this.renderTimetableGrid();
    this.bindTimetableControls();
  },

  renderTimetableGrid(selectedDay = "all") {
    const container = document.getElementById("timetableGridContainer");
    if (!container) return;

    const data = CamuStorage.get("timetable");
    const days = selectedDay === "all" ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] : [selectedDay];

    let html = "";
    days.forEach(day => {
      const schedule = data.schedule[day] || [];
      html += `
        <div class="camu-card mb-4">
          <div class="camu-card-header bg-subtle">
            <div class="camu-card-title">
              <i class="bi bi-calendar-day-fill text-primary"></i>
              <span>${day} Schedule</span>
            </div>
            <span class="badge bg-primary rounded-pill">${schedule.length} Periods</span>
          </div>
          <div class="camu-card-body p-0">
            <div class="camu-table-wrap border-0">
              <table class="camu-table">
                <thead>
                  <tr>
                    <th style="width: 140px;">Time / Period</th>
                    <th>Course Code & Title</th>
                    <th>Type</th>
                    <th>Faculty Instructor</th>
                    <th>Room / Hall</th>
                  </tr>
                </thead>
                <tbody>
      `;

      schedule.forEach(p => {
        const timeStr = p.period === 1 ? "08:30 - 09:30" : p.period === 2 ? "09:30 - 10:30" : p.period === 3 ? "10:45 - 11:45" : p.period === 4 ? "11:45 - 12:45" : p.period === 5 ? "01:45 - 02:45" : p.period === 6 ? "02:45 - 03:45" : "03:45 - 04:30";
        const isLab = p.type === "lab";

        html += `
          <tr class="${isLab ? 'table-primary bg-opacity-25' : ''}">
            <td>
              <div class="fw-bold">Period ${p.period}</div>
              <div class="text-muted small font-monospace">${timeStr}</div>
            </td>
            <td>
              <span class="badge bg-primary-subtle text-primary fw-bold me-1">${p.code}</span>
              <span class="fw-semibold text-main">${p.title}</span>
            </td>
            <td>
              <span class="camu-badge ${isLab ? 'badge-info' : 'badge-neutral'} text-uppercase">${p.type}</span>
            </td>
            <td>${p.faculty}</td>
            <td>
              <span class="badge bg-light text-dark border"><i class="bi bi-geo-alt me-1"></i>${p.room}</span>
            </td>
          </tr>
        `;
      });

      html += `
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  bindTimetableControls() {
    const daySelector = document.getElementById("timetableDaySelector");
    if (daySelector) {
      daySelector.addEventListener("change", (e) => {
        this.renderTimetableGrid(e.target.value);
      });
    }
  },

  // ACADEMIC RESULTS PAGE
  initResults() {
    this.renderResultsSummary();
    this.renderGradesTable();
    this.renderSGPAChart();
  },

  renderResultsSummary() {
    const res = CamuStorage.get("results");
    document.getElementById("cgpaDisplay").textContent = res.cgpa.toFixed(2);
    document.getElementById("creditsDisplay").textContent = res.totalCredits;
    document.getElementById("backlogsDisplay").textContent = res.activeBacklogs;
  },

  renderGradesTable(semesterKey = "sem6") {
    const tbody = document.getElementById("resultsTableBody");
    if (!tbody) return;

    const res = CamuStorage.get("results");
    const subjects = semesterKey === "sem5" ? res.sem5Subjects : res.currentSemesterSubjects;

    let html = "";
    subjects.forEach(s => {
      html += `
        <tr>
          <td><span class="badge bg-primary-subtle text-primary fw-bold">${s.code}</span></td>
          <td class="fw-semibold text-main">${s.title}</td>
          <td class="text-center">${s.credits}</td>
          <td class="text-center">${s.internal} / 40</td>
          <td class="text-center">${s.external} / 60</td>
          <td class="text-center fw-bold">${s.total} / 100</td>
          <td class="text-center"><span class="badge bg-success-subtle text-success fs-6">${s.grade}</span></td>
          <td class="text-center fw-bold">${s.gradePoint}</td>
          <td class="text-center"><span class="badge bg-success">${s.result}</span></td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  renderSGPAChart() {
    const canvas = document.getElementById("resultsSGPAChart");
    if (!canvas || typeof Chart === "undefined") return;

    const res = CamuStorage.get("results");
    const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
    const textColor = isDark ? "#94a3b8" : "#64748b";
    const gridColor = isDark ? "#1f293d" : "#e2e8f0";

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: res.historicalSGPA.map(s => s.semester),
        datasets: [{
          label: "SGPA",
          data: res.historicalSGPA.map(s => s.sgpa),
          backgroundColor: "#2563eb",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 7.0, max: 10.0, grid: { color: gridColor }, ticks: { color: textColor } },
          x: { grid: { display: false }, ticks: { color: textColor } }
        }
      }
    });
  },

  // EXAMINATIONS PAGE
  initExaminations() {
    this.renderExamSchedule();
    this.renderInternalMarks();
    this.renderInstructions();
  },

  renderExamSchedule() {
    const tbody = document.getElementById("examTimetableBody");
    if (!tbody) return;

    const examData = CamuStorage.get("examinations");
    let html = "";

    examData.upcomingSchedule.forEach((ex, idx) => {
      html += `
        <tr>
          <td><span class="badge bg-primary me-2">${idx + 1}</span><span class="fw-semibold">${CamuUtils.formatDate(ex.date)} (${ex.day})</span></td>
          <td><span class="fw-bold font-monospace">${ex.time}</span></td>
          <td><span class="badge bg-primary-subtle text-primary me-1">${ex.code}</span> <span class="fw-semibold">${ex.title}</span></td>
          <td>${ex.hall}</td>
          <td><span class="badge bg-light text-dark border font-monospace">${ex.seat}</span></td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  renderInternalMarks() {
    const container = document.getElementById("internalMarksContainer");
    if (!container) return;

    const examData = CamuStorage.get("examinations");
    let html = "";

    examData.internalAssessments.forEach(t => {
      html += `
        <div class="col-md-4 mb-3">
          <div class="p-3 rounded-3 border bg-surface">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="badge bg-success-subtle text-success">${t.status}</span>
              <span class="text-muted small">${t.date}</span>
            </div>
            <h6 class="fw-bold mb-1">${t.test}</h6>
            <div class="d-flex align-items-baseline gap-2 mt-2">
              <span class="fs-4 fw-bold text-primary">${t.marksObtained}</span>
              <span class="text-muted small">/ ${t.maxMarks} (${t.percentage}%)</span>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderInstructions() {
    const container = document.getElementById("examInstructionsList");
    if (!container) return;

    const examData = CamuStorage.get("examinations");
    let html = "";

    examData.instructions.forEach(ins => {
      html += `<li class="mb-2 text-muted small"><i class="bi bi-shield-check text-primary me-2"></i>${ins}</li>`;
    });

    container.innerHTML = html;
  }
};
