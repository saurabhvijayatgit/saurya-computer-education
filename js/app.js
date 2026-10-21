/**
 * Saurya Computer Education - Public Website Engine (PRD v3.0 & Production UI/UX)
 * Navigation, Course Catalog, Official FAQs, Admission Form, Command Palette & Environment Switcher
 * Institutional Design: NIELIT-style, Govt. Portal Standards
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  // Technical Computing Schematic Brand Visual
  if (typeof window.PuzzledMascot !== "undefined") {
    new window.PuzzledMascot("hero-mascot-container");
  }

  initNavigation();
  initCourseCatalog();
  initApplyModal();
  initEnvironmentSwitcher();
  initCommandPalette();
  initScrollAndBackToTop();
  initPasswordToggles();
});

/* ============================================================
   THEME TOGGLE (Institutional Light / Slate Dark Mode)
============================================================ */
function initTheme() {
  // Default to LIGHT for institutional look (NIELIT-style)
  const savedTheme = localStorage.getItem("sce_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
  toggleBtns.forEach(btn => {
    updateThemeBtn(btn, savedTheme);

    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("sce_theme", next);
      toggleBtns.forEach(b => updateThemeBtn(b, next));
      showToast(`Display mode switched to: ${next === "light" ? "Standard Light" : "Slate Dark"}`, "info");
    });
  });
}

function updateThemeBtn(btn, theme) {
  btn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  btn.setAttribute("title", theme === "dark" ? "Switch to Standard Light Mode" : "Switch to Slate Dark Mode");
}

/* ============================================================
   QUICK SITE SEARCH & COMMAND PALETTE TRIGGER
============================================================ */
window.handleQuickSearch = function() {
  const val = document.getElementById("quick-site-search")?.value?.trim();
  openCommandPalette(val || "");
};

/* ============================================================
   ENVIRONMENT SWITCHER (Public <-> Student Panel <-> Admin/Teacher)
============================================================ */
function initEnvironmentSwitcher() {
  const switchBtns = document.querySelectorAll(".dock-pill-btn, .role-pill-btn, [data-switch-view], [data-view]");

  switchBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetView = btn.getAttribute("data-view") || btn.getAttribute("data-switch-view");
      if (targetView) switchView(targetView);
    });
  });

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "");
    if (["student", "admin", "public"].includes(hash)) switchView(hash);
  });

  const initialHash = window.location.hash.replace("#", "");
  if (["student", "admin"].includes(initialHash)) switchView(initialHash);

  initPortalsDropdown();
  initDockCollapse();
}

window.togglePortalsDropdown = function(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const popover = document.getElementById("portals-dropdown-popover");
  const trigger = document.getElementById("btn-portals-trigger");
  if (!popover) return;
  const isShown = popover.classList.contains("show");
  if (isShown) {
    popover.classList.remove("show");
    trigger?.setAttribute("aria-expanded", "false");
    trigger?.classList.remove("active");
  } else {
    popover.classList.add("show");
    trigger?.setAttribute("aria-expanded", "true");
    trigger?.classList.add("active");
  }
};

window.closePortalsDropdown = function() {
  const popover = document.getElementById("portals-dropdown-popover");
  const trigger = document.getElementById("btn-portals-trigger");
  popover?.classList.remove("show");
  trigger?.setAttribute("aria-expanded", "false");
  trigger?.classList.remove("active");
};

function initPortalsDropdown() {
  document.addEventListener("click", (e) => {
    const wrap = document.getElementById("portals-dropdown-wrap");
    if (wrap && !wrap.contains(e.target)) {
      closePortalsDropdown();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePortalsDropdown();
  });
}

function initDockCollapse() {
  const dock = document.getElementById("floating-switch-dock");
  const toggleBtn = document.getElementById("btn-dock-toggle");
  if (!dock || !toggleBtn) return;

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dock.classList.toggle("minimized");
    const isMin = dock.classList.contains("minimized");
    toggleBtn.textContent = isMin ? "+" : "−";
    toggleBtn.setAttribute("title", isMin ? "Expand Workspace Switcher Dock" : "Minimize Switcher Dock");
  });
}

