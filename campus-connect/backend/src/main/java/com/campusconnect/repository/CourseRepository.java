package com.campusconnect.repository;

import com.campusconnect.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByCourseCode(String courseCode);

    Boolean existsByCourseCode(String courseCode);

    List<Course> findByDepartmentIgnoreCase(String department);

    @Query("SELECT c FROM Course c WHERE " +
           "(:query IS NULL OR :query = '' OR " +
           " LOWER(c.courseCode) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(c.instructorName) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:department IS NULL OR :department = '' OR LOWER(c.department) = LOWER(:department)) AND " +
           "(:semester IS NULL OR :semester = '' OR LOWER(c.semester) = LOWER(:semester))")
    Page<Course> searchCourses(
            @Param("query") String query,
            @Param("department") String department,
            @Param("semester") String semester,
            Pageable pageable
    );
}
