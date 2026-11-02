-- ============================================================================
-- CampusConnect Portal - Seed Data Script
-- Default demo passwords:
--   admin / admin123
--   faculty / faculty123
--   student / student123
-- BCrypt hash format: $2a$10$w8kL5J...
-- ============================================================================

USE campus_connect;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE placement_applications;
TRUNCATE TABLE placement_opportunities;
TRUNCATE TABLE enrollments;
TRUNCATE TABLE courses;
TRUNCATE TABLE students;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Demo Users (BCrypt hashes for 'password123')
-- Hash: $2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG corresponds to 'password123'
INSERT INTO users (id, username, email, password_hash, full_name, role, enabled) VALUES
(1, 'admin', 'admin@campusconnect.edu', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Dr. Sarah Mitchell', 'ADMIN', TRUE),
(2, 'prof_john', 'john.doe@campusconnect.edu', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Prof. John Doe', 'FACULTY', TRUE),
(3, 'prof_alan', 'alan.turing@campusconnect.edu', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Prof. Alan Turing', 'FACULTY', TRUE),
(4, 'alex_chen', 'alex.chen@campusconnect.edu', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Alex Chen', 'STUDENT', TRUE),
(5, 'priya_sharma', 'priya.sharma@campusconnect.edu', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Priya Sharma', 'STUDENT', TRUE),
(6, 'marcus_vance', 'marcus.vance@campusconnect.edu', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Marcus Vance', 'STUDENT', TRUE),
(7, 'ananya_iyer', 'ananya.iyer@campusconnect.edu', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Ananya Iyer', 'STUDENT', TRUE),
(8, 'david_kim', 'david.kim@campusconnect.edu', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'David Kim', 'STUDENT', TRUE);

-- 2. Insert Student Profiles
INSERT INTO students (id, user_id, student_id, first_name, last_name, email, department, academic_year, gpa, skills, profile_status) VALUES
(1, 4, 'STU-2024-001', 'Alex', 'Chen', 'alex.chen@campusconnect.edu', 'Computer Science', 4, 3.85, 'Java, Spring Boot, React, Docker, PostgreSQL', 'ACTIVE'),
(2, 5, 'STU-2024-002', 'Priya', 'Sharma', 'priya.sharma@campusconnect.edu', 'Computer Science', 4, 3.92, 'Python, Machine Learning, Java, React, SQL', 'ACTIVE'),
(3, 6, 'STU-2024-003', 'Marcus', 'Vance', 'marcus.vance@campusconnect.edu', 'Information Technology', 3, 3.45, 'JavaScript, Node.js, HTML/CSS, React, MongoDB', 'ACTIVE'),
(4, 7, 'STU-2024-004', 'Ananya', 'Iyer', 'ananya.iyer@campusconnect.edu', 'Electronics & Comm', 4, 3.78, 'Embedded C, IoT, Python, Java, System Design', 'ACTIVE'),
(5, 8, 'STU-2024-005', 'David', 'Kim', 'david.kim@campusconnect.edu', 'Computer Science', 2, 3.60, 'Java, Data Structures, Git, Web Basics', 'ACTIVE'),
(6, NULL, 'STU-2024-006', 'Rohan', 'Verma', 'rohan.verma@campusconnect.edu', 'Information Technology', 4, 3.20, 'PHP, MySQL, HTML5, Bootstrap, QA Testing', 'ACTIVE');

-- 3. Insert Courses
INSERT INTO courses (id, course_code, title, description, department, credits, instructor_name, capacity, semester) VALUES
(1, 'CS-301', 'Enterprise Java & Spring Boot', 'Comprehensive course covering OOP, Spring MVC, REST APIs, JPA, and cloud deployment.', 'Computer Science', 4, 'Prof. John Doe', 45, 'Fall 2026'),
(2, 'CS-305', 'Database Systems & SQL Optimization', 'Relational database architecture, normalization, indexing, JDBC internals, and transactions.', 'Computer Science', 3, 'Prof. Alan Turing', 40, 'Fall 2026'),
(3, 'IT-204', 'Modern Full-Stack Web Development', 'React.js, component architecture, state management, HTTP communication, and modern UI design.', 'Information Technology', 4, 'Prof. John Doe', 50, 'Fall 2026'),
(4, 'EC-410', 'Cloud Computing & Microservices', 'Distributed systems design, REST contract design, containerization, and monitoring.', 'Electronics & Comm', 3, 'Dr. Sarah Mitchell', 35, 'Fall 2026');

-- 4. Insert Course Enrollments
INSERT INTO enrollments (id, student_id, course_id, enrollment_date, grade, status) VALUES
(1, 1, 1, '2026-08-15', 'A', 'COMPLETED'),
(2, 1, 2, '2026-08-15', 'A-', 'COMPLETED'),
(3, 1, 3, '2026-09-01', 'IP', 'ENROLLED'),
(4, 2, 1, '2026-08-15', 'A', 'COMPLETED'),
(5, 2, 2, '2026-08-15', 'A', 'COMPLETED'),
(6, 3, 3, '2026-09-01', 'B+', 'ENROLLED'),
(7, 4, 1, '2026-08-15', 'A-', 'COMPLETED'),
(8, 4, 4, '2026-09-01', 'IP', 'ENROLLED'),
(9, 5, 1, '2026-09-05', 'IP', 'ENROLLED'),
(10, 6, 3, '2026-09-05', 'B', 'ENROLLED');

-- 5. Insert Placement Opportunities
INSERT INTO placement_opportunities (id, company_name, job_role, description, eligible_departments, min_gpa, package_lpa, location, application_deadline, status) VALUES
(1, 'Google Cloud Labs', 'Associate Cloud Software Engineer', 'Design and implement resilient backend microservices in Java/Go. Work with distributed databases.', 'Computer Science, Information Technology', 3.70, 18.50, 'Bangalore / Hybrid', '2026-12-15', 'OPEN'),
(2, 'Oracle Corporation', 'Java Systems Developer', 'Develop enterprise application components, high-throughput database drivers, and cloud middleware.', 'Computer Science, Information Technology, Electronics & Comm', 3.40, 14.00, 'Hyderabad', '2026-11-30', 'OPEN'),
(3, 'Microsoft IDC', 'Full-Stack Developer Intern', 'Build modern customer-facing web apps with React, TypeScript, and Java microservice backends.', 'Computer Science, Information Technology', 3.60, 16.00, 'Noida / Bangalore', '2026-12-01', 'OPEN'),
(4, 'Infosys Technologies', 'Systems Engineer Specialist', 'End-to-end enterprise digital transformation, API integration, and database operations.', 'Computer Science, Information Technology, Electronics & Comm', 3.00, 7.50, 'Pune', '2026-10-30', 'CLOSED');

-- 6. Insert Placement Applications
INSERT INTO placement_applications (id, student_id, opportunity_id, applied_date, status, notes) VALUES
(1, 1, 1, '2026-10-01', 'SHORTLISTED', 'Coding round cleared with 100% test cases passed.'),
(2, 1, 2, '2026-10-05', 'INTERVIEWING', 'Technical Round 1 scheduled for next Monday.'),
(3, 2, 1, '2026-10-02', 'SELECTED', 'Offered role with 18.5 LPA package. Acceptance received.'),
(4, 2, 3, '2026-10-03', 'SHORTLISTED', 'Resume shortlisted by engineering panel.'),
(5, 3, 3, '2026-10-08', 'APPLIED', 'Application under preliminary screening.'),
(6, 4, 2, '2026-10-10', 'APPLIED', 'Eligibility verified. Waiting for test link.');
