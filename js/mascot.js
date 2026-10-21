/**
 * Saurya Computer Education - Technical Computing Infrastructure Schematic
 * Replaces playful cartoon mascot with an Authoritative Engineering & Institutional
 * Lab Network Architecture Diagram (Server Bus, Dual-Screen Stations, SSL Security)
 */

class PuzzledMascot {
  constructor(containerId = "hero-mascot-container") {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.init();
  }

  init() {
    this.render();
    this.attachEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="brand-visual-caption">
        <span>CENTRAL COMPUTING &amp; LAB ARCHITECTURE</span>
        <span class="caption-tag">ISO 9001:2015 AUDITED</span>
      </div>

      <div class="mascot-stage" id="mascot-stage" role="img" aria-label="Technical computing and laboratory network architecture schematic">
        <svg class="mascot-svg" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="serverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>

            <linearGradient id="monitorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#003366" />
              <stop offset="100%" stop-color="#001a33" />
            </linearGradient>

            <linearGradient id="highlightCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#0284c7" />
            </linearGradient>
          </defs>

          <!-- Technical Grid Background -->
          <g class="schematic-grid">
            <line x1="20" y1="40" x2="480" y2="40" class="schematic-grid-line" />
            <line x1="20" y1="100" x2="480" y2="100" class="schematic-grid-line" />
            <line x1="20" y1="160" x2="480" y2="160" class="schematic-grid-line" />
            <line x1="20" y1="220" x2="480" y2="220" class="schematic-grid-line" />
            <line x1="20" y1="280" x2="480" y2="280" class="schematic-grid-line" />

            <line x1="100" y1="20" x2="100" y2="300" class="schematic-grid-line" />
            <line x1="250" y1="20" x2="250" y2="300" class="schematic-grid-line" />
            <line x1="400" y1="20" x2="400" y2="300" class="schematic-grid-line" />
          </g>

          <!-- TOP TELEMETRY BAR -->
          <rect x="25" y="16" width="450" height="24" rx="2" fill="#0f172a" stroke="#1e3a68" stroke-width="1" />
          <text x="35" y="32" class="schematic-terminal-text">SCHEMATIC ID: SCE-NET-2026-A</text>
          <text x="240" y="32" class="schematic-terminal-text-muted">HOST: PRY-CAMPUS-01</text>
          <rect x="400" y="21" width="65" height="14" rx="2" fill="#064e3b" />
          <text x="432" y="32" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold" text-anchor="middle">ONLINE</text>

          <!-- CENTRAL SERVER & AUTH RACK (LEFT) -->
          <g transform="translate(30, 60)">
            <rect width="110" height="200" rx="4" fill="url(#serverGrad)" stroke="#3b82f6" stroke-width="1.2" />
            <rect x="10" y="12" width="90" height="28" rx="2" fill="#1e293b" stroke="#334155" />
            <circle cx="20" cy="26" r="3" fill="#10b981" />
            <circle cx="30" cy="26" r="3" fill="#38bdf8" />
            <text x="40" y="29" fill="#94a3b8" font-size="8" font-family="'JetBrains Mono', monospace">AUTH SRV</text>

            <rect x="10" y="50" width="90" height="40" rx="2" fill="#1e293b" stroke="#334155" />
            <text x="16" y="66" fill="#38bdf8" font-size="8" font-family="'JetBrains Mono', monospace">&gt; DB: ACADEMIC</text>
            <text x="16" y="80" fill="#64748b" font-size="7.5" font-family="'JetBrains Mono', monospace">&gt; ATTENDANCE: SYNC</text>

            <rect x="10" y="100" width="90" height="40" rx="2" fill="#1e293b" stroke="#334155" />
            <text x="16" y="116" fill="#f59e0b" font-size="8" font-family="'JetBrains Mono', monospace">&gt; EXAM SHIELD: ON</text>
            <text x="16" y="130" fill="#64748b" font-size="7.5" font-family="'JetBrains Mono', monospace">&gt; SSL 256-BIT SHA</text>

            <rect x="10" y="150" width="90" height="38" rx="2" fill="#0b1324" stroke="#1e3a68" />
            <text x="16" y="165" fill="#38bdf8" font-size="8" font-family="'JetBrains Mono', monospace">GIGABIT CORE</text>
            <line x1="16" y1="174" x2="94" y2="174" stroke="#38bdf8" stroke-width="2" class="schematic-bus-pulse" />
          </g>

          <!-- BUS BACKBONE & INTERCONNECTS -->
          <path d="M 140 180 L 200 180 L 200 120 L 240 120" fill="none" class="schematic-bus-line" />
          <path d="M 200 180 L 240 180" fill="none" class="schematic-bus-line" />
          <path d="M 200 180 L 200 240 L 240 240" fill="none" class="schematic-bus-line" />

          <!-- HIGH-SPEED LAB WORKSTATION 1 (DUAL SCREEN) -->
          <g transform="translate(240, 65)">
            <rect width="220" height="90" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.2" />
            <!-- Screen 1 (IDE / Syllabus) -->
            <rect x="12" y="12" width="90" height="60" rx="2" fill="url(#monitorGrad)" stroke="#38bdf8" stroke-width="1" />
            <text x="18" y="26" fill="#38bdf8" font-size="8" font-family="'JetBrains Mono', monospace">MONITOR 01: LAB</text>
            <rect x="18" y="34" width="78" height="30" fill="#001428" />
            <text x="22" y="46" fill="#10b981" font-size="7" font-family="'JetBrains Mono', monospace">ADCA / C / SQL</text>
            <text x="22" y="56" fill="#94a3b8" font-size="6.5" font-family="'JetBrains Mono', monospace">IDE: ACTIVE</text>

            <!-- Screen 2 (Doc / Tally Prime) -->
            <rect x="112" y="12" width="94" height="60" rx="2" fill="url(#monitorGrad)" stroke="#38bdf8" stroke-width="1" />
            <text x="118" y="26" fill="#f59e0b" font-size="8" font-family="'JetBrains Mono', monospace">MONITOR 02: DOCS</text>
            <rect x="118" y="34" width="82" height="30" fill="#001428" />
            <text x="122" y="46" fill="#f59e0b" font-size="7" font-family="'JetBrains Mono', monospace">TALLY PRIME GST</text>
            <text x="122" y="56" fill="#94a3b8" font-size="6.5" font-family="'JetBrains Mono', monospace">LEDGER: AUDITED</text>
          </g>

          <!-- BIOMETRIC / STUDENT ATTENDANCE TERMINAL (BOTTOM RIGHT) -->
          <g transform="translate(240, 175)">
            <rect width="220" height="95" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1.2" />
            <text x="14" y="20" fill="#34d399" font-size="8.5" font-family="'JetBrains Mono', monospace" font-weight="bold">ATTENDANCE TERMINAL &amp; DIGITAL ID</text>
            <line x1="14" y1="26" x2="206" y2="26" stroke="#1e3a68" stroke-width="0.8" />

            <g transform="translate(14, 34)">
              <!-- Fingerprint / Card sensor schematic -->
              <rect width="36" height="48" rx="2" fill="#08111d" stroke="#34d399" stroke-width="1" />
              <path d="M 12 14 Q 18 8 24 14 T 24 34 Q 18 38 12 34" fill="none" stroke="#34d399" stroke-width="1.2" />
              <path d="M 15 20 Q 18 16 21 20 T 21 30" fill="none" stroke="#34d399" stroke-width="1.2" />
            </g>

            <text x="60" y="46" fill="#e2e8f0" font-size="8" font-family="'JetBrains Mono', monospace">MODE: CHECK-IN / CHECK-OUT</text>
            <text x="60" y="58" fill="#94a3b8" font-size="7.5" font-family="'JetBrains Mono', monospace">SERVER TIMESTAMP: ENFORCED</text>
            <text x="60" y="70" fill="#94a3b8" font-size="7.5" font-family="'JetBrains Mono', monospace">AUDIT RECORD: IMMUTABLE</text>
            <text x="60" y="82" fill="#38bdf8" font-size="8" font-family="'JetBrains Mono', monospace">STUDENT ID: SCE-2026-XXXX</text>
          </g>

          <!-- TECHNICAL FOOTER SPECIFICATION -->
          <g transform="translate(25, 280)">
            <text x="10" y="16" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="8">SPEC: 1000BASE-T • LAB CAPACITY: 60 WORKSTATIONS • DUAL POWER BACKUP • AUDIT VERIFIED</text>
          </g>
        </svg>
      </div>

      <div class="brand-visual-actions">
        <span style="color: var(--text-secondary); font-size: 0.76rem;">Hardware &amp; Network Infrastructure Status</span>
        <button class="visual-action-btn" id="btn-run-diagnostics">
          Run System Diagnostics
        </button>
      </div>
    `;
  }

  attachEvents() {
    const diagBtn = document.getElementById("btn-run-diagnostics");
    if (diagBtn) {
      diagBtn.onclick = () => {
        if (typeof showToast === "function") {
          showToast("System Diagnostics: All 60 Workstations, Central Server, and Biometric Attendance Synced (100% OK)", "success");
        }
      };
    }
  }
}

// Global Launcher
if (typeof window !== "undefined") {
  window.PuzzledMascot = PuzzledMascot;
}
