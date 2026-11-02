package com.campusconnect.dto;

import com.campusconnect.model.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class PlacementApplicationDTO {

    private Long id;

    @NotNull(message = "Student ID is required")
    private Long studentId;

    private String studentName;
    private String studentCode;
    private String department;
    private BigDecimal studentGpa;

    @NotNull(message = "Opportunity ID is required")
    private Long opportunityId;

    private String companyName;
    private String jobRole;
    private BigDecimal packageLpa;

    private LocalDate appliedDate;

    private ApplicationStatus status = ApplicationStatus.APPLIED;

    private String notes;

    public PlacementApplicationDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentCode() {
        return studentCode;
    }

    public void setStudentCode(String studentCode) {
        this.studentCode = studentCode;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public BigDecimal getStudentGpa() {
        return studentGpa;
    }

    public void setStudentGpa(BigDecimal studentGpa) {
        this.studentGpa = studentGpa;
    }

    public Long getOpportunityId() {
        return opportunityId;
    }

    public void setOpportunityId(Long opportunityId) {
        this.opportunityId = opportunityId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public BigDecimal getPackageLpa() {
        return packageLpa;
    }

    public void setPackageLpa(BigDecimal packageLpa) {
        this.packageLpa = packageLpa;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
