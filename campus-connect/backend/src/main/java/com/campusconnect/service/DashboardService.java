package com.campusconnect.service;

import com.campusconnect.dto.DashboardSummaryDTO;
import com.campusconnect.model.ApplicationStatus;
import com.campusconnect.model.EnrollmentStatus;
import com.campusconnect.model.OpportunityStatus;
import com.campusconnect.repository.*;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PlacementOpportunityRepository opportunityRepository;
    private final PlacementApplicationRepository applicationRepository;

    public DashboardService(StudentRepository studentRepository,
                            CourseRepository courseRepository,
                            EnrollmentRepository enrollmentRepository,
                            PlacementOpportunityRepository opportunityRepository,
                            PlacementApplicationRepository applicationRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.opportunityRepository = opportunityRepository;
        this.applicationRepository = applicationRepository;
    }

    public DashboardSummaryDTO getDashboardSummary() {
        DashboardSummaryDTO summary = new DashboardSummaryDTO();

        long totalStudents = studentRepository.count();
        long activeStudents = studentRepository.countActiveStudents();
        long totalCourses = courseRepository.count();
        long activeEnrollments = enrollmentRepository.countByStatus(EnrollmentStatus.ENROLLED);
        long totalOpportunities = opportunityRepository.count();
        long openOpportunities = opportunityRepository.countByStatus(OpportunityStatus.OPEN);
        long totalApplications = applicationRepository.count();
        long placedStudents = applicationRepository.countDistinctPlacedStudents();

        double placementRate = totalStudents > 0
                ? Math.round(((double) placedStudents / totalStudents) * 10000.0) / 100.0
                : 0.0;

        // Department breakdown
        List<Object[]> deptResults = studentRepository.countStudentsByDepartment();
        Map<String, Long> deptMap = new LinkedHashMap<>();
        for (Object[] row : deptResults) {
            String dept = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            deptMap.put(dept, count);
        }

        summary.setTotalStudents(totalStudents);
        summary.setActiveStudents(activeStudents);
        summary.setTotalCourses(totalCourses);
        summary.setActiveEnrollments(activeEnrollments);
        summary.setTotalOpportunities(totalOpportunities);
        summary.setOpenOpportunities(openOpportunities);
        summary.setTotalApplications(totalApplications);
        summary.setPlacedStudents(placedStudents);
        summary.setPlacementRatePercentage(placementRate);
        summary.setStudentsByDepartment(deptMap);

        return summary;
    }
}
