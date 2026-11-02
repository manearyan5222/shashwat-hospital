package com.campusconnect.dto;

import com.campusconnect.model.OpportunityStatus;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class PlacementOpportunityDTO {

    private Long id;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Job role is required")
    private String jobRole;

    @NotBlank(message = "Job description is required")
    private String description;

    @NotBlank(message = "Eligible departments are required")
    private String eligibleDepartments;

    @NotNull(message = "Minimum GPA is required")
    @DecimalMin(value = "0.00", message = "Min GPA cannot be negative")
    @DecimalMax(value = "4.00", message = "Min GPA cannot exceed 4.00")
    private BigDecimal minGpa;

    @NotNull(message = "Package LPA is required")
    @DecimalMin(value = "1.00", message = "Package LPA must be positive")
    private BigDecimal packageLpa;

    private String location = "Bangalore / Remote";

    @NotNull(message = "Application deadline is required")
    @FutureOrPresent(message = "Deadline must be today or in the future")
    private LocalDate applicationDeadline;

    private OpportunityStatus status = OpportunityStatus.OPEN;

    private long totalApplications = 0;

    public PlacementOpportunityDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEligibleDepartments() {
        return eligibleDepartments;
    }

    public void setEligibleDepartments(String eligibleDepartments) {
        this.eligibleDepartments = eligibleDepartments;
    }

    public BigDecimal getMinGpa() {
        return minGpa;
    }

    public void setMinGpa(BigDecimal minGpa) {
        this.minGpa = minGpa;
    }

    public BigDecimal getPackageLpa() {
        return packageLpa;
    }

    public void setPackageLpa(BigDecimal packageLpa) {
        this.packageLpa = packageLpa;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getApplicationDeadline() {
        return applicationDeadline;
    }

    public void setApplicationDeadline(LocalDate applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }

    public OpportunityStatus getStatus() {
        return status;
    }

    public void setStatus(OpportunityStatus status) {
        this.status = status;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }
}
