package com.bigdata.nurim.controller;


import com.bigdata.nurim.dto.ReviewDto;
import com.bigdata.nurim.dto.ReviewWriteDto;
import com.bigdata.nurim.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@Tag(name = "Review", description = "리뷰 API")
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    @Operation(summary = "Register Review", description = "리뷰 등록")
    @Parameter(name = "reviewWriteDto", description = "reviewWriteDto")
    @PostMapping("/write")
    public ResponseEntity<String> register(@AuthenticationPrincipal String email, @RequestBody ReviewWriteDto reviewWriteDto) {
        return reviewService.register(email, reviewWriteDto);
    }
    @Operation(summary = "Update Review", description = "리뷰 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PutMapping("/{review_id}")
    public ResponseEntity<String> update(@AuthenticationPrincipal String email,@PathVariable int review_id,@RequestBody Map<String,String> map) {
        return reviewService.update(review_id,map.get("content"));
    }
    @Operation(summary = "Delete Review", description = "리뷰 삭제")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @DeleteMapping("/{review_id}")
    public ResponseEntity<String> delete(@AuthenticationPrincipal String email,@PathVariable int review_id) {
        return reviewService.delete(review_id);
    }
    @Operation(summary = "Look up my review", description = "내 리뷰 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ReviewDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/reviews")
    public ResponseEntity<?> getMyReview(@AuthenticationPrincipal String email) {
        return reviewService.getMyReview(email);
    }
    @Operation(summary = "Look up location review", description = "장소 리뷰 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ReviewDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{location_id}")
    public ResponseEntity<?> getLocationReview(@PathVariable int location_id) {
        return reviewService.getLocationReview(location_id);
    }
}
