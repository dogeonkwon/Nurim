package com.bigdata.nurim.controller;

import com.bigdata.nurim.dto.LocationDto;
import com.bigdata.nurim.service.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    //전체 장소 조회
    @GetMapping
    public ResponseEntity<List<LocationDto>> getAllInfo(){
        return locationService.getAllInfo();
    }

    //검색(이름으로) 장소 조회
    @PostMapping
    public ResponseEntity<List<LocationDto>> getSearchedLocationInfo(@RequestBody Map<String,String> locationNameMap){
        String locationName = locationNameMap.get("locationName");
        return locationService.getSearchedLocationInfo(locationName);
    }
}
