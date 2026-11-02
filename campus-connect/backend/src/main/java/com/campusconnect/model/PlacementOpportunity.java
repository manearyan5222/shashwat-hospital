package com.campusconnect.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "placement_opportunities")
public class PlacementOpportunity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false, length = 100)
    private String companyName;

    @Column(name = "job_role", nullable = false, length = 100)
    private String jobRole;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "eligible_departments", nullable = false)
    private String eligibleDepartments; // e.g., 'Computer Science, Information Technology'

    @Column(name = "min_gpa", nullable = false, precision = 3, scale = 2)
    private BigDecimal minGpa = new BigDecimal("3.00");

    @Column(name = "package_lpa", nullable = false, precision = 5, scale = 2)
    private BigDecimal packageLpa;

    @Column(nullable = false, length = 100)
    private String location = "Bangalore / Remote";

    @Column(name = "application_deadline", nullable = false)
    private LocalDate applicationDeadline;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OpportunityStatus status = OpportunityStatus.OPEN;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public PlacementOpportunity() {
    }

    public PlacementOpportunity(String companyName, String jobRole, String description,
                                String eligibleDepartments, BigDecimal minGpa, BigDecimal packageLpa,
                                String location, LocalDate applicationDeadline, OpportunityStatus status) {
        this.companyName = companyName;
        this.jobRole = jobRole;
        this.description = description;
        this.eligibleDepartments = eligibleDepartments;
        this.minGpa = minGpa;
        this.packageLpa = packageLpa;
        this.location = location;
        this.applicationDeadline = applicationDeadline;
        this.status = status != null ? status : OpportunityStatus.OPEN;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
