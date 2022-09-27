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

    //전체 장소 조회
    public ResponseEntity<List<LocationDto>> getAllInfo() {

        List<Location> findLocationList = locationRepository.findAll();
        List<LocationDto> locationDtoList = new ArrayList<>();

        for(Location location: findLocationList) {
            LocationDto locationDto = location.toDto();
            locationDtoList.add(locationDto);
        }

        return new ResponseEntity<>(locationDtoList, HttpStatus.OK);
    }

    //장소검색(이름으로)
    public ResponseEntity<List<LocationDto>> getSearchedLocationInfo(String locationName) {

        List<Location> searchedLocationList = locationRepository.findByLocationNameContaining(locationName);
        List<LocationDto> locationDtoList = new ArrayList<>();

        for(Location location: searchedLocationList) {
            LocationDto locationDto = location.toDto();
            locationDtoList.add(locationDto);
        }

        return new ResponseEntity<>(locationDtoList, HttpStatus.OK);
    }
    public ResponseEntity<List<LocationDto>>getCategoryLocationInfo(String mainCategoryId){

        List<Location> searchedLocationList = locationRepository.findByLocationMainCategory(mainCategoryId);
        List<LocationDto> locationDtoList = new ArrayList<>();

        for(Location location: searchedLocationList) {
            LocationDto locationDto = location.toDto();
            locationDtoList.add(locationDto);
        }

        return new ResponseEntity<>(locationDtoList, HttpStatus.OK);
    }
}
