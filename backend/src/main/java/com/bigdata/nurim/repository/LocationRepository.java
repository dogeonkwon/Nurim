package com.bigdata.nurim.repository;

import com.bigdata.nurim.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Integer> {

    List<Location> findAll();
}
