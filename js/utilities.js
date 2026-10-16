/**
 * MY CAMU - Utility Functions & Helpers
 */

const CamuUtils = {
  /**
   * Format Indian Rupee Currency
   */
  formatCurrency(amount) {
    if (isNaN(amount)) return "₹0";
    return "₹" + Number(amount).toLocaleString("en-IN");
  },

  /**
   * Format date string to readable format
   */
  formatDate(dateString) {
    if (!dateString) return "--";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch (e) {
      return dateString;
    }
  },

  /**
   * Toast notification system
   */
  showToast(message, type = "info", title = "Notification") {
    let container = document.getElementById("camuToastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "camuToastContainer";
      container.className = "toast-container position-fixed bottom-0 end-0 p-3";
      container.style.zIndex = "1090";
      document.body.appendChild(container);
    }

    const toastId = "toast_" + Date.now();
    const bgMap = {
      success: "bg-success text-white",
      danger: "bg-danger text-white",
      warning: "bg-warning text-dark",
      info: "bg-primary text-white"
    };

    const iconMap = {
      success: "bi-check-circle-fill",
      danger: "bi-exclamation-triangle-fill",
      warning: "bi-exclamation-circle-fill",
      info: "bi-info-circle-fill"
    };

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center ${bgMap[type] || 'bg-primary text-white'} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi ${iconMap[type] || 'bi-info-circle-fill'} fs-5"></i>
            <div>
              <div class="fw-bold">${title}</div>
              <div class="small">${message}</div>
            </div>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", toastHtml);
    const toastElem = document.getElementById(toastId);
    if (window.bootstrap && window.bootstrap.Toast) {
      const bsToast = new bootstrap.Toast(toastElem, { delay: 4000 });
      bsToast.show();
      toastElem.addEventListener("hidden.bs.toast", () => toastElem.remove());
    } else {
      setTimeout(() => toastElem.remove(), 4000);
    }
  },

  /**
   * Calculate Attendance Needed / Can Miss
   */
  calculateAttendanceTarget(conducted, attended, targetPct = 75) {
    const currentPct = (attended / conducted) * 100;
    
    if (currentPct >= targetPct) {
      // How many can miss without dropping below targetPct
      // attended / (conducted + x) = targetPct / 100
      // 100 * attended >= targetPct * conducted + targetPct * x
      // x = (100 * attended - targetPct * conducted) / targetPct
      const canMiss = Math.floor((100 * attended - targetPct * conducted) / targetPct);
      return {
        status: "safe",
        canMiss: Math.max(0, canMiss),
        needAttend: 0,
        currentPct: currentPct.toFixed(2),
        message: `You are above your target! You can safely miss ${canMiss} more classes and still maintain ${targetPct}%.`
      };
    } else {
      // How many consecutive classes needed
      // (attended + y) / (conducted + y) = targetPct / 100
      // 100 * attended + 100 * y = targetPct * conducted + targetPct * y
      // y * (100 - targetPct) = targetPct * conducted - 100 * attended
      // y = (targetPct * conducted - 100 * attended) / (100 - targetPct)
      const needAttend = Math.ceil((targetPct * conducted - 100 * attended) / (100 - targetPct));
      return {
        status: "shortage",
        canMiss: 0,
        needAttend: Math.max(0, needAttend),
        currentPct: currentPct.toFixed(2),
        message: `Attendance shortage! You must attend the next ${needAttend} consecutive classes to reach ${targetPct}%.`
      };
    }
  },

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
};