window.switchView = function(viewName) {
  const views = {
    public: document.getElementById("public-view"),
    student: document.getElementById("student-view"),
    admin: document.getElementById("admin-view")
  };

  Object.keys(views).forEach(k => {
    if (views[k]) views[k].style.display = k === viewName ? "block" : "none";
  });

  document.querySelectorAll(".dock-pill-btn, .role-pill-btn, [data-view]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-view") === viewName);
  });

  // Breadcrumb
  const bc = document.getElementById("breadcrumb-current-label");
  if (bc) {
    const labels = {
      public: "Overview & Information",
      student: "Student Portal",
      admin: "Staff & Faculty Console"
    };
    bc.textContent = labels[viewName] || "Overview & Information";
  }

  // Header workspace isolation (prevents overlapping nav links over portal cards)
  const navMenu = document.getElementById("main-nav-menu") || document.querySelector(".nav-menu");
  const wsIndicator = document.getElementById("header-workspace-indicator");
  const wsBadge = document.getElementById("workspace-badge-label");
  const wsSubtext = document.getElementById("workspace-subtext-label");

  if (viewName === "public") {
    if (navMenu) navMenu.style.display = "";
    if (wsIndicator) wsIndicator.style.display = "none";
  } else {
    if (navMenu) navMenu.style.display = "none";
    if (wsIndicator) {
      wsIndicator.style.display = "flex";
      if (viewName === "student") {
        if (wsBadge) wsBadge.innerHTML = "🎓 Student Portal";
        if (wsSubtext) wsSubtext.textContent = "Attendance Check-In, Timed Assessments & Fee Ledger";
      } else if (viewName === "admin") {
        if (wsBadge) wsBadge.innerHTML = "🏛️ Staff Console";
        if (wsSubtext) wsSubtext.textContent = "Central Faculty & Institutional Administration";
      }
    }
  }

  // Always close mobile drawer if open
  if (navMenu) navMenu.classList.remove("open");
  const mobileToggle = document.getElementById("mobile-toggle-btn");
  if (mobileToggle) {
    mobileToggle.classList.remove("active");
    mobileToggle.setAttribute("aria-expanded", "false");
  }
  const backdrop = document.getElementById("mobile-nav-backdrop");
  if (backdrop) backdrop.classList.remove("open");
  document.body.style.overflow = "";

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (viewName === "student" && window.studentPortal) window.studentPortal.render();
  else if (viewName === "admin" && window.adminPanel) window.adminPanel.render();
};

/* ============================================================
   PUBLIC NAVIGATION
============================================================ */
function initNavigation() {
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) header?.classList.add("scrolled");
    else header?.classList.remove("scrolled");
  }, { passive: true });

  // Mobile menu toggle via CSS classes & Backdrop Dimmer
  const mobileBtn = document.getElementById("mobile-toggle-btn") || document.querySelector(".mobile-toggle");
  const navMenu = document.getElementById("main-nav-menu") || document.querySelector(".nav-menu");
  const backdrop = document.getElementById("mobile-nav-backdrop");

  function setMobileMenu(open) {
    const shouldOpen = open !== undefined ? open : !navMenu?.classList.contains("open");
    if (!navMenu) return;

    if (shouldOpen) {
      navMenu.classList.add("open");
      mobileBtn?.classList.add("active");
      mobileBtn?.setAttribute("aria-expanded", "true");
      backdrop?.classList.add("open");
      document.body.style.overflow = "hidden";
    } else {
      navMenu.classList.remove("open");
      mobileBtn?.classList.remove("active");
      mobileBtn?.setAttribute("aria-expanded", "false");
      backdrop?.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  mobileBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    setMobileMenu();
  });

  backdrop?.addEventListener("click", () => {
    setMobileMenu(false);
  });

  // Close on menu link click
  navMenu?.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      setMobileMenu(false);
    });
  });

  // Close on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu?.classList.contains("open")) {
      setMobileMenu(false);
    }
  });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#student" || href === "#admin") {
        e.preventDefault();
        switchView(href.replace("#", ""));
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        switchView("public");
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
    });
  });

  // Header quick search enter key
  const quickInput = document.getElementById("quick-site-search");
  if (quickInput) {
    quickInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleQuickSearch();
      }
    });
  }
}

