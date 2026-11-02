package com.campusconnect.dto;

import java.math.BigDecimal;

/**
 * DepartmentReportDTO
 * Data transfer object populated directly via low-level JDBC ResultSet
 * demonstration in JdbcReportingService.
 */
public class DepartmentReportDTO {

    private String department;
    private long totalStudents;
    private double averageGpa;
    private long totalCourses;
    private long totalEnrollments;
    private long placementApplications;
    private long placedStudents;
    private double placementRatePercentage;
    private BigDecimal highestPackageLpa;

    public DepartmentReportDTO() {
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public double getAverageGpa() {
        return averageGpa;
    }

    public void setAverageGpa(double averageGpa) {
        this.averageGpa = averageGpa;
    }

    public long getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(long totalCourses) {
        this.totalCourses = totalCourses;
    }

    public long getTotalEnrollments() {
        return totalEnrollments;
    }

    public void setTotalEnrollments(long totalEnrollments) {
        this.totalEnrollments = totalEnrollments;
    }

    public long getPlacementApplications() {
        return placementApplications;
    }

    public void setPlacementApplications(long placementApplications) {
        this.placementApplications = placementApplications;
    }

    public long getPlacedStudents() {
        return placedStudents;
    }

    public void setPlacedStudents(long placedStudents) {
        this.placedStudents = placedStudents;
    }

    public double getPlacementRatePercentage() {
        return placementRatePercentage;
    }

    public void setPlacementRatePercentage(double placementRatePercentage) {
        this.placementRatePercentage = placementRatePercentage;
    }

    public BigDecimal getHighestPackageLpa() {
        return highestPackageLpa;
    }

    public void setHighestPackageLpa(BigDecimal highestPackageLpa) {
        this.highestPackageLpa = highestPackageLpa;
    }
}
