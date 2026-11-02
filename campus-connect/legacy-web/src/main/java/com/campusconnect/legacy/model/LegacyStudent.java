package com.campusconnect.legacy.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Legacy Java Bean representing a Student Model in classic MVC.
 * Adheres to standard JavaBeans conventions:
 * - Public default no-arg constructor
 * - Private properties with getter/setter methods
 * - Implements java.io.Serializable
 */
public class LegacyStudent implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String studentId;
    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private int academicYear;
    private BigDecimal gpa;
    private String skills;
    private String status;

    public LegacyStudent() {
    }

    public LegacyStudent(Long id, String studentId, String firstName, String lastName,
                         String email, String department, int academicYear, BigDecimal gpa,
                         String skills, String status) {
        this.id = id;
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
        this.academicYear = academicYear;
        this.gpa = gpa;
        this.skills = skills;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(int academicYear) {
        this.academicYear = academicYear;
    }

    public BigDecimal getGpa() {
        return gpa;
    }

    public void setGpa(BigDecimal gpa) {
        this.gpa = gpa;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