/* ============================================================
   SCROLL PROGRESS & FLOATING BACK TO TOP
============================================================ */
function initScrollAndBackToTop() {
  const progressBar = document.getElementById("scroll-progress-bar");
  const backToTopBtn = document.getElementById("btn-back-to-top");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 280) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* ============================================================
   PASSWORD VISIBILITY TOGGLES
============================================================ */
function initPasswordToggles() {
  document.querySelectorAll(".password-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🙈";
        btn.setAttribute("aria-label", "Hide password");
      } else {
        input.type = "password";
        btn.textContent = "👁️";
        btn.setAttribute("aria-label", "Show password");
      }
    });
  });
}

/* ============================================================
   COURSE CATALOG (With Shimmer Skeleton & Empty States)
============================================================ */
function initCourseCatalog() {
  const grid = document.getElementById("courses-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!grid || !window.store) return;

  const courses = window.store.getCourses();

  function renderCourseSkeletons() {
    grid.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      const sk = document.createElement("div");
      sk.className = "skeleton-card";
      sk.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <div class="skeleton skeleton-badge"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px;">
          <div class="skeleton" style="height: 38px;"></div>
          <div class="skeleton" style="height: 38px;"></div>
        </div>
      `;
      grid.appendChild(sk);
    }
  }

  function renderCourses(category = "all") {
    renderCourseSkeletons();

    setTimeout(() => {
      grid.innerHTML = "";
      const filtered = category === "all"
        ? courses
        : courses.filter(c => c.category === category);

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1;">
            <div class="empty-state-icon">🔍</div>
            <h4 class="empty-state-title">No Academic Programs Found</h4>
            <p class="empty-state-desc">There are currently no active diploma or certificate programs listed in this specific category.</p>
            <button type="button" class="btn btn-secondary btn-sm" onclick="document.querySelector('.filter-btn[data-category=\\'all\\']')?.click()">View All Programs</button>
          </div>
        `;
        return;
      }

      filtered.forEach(course => {
        const card = document.createElement("div");
        card.className = "course-card";
        card.innerHTML = `
          <div class="course-header">
            <span class="badge badge-primary">${course.category}</span>
            <span class="badge badge-amber" style="font-weight:700;">Code: ${course.rgcsmCode || course.shortCode}</span>
            ${course.freeKitIncluded ? `<span class="badge badge-green" title="Free Student Kit Bag, Notebook & Course Material">🎁 Free Kit &amp; Books</span>` : ''}
          </div>
          <h3 class="course-name">${course.name}</h3>
          <p class="course-desc">${course.overview}</p>
          <div class="course-meta">
            <div class="meta-item">
              <span class="meta-label">Duration</span>
              <span class="meta-val">${course.duration}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Total Lab Hours</span>
              <span class="meta-val">${course.totalHours} hrs</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Eligibility</span>
              <span class="meta-val">${course.eligibility.split(" ").slice(0, 3).join(" ")}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">RGCSM Exam</span>
              <span class="meta-val">Online MCQ + Lab</span>
            </div>
          </div>
          <div class="course-footer">
            <div class="course-fee">
              <span class="fee-val">${course.feeFormatted}</span>
              ${course.concessionFeeFormatted ? `<div class="fee-concession-tag" style="font-size: 0.74rem; color: var(--accent-emerald); font-weight: 700; margin-top: 2px;">SC/ST/PH: ${course.concessionFeeFormatted}</div>` : ''}
              <span class="fee-sub">${course.installmentPlan}</span>
            </div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button class="btn btn-secondary btn-sm" onclick="openSyllabusModal('${course.id}')">
                View Syllabus
              </button>
              <button class="btn btn-primary btn-sm" onclick="openApplyModal('${course.id}')">
                Apply Now
              </button>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    }, 180);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCourses(btn.getAttribute("data-category"));
    });
  });

  renderCourses("all");
}

/* ============================================================
   SYLLABUS DETAIL MODAL (Official RGCSM Curricula)
============================================================ */
window.openSyllabusModal = function(courseId) {
  const course = window.store?.getCourseById(courseId);
  if (!course) return;

  const title = document.getElementById("syllabus-modal-title");
  const meta = document.getElementById("syllabus-modal-meta");
  const timeline = document.getElementById("syllabus-modal-timeline");
  const applyBtn = document.getElementById("syllabus-apply-btn");

  if (title) title.innerHTML = `${course.name} <span class="badge badge-amber" style="margin-left: 8px; vertical-align: middle;">Code: ${course.rgcsmCode || course.shortCode}</span>`;

  if (meta) {
    meta.innerHTML = `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
        <span class="badge badge-primary">Duration: ${course.duration} (${course.totalHours} Hours)</span>
        <span class="badge badge-amber">General Fee: ${course.feeFormatted}</span>
        ${course.concessionFeeFormatted ? `<span class="badge badge-green">SC/ST/Handicapped: ${course.concessionFeeFormatted}</span>` : ''}
        ${course.freeKitIncluded ? `<span class="badge badge-secondary">🎁 Free Kit Bag &amp; Books</span>` : ''}
      </div>
      <div style="background: var(--bg-alt); border: 1px solid var(--border-color); padding: 12px; margin-bottom: 10px; font-size: 0.88rem;">
        <strong style="color: var(--gov-navy);">Eligibility Criteria:</strong>
        <span style="color: var(--text-secondary); margin-left: 8px;">${course.eligibility}</span>
      </div>
      <div style="background: var(--bg-alt); border: 1px solid var(--border-color); padding: 12px; margin-bottom: 10px; font-size: 0.88rem;">
        <strong style="color: var(--gov-navy);">Career &amp; Employment Outcomes:</strong>
        <span style="color: var(--text-secondary); margin-left: 8px;">${course.careerOutcome}</span>
      </div>
      <div style="background: rgba(217, 119, 6, 0.08); border: 1px solid var(--gov-gold); padding: 10px 14px; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 14px;">
        <strong>RGCSM Recognition Notice:</strong> Registered under C.R. Act of Ministry of HRD (Dept. of Secondary &amp; Higher Education), Govt. of India. Certificates valid for registering in employment exchanges all over India. To verify marksheets &amp; certificates, visit the Student Section on <a href="https://rgcsm.org" target="_blank" rel="noopener" style="color: var(--gov-navy); text-decoration: underline; font-weight: 700;">www.rgcsm.org</a>. Note: Registration &amp; Exam fees are charged extra as per RGCSM rules.
      </div>
    `;
  }

  if (timeline) {
    timeline.innerHTML = "";
    (course.syllabus || []).forEach((mod, i) => {
      const item = document.createElement("div");
      item.style.cssText = `
        background: var(--bg-surface); border: 1px solid var(--border-color);
        border-left: 4px solid var(--gov-navy); padding: 14px 18px;
        margin-bottom: 10px; position: relative;
      `;
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h4 style="font-size: 0.92rem; color: var(--gov-navy); margin: 0;">${mod.module}</h4>
          <span class="badge badge-primary">Term ${i + 1}</span>
        </div>
        <ul style="margin: 0; padding-left: 18px; color: var(--text-secondary); font-size: 0.85rem; line-height: 1.6;">
          ${(mod.topics || []).map(t => `<li>${t}</li>`).join("")}
        </ul>
      `;
      timeline.appendChild(item);
    });
  }

  if (applyBtn) {
    applyBtn.onclick = () => {
      closeModal("syllabus-modal");
      openApplyModal(course.id);
    };
  }

  openModal("syllabus-modal");
};

