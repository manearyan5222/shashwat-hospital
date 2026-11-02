package com.campusconnect.repository;

import com.campusconnect.model.OpportunityStatus;
import com.campusconnect.model.PlacementOpportunity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementOpportunityRepository extends JpaRepository<PlacementOpportunity, Long> {

    List<PlacementOpportunity> findByStatus(OpportunityStatus status);

    @Query("SELECT p FROM PlacementOpportunity p WHERE " +
           "(:query IS NULL OR :query = '' OR " +
           " LOWER(p.companyName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(p.jobRole) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(p.location) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:status IS NULL OR p.status = :status)")
    Page<PlacementOpportunity> searchOpportunities(
            @Param("query") String query,
            @Param("status") OpportunityStatus status,
            Pageable pageable
    );

    long countByStatus(OpportunityStatus status);
}
