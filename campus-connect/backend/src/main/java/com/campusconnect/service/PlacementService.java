package com.campusconnect.service;

import com.campusconnect.dto.PlacementApplicationDTO;
import com.campusconnect.dto.PlacementOpportunityDTO;
import com.campusconnect.exception.BadRequestException;
import com.campusconnect.exception.DuplicateResourceException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.model.*;
import com.campusconnect.repository.PlacementApplicationRepository;
import com.campusconnect.repository.PlacementOpportunityRepository;
import com.campusconnect.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlacementService {

    private final PlacementOpportunityRepository opportunityRepository;
    private final PlacementApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;

    public PlacementService(PlacementOpportunityRepository opportunityRepository,
                            PlacementApplicationRepository applicationRepository,
                            StudentRepository studentRepository) {
        this.opportunityRepository = opportunityRepository;
        this.applicationRepository = applicationRepository;
        this.studentRepository = studentRepository;
    }

    // Opportunity Operations
    public Page<PlacementOpportunityDTO> getAllOpportunities(String query, OpportunityStatus status, Pageable pageable) {
        return opportunityRepository.searchOpportunities(query, status, pageable)
                .map(this::mapOpportunityToDTO);
    }

    public PlacementOpportunityDTO getOpportunityById(Long id) {
        PlacementOpportunity opp = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Placement opportunity not found with ID: " + id));
        return mapOpportunityToDTO(opp);
    }

    @Transactional
    public PlacementOpportunityDTO createOpportunity(PlacementOpportunityDTO dto) {
        PlacementOpportunity opp = new PlacementOpportunity();
        mapOpportunityFromDTO(dto, opp);
        PlacementOpportunity saved = opportunityRepository.save(opp);
        return mapOpportunityToDTO(saved);
    }

    @Transactional
    public PlacementOpportunityDTO updateOpportunity(Long id, PlacementOpportunityDTO dto) {
        PlacementOpportunity opp = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Placement opportunity not found with ID: " + id));
        mapOpportunityFromDTO(dto, opp);
        PlacementOpportunity updated = opportunityRepository.save(opp);
        return mapOpportunityToDTO(updated);
    }

    @Transactional
    public void deleteOpportunity(Long id) {
        if (!opportunityRepository.existsById(id)) {
            throw new ResourceNotFoundException("Placement opportunity not found with ID: " + id);
        }
        opportunityRepository.deleteById(id);
    }

    // Application Operations
    public List<PlacementApplicationDTO> getApplicationsByStudent(Long studentId) {
        return applicationRepository.findByStudentId(studentId).stream()
                .map(this::mapApplicationToDTO)
                .collect(Collectors.toList());
    }

    public List<PlacementApplicationDTO> getApplicationsByOpportunity(Long opportunityId) {
        return applicationRepository.findByOpportunityId(opportunityId).stream()
                .map(this::mapApplicationToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PlacementApplicationDTO applyForOpportunity(PlacementApplicationDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + dto.getStudentId()));

        PlacementOpportunity opportunity = opportunityRepository.findById(dto.getOpportunityId())
                .orElseThrow(() -> new ResourceNotFoundException("Placement opportunity not found with ID: " + dto.getOpportunityId()));

        if (opportunity.getStatus() != OpportunityStatus.OPEN) {
            throw new BadRequestException("This placement drive is currently " + opportunity.getStatus() + ". Applications are closed.");
        }

        if (opportunity.getApplicationDeadline().isBefore(LocalDate.now())) {
            throw new BadRequestException("The application deadline (" + opportunity.getApplicationDeadline() + ") has already passed.");
        }

        if (applicationRepository.existsByStudentIdAndOpportunityId(student.getId(), opportunity.getId())) {
            throw new DuplicateResourceException("You have already submitted an application for " + opportunity.getCompanyName());
        }

        // Eligibility check 1: GPA
        if (student.getGpa().compareTo(opportunity.getMinGpa()) < 0) {
            throw new BadRequestException("Student GPA (" + student.getGpa() + ") does not meet the minimum requirement (" +
                    opportunity.getMinGpa() + ") for this role.");
        }

        // Eligibility check 2: Department
        List<String> eligibleDepts = Arrays.stream(opportunity.getEligibleDepartments().split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .toList();

        if (!eligibleDepts.contains("all") && !eligibleDepts.contains(student.getDepartment().toLowerCase())) {
            throw new BadRequestException("Student department ('" + student.getDepartment() +
                    "') is not eligible. Eligible departments: " + opportunity.getEligibleDepartments());
        }

        PlacementApplication app = new PlacementApplication(
                student,
                opportunity,
                dto.getAppliedDate() != null ? dto.getAppliedDate() : LocalDate.now(),
                ApplicationStatus.APPLIED,
                dto.getNotes()
        );

        PlacementApplication saved = applicationRepository.save(app);
        return mapApplicationToDTO(saved);
    }

    @Transactional
    public PlacementApplicationDTO updateApplicationStatus(Long id, ApplicationStatus status, String notes) {
        PlacementApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + id));

        app.setStatus(status);
        if (notes != null) {
            app.setNotes(notes);
        }

        PlacementApplication updated = applicationRepository.save(app);
        return mapApplicationToDTO(updated);
    }

    // Mapping Helpers
    public PlacementOpportunityDTO mapOpportunityToDTO(PlacementOpportunity opp) {
        PlacementOpportunityDTO dto = new PlacementOpportunityDTO();
        dto.setId(opp.getId());
        dto.setCompanyName(opp.getCompanyName());
        dto.setJobRole(opp.getJobRole());
        dto.setDescription(opp.getDescription());
        dto.setEligibleDepartments(opp.getEligibleDepartments());
        dto.setMinGpa(opp.getMinGpa());
        dto.setPackageLpa(opp.getPackageLpa());
        dto.setLocation(opp.getLocation());
        dto.setApplicationDeadline(opp.getApplicationDeadline());
        dto.setStatus(opp.getStatus());
        dto.setTotalApplications(applicationRepository.findByOpportunityId(opp.getId()).size());
        return dto;
    }

    private void mapOpportunityFromDTO(PlacementOpportunityDTO dto, PlacementOpportunity opp) {
        opp.setCompanyName(dto.getCompanyName());
        opp.setJobRole(dto.getJobRole());
        opp.setDescription(dto.getDescription());
        opp.setEligibleDepartments(dto.getEligibleDepartments());
        opp.setMinGpa(dto.getMinGpa());
        opp.setPackageLpa(dto.getPackageLpa());
        if (dto.getLocation() != null) {
            opp.setLocation(dto.getLocation());
        }
        opp.setApplicationDeadline(dto.getApplicationDeadline());
        if (dto.getStatus() != null) {
            opp.setStatus(dto.getStatus());
        }
    }

    public PlacementApplicationDTO mapApplicationToDTO(PlacementApplication app) {
        PlacementApplicationDTO dto = new PlacementApplicationDTO();
        dto.setId(app.getId());
        dto.setStudentId(app.getStudent().getId());
        dto.setStudentName(app.getStudent().getFullName());
        dto.setStudentCode(app.getStudent().getStudentId());
        dto.setDepartment(app.getStudent().getDepartment());
        dto.setStudentGpa(app.getStudent().getGpa());
        dto.setOpportunityId(app.getOpportunity().getId());
        dto.setCompanyName(app.getOpportunity().getCompanyName());
        dto.setJobRole(app.getOpportunity().getJobRole());
        dto.setPackageLpa(app.getOpportunity().getPackageLpa());
        dto.setAppliedDate(app.getAppliedDate());
        dto.setStatus(app.getStatus());
        dto.setNotes(app.getNotes());
        return dto;
    }
}
