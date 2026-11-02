package com.campusconnect.controller;

import com.campusconnect.dto.DepartmentReportDTO;
import com.campusconnect.service.JdbcReportingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * REST Controller exposing low-level JDBC Reporting demonstrations.
 * Demonstrates:
 * - Direct JDBC PreparedStatement & Statement execution.
 * - Dynamic SQL result streaming into DTOs.
 * - Performance comparison between raw JDBC and Spring Data JPA.
 */
@RestController
@RequestMapping("/api/reports")
public class JdbcReportingController {

    private final JdbcReportingService jdbcReportingService;

    public JdbcReportingController(JdbcReportingService jdbcReportingService) {
        this.jdbcReportingService = jdbcReportingService;
    }

    @GetMapping("/department-analytics")
    public ResponseEntity<List<DepartmentReportDTO>> getDepartmentAnalytics() {
        List<DepartmentReportDTO> report = jdbcReportingService.getDepartmentAnalyticsReport();
        return ResponseEntity.ok(report);
    }

    @GetMapping("/salary-stats")
    public ResponseEntity<Map<String, Object>> getSalaryStats() {
        Map<String, Object> stats = jdbcReportingService.getSalaryDistributionStats();
        return ResponseEntity.ok(stats);
    }
}
