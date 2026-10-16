/**
 * MY CAMU - Career & Placements Controller
 */

const CamuPlacements = {
  init() {
    this.renderEligibility();
    this.renderMetrics();
    this.renderApplications();
    this.renderDrives();
    this.bindEvents();
  },

  renderEligibility() {
    const p = CamuStorage.getPlacements();
    const el = document.getElementById("placementEligibilityStatus");
    if (!el) return;

    el.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <div class="rounded-circle p-2.5 bg-success-subtle text-success fs-3">
          <i class="bi bi-shield-check"></i>
        </div>
        <div>
          <div class="fw-bold fs-5 text-success">${p.eligibility.status}</div>
          <div class="text-muted small">
            Student CGPA: <strong>${p.eligibility.studentCgpa}</strong> (Required: &ge; ${p.eligibility.minCgpaRequired}) &bull; Active Backlogs: <strong>${p.eligibility.studentBacklogs}</strong> &bull; Eligible for &gt;₹30 LPA Packages
          </div>
        </div>
      </div>
    `;
  },

  renderMetrics() {
    const p = CamuStorage.getPlacements();
    const m = p.metrics;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setVal("metricVisitingCompanies", m.totalVisiting);
    setVal("metricActiveDrives", m.activeDrives);
    setVal("metricAppliedDrives", m.applicationsSubmitted);
    setVal("metricShortlistedDrives", m.shortlisted);
    setVal("metricOffersReceived", m.offersReceived);
  },

  renderApplications() {
    const tbody = document.getElementById("myApplicationsTableBody");
    if (!tbody) return;

    const p = CamuStorage.getPlacements();
    let html = "";

    p.applications.forEach(app => {
      let roundsHtml = "";
      (app.rounds || []).forEach(r => {
        roundsHtml += `<div class="small"><span class="badge ${r.status === 'Cleared' ? 'bg-success' : r.status === 'Scheduled' ? 'bg-primary' : 'bg-secondary'} me-1">${r.status}</span> ${r.name}</div>`;
      });

      html += `
        <tr>
          <td>
            <div class="fw-bold text-main fs-6">${app.company}</div>
            <div class="text-muted small">${app.location}</div>
          </td>
          <td>
            <div class="fw-semibold text-main">${app.role}</div>
            <div class="text-muted small">Applied on: ${CamuUtils.formatDate(app.appliedDate)}</div>
          </td>
          <td class="fw-bold text-success">${app.package}</td>
          <td>
            <span class="badge bg-${app.badgeColor || 'primary'} fs-6 py-1.5 px-2.5">${app.status}</span>
          </td>
          <td>${roundsHtml}</td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  renderDrives() {
    const container = document.getElementById("upcomingDrivesContainer");
    if (!container) return;

    const p = CamuStorage.getPlacements();
    let html = "";

    p.upcomingDrives.forEach(d => {
      let skillsHtml = "";
      d.skills.forEach(s => {
        skillsHtml += `<span class="badge bg-light text-dark border me-1 mb-1">${s}</span>`;
      });

      html += `
        <div class="col-lg-6 mb-4">
          <div class="camu-card">
            <div class="camu-card-header flex-wrap">
              <div>
                <span class="badge bg-primary me-1">${d.jobType}</span>
                <span class="badge bg-success-subtle text-success fw-bold">${d.package}</span>
              </div>
              <span class="text-danger small fw-bold"><i class="bi bi-clock me-1"></i>Deadline: ${CamuUtils.formatDate(d.deadline)}</span>
            </div>
            <div class="camu-card-body">
              <h5 class="fw-bold text-main mb-1">${d.company}</h5>
              <div class="text-primary fw-semibold small mb-2">${d.role}</div>
              <p class="text-muted small mb-3">${d.description}</p>

              <div class="mb-3">
                <div class="small fw-semibold text-muted mb-1">Required Skills:</div>
                <div>${skillsHtml}</div>
              </div>

              <div class="row g-2 small text-muted border-top pt-2">
                <div class="col-6"><span>Min CGPA: <strong>&ge; ${d.minCgpa}</strong></span></div>
                <div class="col-6"><span>Location: <strong>${d.location}</strong></span></div>
              </div>
            </div>
            <div class="camu-card-footer">
              <span class="text-muted small"><i class="bi bi-mortarboard me-1"></i>${d.allowedBranches}</span>
              <button type="button" class="btn btn-sm btn-primary" onclick="CamuPlacements.openApplyModal('${d.id}', '${d.company}', '${d.role}')">
                <i class="bi bi-send-check me-1"></i> Apply Now
              </button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  openApplyModal(driveId, company, role) {
    document.getElementById("applyDriveId").value = driveId;
    document.getElementById("applyCompanyDisplay").textContent = company;
    document.getElementById("applyRoleDisplay").textContent = role;
    const modal = new bootstrap.Modal(document.getElementById("applyPlacementModal"));
    modal.show();
  },

  handleApply(e) {
    e.preventDefault();
    const driveId = document.getElementById("applyDriveId").value;
    const company = document.getElementById("applyCompanyDisplay").textContent;
    const role = document.getElementById("applyRoleDisplay").textContent;

    CamuStorage.applyPlacement(driveId, role, company);
    bootstrap.Modal.getInstance(document.getElementById("applyPlacementModal"))?.hide();

    CamuUtils.showToast(`Application for ${role} at ${company} submitted successfully!`, "success", "Applied");
    this.renderMetrics();
    this.renderApplications();
  },

  bindEvents() {
    document.getElementById("applyPlacementForm")?.addEventListener("submit", (e) => this.handleApply(e));
  }
};
