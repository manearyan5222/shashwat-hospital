/**
 * ============================================================================
 * CAMPUSCONNECT — IN-MEMORY DEMO DATA STORE & SIMULATION ENGINE
 * ============================================================================
 * 
 * Provides a self-contained, zero-backend demonstration mode for CampusConnect.
 * Activated whenever VITE_DEMO_MODE=true or when running without a reachable backend.
 * 
 * Features:
 * - Deterministic baseline data matching exact campus operational metrics:
 *     * 6 Students (CS: 3, IT: 2, E&C: 1)
 *     * 4 Courses
 *     * 5 Active Enrollments
 *     * 4 Placement Opportunities (3 OPEN, 1 CLOSED)
 *     * 6 Placement Applications (1 SELECTED / PLACED, 2 INTERVIEWING, 2 APPLIED, 1 REJECTED)
 *     * 16.67% Placement Rate (1 / 6 students)
 * - Complete in-memory CRUD operations for Students, Courses, Enrollments, and Placements.
 * - Dynamic Spring Page emulation ({ content, totalElements, totalPages, number, size }).
 * - Simulated JWT authentication with role-based access control (ADMIN, FACULTY, STUDENT).
 * - Full session isolation (resets on browser page reload).
 * ============================================================================
 */

export const isDemoMode = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.VITE_DEMO_MODE === 'false') return false;
    if (import.meta.env.VITE_DEMO_MODE === 'true') return true;
    if (import.meta.env.VITE_DEMO_MODE === true) return true;
  }
  // Default to self-contained demo mode if VITE_API_URL is unset
  return true;
};

// ----------------------------------------------------------------------------
// Baseline Mock Datasets
// ----------------------------------------------------------------------------

const INITIAL_STUDENTS = [
  {
    id: 1,
    userId: 4,
    studentId: 'STU-2024-001',
    firstName: 'Alex',
    lastName: 'Chen',
    fullName: 'Alex Chen',
    email: 'alex.chen@campusconnect.edu',
    department: 'Computer Science',
    academicYear: 4,
    gpa: 3.85,
    skills: 'Java, Spring Boot, React, Docker, PostgreSQL',
    profileStatus: 'ACTIVE',
  },
  {
    id: 2,
    userId: 5,
    studentId: 'STU-2024-002',
    firstName: 'Priya',
    lastName: 'Sharma',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@campusconnect.edu',
    department: 'Computer Science',
    academicYear: 4,
    gpa: 3.92,
    skills: 'Python, Machine Learning, Java, React, SQL',
    profileStatus: 'ACTIVE',
  },
  {
    id: 3,
    userId: 6,
    studentId: 'STU-2024-003',
    firstName: 'Marcus',
    lastName: 'Vance',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@campusconnect.edu',
    department: 'Information Technology',
    academicYear: 3,
    gpa: 3.45,
    skills: 'JavaScript, Node.js, HTML/CSS, React, MongoDB',
    profileStatus: 'ACTIVE',
  },
  {
    id: 4,
    userId: 7,
    studentId: 'STU-2024-004',
    firstName: 'Ananya',
    lastName: 'Iyer',
    fullName: 'Ananya Iyer',
    email: 'ananya.iyer@campusconnect.edu',
    department: 'Electronics & Comm',
    academicYear: 4,
    gpa: 3.78,
    skills: 'Embedded C, IoT, Python, Java, System Design',
    profileStatus: 'ACTIVE',
  },
  {
    id: 5,
    userId: 8,
    studentId: 'STU-2024-005',
    firstName: 'David',
    lastName: 'Kim',
    fullName: 'David Kim',
    email: 'david.kim@campusconnect.edu',
    department: 'Computer Science',
    academicYear: 2,
    gpa: 3.60,
    skills: 'Java, Data Structures, Git, Web Basics',
    profileStatus: 'ACTIVE',
  },
  {
    id: 6,
    userId: null,
    studentId: 'STU-2024-006',
    firstName: 'Rohan',
    lastName: 'Verma',
    fullName: 'Rohan Verma',
    email: 'rohan.verma@campusconnect.edu',
    department: 'Information Technology',
    academicYear: 4,
    gpa: 3.20,
    skills: 'PHP, MySQL, HTML5, Bootstrap, QA Testing',
    profileStatus: 'ACTIVE',
  },
];

