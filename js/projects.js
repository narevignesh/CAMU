/**
 * MY CAMU - Projects & Research Controller
 */

const CamuProjects = {
  init() {
    this.renderProjects();
    this.bindEvents();
  },

  renderProjects() {
    const container = document.getElementById("projectsContainer");
    if (!container) return;

    const list = CamuStorage.getProjects();
    let html = "";

    list.forEach(p => {
      let techBadges = "";
      (p.technologies || []).forEach(t => {
        techBadges += `<span class="badge bg-light text-dark border me-1 mb-1">${t}</span>`;
      });

      html += `
        <div class="col-lg-6 mb-4">
          <div class="camu-card">
            <div class="camu-card-header flex-wrap">
              <span class="badge bg-primary">${p.category}</span>
              <span class="badge bg-success-subtle text-success fs-6">${p.progress}% Completed</span>
            </div>
            <div class="camu-card-body">
              <h5 class="fw-bold text-main mb-1">${p.title}</h5>
              <div class="text-muted small mb-3"><i class="bi bi-person-badge me-1"></i>Guide: ${p.guide} &bull; Domain: ${p.domain}</div>

              <p class="text-muted small mb-3">${p.description}</p>

              <div class="mb-3">
                <div class="d-flex justify-content-between small text-muted mb-1">
                  <span>Milestone Progress</span>
                  <span class="fw-bold text-main">${p.progress}%</span>
                </div>
                <div class="camu-progress">
                  <div class="camu-progress-bar" style="width: ${p.progress}%"></div>
                </div>
              </div>

              <div class="mb-3">
                <div class="small fw-semibold text-muted mb-1">Tech Stack:</div>
                <div>${techBadges}</div>
              </div>

              <div class="row g-2 small text-muted border-top pt-2">
                <div class="col-6"><span>Start: <strong>${CamuUtils.formatDate(p.startDate)}</strong></span></div>
                <div class="col-6"><span>Target: <strong>${CamuUtils.formatDate(p.targetDate)}</strong></span></div>
              </div>
            </div>
            <div class="camu-card-footer">
              <div class="d-flex gap-2">
                ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="btn btn-sm btn-outline-dark"><i class="bi bi-github me-1"></i> GitHub</a>` : ''}
                ${p.liveDemoUrl ? `<a href="${p.liveDemoUrl}" target="_blank" class="btn btn-sm btn-outline-primary"><i class="bi bi-box-arrow-up-right me-1"></i> Demo</a>` : ''}
              </div>
              <div class="d-flex gap-1">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="CamuProjects.deleteProject('${p.id}')">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  openAddModal() {
    document.getElementById("addProjectForm").reset();
    const modal = new bootstrap.Modal(document.getElementById("addProjectModal"));
    modal.show();
  },

  handleAddProject(e) {
    e.preventDefault();
    const title = document.getElementById("projTitleInput").value.trim();
    const domain = document.getElementById("projDomainInput").value.trim();
    const guide = document.getElementById("projGuideInput").value.trim();
    const category = document.getElementById("projCategorySelect").value;
    const progress = parseInt(document.getElementById("projProgressInput").value) || 20;
    const description = document.getElementById("projDescInput").value.trim();
    const techStr = document.getElementById("projTechInput").value.trim();
    const githubUrl = document.getElementById("projGithubInput").value.trim();

    if (!title || !domain) {
      CamuUtils.showToast("Please provide project title and domain.", "warning", "Validation");
      return;
    }

    const techArray = techStr ? techStr.split(",").map(t => t.trim()) : ["Python", "FastAPI"];

    CamuStorage.addProject({
      title,
      domain,
      guide: guide || "Dr. Sundaram Krishnamurthy",
      category,
      progress,
      description,
      technologies: techArray,
      githubUrl: githubUrl || "https://github.com/vignesh-camu/demo-repo",
      startDate: new Date().toISOString().split("T")[0],
      targetDate: "2026-12-15"
    });

    bootstrap.Modal.getInstance(document.getElementById("addProjectModal"))?.hide();
    CamuUtils.showToast(`Project "${title}" added successfully!`, "success", "Project Created");
    this.renderProjects();
  },

  deleteProject(id) {
    if (confirm("Are you sure you wish to delete this project record?")) {
      CamuStorage.deleteProject(id);
      CamuUtils.showToast("Project deleted from portal.", "info", "Project Removed");
      this.renderProjects();
    }
  },

  bindEvents() {
    document.getElementById("addProjectForm")?.addEventListener("submit", (e) => this.handleAddProject(e));
  }
};
