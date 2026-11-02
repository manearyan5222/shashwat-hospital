package com.campusconnect.service;

import com.campusconnect.dto.CourseDTO;
import com.campusconnect.exception.DuplicateResourceException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.model.Course;
import com.campusconnect.repository.CourseRepository;
import com.campusconnect.repository.EnrollmentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    // Constructor injection
    public CourseService(CourseRepository courseRepository, EnrollmentRepository enrollmentRepository) {
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public Page<CourseDTO> getAllCourses(String query, String department, String semester, Pageable pageable) {
        return courseRepository.searchCourses(query, department, semester, pageable)
                .map(this::mapToDTO);
    }

    public CourseDTO getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + id));
        return mapToDTO(course);
    }

    @Transactional
    public CourseDTO createCourse(CourseDTO dto) {
        if (courseRepository.existsByCourseCode(dto.getCourseCode())) {
            throw new DuplicateResourceException("Course with code '" + dto.getCourseCode() + "' already exists");
        }

        Course course = new Course();
        mapFromDTO(dto, course);
        Course saved = courseRepository.save(course);
        return mapToDTO(saved);
    }

    @Transactional
    public CourseDTO updateCourse(Long id, CourseDTO dto) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + id));

        if (!course.getCourseCode().equalsIgnoreCase(dto.getCourseCode()) &&
                courseRepository.existsByCourseCode(dto.getCourseCode())) {
            throw new DuplicateResourceException("Course code '" + dto.getCourseCode() + "' is already in use");
        }

        mapFromDTO(dto, course);
        Course updated = courseRepository.save(course);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found with ID: " + id);
        }
        courseRepository.deleteById(id);
    }

    public CourseDTO mapToDTO(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setCourseCode(course.getCourseCode());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setDepartment(course.getDepartment());
        dto.setCredits(course.getCredits());
        dto.setInstructorName(course.getInstructorName());
        dto.setCapacity(course.getCapacity());
        dto.setSemester(course.getSemester());
        dto.setEnrolledCount(enrollmentRepository.countEnrolledByCourseId(course.getId()));
        return dto;
    }

    private void mapFromDTO(CourseDTO dto, Course course) {
        course.setCourseCode(dto.getCourseCode());
        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setDepartment(dto.getDepartment());
        course.setCredits(dto.getCredits());
        course.setInstructorName(dto.getInstructorName());
        course.setCapacity(dto.getCapacity());
        if (dto.getSemester() != null) {
            course.setSemester(dto.getSemester());
        }
    }
}