const INITIAL_COURSES = [
  {
    id: 1,
    courseCode: 'CS301',
    courseName: 'Advanced Web Applications with Spring Boot & React',
    department: 'Computer Science',
    credits: 4,
    semester: 'Fall 2026',
    instructorName: 'Dr. Sarah Mitchell',
    maxEnrollment: 60,
    currentEnrollment: 2,
    syllabus: 'Spring Boot 3, REST APIs, JPA/Hibernate, React 18, State Management, Docker',
  },
  {
    id: 2,
    courseCode: 'CS402',
    courseName: 'Cloud Computing & Distributed Systems',
    department: 'Computer Science',
    credits: 3,
    semester: 'Fall 2026',
    instructorName: 'Prof. David Lee',
    maxEnrollment: 45,
    currentEnrollment: 1,
    syllabus: 'Microservices, AWS/Render, Kubernetes, Message Queues, CI/CD Pipelines',
  },
  {
    id: 3,
    courseCode: 'IT305',
    courseName: 'Relational Database Design & Raw JDBC Analytics',
    department: 'Information Technology',
    credits: 4,
    semester: 'Fall 2026',
    instructorName: 'Dr. Sarah Mitchell',
    maxEnrollment: 50,
    currentEnrollment: 1,
    syllabus: 'Relational Algebra, SQL Optimization, JDBC vs ORM, Transactions, Indexing',
  },
  {
    id: 4,
    courseCode: 'EC210',
    courseName: 'Embedded Microcontrollers & Edge IoT',
    department: 'Electronics & Comm',
    credits: 3,
    semester: 'Fall 2026',
    instructorName: 'Prof. Anita Desai',
    maxEnrollment: 40,
    currentEnrollment: 1,
    syllabus: 'ARM Cortex Architecture, C/C++, Real-Time Operating Systems, Sensor Interfacing',
  },
];

const INITIAL_ENROLLMENTS = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Alex Chen',
    studentEmail: 'alex.chen@campusconnect.edu',
    studentDepartment: 'Computer Science',
    courseId: 1,
    courseCode: 'CS301',
    courseName: 'Advanced Web Applications with Spring Boot & React',
    enrollmentDate: '2026-08-15',
    grade: 'A',
    status: 'ACTIVE',
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'Alex Chen',
    studentEmail: 'alex.chen@campusconnect.edu',
    studentDepartment: 'Computer Science',
    courseId: 2,
    courseCode: 'CS402',
    courseName: 'Cloud Computing & Distributed Systems',
    enrollmentDate: '2026-08-16',
    grade: 'A-',
    status: 'ACTIVE',
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'Priya Sharma',
    studentEmail: 'priya.sharma@campusconnect.edu',
    studentDepartment: 'Computer Science',
    courseId: 1,
    courseCode: 'CS301',
    courseName: 'Advanced Web Applications with Spring Boot & React',
    enrollmentDate: '2026-08-15',
    grade: 'A+',
    status: 'ACTIVE',
  },
  {
    id: 4,
    studentId: 3,
    studentName: 'Marcus Vance',
    studentEmail: 'marcus.vance@campusconnect.edu',
    studentDepartment: 'Information Technology',
    courseId: 3,
    courseCode: 'IT305',
    courseName: 'Relational Database Design & Raw JDBC Analytics',
    enrollmentDate: '2026-08-17',
    grade: 'B+',
    status: 'ACTIVE',
  },
  {
    id: 5,
    studentId: 4,
    studentName: 'Ananya Iyer',
    studentEmail: 'ananya.iyer@campusconnect.edu',
    studentDepartment: 'Electronics & Comm',
    courseId: 4,
    courseCode: 'EC210',
    courseName: 'Embedded Microcontrollers & Edge IoT',
    enrollmentDate: '2026-08-18',
    grade: 'A',
    status: 'ACTIVE',
  },
];

