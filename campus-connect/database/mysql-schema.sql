-- ============================================================================
-- CampusConnect Portal - MySQL Database Schema
-- Compatible with MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS campus_connect
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE campus_connect;

-- Disable foreign key checks during creation/re-creation
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Users Table (Authentication & Role-Based Access)
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'STUDENT', -- 'STUDENT', 'FACULTY', 'ADMIN'
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_username (username),
    INDEX idx_user_role (role)
) ENGINE=InnoDB;

-- 2. Students Profile Table
DROP TABLE IF EXISTS students;
CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE,
    student_id VARCHAR(20) NOT NULL UNIQUE, -- Institutional ID, e.g. STU-2024-001
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(50) NOT NULL,        -- 'Computer Science', 'Information Tech', 'Electronics', etc.
    academic_year INT NOT NULL,              -- 1, 2, 3, 4
    gpa DECIMAL(3, 2) NOT NULL DEFAULT 0.00, -- e.g. 3.85
    skills TEXT,                             -- Comma-separated: 'Java, Spring Boot, React, MySQL'
    profile_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'INACTIVE', 'GRADUATED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_student_dept (department),
    INDEX idx_student_status (profile_status)
) ENGINE=InnoDB;

-- 3. Courses Table
DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL UNIQUE, -- e.g. CS101, IT302
    title VARCHAR(150) NOT NULL,
    description TEXT,
    department VARCHAR(50) NOT NULL,
    credits INT NOT NULL DEFAULT 3,
    instructor_name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL DEFAULT 40,
    semester VARCHAR(20) NOT NULL DEFAULT 'Fall 2026',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_course_code (course_code),
    INDEX idx_course_dept (department)
) ENGINE=InnoDB;

-- 4. Course Enrollments Table (Many-to-Many relation with attributes)
DROP TABLE IF EXISTS enrollments;
CREATE TABLE enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    enrollment_date DATE NOT NULL,
    grade VARCHAR(5) DEFAULT NULL, -- 'A', 'A-', 'B+', 'B', 'C', 'F', 'IP' (In Progress)
    status VARCHAR(20) NOT NULL DEFAULT 'ENROLLED', -- 'ENROLLED', 'COMPLETED', 'DROPPED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_enroll_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_enroll_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT uk_student_course UNIQUE (student_id, course_id),
    INDEX idx_enroll_student (student_id),
    INDEX idx_enroll_course (course_id)
) ENGINE=InnoDB;

-- 5. Placement Opportunities Table
DROP TABLE IF EXISTS placement_opportunities;
CREATE TABLE placement_opportunities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    job_role VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    eligible_departments VARCHAR(255) NOT NULL, -- Comma-separated: 'Computer Science, Information Tech'
    min_gpa DECIMAL(3, 2) NOT NULL DEFAULT 3.00,
    package_lpa DECIMAL(5, 2) NOT NULL, -- CTC in LPA (e.g. 12.50)
    location VARCHAR(100) NOT NULL DEFAULT 'Bangalore / Remote',
    application_deadline DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN', -- 'OPEN', 'CLOSED', 'ARCHIVED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_placement_status (status),
    INDEX idx_placement_company (company_name)
) ENGINE=InnoDB;

-- 6. Placement Applications Table
DROP TABLE IF EXISTS placement_applications;
CREATE TABLE placement_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    opportunity_id BIGINT NOT NULL,
    applied_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'APPLIED', -- 'APPLIED', 'SHORTLISTED', 'INTERVIEWING', 'SELECTED', 'REJECTED'
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_app_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_app_opportunity FOREIGN KEY (opportunity_id) REFERENCES placement_opportunities(id) ON DELETE CASCADE,
    CONSTRAINT uk_student_opportunity UNIQUE (student_id, opportunity_id),
    INDEX idx_app_student (student_id),
    INDEX idx_app_opportunity (opportunity_id),
    INDEX idx_app_status (status)
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;
