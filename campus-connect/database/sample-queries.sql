-- ============================================================================
-- CampusConnect Portal - Educational Sample SQL Queries
-- Demonstrates: Simple SELECT, INNER/LEFT JOIN, Aggregate Functions,
-- GROUP BY, HAVING, Subqueries, and Complex Placement Analytics.
-- ============================================================================

USE campus_connect;

-- ----------------------------------------------------------------------------
-- 1. Simple SELECT with filtering, ordering, and aliases
-- ----------------------------------------------------------------------------
SELECT 
    student_id,
    CONCAT(first_name, ' ', last_name) AS full_name,
    department,
    academic_year,
    gpa,
    profile_status
FROM students
WHERE profile_status = 'ACTIVE' AND gpa >= 3.50
ORDER BY gpa DESC;

-- ----------------------------------------------------------------------------
-- 2. Multi-Table INNER JOIN: Student Enrollment Roster with Course Details
-- ----------------------------------------------------------------------------
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    c.course_code,
    c.title AS course_title,
    c.credits,
    e.enrollment_date,
    e.grade,
    e.status AS enrollment_status
FROM enrollments e
INNER JOIN students s ON e.student_id = s.id
INNER JOIN courses c ON e.course_id = c.id
ORDER BY s.student_id ASC, c.course_code ASC;

-- ----------------------------------------------------------------------------
-- 3. Departmental Course & Enrollment Aggregation (GROUP BY & HAVING)
-- ----------------------------------------------------------------------------
SELECT 
    c.department,
    COUNT(DISTINCT c.id) AS total_courses,
    COUNT(e.id) AS total_enrollments,
    COALESCE(AVG(s.gpa), 0.0) AS avg_enrolled_student_gpa
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
LEFT JOIN students s ON e.student_id = s.id
GROUP BY c.department
HAVING total_courses > 0
ORDER BY total_enrollments DESC;

-- ----------------------------------------------------------------------------
-- 4. Placement Analytics: Student Selection Rate & Maximum CTC by Department
-- (This query is also mirrored in our low-level JDBC Reporting Service)
-- ----------------------------------------------------------------------------
SELECT 
    s.department,
    COUNT(DISTINCT s.id) AS total_candidates,
    COUNT(DISTINCT pa.id) AS total_applications,
    SUM(CASE WHEN pa.status = 'SELECTED' THEN 1 ELSE 0 END) AS selected_count,
    ROUND(
        (SUM(CASE WHEN pa.status = 'SELECTED' THEN 1 ELSE 0 END) * 100.0) / 
        NULLIF(COUNT(DISTINCT s.id), 0), 2
    ) AS selection_rate_percentage,
    COALESCE(MAX(CASE WHEN pa.status = 'SELECTED' THEN po.package_lpa ELSE 0 END), 0.0) AS highest_package_lpa
FROM students s
LEFT JOIN placement_applications pa ON s.id = pa.student_id
LEFT JOIN placement_opportunities po ON pa.opportunity_id = po.id
GROUP BY s.department
ORDER BY selected_count DESC;

-- ----------------------------------------------------------------------------
-- 5. Subquery Demonstration: Find Students Eligible for a High-Package Role
-- ----------------------------------------------------------------------------
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS candidate_name,
    s.department,
    s.gpa,
    s.skills
FROM students s
WHERE s.gpa >= (
    SELECT min_gpa 
    FROM placement_opportunities 
    WHERE company_name = 'Google Cloud Labs' 
    LIMIT 1
)
AND s.department IN ('Computer Science', 'Information Technology')
ORDER BY s.gpa DESC;
