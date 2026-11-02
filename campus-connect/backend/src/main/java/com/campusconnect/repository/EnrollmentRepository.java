package com.campusconnect.repository;

import com.campusconnect.model.Enrollment;
import com.campusconnect.model.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByStudentId(Long studentId);

    List<Enrollment> findByCourseId(Long courseId);

    Optional<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);

    Boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);

    long countByStatus(EnrollmentStatus status);

    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.course.id = :courseId AND e.status = 'ENROLLED'")
    long countEnrolledByCourseId(@Param("courseId") Long courseId);
}