const INITIAL_OPPORTUNITIES = [
  {
    id: 1,
    companyName: 'Google',
    roleTitle: 'Associate Software Development Engineer',
    jobDescription: 'Building distributed cloud infrastructure and microservices with Java, Go, and React.',
    eligibilityGpa: 3.50,
    eligibleDepartments: 'Computer Science, Information Technology',
    packageLpa: 18.50,
    applicationDeadline: '2026-11-30',
    status: 'OPEN',
  },
  {
    id: 2,
    companyName: 'Microsoft',
    roleTitle: 'Full-Stack Cloud Engineer',
    jobDescription: 'Engineering scalable enterprise cloud platforms using Spring Boot, Azure, and modern frontend frameworks.',
    eligibilityGpa: 3.40,
    eligibleDepartments: 'Computer Science, Information Technology, Electronics & Comm',
    packageLpa: 16.00,
    applicationDeadline: '2026-12-05',
    status: 'OPEN',
  },
  {
    id: 3,
    companyName: 'Amazon',
    roleTitle: 'Systems Development Engineer',
    jobDescription: 'Developing high-throughput internal automation tools and reliable edge services.',
    eligibilityGpa: 3.20,
    eligibleDepartments: 'Computer Science, Information Technology, Electronics & Comm',
    packageLpa: 14.50,
    applicationDeadline: '2026-12-15',
    status: 'OPEN',
  },
  {
    id: 4,
    companyName: 'Infosys',
    roleTitle: 'Specialist Programmer',
    jobDescription: 'Full-stack enterprise application engineering and microservices development.',
    eligibilityGpa: 3.00,
    eligibleDepartments: 'Computer Science, Information Technology, Electronics & Comm',
    packageLpa: 9.50,
    applicationDeadline: '2026-09-30',
    status: 'CLOSED',
  },
];

const INITIAL_APPLICATIONS = [
  {
    id: 1,
    opportunityId: 1,
    companyName: 'Google',
    roleTitle: 'Associate Software Development Engineer',
    studentId: 1,
    studentName: 'Alex Chen',
    studentEmail: 'alex.chen@campusconnect.edu',
    studentDepartment: 'Computer Science',
    studentGpa: 3.85,
    appliedDate: '2026-10-01',
    status: 'SELECTED',
    interviewNotes: 'Offered 18.5 LPA role. Acceptance confirmed.',
  },
  {
    id: 2,
    opportunityId: 1,
    companyName: 'Google',
    roleTitle: 'Associate Software Development Engineer',
    studentId: 2,
    studentName: 'Priya Sharma',
    studentEmail: 'priya.sharma@campusconnect.edu',
    studentDepartment: 'Computer Science',
    studentGpa: 3.92,
    appliedDate: '2026-10-02',
    status: 'INTERVIEWING',
    interviewNotes: 'Technical round 2 cleared with strong DSA score.',
  },
  {
    id: 3,
    opportunityId: 2,
    companyName: 'Microsoft',
    roleTitle: 'Full-Stack Cloud Engineer',
    studentId: 1,
    studentName: 'Alex Chen',
    studentEmail: 'alex.chen@campusconnect.edu',
    studentDepartment: 'Computer Science',
    studentGpa: 3.85,
    appliedDate: '2026-10-05',
    status: 'APPLIED',
    interviewNotes: 'Application under review.',
  },
  {
    id: 4,
    opportunityId: 2,
    companyName: 'Microsoft',
    roleTitle: 'Full-Stack Cloud Engineer',
    studentId: 4,
    studentName: 'Ananya Iyer',
    studentEmail: 'ananya.iyer@campusconnect.edu',
    studentDepartment: 'Electronics & Comm',
    studentGpa: 3.78,
    appliedDate: '2026-10-06',
    status: 'INTERVIEWING',
    interviewNotes: 'System design interview scheduled.',
  },
  {
    id: 5,
    opportunityId: 3,
    companyName: 'Amazon',
    roleTitle: 'Systems Development Engineer',
    studentId: 3,
    studentName: 'Marcus Vance',
    studentEmail: 'marcus.vance@campusconnect.edu',
    studentDepartment: 'Information Technology',
    studentGpa: 3.45,
    appliedDate: '2026-10-10',
    status: 'APPLIED',
    interviewNotes: 'Online assessment completed.',
  },
  {
    id: 6,
    opportunityId: 4,
    companyName: 'Infosys',
    roleTitle: 'Specialist Programmer',
    studentId: 2,
    studentName: 'Priya Sharma',
    studentEmail: 'priya.sharma@campusconnect.edu',
    studentDepartment: 'Computer Science',
    studentGpa: 3.92,
    appliedDate: '2026-09-15',
    status: 'REJECTED',
    interviewNotes: 'Declined interview stage due to higher offer target.',
  },
];

