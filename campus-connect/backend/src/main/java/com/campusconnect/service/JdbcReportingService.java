package com.campusconnect.service;

import com.campusconnect.dto.DepartmentReportDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.*;
import java.util.*;

/**
 * ============================================================================
 * JDBC DEMONSTRATION SERVICE
 * ============================================================================
 * 
 * ARCHITECTURAL COMPARISON: JDBC vs. Spring Data JPA
 * 
 * 1. Why JDBC is used here:
 *    - Direct Database Control: Raw SQL execution without ORM abstraction layer.
 *    - High-Performance Aggregations: Complex multi-table reporting queries with
 *      custom aggregations, GROUP BY, and HAVING are often faster and simpler to
 *      express in native SQL than complex JPQL or Criteria API queries.
 *    - Memory Efficiency: Streams data directly into lightweight DTOs without
 *      allocating heavyweight Hibernate managed entities in the 1st-level cache.
 *    - Low-Level API Mastery: Demonstrates core Java Enterprise fundamentals:
 *      DataSource, Connection, PreparedStatement, Statement, ResultSet,
 *      and ResultSetMetaData.
 * 
 * 2. Why Spring Data JPA is used for the rest of CampusConnect:
 *    - Productivity & Boilerplate Reduction: Automatic CRUD generation.
 *    - Object-Relational Mapping (ORM): Automatic synchronization between Java objects
 *      and relational tables.
 *    - Unit of Work & Dirty Checking: Automatically detects changes to entities
 *      and executes minimal UPDATE statements upon transaction commit.
 *    - Entity Relationships: Elegant management of @ManyToOne, @OneToMany, and cascading.
 * 
 * ============================================================================
 */
@Service
public class JdbcReportingService {

    private static final Logger log = LoggerFactory.getLogger(JdbcReportingService.class);

    private final DataSource dataSource;

    // Demonstrating Constructor-based Dependency Injection
    public JdbcReportingService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    /**
     * Executes a low-level SQL analytical query using PreparedStatement and ResultSet.
     * Computes cross-departmental metrics by joining students, enrollments,
     * courses, and placement applications.
     */
    public List<DepartmentReportDTO> getDepartmentAnalyticsReport() {
        String sql = """
            SELECT 
                s.department AS dept_name,
                COUNT(DISTINCT s.id) AS total_students,
                ROUND(COALESCE(AVG(s.gpa), 0.0), 2) AS avg_gpa,
                COUNT(DISTINCT c.id) AS total_courses,
                COUNT(DISTINCT e.id) AS total_enrollments,
                COUNT(DISTINCT pa.id) AS total_applications,
                SUM(CASE WHEN pa.status = 'SELECTED' THEN 1 ELSE 0 END) AS selected_students,
                ROUND((SUM(CASE WHEN pa.status = 'SELECTED' THEN 1 ELSE 0 END) * 100.0) / 
                      NULLIF(COUNT(DISTINCT s.id), 0), 2) AS selection_rate_pct,
                COALESCE(MAX(CASE WHEN pa.status = 'SELECTED' THEN po.package_lpa ELSE 0 END), 0.0) AS max_pkg_lpa
            FROM students s
            LEFT JOIN enrollments e ON s.id = e.student_id
            LEFT JOIN courses c ON e.course_id = c.id
            LEFT JOIN placement_applications pa ON s.id = pa.student_id
            LEFT JOIN placement_opportunities po ON pa.opportunity_id = po.id
            GROUP BY s.department
            ORDER BY total_students DESC
        """;

        List<DepartmentReportDTO> report = new ArrayList<>();

        // Using try-with-resources for deterministic closing of Connection, PreparedStatement, and ResultSet
        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            log.info("[JDBC Demonstration] Successfully obtained Connection: {} from DataSource", conn.getClass().getName());

            // Inspecting metadata via ResultSetMetaData (Low-level JDBC API)
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();
            log.debug("[JDBC Demonstration] Query executed. Columns returned: {}", columnCount);

            while (rs.next()) {
                DepartmentReportDTO dto = new DepartmentReportDTO();
                dto.setDepartment(rs.getString("dept_name"));
                dto.setTotalStudents(rs.getLong("total_students"));
                dto.setAverageGpa(rs.getDouble("avg_gpa"));
                dto.setTotalCourses(rs.getLong("total_courses"));
                dto.setTotalEnrollments(rs.getLong("total_enrollments"));
                dto.setPlacementApplications(rs.getLong("total_applications"));
                dto.setPlacedStudents(rs.getLong("selected_students"));
                dto.setPlacementRatePercentage(rs.getDouble("selection_rate_pct"));
                dto.setHighestPackageLpa(rs.getBigDecimal("max_pkg_lpa"));

                report.add(dto);
            }

        } catch (SQLException ex) {
            log.error("[JDBC Demonstration] Database error executing analytical query", ex);
            throw new RuntimeException("JDBC query execution failed: " + ex.getMessage(), ex);
        }

        return report;
    }

    /**
     * Demonstrates java.sql.Statement and parameterless query for placement salary tiers.
     */
    public Map<String, Object> getSalaryDistributionStats() {
        String sql = """
            SELECT 
                COUNT(*) AS total_placements,
                COALESCE(MIN(package_lpa), 0.0) AS min_package,
                COALESCE(MAX(package_lpa), 0.0) AS max_package,
                ROUND(COALESCE(AVG(package_lpa), 0.0), 2) AS avg_package
            FROM placement_opportunities
            WHERE status = 'OPEN'
        """;

        Map<String, Object> stats = new LinkedHashMap<>();

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            if (rs.next()) {
                stats.put("totalOpenRoles", rs.getLong("total_placements"));
                stats.put("minPackageLpa", rs.getBigDecimal("min_package"));
                stats.put("maxPackageLpa", rs.getBigDecimal("max_package"));
                stats.put("avgPackageLpa", rs.getDouble("avg_package"));
            }

            stats.put("queryEngine", "Low-Level JDBC API (java.sql.Statement)");
            stats.put("driverClass", conn.getMetaData().getDriverName());

        } catch (SQLException ex) {
            log.error("[JDBC Demonstration] Error calculating salary statistics", ex);
            throw new RuntimeException("JDBC stats query failed: " + ex.getMessage(), ex);
        }

        return stats;
    }
}
