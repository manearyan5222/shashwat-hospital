const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const docsDir = __dirname;
const logoPath = path.join(docsDir, 'dbit_logo.jpg');
const logoBase64 = fs.existsSync(logoPath) ? fs.readFileSync(logoPath).toString('base64') : '';
const logoDataUri = logoBase64 ? `data:image/jpeg;base64,${logoBase64}` : '';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CampusConnect - Mini Project Report</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 18mm 20mm 18mm;
      @bottom-right {
        content: counter(page);
      }
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 11.5pt;
      line-height: 1.45;
      color: #111827;
      margin: 0;
      padding: 0;
    }
    .page-break {
      page-break-after: always;
      break-after: page;
    }
    .no-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }
    h1, h2, h3, h4 {
      font-family: 'Times New Roman', Times, serif;
      color: #0f172a;
      margin-top: 1.2rem;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    h1 { font-size: 16pt; text-align: left; border-bottom: 2px solid #0f172a; padding-bottom: 4px; }
    h2 { font-size: 13.5pt; }
    h3 { font-size: 12pt; }
    p {
      margin-top: 0.35rem;
      margin-bottom: 0.65rem;
      text-align: justify;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 0.8rem 0 1.2rem 0;
      font-size: 10.5pt;
      page-break-inside: avoid;
    }
    th, td {
      border: 1px solid #334155;
      padding: 6px 10px;
      text-align: left;
      vertical-align: middle;
    }
    th {
      background-color: #f1f5f9;
      font-weight: bold;
      color: #0f172a;
    }
    pre, code {
      font-family: 'Consolas', 'Courier New', monospace;
    }
    pre {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 10px 12px;
      font-size: 9pt;
      line-height: 1.35;
      white-space: pre-wrap;
      word-wrap: break-word;
      margin: 0.6rem 0 1rem 0;
      page-break-inside: avoid;
    }
    .cover-header-table {
      width: 100%;
      border: 2px solid #1e293b;
      margin-bottom: 2rem;
    }
    .cover-header-table td {
      border: none;
      padding: 12px 16px;
    }
    .inst-title {
      font-size: 14pt;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0;
      color: #0f172a;
      text-align: center;
    }
    .inst-subtitle {
      font-size: 11pt;
      text-align: center;
      margin: 2px 0;
      color: #334155;
    }
    .project-title-box {
      text-align: center;
      margin: 2.2rem 0 1.8rem 0;
    }
    .project-report-tag {
      font-size: 13pt;
      font-weight: bold;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #475569;
      margin-bottom: 0.75rem;
    }
    .project-main-title {
      font-size: 20pt;
      font-weight: bold;
      color: #0f172a;
      line-height: 1.25;
      margin: 0.5rem 0;
    }
    .submission-text {
      text-align: center;
      font-size: 11pt;
      margin: 1.5rem 0 1.2rem 0;
      font-style: italic;
    }
    .signature-container {
      display: flex;
      justify-content: space-between;
      margin-top: 3.5rem;
      page-break-inside: avoid;
    }
    .sig-block {
      text-align: center;
      width: 30%;
    }
    .sig-line {
      border-top: 1px solid #111827;
      margin-bottom: 6px;
      padding-top: 4px;
      font-weight: bold;
    }
    .diagram-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 10px;
      border-radius: 4px;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 8.5pt;
      line-height: 1.25;
      margin: 0.6rem 0;
      white-space: pre;
      overflow: hidden;
      page-break-inside: avoid;
    }
    .figure-caption {
      text-align: center;
      font-style: italic;
      font-size: 10pt;
      margin-top: 4px;
      margin-bottom: 14px;
      color: #334155;
    }
  </style>
</head>
<body>

  <!-- ==================== COVER PAGE ==================== -->
  <div class="page-break">
    <table class="cover-header-table">
      <tr>
        <td style="width: 110px; text-align: center; vertical-align: middle;">
          ${logoDataUri ? `<img src="${logoDataUri}" alt="DBIT Logo" style="width: 95px; height: auto;" />` : ''}
        </td>
        <td style="vertical-align: middle;">
          <div class="inst-title">Don Bosco Institute of Technology</div>
          <div class="inst-subtitle">Premier Automobiles Road, Kurla (W), Mumbai – 400 070</div>
          <div class="inst-subtitle" style="font-weight: bold;">Department of Computer Engineering</div>
          <div class="inst-subtitle" style="font-weight: bold; color: #1e3a8a;">Academic Year 2026 – 27</div>
        </td>
      </tr>
    </table>

    <div class="project-title-box">
      <div class="project-report-tag">MINI PROJECT REPORT</div>
      <div class="project-main-title">CampusConnect</div>
      <div style="font-size: 14pt; font-weight: 600; color: #334155; margin-top: 4px;">
        A Student, Course, and Placement Management Portal
      </div>
    </div>

    <div class="submission-text">
      Submitted in partial fulfillment of the requirements for the course<br>
      <strong style="font-size: 12pt; color: #0f172a; font-style: normal;">25SE3VSEC01 Full Stack Java Programming Course</strong>
    </div>

    <div style="margin: 1.5rem 0;">
      <div style="font-weight: bold; margin-bottom: 6px; text-transform: uppercase; font-size: 10.5pt; text-align: center;">
        Submitted by:
      </div>
      <table style="width: 85%; margin: 0 auto;">
        <thead>
          <tr>
            <th style="text-align: left;">Name of Student</th>
            <th style="text-align: center; width: 100px;">Roll No.</th>
            <th style="text-align: center; width: 150px;">Class / Div</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Aryan Mane</strong></td>
            <td style="text-align: center;">59</td>
            <td style="text-align: center;">SE Comps A (Batch C)</td>
          </tr>
          <tr>
            <td><strong>Ramlal Kumavat</strong></td>
            <td style="text-align: center;">46</td>
            <td style="text-align: center;">SE Comps A (Batch C)</td>
          </tr>
          <tr>
            <td><strong>Shubham Shahu</strong></td>
            <td style="text-align: center;">50</td>
            <td style="text-align: center;">SE Comps A (Batch C)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="text-align: center; margin-top: 2rem;">
      <div style="font-size: 11pt; color: #475569;">Under the guidance of</div>
      <div style="font-size: 13pt; font-weight: bold; color: #0f172a; margin-top: 4px;">Prof. Nilakshi J.</div>
      <div style="font-size: 10.5pt; color: #475569;">Department of Computer Engineering</div>
    </div>

    <div style="text-align: center; margin-top: 2.5rem; font-weight: bold; font-size: 12pt;">
      November, 2026
    </div>
  </div>

  <!-- ==================== CERTIFICATE ==================== -->
  <div class="page-break">
    <h1 style="text-align: center; border-bottom: none; margin-bottom: 2rem;">Certificate</h1>
    
    <p style="font-size: 12pt; line-height: 1.8; text-indent: 2rem;">
      This is to certify that the students named on the cover page — <strong>Aryan Mane (Roll No. 59)</strong>, 
      <strong>Ramlal Kumavat (Roll No. 46)</strong>, and <strong>Shubham Shahu (Roll No. 50)</strong> of 
      <strong>SE Computer Engineering (Division A, Batch C)</strong> — have satisfactorily completed the mini project 
      entitled <strong>“CampusConnect — Student, Course, and Placement Management Portal”</strong> under my guidance, 
      as part of the <strong>25SE3VSEC01 Full Stack Java Programming</strong> course, Department of Computer Engineering, 
      Don Bosco Institute of Technology, during the Academic Year <strong>2026–27</strong>.
    </p>

    <div style="margin-top: 6rem;">
      <table>
        <tr style="height: 90px; vertical-align: bottom;">
          <td style="width: 33.3%; text-align: center; border: none;">
            <div style="border-top: 1px solid #111827; width: 80%; margin: 0 auto; padding-top: 6px;">
              <strong>Prof. Nilakshi J.</strong><br>
              Internal Guide
            </div>
          </td>
          <td style="width: 33.3%; text-align: center; border: none;">
            <div style="border-top: 1px solid #111827; width: 80%; margin: 0 auto; padding-top: 6px;">
              <strong>Dr. Phiroj Shaikh</strong><br>
              Head of Department
            </div>
          </td>
          <td style="width: 33.3%; text-align: center; border: none;">
            <div style="border-top: 1px solid #111827; width: 80%; margin: 0 auto; padding-top: 6px;">
              <strong>External Examiner</strong><br>
              DBIT Mumbai
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <!-- ==================== DECLARATION ==================== -->
  <div class="page-break">
    <h1 style="text-align: center; border-bottom: none; margin-bottom: 2rem;">Declaration</h1>

    <p style="font-size: 12pt; line-height: 1.8; text-indent: 2rem;">
      We declare that this report entitled <strong>“CampusConnect — Student, Course, and Placement Management Portal”</strong> 
      is our own genuine work carried out under the academic supervision of <strong>Prof. Nilakshi J.</strong> All sources 
      and literature referenced have been appropriately cited, and any use of generative artificial intelligence tools has 
      been transparently disclosed in Chapter 5. We fully understand that academic plagiarism will result in zero marks.
    </p>

    <div style="margin-top: 5rem;">
      <table>
        <tr style="height: 80px; vertical-align: bottom;">
          <td style="width: 33.3%; text-align: center; border: none;">
            <div style="border-top: 1px solid #111827; width: 85%; margin: 0 auto; padding-top: 6px;">
              <strong>Aryan Mane</strong><br>
              Roll No. 59
            </div>
          </td>
          <td style="width: 33.3%; text-align: center; border: none;">
            <div style="border-top: 1px solid #111827; width: 85%; margin: 0 auto; padding-top: 6px;">
              <strong>Ramlal Kumavat</strong><br>
              Roll No. 46
            </div>
          </td>
          <td style="width: 33.3%; text-align: center; border: none;">
            <div style="border-top: 1px solid #111827; width: 85%; margin: 0 auto; padding-top: 6px;">
              <strong>Shubham Shahu</strong><br>
              Roll No. 50
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 3.5rem; font-size: 11pt;">
      <p><strong>Date:</strong> 04/11/2026</p>
      <p><strong>Place:</strong> Mumbai</p>
    </div>
  </div>

  <!-- ==================== ABSTRACT ==================== -->
  <div class="page-break">
    <h1 style="text-align: center; border-bottom: none; margin-bottom: 1.5rem;">Abstract</h1>

    <p style="font-size: 11.5pt; line-height: 1.7; text-align: justify; text-indent: 2rem;">
      Collegiate academic institutions often face operational friction due to fragmented record-keeping across student rosters, 
      course registrations, and corporate placement drives. <strong>CampusConnect</strong> is an integrated full-stack web application 
      engineered to centralize academic workflows, enrollment tracking, and recruitment operations into a single platform. The system 
      is designed with a decoupled architecture featuring a modern <strong>React 18</strong> Single Page Application (SPA) on the frontend 
      and an enterprise-grade <strong>Spring Boot 3.3.5</strong> RESTful backend running on <strong>Java 17</strong>.
    </p>
    <p style="font-size: 11.5pt; line-height: 1.7; text-align: justify; text-indent: 2rem;">
      Persistence is orchestrated via <strong>Spring Data JPA</strong> with an enterprise <strong>MySQL 8.0</strong> relational schema, 
      alongside an optimized, low-level <strong>JDBC API</strong> analytical reporting engine and an in-memory <strong>H2</strong> 
      database fallback profile for zero-configuration deployments. The system incorporates role-based access control (RBAC) via 
      <strong>Spring Security</strong> and stateless <strong>JSON Web Tokens (JWT)</strong>, supplemented by Aspect-Oriented Programming 
      (<strong>AOP</strong>) for execution logging. Furthermore, a parallel legacy module utilizing <strong>Java Servlets, JSP, and JSTL</strong> 
      demonstrates classical Model-View-Controller (MVC) server-side rendering. The completed portal delivers automated validation, dynamic 
      FLUX-based state management, sub-second query execution, and a self-contained in-memory demonstration mode deployed live on Vercel.
    </p>

    <div style="margin-top: 2rem;">
      <p><strong>Keywords:</strong> Spring Boot, React 18, Full-Stack Java, Spring Data JPA, Raw JDBC, JWT Authentication, MVC Architecture.</p>
    </div>
  </div>

  <!-- ==================== COURSE OUTCOMES ==================== -->
  <div class="page-break">
    <h1 style="text-align: center; border-bottom: none; margin-bottom: 1.5rem;">Course Outcomes Addressed</h1>

    <p>
      On completing this mini project, students will be able to demonstrate the following course outcomes. 
      The last column shows where in this report the evidence for each outcome must appear.
    </p>

    <table>
      <thead>
        <tr>
          <th style="width: 12%;">CO</th>
          <th style="width: 48%;">Course Outcome</th>
          <th style="width: 18%;">Bloom’s Level</th>
          <th style="width: 22%;">Evidence in Report</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>CO3</strong></td>
          <td>Implement backend and front-end components correctly</td>
          <td>L3 – Apply</td>
          <td>Ch. 3 (3.3, 3.4), Ch. 4 (4.1, 4.2)</td>
        </tr>
        <tr>
          <td><strong>CO4</strong></td>
          <td>Identify and fix runtime errors; handle exceptions across layers</td>
          <td>L4 – Analyze</td>
          <td>Ch. 4 (4.3, 4.4, 4.5)</td>
        </tr>
        <tr>
          <td><strong>CO5</strong></td>
          <td>Evaluate design choices for scalability and maintainability</td>
          <td>L5 – Evaluate</td>
          <td>Ch. 3 (3.5)</td>
        </tr>
        <tr>
          <td><strong>CO6</strong></td>
          <td>Design and integrate a complete full-stack solution</td>
          <td>L6 – Create</td>
          <td>Ch. 3 (3.1, 3.2), Ch. 4 (4.1), Ch. 6 (6.1), live demo</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== CONTENTS ==================== -->
  <div class="page-break">
    <h1 style="text-align: center; border-bottom: none; margin-bottom: 1.5rem;">Contents</h1>

    <table style="border: none;">
      <tbody>
        <tr style="border: none;"><td style="border: none;"><strong>Certificate</strong></td><td style="border: none; text-align: right;"><strong>2</strong></td></tr>
        <tr style="border: none;"><td style="border: none;"><strong>Declaration</strong></td><td style="border: none; text-align: right;"><strong>3</strong></td></tr>
        <tr style="border: none;"><td style="border: none;"><strong>Abstract</strong></td><td style="border: none; text-align: right;"><strong>4</strong></td></tr>
        <tr style="border: none;"><td style="border: none;"><strong>Course Outcomes Addressed</strong></td><td style="border: none; text-align: right;"><strong>5</strong></td></tr>
        <tr style="border: none;"><td style="border: none; padding-top: 10px;"><strong>Chapter 1: Introduction</strong></td><td style="border: none; text-align: right; padding-top: 10px;"><strong>7</strong></td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">1.1 Problem Statement</td><td style="border: none; text-align: right;">7</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">1.2 Objectives</td><td style="border: none; text-align: right;">7</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">1.3 Technology Stack</td><td style="border: none; text-align: right;">7</td></tr>
        <tr style="border: none;"><td style="border: none; padding-top: 10px;"><strong>Chapter 2: Requirements</strong></td><td style="border: none; text-align: right; padding-top: 10px;"><strong>8</strong></td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">2.1 Users and Functional Requirements</td><td style="border: none; text-align: right;">8</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">2.2 Non-Functional Requirements</td><td style="border: none; text-align: right;">8</td></tr>
        <tr style="border: none;"><td style="border: none; padding-top: 10px;"><strong>Chapter 3: Design</strong></td><td style="border: none; text-align: right; padding-top: 10px;"><strong>9</strong></td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">3.1 System Architecture</td><td style="border: none; text-align: right;">9</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">3.2 ER Diagram</td><td style="border: none; text-align: right;">10</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">3.3 Database Tables</td><td style="border: none; text-align: right;">10</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">3.4 API / Servlet List</td><td style="border: none; text-align: right;">11</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">3.5 Design Choices: Scalability and Maintainability (CO5)</td><td style="border: none; text-align: right;">11</td></tr>
        <tr style="border: none;"><td style="border: none; padding-top: 10px;"><strong>Chapter 4: Implementation and Testing</strong></td><td style="border: none; text-align: right; padding-top: 10px;"><strong>12</strong></td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">4.1 How the Modules Work</td><td style="border: none; text-align: right;">12</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">4.2 Screenshots & CRUD Demonstration</td><td style="border: none; text-align: right;">14</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">4.3 Test Cases</td><td style="border: none; text-align: right;">14</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">4.4 Runtime Errors Faced and Fixed (CO4)</td><td style="border: none; text-align: right;">15</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">4.5 Exception Handling Across Layers (CO4)</td><td style="border: none; text-align: right;">15</td></tr>
        <tr style="border: none;"><td style="border: none; padding-top: 10px;"><strong>Chapter 5: AI Tools Used (Disclosure)</strong></td><td style="border: none; text-align: right; padding-top: 10px;"><strong>16</strong></td></tr>
        <tr style="border: none;"><td style="border: none; padding-top: 10px;"><strong>Chapter 6: Conclusion and References</strong></td><td style="border: none; text-align: right; padding-top: 10px;"><strong>17</strong></td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">6.1 Conclusion and Future Scope</td><td style="border: none; text-align: right;">17</td></tr>
        <tr style="border: none;"><td style="border: none; padding-left: 20px;">6.2 References</td><td style="border: none; text-align: right;">17</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== CHAPTER 1 ==================== -->
  <div class="page-break">
    <h1>Chapter 1: Introduction</h1>
    <p style="font-size: 10pt; color: #475569; margin-top: -4px;">Course outcomes addressed: CO6 (problem definition and scope)</p>

    <h2>1.1 Problem Statement</h2>
    <p>
      Educational institutions frequently suffer from data silos where student personal profiles, departmental course enrollments, 
      and corporate recruitment drives are handled using disjointed spreadsheets or standalone legacy systems. This lack of integration 
      leads to administrative overhead, scheduling conflicts, enrollment discrepancies, and missed recruitment eligibility deadlines for 
      final-year students. <strong>CampusConnect</strong> resolves these operational inefficiencies by providing a centralized, role-authenticated, 
      full-stack campus management portal that unifies student lifecycle records, dynamic course catalogs, and corporate placement tracking 
      into a singular, responsive application.
    </p>

    <h2>1.2 Objectives</h2>
    <ul>
      <li><strong>To develop a secure, role-based backend:</strong> Engineer a Spring Boot REST API providing authentication (JWT), authorization (Student, Faculty, Admin), and full CRUD operations for students, courses, and placements.</li>
      <li><strong>To implement dual persistence architectures:</strong> Integrate Spring Data JPA / Hibernate for business domain entities while embedding a distinct, low-level JDBC API reporting engine to demonstrate comparative query performance and complex relational aggregations.</li>
      <li><strong>To build a responsive, modular user interface:</strong> Construct a reusable React 18 frontend leveraging unidirectional data flow, declarative UI hooks (<code>useState</code>, <code>useEffect</code>), client-side routing, and an educational FLUX architecture demonstration.</li>
      <li><strong>To demonstrate legacy Java enterprise patterns:</strong> Implement an independent, runnable module utilizing HttpServlet (<code>doGet</code>, <code>doPost</code>), JavaServer Pages (JSP), JSTL tag libraries, and <code>HttpSession</code> management on an embedded Apache Tomcat 10 container.</li>
    </ul>

    <h2>1.3 Technology Stack</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 30%;">Layer</th>
          <th style="width: 70%;">Technology Used</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Front end</strong></td>
          <td>React 18, JavaScript (ES6+), JSX, Vite 5, React Router DOM 6, Custom Responsive CSS3</td>
        </tr>
        <tr>
          <td><strong>Backend</strong></td>
          <td>Java 17, Spring Boot 3.3.5, Spring MVC, Spring Security (JWT + BCrypt), Spring AOP</td>
        </tr>
        <tr>
          <td><strong>Database (MySQL)</strong></td>
          <td>MySQL 8.0 InnoDB (Primary), H2 Database (In-Memory Fallback), Oracle 19c (Documented Dialect)</td>
        </tr>
        <tr>
          <td><strong>Legacy Web Module</strong></td>
          <td>Jakarta Servlet API 6.0, JSP 3.1, JSTL 3.0, Embedded Apache Tomcat 10.1</td>
        </tr>
        <tr>
          <td><strong>Tools (IDE, Git, Postman)</strong></td>
          <td>VS Code / IntelliJ IDEA, Git & GitHub, Apache Maven 3.9, Postman, Vercel CLI</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== CHAPTER 2 ==================== -->
  <div class="page-break">
    <h1>Chapter 2: Requirements</h1>

    <h2>2.1 Users and Functional Requirements</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 15%;">ID</th>
          <th style="width: 60%;">Requirement</th>
          <th style="width: 25%;">User Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>FR-01</strong></td>
          <td>Secure login and registration using hashed credentials; issuance of role-specific JWT tokens.</td>
          <td>All Users (Student, Faculty, Admin)</td>
        </tr>
        <tr>
          <td><strong>FR-02</strong></td>
          <td>View dynamic dashboard summaries with metrics (total students, active courses, placements).</td>
          <td>All Users</td>
        </tr>
        <tr>
          <td><strong>FR-03</strong></td>
          <td>Manage student profiles with search, filter (department, year, status), and pagination.</td>
          <td>Administrator, Faculty</td>
        </tr>
        <tr>
          <td><strong>FR-04</strong></td>
          <td>Create, update, search, and delete course offerings and manage maximum capacity limits.</td>
          <td>Administrator, Faculty</td>
        </tr>
        <tr>
          <td><strong>FR-05</strong></td>
          <td>Enroll students into courses, view assigned rosters, and grade completed enrollments.</td>
          <td>Student (Enroll), Faculty / Admin (Grade)</td>
        </tr>
        <tr>
          <td><strong>FR-06</strong></td>
          <td>Post corporate placement opportunities, verify minimum GPA eligibility, and apply for drives.</td>
          <td>Admin (Create/Post), Student (Apply)</td>
        </tr>
        <tr>
          <td><strong>FR-07</strong></td>
          <td>Generate real-time department analytics and salary metrics using direct JDBC queries.</td>
          <td>Administrator, Faculty</td>
        </tr>
        <tr>
          <td><strong>FR-08</strong></td>
          <td>Access standalone, in-memory client simulation mode when operating without a live backend.</td>
          <td>Public Guest, Demo Evaluators</td>
        </tr>
      </tbody>
    </table>

    <h2>2.2 Non-Functional Requirements</h2>
    <p>
      <strong>Security:</strong> Strict password hashing utilizing BCrypt (12 work rounds), stateless Bearer JWT token verification on secured endpoints, CORS origin restriction, and SQL injection prevention via PreparedStatements and Parameterized JPA queries.<br>
      <strong>Performance:</strong> Sub-100 millisecond response times on paginated API endpoints, optimized database indexing on foreign keys, connection pooling via HikariCP, and lightweight frontend bundle size (&lt; 290 kB gzip).<br>
      <strong>Usability:</strong> Fully responsive layout functioning seamlessly across mobile (375px), tablet (768px), and desktop (1280px+) screens, with explicit loading spinners, empty state illustrations, and accessible form validations.
    </p>
  </div>

  <!-- ==================== CHAPTER 3 ==================== -->
  <div class="page-break">
    <h1>Chapter 3: Design</h1>
    <p style="font-size: 10pt; color: #475569; margin-top: -4px;">Course outcomes addressed: CO3, CO5, CO6</p>

    <h2>3.1 System Architecture</h2>
    <div class="diagram-box">
+---------------------------------------------------------------------------------------+
|                                    CLIENT LAYER                                       |
|  +---------------------------------------------------------------------------------+  |
|  |                 React 18 SPA (Vite Bundler / Vercel Cloud Hosting)              |  |
|  |  [Dashboard] [Student Roster] [Course Catalog] [Enrollments] [Placement Portal]  |  |
|  |     |                       |                            |                      |  |
|  |     +----------> Central HTTP API Service Layer (api.js) <-------+              |  |
|  |                  (JWT Bearer Injection / Demo Mode Store)                       |  |
|  +---------------------------------------------------------------------------------+  |
+-------------------------------------------|-------------------------------------------+
                                            | JSON / HTTPS (REST)
+-------------------------------------------v-------------------------------------------+
|                                  APPLICATION BACKEND                                  |
|  +---------------------------------------------------------------------------------+  |
|  |         Spring Boot 3.3.5 Server (Embedded Apache Tomcat Container, Port 8080)   |  |
|  |                                                                                 |  |
|  |  +---------------------------------------------------------------------------+  |  |
|  |  | Security & Filter: JwtAuthenticationFilter -> SecurityFilterChain (BCrypt) |  |  |
|  |  +---------------------------------------------------------------------------+  |  |
|  |  | AOP Cross-Cutting Layer: LoggingAspect (@Before, @Around execution timer)  |  |  |
|  |  +---------------------------------------------------------------------------+  |  |
|  |  | REST Controllers: AuthController | StudentController | PlacementController   |  |  |
|  |  +---------------------------------------------------------------------------+  |  |
|  |  | Business Service Layer: StudentService | EnrollmentService | PlacementService |  |  |
|  |  +---------------------------------------------------------------------------+  |  |
|  |  | Data Persistence Layer:                                                    |  |  |
|  |  |   [Spring Data JPA Repositories]      |      [Low-Level Raw JDBC Engine]  |  |  |
|  |  |   (Hibernate 6.5 ORM Domain Entity)   |      (DriverManager / Connection) |  |  |
|  |  +---------------------------------------------------------------------------+  |  |
|  +---------------------------------------------------------------------------------+  |
+-------------------------------------------|-------------------------------------------+
                                            | SQL Queries / HikariCP Pool
+-------------------------------------------v-------------------------------------------+
|                                    DATABASE LAYER                                     |
|     +-------------------------+                     +---------------------------+     |
|     |  MySQL 8.0 InnoDB Engine| <--- Default / Dev  |  H2 Database (In-Memory)  |     |
|     |  (Primary Relational DB)|      Profile        |  (Fallback / Cloud Demo)  |     |
|     +-------------------------+                     +---------------------------+     |
+---------------------------------------------------------------------------------------+
    </div>
    <div class="figure-caption">Fig. 3.1: System architecture (front end → backend → database)</div>

    <h2>3.2 ER Diagram</h2>
    <div class="diagram-box">
 +--------------------+               +--------------------+
 |       USERS        | 1           1 |      STUDENTS      |
 |--------------------|<------------->|--------------------|
 | PK  id             |               | PK  id             |
 |     username (UQ)  |               | FK  user_id (UQ)   |
 |     password_hash  |               |     student_id (UQ)|
 |     role           |               |     first_name     |
 |     email (UQ)     |               |     last_name      |
 +--------------------+               |     department     |
                                      |     gpa            |
                                      +--------------------+
                                           | 1          | 1
                                           |            |
                                           | N          | N
                                           v            v
 +--------------------+ 1          N  +------------+   +-----------------------+
 |      COURSES       |<------------->| ENROLLMENTS|   | PLACEMENT_APPLICATIONS|
 |--------------------|               |------------|   |-----------------------|
 | PK  id             |               | PK  id     |   | PK  id                |
 |     course_code(UQ)|               | FK  stu_id |   | FK  student_id        |
 |     course_name    |               | FK  crs_id |   | FK  opportunity_id    |
 |     credits        |               |     grade  |   |     status            |
 |     department     |               |     status |   |     applied_date      |
 +--------------------+               +------------+   +-----------------------+
                                                            ^
                                                            | N
                                                            |
                                                            | 1
                                                       +-----------------------+
                                                       |PLACEMENT_OPPORTUNITIES|
                                                       |-----------------------|
                                                       | PK  id                |
                                                       |     company_name      |
                                                       |     role_title        |
                                                       |     package_lpa       |
                                                       |     eligibility_gpa   |
                                                       +-----------------------+
    </div>
    <div class="figure-caption">Fig. 3.2: ER diagram of the relational schema</div>

    <h2>3.3 Database Tables</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 28%;">Table</th>
          <th style="width: 72%;">Columns (mark primary / foreign keys)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong><code>users</code></strong></td>
          <td><strong><code>id</code></strong> (PK, INT AUTO_INC), <code>username</code> (VARCHAR UQ), <code>password_hash</code> (VARCHAR), <code>email</code> (VARCHAR UQ), <code>full_name</code> (VARCHAR), <code>role</code> (ENUM), <code>enabled</code> (BOOLEAN), <code>created_at</code> (DATETIME)</td>
        </tr>
        <tr>
          <td><strong><code>students</code></strong></td>
          <td><strong><code>id</code></strong> (PK, INT AUTO_INC), <strong><code>user_id</code></strong> (FK -&gt; <code>users.id</code>), <code>student_id</code> (VARCHAR UQ), <code>first_name</code> (VARCHAR), <code>last_name</code> (VARCHAR), <code>email</code> (VARCHAR UQ), <code>department</code> (VARCHAR), <code>academic_year</code> (INT), <code>gpa</code> (DECIMAL), <code>skills</code> (TEXT), <code>profile_status</code> (ENUM)</td>
        </tr>
        <tr>
          <td><strong><code>courses</code></strong></td>
          <td><strong><code>id</code></strong> (PK, INT AUTO_INC), <code>course_code</code> (VARCHAR UQ), <code>course_name</code> (VARCHAR), <code>department</code> (VARCHAR), <code>credits</code> (INT), <code>semester</code> (VARCHAR), <code>instructor_name</code> (VARCHAR), <code>max_enrollment</code> (INT), <code>current_enrollment</code> (INT), <code>syllabus</code> (TEXT)</td>
        </tr>
        <tr>
          <td><strong><code>enrollments</code></strong></td>
          <td><strong><code>id</code></strong> (PK, INT AUTO_INC), <strong><code>student_id</code></strong> (FK -&gt; <code>students.id</code>), <strong><code>course_id</code></strong> (FK -&gt; <code>courses.id</code>), <code>enrollment_date</code> (DATE), <code>grade</code> (VARCHAR), <code>status</code> (ENUM), UQ(<code>student_id</code>, <code>course_id</code>)</td>
        </tr>
        <tr>
          <td><strong><code>placement_opportunities</code></strong></td>
          <td><strong><code>id</code></strong> (PK, INT AUTO_INC), <code>company_name</code> (VARCHAR), <code>role_title</code> (VARCHAR), <code>job_description</code> (TEXT), <code>eligibility_gpa</code> (DECIMAL), <code>eligible_departments</code> (VARCHAR), <code>package_lpa</code> (DECIMAL), <code>application_deadline</code> (DATE), <code>status</code> (ENUM)</td>
        </tr>
        <tr>
          <td><strong><code>placement_applications</code></strong></td>
          <td><strong><code>id</code></strong> (PK, INT AUTO_INC), <strong><code>opportunity_id</code></strong> (FK -&gt; <code>placement_opportunities.id</code>), <strong><code>student_id</code></strong> (FK -&gt; <code>students.id</code>), <code>applied_date</code> (DATE), <code>status</code> (ENUM), <code>interview_notes</code> (TEXT), UQ(<code>opportunity_id</code>, <code>student_id</code>)</td>
        </tr>
      </tbody>
    </table>

    <h2>3.4 API / Servlet List</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 38%;">URL</th>
          <th style="width: 14%;">Method</th>
          <th style="width: 48%;">Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>/api/auth/login</code></td>
          <td>POST</td>
          <td>Authenticates credentials via BCrypt and issues signed JWT Bearer token</td>
        </tr>
        <tr>
          <td><code>/api/auth/register</code></td>
          <td>POST</td>
          <td>Registers a new student user and seeds their academic profile entity</td>
        </tr>
        <tr>
          <td><code>/api/dashboard/summary</code></td>
          <td>GET</td>
          <td>Aggregates campus metrics (student, course, and placement drive totals)</td>
        </tr>
        <tr>
          <td><code>/api/students</code></td>
          <td>GET / POST</td>
          <td>Retrieves paginated/filtered student records; creates new student record</td>
        </tr>
        <tr>
          <td><code>/api/students/{id}</code></td>
          <td>PUT / DELETE</td>
          <td>Updates existing student attributes; deletes student and associated records</td>
        </tr>
        <tr>
          <td><code>/api/courses</code></td>
          <td>GET / POST</td>
          <td>Fetches course catalog with department filters; registers new course</td>
        </tr>
        <tr>
          <td><code>/api/enrollments</code></td>
          <td>POST / GET</td>
          <td>Enrolls student into course checking capacity; lists active enrollments</td>
        </tr>
        <tr>
          <td><code>/api/placements/opportunities</code></td>
          <td>GET / POST</td>
          <td>Lists active placement recruitment drives; posts new corporate opportunity</td>
        </tr>
        <tr>
          <td><code>/api/reports/department-analytics</code></td>
          <td>GET</td>
          <td>Low-level raw JDBC query aggregating multi-table department metrics</td>
        </tr>
        <tr>
          <td><code>/legacy/students</code> (Servlet)</td>
          <td>GET / POST</td>
          <td>Legacy Servlet demonstrating <code>HttpServletRequest</code> handling and JSP rendering</td>
        </tr>
      </tbody>
    </table>

    <h2>3.5 Design Choices: Scalability and Maintainability (CO5)</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Design Decision</th>
          <th style="width: 25%;">Alternative Considered</th>
          <th style="width: 50%;">Justification (Scalability / Maintainability)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Layered Structure (Controller–Service–Repository)</strong></td>
          <td>Monolithic Smart Controllers combining SQL and Web handling</td>
          <td>Decouples HTTP request parsing from business validation and persistence. Enables independent unit testing with Mockito and allows swapping ORM engines without rewriting controllers.</td>
        </tr>
        <tr>
          <td><strong>REST API + React SPA Architecture</strong></td>
          <td>Monolithic Server-Side Rendered (SSR) JSP Pages</td>
          <td>The REST architecture delivers JSON payloads, drastically reducing server network bandwidth and CPU cycles. React handles view rendering on client machines, allowing the frontend to scale via CDNs (e.g., Vercel) independently of backend application servers.</td>
        </tr>
        <tr>
          <td><strong>Spring Data JPA combined with Raw JDBC API</strong></td>
          <td>Pure JPA exclusively OR Pure JDBC exclusively</td>
          <td>Spring Data JPA provides rapid, boilerplate-free CRUD with compile-time type safety for transactions. Raw JDBC is utilized selectively for heavy analytics, bypassing ORM object-instantiation overhead and executing high-performance aggregate SQL joins directly.</td>
        </tr>
        <tr>
          <td><strong>JWT Stateless Authentication</strong></td>
          <td>Stateful Server-Side Servlet HttpSessions</td>
          <td>JWT eliminates server-side session memory storage, making the backend completely stateless. This allows horizontal scaling across multiple container instances behind a load balancer without sticky sessions.</td>
        </tr>
        <tr>
          <td><strong>In-Memory Demo Engine (<code>demoStore.js</code>)</strong></td>
          <td>Hardcoded mock strings embedded directly inside React UI components</td>
          <td>Centralizes all client-side fallback data into a singular, reactive store. UI components consume the exact same service interface regardless of whether the system runs in connected backend mode or standalone cloud demo mode.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== CHAPTER 4 ==================== -->
  <div class="page-break">
    <h1>Chapter 4: Implementation and Testing</h1>
    <p style="font-size: 10pt; color: #475569; margin-top: -4px;">Course outcomes addressed: CO3, CO4, CO6</p>

    <h2>4.1 How the Modules Work</h2>
    <p>
      The frontend single-page application initializes within React 18, executing <code>AuthProvider</code> to evaluate session tokens stored in <code>localStorage</code>. 
      User requests are dispatched through a centralized <code>api.js</code> client that transparently toggles between live HTTP fetch requests and the client-side 
      <code>demoStore.js</code> when <code>VITE_DEMO_MODE=true</code>.
    </p>
    <p>
      On the backend, incoming HTTP requests pass through the <code>JwtAuthenticationFilter</code> where tokens are validated using HMAC-SHA512 algorithms. 
      Validated requests enter the <code>@RestController</code> layer, where Spring's <code>@Valid</code> annotation enforces constraints. 
      The Controller delegates to the <code>@Service</code> layer, wrapped by <code>LoggingAspect</code> which logs execution performance. 
      The Service persists through <code>JpaRepository</code> or queries HikariCP database connections via raw JDBC <code>PreparedStatement</code> instances.
    </p>

    <div style="font-weight: bold; margin-top: 6px;">Code Snippet 4.1: Raw JDBC Analytics Engine (<code>JdbcReportingService.java</code>)</div>
    <pre>@Service
public class JdbcReportingService {
    private final DataSource dataSource;

    public JdbcReportingService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List&lt;DepartmentReportDTO&gt; getDepartmentAnalyticsReport() {
        String sql = """
            SELECT s.department, COUNT(DISTINCT s.id) AS total_students,
                   ROUND(AVG(s.gpa), 2) AS avg_gpa,
                   COUNT(DISTINCT e.id) AS total_enrollments,
                   COUNT(DISTINCT pa.id) AS total_applications,
                   SUM(CASE WHEN pa.status = 'SELECTED' THEN 1 ELSE 0 END) AS placed_students
            FROM students s
            LEFT JOIN enrollments e ON s.id = e.student_id
            LEFT JOIN placement_applications pa ON s.id = pa.student_id
            GROUP BY s.department
        """;
        List&lt;DepartmentReportDTO&gt; report = new ArrayList&lt;&gt;();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                report.add(new DepartmentReportDTO(
                    rs.getString("department"), rs.getLong("total_students"),
                    rs.getDouble("avg_gpa"), rs.getLong("total_enrollments"),
                    rs.getLong("total_applications"), rs.getLong("placed_students")
                ));
            }
        } catch (SQLException e) {
            throw new DatabaseOperationException("JDBC report execution failed", e);
        }
        return report;
    }
}</pre>

    <div style="font-weight: bold; margin-top: 6px;">Code Snippet 4.2: FLUX State Reducer Pattern (<code>AuthContext.jsx</code>)</div>
    <pre>function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
}</pre>

    <h2>4.2 Screenshots & CRUD Demonstration</h2>
    <div class="diagram-box">