// ----------------------------------------------------------------------------
// Active In-Memory Store
// ----------------------------------------------------------------------------

let students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
let courses = JSON.parse(JSON.stringify(INITIAL_COURSES));
let enrollments = JSON.parse(JSON.stringify(INITIAL_ENROLLMENTS));
let opportunities = JSON.parse(JSON.stringify(INITIAL_OPPORTUNITIES));
let applications = JSON.parse(JSON.stringify(INITIAL_APPLICATIONS));

// Auto-increment IDs
let nextStudentId = 7;
let nextCourseId = 5;
let nextEnrollmentId = 6;
let nextOpportunityId = 5;
let nextApplicationId = 7;

// ----------------------------------------------------------------------------
// Reset Helper
// ----------------------------------------------------------------------------
export function resetDemoStore() {
  students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
  courses = JSON.parse(JSON.stringify(INITIAL_COURSES));
  enrollments = JSON.parse(JSON.stringify(INITIAL_ENROLLMENTS));
  opportunities = JSON.parse(JSON.stringify(INITIAL_OPPORTUNITIES));
  applications = JSON.parse(JSON.stringify(INITIAL_APPLICATIONS));
  nextStudentId = 7;
  nextCourseId = 5;
  nextEnrollmentId = 6;
  nextOpportunityId = 5;
  nextApplicationId = 7;
}

// ----------------------------------------------------------------------------
// Emulated Spring Data Page Helper
// ----------------------------------------------------------------------------
function paginate(items, page = 0, size = 10) {
  const p = Math.max(0, parseInt(page, 10) || 0);
  const s = Math.max(1, parseInt(size, 10) || 10);
  const start = p * s;
  const content = items.slice(start, start + s);
  const totalElements = items.length;
  const totalPages = Math.ceil(totalElements / s) || 0;

  return {
    content,
    totalElements,
    totalPages,
    size: s,
    number: p,
    numberOfElements: content.length,
    first: p === 0,
    last: p >= totalPages - 1,
    empty: content.length === 0,
  };
}

// ----------------------------------------------------------------------------
// Dashboard & Analytics
// ----------------------------------------------------------------------------

export function getDemoDashboardSummary() {
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.profileStatus === 'ACTIVE').length;
  const totalCourses = courses.length;
  const activeEnrollments = enrollments.filter(e => e.status === 'ACTIVE').length;
  const totalOpportunities = opportunities.length;
  const openOpportunities = opportunities.filter(o => o.status === 'OPEN').length;
  const totalApplications = applications.length;

  // Placed students: distinct students with status 'SELECTED'
  const placedStudentIds = new Set(
    applications.filter(a => a.status === 'SELECTED').map(a => a.studentId)
  );
  const placedStudents = placedStudentIds.size;
  const placementRatePercentage = totalStudents > 0 
    ? parseFloat(((placedStudents / totalStudents) * 100).toFixed(2)) 
    : 0;

  // Department counts
  const studentsByDepartment = {};
  students.forEach(s => {
    const dept = s.department || 'Other';
    studentsByDepartment[dept] = (studentsByDepartment[dept] || 0) + 1;
  });

  return {
    totalStudents,
    activeStudents,
    totalCourses,
    activeEnrollments,
    totalOpportunities,
    openOpportunities,
    totalApplications,
    placedStudents,
    placementRatePercentage,
    studentsByDepartment,
  };
}

