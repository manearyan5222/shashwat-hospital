-- ============================================================================
-- CampusConnect Portal - Oracle Database Schema (Compatibility Demonstration)
-- Compatible with Oracle 19c, 21c, and 23ai
-- ============================================================================
-- NOTES ON ORACLE vs. MYSQL COMPATIBILITY:
-- 1. Identifiers & Primary Keys:
--    - MySQL uses 'AUTO_INCREMENT'
--    - Oracle 12c+ uses 'GENERATED ALWAYS AS IDENTITY' (or sequences & triggers)
-- 2. Data Types:
--    - VARCHAR -> VARCHAR2(size)
--    - BIGINT -> NUMBER(19)
--    - INT -> NUMBER(10)
--    - DECIMAL(p, s) -> NUMBER(p, s)
--    - BOOLEAN -> NUMBER(1) (where 1=TRUE, 0=FALSE; Oracle 23c introduced BOOLEAN)
--    - TEXT -> CLOB
-- 3. Case Sensitivity:
--    - Oracle stores unquoted identifiers in UPPERCASE by default.
-- ============================================================================

-- 1. Users Table
CREATE TABLE users (
    id NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR2(50) NOT NULL UNIQUE,
    email VARCHAR2(100) NOT NULL UNIQUE,
    password_hash VARCHAR2(255) NOT NULL,
    full_name VARCHAR2(100) NOT NULL,
    role VARCHAR2(20) DEFAULT 'STUDENT' NOT NULL,
    enabled NUMBER(1) DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Students Table
CREATE TABLE students (
    id NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id NUMBER(19) UNIQUE,
    student_id VARCHAR2(20) NOT NULL UNIQUE,
    first_name VARCHAR2(50) NOT NULL,
    last_name VARCHAR2(50) NOT NULL,
    email VARCHAR2(100) NOT NULL UNIQUE,
    department VARCHAR2(50) NOT NULL,
    academic_year NUMBER(10) NOT NULL,
    gpa NUMBER(3, 2) DEFAULT 0.00 NOT NULL,
    skills CLOB,
    profile_status VARCHAR2(20) DEFAULT 'ACTIVE' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ora_student_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. Courses Table
CREATE TABLE courses (
    id NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course_code VARCHAR2(20) NOT NULL UNIQUE,
    title VARCHAR2(150) NOT NULL,
    description CLOB,
    department VARCHAR2(50) NOT NULL,
    credits NUMBER(10) DEFAULT 3 NOT NULL,
    instructor_name VARCHAR2(100) NOT NULL,
    capacity NUMBER(10) DEFAULT 40 NOT NULL,
    semester VARCHAR2(20) DEFAULT 'Fall 2026',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Enrollments Table
CREATE TABLE enrollments (
    id NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id NUMBER(19) NOT NULL,
    course_id NUMBER(19) NOT NULL,
    enrollment_date DATE NOT NULL,
    grade VARCHAR2(5),
    status VARCHAR2(20) DEFAULT 'ENROLLED' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ora_enroll_stu FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_ora_enroll_crs FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT uk_ora_stu_crs UNIQUE (student_id, course_id)
);

-- 5. Placement Opportunities Table
CREATE TABLE placement_opportunities (
    id NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_name VARCHAR2(100) NOT NULL,
    job_role VARCHAR2(100) NOT NULL,
    description CLOB NOT NULL,
    eligible_departments VARCHAR2(255) NOT NULL,
    min_gpa NUMBER(3, 2) DEFAULT 3.00 NOT NULL,
    package_lpa NUMBER(5, 2) NOT NULL,
    location VARCHAR2(100) DEFAULT 'Bangalore / Remote',
    application_deadline DATE NOT NULL,
    status VARCHAR2(20) DEFAULT 'OPEN' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Placement Applications Table
CREATE TABLE placement_applications (
    id NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id NUMBER(19) NOT NULL,
    opportunity_id NUMBER(19) NOT NULL,
    applied_date DATE NOT NULL,
    status VARCHAR2(20) DEFAULT 'APPLIED' NOT NULL,
    notes CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ora_app_stu FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_ora_app_opp FOREIGN KEY (opportunity_id) REFERENCES placement_opportunities(id) ON DELETE CASCADE,
    CONSTRAINT uk_ora_stu_opp UNIQUE (student_id, opportunity_id)
);
