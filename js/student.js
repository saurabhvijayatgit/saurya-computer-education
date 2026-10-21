/**
 * Saurya Computer Education - Student Panel Controller (PRD v3.0)
 * Practical, operational workspace: Check-in/out Attendance, Fee Submission, Notes & Timed Exams
 */

class StudentPortal {
  constructor() {
    this.currentView = "dashboard"; // dashboard, attendance, fees, courses, notes, exams, results, idcard
    this.activeExam = null;
    this.examTimer = null;
    this.examSecondsLeft = 0;
    this.examAnswers = {};
    this.currentQuestionIdx = 0;

    this.init();
  }

  init() {
    this.attachGlobalEvents();
  }

  attachGlobalEvents() {
    // Demo login shortcut
    document.addEventListener("click", (e) => {
      if (e.target.closest("#btn-demo-student-login")) {
        const idInput = document.getElementById("student-login-id");
        const passInput = document.getElementById("student-login-pass");
        if (idInput && passInput) {
          idInput.value = "SCE-2026-0001";
          passInput.value = "student123";
          document.getElementById("student-login-form")?.dispatchEvent(new Event("submit"));
        }
      }
    });
  }

  render() {
    const student = window.store ? window.store.currentStudent : null;
    const authCard = document.getElementById("student-auth-view");
    const portalLayout = document.getElementById("student-main-layout");

    if (!student) {
      if (authCard) authCard.style.display = "block";
      if (portalLayout) portalLayout.style.display = "none";
      this.renderLoginForm();
    } else {
      if (authCard) authCard.style.display = "none";
      if (portalLayout) portalLayout.style.display = "grid";
      this.renderSidebar(student);
      this.switchPane(this.currentView);
    }
  }

  renderLoginForm() {
    const form = document.getElementById("student-login-form");
    if (!form) return;

    form.onsubmit = (e) => {
      e.preventDefault();
      const id = document.getElementById("student-login-id")?.value;
      const pass = document.getElementById("student-login-pass")?.value;

      const res = window.store.loginStudent(id, pass);
      if (res.success) {
        window.showToast(`Authenticated as ${res.student.name}`, "success");
        this.render();
      } else {
        window.showToast(res.message, "error");
      }
    };
  }

