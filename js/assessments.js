/**
 * MY CAMU - Interactive Assessment & Quiz Engine
 * Features real-time countdown timer, question palette, scoring engine, review mode, and persistence.
 */

const CamuAssessments = {
  currentQuiz: null,
  currentQuestionIndex: 0,
  userAnswers: {},
  timerInterval: null,
  secondsLeft: 0,
  isReviewMode: false,

  init() {
    this.renderQuizzesList();
  },

  renderQuizzesList() {
    const container = document.getElementById("quizzesListContainer");
    if (!container) return;

    const quizzes = CamuStorage.getQuizzes();
    let html = "";

    quizzes.forEach(q => {
      const isCompleted = q.lastScore !== null && q.lastScore !== undefined;

      html += `
        <div class="col-lg-6 mb-4">
          <div class="camu-card">
            <div class="camu-card-header">
              <span class="badge bg-primary">${q.courseCode}</span>
              ${isCompleted ? `<span class="badge bg-success-subtle text-success fs-6"><i class="bi bi-check-circle-fill me-1"></i>Score: ${q.lastScore}%</span>` : `<span class="badge bg-warning-subtle text-warning"><i class="bi bi-clock me-1"></i>Not Attempted</span>`}
            </div>
            <div class="camu-card-body">
              <h5 class="fw-bold text-main mb-1">${q.title}</h5>
              <div class="text-muted small mb-3">${q.courseTitle}</div>

              <div class="row g-2 text-center small bg-subtle p-2.5 rounded-3 mb-3">
                <div class="col-4 border-end">
                  <div class="text-muted" style="font-size: 0.72rem;">DURATION</div>
                  <div class="fw-bold">${q.durationMinutes} Mins</div>
                </div>
                <div class="col-4 border-end">
                  <div class="text-muted" style="font-size: 0.72rem;">QUESTIONS</div>
                  <div class="fw-bold">${q.questions.length} MCQs</div>
                </div>
                <div class="col-4">
                  <div class="text-muted" style="font-size: 0.72rem;">PASSING</div>
                  <div class="fw-bold">${q.passingScore}%</div>
                </div>
              </div>

              ${isCompleted ? `
                <div class="text-muted small mb-3">
                  <i class="bi bi-calendar-check me-1"></i>Last Attempted on: <strong>${q.completedDate}</strong>
                </div>
              ` : ''}

              <div class="d-flex gap-2">
                <button type="button" class="btn btn-primary flex-grow-1" onclick="CamuAssessments.startQuiz('${q.id}')">
                  <i class="bi bi-play-circle-fill me-1"></i> ${isCompleted ? 'Re-take Quiz' : 'Start Assessment'}
                </button>
                ${isCompleted ? `
                  <button type="button" class="btn btn-outline-secondary" onclick="CamuAssessments.reviewQuiz('${q.id}')">
                    <i class="bi bi-eye me-1"></i> Review
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  startQuiz(quizId) {
    const q = CamuStorage.getQuizById(quizId);
    if (!q) return;

    this.currentQuiz = q;
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.isReviewMode = false;
    this.secondsLeft = q.durationMinutes * 60;

    // Show Quiz Arena, hide quiz list
    document.getElementById("quizListSection").classList.add("d-none");
    document.getElementById("quizArenaSection").classList.remove("d-none");
    document.getElementById("quizResultSection").classList.add("d-none");

    document.getElementById("arenaQuizTitle").textContent = q.title;
    document.getElementById("arenaCourseCode").textContent = q.courseCode;

    // Start Timer
    this.startTimer();

    // Render Question & Palette
    this.renderQuestion();
    this.renderQuestionPalette();
  },

  startTimer() {
    clearInterval(this.timerInterval);
    const timerElem = document.getElementById("quizTimerDisplay");

    const updateTimer = () => {
      const mins = Math.floor(this.secondsLeft / 60);
      const secs = this.secondsLeft % 60;
      timerElem.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (this.secondsLeft <= 0) {
        clearInterval(this.timerInterval);
        CamuUtils.showToast("Time expired! Automatically submitting your assessment.", "warning", "Time Up");
        this.submitAssessment(true);
      }
      this.secondsLeft--;
    };

    updateTimer();
    this.timerInterval = setInterval(updateTimer, 1000);
  },

  renderQuestion() {
    const q = this.currentQuiz.questions[this.currentQuestionIndex];
    if (!q) return;

    document.getElementById("currentQuestionNumber").textContent = `Question ${this.currentQuestionIndex + 1} of ${this.currentQuiz.questions.length}`;
    document.getElementById("questionPrompt").textContent = q.question;

    const optionsContainer = document.getElementById("questionOptionsContainer");
    let html = "";

    q.options.forEach((opt, idx) => {
      const isSelected = this.userAnswers[this.currentQuestionIndex] === idx;
      let optionClass = isSelected ? "selected" : "";

      if (this.isReviewMode) {
        if (idx === q.correctIndex) optionClass = "bg-success-subtle border-success text-success fw-bold";
        else if (isSelected && idx !== q.correctIndex) optionClass = "bg-danger-subtle border-danger text-danger";
      }

      html += `
        <div class="quiz-option-card ${optionClass}" onclick="CamuAssessments.selectOption(${idx})">
          <span class="badge rounded-circle p-2 ${isSelected ? 'bg-primary text-white' : 'bg-light text-dark border'}" style="width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center;">
            ${String.fromCharCode(65 + idx)}
          </span>
          <span class="flex-grow-1">${opt}</span>
        </div>
      `;
    });

    if (this.isReviewMode) {
      html += `
        <div class="p-3 mt-3 rounded-3 bg-light border text-muted small">
          <div class="fw-bold text-success mb-1"><i class="bi bi-info-circle-fill me-1"></i> Explanation:</div>
          <div>${q.explanation}</div>
        </div>
      `;
    }

    optionsContainer.innerHTML = html;

    // Update navigation buttons
    document.getElementById("btnPrevQuestion").disabled = this.currentQuestionIndex === 0;
    const nextBtn = document.getElementById("btnNextQuestion");
    if (this.currentQuestionIndex === this.currentQuiz.questions.length - 1) {
      nextBtn.innerHTML = `Submit Exam <i class="bi bi-check2-circle ms-1"></i>`;
      nextBtn.className = "btn btn-success fw-bold";
    } else {
      nextBtn.innerHTML = `Next Question <i class="bi bi-arrow-right ms-1"></i>`;
      nextBtn.className = "btn btn-primary";
    }

    this.renderQuestionPalette();
  },

  selectOption(optionIndex) {
    if (this.isReviewMode) return;
    this.userAnswers[this.currentQuestionIndex] = optionIndex;
    this.renderQuestion();
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderQuestion();
    }
  },

  nextQuestion() {
    if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderQuestion();
    } else {
      // Last question clicked -> confirm submission
      this.confirmSubmit();
    }
  },

  jumpToQuestion(idx) {
    this.currentQuestionIndex = idx;
    this.renderQuestion();
  },

  renderQuestionPalette() {
    const palette = document.getElementById("questionPalette");
    if (!palette || !this.currentQuiz) return;

    let html = "";
    this.currentQuiz.questions.forEach((q, idx) => {
      const isAnswered = this.userAnswers[idx] !== undefined;
      const isActive = idx === this.currentQuestionIndex;

      let btnClass = "";
      if (isActive) btnClass = "active";
      else if (isAnswered) btnClass = "answered";

      html += `
        <button type="button" class="q-nav-btn ${btnClass}" onclick="CamuAssessments.jumpToQuestion(${idx})">
          ${idx + 1}
        </button>
      `;
    });

    palette.innerHTML = html;
  },

  confirmSubmit() {
    const answeredCount = Object.keys(this.userAnswers).length;
    const totalCount = this.currentQuiz.questions.length;
    const modalBody = document.getElementById("submitQuizModalBody");
    modalBody.innerHTML = `You have answered <strong>${answeredCount}</strong> of <strong>${totalCount}</strong> questions. Are you sure you wish to submit?`;

    const modal = new bootstrap.Modal(document.getElementById("submitQuizModal"));
    modal.show();
  },

  submitAssessment(force = false) {
    clearInterval(this.timerInterval);

    // Hide confirmation modal
    const modalElem = document.getElementById("submitQuizModal");
    if (modalElem && window.bootstrap) {
      bootstrap.Modal.getInstance(modalElem)?.hide();
    }

    // Calculate Score
    let correctCount = 0;
    this.currentQuiz.questions.forEach((q, idx) => {
      if (this.userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const totalQuestions = this.currentQuiz.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= this.currentQuiz.passingScore;

    // Save to storage
    CamuStorage.saveQuizResult(this.currentQuiz.id, percentage, this.userAnswers);

    // Show Results View
    document.getElementById("quizArenaSection").classList.add("d-none");
    document.getElementById("quizResultSection").classList.remove("d-none");

    document.getElementById("resultQuizTitle").textContent = this.currentQuiz.title;
    document.getElementById("resultScoreDisplay").textContent = `${percentage}%`;
    document.getElementById("resultFractionDisplay").textContent = `${correctCount} of ${totalQuestions} Questions Correct`;

    const badge = document.getElementById("resultStatusBadge");
    if (passed) {
      badge.className = "badge bg-success fs-6 py-2 px-3";
      badge.textContent = "PASSED ASSESSMENT";
    } else {
      badge.className = "badge bg-danger fs-6 py-2 px-3";
      badge.textContent = "DID NOT PASS";
    }

    CamuUtils.showToast(`Quiz completed! Your score: ${percentage}%.`, "success", "Assessment Evaluated");
  },

  reviewQuiz(quizId) {
    const q = CamuStorage.getQuizById(quizId);
    if (!q) return;

    this.currentQuiz = q;
    this.currentQuestionIndex = 0;
    this.userAnswers = q.userAnswers || {};
    this.isReviewMode = true;

    clearInterval(this.timerInterval);
    document.getElementById("quizTimerDisplay").textContent = "REVIEW";

    document.getElementById("quizListSection").classList.add("d-none");
    document.getElementById("quizArenaSection").classList.remove("d-none");
    document.getElementById("quizResultSection").classList.add("d-none");

    document.getElementById("arenaQuizTitle").textContent = q.title + " (Answer Key Review)";
    document.getElementById("arenaCourseCode").textContent = q.courseCode;

    this.renderQuestion();
  },

  exitQuiz() {
    clearInterval(this.timerInterval);
    document.getElementById("quizListSection").classList.remove("d-none");
    document.getElementById("quizArenaSection").classList.add("d-none");
    document.getElementById("quizResultSection").classList.add("d-none");
    this.renderQuizzesList();
  }
};
