/**
 * Saurya Computer Education (Khair, Aligarh, U.P.) - RGCSM Franchise
 * Authorised Study Centre of Rajeev Gandhi Computer Saksharta Mission
 * Real Academic Catalog, Official Course Codes, Fee Structures & Registration Guidelines
 */

const INITIAL_DATA = {
  // Institutional Identity & Franchise Details
  institute: {
    name: "Saurya Computer Education",
    hindiName: "शौर्य कंप्यूटर एजुकेशन",
    shortName: "SCE Khair",
    centerCode: "UP-438",
    franchiseCode: "UP-438",
    tagline: "Mission Ek, Lakshya Anek • The Education Catalyst",
    subheadline: "Authorised Study Centre of Rajeev Gandhi Computer Saksharta Mission (RGCSM). Imparting government-recognized vocational, technical, and academic computer diploma and certificate courses with free student kit bag, course materials, dual-screen practical labs, and online on-demand examinations.",
    established: "2012",
    parentOrganization: "Rajeev Gandhi Computer Saksharta Mission (RGCSM)",
    parentOrgWebsite: "https://rgcsm.org",
    studentVerificationUrl: "https://rgcsm.org",
    accreditation: "Franchise of RGCSM • Registered Under Society & Public Trust Act 1860 • ISO 9001:2015 Certified • Approved by Dept. of Secondary & Higher Education, Ministry of HRD, Govt. of India",
    phone: "9927292060",
    phoneFormatted: "+91 99272 92060",
    altPhone: "9084767670",
    altPhoneFormatted: "+91 90847 67670",
    whatsapp: "+919927292060",
    email: "Official.sauryacomputer@gmail.com",
    enquiryEmail: "Enquiry@sauryacomputer.com",
    admissionsEmail: "Enquiry@sauryacomputer.com",
    supportEmail: "Official.sauryacomputer@gmail.com",
    address: "Taintigaon Tiraha, Near KIC (Kedar Inter College), Opposite Central Bank of India, Khair, Aligarh, Uttar Pradesh 202138",
    landmark: "Near KIC / Opposite Central Bank",
    city: "Khair",
    district: "Aligarh",
    state: "Uttar Pradesh",
    pincode: "202138",
    operatingHours: "Monday to Saturday: 8:00 AM – 5:00 PM (Sunday: Closed)",
    googleRating: "4.7",
    googleReviewsCount: "63+ Google Reviews",
    googleMapsUrl: "https://www.google.com/search?q=RGCSM%20Khair",
    heroPrimaryCtaText: "Apply for RGCSM Admission",
    heroSecondaryCtaText: "Explore RGCSM Courses & Fees",
    announcements: [
      {
        id: "ann-101",
        title: "Session 2026-27 RGCSM Batch Admissions Open",
        body: "Applications are actively invited for DOAP, DCA, ADCA, DCAA, PGDCA, Tally Prime with GST & Python. Get free course kit bag, notebook & syllabus materials upon registration.",
        date: "2026-10-15",
        target: "All Prospective Students",
        priority: "High"
      },
      {
        id: "ann-102",
        title: "RGCSM On-Demand Online Examination & Hall Ticket Notice",
        body: "Registered students can now schedule online objective assessments (50 MCQs, 100 marks) at our Khair study centre. Marksheets & diplomas issued within 30 days.",
        date: "2026-10-18",
        target: "Enrolled Students",
        priority: "Normal"
      },
      {
        id: "ann-103",
        title: "Special Fee Concession for SC / ST / Handicapped Candidates",
        body: "As per RGCSM head office directive, a concession of ₹1,000/- is applicable on 1-year diplomas (DOAP, ADCA) and ₹500/- on DCA for SC/ST and Differently-Abled candidates upon submitting valid category certificates.",
        date: "2026-10-19",
        target: "All Candidates",
        priority: "High"
      }
    ]
  },

  // Official RGCSM Associations & Government Recognitions (Image 1)
  affiliations: [
    { name: "National Skill Development Corporation (NSDC)", role: "Associated Skill Development Partner", badge: "NSDC" },
    { name: "Ministry of MSME, Govt. of India", role: "Micro, Small & Medium Enterprises Registered", badge: "MSME" },
    { name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)", role: "Skill India Training Scheme Aligned", badge: "PMKVY" },
    { name: "Uttar Pradesh Skill Development Mission (UPSDM)", role: "हर हुनरमंद को काम — UP State Mission", badge: "UPSDM" },
    { name: "ASSOCHAM India", role: "Associated Chamber of Commerce & Industry", badge: "ASSOCHAM" },
    { name: "NASSCOM", role: "National Association of Software & Services Companies", badge: "NASSCOM" },
    { name: "RASCI", role: "Retailers Association's Skill Council of India", badge: "RASCI" },
    { name: "Telecom Sector Skill Council", role: "Telecom & Hardware Technical Training", badge: "TSSC" },
    { name: "PBSDM & RSLDC", role: "State Skill & Livelihood Development Missions", badge: "State Missions" },
    { name: "IEDUP", role: "Dept of MSME & Export Promotion, Govt. of Uttar Pradesh", badge: "IEDUP" },
    { name: "BOSSE Sikkim", role: "Board of Open Schooling & Skill Education", badge: "BOSSE" },
    { name: "World Book of Records London", role: "Recognized National Literacy & Vocational Footprint", badge: "WBR London" }
  ],

  // Official RGCSM Grading System & Examination Rules (Image 3)
  gradingSystem: [
    { range: ">= 80%", grade: "A+", label: "Distinction / Outstanding", remarks: "Eligible for Academic Honors" },
    { range: ">= 70% to < 80%", grade: "A", label: "First Division (Excellent)", remarks: "Strong Technical Proficiency" },
    { range: ">= 60% to < 70%", grade: "B+", label: "Second Division Upper (Very Good)", remarks: "Good Practical Lab Command" },
    { range: ">= 50% to < 60%", grade: "B", label: "Second Division (Good)", remarks: "Competent Skills" },
    { range: ">= 40% to < 50%", grade: "C", label: "Pass Division", remarks: "Minimum Qualifying Standard" },
    { range: "< 40%", grade: "Re-Exam", label: "Failed / Module Re-appear Required", remarks: "Re-examination allowed per subject" }
  ],

  // Detailed Flagship RGCSM Courses (Images 4 & 5)
  courses: [
    {
      id: "doap",
      rgcsmCode: "R20111",
      name: "Diploma in Office Automation & Publishing (DOAP)",
      shortCode: "DOAP",
      category: "Job-Oriented Diplomas",
      duration: "1 Year (12 Months)",
      semesters: 2,
      totalHours: 280,
      fee: 15000,
      feeFormatted: "₹15,000",
      concessionFee: 14000,
      concessionFeeFormatted: "₹14,000",
      feeNote: "General: ₹15,000 | SC/ST/Handicapped: ₹14,000",
      installmentPlan: "₹3,000 at registration + monthly installments of ₹1,000",
      eligibility: "10th / 12th Pass from any recognized State or Central Board",
      certification: "RGCSM Official Diploma Certificate & Marksheet (Valid for Employment Exchanges across India)",
      assessmentMethod: "Semester I & II Online Objective Exams (50 MCQs/100 Marks) + Practical Lab (100 Marks)",
      careerOutcome: "Office Administrator, DTP Specialist, Computer Operator, Graphic Executive, Accounts Assistant",
      overview: "Registered under the C.R. Act of Ministry of HRD (Dept. of Secondary & Higher Education), Govt. of India. Comprehensive 1-year diploma covering office suite productivity, computerized accounting in Tally with GST, professional DTP publication (Photoshop, CorelDraw, PageMaker), and web technologies. All students receive free course material, official kit bag & notebook.",
      freeKitIncluded: true,
      batches: ["Morning (08:00 AM - 09:30 AM)", "Mid-Day (10:30 AM - 12:00 PM)", "Afternoon (02:00 PM - 03:30 PM)", "Evening (03:30 PM - 05:00 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "SEMESTER-I: Computing Fundamentals, Office Suites & Networking",
          topics: [
            "Computer Concept & Fundamentals: Architecture, CPU, Hardware, Memory Hierarchy",
            "Operating Systems: Windows OS Navigation, Desktop Management, File Explorer & Utilities",
            "MS-Office (Word, Excel, PowerPoint, Access): Formatting, Functions, Presentations, Relational Tables",
            "Computer Network & Internet: LAN/WAN, Browsers, Web Research, Email Protocol & Cyber Safety",
            "Lab-I: Practical Benchwork, Keyboard Speed Drills & Operating System Diagnostics"
          ]
        },
        {
          module: "SEMESTER-II: Financial Accounting, DTP & Web Technologies",
          topics: [
            "Basics of Financial Accounting: Principles, Ledgers, Trial Balance & Voucher Types",
            "Computerized Accounting Through Tally with GST: Company Setup, CGST/SGST/IGST Invoicing, BRS",
            "D.T.P. (Desk Top Publishing): PageMaker, CorelDraw Vector Layouts, Adobe Photoshop Retouching",
            "Web Technologies: HTML, CSS, JavaScript Basics & Interactive Web Publishing",
            "Lab-II & Final Project Work: Comprehensive Project Portfolio Submission"
          ]
        }
      ]
    },
    {
      id: "adca",
      rgcsmCode: "R20118",
      name: "Advance Diploma in Computer Application (ADCA)",
      shortCode: "ADCA",
      category: "Job-Oriented Diplomas",
      duration: "1 Year (12 Months)",
      semesters: 2,
      totalHours: 288,
      fee: 15000,
      feeFormatted: "₹15,000",
      concessionFee: 14000,
      concessionFeeFormatted: "₹14,000",
      feeNote: "General: ₹15,000 | SC/ST/Handicapped: ₹14,000",
      installmentPlan: "₹3,000 at admission + monthly installments of ₹1,000",
      eligibility: "10th / 12th Pass from any recognized State or Central Board",
      certification: "RGCSM Advance Diploma Certificate & Official Grade Transcript (Govt. of India MHRD C.R. Act)",
      assessmentMethod: "Online On-Demand Examination (50 MCQs / 100 Marks per module) + Practical Lab Evaluation (100 Marks)",
      careerOutcome: "Senior Computer Operator, Junior Programmer, IT Lab Assistant, Accounts Executive, Office Supervisor",
      overview: "Registered under C.R. Act of Ministry of HRD, Govt. of India. RGCSM's flagship 1-year curriculum blending core computing, advanced office automation, C++ programming, Tally Prime with GST, and front-end web design. Includes free course kit bag, notebook & study books.",
      freeKitIncluded: true,
      batches: ["Morning (08:00 AM - 09:30 AM)", "Morning (09:30 AM - 11:00 AM)", "Afternoon (01:30 PM - 03:00 PM)", "Evening (03:30 PM - 05:00 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "SEMESTER-I: Fundamentals, Office Automation & Internet Technologies",
          topics: [
            "Computer Concept & Fundamentals: Input/Output Architecture, Binary Systems, Peripherals",
            "Operating System: Windows Architecture, System Settings, Command Prompt & Linux Basics",
            "MS-Office Suite: MS Word (Mail Merge), Advanced MS Excel (Pivot Tables, VLOOKUP), PowerPoint & MS Access",
            "Computer Network & Internet: Protocols, IP Addressing, Security & Cloud Productivity Tools",
            "Lab-I: Practical Operating System, Typing Proficiency Drills & Office Automation Benchwork"
          ]
        },
        {
          module: "SEMESTER-II: Programming, Accounting & Web Development",
          topics: [
            "HTML, CSS, JavaScript: Semantic Web Pages, CSS Styling, JavaScript Client Interactivity",
            "Programming in C++: Object-Oriented Principles, Classes, Inheritance, Pointers & Data Structures",
            "Computerized Accounting Through Tally with GST: Ledgers, Vouchers (F4-F9), GST Invoicing, Balance Sheets",
            "Lab-II: Practical C++ Code Bench, Live Tally Ledger Reconciliation & Web Design Project",
            "Comprehensive Project Work & Viva Voce"
          ]
        }
      ]
    },
    {
      id: "dca",
      rgcsmCode: "R10104",
      name: "Diploma in Computer Application (DCA)",
      shortCode: "DCA",
      category: "Job-Oriented Diplomas",
      duration: "6 Months",
      semesters: 1,
      totalHours: 150,
      fee: 8000,
      feeFormatted: "₹8,000",
      concessionFee: 7500,
      concessionFeeFormatted: "₹7,500",
      feeNote: "General: ₹8,000 | SC/ST/Handicapped: ₹7,500",
      installmentPlan: "2 easy installments of ₹4,000 (or ₹4,000 + ₹3,500 for SC/ST)",
      eligibility: "10th Pass from any recognized State or Central Board",
      certification: "RGCSM Official Diploma in Computer Application Certificate",
      assessmentMethod: "Online On-Demand Examination (50 Questions / 100 Marks) + Practical Lab & Project (100 Marks)",
      careerOutcome: "Computer Operator, Data Entry Operator, Front Desk Executive, Office Assistant",
      overview: "Registered under C.R. Act of Ministry of HRD, Govt. of India. A high-demand 6-month diploma preparing students for fast-track career entry into offices, commercial centers, and clerical operations. Includes free written theory course materials & practical lab access.",
      freeKitIncluded: true,
      batches: ["Morning (08:30 AM - 10:00 AM)", "Mid-Day (11:00 AM - 12:30 PM)", "Evening (03:30 PM - 05:00 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "Comprehensive 6-Month Module Breakdown",
          topics: [
            "Computer Concept & Fundamentals: Hardware architecture, memory, peripheral devices",
            "Operating System: Windows management, control panel, file structure & maintenance",
            "MS-Office: MS Word (documentation), MS Excel (spreadsheets & formulas), MS PowerPoint, MS Access",
            "Web Fundamentals: HTML, CSS & JavaScript basics for website construction",
            "Lab-I: 100% Practical lab execution on dual-screen workstations",
            "Project Work: Real-world office document & spreadsheet portfolio submission"
          ]
        }
      ]
    },
    {
      id: "dcaa",
      rgcsmCode: "R10203",
      name: "Diploma in Computer Application & Accounting (DCAA)",
      shortCode: "DCAA",
      category: "Accounting & Finance",
      duration: "6 Months",
      semesters: 1,
      totalHours: 160,
      fee: 9000,
      feeFormatted: "₹9,000",
      concessionFee: 8500,
      concessionFeeFormatted: "₹8,500",
      feeNote: "General: ₹9,000 | SC/ST/Handicapped: ₹8,500",
      installmentPlan: "2 installments of ₹4,500",
      eligibility: "10th / 12th Pass (Open to Commerce & Arts/Science students)",
      certification: "RGCSM Diploma in Computer Application & Accounting",
      assessmentMethod: "Objective Online Exam + Practical Ledger & Voucher Evaluation",
      careerOutcome: "Accounts Assistant, Billing Operator, Junior Accountant, GST Tax Filing Assistant",
      overview: "Specialized diploma merging standard computer application proficiency with computerized financial accounting. Covers Windows, MS Office, Advanced Excel for Finance, Tally Prime with GST, Bank Reconciliation, and Tax Invoicing.",
      freeKitIncluded: true,
      batches: ["Morning (10:00 AM - 11:30 AM)", "Afternoon (02:00 PM - 03:30 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "Module 1: Computer Applications & Office Automation",
          topics: [
            "Computer Concepts & Windows Operating System navigation",
            "MS Word: Commercial letters, memos, notices & tables",
            "MS Excel: Financial formulas (SUMIF, VLOOKUP, HLOOKUP, Pivot Tables, Depreciation)",
            "Internet, Banking Portals & Digital Financial Services"
          ]
        },
        {
          module: "Module 2: Computerized Accounting in Tally Prime with GST",
          topics: [
            "Double-Entry Bookkeeping Foundations: Golden Rules, Journals & Ledgers",
            "Tally Prime Setup, Company Creation & Chart of Accounts",
            "Vouchers: Payment (F5), Receipt (F6), Contra (F4), Journal (F7), Sales (F8), Purchase (F9)",
            "GST Compliance: CGST, SGST, IGST Setup, E-Way Bill & Invoicing",
            "Bank Reconciliation Statement (BRS) & Final Accounts (P&L, Balance Sheet)"
          ]
        }
      ]
    },
    {
      id: "pgdca",
      rgcsmCode: "R30105",
      name: "Post Graduate Diploma in Computer Application (PGDCA)",
      shortCode: "PGDCA",
      category: "Job-Oriented Diplomas",
      duration: "1 Year (12 Months)",
      semesters: 2,
      totalHours: 320,
      fee: 18000,
      feeFormatted: "₹18,000",
      concessionFee: 16500,
      concessionFeeFormatted: "₹16,500",
      feeNote: "General: ₹18,000 | SC/ST/Handicapped: ₹16,500",
      installmentPlan: "₹4,000 at admission + 4 quarterly installments of ₹3,500",
      eligibility: "Graduate in any stream (B.A., B.Sc., B.Com, B.Tech, etc.)",
      certification: "RGCSM Post Graduate Diploma in Computer Application (PGDCA)",
      assessmentMethod: "Semester I & II Online Theory Examination + Advanced Practical Software Project",
      careerOutcome: "System Analyst, Software Associate, Senior IT Executive, Database Administrator",
      overview: "Advanced post-graduate credential designed for college graduates seeking a solid transition into software engineering, database management, and enterprise IT. Includes free student kit & study manuals.",
      freeKitIncluded: true,
      batches: ["Morning (08:30 AM - 10:30 AM)", "Evening (03:30 PM - 05:00 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "SEMESTER-I: Advanced Computing, Systems & Data Structures",
          topics: [
            "Advanced Computer Architecture, Linux & Windows Server OS",
            "Relational Database Management Systems (RDBMS) & SQL Queries",
            "Object-Oriented Programming with C++ / Core Java",
            "Data Communication & Enterprise Networking Protocols"
          ]
        },
        {
          module: "SEMESTER-II: Software Engineering, Python & Web Platforms",
          topics: [
            "Full Stack Web Technologies: HTML5, CSS3, JavaScript & Modern Frameworks",
            "Python Programming: Syntax, Object-Oriented Design & Data Handling",
            "Software Engineering Methodologies & Testing Fundamentals",
            "Major Capstone Project Development & Viva Voce"
          ]
        }
      ]
    },
    {
      id: "rg-cit",
      rgcsmCode: "R10108",
      name: "Rajeev Gandhi-Certificate in Information Technology (RG-CIT)",
      shortCode: "RG-CIT",
      category: "Certificate Courses",
      duration: "3 Months",
      semesters: 1,
      totalHours: 90,
      fee: 3500,
      feeFormatted: "₹3,500",
      concessionFee: 3200,
      concessionFeeFormatted: "₹3,200",
      feeNote: "General: ₹3,500 | SC/ST/Handicapped: ₹3,200",
      installmentPlan: "One-time payment of ₹3,500 or 2 installments of ₹1,800",
      eligibility: "Open to all students, job-seekers and beginners",
      certification: "RGCSM Official RG-CIT Certificate in Information Technology",
      assessmentMethod: "Online On-Demand Examination (50 MCQs / 30 Minutes)",
      careerOutcome: "IT Literate Professional, Office Assistant, Data Operator",
      overview: "RGCSM's premier IT literacy certificate aligned with national computer competency guidelines. Teaches modern computer operations, office productivity, digital government services, cyber hygiene, and online banking.",
      freeKitIncluded: false,
      batches: ["Morning (08:00 AM - 09:00 AM)", "Afternoon (01:00 PM - 02:00 PM)", "Evening (04:00 PM - 05:00 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "Essential IT Competency Curriculum",
          topics: [
            "Module 1: Computer Hardware, Windows 11 GUI & System Settings",
            "Module 2: MS Word — Professional document authoring, formatting & printing",
            "Module 3: MS Excel — Basic formulas, spreadsheets, charts & sorting",
            "Module 4: MS PowerPoint — Designing visual slide decks",
            "Module 5: Digital Services — UPI, Net Banking, DigiLocker, IRCTC & Cyber Security"
          ]
        }
      ]
    },
    {
      id: "ccoai",
      rgcsmCode: "R10102",
      name: "Certificate Course in Office Automation & Internet (CCOAI / CCC)",
      shortCode: "CCOAI",
      category: "Certificate Courses",
      duration: "3 Months",
      semesters: 1,
      totalHours: 90,
      fee: 3500,
      feeFormatted: "₹3,500",
      concessionFee: 3200,
      concessionFeeFormatted: "₹3,200",
      feeNote: "General: ₹3,500 | SC/ST/Handicapped: ₹3,200",
      installmentPlan: "One-time ₹3,500 or 2 installments of ₹1,800",
      eligibility: "8th / 10th Pass or aspiring candidate for government clerical examinations",
      certification: "RGCSM Certificate in Office Automation & Internet (CCC Aligned)",
      assessmentMethod: "Weekly objective mock tests + Final timed online examination",
      careerOutcome: "Government Clerk Aspirant, Computer Operator, Front-Desk Secretary",
      overview: "Standardized computer literacy program covering fundamental IT tools, word processing, spreadsheets, internet utilities, e-governance, and digital security best practices.",
      freeKitIncluded: false,
      batches: ["Morning (07:30 AM - 08:30 AM)", "Evening (04:00 PM - 05:00 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "Module 1: Computing Core & OS",
          topics: [
            "Hardware units, Central Processing Unit & storage devices",
            "Operating system controls, task manager, settings & file extensions"
          ]
        },
        {
          module: "Module 2: Word Processing & Data Sheets",
          topics: [
            "Document creation, typography, tables, bullets & page setup",
            "Spreadsheet essentials: cells, formulas, common functions & graphs"
          ]
        },
        {
          module: "Module 3: Internet & Digital Financial Systems",
          topics: [
            "Web browsers, search techniques, emails, attachments & cloud drives",
            "Digital financial tools: UPI, IMPS, NEFT, AEPS, Cyber safety hygiene"
          ]
        }
      ]
    },
    {
      id: "tally-gst",
      rgcsmCode: "R10607",
      name: "Professional Course in Tally (Tally Prime with GST)",
      shortCode: "Tally-GST",
      category: "Accounting & Finance",
      duration: "3 Months",
      semesters: 1,
      totalHours: 90,
      fee: 5500,
      feeFormatted: "₹5,500",
      concessionFee: 5000,
      concessionFeeFormatted: "₹5,000",
      feeNote: "General: ₹5,500 | SC/ST/Handicapped: ₹5,000",
      installmentPlan: "2 installments of ₹2,800 (or ₹5,500 one-time)",
      eligibility: "10th / 12th Pass (Commerce preferred, open to all streams)",
      certification: "RGCSM Professional Certificate in Computerized Business Accounting",
      assessmentMethod: "Practical ledger reconciliation & live voucher entry assessments",
      careerOutcome: "Accounts Assistant, Billing Clerk, Junior Accountant, GST Tax Filing Assistant",
      overview: "100% lab-driven computerized accounting program. Learn double-entry fundamentals, live voucher entry, GST invoicing, E-Way bills, inventory management, and financial balance sheet generation in Tally Prime.",
      freeKitIncluded: false,
      batches: ["Morning (10:00 AM - 11:30 AM)", "Afternoon (02:00 PM - 03:30 PM)", "Evening (03:30 PM - 05:00 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "Unit 1: Manual Accounting Foundations & Ledgers",
          topics: [
            "Golden Rules of Accounting: Personal, Real, and Nominal Accounts",
            "Journal Entries, Ledger Posting & Trial Balance Preparation"
          ]
        },
        {
          module: "Unit 2: Tally Prime Operations & Vouchers",
          topics: [
            "Company Setup, Group Configurations & Ledger Creation",
            "Vouchers: Payment (F5), Receipt (F6), Contra (F4), Journal (F7), Sales (F8), Purchase (F9)"
          ]
        },
        {
          module: "Unit 3: GST Invoicing, E-Way Bill & Taxation",
          topics: [
            "GST Structure: CGST, SGST, IGST Setup, HSN/SAC Codes",
            "Tax Invoicing, Inter-state and Intra-state Sales/Purchases",
            "E-Way Bill Generation Concepts & GSTR Reporting Basics"
          ]
        },
        {
          module: "Unit 4: Advanced Inventory & Final Accounts",
          topics: [
            "Stock Groups, Units of Measure & Godown Allocations",
            "Bank Reconciliation Statement (BRS) with Live Bank Statements",
            "Profit & Loss Account, Balance Sheet Analysis & Audit Trail Review"
          ]
        }
      ]
    },
    {
      id: "python",
      rgcsmCode: "R10621",
      name: "Professional Course in Python (PTY)",
      shortCode: "PTY",
      category: "Software & Coding",
      duration: "3 Months",
      semesters: 1,
      totalHours: 90,
      fee: 6500,
      feeFormatted: "₹6,500",
      concessionFee: 6000,
      concessionFeeFormatted: "₹6,000",
      feeNote: "General: ₹6,500 | SC/ST/Handicapped: ₹6,000",
      installmentPlan: "2 installments of ₹3,300",
      eligibility: "12th Pass / Undergraduate / Logical Aptitude",
      certification: "RGCSM Professional Certificate in Python Programming",
      assessmentMethod: "Practical coding labs, weekly syntax exercises & capstone script project",
      careerOutcome: "Junior Python Programmer, Automation Associate, Data Analyst Trainee",
      overview: "Practical, project-centric programming course in Python. From syntax fundamentals to object-oriented programming, data structures, file handling, and practical automation scripts.",
      freeKitIncluded: false,
      batches: ["Morning (08:30 AM - 10:00 AM)", "Evening (03:30 PM - 05:00 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "Phase 1: Python Basics & Control Logic",
          topics: [
            "Variables, Datatypes, Operators, Type Casting & Formatted Strings",
            "Control Structures: If-Else Conditionals, For & While Loops, Loop Control"
          ]
        },
        {
          module: "Phase 2: Data Collections & Functions",
          topics: [
            "Lists, Tuples, Dictionaries, Sets & List Comprehensions",
            "User-defined Functions, Lambda Functions, Scope & Recursion"
          ]
        },
        {
          module: "Phase 3: OOP, File I/O & Real-world Automation",
          topics: [
            "Classes, Objects, Inheritance, Encapsulation & Exception Handling",
            "File Handling (Text/CSV), Working with SQLite/MySQL Database",
            "Automation Project & Capstone Script Showcase"
          ]
        }
      ]
    },
    {
      id: "dtp",
      rgcsmCode: "R10101",
      name: "Certificate Course in Desk Top Publication (DTP)",
      shortCode: "DTP",
      category: "Design & Media",
      duration: "3 Months",
      semesters: 1,
      totalHours: 90,
      fee: 5000,
      feeFormatted: "₹5,000",
      concessionFee: 4500,
      concessionFeeFormatted: "₹4,500",
      feeNote: "General: ₹5,000 | SC/ST/Handicapped: ₹4,500",
      installmentPlan: "2 installments of ₹2,500",
      eligibility: "10th Pass with creative interest",
      certification: "RGCSM Certificate in Desk Top Publication (DTP)",
      assessmentMethod: "Practical design briefs, banner creation & commercial portfolio review",
      careerOutcome: "DTP Operator, Graphic Designer, Print Shop Specialist, Advertising Executive",
      overview: "Master standard digital publishing and vector design tools including CorelDRAW, Adobe Photoshop, and PageMaker for advertising, commercial flex printing, and book publishing.",
      freeKitIncluded: false,
      batches: ["Mid-Day (11:30 AM - 01:00 PM)", "Evening (03:30 PM - 05:00 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "Module 1: Image Editing & Creative Compositing (Photoshop)",
          topics: [
            "Photoshop Workspace, Layers, Selection Tools, Masking & Color Correction",
            "Photo Retouching, Social Media Banners, Passport Photo Creation & Effects"
          ]
        },
        {
          module: "Module 2: Vector Graphics & Commercial Print Design (CorelDraw & PageMaker)",
          topics: [
            "CorelDraw: Vector shapes, Bezier curves, logo design, visiting cards, pamphlets & flex banners",
            "PageMaker: Typography, column layouts, booklet formatting & print-ready press preflight"
          ]
        }
      ]
    },
    {
      id: "web-designing",
      rgcsmCode: "R10107",
      name: "Diploma in Internet Programming & Web Designing (DIPWD)",
      shortCode: "DIPWD",
      category: "Software & Coding",
      duration: "6 Months",
      semesters: 1,
      totalHours: 180,
      fee: 10000,
      feeFormatted: "₹10,000",
      concessionFee: 9000,
      concessionFeeFormatted: "₹9,000",
      feeNote: "General: ₹10,000 | SC/ST/Handicapped: ₹9,000",
      installmentPlan: "₹3,000 at admission + monthly installments of ₹1,400",
      eligibility: "10th / 12th Pass with basic computer familiarity",
      certification: "RGCSM Diploma in Internet Programming & Web Designing",
      assessmentMethod: "Practical code review, live web project deployment & viva",
      careerOutcome: "Web Designer, Front-End Developer, Freelance Website Creator",
      overview: "Practical curriculum covering modern responsive web design. Learn HTML5, CSS3, JavaScript, Bootstrap framework, web hosting, domain mapping, and website publishing.",
      freeKitIncluded: true,
      batches: ["Afternoon (01:30 PM - 03:00 PM)"],
      isFeatured: false,
      syllabus: [
        {
          module: "Front-End Web Architecture & Responsive Layouts",
          topics: [
            "HTML5 Semantic tags, forms, media players & tables",
            "CSS3 Flexbox, CSS Grid, media queries & responsive layouts",
            "JavaScript DOM manipulation, event listeners & form validation",
            "Bootstrap 5 framework, responsive components & template design",
            "Domain registration, web hosting setup & live website deployment"
          ]
        }
      ]
    },
    {
      id: "hardware-mobile",
      rgcsmCode: "R10401",
      name: "Diploma in Computer Hardware & Mobile Maintenance (DMM / DCH)",
      shortCode: "DMM/DCH",
      category: "Hardware & Systems",
      duration: "6 Months",
      semesters: 1,
      totalHours: 160,
      fee: 8000,
      feeFormatted: "₹8,000",
      concessionFee: 7500,
      concessionFeeFormatted: "₹7,500",
      feeNote: "General: ₹8,000 | SC/ST/Handicapped: ₹7,500",
      installmentPlan: "2 installments of ₹4,000",
      eligibility: "10th Pass",
      certification: "RGCSM Diploma in Mobile Maintenance & Hardware",
      assessmentMethod: "Bench assembly, hardware troubleshooting & circuit diagnostics",
      careerOutcome: "Hardware Support Engineer, Mobile Repair Specialist, Desktop Technician",
      overview: "Hands-on diagnostic and repair course covering computer assembly, SMPS testing, motherboard troubleshooting, Windows/Linux installation, LAN cabling, and smartphone hardware/software maintenance.",
      freeKitIncluded: true,
      batches: ["Evening (03:30 PM - 05:00 PM)"],
      isFeatured: false,
      syllabus: [
        {
          module: "Hardware Assembly, Diagnostics & Mobile Repair",
          topics: [
            "PC Component Architecture: Motherboards, RAM, NVMe/SATA SSDs, SMPS & CPUs",
            "System Assembly, Disassembly, BIOS/UEFI settings & OS installation",
            "Fault finding: POST codes, BSOD debugging, driver conflict resolution",
            "Local Area Networking: CAT6 crimping, switches & Wi-Fi routers",
            "Smartphone maintenance: Flashing, screen replacement & hardware diagnosis"
          ]
        }
      ]
    },
    {
      id: "ai-chatgpt",
      rgcsmCode: "R10623",
      name: "Certificate Course in ChatGPT & Artificial Intelligence (ChatGPT / CC-AI)",
      shortCode: "ChatGPT-AI",
      category: "Emerging Technologies",
      duration: "3 Months",
      semesters: 1,
      totalHours: 80,
      fee: 5000,
      feeFormatted: "₹5,000",
      concessionFee: 4500,
      concessionFeeFormatted: "₹4,500",
      feeNote: "General: ₹5,000 | SC/ST/Handicapped: ₹4,500",
      installmentPlan: "One-time ₹5,000 or 2 installments of ₹2,600",
      eligibility: "10th / 12th Pass or working professionals",
      certification: "RGCSM Certificate in Artificial Intelligence & ChatGPT",
      assessmentMethod: "Practical AI workflow assignments & prompt engineering showcase",
      careerOutcome: "AI Productivity Specialist, Digital Content Creator, Automation Assistant",
      overview: "Modern certificate course covering Generative AI, ChatGPT prompting techniques, AI tools for office work, automated document generation, AI image creation, and workplace workflow enhancements.",
      freeKitIncluded: false,
      batches: ["Morning (09:30 AM - 10:30 AM)", "Afternoon (02:00 PM - 03:00 PM)"],
      isFeatured: true,
      syllabus: [
        {
          module: "Generative AI, Prompt Engineering & Smart Workflows",
          topics: [
            "Introduction to AI, Machine Learning & Large Language Models",
            "Advanced Prompt Engineering techniques for ChatGPT & Claude",
            "Automating office tasks: Emails, Excel formulas, research summaries & data analysis",
            "AI tools for graphics, presentations & audio-visual creation",
            "Ethical AI usage, verification of AI outputs & data privacy"
          ]
        }
      ]
    }
  ],

  // Complete 50-Course Official RGCSM Master Index (from Image 4)
  allRgcsmCourses: [
    { code: "R20111", name: "Diploma in Office Automation & Publishing (DOAP)", duration: "1 Year", category: "Diploma" },
    { code: "R10104", name: "Diploma in Computer Application (DCA)", duration: "6 Months", category: "Diploma" },
    { code: "R20118", name: "Advance Diploma in Computer Application (ADCA)", duration: "1 Year", category: "Advance Diploma" },
    { code: "R10203", name: "Diploma in Computer Application & Accounting (DCAA)", duration: "6 Months", category: "Diploma" },
    { code: "R20102", name: "Diploma in Multimedia and Animation (DMA)", duration: "1 Year", category: "Diploma" },
    { code: "R30104", name: "Advance Diploma in Information Technology (ADIT)", duration: "1 Year", category: "Advance Diploma" },
    { code: "R20116", name: "Advance Diploma in Computer Application, Accounting and Publishing (ADCAAP)", duration: "1 Year", category: "Advance Diploma" },
    { code: "R20117", name: "Advance Diploma in Computer Fundamentals & Tally (ADCFT)", duration: "1 Year", category: "Advance Diploma" },
    { code: "R10107", name: "Diploma in Internet Programming & Web Designing (DIPWD)", duration: "6 Months", category: "Diploma" },
    { code: "R10103", name: "Diploma in Computer Application & Designing (DCAD)", duration: "6 Months", category: "Diploma" },
    { code: "R10108", name: "Rajeev Gandhi-Certificate in Information Technology (RG-CIT)", duration: "3 Months", category: "Certificate" },
    { code: "R30105", name: "Post Graduate Diploma in Computer Application (PGDCA)", duration: "1 Year", category: "Post Graduate" },
    { code: "R10115", name: "Diploma in Graphic Design (DGD)", duration: "6 Months", category: "Diploma" },
    { code: "R10114", name: "Diploma in Artificial Intelligence (D-AI)", duration: "6 Months", category: "Diploma" },
    { code: "R10113", name: "Certificate Course in Artificial Intelligence (CC-AI)", duration: "3 Months", category: "Certificate" },
    { code: "R10202", name: "Certificate Course in Computer Accounting (CCCA)", duration: "3 Months", category: "Certificate" },
    { code: "R10101", name: "Certificate Course in Desk Top Publication (DTP)", duration: "3 Months", category: "Certificate" },
    { code: "R10106", name: "Diploma in Information Technology (DIT)", duration: "6 Months", category: "Diploma" },
    { code: "R10102", name: "Certificate Course in Office Automation & Internet (CCOAI)", duration: "3 Months", category: "Certificate" },
    { code: "R10617", name: "Certificate Course in Digital Marketing (CDM)", duration: "3 Months", category: "Certificate" },
    { code: "R10619", name: "Certificate Course in Advance Excel (CAE)", duration: "3 Months", category: "Certificate" },
    { code: "R10613", name: "Internet Kiosk Operator (IKO)", duration: "3 Months", category: "Vocational" },
    { code: "R10621", name: "Professional Course in Python (PTY)", duration: "3 Months", category: "Professional" },
    { code: "R10611", name: "Certificate in Data Entry Operator (CDEO)", duration: "3 Months", category: "Certificate" },
    { code: "R10614", name: "Computer Appreciation Course (CAC)", duration: "3 Months", category: "Certificate" },
    { code: "R10616", name: "Certificate Course in Digital Learning (CDL)", duration: "3 Months", category: "Certificate" },
    { code: "R10606", name: "Professional Course in D.T.P.", duration: "3 Months", category: "Professional" },
    { code: "R10607", name: "Professional Course in Tally", duration: "3 Months", category: "Professional" },
    { code: "R10608", name: "Certificate Course in Autocad (CCA)", duration: "3 Months", category: "Certificate" },
    { code: "R10401", name: "Diploma in Mobile Maintenance (DMM)", duration: "6 Months", category: "Diploma" },
    { code: "R10623", name: "Certificate Course in ChatGPT (ChatGPT)", duration: "3 Months", category: "Certificate" },
    { code: "R10624", name: "Certificate Course in Machine Learning (CCML)", duration: "3 Months", category: "Certificate" },
    { code: "R10625", name: "IT Support Specialist (ITSS)", duration: "3 Months", category: "Professional" },
    { code: "R20301", name: "Diploma in Computer Teacher Training (DCTT)", duration: "1 Year", category: "Teacher Training" },
    { code: "R20302", name: "Diploma in Primary Computer Teacher Training (DPCTT)", duration: "1 Year", category: "Teacher Training" },
    { code: "R20105", name: "Advance Diploma in Computer Hardware & Networking (ADCHN)", duration: "1 Year", category: "Advance Diploma" },
    { code: "R20119", name: "Advance Diploma in Computer Programming (ADCP)", duration: "1 Year", category: "Advance Diploma" },
    { code: "R20112", name: "Advance Diploma in Computer Application & Web Design (ADCA-WEB)", duration: "1 Year", category: "Advance Diploma" },
    { code: "R30102", name: "Post Graduate Diploma in Information Technology (PGDIT)", duration: "1 Year", category: "Post Graduate" },
    { code: "R10105", name: "Diploma in Computer Hardware (DCH)", duration: "6 Months", category: "Diploma" },
    { code: "R10109", name: "Certificate Course in Software Installation, Up gradation & Troubleshooting (CCSUT)", duration: "3 Months", category: "Certificate" },
    { code: "R20115", name: "Honours-Advance Diploma in Computer Application (H-ADCA)", duration: "1 Year", category: "Honours" },
    { code: "R20114", name: "Honours-Diploma in Office Automation & Publishing (H-DOAP)", duration: "1 Year", category: "Honours" },
    { code: "R10601", name: "Professional Course in C++", duration: "3 Months", category: "Professional" },
    { code: "R10602", name: "Professional Course in C-Language", duration: "3 Months", category: "Professional" },
    { code: "R10111", name: "Certificate in Management Information System (CMIS)", duration: "3 Months", category: "Certificate" },
    { code: "RS10601", name: "Easy English-Spoken English Course*", duration: "3 Months", category: "Skill Course" },
    { code: "RS20514", name: "Accounts Expert-Certified Professional Accountant (AE-CPA)", duration: "6 Months", category: "Specialist" },
    { code: "R10301", name: "Nursery Teachers Training (N.T.T.)- One Year*", duration: "1 Year", category: "Teacher Training" },
    { code: "R30301", name: "Nursery Teachers Training (N.T.T.)- Two Years*", duration: "2 Years", category: "Teacher Training" }
  ],

  // Faculty Records with Assigned Scope (Khair Center)
  teachers: [
    {
      id: "tea-01",
      username: "faculty@sauryacomputer.edu",
      name: "Mr. Vivek Sharma",
      role: "teacher",
      designation: "Senior Faculty — Computer Applications & Programming",
      qualification: "MCA, B.Sc. (Computer Science), RGCSM Certified Instructor",
      assignedCourses: ["doap", "adca", "dca", "python"],
      assignedBatches: ["Morning (08:00 AM - 09:30 AM)", "Afternoon (01:30 PM - 03:00 PM)"],
      password: "teacher123",
      email: "faculty@sauryacomputer.edu",
      phone: "+91 90847 67670",
      avatar: "assets/images/faculty1.jpg"
    },
    {
      id: "tea-02",
      username: "tally@sauryacomputer.edu",
      name: "Mr. Rakesh Chandra",
      role: "teacher",
      designation: "Senior Faculty — Financial Accounting & Taxation",
      qualification: "M.Com, Certified Tally Professional",
      assignedCourses: ["tally-gst", "dcaa", "doap"],
      assignedBatches: ["Morning (10:00 AM - 11:30 AM)", "Evening (03:30 PM - 05:00 PM)"],
      password: "teacher123",
      email: "tally@sauryacomputer.edu",
      phone: "+91 90847 67670",
      avatar: "assets/images/director.jpg"
    },
    {
      id: "tea-03",
      username: "priya@sauryacomputer.edu",
      name: "Mrs. Priya Sharma",
      role: "teacher",
      designation: "Faculty — Office Automation & Web Design",
      qualification: "MCA, B.Sc. (IT), RGCSM Certified Instructor",
      assignedCourses: ["doap", "dca", "adca"],
      assignedBatches: ["Morning (08:00 AM - 09:30 AM)", "Evening (03:30 PM - 05:00 PM)"],
      password: "teacher123",
      email: "priya@sauryacomputer.edu",
      phone: "+91 90847 67670",
      avatar: "assets/images/faculty1.jpg"
    }
  ],

  // Admin Account (Center Director Khair)
  admins: [
    {
      id: "adm-01",
      username: "admin@sauryacomputer.edu",
      name: "Mr. Navneet Bhardwaj & Mr. Saurabh Bhardwaj",
      role: "super_admin",
      designation: "Center Directors & RGCSM Franchise Administrators",
      qualification: "B.Tech, RGCSM Authorized Center Heads",
      password: "admin123",
      email: "Official.sauryacomputer@gmail.com",
      phone: "+91 99272 92060",
      avatar: "assets/images/director.jpg"
    }
  ],

  // Enrolled Student Records in Khair Center
  students: [
    {
      id: "SCE-2026-0001",
      studentId: "SCE-2026-0001",
      rgcsmEnrollmentNo: "RGCSM-UP-KHR-2026-0142",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "090847 67670",
      dob: "2003-08-14",
      gender: "Male",
      address: "Near KIC (Kedar Inter College), Khair, Aligarh, UP",
      courseId: "adca",
      courseCode: "R20118",
      courseName: "Advance Diploma in Computer Application (ADCA)",
      batch: "Morning (08:00 AM - 09:30 AM)",
      enrollmentDate: "2026-01-15",
      status: "active",
      password: "student123",
      avatar: "assets/images/director.jpg",
      fees: {
        totalPayable: 15000,
        amountPaid: 11000,
        outstandingBalance: 4000,
        status: "partially_paid",
        installments: [
          { installmentNo: 1, amount: 3000, dueDate: "2026-01-15", status: "Paid", paidAt: "2026-01-15", receiptNo: "REC-KHR-101", paymentMode: "UPI / QR Code" },
          { installmentNo: 2, amount: 4000, dueDate: "2026-02-15", status: "Paid", paidAt: "2026-02-14", receiptNo: "REC-KHR-214", paymentMode: "Institute Cash Counter" },
          { installmentNo: 3, amount: 4000, dueDate: "2026-03-15", status: "Paid", paidAt: "2026-03-12", receiptNo: "REC-KHR-329", paymentMode: "Online Transfer" },
          { installmentNo: 4, amount: 4000, dueDate: "2026-04-15", status: "Pending", paidAt: null, receiptNo: null, paymentMode: null }
        ]
      },
      attendance: {
        totalSessions: 46,
        sessionsAttended: 42,
        percentage: 91.3,
        today: {
          checkedIn: true,
          checkInTime: "08:02 AM",
          checkedOut: false,
          checkOutTime: null,
          status: "Present (In Lab Session)"
        },
        logs: [
          { date: "2026-10-19", checkIn: "08:02 AM", checkOut: "—", duration: "Active", status: "Present" },
          { date: "2026-10-18", checkIn: "08:05 AM", checkOut: "09:35 AM", duration: "1h 30m", status: "Present" },
          { date: "2026-10-17", checkIn: "08:00 AM", checkOut: "09:30 AM", duration: "1h 30m", status: "Present" },
          { date: "2026-10-16", checkIn: "08:10 AM", checkOut: "09:32 AM", duration: "1h 22m", status: "Present" },
          { date: "2026-10-15", checkIn: "—", checkOut: "—", duration: "0m", status: "Leave Approved" }
        ]
      },
      examAttempts: [
        {
          attemptId: "att-1001",
          examId: "exam-adca-sem1",
          examTitle: "ADCA Semester 1: RGCSM Online Objective Assessment",
          submittedAt: "2026-09-28T10:45:00Z",
          totalScore: 84,
          totalPossibleMarks: 100,
          percentage: 84,
          grade: "A+ (Outstanding)",
          status: "Published",
          teacherFeedback: "Excellent understanding of computing fundamentals, Windows operating system, and MS Office utilities."
        }
      ]
    },
    {
      id: "SCE-2026-0002",
      studentId: "SCE-2026-0002",
      rgcsmEnrollmentNo: "RGCSM-UP-KHR-2026-0158",
      name: "Pooja Verma",
      email: "pooja.verma@example.com",
      phone: "090847 67670",
      dob: "2004-03-22",
      gender: "Female",
      address: "Taintigaon Tiraha, Opposite Central Bank, Khair, UP",
      courseId: "doap",
      courseCode: "R20111",
      courseName: "Diploma in Office Automation & Publishing (DOAP)",
      batch: "Morning (09:30 AM - 11:00 AM)",
      enrollmentDate: "2026-02-01",
      status: "active",
      password: "student123",
      avatar: "assets/images/faculty1.jpg",
      fees: {
        totalPayable: 14000, // Concession fee applied for SC candidate
        amountPaid: 14000,
        outstandingBalance: 0,
        status: "paid_in_full",
        installments: [
          { installmentNo: 1, amount: 7000, dueDate: "2026-02-01", status: "Paid", paidAt: "2026-02-01", receiptNo: "REC-KHR-182", paymentMode: "UPI / Bank QR" },
          { installmentNo: 2, amount: 7000, dueDate: "2026-03-01", status: "Paid", paidAt: "2026-02-28", receiptNo: "REC-KHR-274", paymentMode: "Online Transfer" }
        ]
      },
      attendance: {
        totalSessions: 38,
        sessionsAttended: 36,
        percentage: 94.7,
        today: {
          checkedIn: false,
          checkInTime: null,
          checkedOut: false,
          checkOutTime: null,
          status: "Not Checked In Yet"
        },
        logs: [
          { date: "2026-10-18", checkIn: "09:28 AM", checkOut: "11:00 AM", duration: "1h 32m", status: "Present" },
          { date: "2026-10-17", checkIn: "09:30 AM", checkOut: "11:02 AM", duration: "1h 32m", status: "Present" }
        ]
      },
      examAttempts: []
    }
  ],

  // Scheduled RGCSM On-Demand Online Assessments (50 Questions / 100 Marks per RGCSM rules)
  exams: [
    {
      id: "exam-adca-sem1",
      title: "RGCSM ADCA Semester-I On-Demand Examination",
      courseId: "adca",
      rgcsmCode: "R20118",
      courseName: "Advance Diploma in Computer Application (ADCA)",
      subject: "Computer Fundamentals, Operating Systems & MS Office Suite",
      batch: "Morning (08:00 AM - 09:30 AM)",
      scheduledStart: "2026-10-15 08:00 AM",
      scheduledEnd: "2026-11-15 05:00 PM",
      durationMinutes: 30, // Official RGCSM 30-minute exam
      totalMarks: 50,
      passMarks: 20, // 40% passing standard
      status: "active",
      createdByTeacherId: "tea-01",
      questions: [
        {
          id: "q-1",
          type: "mcq_single",
          statement: "Which component of the Central Processing Unit is responsible for coordinating the fetch, decode, and execute cycle of instructions?",
          options: ["Arithmetic Logic Unit (ALU)", "Control Unit (CU)", "Memory Data Register (MDR)", "Solid State Drive (SSD)"],
          correctOptionIndex: 1,
          marks: 5,
          explanation: "The Control Unit (CU) directs the operation of the processor and coordinates instructions."
        },
        {
          id: "q-2",
          type: "mcq_single",
          statement: "In MS Excel, which of the following formulas correctly calculates the arithmetic mean of cells C1 through C15?",
          options: ["=SUM(C1:C15)/COUNT", "=AVERAGE(C1:C15)", "=MEAN(C1:C15)", "=AGGREGATE_AVG(C1:C15)"],
          correctOptionIndex: 1,
          marks: 5,
          explanation: "The standard Excel function to compute arithmetic mean is =AVERAGE(range)."
        },
        {
          id: "q-3",
          type: "true_false",
          statement: "True or False: RAM is volatile primary memory that loses its stored contents when electrical power is switched off.",
          options: ["True", "False"],
          correctOptionIndex: 0,
          marks: 5,
          explanation: "RAM requires continuous electrical power to maintain its stored data, making it volatile."
        },
        {
          id: "q-4",
          type: "mcq_multiple",
          statement: "Which of the following are valid Internet Protocol addressing versions recognized globally? (Select all that apply)",
          options: ["IPv4: 32-bit dotted-decimal notation", "IPv6: 128-bit hexadecimal notation", "IPv5: 64-bit binary sequence", "MAC: 48-bit hardware address"],
          correctOptionIndices: [0, 1],
          marks: 5,
          explanation: "IPv4 (32-bit) and IPv6 (128-bit) are the two universally recognized internet protocols."
        },
        {
          id: "q-5",
          type: "short_answer",
          statement: "What keyboard shortcut is universally used in Microsoft Word to open the 'Find and Replace' dialog?",
          acceptableKeywords: ["ctrl+h", "ctrl + h", "control + h"],
          marks: 5,
          explanation: "Ctrl + H directly triggers the Replace tab of Find and Replace in Microsoft Word."
        },
        {
          id: "q-6",
          type: "descriptive",
          statement: "Explain the functional difference between System Software (e.g., Windows OS) and Application Software (e.g., Tally Prime, MS Word).",
          maxMarks: 15,
          modelAnswer: "System software manages hardware operations and serves as an execution platform for application software. Application software performs specific user tasks like bookkeeping or word authoring.",
          studentAnswers: {
            "SCE-2026-0001": {
              answerText: "System software controls basic hardware operations and computer resources, like Windows 11. Application software is used by users for specific tasks, like Tally Prime for accounting and MS Word for documents.",
              graded: true,
              awardedMarks: 14,
              feedback: "Accurate definitions and practical examples provided."
            }
          }
        },
        {
          id: "q-7",
          type: "descriptive",
          statement: "Explain the importance of GST E-Way Bill in computerized business accounting.",
          maxMarks: 10,
          modelAnswer: "An E-Way Bill is an electronic document generated under GST for movement of goods exceeding ₹50,000 value, verifying that applicable tax has been officially recorded.",
          studentAnswers: {}
        }
      ]
    },
    {
      id: "exam-tally-eval",
      title: "RGCSM Tally Prime & GST Practical Test",
      courseId: "tally-gst",
      rgcsmCode: "R10607",
      courseName: "Professional Course in Tally (Tally Prime with GST)",
      subject: "Computerized Accounting & Taxation",
      batch: "Morning (10:00 AM - 11:30 AM)",
      scheduledStart: "2026-10-18 09:00 AM",
      scheduledEnd: "2026-11-20 05:00 PM",
      durationMinutes: 30,
      totalMarks: 40,
      passMarks: 16, // 40% passing standard
      status: "active",
      createdByTeacherId: "tea-02",
      questions: [
        {
          id: "tq-1",
          type: "mcq_single",
          statement: "Which shortcut function key is used in Tally Prime to record an internal cash-to-bank transfer (Contra Voucher)?",
          options: ["F4", "F5", "F6", "F7"],
          correctOptionIndex: 0,
          marks: 10,
          explanation: "F4 is the Contra voucher key in Tally Prime for cash-bank internal transfers."
        },
        {
          id: "tq-2",
          type: "descriptive",
          statement: "State the Three Golden Rules of Accounting with a real-life transaction example for each rule.",
          maxMarks: 30,
          modelAnswer: "Personal Account: Debit the receiver, Credit the giver. Real Account: Debit what comes in, Credit what goes out. Nominal Account: Debit all expenses/losses, Credit all incomes/gains.",
          studentAnswers: {}
        }
      ]
    }
  ],

  // Uploaded Question Papers (PDFs for offline reference & classroom revision)
  uploadedPapers: [
    {
      id: "qp-101",
      title: "RGCSM DOAP / ADCA Semester-I Sample Question Paper (PDF)",
      courseId: "doap",
      courseName: "DOAP / ADCA",
      subject: "Computer Concepts & MS Office Fundamentals",
      batch: "All Batches",
      uploadedBy: "Mr. Vivek Sharma",
      uploadDate: "2026-09-10",
      fileSize: "1.4 MB",
      type: "offline_paper",
      downloadCount: 112
    },
    {
      id: "qp-102",
      title: "Tally Prime with GST Practice Problem Set & Voucher Assignments (PDF)",
      courseId: "tally-gst",
      courseName: "Tally Prime with GST",
      subject: "Vouchers & Ledger Entry",
      batch: "Morning (10:00 AM - 11:30 AM)",
      uploadedBy: "Mr. Rakesh Chandra",
      uploadDate: "2026-10-02",
      fileSize: "920 KB",
      type: "practice_paper",
      downloadCount: 78
    }
  ],

  // Study Materials & Class Notes
  notes: [
    {
      id: "note-01",
      title: "RGCSM Computer Fundamentals & Office Productivity Handbook",
      courseId: "adca",
      courseName: "ADCA / DOAP / DCA",
      subject: "Computer Architecture & Windows GUI",
      batch: "All Batches",
      uploadedBy: "Mr. Vivek Sharma",
      uploadDate: "2026-09-15",
      fileSize: "2.3 MB",
      downloads: 168,
      summary: "Comprehensive handbook covering computer hardware components, binary logic, Windows 11 administration, file security, and MS Word/Excel essential shortcuts.",
      previewText: `SAURYA COMPUTER EDUCATION (KHAIR, ALIGARH) — RGCSM STUDY MATERIAL
Authorised Study Centre of Rajeev Gandhi Computer Saksharta Mission
Course: DOAP / ADCA / DCA | Faculty: Mr. Vivek Sharma

CHAPTER 1: COMPUTER GENERATIONS & HARDWARE ARTIFACTS
1. First Generation (1940-1956): Vacuum Tubes. High electricity consumption, large footprint.
2. Second Generation (1956-1963): Transistors. Smaller footprint, faster processing.
3. Third Generation (1964-1971): Integrated Circuits (ICs). Operating systems introduced.
4. Fourth Generation (1971-Present): Microprocessors (VLSI / ULSI). Personal computing era.

CHAPTER 2: MEMORY HIERARCHY & DATA STORAGE
- Registers: Internal CPU memory, sub-nanosecond access time.
- L1/L2/L3 Cache: High-speed SRAM buffering processor instructions.
- Primary RAM (DRAM): Volatile active working space for running programs.
- Non-Volatile ROM: Firmware instructions (BIOS / UEFI).
- Secondary Storage: NVMe/SATA Solid State Drives & Magnetic Hard Drives.`
    },
    {
      id: "note-02",
      title: "Tally Prime with GST: Voucher Key Reference & Journal Principles",
      courseId: "tally-gst",
      courseName: "Tally Prime with GST / DCAA",
      subject: "Commercial Accounting & GST Compliance",
      batch: "Morning (10:00 AM - 11:30 AM)",
      uploadedBy: "Mr. Rakesh Chandra",
      uploadDate: "2026-09-22",
      fileSize: "1.8 MB",
      downloads: 124,
      summary: "Official classroom reference sheet for voucher shortcuts (F4 to F9), GST calculation formulas, and Bank Reconciliation Statement workflow.",
      previewText: `SAURYA COMPUTER EDUCATION (KHAIR, ALIGARH) — ACCOUNTING WORKBOOK
Subject: Tally Prime & GST Invoicing Procedures | Faculty: Mr. Rakesh Chandra

FUNCTION KEY VOUCHER MATRIX:
F4 (Contra): Transfer between Cash and Bank accounts only.
F5 (Payment): Cash or Bank outflow for expenses or creditor clearance.
F6 (Receipt): Cash or Cheque inflow from debtors or revenue.
F7 (Journal): Non-cash adjustments, depreciation, asset purchases on credit.
F8 (Sales): Billing goods/services to customers with GST ledger mapping.
F9 (Purchase): Booking vendor bills for raw materials or trade inventory.

GST COMPUTATION PRINCIPLES:
- Intra-State (Within same State - UP): CGST (50%) + SGST (50%)
- Inter-State (Outside Uttar Pradesh): IGST (100%)`
    }
  ],

  // Admission Applications Queue
  applications: [
    {
      id: "APP-KHR-2026-0051",
      fullName: "Amitabh Srivastava",
      dob: "2002-11-05",
      gender: "Male",
      phone: "090847 67670",
      whatsapp: "+919084767670",
      email: "amitabh.khair@gmail.com",
      address: "Near Central Bank of India, Khair, Aligarh, UP",
      courseId: "doap",
      courseName: "Diploma in Office Automation & Publishing (DOAP)",
      preferredBatch: "Morning (08:00 AM - 09:30 AM)",
      qualification: "12th Pass (Intermediate)",
      source: "RGCSM Study Centre Visit",
      status: "new",
      submissionDate: "2026-10-18T14:20:00Z",
      internalNotes: "Candidate inquired about free kit bag and Tally with GST module. Telephonic verification scheduled."
    },
    {
      id: "APP-KHR-2026-0052",
      fullName: "Neha Sharma",
      dob: "2004-05-18",
      gender: "Female",
      phone: "090847 67670",
      whatsapp: "+919084767670",
      email: "neha.sharma.khair@outlook.com",
      address: "KIC Road, Khair, Aligarh, UP",
      courseId: "adca",
      courseName: "Advance Diploma in Computer Application (ADCA)",
      preferredBatch: "Mid-Day (10:30 AM - 12:00 PM)",
      qualification: "Graduation (B.A.)",
      source: "Official Website",
      status: "contacted",
      submissionDate: "2026-10-17T11:05:00Z",
      internalNotes: "Counselor confirmed batch seat availability for upcoming session."
    }
  ],

  // System Audit Logs
  auditLogs: [
    {
      id: "aud-01",
      timestamp: "2026-10-19T08:02:14Z",
      actor: "Student: Rahul Sharma (SCE-2026-0001)",
      action: "ATTENDANCE_CHECK_IN",
      details: "Recorded arrival check-in at 08:02 AM for Batch Morning (ADCA). Terminal validated.",
      severity: "info"
    },
    {
      id: "aud-02",
      timestamp: "2026-10-18T16:40:10Z",
      actor: "Teacher: Mr. Vivek Sharma",
      action: "EXAM_GRADE_SUBMITTED",
      details: "Graded descriptive question q-6 for student SCE-2026-0001. Awarded 14/15 marks.",
      severity: "info"
    },
    {
      id: "aud-03",
      timestamp: "2026-10-17T11:20:00Z",
      actor: "Admin: Mr. Navneet Bhardwaj & Mr. Saurabh Bhardwaj",
      action: "FEE_PAYMENT_VERIFIED",
      details: "Manual fee payment ₹4,000 verified for student SCE-2026-0001. Receipt #REC-KHR-329.",
      severity: "financial"
    },
    {
      id: "aud-04",
      timestamp: "2026-10-15T09:10:00Z",
      actor: "Admin: Mr. Navneet Bhardwaj & Mr. Saurabh Bhardwaj",
      action: "STUDENT_ENROLLED",
      details: "Approved application APP-KHR-2026-0050. Activated RGCSM student account SCE-2026-0001.",
      severity: "security"
    }
  ],

  // Verified Institutional FAQs (Image 2, 3, 4, 5)
  faqs: [
    {
      q: "What is Saurya Computer Education's affiliation and registration status?",
      a: "Saurya Computer Education in Khair is an Authorised Study Centre and franchise of Rajeev Gandhi Computer Saksharta Mission (RGCSM). RGCSM is an autonomous national organization registered under the Societies & Public Trust Act 1860, ISO 9001:2015 certified, and registered under the C.R. Act of Ministry of HRD (Dept. of Secondary & Higher Education), Govt. of India. Our center is located at Taintigaon Tiraha, near KIC (Kedar Inter College), opposite Central Bank in Khair, Aligarh, Uttar Pradesh."
    },
    {
      q: "How does the admission registration process work (Offline vs Online)?",
      a: "Students can register in two ways:\n1. Offline Registration: Visit our center near KIC, fill the application form, and submit 2 recent passport-size photos, attested copies of your educational qualification, and caste certificate (if applying for SC/ST fee relaxation). An RGCSM Student ID card will be issued.\n2. Online Registration: You can apply online through this website. Our Center Director submits the candidate details through the RGCSM center portal, generating an official enrollment number used by RGCSM Head Office to issue your study kit, ID card, marksheets, and diploma certificates."
    },
    {
      q: "Are course materials and kit bags provided with admissions?",
      a: "Yes! As an authorized RGCSM center, free of cost written course material, an official student kit bag, and notebook are provided to all enrolled students for theory classes and lab revision."
    },
    {
      q: "What are the fee structures and concessions available for students?",
      a: "Our course fee structure is transparent:\n• 1-Year Flagship Diplomas (DOAP - Code R20111, ADCA - Code R20118): ₹15,000 for General Candidates, with a special fee concession of ₹14,000 for SC/ST/Handicapped candidates.\n• 6-Month Diploma (DCA - Code R10104): ₹8,000 for General Candidates, and ₹7,500 for SC/ST/Handicapped candidates.\n• DCAA (Diploma in Computer Application & Accounting): ₹9,000.\n• Tally Prime with GST: ₹5,500.\n• RG-CIT / CCOAI (CCC): ₹3,500.\n• Python Programming: ₹6,500.\nFlexible installment plans are available for all diploma courses."
    },
    {
      q: "What is the examination procedure and qualifying criteria?",
      a: "RGCSM conducts an On-Demand Online Examination at our authorized study centre in Khair. The examination format includes:\n• Theory: Objective type questions (50 MCQs per module, 2 marks per question = 100 marks total per paper, 30 minutes duration).\n• Practical Exam: Total 100 Marks (60 Marks for Lab Practice + 40 Marks for Viva Voce).\n• Passing Standard: Minimum qualifying mark is 40% in theory and practical."
    },
    {
      q: "How does the RGCSM grading system work?",
      a: "Grades are awarded based on total percentage obtained:\n• >= 80%: Grade A+ (Distinction)\n• 70% to < 80%: Grade A\n• 60% to < 70%: Grade B+\n• 50% to < 60%: Grade B\n• 40% to < 50%: Grade C (Pass)\nCandidates securing below 40% can appear in re-examination."
    },
    {
      q: "Are RGCSM diploma certificates valid for government employment exchanges?",
      a: "Yes. Certificates and Diplomas awarded by Rajeev Gandhi Computer Saksharta Mission are valid for registration in Employment Exchanges all over India. Marksheets and certificates are issued within 30 days of online examination and can be verified online under the 'Student Section' at www.rgcsm.org."
    },
    {
      q: "What is the center's location, contact helpline, and operating hours?",
      a: "Our center is located at: Taintigaon Tiraha, Near KIC (Kedar Inter College), Opposite Central Bank, Khair, Aligarh, Uttar Pradesh 202138.\nHelpline: 090847 67670 / +91 90847 67670\nOperating Hours: Monday to Saturday from 8:00 AM to 5:00 PM (Closed on Sundays). We hold an active Google Review rating of 4.7★ across 63+ verified reviews."
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.INITIAL_DATA = INITIAL_DATA;
}
