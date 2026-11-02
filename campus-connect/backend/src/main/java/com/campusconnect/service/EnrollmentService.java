package com.campusconnect.service;

import com.campusconnect.dto.EnrollmentDTO;
import com.campusconnect.exception.BadRequestException;
import com.campusconnect.exception.DuplicateResourceException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.model.Course;
import com.campusconnect.model.Enrollment;
import com.campusconnect.model.EnrollmentStatus;
import com.campusconnect.model.Student;
import com.campusconnect.repository.CourseRepository;
import com.campusconnect.repository.EnrollmentRepository;
import com.campusconnect.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             StudentRepository studentRepository,
                             CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    public List<EnrollmentDTO> getAllEnrollments() {
        return enrollmentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<EnrollmentDTO> getEnrollmentsByStudent(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<EnrollmentDTO> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public EnrollmentDTO getEnrollmentById(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with ID: " + id));
        return mapToDTO(enrollment);
    }

    @Transactional
    public EnrollmentDTO enrollStudent(EnrollmentDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + dto.getStudentId()));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + dto.getCourseId()));

        if (enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), course.getId())) {
            throw new DuplicateResourceException("Student is already enrolled in course: " + course.getCourseCode());
        }

        long currentEnrolled = enrollmentRepository.countEnrolledByCourseId(course.getId());
        if (currentEnrolled >= course.getCapacity()) {
            throw new BadRequestException("Course capacity (" + course.getCapacity() + ") has been reached. Enrollment is closed.");
        }

        Enrollment enrollment = new Enrollment(
                student,
                course,
                dto.getEnrollmentDate() != null ? dto.getEnrollmentDate() : LocalDate.now(),
                dto.getGrade() != null ? dto.getGrade() : "IP",
                dto.getStatus() != null ? dto.getStatus() : EnrollmentStatus.ENROLLED
        );

        Enrollment saved = enrollmentRepository.save(enrollment);
        return mapToDTO(saved);
    }

    @Transactional
    public EnrollmentDTO updateEnrollment(Long id, EnrollmentDTO dto) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with ID: " + id));

        if (dto.getGrade() != null) {
            enrollment.setGrade(dto.getGrade());
        }
        if (dto.getStatus() != null) {
            enrollment.setStatus(dto.getStatus());
        }

        Enrollment updated = enrollmentRepository.save(enrollment);
        return mapToDTO(updated);
    }

    @Transactional
    public void dropEnrollment(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with ID: " + id));
        enrollment.setStatus(EnrollmentStatus.DROPPED);
        enrollmentRepository.save(enrollment);
    }

    public EnrollmentDTO mapToDTO(Enrollment enrollment) {
        EnrollmentDTO dto = new EnrollmentDTO();
        dto.setId(enrollment.getId());
        dto.setStudentId(enrollment.getStudent().getId());
        dto.setStudentName(enrollment.getStudent().getFullName());
        dto.setStudentCode(enrollment.getStudent().getStudentId());
        dto.setCourseId(enrollment.getCourse().getId());
        dto.setCourseCode(enrollment.getCourse().getCourseCode());
        dto.setCourseTitle(enrollment.getCourse().getTitle());
        dto.setEnrollmentDate(enrollment.getEnrollmentDate());
        dto.setGrade(enrollment.getGrade());
        dto.setStatus(enrollment.getStatus());
        return dto;
    }
}
