package com.campusconnect.repository;

import com.campusconnect.model.ApplicationStatus;
import com.campusconnect.model.PlacementApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlacementApplicationRepository extends JpaRepository<PlacementApplication, Long> {

    List<PlacementApplication> findByStudentId(Long studentId);

    List<PlacementApplication> findByOpportunityId(Long opportunityId);

    Optional<PlacementApplication> findByStudentIdAndOpportunityId(Long studentId, Long opportunityId);

    Boolean existsByStudentIdAndOpportunityId(Long studentId, Long opportunityId);

    long countByStatus(ApplicationStatus status);

    @Query("SELECT COUNT(DISTINCT pa.student.id) FROM PlacementApplication pa WHERE pa.status = 'SELECTED'")
    long countDistinctPlacedStudents();
}
