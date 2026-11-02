package com.campusconnect.repository;

import com.campusconnect.model.ProfileStatus;
import com.campusconnect.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByStudentId(String studentId);

    Optional<Student> findByEmail(String email);

    Optional<Student> findByUserId(Long userId);

    Boolean existsByStudentId(String studentId);

    Boolean existsByEmail(String email);

    List<Student> findByDepartmentIgnoreCase(String department);

    List<Student> findByProfileStatus(ProfileStatus status);

    @Query("SELECT s FROM Student s WHERE " +
           "(:query IS NULL OR :query = '' OR " +
           " LOWER(s.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(s.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(s.studentId) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(s.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(s.skills) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:department IS NULL OR :department = '' OR LOWER(s.department) = LOWER(:department)) AND " +
           "(:academicYear IS NULL OR s.academicYear = :academicYear) AND " +
           "(:status IS NULL OR s.profileStatus = :status)")
    Page<Student> searchStudents(
            @Param("query") String query,
            @Param("department") String department,
            @Param("academicYear") Integer academicYear,
            @Param("status") ProfileStatus status,
            Pageable pageable
    );

    @Query("SELECT COUNT(s) FROM Student s WHERE s.profileStatus = 'ACTIVE'")
    long countActiveStudents();

    @Query("SELECT s.department, COUNT(s) FROM Student s GROUP BY s.department")
    List<Object[]> countStudentsByDepartment();
}
