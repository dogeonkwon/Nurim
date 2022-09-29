package com.bigdata.nurim.repository;

import com.bigdata.nurim.entity.Location;
import com.bigdata.nurim.entity.Review;
import com.bigdata.nurim.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Integer> {
    @Query("select r from Review r join fetch r.user u join fetch r.location l where u = :#{#paramUser}")
    List<Review> findReviewByUserFetchJoin(@Param("paramUser")User user);
    List<Review> findByReportedTrue();
    @Query("select r from Review r join fetch r.user join fetch r.location l where l.locationId = :#{#locationId}")
    List<Review> findReviewByLocationFetchJoin(@Param("locationId")int location);
}
