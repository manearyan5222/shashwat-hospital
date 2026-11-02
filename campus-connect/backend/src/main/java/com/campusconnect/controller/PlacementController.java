package com.campusconnect.controller;

import com.campusconnect.dto.PlacementApplicationDTO;
import com.campusconnect.dto.PlacementOpportunityDTO;
import com.campusconnect.model.ApplicationStatus;
import com.campusconnect.model.OpportunityStatus;
import com.campusconnect.service.PlacementService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/placements")
public class PlacementController {

    private final PlacementService placementService;

    public PlacementController(PlacementService placementService) {
        this.placementService = placementService;
    }

    // --- Opportunities ---

    @GetMapping("/opportunities")
    public ResponseEntity<Page<PlacementOpportunityDTO>> getAllOpportunities(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) OpportunityStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("DESC") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<PlacementOpportunityDTO> opportunities = placementService.getAllOpportunities(query, status, pageable);
        return ResponseEntity.ok(opportunities);
    }

    @GetMapping("/opportunities/{id}")
    public ResponseEntity<PlacementOpportunityDTO> getOpportunityById(@PathVariable Long id) {
        PlacementOpportunityDTO dto = placementService.getOpportunityById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/opportunities")
    public ResponseEntity<PlacementOpportunityDTO> createOpportunity(@Valid @RequestBody PlacementOpportunityDTO dto) {
        PlacementOpportunityDTO created = placementService.createOpportunity(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/opportunities/{id}")
    public ResponseEntity<PlacementOpportunityDTO> updateOpportunity(@PathVariable Long id, @Valid @RequestBody PlacementOpportunityDTO dto) {
        PlacementOpportunityDTO updated = placementService.updateOpportunity(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/opportunities/{id}")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable Long id) {
        placementService.deleteOpportunity(id);
        return ResponseEntity.noContent().build();
    }

    // --- Applications ---

    @GetMapping("/applications/student/{studentId}")
    public ResponseEntity<List<PlacementApplicationDTO>> getApplicationsByStudent(@PathVariable Long studentId) {
        List<PlacementApplicationDTO> list = placementService.getApplicationsByStudent(studentId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/applications/opportunity/{opportunityId}")
    public ResponseEntity<List<PlacementApplicationDTO>> getApplicationsByOpportunity(@PathVariable Long opportunityId) {
        List<PlacementApplicationDTO> list = placementService.getApplicationsByOpportunity(opportunityId);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/applications")
    public ResponseEntity<PlacementApplicationDTO> applyForOpportunity(@Valid @RequestBody PlacementApplicationDTO dto) {
        PlacementApplicationDTO created = placementService.applyForOpportunity(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PatchMapping("/applications/{id}/status")
    public ResponseEntity<PlacementApplicationDTO> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String statusStr = body.get("status");
        String notes = body.get("notes");
        ApplicationStatus status = ApplicationStatus.valueOf(statusStr.toUpperCase());
        PlacementApplicationDTO updated = placementService.updateApplicationStatus(id, status, notes);
        return ResponseEntity.ok(updated);
    }
}
