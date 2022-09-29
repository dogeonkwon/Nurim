package com.bigdata.nurim.service;

import com.bigdata.nurim.dto.LocationDto;
import com.bigdata.nurim.dto.LocationPosDto;
import com.bigdata.nurim.dto.MapLocationDto;
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
    public ResponseEntity<List<LocationPosDto>> getAllInfo(MapLocationDto mapLocationDto) {

        List<Location> findLocationList = locationRepository.findAll();
        List<LocationPosDto> locationDtoList = new ArrayList<>();

        for(Location location: findLocationList) {
            if(!boundaryCheck(location,mapLocationDto))continue;
            LocationPosDto locationPosDto = location.toLocationPosDto();
            locationDtoList.add(locationPosDto);
        }

        return new ResponseEntity<>(locationDtoList, HttpStatus.OK);
    }

    //장소검색(이름으로)
    public ResponseEntity<List<LocationPosDto>> getSearchedLocationInfo(String locationName) {

        List<Location> searchedLocationList = locationRepository.findByLocationNameContaining(locationName);
        List<LocationPosDto> locationDtoList = new ArrayList<>();

        for(Location location: searchedLocationList) {
            LocationPosDto locationPosDto = location.toLocationPosDto();
            locationDtoList.add(locationPosDto);
        }

        return new ResponseEntity<>(locationDtoList, HttpStatus.OK);
    }
    public ResponseEntity<List<LocationPosDto>>getCategoryLocationInfo(String mainCategoryId, MapLocationDto mapLocationDto){
        List<Location> searchedLocationList = locationRepository.findByLocationMainCategory(mainCategoryId);
        List<LocationPosDto> locationDtoList = new ArrayList<>();

        for(Location location: searchedLocationList) {
            if(!boundaryCheck(location,mapLocationDto))continue;
            LocationPosDto locationPosDto = location.toLocationPosDto();
            locationDtoList.add(locationPosDto);
        }

        return new ResponseEntity<>(locationDtoList, HttpStatus.OK);
    }
    public ResponseEntity<LocationDto>getLocationDetail(int locationId){
        Location location = locationRepository.findByLocationId(locationId);
        LocationDto locationDto = location.toDto();
        return new ResponseEntity<>(locationDto, HttpStatus.OK);
    }
    private boolean boundaryCheck(Location location, MapLocationDto mapLocationDto){
        if(Double.parseDouble(location.getLat())>=Double.parseDouble(mapLocationDto.getSw_latitude()) &&
                Double.parseDouble(location.getLat())<=Double.parseDouble(mapLocationDto.getNe_latitude())&&
                Double.parseDouble(location.getLng())<=Double.parseDouble(mapLocationDto.getNe_longitude())&&
                Double.parseDouble(location.getLng())>=Double.parseDouble(mapLocationDto.getSw_longitude())
        ){
            return true;
        }
        return false;
    }
}