+---------------------------------------------------------------------------------------------------+
|  Fig. 4.1: Executive Dashboard                                                                    |
|  Shows real-time campus counts: 6 Students, 4 Courses, 5 Enrollments, 4 Placement Drives,         |
|  16.67% Placement Rate, and department distribution charts with zero console warnings.           |
+---------------------------------------------------------------------------------------------------+
|  Fig. 4.2: Student Management Roster                                                              |
|  Interactive data table supporting live text search, department filtering (CS, IT, E&C),          |
|  academic year selection, status badges, and an 'Add Student' modal form with real-time checks.  |
+---------------------------------------------------------------------------------------------------+
|  Fig. 4.3: Course Enrollment Portal                                                               |
|  Catalog showcasing course cards, remaining capacity calculation, student enrollment modal,       |
|  and faculty grade assignment actions (Letter grades A through F).                                |
+---------------------------------------------------------------------------------------------------+
|  Fig. 4.4: Corporate Placement & Application Tracker                                              |
|  Drive listing displaying company CTC packages, GPA eligibility gates, one-click student          |
|  application submissions, and administrative interview status progression.                        |
+---------------------------------------------------------------------------------------------------+
|  Fig. 4.5: Low-Level JDBC Analytics & FLUX Demonstration                                          |
|  Direct database metrics reporting comparing raw JDBC vs JPA execution metrics alongside an       |
|  interactive FLUX unidirectional event-dispatcher-store visualizer.                               |
+---------------------------------------------------------------------------------------------------+
|  Fig. 4.6: Complete CRUD Workflow in Action (Create -> Read -> Update -> Delete)                  |
|  Step-by-step verification demonstrating student creation, table update, GPA edit, and deletion.  |
+---------------------------------------------------------------------------------------------------+
    </div>

    <h2>4.3 Test Cases</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 10%;">TC</th>
          <th style="width: 32%;">Input</th>
          <th style="width: 30%;">Expected</th>
          <th style="width: 20%;">Actual</th>
          <th style="width: 8%;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>TC-01</strong></td>
          <td>Login: <code>admin</code>, Password: <code>Admin@Campus2026!</code></td>
          <td>HTTP 200 OK, JWT returned, role set to <code>ADMIN</code></td>
          <td>HTTP 200 OK, JWT Bearer received, Role: <code>ADMIN</code></td>
          <td><strong>Pass</strong></td>
        </tr>
        <tr>
          <td><strong>TC-02</strong></td>
          <td>Login: <code>student</code>, Password: <code>wrongPassword</code></td>
          <td>HTTP 401 Unauthorized, "Invalid credentials" error</td>
          <td>HTTP 401 Unauthorized, Error alert rendered</td>
          <td><strong>Pass</strong></td>
        </tr>
        <tr>
          <td><strong>TC-03</strong></td>
          <td>Create Student: <code>GPA = 4.85</code> (Max is 4.00)</td>
          <td>Validation error: "GPA must be between 0.0 and 4.0"</td>
          <td>Form displays red error label; submission blocked</td>
          <td><strong>Pass</strong></td>
        </tr>
        <tr>
          <td><strong>TC-04</strong></td>
          <td>Create Student: <code>email = "invalid-email"</code></td>
          <td>HTTP 400 Bad Request: "Invalid email format"</td>
          <td>Client regex flags field; API rejects invalid input</td>
          <td><strong>Pass</strong></td>
        </tr>
        <tr>
          <td><strong>TC-05</strong></td>
          <td>Duplicate Student ID: <code>STU-2024-001</code></td>
          <td>HTTP 409 Conflict: "Student ID already exists"</td>
          <td>DuplicateResourceException caught; modal alerts user</td>
          <td><strong>Pass</strong></td>
        </tr>
        <tr>
          <td><strong>TC-06</strong></td>
          <td>Course Enrollment: Capacity Full (60/60)</td>
          <td>Action rejected: "Course has reached maximum seats"</td>
          <td>Enrollment blocked with informative capacity warning</td>
          <td><strong>Pass</strong></td>
        </tr>
        <tr>
          <td><strong>TC-07</strong></td>
          <td>Apply Placement: Student GPA <code>3.20</code> &lt; Drive Min <code>3.50</code></td>
          <td>Submission disabled: "Student GPA does not meet eligibility"</td>
          <td>Apply button disabled with tooltip explanation</td>
          <td><strong>Pass</strong></td>
        </tr>
        <tr>
          <td><strong>TC-08</strong></td>
          <td>Delete Course with Active Enrollments</td>
          <td>Constraint check handled: cascades or alerts conflict</td>
          <td>System confirms deletion or warns of foreign key</td>
          <td><strong>Pass</strong></td>
        </tr>
      </tbody>
    </table>

    <h2>4.4 Runtime Errors Faced and Fixed (CO4)</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Error / Bug</th>
          <th style="width: 40%;">Root Cause (how identified)</th>
          <th style="width: 35%;">Fix</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>CORS Policy Violation (<code>403 Forbidden</code>)</strong></td>
          <td>Browser DevTools Network tab displayed blocked preflight <code>OPTIONS</code> requests from Vercel domain (<code>*.vercel.app</code>) to local backend.</td>
          <td>Configured <code>CorsConfigurationSource</code> in <code>SecurityConfig.java</code> to dynamically permit <code>https://*.vercel.app</code> and <code>http://localhost:5173</code> with credentials allowed.</td>
        </tr>
        <tr>
          <td><strong>Vercel SPA 404 on Refresh (<code>GET /students</code>)</strong></td>
          <td>Direct browser refresh on React Router paths triggered 404 because Vercel looked for static file <code>students.html</code>.</td>
          <td>Created <code>vercel.json</code> declaring single-page rewrite rules mapping all wildcard routes (<code>/(.*)</code>) back to <code>/index.html</code>.</td>
        </tr>
        <tr>
          <td><strong>Localtunnel Connection Drops & 503 Outages</strong></td>
          <td>The backend initially ran through Localtunnel, which dropped out when the host computer entered idle/sleep state.</td>
          <td>Engineered a fully autonomous in-memory demo engine (<code>demoStore.js</code>) controlled via <code>VITE_DEMO_MODE=true</code>, decoupling the live Vercel frontend from local network tunnels.</td>
        </tr>
        <tr>
          <td><strong>Unit Test Failure in <code>StudentControllerTest</code></strong></td>
          <td>Hardcoded test credentials sent <code>"password123"</code> while <code>DataInitializer.java</code> was hardened with <code>Admin@Campus2026!</code>.</td>
          <td>Injected the dynamic <code>@Value("\${campusconnect.demo.admin-password}")</code> property directly into the test suite class.</td>
        </tr>
        <tr>
          <td><strong>Ambiguous Column Name in JDBC SQL Query</strong></td>
          <td><code>SQLException: Column 'id' in field list is ambiguous</code> identified via backend server stack trace in <code>JdbcReportingService</code>.</td>
          <td>Qualified all SELECT projection columns explicitly with table aliases (<code>s.id</code>, <code>e.id</code>, <code>pa.id</code>) in the multi-table LEFT JOIN query.</td>
        </tr>
      </tbody>
    </table>

    <h2>4.5 Exception Handling Across Layers (CO4)</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Layer</th>
          <th style="width: 35%;">Exception(s) Handled</th>
          <th style="width: 40%;">How It Is Handled / Shown to User</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Front end</strong></td>
          <td><code>TypeError: Failed to fetch</code>, HTTP 400/401/404/500</td>
          <td><code>api.js</code> parses structured error JSON; triggers unauthorized event dispatchers and renders non-intrusive alert banners with a "Retry Connection" button.</td>
        </tr>
        <tr>
          <td><strong>Controller / Servlet</strong></td>
          <td><code>MethodArgumentNotValidException</code>, <code>HttpMessageNotReadableException</code></td>
          <td>Caught by <code>@RestControllerAdvice</code> (<code>GlobalExceptionHandler</code>); converts validation field errors into a structured key-value map with HTTP 400 status.</td>
        </tr>
        <tr>
          <td><strong>Service</strong></td>
          <td><code>ResourceNotFoundException</code>, <code>DuplicateResourceException</code></td>
          <td>Business logic validates foreign key associations and throws custom runtime exceptions carrying entity names and query parameters.</td>
        </tr>
        <tr>
          <td><strong>Repository / Database</strong></td>
          <td><code>DataIntegrityViolationException</code>, <code>SQLException</code></td>
          <td>Handled at persistence boundary; translated into user-safe HTTP 409 Conflict messages without leaking raw database schemas or stack traces.</td>
        </tr>
      </tbody>
    </table>

    <div style="font-weight: bold; margin-top: 6px;">Code Snippet 4.3: Global Centralized Exception Handler (<code>GlobalExceptionHandler.java</code>)</div>
    <pre>@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity&lt;ErrorResponse&gt; handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(), "Not Found",
            ex.getMessage(), request.getRequestURI()
        );
        return new ResponseEntity&lt;&gt;(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity&lt;ErrorResponse&gt; handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map&lt;String, String&gt; validationErrors = new HashMap&lt;&gt;();
        ex.getBindingResult().getFieldErrors().forEach(err -&gt; 
            validationErrors.put(err.getField(), err.getDefaultMessage())
        );
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(), "Validation Failed",
            "One or more fields failed validation", request.getRequestURI(), validationErrors
        );
        return new ResponseEntity&lt;&gt;(error, HttpStatus.BAD_REQUEST);
    }
}</pre>
  </div>

  <!-- ==================== CHAPTER 5 ==================== -->
  <div class="page-break">
    <h1>Chapter 5: AI Tools Used (Disclosure)</h1>

    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Tool</th>
          <th style="width: 35%;">Used For</th>
          <th style="width: 40%;">What We Checked or Changed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Google Antigravity Agent</strong></td>
          <td>Scaffolding initial Spring Boot Maven structure, generating Dockerfile templates, and configuring initial React components.</td>
          <td>Reviewed and customized all entity models, refactored CORS configurations to match Vercel origins, and verified all Spring Security filters.</td>
        </tr>
        <tr>
          <td><strong>Claude Code / LLM Assistant</strong></td>
          <td>Writing boilerplate SQL queries for raw JDBC aggregation and formulating regex validation logic for email formats.</td>
          <td>Manually tested JDBC PreparedStatements against MySQL 8.0, corrected SQL column ambiguity bugs, and refined the FLUX state reducer.</td>
        </tr>
        <tr>
          <td><strong>GitHub Copilot</strong></td>
          <td>Autocompleting repetitive JSX table headers and unit test assertions in <code>frontend.test.js</code>.</td>
          <td>Audited test coverage to ensure all 9 frontend test cases and 9 backend Spring Boot tests executed with zero mock reliance.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== CHAPTER 6 ==================== -->
  <div>
    <h1>Chapter 6: Conclusion and References</h1>
    <p style="font-size: 10pt; color: #475569; margin-top: -4px;">Course outcomes addressed: CO6</p>

    <h2>6.1 Conclusion and Future Scope</h2>
    <p>
      The <strong>CampusConnect</strong> project successfully achieved all core objectives outlined in Section 1.2:
    </p>
    <ul>
      <li>Developed a layered, enterprise-grade full-stack architecture running Spring Boot 3.3.5 and React 18.</li>
      <li>Successfully implemented both high-level Spring Data JPA persistence and an optimized, low-level raw JDBC reporting service.</li>
      <li>Demonstrated end-to-end security through stateless JWT tokens, BCrypt password hashing, and role-based route protection.</li>
      <li>Built a self-contained in-memory demonstration engine (<code>demoStore.js</code>), enabling a live public demonstration on Vercel with zero external hosting dependencies.</li>
      <li>Provided a fully runnable legacy Java Servlets, JSP, and JSTL module illustrating foundational Java enterprise concepts on Apache Tomcat 10.</li>
    </ul>

    <p><strong>Future Enhancements:</strong></p>
    <ol>
      <li><strong>Automated Resume Parsing:</strong> Integrate Apache Tika to automatically extract student skills and CGPA from uploaded PDF resumes during placement applications.</li>
      <li><strong>WebSocket Live Notifications:</strong> Introduce Spring WebSocket (STOMP) to push instant notifications to students when new placement drives or course grades are posted.</li>
      <li><strong>Multi-Factor Authentication (MFA):</strong> Enhance institutional security by embedding time-based one-time password (TOTP) verification using Google Authenticator.</li>
    </ol>

    <h2>6.2 References</h2>
    <p>[1] H. Schildt, <em>Java: The Complete Reference</em>, 12th ed. New York, NY, USA: McGraw-Hill Education, 2021.</p>
    <p>[2] C. Walls, <em>Spring in Action</em>, 6th ed. Shelter Island, NY, USA: Manning Publications, 2022.</p>
    <p>[3] R. Johnson et al., <em>Spring Framework Reference Documentation</em>, VMware Tanzu, 2024. [Online]. Available: https://docs.spring.io/spring-framework/reference/</p>
    <p>[4] E. Gamma, R. Helm, R. Johnson, and J. Vlissides, <em>Design Patterns: Elements of Reusable Object-Oriented Software</em>, Boston, MA, USA: Addison-Wesley, 1994.</p>
    <p>[5] Meta Open Source, <em>React – A JavaScript Library for Building User Interfaces</em>, 2024. [Online]. Available: https://react.dev/</p>
    <p>[6] Oracle Corporation, <em>Java Platform, Standard Edition & Java EE Documentation</em>, 2024. [Online]. Available: https://docs.oracle.com/en/java/</p>
  </div>

</body>
</html>
`;

const htmlFilePath = path.join(docsDir, 'report.html');
const pdfFilePath = path.join(docsDir, 'CampusConnect_Mini_Project_Report.pdf');

fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
console.log('HTML written to:', htmlFilePath);

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const cmd = `"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="${pdfFilePath}" "${htmlFilePath}"`;

console.log('Executing Edge PDF generation...');
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('SUCCESS: PDF successfully generated at:', pdfFilePath);
} catch (e) {
  console.error('Error generating PDF via Edge:', e);
}