/* ============================================================
   ADMISSION APPLICATION MODAL
============================================================ */
function initApplyModal() {
  const form = document.getElementById("apply-form");
  const courseSelect = document.getElementById("apply-course");
  if (!form || !window.store) return;

  const courses = window.store.getCourses();
  if (courseSelect) {
    courseSelect.innerHTML = `<option value="">-- Select Academic Program --</option>`;
    courses.forEach(c => {
      courseSelect.innerHTML += `<option value="${c.id}">${c.name} (${c.duration} • ${c.feeFormatted})</option>`;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Processing Admission...";
    }

    const formData = {
      fullName: document.getElementById("apply-name")?.value.trim(),
      phone: document.getElementById("apply-phone")?.value.trim(),
      email: document.getElementById("apply-email")?.value.trim(),
      courseId: document.getElementById("apply-course")?.value,
      preferredBatch: document.getElementById("apply-batch")?.value,
      qualification: document.getElementById("apply-qualification")?.value,
      source: "Official Website Admission Form"
    };

    if (!formData.fullName || !formData.phone || !formData.courseId) {
      showToast("Please complete all required fields before submitting.", "warning");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Admission Application";
      }
      return;
    }

    setTimeout(() => {
      const newApp = window.store.submitApplication(formData);
      closeModal("apply-modal");
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Admission Application";
      }
      showToast(`Application recorded. Reference ID: ${newApp?.id || "APP-SCE-2026"}`, "success");
    }, 300);
  });
}

