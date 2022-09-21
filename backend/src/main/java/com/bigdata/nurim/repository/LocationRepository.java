package com.bigdata.nurim.repository;

import com.bigdata.nurim.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Integer> {

    List<Location> findAll();
    List<Location> findByLocationNameContaining(String locationName);
}