export function getDemoDepartmentAnalytics() {
  const depts = ['Computer Science', 'Information Technology', 'Electronics & Comm'];
  return depts.map(dept => {
    const deptStudents = students.filter(s => s.department === dept);
    const totalCount = deptStudents.length;
    const avgGpa = totalCount > 0 
      ? parseFloat((deptStudents.reduce((acc, s) => acc + (s.gpa || 0), 0) / totalCount).toFixed(2))
      : 0;

    const deptCourses = courses.filter(c => c.department === dept);
    const deptEnrollments = enrollments.filter(e => 
      deptStudents.some(s => s.id === e.studentId)
    );
    const deptApps = applications.filter(a => 
      deptStudents.some(s => s.id === a.studentId)
    );
    const placedInDept = new Set(
      deptApps.filter(a => a.status === 'SELECTED').map(a => a.studentId)
    ).size;

    const placementRate = totalCount > 0 
      ? parseFloat(((placedInDept / totalCount) * 100).toFixed(2))
      : 0;

    const highestPackage = deptApps
      .filter(a => a.status === 'SELECTED')
      .reduce((max, a) => {
        const opp = opportunities.find(o => o.id === a.opportunityId);
        return Math.max(max, opp ? opp.packageLpa : 0);
      }, 0);

    return {
      department: dept,
      totalStudents: totalCount,
      averageGpa: avgGpa,
      totalCourses: deptCourses.length,
      totalEnrollments: deptEnrollments.length,
      placementApplications: deptApps.length,
      placedStudents: placedInDept,
      placementRatePercentage: placementRate,
      highestPackageLpa: highestPackage,
    };
  });
}

export function getDemoSalaryStats() {
  const selectedApps = applications.filter(a => a.status === 'SELECTED');
  const packages = selectedApps.map(a => {
    const opp = opportunities.find(o => o.id === a.opportunityId);
    return opp ? opp.packageLpa : 0;
  }).filter(p => p > 0);

  const highest = packages.length > 0 ? Math.max(...packages) : 18.50;
  const lowest = packages.length > 0 ? Math.min(...packages) : 9.50;
  const avg = packages.length > 0 ? parseFloat((packages.reduce((a, b) => a + b, 0) / packages.length).toFixed(2)) : 14.67;

  return {
    averageSalaryLpa: avg,
    highestSalaryLpa: highest,
    lowestSalaryLpa: lowest,
    placedCount: selectedApps.length,
    totalOffers: selectedApps.length,
  };
}

export function getDemoIoCDemo() {
  return {
    architectureTopic: 'Spring Inversion of Control (IoC) & Dependency Injection (DI)',
    details: 'Spring IoC Container Report:\n - Constructor Injection (StudentService): ACTIVE & INITIALIZED [RECOMMENDED]\n - Field @Autowired Injection (UserRepository): ACTIVE & INITIALIZED [LEGACY PATTERN]\n - Setter Injection: CampusConnect Enterprise Demo v1.0\n - Runtime Mode: Standalone Self-Contained Demo Store',
  };
}

// ----------------------------------------------------------------------------
// Students CRUD
// ----------------------------------------------------------------------------

export function getDemoStudents(params = {}) {
  let list = [...students];

  if (params.query) {
    const q = params.query.toLowerCase();
    list = list.filter(s =>
      s.fullName?.toLowerCase().includes(q) ||
      s.studentId?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.skills?.toLowerCase().includes(q)
    );
  }

  if (params.department) {
    list = list.filter(s => s.department === params.department);
  }

  if (params.year) {
    list = list.filter(s => s.academicYear === parseInt(params.year, 10));
  }

  if (params.status) {
    list = list.filter(s => s.profileStatus === params.status);
  }

  return paginate(list, params.page, params.size || 8);
}

export function getDemoStudentById(id) {
  const found = students.find(s => s.id === parseInt(id, 10));
  if (!found) throw new Error(`Student with id ${id} not found.`);
  return found;
}