  renderSidebar(student) {
    const nameEl = document.getElementById("student-sidebar-name");
    const idEl = document.getElementById("student-sidebar-id");
    const avatarEl = document.getElementById("student-sidebar-avatar");

    if (nameEl) nameEl.textContent = student.name;
    if (idEl) idEl.textContent = student.studentId;
    if (avatarEl && student.avatar) avatarEl.src = student.avatar;

    document.querySelectorAll(".portal-nav-item").forEach(item => {
      item.onclick = () => {
        const pane = item.getAttribute("data-pane");
        if (pane === "logout") {
          window.store.logoutStudent();
          window.showToast("Logged out of Student Panel.", "info");
          this.render();
          return;
        }
        document.querySelectorAll(".portal-nav-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        this.switchPane(pane);
      };
    });
  }

  switchPane(paneId) {
    this.currentView = paneId;
    document.querySelectorAll(".portal-view-pane").forEach(p => p.classList.remove("active"));
    const activePane = document.getElementById(`pane-${paneId}`);
    if (activePane) activePane.classList.add("active");

    const student = window.store.currentStudent;
    if (!student) return;

    if (paneId === "dashboard") this.renderDashboard(student);
    if (paneId === "attendance") this.renderAttendanceView(student);
    if (paneId === "fees") this.renderFeesView(student);
    if (paneId === "courses") this.renderCoursesView(student);
    if (paneId === "notes") this.renderNotesView(student);
    if (paneId === "exams") this.renderExamsView(student);
    if (paneId === "results") this.renderResultsView(student);
    if (paneId === "idcard") this.renderIdCardView(student);
  }

  // --- 1. Student Dashboard (Section 4.1) ---
  renderDashboard(student) {
    const welcomeTitle = document.getElementById("student-welcome-title");
    const welcomeMeta = document.getElementById("student-welcome-meta");
    const todayAttStatus = document.getElementById("dash-today-att-status");
    const dashFeeStatus = document.getElementById("dash-fee-balance-val");
    const dashFeeBadge = document.getElementById("dash-fee-badge");
    const dashTicker = document.getElementById("dash-announcements-ticker");

    if (welcomeTitle) welcomeTitle.textContent = student.name;
    if (welcomeMeta) {
      welcomeMeta.textContent = `Student ID: ${student.studentId} • ${student.courseName} (${student.batch})`;
    }

    // Today's Attendance Widget on Dashboard
    if (todayAttStatus) {
      const att = student.attendance?.today;
      const hasCheckedIn = att && att.checkedIn;
      const hasCheckedOut = att && att.checkedOut;

      todayAttStatus.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Today's Session Attendance</div>
            <strong style="font-size: 1.15rem; color: ${hasCheckedIn ? 'var(--accent-emerald)' : 'var(--accent-amber)'};">
              ${hasCheckedIn ? (hasCheckedOut ? '✓ Completed (' + att.checkInTime + ' - ' + att.checkOutTime + ')' : '● Checked In at ' + att.checkInTime) : 'Not Checked In'}
            </strong>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="studentPortal.handleCheckIn('${student.studentId}')" ${hasCheckedIn ? 'disabled style="opacity:0.5;"' : ''}>
              📥 Check In
            </button>
            <button class="btn btn-primary btn-sm" onclick="studentPortal.handleCheckOut('${student.studentId}')" ${(!hasCheckedIn || hasCheckedOut) ? 'disabled style="opacity:0.5;"' : ''}>
              📤 Check Out
            </button>
          </div>
        </div>
      `;
    }

    // Fee Balance Widget
    if (dashFeeStatus && student.fees) {
      dashFeeStatus.textContent = `₹${student.fees.outstandingBalance.toLocaleString()}`;
    }
    if (dashFeeBadge && student.fees) {
      const isPaid = student.fees.outstandingBalance === 0;
      dashFeeBadge.textContent = isPaid ? "Paid in Full" : "Pending Balance";
      dashFeeBadge.className = `badge ${isPaid ? 'badge-green' : 'badge-amber'}`;
    }

    // Announcements
    if (dashTicker) {
      const anns = window.store.state.institute?.announcements || [];
      dashTicker.innerHTML = anns.map(a => `
        <div style="padding: 10px 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
          <div>
            <strong style="font-size: 0.92rem; color: var(--text-primary);">${a.title}</strong>
            <p style="font-size: 0.84rem; color: var(--text-secondary); margin-top: 3px;">${a.body}</p>
          </div>
          <small style="color: var(--text-muted); font-size: 0.75rem; white-space: nowrap;">${a.date}</small>
        </div>
      `).join("");
    }
  }

  // --- 2. Attendance Management: Check-In & Check-Out (Section 4.4) ---
  renderAttendanceView(student) {
    const container = document.getElementById("student-attendance-content");
    if (!container) return;

    const att = student.attendance || { totalSessions: 0, sessionsAttended: 0, percentage: 100, logs: [] };
    const today = att.today || {};

    container.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <h3>Daily Session Attendance Record</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 4px;">
              Enrolled Batch: <strong>${student.batch}</strong> • Minimum mandatory attendance: 75%
            </p>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary" onclick="studentPortal.handleCheckIn('${student.studentId}')" ${today.checkedIn ? 'disabled style="opacity:0.5;"' : ''}>
              📥 Check In (Arrival)
            </button>
            <button class="btn btn-primary" onclick="studentPortal.handleCheckOut('${student.studentId}')" ${(!today.checkedIn || today.checkedOut) ? 'disabled style="opacity:0.5;"' : ''}>
              📤 Check Out (Departure)
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-color);">
          <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Overall Attendance</div>
            <strong style="font-size: 1.6rem; color: ${att.percentage >= 75 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">${att.percentage}%</strong>
          </div>
          <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Sessions Attended</div>
            <strong style="font-size: 1.6rem; color: var(--text-primary);">${att.sessionsAttended} / ${att.totalSessions}</strong>
          </div>
          <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Today's Check-In</div>
            <strong style="font-size: 1.2rem; color: var(--primary-light);">${today.checkedIn ? today.checkInTime : '—'}</strong>
          </div>
          <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Today's Check-Out</div>
            <strong style="font-size: 1.2rem; color: var(--secondary-light);">${today.checkedOut ? today.checkOutTime : (today.checkedIn ? 'In Session' : '—')}</strong>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Arrival (Check-In)</th>
              <th>Departure (Check-Out)</th>
              <th>Lab Duration</th>
              <th>Status</th>
              <th>Verification Notes</th>
            </tr>
          </thead>
          <tbody>
            ${(att.logs || []).map(l => `
              <tr>
                <td><strong>${l.date}</strong></td>
                <td style="font-family: var(--font-mono);">${l.checkIn}</td>
                <td style="font-family: var(--font-mono);">${l.checkOut}</td>
                <td>${l.duration}</td>
                <td>
                  <span class="badge ${l.status === 'Present' ? 'badge-green' : (l.status.includes('Leave') ? 'badge-primary' : 'badge-amber')}">
                    ${l.status}
                  </span>
                </td>
                <td style="font-size: 0.8rem; color: var(--text-muted);">
                  ${l.corrected ? `Adjusted by ${l.correctedBy}: ${l.correctionReason}` : 'Verified Timestamp'}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  handleCheckIn(studentId) {
    const res = window.store.checkInStudent(studentId);
    if (res.success) {
      window.showToast(`Check-In confirmed at ${res.time}. Session active.`, "success");
      this.render();
    } else {
      window.showToast(res.message, "warning");
    }
  }

  handleCheckOut(studentId) {
    const res = window.store.checkOutStudent(studentId);
    if (res.success) {
      window.showToast(`Check-Out confirmed at ${res.time}. Session completed.`, "success");
      this.render();
    } else {
      window.showToast(res.message, "warning");
    }
  }

  // --- 3. Fee Management & Online Submission (Section 4.3) ---
  renderFeesView(student) {
    const container = document.getElementById("student-fees-content");
    if (!container) return;

    const fees = student.fees || { totalPayable: 0, amountPaid: 0, outstandingBalance: 0, installments: [] };

    container.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <h3>Course Fee & Payment Accounting</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 4px;">
              Enrolled Course: <strong>${student.courseName}</strong>
            </p>
          </div>
          ${fees.outstandingBalance > 0 ? `
            <button class="btn btn-primary" onclick="studentPortal.openPaymentModal(${fees.outstandingBalance})">
              💳 Submit Online Fee Payment
            </button>
          ` : `
            <span class="badge badge-green" style="font-size: 0.85rem; padding: 6px 14px;">
              ✓ All Course Dues Cleared
            </span>
          `}
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-color);">
          <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Total Course Fee</div>
            <strong style="font-size: 1.5rem; color: var(--text-primary);">₹${fees.totalPayable.toLocaleString()}</strong>
          </div>
          <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Verified Amount Paid</div>
            <strong style="font-size: 1.5rem; color: var(--accent-emerald);">₹${fees.amountPaid.toLocaleString()}</strong>
          </div>
          <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Outstanding Balance</div>
            <strong style="font-size: 1.5rem; color: ${fees.outstandingBalance > 0 ? 'var(--accent-amber)' : 'var(--text-muted)'};">₹${fees.outstandingBalance.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      <h4 style="margin-bottom: 14px;">Payment History & Official Receipts</h4>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Receipt No</th>
              <th>Installment Details</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Date Paid</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            ${(fees.installments || []).map(ins => `
              <tr>
                <td style="font-family: var(--font-mono); font-weight: 600; color: var(--primary-light);">${ins.receiptNo || '—'}</td>
                <td>Installment #${ins.installmentNo} (Due: ${ins.dueDate})</td>
                <td><strong>₹${ins.amount.toLocaleString()}</strong></td>
                <td>${ins.paymentMode || '—'}</td>
                <td>${ins.paidAt || 'Pending'}</td>
                <td>
                  <span class="badge ${ins.status === 'Paid' ? 'badge-green' : 'badge-amber'}">${ins.status}</span>
                </td>
                <td>
                  ${ins.status === 'Paid' ? `
                    <button class="btn btn-secondary btn-sm" onclick="studentPortal.printReceipt('${ins.receiptNo}', ${ins.amount}, '${ins.paidAt}', '${ins.paymentMode}')">
                      📄 View Receipt
                    </button>
                  ` : '—'}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  openPaymentModal(maxBalance) {
    const modal = document.getElementById("student-payment-modal");
    const amountInput = document.getElementById("pay-amount-input");
    const balHelp = document.getElementById("pay-balance-help");
    if (!modal) return;

    if (amountInput) amountInput.value = Math.min(maxBalance, 4000);
    if (balHelp) balHelp.textContent = `Total pending balance: ₹${maxBalance.toLocaleString()}`;

    window.openModal("student-payment-modal");
  }

  processOnlinePayment() {
    const amount = document.getElementById("pay-amount-input")?.value;
    const method = document.getElementById("pay-method-select")?.value || "UPI (Google Pay / PhonePe)";
    const student = window.store.currentStudent;

    if (!amount || parseInt(amount, 10) <= 0) {
      window.showToast("Please enter a valid amount.", "warning");
      return;
    }

    const res = window.store.submitOnlineFeePayment(student.studentId, amount, method);
    window.closeModal("student-payment-modal");

    if (res.success) {
      window.showToast(`Payment of ₹${res.amount.toLocaleString()} verified successfully! Receipt #${res.receiptNo}`, "success");
      this.render();
      alert(`SAURYA COMPUTER EDUCATION — PAYMENT RECEIPT\n\nTransaction ID: ${res.transactionRef}\nReceipt No: ${res.receiptNo}\nAmount Paid: ₹${res.amount.toLocaleString()}\nMethod: ${method}\nRemaining Balance: ₹${res.balance.toLocaleString()}\nDate: ${res.date}\n\nYour transaction has been recorded and verified by the system.`);
    } else {
      window.showToast(res.message, "error");
    }
  }

  printReceipt(receiptNo, amount, date, mode) {
    const student = window.store.currentStudent;
    alert(`OFFICIAL PAYMENT RECEIPT — SAURYA COMPUTER EDUCATION\n\nReceipt Number: ${receiptNo}\nStudent Name: ${student.name} (${student.studentId})\nCourse: ${student.courseName}\nBatch: ${student.batch}\nAmount Paid: ₹${amount.toLocaleString()}\nPayment Mode: ${mode}\nDate of Issue: ${date}\nStatus: Verified & Processed\n\nAuthorized by Accounts Office.`);
  }

  // --- 4. Course Curriculum & Syllabus (Section 3.3) ---
  renderCoursesView(student) {
    const container = document.getElementById("student-courses-content");
    if (!container) return;

    const course = window.store.getCourseById(student.courseId);
    if (!course) {
      container.innerHTML = `<p>No curriculum assigned.</p>`;
      return;
    }

    container.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 24px;">
        <span class="badge badge-primary">${course.category}</span>
        <h3 style="margin-top: 6px; font-size: 1.4rem;">${course.name}</h3>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 4px;">
          Enrolled Batch: <strong>${student.batch}</strong> • Total Duration: <strong>${course.duration}</strong> (${course.totalHours} Hours)
        </p>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 8px;">${course.overview}</p>
      </div>

      <h4>Course Modules & Academic Syllabus</h4>
      <div class="timeline" style="margin-top: 16px;">
        ${course.syllabus.map((mod, idx) => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <h4 class="timeline-title">${mod.module}</h4>
            <ul class="timeline-topics">
              ${mod.topics.map(t => `<li>${t}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    `;
  }

  // --- 5. Notes & Learning Materials (Section 4.5) ---
  renderNotesView(student) {
    const listEl = document.getElementById("student-notes-list");
    if (!listEl) return;

    const notes = window.store.getNotes();
    const papers = window.store.getUploadedPapers();

    listEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h3>Learning Materials & Question Papers</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">Curriculum notes and offline practice question papers published by faculty.</p>
        </div>
      </div>

      <h4 style="margin-bottom: 12px;">Study Notes & Lecture Guides</h4>
      <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 30px;">
        ${notes.map(n => `
          <div class="course-card" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span class="badge badge-primary">${n.subject}</span>
              <small style="color: var(--text-muted);">${n.uploadDate} • ${n.fileSize}</small>
            </div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">${n.title}</h4>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px;">${n.summary}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 12px;">
              <small style="color: var(--text-muted);">Published by: <strong>${n.uploadedBy}</strong> • ${n.downloads} Downloads</small>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-secondary btn-sm" onclick="studentPortal.readNoteOnline('${n.id}')">
                  📖 Read Online
                </button>
                <button class="btn btn-primary btn-sm" onclick="studentPortal.downloadNote('${n.id}')">
                  ⬇️ Download PDF
                </button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <h4 style="margin-bottom: 12px;">Classroom Question Papers & Practice Sets</h4>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${papers.map(p => `
          <div class="course-card" style="padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="badge badge-secondary" style="font-size: 0.72rem;">${p.type === 'offline_paper' ? 'Previous Year Paper' : 'Practice Set'}</span>
                <h4 style="font-size: 1.05rem; margin-top: 6px;">${p.title}</h4>
                <small style="color: var(--text-muted);">${p.courseName} • Uploaded by ${p.uploadedBy} on ${p.uploadDate}</small>
              </div>
              <button class="btn btn-outline btn-sm" onclick="window.showToast('Downloaded ${p.title}', 'success')">
                ⬇️ Download (${p.fileSize})
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  readNoteOnline(noteId) {
    const note = window.store.getNotes().find(n => n.id === noteId);
    if (!note) return;

    const modal = document.getElementById("note-reader-modal");
    const title = document.getElementById("note-reader-title");
    const meta = document.getElementById("note-reader-meta");
    const content = document.getElementById("note-reader-content");

    if (title) title.textContent = note.title;
    if (meta) meta.textContent = `Subject: ${note.subject} • Faculty: ${note.uploadedBy} • Published: ${note.uploadDate}`;
    if (content) content.textContent = note.previewText;

    window.openModal("note-reader-modal");
  }

  downloadNote(noteId) {
    const note = window.store.getNotes().find(n => n.id === noteId);
    if (note) {
      note.downloads = (note.downloads || 0) + 1;
      window.store.saveState();
      window.showToast(`Downloading "${note.title}"...`, "success");
    }
  }

  // --- 6. Online Examinations (Section 4.6) ---
  renderExamsView(student) {
    const container = document.getElementById("student-exams-list");
    if (!container) return;

    const exams = window.store.getExams();
    container.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h3>Scheduled Assessments & Examinations</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">
          Structured online assessments scheduled by your course faculty with server-controlled timing.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${exams.map(ex => {
          const attempt = (student.examAttempts || []).find(a => a.examId === ex.id);
          return `
            <div class="course-card" style="padding: 22px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <span class="badge badge-primary">${ex.subject}</span>
                  <span class="badge ${attempt ? (attempt.status === 'Published' ? 'badge-green' : 'badge-amber') : 'badge-secondary'}">
                    ${attempt ? (attempt.status === 'Published' ? 'Graded' : 'Awaiting Review') : 'Available'}
                  </span>
                </div>
                <small style="color: var(--text-muted); font-size: 0.8rem;">
                  ⏱️ ${ex.durationMinutes} Minutes • Total Marks: ${ex.totalMarks}
                </small>
              </div>

              <h4 style="font-size: 1.2rem; margin-bottom: 6px;">${ex.title}</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 14px;">
                Course: <strong>${ex.courseName}</strong> • Batch: ${ex.batch} • Availability: ${ex.scheduledStart} to ${ex.scheduledEnd}
              </p>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 14px;">
                ${attempt ? `
                  <div>
                    <span style="font-weight: 700; color: var(--primary-light);">
                      Score: ${attempt.totalScore} / ${attempt.totalPossibleMarks} (${attempt.percentage}%)
                    </span>
                    <small style="display: block; color: var(--text-muted);">Submitted: ${new Date(attempt.submittedAt).toLocaleDateString()}</small>
                  </div>
                  <button class="btn btn-secondary btn-sm" onclick="studentPortal.viewScorecard('${attempt.attemptId}')">
                    📜 View Scorecard & Feedback
                  </button>
                ` : `
                  <span style="font-size: 0.82rem; color: var(--accent-emerald);">● Assessment window open</span>
                  <button class="btn btn-primary" onclick="studentPortal.startExam('${ex.id}')">
                    ✍️ Attempt Examination
                  </button>
                `}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  startExam(examId) {
    const exam = window.store.getExamById(examId);
    if (!exam) return;

    if (!confirm(`Begin examination "${exam.title}"?\n\n• Duration: ${exam.durationMinutes} minutes\n• Total Questions: ${exam.questions.length}\n• Objective questions will be auto-graded; descriptive answers evaluated by faculty.`)) {
      return;
    }

    this.activeExam = exam;
    this.examSecondsLeft = exam.durationMinutes * 60;
    this.examAnswers = {};
    this.currentQuestionIdx = 0;

    document.querySelectorAll(".portal-view-pane").forEach(p => p.classList.remove("active"));
    document.getElementById("pane-exam-taking")?.classList.add("active");

    this.startExamTimer();
    this.renderExamInterface();
    window.showToast("Assessment started.", "info");
  }

  startExamTimer() {
    if (this.examTimer) clearInterval(this.examTimer);
    const clock = document.getElementById("exam-live-clock");

    this.examTimer = setInterval(() => {
      this.examSecondsLeft--;
      const m = Math.floor(this.examSecondsLeft / 60);
      const s = this.examSecondsLeft % 60;
      if (clock) clock.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

      if (this.examSecondsLeft <= 0) {
        clearInterval(this.examTimer);
        window.showToast("Time expired. Submitting your examination answers...", "warning");
        this.submitActiveExam();
      }
    }, 1000);
  }

  renderExamInterface() {
    if (!this.activeExam) return;
    const q = this.activeExam.questions[this.currentQuestionIdx];
    const totalQ = this.activeExam.questions.length;

    document.getElementById("exam-active-title").textContent = this.activeExam.title;
    document.getElementById("exam-q-counter").textContent = `Question ${this.currentQuestionIdx + 1} of ${totalQ}`;
    document.getElementById("exam-marks-badge").textContent = `${q.marks || q.maxMarks} Marks`;

    const bodyEl = document.getElementById("exam-question-body");

    if (q.type === "mcq_single" || q.type === "true_false") {
      bodyEl.innerHTML = `
        <h4 class="question-text">${q.statement}</h4>
        <div class="mcq-options-list">
          ${q.options.map((opt, optIdx) => `
            <label class="mcq-option-label ${this.examAnswers[q.id] === optIdx ? 'selected' : ''}">
              <input type="radio" name="opt_${q.id}" class="option-radio" value="${optIdx}"
                ${this.examAnswers[q.id] === optIdx ? 'checked' : ''}
                onchange="studentPortal.recordAnswer('${q.id}', ${optIdx})" />
              <span>${opt}</span>
            </label>
          `).join("")}
        </div>
      `;
    } else if (q.type === "mcq_multiple") {
      const selectedArr = Array.isArray(this.examAnswers[q.id]) ? this.examAnswers[q.id] : [];
      bodyEl.innerHTML = `
        <h4 class="question-text">${q.statement}</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Select all applicable options</p>
        <div class="mcq-options-list">
          ${q.options.map((opt, optIdx) => `
            <label class="mcq-option-label ${selectedArr.includes(optIdx) ? 'selected' : ''}">
              <input type="checkbox" name="opt_multi_${q.id}" class="option-radio" value="${optIdx}"
                ${selectedArr.includes(optIdx) ? 'checked' : ''}
                onchange="studentPortal.toggleMultiAnswer('${q.id}', ${optIdx})" />
              <span>${opt}</span>
            </label>
          `).join("")}
        </div>
      `;
    } else if (q.type === "short_answer") {
      bodyEl.innerHTML = `
        <h4 class="question-text">${q.statement}</h4>
        <div class="form-group" style="margin-top: 16px;">
          <input type="text" class="form-control" placeholder="Type your answer here..."
            value="${this.examAnswers[q.id] || ''}"
            oninput="studentPortal.recordAnswer('${q.id}', this.value)" />
        </div>
      `;
    } else if (q.type === "descriptive") {
      bodyEl.innerHTML = `
        <h4 class="question-text">${q.statement}</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px;">
          Descriptive response (will be evaluated and graded manually by your course teacher)
        </p>
        <textarea class="descriptive-answer-area" placeholder="Write your technical explanation..."
          oninput="studentPortal.recordAnswer('${q.id}', this.value)">${this.examAnswers[q.id] || ''}</textarea>
      `;
    }

    // Palette Grid
    const palette = document.getElementById("exam-palette-grid");
    if (palette) {
      palette.innerHTML = "";
      this.activeExam.questions.forEach((item, idx) => {
        const btn = document.createElement("button");
        btn.className = "palette-btn";
        if (idx === this.currentQuestionIdx) btn.classList.add("current");
        if (this.examAnswers[item.id] !== undefined && this.examAnswers[item.id] !== "") {
          btn.classList.add("answered");
        }
        btn.textContent = idx + 1;
        btn.onclick = () => {
          this.currentQuestionIdx = idx;
          this.renderExamInterface();
        };
        palette.appendChild(btn);
      });
    }

    // Controls
    const prevBtn = document.getElementById("btn-exam-prev");
    const nextBtn = document.getElementById("btn-exam-next");
    if (prevBtn) prevBtn.disabled = this.currentQuestionIdx === 0;
    if (nextBtn) {
      if (this.currentQuestionIdx === totalQ - 1) {
        nextBtn.textContent = "Finish & Submit Examination ➔";
        nextBtn.className = "btn btn-primary";
        nextBtn.onclick = () => this.submitActiveExam();
      } else {
        nextBtn.textContent = "Next Question ➔";
        nextBtn.className = "btn btn-secondary";
        nextBtn.onclick = () => {
          this.currentQuestionIdx++;
          this.renderExamInterface();
        };
      }
    }
  }

  recordAnswer(qId, val) {
    this.examAnswers[qId] = val;
    this.renderExamInterface();
  }

  toggleMultiAnswer(qId, optIdx) {
    if (!Array.isArray(this.examAnswers[qId])) this.examAnswers[qId] = [];
    const idx = this.examAnswers[qId].indexOf(optIdx);
    if (idx === -1) this.examAnswers[qId].push(optIdx);
    else this.examAnswers[qId].splice(idx, 1);
    this.renderExamInterface();
  }

  submitActiveExam() {
    if (!this.activeExam) return;
    if (this.examTimer) clearInterval(this.examTimer);

    const student = window.store.currentStudent;
    const res = window.store.submitExamAttempt(student.studentId, this.activeExam.id, this.examAnswers);
    this.activeExam = null;

    window.showToast("Examination attempt submitted successfully.", "success");
    if (res.success) {
      this.viewScorecard(res.attempt.attemptId);
    }
    this.switchPane("results");
  }

  // --- 7. Results & Scorecards (Section 4.6) ---
  renderResultsView(student) {
    const container = document.getElementById("student-results-table");
    if (!container) return;

    const attempts = student.examAttempts || [];
    if (attempts.length === 0) {
      container.innerHTML = `<p style="padding: 24px; color: var(--text-muted);">No completed examinations recorded yet.</p>`;
      return;
    }

    container.innerHTML = `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Assessment Title</th>
              <th>Submitted Date</th>
              <th>Score Awarded</th>
              <th>Percentage</th>
              <th>Evaluation Status</th>
              <th>Scorecard</th>
            </tr>
          </thead>
          <tbody>
            ${attempts.map(a => `
              <tr>
                <td><strong>${a.examTitle}</strong></td>
                <td>${new Date(a.submittedAt).toLocaleDateString()}</td>
                <td><strong>${a.totalScore} / ${a.totalPossibleMarks}</strong></td>
                <td>${a.percentage}%</td>
                <td>
                  <span class="badge ${a.status === 'Published' ? 'badge-green' : 'badge-amber'}">
                    ${a.status}
                  </span>
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="studentPortal.viewScorecard('${a.attemptId}')">
                    📜 Open Scorecard
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  viewScorecard(attemptId) {
    const student = window.store.currentStudent;
    const attempt = (student.examAttempts || []).find(a => a.attemptId === attemptId);
    if (!attempt) return;

    const modal = document.getElementById("scorecard-modal");
    const content = document.getElementById("scorecard-modal-content");
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="printable-area" style="padding: 10px;">
        <div style="text-align: center; border-bottom: 2px solid var(--border-color); padding-bottom: 14px; margin-bottom: 18px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 8px;">
            <img src="assets/images/logo.png?v=6.1" alt="Saurya Logo" style="width: 72px; height: 72px; object-fit: contain; border-radius: 50%; box-shadow: 0 3px 10px rgba(0,0,0,0.15); flex-shrink: 0;" />
            <div style="flex: 1;">
              <div style="font-size: 0.72rem; color: #d97706; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">Rajeev Gandhi Computer Saksharta Mission (RGCSM)</div>
              <h2 style="font-size: 1.35rem; color: var(--gov-navy); margin: 2px 0;">SAURYA COMPUTER EDUCATION</h2>
              <p style="font-size: 0.78rem; color: var(--text-secondary); text-transform: uppercase; margin: 2px 0;">
                Authorised Study Centre • Taintigaon Tiraha, Near KIC, Khair, Aligarh (U.P.) 202138
              </p>
              <div style="font-size: 0.74rem; color: var(--primary-light); font-weight: 700;">
                RGCSM Enrolment: ${student.rgcsmEnrollmentNo || 'RGCSM-UP-KHR-2026-0142'} • Franchise / Centre Code: UP-438
              </div>
            </div>
            <img src="assets/images/rgcsm-logo.png?v=6.1" alt="RGCSM Logo" style="width: 72px; height: 72px; object-fit: contain; flex-shrink: 0;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.88rem; margin-bottom: 16px;">
          <div>Student Name: <strong>${student.name}</strong></div>
          <div>Student ID: <strong>${student.studentId}</strong></div>
          <div>Course: <strong>${student.courseName}</strong></div>
          <div>Batch: <strong>${student.batch}</strong></div>
          <div>Assessment: <strong>${attempt.examTitle}</strong></div>
          <div>Evaluation Date: <strong>${new Date(attempt.submittedAt).toLocaleDateString()}</strong></div>
        </div>

        <div style="background: rgba(2, 132, 199, 0.08); border: 1px solid var(--border-highlight); border-radius: var(--radius-md); padding: 18px; text-align: center; margin-bottom: 16px;">
          <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Official Examination Score</div>
          <h3 style="font-size: 2.2rem; color: var(--accent-emerald); margin: 4px 0;">${attempt.totalScore} / ${attempt.totalPossibleMarks}</h3>
          <p style="font-weight: 700; font-size: 1.05rem;">${attempt.percentage}% — Grade: ${attempt.grade}</p>
          <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px;">
            Qualifying Standard: Minimum 40% in Theory &amp; Practical | Grading: &gt;=80% A+ | 70-79% A | 60-69% B+ | 50-59% B | 40-49% C
          </div>
          ${attempt.teacherFeedback ? `
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 8px; font-style: italic;">
              Teacher Feedback: "${attempt.teacherFeedback}"
            </p>
          ` : ''}
        </div>

        <div style="font-size: 0.76rem; color: var(--text-muted); text-align: center; border-top: 1px dashed var(--border-color); padding-top: 8px; margin-bottom: 14px;">
          Official certificates issued by RGCSM Head Office within 30 days of online exam. Valid for employment registration across India. Verify at <strong>www.rgcsm.org</strong>.
        </div>

        <div style="text-align: right; margin-top: 10px;">
          <button class="btn btn-secondary btn-sm" onclick="window.print()">🖨️ Print Official Scorecard</button>
          <button class="btn btn-primary btn-sm" onclick="closeModal('scorecard-modal')">Close</button>
        </div>
      </div>
    `;

    window.openModal("scorecard-modal");
  }

  // --- 8. Digital Student ID Card (Section 4.2) ---
  renderIdCardView(student) {
    const container = document.getElementById("student-idcard-content");
    if (!container) return;

    container.innerHTML = `
      <div class="id-card-stage">
        <div class="student-pvc-card printable-area">
          <div class="id-card-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="assets/images/logo.png?v=6.1" alt="Saurya Logo" style="width: 44px; height: 44px; object-fit: contain; border-radius: 50%; background: #ffffff; padding: 1px; flex-shrink: 0;" />
              <div class="id-brand">
                <span style="font-size: 0.62rem; color: #f59e0b; display: block; font-weight: 800; letter-spacing: 0.06em;">RAJEEV GANDHI COMPUTER SAKSHARTA MISSION</span>
                SAURYA COMPUTER EDUCATION (KHAIR)
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <img src="assets/images/rgcsm-logo.png?v=6.1" alt="RGCSM Logo" style="width: 40px; height: 40px; object-fit: contain; flex-shrink: 0;" />
              <div style="font-size: 0.68rem; background: rgba(56, 189, 248, 0.2); padding: 3px 6px; border-radius: 4px; border: 1px solid rgba(56, 189, 248, 0.4); text-align: center; white-space: nowrap;">
                PASS • <span style="color: #f59e0b; font-weight: 700;">UP-438</span>
              </div>
            </div>
          </div>
          <div class="id-body">
            <div class="id-photo-box">
              <img src="${student.avatar || 'assets/images/director.jpg'}" alt="${student.name}" />
            </div>
            <div class="id-info">
              <div class="id-info-line">
                <span>Student Name</span>
                <strong>${student.name}</strong>
              </div>
              <div class="id-info-line">
                <span>Student ID</span>
                <strong style="color: #38bdf8; font-family: var(--font-mono);">${student.studentId}</strong>
              </div>
              <div class="id-info-line">
                <span>RGCSM Enrolment</span>
                <strong style="color: #f59e0b; font-size: 0.78rem;">${student.rgcsmEnrollmentNo || 'RGCSM-UP-KHR-2026-0142'}</strong>
              </div>
              <div class="id-info-line">
                <span>Enrolled Course</span>
                <strong>${student.courseName}</strong>
              </div>
              <div class="id-info-line">
                <span>Assigned Batch</span>
                <strong>${student.batch}</strong>
              </div>
              <div class="id-info-line">
                <span>Study Centre</span>
                <span style="font-size: 0.74rem;">Near KIC / Opp. Central Bank, Khair (Aligarh)</span>
              </div>
            </div>
          </div>
          <div class="id-barcode-row">
            <div class="barcode-strip">||| | |||| || | |||| ||</div>
            <div style="font-size: 0.72rem; text-align: right; color: #94a3b8;">
              Status: Verified Active<br>
              Centre Director, RGCSM Khair
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <button class="btn btn-primary btn-sm" onclick="window.print()">
            🖨️ Print Student Pass
          </button>
        </div>
      </div>
    `;
  }
}

// Global Student Portal Instance
if (typeof window !== "undefined") {
  window.studentPortal = new StudentPortal();
}
