package com.bigdata.nurim.controller;

import com.bigdata.nurim.dto.LocationDto;
import com.bigdata.nurim.dto.LocationPosDto;
import com.bigdata.nurim.dto.MapLocationDto;
import com.bigdata.nurim.service.LocationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Location", description = "장소 API")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @Operation(summary = "Look up location", description = "전체 장소 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = LocationPosDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping
    public ResponseEntity<List<LocationPosDto>> getAllInfo(@RequestBody MapLocationDto mapLocationDto){
        return locationService.getAllInfo(mapLocationDto);
    }

    @Operation(summary = "Search Location by location name", description = "장소 검색")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = LocationPosDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{search_word}")
    public ResponseEntity<List<LocationPosDto>> getSearchedLocationInfo(@PathVariable String search_word){
        return locationService.getSearchedLocationInfo(search_word);
    }


    @Operation(summary = "Look up places by category", description = "카테고리로 장소 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = LocationPosDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/{mainCategoryId}")
    public ResponseEntity<List<LocationPosDto>> getCategoryLocationInfo(@PathVariable String mainCategoryId, @RequestBody MapLocationDto mapLocationDto){
        return locationService.getCategoryLocationInfo(mainCategoryId,mapLocationDto);
    }
    @Operation(summary = "Look up places detail", description = "장소 상세 정보 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = LocationDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{location_id}")
    public ResponseEntity<LocationDto> getLocationDetail(@PathVariable int location_id){
        return locationService.getLocationDetail(location_id);
    }
}