package com.campusconnect.dto;

import java.util.Map;

public class DashboardSummaryDTO {

    private long totalStudents;
    private long activeStudents;
    private long totalCourses;
    private long activeEnrollments;
    private long totalOpportunities;
    private long openOpportunities;
    private long totalApplications;
    private long placedStudents;
    private double placementRatePercentage;
    private Map<String, Long> studentsByDepartment;

    public DashboardSummaryDTO() {
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getActiveStudents() {
        return activeStudents;
    }

    public void setActiveStudents(long activeStudents) {
        this.activeStudents = activeStudents;
    }

    public long getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(long totalCourses) {
        this.totalCourses = totalCourses;
    }

    public long getActiveEnrollments() {
        return activeEnrollments;
    }

    public void setActiveEnrollments(long activeEnrollments) {
        this.activeEnrollments = activeEnrollments;
    }

    public long getTotalOpportunities() {
        return totalOpportunities;
    }

    public void setTotalOpportunities(long totalOpportunities) {
        this.totalOpportunities = totalOpportunities;
    }

    public long getOpenOpportunities() {
        return openOpportunities;
    }

    public void setOpenOpportunities(long openOpportunities) {
        this.openOpportunities = openOpportunities;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
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

    public Map<String, Long> getStudentsByDepartment() {
        return studentsByDepartment;
    }

    public void setStudentsByDepartment(Map<String, Long> studentsByDepartment) {
        this.studentsByDepartment = studentsByDepartment;
    }
}
