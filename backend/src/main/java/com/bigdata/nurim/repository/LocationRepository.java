package com.bigdata.nurim.repository;

import com.bigdata.nurim.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Integer> {
    @Query("select l from Location l join fetch l.subCategory s join fetch s.mainCategory m")
    List<Location> findAll();
    @Query("select l from Location l join fetch l.subCategory s join fetch s.mainCategory m where l.locationName like %:#{#locationName}%")
    List<Location> findByLocationNameContaining(@Param("locationName") String locationName);
}