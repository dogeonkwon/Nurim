package com.bigdata.nurim.service;

import com.bigdata.nurim.dto.LocationDto;
import com.bigdata.nurim.entity.Location;
import com.bigdata.nurim.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

    public ResponseEntity<List<LocationDto>> getAllInfo() {

        List<Location> findLocationList = locationRepository.findAll();
        List<LocationDto> locationDtoList = new ArrayList<>();

        for(Location location: findLocationList) {
            LocationDto locationDto = location.toDto();
            locationDtoList.add(locationDto);
        }

        return new ResponseEntity<>(locationDtoList, HttpStatus.OK);
    }
}
