/**
 * Saurya Computer Education - Admin & Teacher Management Engine (PRD v3.0)
 * Scoped Teacher Workspace, Central Admin Console & Advanced Management Terminal
 */

class AdminPanel {
  constructor() {
    this.currentRole = "admin"; // "admin" or "teacher"
    this.currentTab = "dashboard";
    this.terminalHistory = [];
    this.historyIndex = -1;

    this.init();
  }

  init() {
    this.attachGlobalEvents();
  }

  attachGlobalEvents() {
    // Quick Demo Credentials Buttons
    document.addEventListener("click", (e) => {
      if (e.target.closest("#btn-demo-admin-login")) {
        const u = document.getElementById("admin-login-user");
        const p = document.getElementById("admin-login-pass");
        if (u && p) {
          u.value = "admin@sauryacomputer.edu";
          p.value = "admin123";
          document.getElementById("admin-login-form")?.dispatchEvent(new Event("submit"));
        }
      }
      if (e.target.closest("#btn-demo-teacher-login")) {
        const u = document.getElementById("admin-login-user");
        const p = document.getElementById("admin-login-pass");
        if (u && p) {
          u.value = "priya@sauryacomputer.edu";
          p.value = "teacher123";
          document.getElementById("admin-login-form")?.dispatchEvent(new Event("submit"));
        }
      }
    });
  }

  render() {
    const admin = window.store ? window.store.currentAdmin : null;
    const teacher = window.store ? window.store.currentTeacher : null;
    const authCard = document.getElementById("admin-auth-view");
    const adminLayout = document.getElementById("admin-main-layout");

    if (!admin && !teacher) {
      if (authCard) authCard.style.display = "block";
      if (adminLayout) adminLayout.style.display = "none";
      this.renderLoginForm();
    } else {
      if (authCard) authCard.style.display = "none";
      if (adminLayout) adminLayout.style.display = "block";
      this.currentRole = admin ? "admin" : "teacher";
      this.renderWorkspace(admin || teacher);
    }
  }

  renderLoginForm() {
    const form = document.getElementById("admin-login-form");
    if (!form) return;

    form.onsubmit = (e) => {
      e.preventDefault();
      const u = document.getElementById("admin-login-user")?.value.trim();
      const p = document.getElementById("admin-login-pass")?.value.trim();

      // Check admin login first
      const adminRes = window.store.loginAdmin(u, p);
      if (adminRes.success) {
        window.showToast(`Logged in as Administrator (${adminRes.admin.name})`, "success");
        this.render();
        return;
      }

      // Check teacher login
      const teacherRes = window.store.loginTeacher(u, p);
      if (teacherRes.success) {
        window.showToast(`Logged in to Teacher Workspace (${teacherRes.teacher.name})`, "success");
        this.render();
        return;
      }

      window.showToast("Invalid credentials. Please verify your email and password.", "error");
    };
  }

