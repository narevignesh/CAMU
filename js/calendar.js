/**
 * MY CAMU - Calendar Controller
 */

const CamuCalendar = {
  currentDate: new Date(),

  init() {
    this.renderCalendarGrid();
    this.renderUpcomingList();
    this.bindEvents();
  },

  renderCalendarGrid() {
    const grid = document.getElementById("calendarDaysGrid");
    if (!grid) return;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("calendarMonthTitle").textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const events = CamuStorage.getCalendarEvents();

    let html = "";
    // Blank days before first day
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="p-2 border bg-light text-muted opacity-50" style="min-height: 90px;"></div>`;
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      const isToday = new Date().toISOString().split("T")[0] === dateStr;

      let eventBadges = "";
      dayEvents.forEach(e => {
        let badgeColor = "bg-primary";
        if (e.type === "deadline") badgeColor = "bg-danger";
        else if (e.type === "placement") badgeColor = "bg-success";
        else if (e.type === "exam") badgeColor = "bg-warning text-dark";

        eventBadges += `<div class="badge ${badgeColor} text-truncate d-block mb-1 text-start" style="font-size: 0.68rem;" title="${e.title}">${e.title}</div>`;
      });

      html += `
        <div class="p-2 border position-relative ${isToday ? 'bg-primary-subtle border-primary' : 'bg-surface'}" style="min-height: 90px;">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="fw-bold small ${isToday ? 'text-primary' : 'text-main'}">${day}</span>
            ${isToday ? '<span class="badge bg-primary text-white" style="font-size: 0.6rem;">TODAY</span>' : ''}
          </div>
          <div>${eventBadges}</div>
        </div>
      `;
    }

    grid.innerHTML = html;
  },

  renderUpcomingList() {
    const container = document.getElementById("upcomingCalendarEventsList");
    if (!container) return;

    const events = CamuStorage.getCalendarEvents().slice(0, 6);
    let html = "";

    events.forEach(e => {
      let icon = "bi-calendar-event text-primary";
      if (e.type === "deadline") icon = "bi-alarm text-danger";
      else if (e.type === "placement") icon = "bi-briefcase text-success";
      else if (e.type === "exam") icon = "bi-pencil-square text-warning";

      html += `
        <div class="p-2.5 rounded-3 border bg-surface mb-2 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <i class="bi ${icon} fs-5"></i>
            <div>
              <div class="fw-semibold small text-main">${e.title}</div>
              <div class="text-muted" style="font-size: 0.74rem;">${CamuUtils.formatDate(e.date)} &bull; ${e.time || '--'}</div>
            </div>
          </div>
          <span class="badge bg-light text-dark border text-capitalize small">${e.type}</span>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendarGrid();
  },

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendarGrid();
  },

  openAddModal() {
    document.getElementById("addEventForm").reset();
    document.getElementById("eventDateInput").value = new Date().toISOString().split("T")[0];
    const modal = new bootstrap.Modal(document.getElementById("addEventModal"));
    modal.show();
  },

  handleAddEvent(e) {
    e.preventDefault();
    const title = document.getElementById("eventTitleInput").value.trim();
    const date = document.getElementById("eventDateInput").value;
    const time = document.getElementById("eventTimeInput").value || "09:00 AM";
    const type = document.getElementById("eventTypeSelect").value;

    if (!title || !date) {
      CamuUtils.showToast("Please provide title and date.", "warning", "Validation");
      return;
    }

    CamuStorage.addCalendarEvent({ title, date, time, type });
    bootstrap.Modal.getInstance(document.getElementById("addEventModal"))?.hide();
    CamuUtils.showToast(`Reminder "${title}" added to academic calendar!`, "success", "Event Added");
    this.renderCalendarGrid();
    this.renderUpcomingList();
  },

  bindEvents() {
    document.getElementById("btnPrevMonth")?.addEventListener("click", () => this.prevMonth());
    document.getElementById("btnNextMonth")?.addEventListener("click", () => this.nextMonth());
    document.getElementById("addEventForm")?.addEventListener("submit", (e) => this.handleAddEvent(e));
  }
};
