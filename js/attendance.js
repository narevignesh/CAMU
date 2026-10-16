/**
 * MY CAMU - Attendance Module Controller & Calculator
 */

const CamuAttendance = {
  activeSubjectFilter: "all",
  activeStatusFilter: "all",

  init() {
    this.renderSummary();
    this.renderSubjectCards();
    this.renderSubjectTable();
    this.renderDailyLogs();
    this.renderCharts();
    this.setupCalculator();
    this.bindEvents();
  },

  renderSummary() {
    const att = CamuStorage.getAttendance();

    document.getElementById("overallPctDisplay").textContent = `${att.overallPercentage}%`;
    document.getElementById("totalConductedDisplay").textContent = att.totalConducted;
    document.getElementById("totalAttendedDisplay").textContent = att.totalAttended;
    document.getElementById("totalMissedDisplay").textContent = att.totalMissed;
    document.getElementById("totalRemainingDisplay").textContent = att.totalRemaining;

    // Eligibility badge
    const badge = document.getElementById("eligibilityBadge");
    if (att.overallPercentage >= att.minRequiredPercentage) {
      badge.className = "badge bg-success-subtle text-success fs-6 py-2 px-3 border border-success-subtle";
      badge.innerHTML = `<i class="bi bi-shield-check me-1"></i> Eligible for University Examinations`;
    } else {
      badge.className = "badge bg-danger-subtle text-danger fs-6 py-2 px-3 border border-danger-subtle";
      badge.innerHTML = `<i class="bi bi-exclamation-triangle me-1"></i> Attendance Shortage Warning`;
    }
  },

  renderSubjectCards() {
    const container = document.getElementById("subjectCardsContainer");
    if (!container) return;

    const att = CamuStorage.getAttendance();
    let html = "";

    att.subjects.forEach(s => {
      const isSafe = s.percentage >= 75;
      const badgeClass = s.percentage >= 85 ? "badge-safe" : isSafe ? "badge-warning" : "badge-danger";
      const progressClass = s.percentage >= 85 ? "success" : isSafe ? "warning" : "danger";

      html += `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="camu-card">
            <div class="camu-card-header">
              <span class="badge bg-primary">${s.code}</span>
              <span class="camu-badge ${badgeClass}">${s.percentage}% &bull; ${s.status}</span>
            </div>
            <div class="camu-card-body">
              <h6 class="fw-bold mb-1 text-main text-truncate" title="${s.title}">${s.title}</h6>
              <div class="text-muted small mb-3"><i class="bi bi-person me-1"></i>${s.faculty}</div>

              <div class="camu-progress mb-3">
                <div class="camu-progress-bar ${progressClass}" style="width: ${s.percentage}%"></div>
              </div>

              <div class="row g-2 text-center small">
                <div class="col-4 border-end">
                  <div class="text-muted" style="font-size: 0.72rem;">CONDUCTED</div>
                  <div class="fw-bold fs-6">${s.conducted}</div>
                </div>
                <div class="col-4 border-end">
                  <div class="text-muted" style="font-size: 0.72rem;">ATTENDED</div>
                  <div class="fw-bold fs-6 text-success">${s.attended}</div>
                </div>
                <div class="col-4">
                  <div class="text-muted" style="font-size: 0.72rem;">MISSED</div>
                  <div class="fw-bold fs-6 text-danger">${s.missed}</div>
                </div>
              </div>

              <div class="mt-3 pt-2 border-top d-flex justify-content-between small text-muted">
                <span>Theory: <strong>${s.theory.attended}/${s.theory.conducted}</strong></span>
                <span>Lab: <strong>${s.lab.attended}/${s.lab.conducted}</strong></span>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderSubjectTable() {
    const tbody = document.getElementById("attendanceSubjectTableBody");
    if (!tbody) return;

    const att = CamuStorage.getAttendance();
    let html = "";

    att.subjects.forEach((s, idx) => {
      const badgeClass = s.percentage >= 85 ? "badge-safe" : s.percentage >= 75 ? "badge-warning" : "badge-danger";

      html += `
        <tr>
          <td><span class="fw-bold">${s.code}</span></td>
          <td>
            <div class="fw-semibold text-main">${s.title}</div>
            <div class="text-muted small">${s.faculty}</div>
          </td>
          <td class="text-center">${s.conducted}</td>
          <td class="text-center text-success fw-bold">${s.attended}</td>
          <td class="text-center text-danger fw-bold">${s.missed}</td>
          <td class="text-center">${s.theory.attended}/${s.theory.conducted}</td>
          <td class="text-center">${s.lab.attended}/${s.lab.conducted}</td>
          <td class="text-center">
            <span class="fw-bold">${s.percentage}%</span>
          </td>
          <td class="text-center">
            <span class="camu-badge ${badgeClass}">${s.status}</span>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  renderDailyLogs() {
    const tbody = document.getElementById("dailyAttendanceTableBody");
    if (!tbody) return;

    const att = CamuStorage.getAttendance();
    let logs = att.recentLogs;

    // Apply subject filter
    if (this.activeSubjectFilter !== "all") {
      logs = logs.filter(l => l.code === this.activeSubjectFilter);
    }
    // Apply status filter
    if (this.activeStatusFilter !== "all") {
      logs = logs.filter(l => l.status.toLowerCase() === this.activeStatusFilter.toLowerCase());
    }

    if (logs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No attendance logs match selected filters.</td></tr>`;
      return;
    }

    let html = "";
    logs.forEach(log => {
      let badgeClass = "badge-safe";
      if (log.status === "Absent") badgeClass = "badge-danger";
      else if (log.status === "Late") badgeClass = "badge-warning";
      else if (log.status === "Excused") badgeClass = "badge-info";

      html += `
        <tr>
          <td>
            <div class="fw-semibold">${CamuUtils.formatDate(log.date)}</div>
            <div class="small text-muted">${log.day}</div>
          </td>
          <td>${log.period}</td>
          <td>
            <span class="badge bg-primary-subtle text-primary me-1">${log.code}</span>
            <span class="fw-semibold">${log.subject}</span>
          </td>
          <td>${log.room}</td>
          <td>
            <span class="camu-badge ${badgeClass}">${log.status}</span>
          </td>
          <td><span class="text-muted small">Biometric Log Verified</span></td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  renderCharts() {
    if (typeof Chart === "undefined") return;

    const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
    const textColor = isDark ? "#94a3b8" : "#64748b";
    const gridColor = isDark ? "#1f293d" : "#e2e8f0";

    const att = CamuStorage.getAttendance();

    // 1. Subject Bar Chart
    const barCanvas = document.getElementById("attDetailBarChart");
    if (barCanvas) {
      new Chart(barCanvas, {
        type: "bar",
        data: {
          labels: att.subjects.map(s => s.code),
          datasets: [
            {
              label: "Attended",
              data: att.subjects.map(s => s.attended),
              backgroundColor: "#2563eb",
              borderRadius: 4
            },
            {
              label: "Missed",
              data: att.subjects.map(s => s.missed),
              backgroundColor: "#ef4444",
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top", labels: { color: textColor } }
          },
          scales: {
            x: { stacked: true, grid: { color: gridColor }, ticks: { color: textColor } },
            y: { stacked: true, grid: { color: gridColor }, ticks: { color: textColor } }
          }
        }
      });
    }

    // 2. Theory vs Lab Breakdown Doughnut
    const pieCanvas = document.getElementById("attTheoryLabPieChart");
    if (pieCanvas) {
      let totalTheoryAtt = 0, totalTheoryCon = 0, totalLabAtt = 0, totalLabCon = 0;
      att.subjects.forEach(s => {
        totalTheoryAtt += s.theory.attended;
        totalTheoryCon += s.theory.conducted;
        totalLabAtt += s.lab.attended;
        totalLabCon += s.lab.conducted;
      });

      new Chart(pieCanvas, {
        type: "doughnut",
        data: {
          labels: ["Theory Attended", "Theory Missed", "Lab Attended", "Lab Missed"],
          datasets: [{
            data: [
              totalTheoryAtt,
              totalTheoryCon - totalTheoryAtt,
              totalLabAtt,
              totalLabCon - totalLabAtt
            ],
            backgroundColor: ["#3b82f6", "#93c5fd", "#10b981", "#6ee7b7"],
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
          cutout: "60%"
        }
      });
    }
  },

  setupCalculator() {
    const subjectSelect = document.getElementById("calcSubjectSelect");
    if (!subjectSelect) return;

    const att = CamuStorage.getAttendance();
    let optionsHtml = `<option value="overall">Overall Attendance (Conducted: ${att.totalConducted}, Attended: ${att.totalAttended})</option>`;
    att.subjects.forEach(s => {
      optionsHtml += `<option value="${s.code}">${s.code} - ${s.title} (Attended: ${s.attended}/${s.conducted})</option>`;
    });
    subjectSelect.innerHTML = optionsHtml;

    // Trigger initial calculation
    this.calculateAttendance();
  },

  calculateAttendance() {
    const subjectCode = document.getElementById("calcSubjectSelect").value;
    const targetPct = parseFloat(document.getElementById("calcTargetInput").value) || 75;
    const att = CamuStorage.getAttendance();

    let conducted = att.totalConducted;
    let attended = att.totalAttended;

    if (subjectCode !== "overall") {
      const sub = att.subjects.find(s => s.code === subjectCode);
      if (sub) {
        conducted = sub.conducted;
        attended = sub.attended;
      }
    }

    const result = CamuUtils.calculateAttendanceTarget(conducted, attended, targetPct);
    const resultBox = document.getElementById("calcResultBox");

    if (result.status === "safe") {
      resultBox.className = "p-3 rounded-3 bg-success-subtle border border-success-subtle text-success";
      resultBox.innerHTML = `
        <div class="d-flex align-items-center gap-2 mb-1">
          <i class="bi bi-check-circle-fill fs-5"></i>
          <span class="fw-bold">Current Attendance: ${result.currentPct}% (Target: ${targetPct}%)</span>
        </div>
        <p class="mb-0 small">${result.message}</p>
        <div class="mt-2 fw-bold fs-6">Buffer: You can miss up to <span class="badge bg-success fs-6">${result.canMiss}</span> more classes.</div>
      `;
    } else {
      resultBox.className = "p-3 rounded-3 bg-danger-subtle border border-danger-subtle text-danger";
      resultBox.innerHTML = `
        <div class="d-flex align-items-center gap-2 mb-1">
          <i class="bi bi-exclamation-triangle-fill fs-5"></i>
          <span class="fw-bold">Current Attendance: ${result.currentPct}% (Target: ${targetPct}%)</span>
        </div>
        <p class="mb-0 small">${result.message}</p>
        <div class="mt-2 fw-bold fs-6">Requirement: You need to attend <span class="badge bg-danger fs-6">${result.needAttend}</span> consecutive classes.</div>
      `;
    }
  },

  bindEvents() {
    document.getElementById("calcBtn")?.addEventListener("click", () => this.calculateAttendance());
    document.getElementById("calcSubjectSelect")?.addEventListener("change", () => this.calculateAttendance());
    document.getElementById("calcTargetInput")?.addEventListener("input", () => this.calculateAttendance());

    // Filters for logs
    document.getElementById("logSubjectFilter")?.addEventListener("change", (e) => {
      this.activeSubjectFilter = e.target.value;
      this.renderDailyLogs();
    });

    document.getElementById("logStatusFilter")?.addEventListener("change", (e) => {
      this.activeStatusFilter = e.target.value;
      this.renderDailyLogs();
    });
  }
};