  renderWorkspace(user) {
    const isSuperAdmin = this.currentRole === "admin";
    const headerName = document.getElementById("admin-header-name");
    const headerRole = document.getElementById("admin-header-role");
    const avatar = document.getElementById("admin-user-avatar");

    if (headerName) headerName.textContent = user.name;
    if (headerRole) {
      headerRole.textContent = isSuperAdmin
        ? "Director & Super Administrator • Full Access"
        : `${user.designation} • Scoped Access`;
    }
    if (avatar && user.avatar) avatar.src = user.avatar;

    // Logout handler
    const logoutBtn = document.getElementById("btn-admin-logout");
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        if (isSuperAdmin) window.store.logoutAdmin();
        else window.store.logoutTeacher();
        window.showToast("Logged out of management console.", "info");
        this.render();
      };
    }

    // Configure Navigation Tabs based on role (Section 5 vs Section 6)
    this.configureTabsForRole(isSuperAdmin);
    this.switchTab(this.currentTab);
  }

  configureTabsForRole(isSuperAdmin) {
    const tabsContainer = document.getElementById("admin-tabs-nav");
    if (!tabsContainer) return;

    if (isSuperAdmin) {
      tabsContainer.innerHTML = `
        <button class="admin-tab-btn active" data-tab="dashboard"><span>📊</span> Dashboard</button>
        <button class="admin-tab-btn" data-tab="applications"><span>📝</span> Admissions Queue <span class="tab-counter-badge" id="badge-tab-apps">0</span></button>
        <button class="admin-tab-btn" data-tab="students"><span>👥</span> Student Accounts</button>
        <button class="admin-tab-btn" data-tab="courses"><span>📚</span> Course Management</button>
        <button class="admin-tab-btn" data-tab="fees"><span>💳</span> Fee Accounting</button>
        <button class="admin-tab-btn" data-tab="attendance"><span>📅</span> Attendance Logs</button>
        <button class="admin-tab-btn" data-tab="exams"><span>✍️</span> Examinations</button>
        <button class="admin-tab-btn" data-tab="notes"><span>📖</span> Learning Materials</button>
        <button class="admin-tab-btn" data-tab="terminal"><span>💻</span> Management Terminal</button>
        <button class="admin-tab-btn" data-tab="audit"><span>🛡️</span> Audit Logs</button>
      `;
    } else {
      // Scoped Teacher Workspace (Section 5)
      tabsContainer.innerHTML = `
        <button class="admin-tab-btn active" data-tab="dashboard"><span>📊</span> My Workspace</button>
        <button class="admin-tab-btn" data-tab="students"><span>👥</span> Assigned Students</button>
        <button class="admin-tab-btn" data-tab="exams"><span>✍️</span> Assessments & Exams</button>
        <button class="admin-tab-btn" data-tab="grading"><span>⭐</span> Paper Grading <span class="tab-counter-badge" id="badge-tab-grading" style="background:var(--accent-rose);">0</span></button>
        <button class="admin-tab-btn" data-tab="notes"><span>📖</span> Upload Study Notes</button>
        <button class="admin-tab-btn" data-tab="attendance"><span>📅</span> Batch Attendance</button>
      `;
    }

    // Attach click events
    tabsContainer.querySelectorAll(".admin-tab-btn").forEach(btn => {
      btn.onclick = () => {
        const tab = btn.getAttribute("data-tab");
        tabsContainer.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.switchTab(tab);
      };
    });

    // Update pending counters
    const newApps = (window.store.state.applications || []).filter(a => a.status === "new").length;
    const badgeApps = document.getElementById("badge-tab-apps");
    if (badgeApps) badgeApps.textContent = newApps;

    let pendingGrading = 0;
    (window.store.state.exams || []).forEach(ex => {
      (ex.questions || []).forEach(q => {
        if (q.type === "descriptive" && q.studentAnswers) {
          Object.keys(q.studentAnswers).forEach(sId => {
            if (!q.studentAnswers[sId].graded) pendingGrading++;
          });
        }
      });
    });
    const badgeGrading = document.getElementById("badge-tab-grading");
    if (badgeGrading) badgeGrading.textContent = pendingGrading;
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll(".admin-pane").forEach(p => p.classList.remove("active"));
    const activePane = document.getElementById(`admin-pane-${tabId}`);
    if (activePane) activePane.classList.add("active");

    const isSuperAdmin = this.currentRole === "admin";

    if (tabId === "dashboard") this.renderDashboard(isSuperAdmin);
    if (tabId === "applications") this.renderApplicationsQueue();
    if (tabId === "students") this.renderStudentsDirectory(isSuperAdmin);
    if (tabId === "courses") this.renderCourseManagement();
    if (tabId === "fees") this.renderFeeAdministration();
    if (tabId === "attendance") this.renderAttendanceAdministration(isSuperAdmin);
    if (tabId === "exams") this.renderExamManagement(isSuperAdmin);
    if (tabId === "grading") this.renderDescriptiveGrading();
    if (tabId === "notes") this.renderLearningMaterials(isSuperAdmin);
    if (tabId === "terminal") this.renderTerminalConsole();
    if (tabId === "audit") this.renderAuditLogs();
  }

  // --- 1. Dashboard (Section 5.1 & 6.1) ---
  renderDashboard(isSuperAdmin) {
    const container = document.getElementById("admin-kpi-container");
    if (!container) return;

    const students = window.store.getStudents();
    const apps = window.store.state.applications || [];
    const exams = window.store.getExams();
    const newApps = apps.filter(a => a.status === "new").length;

    let totalCollected = 0;
    let totalPending = 0;
    students.forEach(s => {
      if (s.fees) {
        totalCollected += (s.fees.amountPaid || 0);
        totalPending += (s.fees.outstandingBalance || 0);
      }
    });

    let todayCheckIns = 0;
    students.forEach(s => {
      if (s.attendance?.today?.checkedIn) todayCheckIns++;
    });

    if (isSuperAdmin) {
      container.innerHTML = `
        <div class="kpi-card" style="--accent-color: #0284c7;">
          <div class="kpi-title">ENROLLED STUDENTS</div>
          <div class="kpi-val">${students.length}</div>
          <small style="color: var(--accent-emerald);">● Active in morning & evening batches</small>
        </div>
        <div class="kpi-card" style="--accent-color: #f59e0b;">
          <div class="kpi-title">PENDING ADMISSIONS</div>
          <div class="kpi-val">${newApps}</div>
          <small style="color: var(--accent-amber-light);">Applications awaiting verification</small>
        </div>
        <div class="kpi-card" style="--accent-color: #10b981;">
          <div class="kpi-title">VERIFIED FEE COLLECTIONS</div>
          <div class="kpi-val">₹${totalCollected.toLocaleString()}</div>
          <small style="color: var(--text-muted);">Outstanding: ₹${totalPending.toLocaleString()}</small>
        </div>
        <div class="kpi-card" style="--accent-color: #6366f1;">
          <div class="kpi-title">TODAY'S LAB CHECK-INS</div>
          <div class="kpi-val">${todayCheckIns}</div>
          <small style="color: var(--primary-light);">Verified arrival timestamps</small>
        </div>
      `;
    } else {
      const teacher = window.store.currentTeacher;
      const assigned = students.filter(s => teacher.assignedCourses.includes(s.courseId));
      container.innerHTML = `
        <div class="kpi-card" style="--accent-color: #0284c7;">
          <div class="kpi-title">MY ASSIGNED STUDENTS</div>
          <div class="kpi-val">${assigned.length}</div>
          <small style="color: var(--accent-emerald);">Across ${teacher.assignedBatches.length} batches</small>
        </div>
        <div class="kpi-card" style="--accent-color: #f59e0b;">
          <div class="kpi-title">SCHEDULED ASSESSMENTS</div>
          <div class="kpi-val">${exams.length}</div>
          <small style="color: var(--accent-amber);">Active evaluation windows</small>
        </div>
        <div class="kpi-card" style="--accent-color: #10b981;">
          <div class="kpi-title">ATTENDANCE AVERAGE</div>
          <div class="kpi-val">92.4%</div>
          <small style="color: var(--accent-emerald);">Enrolled batch rate</small>
        </div>
      `;
    }
  }

  // --- 2. Admissions Queue (Section 6.4) ---
  renderApplicationsQueue() {
    const tbody = document.getElementById("admin-apps-tbody");
    if (!tbody) return;

    const searchInput = document.getElementById("search-applications");
    if (searchInput && !searchInput.dataset.listening) {
      searchInput.dataset.listening = "true";
      searchInput.addEventListener("input", () => this.renderApplicationsQueue());
    }
    const q = searchInput?.value.trim().toLowerCase() || "";

    let apps = window.store.state.applications || [];
    if (q) {
      apps = apps.filter(a =>
        a.id.toLowerCase().includes(q) ||
        a.fullName.toLowerCase().includes(q) ||
        a.courseName.toLowerCase().includes(q) ||
        (a.phone && a.phone.includes(q))
      );
    }
    tbody.innerHTML = "";

    if (apps.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:20px;">No applications in queue.</td></tr>`;
      return;
    }

    apps.forEach(app => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="font-family: var(--font-mono); font-weight: 600; color: var(--primary-light);">${app.id}</td>
        <td>
          <strong>${app.fullName}</strong><br>
          <small style="color: var(--text-muted);">${app.phone} • ${app.email}</small>
        </td>
        <td>
          <strong>${app.courseName}</strong><br>
          <small style="color: var(--text-secondary);">${app.preferredBatch}</small>
        </td>
        <td>${app.qualification}</td>
        <td>${new Date(app.submissionDate).toLocaleDateString()}</td>
        <td>
          <span class="badge ${app.status === 'new' ? 'badge-amber' : (app.status === 'enrolled' ? 'badge-green' : 'badge-primary')}">
            ${app.status.toUpperCase()}
          </span>
        </td>
        <td>
          <div style="display: flex; gap: 6px;">
            ${app.status !== 'enrolled' ? `
              <button class="btn btn-primary btn-sm" onclick="adminPanel.convertCandidate('${app.id}')" title="Approve and activate student ID">
                ✓ Convert to Student
              </button>
            ` : `
              <span style="font-size: 0.8rem; color: var(--accent-emerald); font-weight: 700;">
                Enrolled (${app.studentId})
              </span>
            `}
            <button class="btn btn-secondary btn-sm" onclick="adminPanel.viewApplication('${app.id}')">
              Details
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  convertCandidate(appId) {
    if (!confirm("Approve admission application and generate Student Account?\n\n• Generates unique ID format: SCE-2026-XXXX\n• Activates attendance tracking & fee ledger\n• Records auditable approval log")) {
      return;
    }

    const res = window.store.convertToStudent(appId, this.currentRole === "admin" ? "Super Admin" : "Faculty");
    if (res.success) {
      window.showToast(`Candidate enrolled! Issued Student ID: ${res.student.studentId}`, "success");
      this.render();
      alert(`ADMISSION CONFIRMED\n\nStudent Name: ${res.student.name}\nGenerated Student ID: ${res.student.studentId}\nAssigned Course: ${res.student.courseName}\nAssigned Batch: ${res.student.batch}\nInitial Password: ${res.student.password}\n\nThe student can now immediately check in and access study materials.`);
    } else {
      window.showToast(res.message, "error");
    }
  }

  viewApplication(appId) {
    const app = window.store.state.applications.find(a => a.id === appId);
    if (!app) return;
    alert(`ADMISSION APPLICATION [${app.id}]\n\nCandidate: ${app.fullName}\nCourse: ${app.courseName}\nBatch Slot: ${app.preferredBatch}\nPhone: ${app.phone} | WhatsApp: ${app.whatsapp}\nEmail: ${app.email}\nAddress: ${app.address}\nDOB: ${app.dob} | Gender: ${app.gender}\nQualification: ${app.qualification}\nStatus: ${app.status}\nInternal Notes: ${app.internalNotes}`);
  }

  // --- 3. Student Accounts & Performance (Section 5.2 & 6.5) ---
  renderStudentsDirectory(isSuperAdmin) {
    const tbody = document.getElementById("admin-students-tbody");
    if (!tbody) return;

    const searchInput = document.getElementById("search-students");
    if (searchInput && !searchInput.dataset.listening) {
      searchInput.dataset.listening = "true";
      searchInput.addEventListener("input", () => this.renderStudentsDirectory(isSuperAdmin));
    }
    const q = searchInput?.value.trim().toLowerCase() || "";

    let students = window.store.getStudents();
    if (!isSuperAdmin) {
      const teacher = window.store.currentTeacher;
      students = students.filter(s => teacher.assignedCourses.includes(s.courseId));
    }
    if (q) {
      students = students.filter(s =>
        s.studentId.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.courseName.toLowerCase().includes(q) ||
        (s.phone && s.phone.includes(q))
      );
    }

    tbody.innerHTML = "";

    students.forEach(s => {
      const tr = document.createElement("tr");
      const att = s.attendance || { percentage: 100 };
      const fees = s.fees || { amountPaid: 0, outstandingBalance: 0 };

      tr.innerHTML = `
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${s.avatar || 'assets/images/director.jpg'}" style="width: 34px; height: 34px; border-radius: 50%; object-fit: cover;" />
            <div>
              <strong>${s.name}</strong><br>
              <small style="color: var(--primary-light); font-family: var(--font-mono);">${s.studentId}</small>
            </div>
          </div>
        </td>
        <td>
          <strong>${s.courseName}</strong><br>
          <small style="color: var(--text-muted);">${s.batch}</small>
        </td>
        <td>${s.phone}</td>
        <td>
          <span style="font-weight: 700; color: ${att.percentage >= 75 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
            ${att.percentage}%
          </span>
        </td>
        <td>
          <span class="badge ${fees.outstandingBalance === 0 ? 'badge-green' : 'badge-amber'}">
            ₹${fees.amountPaid.toLocaleString()} / Due: ₹${fees.outstandingBalance.toLocaleString()}
          </span>
        </td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-secondary btn-sm" onclick="adminPanel.viewStudentProfile('${s.studentId}')">
              Profile
            </button>
            ${isSuperAdmin ? `
              <button class="btn btn-outline btn-sm" onclick="adminPanel.recordFeePrompt('${s.studentId}')">
                Add Payment
              </button>
              <button class="btn btn-sm" style="color: ${s.status === 'active' ? 'var(--accent-rose)' : 'var(--accent-emerald)'};" onclick="adminPanel.toggleStatus('${s.studentId}')">
                ${s.status === 'active' ? 'Suspend' : 'Activate'}
              </button>
            ` : ''}
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  viewStudentProfile(studentId) {
    const s = window.store.getStudentById(studentId);
    if (!s) return;
    alert(`STUDENT RECORD: ${s.name} (${s.studentId})\n\nCourse: ${s.courseName}\nBatch: ${s.batch}\nAttendance Rate: ${s.attendance?.percentage || 0}%\nTotal Paid: ₹${s.fees?.amountPaid || 0} | Balance: ₹${s.fees?.outstandingBalance || 0}\nStatus: ${s.status}\nEmail: ${s.email} | Phone: ${s.phone}\nEnrolled: ${s.enrollmentDate}`);
  }

  recordFeePrompt(studentId) {
    const s = window.store.getStudentById(studentId);
    if (!s) return;
    const amt = prompt(`Record Verified Cash/Counter Payment for ${s.name}\nCurrent Balance Due: ₹${s.fees?.outstandingBalance || 0}\nEnter amount received (₹):`, "2000");
    if (amt && !isNaN(parseInt(amt, 10)) && parseInt(amt, 10) > 0) {
      const res = window.store.recordManualFeePayment(studentId, amt, "Institute Accounts Counter", "Cash verified", "Super Admin");
      if (res.success) {
        window.showToast(`Recorded ₹${amt}. Receipt #${res.receiptNo}`, "success");
        this.render();
      }
    }
  }

  toggleStatus(studentId) {
    const newStatus = window.store.toggleStudentStatus(studentId, "Super Admin");
    window.showToast(`Student ${studentId} status set to: ${newStatus}`, "info");
    this.render();
  }

  // --- 4. Course Management (Section 6.3) ---
  renderCourseManagement() {
    const tbody = document.getElementById("admin-courses-tbody");
    if (!tbody) return;

    const courses = window.store.getCourses();
    tbody.innerHTML = "";

    courses.forEach(c => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${c.name}</strong></td>
        <td><span class="badge badge-primary">${c.category}</span></td>
        <td>${c.duration} (${c.totalHours} hrs)</td>
        <td><strong>${c.feeFormatted}</strong></td>
        <td>${(c.batches || []).join(", ")}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="adminPanel.editCourseFeePrompt('${c.id}')">
            Edit Fee
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  editCourseFeePrompt(courseId) {
    const c = window.store.getCourseById(courseId);
    if (!c) return;
    const newFee = prompt(`Update Fee for course "${c.name}"\nCurrent Fee: ₹${c.fee}\nEnter new fee (₹):`, c.fee);
    if (newFee && !isNaN(parseInt(newFee, 10)) && parseInt(newFee, 10) > 0) {
      window.store.updateCourse(courseId, {
        fee: parseInt(newFee, 10),
        feeFormatted: `₹${parseInt(newFee, 10).toLocaleString()}`
      }, "Super Admin");
      window.showToast("Course fee updated in catalog.", "success");
      this.render();
    }
  }

  // --- 5. Fee Accounting Administration (Section 6.6) ---
  renderFeeAdministration() {
    const tbody = document.getElementById("admin-fees-tbody");
    if (!tbody) return;

    const students = window.store.getStudents();
    tbody.innerHTML = "";

    students.forEach(s => {
      const f = s.fees || { totalPayable: 0, amountPaid: 0, outstandingBalance: 0, installments: [] };
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:var(--primary-light); font-family:var(--font-mono);">${s.studentId}</strong></td>
        <td><strong>${s.name}</strong></td>
        <td>${s.courseName}</td>
        <td>₹${f.totalPayable.toLocaleString()}</td>
        <td style="color:var(--accent-emerald); font-weight:700;">₹${f.amountPaid.toLocaleString()}</td>
        <td style="color:${f.outstandingBalance > 0 ? 'var(--accent-amber)' : 'var(--text-muted)'}; font-weight:700;">
          ₹${f.outstandingBalance.toLocaleString()}
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="adminPanel.recordFeePrompt('${s.studentId}')">
            Record Payment
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // --- 6. Attendance Administration & Corrections (Section 4.4 & 5.5 & 6.7) ---
  renderAttendanceAdministration(isSuperAdmin) {
    const tbody = document.getElementById("admin-attendance-tbody");
    if (!tbody) return;

    const students = window.store.getStudents();
    tbody.innerHTML = "";

    students.forEach(s => {
      const att = s.attendance || { percentage: 100, today: {} };
      const today = att.today || {};
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td><strong style="font-family:var(--font-mono); color:var(--primary-light);">${s.studentId}</strong></td>
        <td><strong>${s.name}</strong></td>
        <td>${s.batch}</td>
        <td style="font-family:var(--font-mono);">${today.checkedIn ? today.checkInTime : '—'}</td>
        <td style="font-family:var(--font-mono);">${today.checkedOut ? today.checkOutTime : (today.checkedIn ? 'In Session' : '—')}</td>
        <td>
          <span class="badge ${today.checkedIn ? 'badge-green' : 'badge-amber'}">
            ${today.status || 'Not Checked In'}
          </span>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="adminPanel.correctAttendancePrompt('${s.studentId}')">
            Adjust / Excuse
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  correctAttendancePrompt(studentId) {
    const s = window.store.getStudentById(studentId);
    if (!s) return;
    const status = prompt(`Authorized Attendance Adjustment for ${s.name} (${studentId})\nEnter new status ('Present', 'Leave Approved', 'Absent'):`, "Leave Approved");
    if (!status) return;
    const reason = prompt("Enter documented justification / reason for attendance record adjustment:", "Medical certificate submitted to office");
    if (!reason) return;

    const todayStr = new Date().toISOString().split("T")[0];
    const editor = this.currentRole === "admin" ? "Super Admin" : window.store.currentTeacher.name;
    window.store.correctAttendanceRecord(studentId, todayStr, status, reason, editor);
    window.showToast("Attendance adjustment recorded with audit trail.", "success");
    this.render();
  }

  // --- 7. Examination Management & Question Builder (Section 5.3 & 6.8) ---
  renderExamManagement(isSuperAdmin) {
    const listEl = document.getElementById("admin-exams-list");
    if (!listEl) return;

    const exams = window.store.getExams();
    listEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <h3 style="color: var(--gov-navy); margin: 0;">Examination Assessment Center</h3>
        <button class="btn btn-primary btn-sm" onclick="adminPanel.promptCreateExam()">
          + Schedule New Assessment
        </button>
      </div>
    ` + exams.map(e => `
      <div class="course-card" style="padding: 20px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <span class="badge badge-primary">${e.subject}</span>
            <span class="badge badge-green">${e.status.toUpperCase()}</span>
          </div>
          <small style="color: var(--text-muted); font-size: 0.8rem;">
            ⏱️ ${e.durationMinutes} mins • Total Marks: ${e.totalMarks} (Pass: ${e.passMarks})
          </small>
        </div>
        <h4 style="font-size: 1.15rem; margin-bottom: 4px;">${e.title}</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">
          Course: <strong>${e.courseName}</strong> • Batch: ${e.batch} • Schedule: ${e.scheduledStart} to ${e.scheduledEnd}
        </p>
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          Questions Structured: ${e.questions.length} (MCQ Single/Multi, True/False, Short Answer, Descriptive)
        </div>
      </div>
    `).join("");
  }

  // --- 8. Descriptive Paper Grading (Section 5.6) ---
  renderDescriptiveGrading() {
    const container = document.getElementById("admin-grading-container");
    if (!container) return;

    container.innerHTML = "";
    const exams = window.store.getExams();
    let pendingCount = 0;

    exams.forEach(exam => {
      exam.questions.forEach(q => {
        if (q.type === "descriptive" && q.studentAnswers) {
          Object.keys(q.studentAnswers).forEach(studentId => {
            const sub = q.studentAnswers[studentId];
            if (!sub.graded) {
              pendingCount++;
              const student = window.store.getStudentById(studentId);
              const card = document.createElement("div");
              card.className = "course-card";
              card.style.padding = "24px";
              card.style.marginBottom = "20px";
              card.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                  <div>
                    <span class="badge badge-amber">Descriptive Evaluation Required</span>
                    <h4 style="font-size: 1.15rem; margin-top: 6px;">${student ? student.name : studentId} (${studentId})</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">Assessment: <strong>${exam.title}</strong></p>
                  </div>
                  <strong>Max Marks: ${q.maxMarks}</strong>
                </div>

                <div style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 12px;">
                  <strong style="font-size: 0.85rem; color: var(--text-muted);">Question:</strong>
                  <p style="font-size: 0.95rem; margin-top: 4px;">${q.statement}</p>
                </div>

                <div style="background: var(--bg-input); padding: 14px; border-radius: var(--radius-md); border: 1px dashed var(--border-highlight); margin-bottom: 14px;">
                  <strong style="font-size: 0.85rem; color: var(--primary-light);">Student's Response:</strong>
                  <p style="margin-top: 6px; white-space: pre-wrap; font-size: 0.92rem;">${sub.answerText}</p>
                </div>

                <div style="display: flex; gap: 14px; align-items: flex-end; flex-wrap: wrap;">
                  <div>
                    <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Marks (0 to ${q.maxMarks}):</label>
                    <input type="number" class="form-control" id="grade_val_${exam.id}_${studentId}_${q.id}" value="${Math.ceil(q.maxMarks * 0.8)}" min="0" max="${q.maxMarks}" style="width: 110px;" />
                  </div>
                  <div style="flex-grow: 1;">
                    <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Teacher Feedback:</label>
                    <input type="text" class="form-control" id="grade_fb_${exam.id}_${studentId}_${q.id}" placeholder="Provide actionable constructive feedback..." />
                  </div>
                  <button class="btn btn-primary" onclick="adminPanel.submitGrade('${exam.id}', '${studentId}', '${q.id}')">
                    Publish Result ➔
                  </button>
                </div>
              `;
              container.appendChild(card);
            }
          });
        }
      });
    });

    if (pendingCount === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <h3>All Descriptive Submissions Graded</h3>
          <p style="color: var(--text-secondary); margin-top: 4px;">No student essays or short responses awaiting faculty review.</p>
        </div>
      `;
    }
  }

  submitGrade(examId, studentId, questionId) {
    const marks = document.getElementById(`grade_val_${examId}_${studentId}_${questionId}`)?.value;
    const fb = document.getElementById(`grade_fb_${examId}_${studentId}_${questionId}`)?.value;
    const teacherName = this.currentRole === "admin" ? "Super Admin" : window.store.currentTeacher.name;

    const ok = window.store.gradeDescriptiveAnswer(examId, studentId, questionId, marks, fb, teacherName);
    if (ok) {
      window.showToast("Marks and feedback published to student scorecard.", "success");
      this.render();
    }
  }

  // --- 9. Learning Materials & Question Papers (Section 5.4) ---
  renderLearningMaterials(isSuperAdmin) {
    const container = document.getElementById("admin-notes-content");
    if (!container) return;

    const notes = window.store.getNotes();
    const papers = window.store.getUploadedPapers();

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h3>Published Learning Materials & Question Papers</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">Manage notes, worksheets, and practice question papers.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary btn-sm" onclick="openModal('modal-upload-note')">
            📤 Upload Study Note
          </button>
          <button class="btn btn-secondary btn-sm" onclick="adminPanel.promptUploadPaper()">
            📄 Upload Question Paper (PDF)
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Course / Batch</th>
              <th>Published By</th>
              <th>Date</th>
              <th>Downloads</th>
            </tr>
          </thead>
          <tbody>
            ${notes.map(n => `
              <tr>
                <td><strong>${n.title}</strong></td>
                <td><span class="badge badge-primary">Study Note</span></td>
                <td>${n.courseName} (${n.batch})</td>
                <td>${n.uploadedBy}</td>
                <td>${n.uploadDate}</td>
                <td>${n.downloads}</td>
              </tr>
            `).join("")}
            ${papers.map(p => `
              <tr>
                <td><strong>${p.title}</strong></td>
                <td><span class="badge badge-secondary">Question Paper</span></td>
                <td>${p.courseName} (${p.batch})</td>
                <td>${p.uploadedBy}</td>
                <td>${p.uploadDate}</td>
                <td>${p.downloadCount}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  promptUploadPaper() {
    const title = prompt("Enter Question Paper Title:", "Tally Prime Ledger Practice Problem Set #4 (PDF)");
    if (!title) return;
    const courseId = prompt("Enter Course ID ('adca', 'tally-gst', 'web-development', 'ccc'):", "tally-gst");
    if (!courseId) return;

    window.store.uploadQuestionPaper({
      title: title,
      courseId: courseId,
      subject: "Classroom Test",
      batch: "All Batches",
      type: "practice_paper"
    }, this.currentRole === "admin" ? "Super Admin" : window.store.currentTeacher.name);

    window.showToast("Question paper uploaded to student portal.", "success");
    this.render();
  }

  // --- 10. Admin Terminal / Management Console (Section 7) ---
  renderTerminalConsole() {
    const container = document.getElementById("admin-terminal-container");
    if (!container) return;

    container.innerHTML = `
      <div style="background: #020617; border: 1px solid #1e293b; border-radius: var(--radius-lg); font-family: var(--font-mono); font-size: 0.88rem; box-shadow: var(--shadow-lg); overflow: hidden;">
        <!-- Terminal Header -->
        <div style="background: #0f172a; padding: 10px 16px; border-bottom: 1px solid #1e293b; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444;"></div>
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></div>
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #10b981;"></div>
            <span style="margin-left: 8px; color: #94a3b8; font-size: 0.78rem;">saurya-admin-console ~ (PRD v3.0 Allowlisted Safe Shell)</span>
          </div>
          <span style="font-size: 0.72rem; color: #38bdf8; background: rgba(56, 189, 248, 0.1); padding: 2px 8px; border-radius: 4px;">SECURE CLI</span>
        </div>

        <!-- Terminal Output Area -->
        <div id="terminal-screen" style="padding: 16px; min-height: 280px; max-height: 380px; overflow-y: auto; color: #f1f5f9; white-space: pre-wrap; line-height: 1.6;">
Saurya Computer Education — Administrative Console [Version 3.0]
Application-level operations environment. Direct OS and arbitrary SQL access strictly restricted.
Type 'help' to inspect authorized commands.
        </div>

        <!-- Command Input Prompt -->
        <form id="terminal-input-form" style="display: flex; background: #090d16; border-top: 1px solid #1e293b; padding: 10px 14px;">
          <span style="color: #38bdf8; font-weight: 700; margin-right: 8px; user-select: none;">admin@sce:~$</span>
          <input type="text" id="terminal-cmd-input" class="form-control" style="background: transparent; border: none; color: #ffffff; font-family: var(--font-mono); padding: 0; outline: none; box-shadow: none;" placeholder="Type command (e.g. system status, students list, fees summary)..." autofocus autocomplete="off" />
        </form>
      </div>
    `;

    const form = document.getElementById("terminal-input-form");
    const input = document.getElementById("terminal-cmd-input");
    const screen = document.getElementById("terminal-screen");

    if (form && input && screen) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const cmdText = input.value.trim();
        if (!cmdText) return;

        const output = window.store.executeAdminCommand(cmdText, "Super Admin");
        if (output === "__CLEAR__") {
          screen.textContent = "";
        } else {
          screen.textContent += `\nadmin@sce:~$ ${cmdText}\n${output}\n`;
        }
        input.value = "";
        screen.scrollTop = screen.scrollHeight;
      };
    }
  }

  // --- 11. Security & Operational Audit Logs (Section 6.10) ---
  renderAuditLogs() {
    const tbody = document.getElementById("admin-audit-tbody");
    if (!tbody) return;

    const logs = window.store.state.auditLogs || [];
    tbody.innerHTML = logs.map(l => `
      <tr>
        <td style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${new Date(l.timestamp).toLocaleString()}</td>
        <td><strong>${l.actor}</strong></td>
        <td><span class="badge ${l.severity === 'financial' ? 'badge-green' : (l.severity === 'security' ? 'badge-amber' : 'badge-primary')}">${l.action}</span></td>
        <td style="font-size: 0.86rem;">${l.details}</td>
      </tr>
    `).join("");
  }

  // --- Export Attendance Log as CSV ---
  exportAttendanceReport() {
    const students = window.store.getStudents();
    let csv = "Student ID,Student Name,Batch,Attendance %,Today Check-In,Today Check-Out,Status\n";
    students.forEach(s => {
      const att = s.attendance || { percentage: 100, today: {} };
      csv += `"${s.studentId}","${s.name}","${s.batch}","${att.percentage}%","${att.today?.checkInTime || '—'}","${att.today?.checkOutTime || '—'}","${att.today?.status || 'Not Checked In'}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `SCE_Attendance_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.showToast("Attendance CSV report generated and downloaded.", "success");
  }

  // --- Assessment Scheduling Prompt ---
  promptCreateExam() {
    const title = prompt("Enter Assessment Title:", "Module Assessment: Computer Fundamentals & Office Productivity");
    if (!title) return;
    const courseId = prompt("Enter Course ID ('adca', 'tally-gst', 'web-development', 'ccc', 'pgdca', 'python-data'):", "adca");
    if (!courseId) return;
    const subject = prompt("Enter Subject Name:", "IT Tools & Network Basics");
    if (!subject) return;

    window.store.createExam({
      title: title,
      courseId: courseId,
      subject: subject,
      batch: "All Batches",
      durationMinutes: 20,
      totalMarks: 25,
      passMarks: 12,
      questions: [
        {
          id: "q1",
          type: "mcq_single",
          statement: "What does GUI stand for in operating systems?",
          options: ["Graphical User Interface", "Global User Internet", "General Utility Interface", "Guided User Interaction"],
          correctOptionIndex: 0,
          marks: 5
        },
        {
          id: "q2",
          type: "true_false",
          statement: "RAM is volatile memory whose contents are lost when power is turned off.",
          options: ["True", "False"],
          correctOptionIndex: 0,
          marks: 5
        },
        {
          id: "q3",
          type: "descriptive",
          statement: "Describe the primary components of computer system architecture and their communication via the system bus.",
          maxMarks: 15
        }
      ]
    }, this.currentRole === "admin" ? "Super Admin" : (window.store.currentTeacher?.name || "Faculty"));

    window.showToast(`Assessment "${title}" created and scheduled.`, "success");
    this.render();
  }

  // --- Handle Study Note Modal Submission ---
  handleNoteUploadSubmit(e) {
    if (e) e.preventDefault();
    const title = document.getElementById("note-upload-title")?.value.trim();
    const courseId = document.getElementById("note-upload-course")?.value;
    const subject = document.getElementById("note-upload-subject")?.value.trim();
    const batch = document.getElementById("note-upload-batch")?.value || "All Batches";
    const summary = document.getElementById("note-upload-summary")?.value.trim() || "";
    const preview = document.getElementById("note-upload-preview")?.value.trim() || "";

    if (!title || !courseId || !subject) {
      window.showToast("Please complete required material title, course, and subject.", "warning");
      return;
    }

    const uploader = this.currentRole === "admin" ? "Super Admin" : (window.store.currentTeacher?.name || "Faculty Member");
    window.store.addNote({
      title,
      courseId,
      subject,
      batch,
      summary,
      previewText: preview || `SAURYA COMPUTER EDUCATION — OFFICIAL STUDY MATERIAL\nTitle: ${title}\nSubject: ${subject}\n\nContents approved by Academic Council.`
    }, uploader);

    window.closeModal("modal-upload-note");
    document.getElementById("form-upload-note")?.reset();
    window.showToast(`Study material "${title}" published to student portal.`, "success");
    this.render();
  }
}

// Global Admin Instance
if (typeof window !== "undefined") {
  window.adminPanel = new AdminPanel();
}