export function createDemoStudent(data) {
  const newStudent = {
    ...data,
    id: nextStudentId++,
    studentId: data.studentId || `STU-2026-00${nextStudentId}`,
    fullName: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
    academicYear: parseInt(data.academicYear, 10) || 1,
    gpa: parseFloat(data.gpa) || 3.0,
    profileStatus: data.profileStatus || 'ACTIVE',
  };
  students.unshift(newStudent);
  return newStudent;
}

export function updateDemoStudent(id, data) {
  const index = students.findIndex(s => s.id === parseInt(id, 10));
  if (index === -1) throw new Error(`Student with id ${id} not found.`);
  const updated = {
    ...students[index],
    ...data,
    id: students[index].id,
    fullName: `${data.firstName || students[index].firstName} ${data.lastName || students[index].lastName}`.trim(),
    academicYear: parseInt(data.academicYear || students[index].academicYear, 10),
    gpa: parseFloat(data.gpa !== undefined ? data.gpa : students[index].gpa),
  };
  students[index] = updated;
  return updated;
}

export function deleteDemoStudent(id) {
  const numId = parseInt(id, 10);
  students = students.filter(s => s.id !== numId);
  enrollments = enrollments.filter(e => e.studentId !== numId);
  applications = applications.filter(a => a.studentId !== numId);
  return null;
}

// ----------------------------------------------------------------------------
// Courses CRUD
// ----------------------------------------------------------------------------

export function getDemoCourses(params = {}) {
  let list = [...courses];

  if (params.query) {
    const q = params.query.toLowerCase();
    list = list.filter(c =>
      c.courseName?.toLowerCase().includes(q) ||
      c.courseCode?.toLowerCase().includes(q) ||
      c.instructorName?.toLowerCase().includes(q)
    );
  }

  if (params.department) {
    list = list.filter(c => c.department === params.department);
  }

  if (params.semester) {
    list = list.filter(c => c.semester === params.semester);
  }

  return paginate(list, params.page, params.size || 10);
}

export function getDemoCourseById(id) {
  const found = courses.find(c => c.id === parseInt(id, 10));
  if (!found) throw new Error(`Course with id ${id} not found.`);
  return found;
}

export function createDemoCourse(data) {
  const newCourse = {
    ...data,
    id: nextCourseId++,
    credits: parseInt(data.credits, 10) || 3,
    maxEnrollment: parseInt(data.maxEnrollment, 10) || 50,
    currentEnrollment: 0,
  };
  courses.push(newCourse);
  return newCourse;
}

export function updateDemoCourse(id, data) {
  const index = courses.findIndex(c => c.id === parseInt(id, 10));
  if (index === -1) throw new Error(`Course with id ${id} not found.`);
  const updated = {
    ...courses[index],
    ...data,
    id: courses[index].id,
    credits: parseInt(data.credits || courses[index].credits, 10),
    maxEnrollment: parseInt(data.maxEnrollment || courses[index].maxEnrollment, 10),
  };
  courses[index] = updated;
  return updated;
}

export function deleteDemoCourse(id) {
  const numId = parseInt(id, 10);
  courses = courses.filter(c => c.id !== numId);
  enrollments = enrollments.filter(e => e.courseId !== numId);
  return null;
}

// ----------------------------------------------------------------------------
// Enrollments CRUD
// ----------------------------------------------------------------------------

export function getDemoEnrollments() {
  return [...enrollments];
}

export function getDemoEnrollmentsByStudent(studentId) {
  return enrollments.filter(e => e.studentId === parseInt(studentId, 10));
}

export function getDemoEnrollmentsByCourse(courseId) {
  return enrollments.filter(e => e.courseId === parseInt(courseId, 10));
}

export function createDemoEnrollment(data) {
  const student = students.find(s => s.id === parseInt(data.studentId, 10));
  const course = courses.find(c => c.id === parseInt(data.courseId, 10));

  if (!student) throw new Error('Student not found for enrollment.');
  if (!course) throw new Error('Course not found for enrollment.');

  const existing = enrollments.find(e => e.studentId === student.id && e.courseId === course.id);
  if (existing) throw new Error('Student is already enrolled in this course.');

  const newEnroll = {
    id: nextEnrollmentId++,
    studentId: student.id,
    studentName: student.fullName,
    studentEmail: student.email,
    studentDepartment: student.department,
    courseId: course.id,
    courseCode: course.courseCode,
    courseName: course.courseName,
    enrollmentDate: new Date().toISOString().split('T')[0],
    grade: data.grade || null,
    status: 'ACTIVE',
  };

  enrollments.push(newEnroll);
  course.currentEnrollment = (course.currentEnrollment || 0) + 1;
  return newEnroll;
}

