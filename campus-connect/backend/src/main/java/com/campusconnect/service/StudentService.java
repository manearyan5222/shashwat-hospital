package com.campusconnect.service;

import com.campusconnect.dto.StudentDTO;
import com.campusconnect.exception.DuplicateResourceException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.model.ProfileStatus;
import com.campusconnect.model.Student;
import com.campusconnect.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    // Demonstrating Constructor-based Dependency Injection
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Page<StudentDTO> getAllStudents(String query, String department, Integer year, ProfileStatus status, Pageable pageable) {
        return studentRepository.searchStudents(query, department, year, status, pageable)
                .map(this::mapToDTO);
    }

    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
        return mapToDTO(student);
    }

    public StudentDTO getStudentByCode(String studentCode) {
        Student student = studentRepository.findByStudentId(studentCode)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with code: " + studentCode));
        return mapToDTO(student);
    }

    @Transactional
    public StudentDTO createStudent(StudentDTO dto) {
        if (studentRepository.existsByStudentId(dto.getStudentId())) {
            throw new DuplicateResourceException("Student ID '" + dto.getStudentId() + "' already exists");
        }
        if (studentRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email '" + dto.getEmail() + "' is already registered to a student");
        }

        Student student = new Student();
        mapFromDTO(dto, student);
        Student saved = studentRepository.save(student);
        return mapToDTO(saved);
    }

    @Transactional
    public StudentDTO updateStudent(Long id, StudentDTO dto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));

        // Check uniqueness if changing studentId or email
        if (!student.getStudentId().equalsIgnoreCase(dto.getStudentId()) &&
                studentRepository.existsByStudentId(dto.getStudentId())) {
            throw new DuplicateResourceException("Student ID '" + dto.getStudentId() + "' already exists");
        }
        if (!student.getEmail().equalsIgnoreCase(dto.getEmail()) &&
                studentRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email '" + dto.getEmail() + "' is already in use");
        }

        mapFromDTO(dto, student);
        Student updated = studentRepository.save(student);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with ID: " + id);
        }
        studentRepository.deleteById(id);
    }

    public StudentDTO mapToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setUserId(student.getUser() != null ? student.getUser().getId() : null);
        dto.setStudentId(student.getStudentId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setFullName(student.getFullName());
        dto.setEmail(student.getEmail());
        dto.setDepartment(student.getDepartment());
        dto.setAcademicYear(student.getAcademicYear());
        dto.setGpa(student.getGpa());
        dto.setSkills(student.getSkills());
        dto.setProfileStatus(student.getProfileStatus());
        return dto;
    }

    private void mapFromDTO(StudentDTO dto, Student student) {
        student.setStudentId(dto.getStudentId());
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setDepartment(dto.getDepartment());
        student.setAcademicYear(dto.getAcademicYear());
        student.setGpa(dto.getGpa());
        student.setSkills(dto.getSkills());
        if (dto.getProfileStatus() != null) {
            student.setProfileStatus(dto.getProfileStatus());
        }
    }
}
