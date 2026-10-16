/**
 * MY CAMU - LMS & Academic Content Controller
 * Handles LMS Home, Study Materials filtering, Assignment submissions, and Course Video lectures.
 */

const CamuLMS = {
  // LMS HOME
  initLMS() {
    this.renderLmsCourses();
    this.renderRecentMaterials();
    this.renderPendingAssignments();
  },

  renderLmsCourses() {
    const container = document.getElementById("lmsCoursesContainer");
    if (!container) return;

    const courses = CamuStorage.getCourses();
    let html = "";

    courses.forEach(c => {
      html += `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="camu-card">
            <div class="camu-card-header">
              <span class="badge bg-primary">${c.code}</span>
              <span class="badge bg-success-subtle text-success">${c.courseProgress}% Completed</span>
            </div>
            <div class="camu-card-body">
              <h5 class="fw-bold mb-1"><a href="course-details.html?code=${c.code}" class="text-main">${c.title}</a></h5>
              <div class="text-muted small mb-3"><i class="bi bi-person me-1"></i>${c.faculty}</div>

              <div class="camu-progress mb-3">
                <div class="camu-progress-bar success" style="width: ${c.courseProgress}%;"></div>
              </div>

              <div class="d-flex justify-content-between text-muted small mb-3">
                <span><i class="bi bi-folder2 me-1"></i>${c.studyMaterialsCount} Files</span>
                <span><i class="bi bi-journal-code me-1"></i>${c.assignmentsCount} Assignments</span>
                <span><i class="bi bi-patch-question me-1"></i>${c.quizzesCount} Quizzes</span>
              </div>

              <div class="d-flex gap-2">
                <a href="course-details.html?code=${c.code}" class="btn btn-sm btn-outline-primary flex-grow-1">Course Syllabus</a>
                <a href="study-materials.html" class="btn btn-sm btn-primary flex-grow-1">Study Materials</a>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderRecentMaterials() {
    const container = document.getElementById("lmsRecentMaterialsContainer");
    if (!container) return;

    const list = (CamuStorage.get("studyMaterials") || []).slice(0, 4);
    let html = "";

    list.forEach(m => {
      html += `
        <div class="p-3 rounded-3 border bg-surface mb-2 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <div class="rounded-2 p-2 bg-primary-subtle text-primary fs-4">
              <i class="bi bi-file-earmark-text-fill"></i>
            </div>
            <div>
              <div class="fw-semibold text-main">${m.title}</div>
              <div class="text-muted small">${m.courseCode} &bull; ${m.type} &bull; ${m.fileSize}</div>
            </div>
          </div>
          <a href="study-materials.html" class="btn btn-sm btn-outline-primary">Open</a>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderPendingAssignments() {
    const container = document.getElementById("lmsPendingAssignmentsContainer");
    if (!container) return;

    const list = CamuStorage.getAssignments().filter(a => a.status === "Pending");
    let html = "";

    list.forEach(a => {
      html += `
        <div class="p-3 rounded-3 border bg-surface mb-2 d-flex justify-content-between align-items-center">
          <div>
            <div class="fw-semibold text-main">${a.title}</div>
            <div class="text-muted small">${a.courseCode} &bull; Due: ${CamuUtils.formatDate(a.dueDate)}</div>
          </div>
          <a href="assignments.html" class="btn btn-sm btn-warning text-dark fw-bold">Submit</a>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // STUDY MATERIALS PAGE
  initStudyMaterials() {
    this.renderStudyMaterialsList();
    this.bindMaterialFilters();
  },

  renderStudyMaterialsList(typeFilter = "all", courseFilter = "all", searchQuery = "") {
    const container = document.getElementById("studyMaterialsListContainer");
    if (!container) return;

    let materials = CamuStorage.get("studyMaterials") || [];

    if (typeFilter !== "all") {
      materials = materials.filter(m => m.fileType.toLowerCase() === typeFilter.toLowerCase());
    }
    if (courseFilter !== "all") {
      materials = materials.filter(m => m.courseCode.toLowerCase() === courseFilter.toLowerCase());
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      materials = materials.filter(m => m.title.toLowerCase().includes(q) || m.courseTitle.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }

    if (materials.length === 0) {
      container.innerHTML = `<div class="col-12 text-center py-5 text-muted"><i class="bi bi-folder-x fs-2 d-block mb-2"></i>No learning resources match current filter.</div>`;
      return;
    }

    let html = "";
    materials.forEach(m => {
      let icon = "bi-file-earmark-pdf-fill text-danger";
      if (m.fileType === "video") icon = "bi-play-circle-fill text-primary";
      else if (m.fileType === "code") icon = "bi-file-code-fill text-success";

      html += `
        <div class="col-lg-6 mb-4">
          <div class="camu-card">
            <div class="camu-card-header">
              <div class="d-flex align-items-center gap-2">
                <i class="bi ${icon} fs-4"></i>
                <span class="badge bg-primary-subtle text-primary fw-bold">${m.courseCode}</span>
                <span class="badge bg-light text-dark border">${m.type}</span>
              </div>
              <span class="text-muted small">${m.fileSize}</span>
            </div>
            <div class="camu-card-body">
              <h5 class="fw-bold text-main mb-1">${m.title}</h5>
              <div class="text-muted small mb-2"><i class="bi bi-person me-1"></i>Uploaded by: ${m.uploadedBy} &bull; ${m.uploadedDate}</div>
              <p class="text-muted small mb-0">${m.description}</p>
            </div>
            <div class="camu-card-footer">
              <span class="text-muted small">${m.courseTitle}</span>
              <button type="button" class="btn btn-sm btn-outline-primary" onclick="CamuLMS.viewMaterial('${m.id}')">
                <i class="bi bi-eye me-1"></i> Preview / Download
              </button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  bindMaterialFilters() {
    const searchInput = document.getElementById("matSearchInput");
    const courseSelect = document.getElementById("matCourseFilter");
    const typeSelect = document.getElementById("matTypeFilter");

    const update = () => {
      const q = searchInput ? searchInput.value.trim() : "";
      const crs = courseSelect ? courseSelect.value : "all";
      const typ = typeSelect ? typeSelect.value : "all";
      this.renderStudyMaterialsList(typ, crs, q);
    };

    if (searchInput) searchInput.addEventListener("input", update);
    if (courseSelect) courseSelect.addEventListener("change", update);
    if (typeSelect) typeSelect.addEventListener("change", update);
  },

  viewMaterial(matId) {
    const materials = CamuStorage.get("studyMaterials") || [];
    const mat = materials.find(m => m.id === matId);
    if (!mat) return;

    CamuUtils.showToast(`Accessing "${mat.title}". Digital resource stream initialized.`, "info", "File Viewer");
  },

  // ASSIGNMENTS PAGE
  initAssignments() {
    this.renderAssignmentsList();
    this.bindAssignmentFilters();
  },

  renderAssignmentsList(statusFilter = "all") {
    const container = document.getElementById("assignmentsContainer");
    if (!container) return;

    let assignments = CamuStorage.getAssignments();

    if (statusFilter !== "all") {
      assignments = assignments.filter(a => a.status.toLowerCase() === statusFilter.toLowerCase());
    }

    let html = "";
    assignments.forEach(a => {
      const isEvaluated = a.status === "Evaluated";
      const isSubmitted = a.status === "Submitted";
      const isPending = a.status === "Pending";

      let statusBadge = `<span class="badge bg-warning text-dark"><i class="bi bi-clock-history me-1"></i>Pending Submission</span>`;
      if (isSubmitted) statusBadge = `<span class="badge bg-info text-white"><i class="bi bi-check2 me-1"></i>Submitted for Review</span>`;
      else if (isEvaluated) statusBadge = `<span class="badge bg-success"><i class="bi bi-patch-check-fill me-1"></i>Evaluated (${a.marksObtained} / ${a.maxMarks})</span>`;

      html += `
        <div class="camu-card mb-4">
          <div class="camu-card-header flex-wrap">
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-primary">${a.courseCode}</span>
              <span class="fw-semibold text-main">${a.courseTitle}</span>
            </div>
            ${statusBadge}
          </div>
          <div class="camu-card-body">
            <h5 class="fw-bold text-main mb-2">${a.title}</h5>
            <p class="text-muted small mb-3">${a.description}</p>

            <div class="row g-3 small text-muted border-top border-bottom py-2 my-2 bg-subtle rounded-2">
              <div class="col-md-3"><span><i class="bi bi-calendar-plus me-1"></i>Issued: <strong>${CamuUtils.formatDate(a.issueDate)}</strong></span></div>
              <div class="col-md-3"><span><i class="bi bi-calendar-x me-1 text-danger"></i>Due Date: <strong class="text-danger">${CamuUtils.formatDate(a.dueDate)}</strong></span></div>
              <div class="col-md-3"><span><i class="bi bi-award me-1 text-primary"></i>Max Marks: <strong>${a.maxMarks}</strong></span></div>
              <div class="col-md-3"><span><i class="bi bi-file-earmark-check me-1"></i>Status: <strong>${a.status}</strong></span></div>
            </div>

            ${isEvaluated && a.facultyFeedback ? `
              <div class="p-3 mt-3 rounded-3 bg-success-subtle border border-success-subtle text-success small">
                <div class="fw-bold mb-1"><i class="bi bi-chat-left-quote-fill me-1"></i>Faculty Evaluation Feedback:</div>
                <div>${a.facultyFeedback}</div>
                <div class="mt-2 fw-semibold">Score: ${a.marksObtained} / ${a.maxMarks} &bull; Submitted File: ${a.submissionFile}</div>
              </div>
            ` : ''}

            ${isSubmitted && !isEvaluated ? `
              <div class="p-2.5 mt-2 rounded-2 bg-info-subtle border border-info-subtle text-info small">
                <i class="bi bi-file-earmark-check-fill me-1"></i> Submitted file: <strong>${a.submissionFile}</strong> on ${CamuUtils.formatDate(a.submissionDate)}. Awaiting grade publication.
              </div>
            ` : ''}
          </div>

          <div class="camu-card-footer">
            <span class="text-muted small">Max file size: 50MB (PDF, ZIP, IPYNB, PY)</span>
            ${isPending ? `
              <button type="button" class="btn btn-sm btn-primary" onclick="CamuLMS.openSubmitModal('${a.id}', '${CamuUtils.escapeHtml(a.title)}')">
                <i class="bi bi-upload me-1"></i> Submit Assignment
              </button>
            ` : `
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="CamuUtils.showToast('Submission is locked and archived in university ledger.', 'info', 'Archived')">
                <i class="bi bi-archive me-1"></i> View Submission
              </button>
            `}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  bindAssignmentFilters() {
    const filter = document.getElementById("assignmentStatusFilter");
    if (filter) {
      filter.addEventListener("change", (e) => {
        this.renderAssignmentsList(e.target.value);
      });
    }
  },

  openSubmitModal(asgId, title) {
    document.getElementById("submitAsgIdInput").value = asgId;
    document.getElementById("submitAsgTitleDisplay").textContent = title;
    const modalElem = document.getElementById("submitAssignmentModal");
    if (modalElem && window.bootstrap) {
      bootstrap.Modal.getOrCreateInstance(modalElem).show();
    }
  },

  submitAssignmentForm(e) {
    e.preventDefault();
    const asgId = document.getElementById("submitAsgIdInput").value;
    const fileInput = document.getElementById("asgFileInput");
    const comments = document.getElementById("asgCommentsInput").value;

    const fileName = fileInput.files[0] ? fileInput.files[0].name : "Student_Submission_" + asgId + ".zip";

    CamuStorage.submitAssignment(asgId, fileName, comments);
    CamuUtils.showToast(`Assignment successfully submitted! File "${fileName}" recorded.`, "success", "Submission Complete");

    const modalElem = document.getElementById("submitAssignmentModal");
    if (modalElem && window.bootstrap) {
      bootstrap.Modal.getInstance(modalElem)?.hide();
    }

    this.renderAssignmentsList();
  }
};