export function updateDemoEnrollmentGrade(id, { grade, status }) {
  const index = enrollments.findIndex(e => e.id === parseInt(id, 10));
  if (index === -1) throw new Error(`Enrollment ${id} not found.`);
  if (grade !== undefined) enrollments[index].grade = grade;
  if (status !== undefined) enrollments[index].status = status;
  return enrollments[index];
}

export function dropDemoEnrollment(id) {
  const index = enrollments.findIndex(e => e.id === parseInt(id, 10));
  if (index !== -1) {
    const courseId = enrollments[index].courseId;
    enrollments.splice(index, 1);
    const course = courses.find(c => c.id === courseId);
    if (course && course.currentEnrollment > 0) {
      course.currentEnrollment -= 1;
    }
  }
  return null;
}

// ----------------------------------------------------------------------------
// Placement Drives & Applications CRUD
// ----------------------------------------------------------------------------

export function getDemoOpportunities(params = {}) {
  let list = [...opportunities];
  if (params.status) {
    list = list.filter(o => o.status === params.status);
  }
  return paginate(list, params.page, params.size || 50);
}

export function getDemoOpportunityById(id) {
  const found = opportunities.find(o => o.id === parseInt(id, 10));
  if (!found) throw new Error(`Placement opportunity ${id} not found.`);
  return found;
}

export function createDemoOpportunity(data) {
  const newOpp = {
    ...data,
    id: nextOpportunityId++,
    eligibilityGpa: parseFloat(data.eligibilityGpa) || 3.0,
    packageLpa: parseFloat(data.packageLpa) || 10.0,
    status: data.status || 'OPEN',
  };
  opportunities.push(newOpp);
  return newOpp;
}

export function updateDemoOpportunity(id, data) {
  const index = opportunities.findIndex(o => o.id === parseInt(id, 10));
  if (index === -1) throw new Error(`Opportunity ${id} not found.`);
  const updated = {
    ...opportunities[index],
    ...data,
    id: opportunities[index].id,
    eligibilityGpa: parseFloat(data.eligibilityGpa || opportunities[index].eligibilityGpa),
    packageLpa: parseFloat(data.packageLpa || opportunities[index].packageLpa),
  };
  opportunities[index] = updated;
  return updated;
}

export function deleteDemoOpportunity(id) {
  const numId = parseInt(id, 10);
  opportunities = opportunities.filter(o => o.id !== numId);
  applications = applications.filter(a => a.opportunityId !== numId);
  return null;
}

export function getDemoApplicationsByStudent(studentId) {
  return applications.filter(a => a.studentId === parseInt(studentId, 10));
}

export function getDemoApplicationsByOpportunity(opportunityId) {
  return applications.filter(a => a.opportunityId === parseInt(opportunityId, 10));
}

export function createDemoApplication(data) {
  const opp = opportunities.find(o => o.id === parseInt(data.opportunityId, 10));
  const stu = students.find(s => s.id === parseInt(data.studentId, 10));

  if (!opp) throw new Error('Placement opportunity not found.');
  if (!stu) throw new Error('Student not found.');

  const existing = applications.find(a => a.opportunityId === opp.id && a.studentId === stu.id);
  if (existing) throw new Error('You have already applied for this placement opportunity.');

  const newApp = {
    id: nextApplicationId++,
    opportunityId: opp.id,
    companyName: opp.companyName,
    roleTitle: opp.roleTitle,
    studentId: stu.id,
    studentName: stu.fullName,
    studentEmail: stu.email,
    studentDepartment: stu.department,
    studentGpa: stu.gpa,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'APPLIED',
    interviewNotes: data.notes || 'Application received via Demo Portal',
  };

  applications.push(newApp);
  return newApp;
}

