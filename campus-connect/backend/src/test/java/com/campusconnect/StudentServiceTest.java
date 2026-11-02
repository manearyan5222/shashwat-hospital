package com.campusconnect;

import com.campusconnect.dto.StudentDTO;
import com.campusconnect.exception.DuplicateResourceException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.model.ProfileStatus;
import com.campusconnect.model.Student;
import com.campusconnect.repository.StudentRepository;
import com.campusconnect.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    private Student student;
    private StudentDTO studentDTO;

    @BeforeEach
    void setUp() {
        student = new Student("STU-100", "Emma", "Watson", "emma@campusconnect.edu",
                "Computer Science", 3, new BigDecimal("3.90"), "Java, Python");
        student.setId(10L);

        studentDTO = new StudentDTO();
        studentDTO.setStudentId("STU-100");
        studentDTO.setFirstName("Emma");
        studentDTO.setLastName("Watson");
        studentDTO.setEmail("emma@campusconnect.edu");
        studentDTO.setDepartment("Computer Science");
        studentDTO.setAcademicYear(3);
        studentDTO.setGpa(new BigDecimal("3.90"));
        studentDTO.setSkills("Java, Python");
        studentDTO.setProfileStatus(ProfileStatus.ACTIVE);
    }

    @Test
    @DisplayName("Should successfully retrieve student by ID")
    void testGetStudentById_Success() {
        when(studentRepository.findById(10L)).thenReturn(Optional.of(student));

        StudentDTO result = studentService.getStudentById(10L);

        assertNotNull(result);
        assertEquals("STU-100", result.getStudentId());
        assertEquals("Emma Watson", result.getFullName());
        verify(studentRepository, times(1)).findById(10L);
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when student ID does not exist")
    void testGetStudentById_NotFound() {
        when(studentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> studentService.getStudentById(99L));
        verify(studentRepository, times(1)).findById(99L);
    }

    @Test
    @DisplayName("Should throw DuplicateResourceException when creating with duplicate student ID")
    void testCreateStudent_DuplicateStudentId() {
        when(studentRepository.existsByStudentId("STU-100")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> studentService.createStudent(studentDTO));
        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    @DisplayName("Should successfully save student when validation passes")
    void testCreateStudent_Success() {
        when(studentRepository.existsByStudentId("STU-100")).thenReturn(false);
        when(studentRepository.existsByEmail("emma@campusconnect.edu")).thenReturn(false);
        when(studentRepository.save(any(Student.class))).thenReturn(student);

        StudentDTO created = studentService.createStudent(studentDTO);

        assertNotNull(created);
        assertEquals("STU-100", created.getStudentId());
        verify(studentRepository, times(1)).save(any(Student.class));
    }
}
