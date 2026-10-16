/**
 * MY CAMU - Student Profile Controller
 * Handles profile viewing, inline editing, skill tag management, photo upload, and persistence.
 */

const CamuProfile = {
  isEditing: false,

  init() {
    this.renderProfile();
    this.bindEvents();
  },

  renderProfile() {
    const p = CamuStorage.getProfile();

    // Header Summary
    document.getElementById("profileHeaderPhoto").src = p.photo;
    document.getElementById("profileHeaderPhoto").onerror = function() {
      this.src = "https://ui-avatars.com/api/?name=Vigneshwaran+R&background=2563eb&color=fff";
    };
    document.getElementById("profileHeaderName").textContent = p.name;
    document.getElementById("profileHeaderId").textContent = p.id;
    document.getElementById("profileHeaderDegree").textContent = p.degree + " in " + p.branch;
    document.getElementById("profileHeaderSem").textContent = `${p.currentYear} • ${p.currentSemester} • Section ${p.section}`;
    document.getElementById("profileHeaderCollege").textContent = p.college + ", " + p.university;

    // Personal Information Fields
    this.setField("fullNameInput", p.name);
    this.setField("studentIdInput", p.id);
    this.setField("regNoInput", p.regNo);
    this.setField("dobInput", p.dob);
    this.setField("genderSelect", p.gender);
    this.setField("bloodGroupSelect", p.bloodGroup);
    this.setField("personalEmailInput", p.personalEmail);
    this.setField("universityEmailInput", p.universityEmail);
    this.setField("phoneInput", p.phone);
    this.setField("addressInput", p.address);
    this.setField("cityInput", p.city);
    this.setField("stateInput", p.state);
    this.setField("postalCodeInput", p.postalCode);
    this.setField("emergencyContactInput", p.emergencyContact);

    // Academic Information Fields
    this.setField("universityInput", p.university);
    this.setField("collegeInput", p.college);
    this.setField("departmentInput", p.department);
    this.setField("degreeInput", p.degree);
    this.setField("branchInput", p.branch);
    this.setField("admissionYearInput", p.admissionYear);
    this.setField("graduationYearInput", p.graduationYear);
    this.setField("currentYearInput", p.currentYear);
    this.setField("currentSemesterInput", p.currentSemester);
    this.setField("sectionInput", p.section);
    this.setField("rollNoInput", p.rollNo);
    this.setField("academicAdvisorInput", p.academicAdvisor);
    this.setField("academicStatusInput", p.academicStatus);

    // Family Information Fields
    this.setField("fatherNameInput", p.fatherName);
    this.setField("fatherOccupationInput", p.fatherOccupation);
    this.setField("motherNameInput", p.motherName);
    this.setField("motherOccupationInput", p.motherOccupation);
    this.setField("guardianContactInput", p.guardianContact);
    this.setField("guardianEmailInput", p.guardianEmail);
    this.setField("permanentAddressInput", p.permanentAddress);

    // Professional & Social Links
    this.setField("linkedInInput", p.linkedIn);
    this.setField("githubInput", p.github);
    this.setField("portfolioInput", p.portfolio);

    // Render Skills Tags
    this.renderSkills(p.skills || []);
    this.renderLanguages(p.languages || []);
    this.renderInterests(p.careerInterests || []);

    // Set editable mode
    this.toggleEditMode(false);
  },

  setField(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val !== undefined ? val : "";
  },

  getField(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  },

  renderSkills(skills) {
    const container = document.getElementById("skillsContainer");
    if (!container) return;

    let html = "";
    skills.forEach((skill, idx) => {
      html += `
        <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2.5 py-1.5 rounded-pill d-inline-flex align-items-center gap-1.5">
          <span>${skill}</span>
          ${this.isEditing ? `<button type="button" class="btn-close btn-close-sm" style="font-size: 0.65rem;" onclick="CamuProfile.removeSkill(${idx})"></button>` : ''}
        </span>
      `;
    });

    if (this.isEditing) {
      html += `
        <div class="input-group input-group-sm d-inline-flex mt-1" style="width: 170px;">
          <input type="text" class="form-control" id="newSkillInput" placeholder="Add skill...">
          <button class="btn btn-outline-primary" type="button" onclick="CamuProfile.addSkill()"><i class="bi bi-plus-lg"></i></button>
        </div>
      `;
    }

    container.innerHTML = html;
  },

  renderLanguages(langs) {
    const container = document.getElementById("languagesContainer");
    if (!container) return;

    let html = "";
    langs.forEach(l => {
      html += `<span class="badge bg-secondary-subtle text-secondary px-2.5 py-1.5 rounded-pill">${l}</span> `;
    });
    container.innerHTML = html;
  },

  renderInterests(interests) {
    const container = document.getElementById("interestsContainer");
    if (!container) return;

    let html = "";
    interests.forEach(i => {
      html += `<span class="badge bg-info-subtle text-info px-2.5 py-1.5 rounded-pill">${i}</span> `;
    });
    container.innerHTML = html;
  },

  addSkill() {
    const input = document.getElementById("newSkillInput");
    if (!input || !input.value.trim()) return;

    const p = CamuStorage.getProfile();
    const skills = p.skills || [];
    skills.push(input.value.trim());
    p.skills = skills;
    CamuStorage.updateProfile({ skills });
    this.renderSkills(skills);
  },

  removeSkill(idx) {
    const p = CamuStorage.getProfile();
    const skills = p.skills || [];
    skills.splice(idx, 1);
    p.skills = skills;
    CamuStorage.updateProfile({ skills });
    this.renderSkills(skills);
  },

  toggleEditMode(enable) {
    this.isEditing = enable;
    const inputs = document.querySelectorAll(".profile-editable-field");
    inputs.forEach(input => {
      if (enable) {
        input.removeAttribute("readonly");
        input.removeAttribute("disabled");
        input.classList.add("border-primary");
      } else {
        input.setAttribute("readonly", "true");
        input.setAttribute("disabled", "true");
        input.classList.remove("border-primary");
      }
    });

    document.getElementById("btnEditProfile").classList.toggle("d-none", enable);
    document.getElementById("btnSaveProfile").classList.toggle("d-none", !enable);
    document.getElementById("btnCancelProfile").classList.toggle("d-none", !enable);

    // Re-render skills with/without delete buttons
    const p = CamuStorage.getProfile();
    this.renderSkills(p.skills || []);
  },

  saveChanges() {
    // Validate inputs
    const fullName = this.getField("fullNameInput");
    const personalEmail = this.getField("personalEmailInput");
    const phone = this.getField("phoneInput");

    if (!fullName || !personalEmail || !phone) {
      CamuUtils.showToast("Please ensure Full Name, Email, and Phone number are filled.", "danger", "Validation Error");
      return;
    }

    const updated = {
      name: fullName,
      dob: this.getField("dobInput"),
      gender: this.getField("genderSelect"),
      bloodGroup: this.getField("bloodGroupSelect"),
      personalEmail: personalEmail,
      phone: phone,
      address: this.getField("addressInput"),
      city: this.getField("cityInput"),
      state: this.getField("stateInput"),
      postalCode: this.getField("postalCodeInput"),
      emergencyContact: this.getField("emergencyContactInput"),

      // Family
      fatherName: this.getField("fatherNameInput"),
      fatherOccupation: this.getField("fatherOccupationInput"),
      motherName: this.getField("motherNameInput"),
      motherOccupation: this.getField("motherOccupationInput"),
      guardianContact: this.getField("guardianContactInput"),
      guardianEmail: this.getField("guardianEmailInput"),
      permanentAddress: this.getField("permanentAddressInput"),

      // Social
      linkedIn: this.getField("linkedInInput"),
      github: this.getField("githubInput"),
      portfolio: this.getField("portfolioInput")
    };

    CamuStorage.updateProfile(updated);
    this.toggleEditMode(false);
    this.renderProfile();

    // Re-render Topbar and Sidebar to reflect changes immediately
    CamuNav.renderSidebar();
    CamuNav.renderTopbar();

    CamuUtils.showToast("Profile details updated successfully and saved to localStorage.", "success", "Profile Saved");
  },

  cancelEdit() {
    this.toggleEditMode(false);
    this.renderProfile();
    CamuUtils.showToast("Changes discarded.", "info", "Cancelled");
  },

  handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      CamuUtils.showToast("Please select a valid image file (JPG, PNG).", "warning", "File Type");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUri = e.target.result;
      CamuStorage.updateProfile({ photo: dataUri });
      document.getElementById("profileHeaderPhoto").src = dataUri;
      CamuNav.renderSidebar();
      CamuNav.renderTopbar();
      CamuUtils.showToast("Profile photo updated successfully!", "success", "Photo Changed");
      
      const modalElem = document.getElementById("photoUploadModal");
      if (modalElem && window.bootstrap) {
        bootstrap.Modal.getInstance(modalElem)?.hide();
      }
    };
    reader.readAsDataURL(file);
  },

  handleResumeUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name;
    CamuStorage.updateProfile({
      resumeName: fileName,
      resumeLastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    });

    document.getElementById("resumeNameDisplay").textContent = fileName;
    document.getElementById("resumeUpdatedDisplay").textContent = "Updated just now";
    CamuUtils.showToast(`Resume "${fileName}" uploaded to student profile.`, "success", "Resume Uploaded");
  },

  bindEvents() {
    document.getElementById("btnEditProfile")?.addEventListener("click", () => this.toggleEditMode(true));
    document.getElementById("btnSaveProfile")?.addEventListener("click", () => this.saveChanges());
    document.getElementById("btnCancelProfile")?.addEventListener("click", () => this.cancelEdit());
    document.getElementById("profilePhotoFileInput")?.addEventListener("change", (e) => this.handlePhotoUpload(e));
    document.getElementById("resumeFileInput")?.addEventListener("change", (e) => this.handleResumeUpload(e));
  }
};