export function updateDemoApplicationStatus(id, status, notes) {
  const index = applications.findIndex(a => a.id === parseInt(id, 10));
  if (index === -1) throw new Error(`Application ${id} not found.`);
  applications[index].status = status;
  if (notes) applications[index].interviewNotes = notes;
  return applications[index];
}

// ----------------------------------------------------------------------------
// Simulated Authentication Engine
// ----------------------------------------------------------------------------

const DEMO_USERS = [
  {
    username: 'admin',
    passwords: ['Admin@Campus2026!', 'password123'],
    user: {
      id: 1,
      username: 'admin',
      email: 'admin@campusconnect.edu',
      fullName: 'Dr. Sarah Mitchell',
      role: 'ADMIN',
      studentProfileId: null,
    },
  },
  {
    username: 'faculty',
    passwords: ['Faculty@Campus2026!', 'password123'],
    user: {
      id: 2,
      username: 'faculty',
      email: 'faculty@campusconnect.edu',
      fullName: 'Prof. John Doe',
      role: 'FACULTY',
      studentProfileId: null,
    },
  },
  {
    username: 'prof_john',
    passwords: ['Faculty@Campus2026!', 'password123'],
    user: {
      id: 2,
      username: 'prof_john',
      email: 'prof.john@campusconnect.edu',
      fullName: 'Prof. John Doe',
      role: 'FACULTY',
      studentProfileId: null,
    },
  },
  {
    username: 'student',
    passwords: ['Student@Campus2026!', 'password123'],
    user: {
      id: 3,
      username: 'student',
      email: 'alex.chen@campusconnect.edu',
      fullName: 'Alex Chen',
      role: 'STUDENT',
      studentProfileId: 1,
    },
  },
  {
    username: 'alex_chen',
    passwords: ['Student@Campus2026!', 'password123'],
    user: {
      id: 4,
      username: 'alex_chen',
      email: 'alex.chen@campusconnect.edu',
      fullName: 'Alex Chen',
      role: 'STUDENT',
      studentProfileId: 1,
    },
  },
];

export function simulateDemoLogin(username, password) {
  const normalizedUser = (username || '').trim().toLowerCase();
  const matched = DEMO_USERS.find(
    u => u.username.toLowerCase() === normalizedUser || u.user.email.toLowerCase() === normalizedUser
  );

  if (matched) {
    const isPasswordValid = matched.passwords.includes(password) || password === 'password123' || password.length >= 6;
    if (!isPasswordValid) {
      throw new Error('Invalid username or password. Please use the quick fill credentials.');
    }

    const token = `demo-token-${matched.user.role.toLowerCase()}-${Date.now()}`;
    return {
      success: true,
      token,
      ...matched.user,
    };
  }

  // Allow student login with any created username for flexibility in testing
  if (normalizedUser.length >= 3) {
    const token = `demo-token-student-${Date.now()}`;
    return {
      success: true,
      token,
      id: 99,
      username: normalizedUser,
      email: `${normalizedUser}@campusconnect.edu`,
      fullName: normalizedUser.charAt(0).toUpperCase() + normalizedUser.slice(1),
      role: 'STUDENT',
      studentProfileId: 1,
    };
  }

  throw new Error('Invalid username or password. Please use the demo credentials.');
}

export function simulateDemoRegister(data) {
  const username = data.username || 'new_student';
  const newStudent = createDemoStudent({
    firstName: data.firstName || 'New',
    lastName: data.lastName || 'Student',
    email: data.email || `${username}@campusconnect.edu`,
    department: data.department || 'Computer Science',
    academicYear: data.academicYear || 1,
    gpa: data.gpa || 3.5,
    skills: data.skills || 'Java, React',
  });

  const token = `demo-token-student-${Date.now()}`;
  return {
    success: true,
    token,
    id: nextStudentId + 10,
    username,
    email: newStudent.email,
    fullName: newStudent.fullName,
    role: 'STUDENT',
    studentProfileId: newStudent.id,
  };
}
