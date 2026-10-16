/**
 * MY CAMU - Fees & Payments Controller
 * Manages financial ledger, fee category breakdown, transaction history, and demo payment workflow.
 */

const CamuFees = {
  init() {
    this.renderSummary();
    this.renderBreakdown();
    this.renderHistory();
    this.bindEvents();
  },

  renderSummary() {
    const fees = CamuStorage.getFees();

    document.getElementById("totalFeesDisplay").textContent = CamuUtils.formatCurrency(fees.totalFee);
    document.getElementById("paidFeesDisplay").textContent = CamuUtils.formatCurrency(fees.paidAmount);
    document.getElementById("balanceFeesDisplay").textContent = CamuUtils.formatCurrency(fees.outstandingBalance);

    const badge = document.getElementById("feeStatusBadge");
    if (fees.outstandingBalance === 0) {
      badge.className = "badge bg-success-subtle text-success border border-success-subtle px-3 py-2 fs-6";
      badge.innerHTML = `<i class="bi bi-check-circle-fill me-1"></i> Paid in Full &bull; No Dues`;
    } else {
      badge.className = "badge bg-warning-subtle text-warning border border-warning-subtle px-3 py-2 fs-6";
      badge.innerHTML = `<i class="bi bi-clock-history me-1"></i> Outstanding Balance Due`;
    }
  },

  renderBreakdown() {
    const tbody = document.getElementById("feeBreakdownTableBody");
    if (!tbody) return;

    const fees = CamuStorage.getFees();
    let html = "";

    fees.breakdown.forEach((item, idx) => {
      const isCredit = item.amount < 0;
      html += `
        <tr>
          <td><span class="badge bg-light text-dark border me-2">${idx + 1}</span><span class="fw-semibold text-main">${item.category}</span></td>
          <td class="text-end fw-bold ${isCredit ? 'text-success' : 'text-main'}">
            ${isCredit ? '- ' + CamuUtils.formatCurrency(Math.abs(item.amount)) : CamuUtils.formatCurrency(item.amount)}
          </td>
          <td class="text-center">
            <span class="badge ${item.status === 'Paid' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'}">${item.status}</span>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  renderHistory() {
    const tbody = document.getElementById("feeHistoryTableBody");
    if (!tbody) return;

    const fees = CamuStorage.getFees();
    let html = "";

    if (!fees.history || fees.history.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No transactions recorded.</td></tr>`;
      return;
    }

    fees.history.forEach(tx => {
      html += `
        <tr>
          <td><span class="fw-bold font-monospace text-primary">${tx.receiptNo}</span></td>
          <td>${CamuUtils.formatDate(tx.date)}</td>
          <td><span class="fw-semibold text-main">${tx.term}</span></td>
          <td class="fw-bold">${CamuUtils.formatCurrency(tx.amount)}</td>
          <td><span class="badge bg-light text-dark border">${tx.paymentMode}</span></td>
          <td class="text-center">
            <button type="button" class="btn btn-sm btn-outline-primary" onclick="CamuFees.viewReceipt('${tx.receiptNo}')">
              <i class="bi bi-receipt me-1"></i> Receipt
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  openPaymentModal() {
    const fees = CamuStorage.getFees();
    const payInput = document.getElementById("demoPayAmountInput");
    if (payInput) {
      payInput.value = fees.outstandingBalance > 0 ? fees.outstandingBalance : 25000;
    }
    const modal = new bootstrap.Modal(document.getElementById("demoPaymentModal"));
    modal.show();
  },

  processPayment(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("demoPayAmountInput").value);
    const mode = document.getElementById("demoPaymentModeSelect").value;
    const term = document.getElementById("demoPayTermInput").value;

    if (!amount || amount <= 0) {
      CamuUtils.showToast("Please enter a valid amount.", "warning", "Validation");
      return;
    }

    const { receipt } = CamuStorage.recordPayment(amount, mode, term);
    
    // Hide payment modal
    bootstrap.Modal.getInstance(document.getElementById("demoPaymentModal"))?.hide();

    this.renderSummary();
    this.renderHistory();

    // Show simulated receipt modal
    this.viewReceipt(receipt.receiptNo);
  },

  viewReceipt(receiptNo) {
    const fees = CamuStorage.getFees();
    const tx = (fees.history || []).find(h => h.receiptNo === receiptNo) || fees.history[0];
    if (!tx) return;

    const profile = CamuStorage.getProfile();

    document.getElementById("receiptNoDisplay").textContent = tx.receiptNo;
    document.getElementById("receiptDateDisplay").textContent = CamuUtils.formatDate(tx.date);
    document.getElementById("receiptStudentName").textContent = profile.name;
    document.getElementById("receiptStudentId").textContent = profile.id;
    document.getElementById("receiptStudentBranch").textContent = profile.branch;
    document.getElementById("receiptDescription").textContent = tx.term;
    document.getElementById("receiptAmount").textContent = CamuUtils.formatCurrency(tx.amount);
    document.getElementById("receiptMode").textContent = tx.paymentMode;
    document.getElementById("receiptRef").textContent = tx.transactionRef;

    const modal = new bootstrap.Modal(document.getElementById("receiptModal"));
    modal.show();
  },

  bindEvents() {
    document.getElementById("demoPaymentForm")?.addEventListener("submit", (e) => this.processPayment(e));
  }
};