window.openApplyModal = function(preselectedCourseId = null) {
  const select = document.getElementById("apply-course");
  if (select && preselectedCourseId) select.value = preselectedCourseId;
  openModal("apply-modal");
};

/* ============================================================
   RGCSM 50-COURSE MASTER INDEX MODAL EXPLORER
============================================================ */
window.openRgcsmIndexModal = function() {
  const modal = document.getElementById("rgcsm-index-modal");
  if (!modal) return;
  renderRgcsmIndexTable();
  openModal("rgcsm-index-modal");
};

window.renderRgcsmIndexTable = function(filterCategory = "all", searchQuery = "") {
  const tbody = document.getElementById("rgcsm-index-tbody");
  if (!tbody || !window.store) return;

  const allCourses = window.store.getAllRgcsmCourses();
  const q = (searchQuery || "").trim().toLowerCase();

  const filtered = allCourses.filter(c => {
    const matchesCat = filterCategory === "all" || c.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesQuery = !q || c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  tbody.innerHTML = "";
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 24px; color: var(--text-muted);">No RGCSM courses match your search criteria.</td></tr>`;
    return;
  }

  filtered.forEach((c, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight: 700; color: var(--text-muted);">${String(idx + 1).padStart(2, '0')}</td>
      <td><span class="badge badge-amber" style="font-family: var(--font-mono); font-weight: 800;">${c.code}</span></td>
      <td>
        <strong style="color: var(--gov-navy); font-size: 0.92rem;">${c.name}</strong>
      </td>
      <td><span class="badge badge-primary">${c.category}</span></td>
      <td style="font-weight: 600;">${c.duration}</td>
    `;
    tbody.appendChild(tr);
  });
};

/* ============================================================
   COMMAND PALETTE (Ctrl+K / Cmd+K)
============================================================ */
const COMMAND_ITEMS = [
  // Navigation
  { title: "Home Overview", category: "Navigation", icon: "🏛️", meta: "Institution Overview, Accreditations & Recognitions", action: () => { switchView("public"); document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" }); } },
  { title: "Courses & Academic Programs", category: "Navigation", icon: "📚", meta: "DOAP, DCA, ADCA, DCAA, PGDCA, Tally, Python", action: () => { switchView("public"); document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" }); } },
  { title: "Official RGCSM 50-Course Directory", category: "Navigation", icon: "📑", meta: "Browse all 50 official RGCSM course codes & titles", action: () => openRgcsmIndexModal() },
  { title: "RGCSM Academic & Exam Guidelines", category: "Navigation", icon: "📜", meta: "Grading system, online exam rules & passing criteria", action: () => { switchView("public"); document.getElementById("rgcsm-system-section")?.scrollIntoView({ behavior: "smooth" }); } },
  { title: "Computing Labs & Facilities", category: "Navigation", icon: "💻", meta: "Dual-screen workstation labs & infrastructure", action: () => { switchView("public"); document.getElementById("facilities-section")?.scrollIntoView({ behavior: "smooth" }); } },
  { title: "Admissions Guidelines 2026", category: "Navigation", icon: "📝", meta: "Offline & Online RGCSM registration procedure", action: () => { switchView("public"); document.getElementById("admissions-guide-section")?.scrollIntoView({ behavior: "smooth" }); } },
  { title: "Frequently Asked Questions", category: "Navigation", icon: "❓", meta: "RGCSM affiliation, certificates, fee & exam rules", action: () => { switchView("public"); document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" }); } },
  { title: "Contact & Khair Campus", category: "Navigation", icon: "📍", meta: "Near KIC / Opp Central Bank, Khair, Aligarh (202138)", action: () => { switchView("public"); document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" }); } },

  // Workspaces
  { title: "Student Portal (Student Zone)", category: "Portals", icon: "🎓", meta: "Check-In Attendance, Online Exams & Fee Ledger", action: () => switchView("student") },
  { title: "Staff & Faculty Console", category: "Portals", icon: "🛡️", meta: "Center Management, Grading & Records", action: () => switchView("admin") },

  // External Verification
  { title: "RGCSM Official Verification Portal", category: "RGCSM", icon: "🌐", meta: "Verify marksheets & certificates on www.rgcsm.org", action: () => window.open("https://rgcsm.org", "_blank") },

  // Actions
  { title: "Apply for Online Admission", category: "Actions", icon: "✍️", meta: "Open official 2026-27 application form", action: () => openApplyModal() },
  { title: "Toggle Color Mode (Light / Dark)", category: "Actions", icon: "🌓", meta: "Switch between standard & dark slate theme", action: () => document.querySelector(".theme-toggle-btn")?.click() },
  { title: "Demo Student Login", category: "Actions", icon: "⚡", meta: "Auto-fill and log in as demo student", action: () => {
    switchView("student");
    setTimeout(() => document.getElementById("btn-demo-student-login")?.click(), 100);
  }},
  { title: "Demo Admin Console Login", category: "Actions", icon: "⚡", meta: "Auto-fill and log in as administrator", action: () => {
    switchView("admin");
    setTimeout(() => document.getElementById("btn-demo-admin-login")?.click(), 100);
  }},

  // Authentic RGCSM Courses
  { title: "DOAP - Diploma in Office Automation & Publishing", category: "Courses", icon: "🎓", meta: "1 Year • Code: R20111 • ₹15,000", action: () => { switchView("public"); openSyllabusModal("doap"); } },
  { title: "ADCA - Advance Diploma in Computer Application", category: "Courses", icon: "🏆", meta: "1 Year • Code: R20118 • ₹15,000", action: () => { switchView("public"); openSyllabusModal("adca"); } },
  { title: "DCA - Diploma in Computer Application", category: "Courses", icon: "📜", meta: "6 Months • Code: R10104 • ₹8,000", action: () => { switchView("public"); openSyllabusModal("dca"); } },
  { title: "DCAA - Diploma in Computer Application & Accounting", category: "Courses", icon: "💼", meta: "6 Months • Code: R10203 • ₹9,000", action: () => { switchView("public"); openSyllabusModal("dcaa"); } },
  { title: "PGDCA - Post Graduate Diploma in Computer Application", category: "Courses", icon: "🎖️", meta: "1 Year • Code: R30105 • ₹18,000", action: () => { switchView("public"); openSyllabusModal("pgdca"); } },
  { title: "RG-CIT - Rajeev Gandhi-Certificate in IT", category: "Courses", icon: "💻", meta: "3 Months • Code: R10108 • ₹3,500", action: () => { switchView("public"); openSyllabusModal("rg-cit"); } },
  { title: "CCOAI / CCC - Office Automation & Internet", category: "Courses", icon: "📄", meta: "3 Months • Code: R10102 • ₹3,500", action: () => { switchView("public"); openSyllabusModal("ccoai"); } },
  { title: "Professional Course in Tally (Tally Prime with GST)", category: "Courses", icon: "📊", meta: "3 Months • Code: R10607 • ₹5,500", action: () => { switchView("public"); openSyllabusModal("tally-gst"); } },
  { title: "Professional Course in Python (PTY)", category: "Courses", icon: "🐍", meta: "3 Months • Code: R10621 • ₹6,500", action: () => { switchView("public"); openSyllabusModal("python"); } },
  { title: "DTP - Certificate Course in Desk Top Publication", category: "Courses", icon: "🎨", meta: "3 Months • Code: R10101 • ₹5,000", action: () => { switchView("public"); openSyllabusModal("dtp"); } },
  { title: "DIPWD - Internet Programming & Web Designing", category: "Courses", icon: "🌐", meta: "6 Months • Code: R10107 • ₹10,000", action: () => { switchView("public"); openSyllabusModal("web-designing"); } },
  { title: "DMM / DCH - Hardware & Mobile Maintenance", category: "Courses", icon: "🔧", meta: "6 Months • Code: R10401 • ₹8,000", action: () => { switchView("public"); openSyllabusModal("hardware-mobile"); } },
  { title: "Certificate Course in ChatGPT & AI", category: "Courses", icon: "🤖", meta: "3 Months • Code: R10623 • ₹5,000", action: () => { switchView("public"); openSyllabusModal("ai-chatgpt"); } }
];

let selectedCmdIndex = 0;
let currentCmdMatches = [];

function initCommandPalette() {
  const modal = document.getElementById("command-palette-modal");
  const input = document.getElementById("cmd-palette-input");
  const results = document.getElementById("cmd-palette-results");
  if (!modal || !input || !results) return;

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (modal.classList.contains("active")) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === "Escape" && modal.classList.contains("active")) {
      closeCommandPalette();
    }
  });

  input.addEventListener("input", () => {
    renderCommandResults(input.value.trim());
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentCmdMatches.length > 0) {
        selectedCmdIndex = (selectedCmdIndex + 1) % currentCmdMatches.length;
        updateCommandSelection();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentCmdMatches.length > 0) {
        selectedCmdIndex = (selectedCmdIndex - 1 + currentCmdMatches.length) % currentCmdMatches.length;
        updateCommandSelection();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (currentCmdMatches[selectedCmdIndex]) {
        executeCommand(currentCmdMatches[selectedCmdIndex]);
      }
    }
  });
}

window.openCommandPalette = function(initialQuery = "") {
  const modal = document.getElementById("command-palette-modal");
  const input = document.getElementById("cmd-palette-input");
  if (!modal || !input) return;

  modal.classList.add("active");
  input.value = initialQuery;
  renderCommandResults(initialQuery);
  setTimeout(() => input.focus(), 60);
};

window.closeCommandPalette = function() {
  const modal = document.getElementById("command-palette-modal");
  if (modal) modal.classList.remove("active");
};

function renderCommandResults(query = "") {
  const results = document.getElementById("cmd-palette-results");
  if (!results) return;

  const q = query.toLowerCase();
  currentCmdMatches = COMMAND_ITEMS.filter(item => {
    if (!q) return true;
    return item.title.toLowerCase().includes(q) ||
           item.meta.toLowerCase().includes(q) ||
           item.category.toLowerCase().includes(q);
  });

  selectedCmdIndex = 0;
  results.innerHTML = "";

  if (currentCmdMatches.length === 0) {
    results.innerHTML = `
      <div class="empty-state" style="padding: 24px 16px; margin: 8px;">
        <div class="empty-state-icon" style="font-size: 1.8rem;">🔍</div>
        <div class="empty-state-title" style="font-size: 0.95rem;">No matching commands or pages</div>
        <p class="empty-state-desc" style="font-size: 0.8rem; margin-bottom: 0;">Try searching for "Courses", "Student", "Admin", or "Apply".</p>
      </div>
    `;
    return;
  }

  // Group by category
  const categories = ["Navigation", "Portals", "Actions", "Courses"];
  categories.forEach(cat => {
    const items = currentCmdMatches.filter(i => i.category === cat);
    if (items.length === 0) return;

    const groupHeader = document.createElement("li");
    groupHeader.className = "cmd-group-label";
    groupHeader.textContent = cat;
    results.appendChild(groupHeader);

    items.forEach(item => {
      const matchIndex = currentCmdMatches.indexOf(item);
      const li = document.createElement("li");
      li.className = `cmd-item ${matchIndex === selectedCmdIndex ? "selected" : ""}`;
      li.setAttribute("data-index", matchIndex);
      li.innerHTML = `
        <div class="cmd-item-left">
          <span class="cmd-icon">${item.icon}</span>
          <div>
            <div class="cmd-title">${item.title}</div>
            <div class="cmd-meta">${item.meta}</div>
          </div>
        </div>
        <kbd class="cmd-kbd-badge">↵ Jump</kbd>
      `;

      li.addEventListener("click", () => executeCommand(item));
      li.addEventListener("mouseenter", () => {
        selectedCmdIndex = matchIndex;
        updateCommandSelection();
      });

      results.appendChild(li);
    });
  });
}

function updateCommandSelection() {
  const items = document.querySelectorAll(".cmd-item");
  items.forEach(el => {
    const idx = parseInt(el.getAttribute("data-index"), 10);
    el.classList.toggle("selected", idx === selectedCmdIndex);
    if (idx === selectedCmdIndex) {
      el.scrollIntoView({ block: "nearest" });
    }
  });
}

function executeCommand(item) {
  closeCommandPalette();
  if (item && typeof item.action === "function") {
    item.action();
  }
}

/* ============================================================
   MODAL HELPERS
============================================================ */
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("active");
  }
});

/* ============================================================
   GLOBAL TOAST NOTIFICATION SYSTEM
============================================================ */
window.showToast = function(msg, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const colors = {
    success: "#15803d",
    error:   "#b91c1c",
    warning: "#d97706",
    info:    "#003366"
  };
  const icons = {
    success: "✓",
    error:   "✕",
    warning: "⚠",
    info:    "i"
  };

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    background: var(--gov-navy-deep, #001f3f);
    color: #ffffff;
    border-left: 4px solid ${colors[type] || colors.info};
    border-radius: 4px;
    padding: 12px 18px;
    font-size: 0.85rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    display: flex; align-items: center; gap: 10px;
    min-width: 300px; max-width: 440px;
    animation: slideIn 0.25s ease;
  `;
  toast.innerHTML = `
    <span style="font-weight: 800; font-size: 0.95rem; color: ${colors[type] || colors.info};">${icons[type] || "i"}</span>
    <span style="flex: 1; line-height: 1.4;">${msg}</span>
    <span style="cursor:pointer; opacity:0.7; font-size: 1.1rem; padding-left: 6px;" onclick="this.parentElement.remove()">✕</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "all 0.3s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};
