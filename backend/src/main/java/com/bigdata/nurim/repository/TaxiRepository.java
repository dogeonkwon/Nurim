package com.bigdata.nurim.repository;

import com.bigdata.nurim.entity.Taxi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaxiRepository extends JpaRepository<Taxi, Integer> {
    @Query(value = "select * from taxi t where REPLACE(taxi_address,' ','') like %?1%", nativeQuery = true)
    List<Taxi> findAllByTaxiAddressContaining(String address);
}
