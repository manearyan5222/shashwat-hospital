package com.campusconnect.controller;

import com.campusconnect.dto.EnrollmentDTO;
import com.campusconnect.service.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping
    public ResponseEntity<List<EnrollmentDTO>> getAllEnrollments() {
        List<EnrollmentDTO> list = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnrollmentDTO> getEnrollmentById(@PathVariable Long id) {
        EnrollmentDTO dto = enrollmentService.getEnrollmentById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<EnrollmentDTO>> getEnrollmentsByStudent(@PathVariable Long studentId) {
        List<EnrollmentDTO> list = enrollmentService.getEnrollmentsByStudent(studentId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<EnrollmentDTO>> getEnrollmentsByCourse(@PathVariable Long courseId) {
        List<EnrollmentDTO> list = enrollmentService.getEnrollmentsByCourse(courseId);
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<EnrollmentDTO> enrollStudent(@Valid @RequestBody EnrollmentDTO dto) {
        EnrollmentDTO enrolled = enrollmentService.enrollStudent(dto);
        return new ResponseEntity<>(enrolled, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnrollmentDTO> updateEnrollment(@PathVariable Long id, @RequestBody EnrollmentDTO dto) {
        EnrollmentDTO updated = enrollmentService.updateEnrollment(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> dropEnrollment(@PathVariable Long id) {
        enrollmentService.dropEnrollment(id);
        return ResponseEntity.noContent().build();
    }
}
