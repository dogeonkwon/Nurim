package com.bigdata.nurim.controller;


import com.bigdata.nurim.dto.ReviewWriteDto;
import com.bigdata.nurim.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/write")
    public ResponseEntity<String> register(HttpServletRequest request, @RequestBody ReviewWriteDto reviewWriteDto) {
        return reviewService.register(request, reviewWriteDto);
    }
    @PutMapping("/{review_id}")
    public ResponseEntity<String> update(HttpServletRequest request,@PathVariable int review_id,@RequestBody Map<String,String> map) {
        return reviewService.update(request, review_id,map.get("content"));
    }
    @DeleteMapping("/{review_id}")
    public ResponseEntity<String> delete(HttpServletRequest request,@PathVariable int review_id) {
        return reviewService.delete(request, review_id);
    }
    @GetMapping("/reviews")
    public ResponseEntity<?> getMyReview(HttpServletRequest request) {
        return reviewService.getMyReview(request);
    }
    @GetMapping("/{location_id}")
    public ResponseEntity<?> getLocationReview(@PathVariable int location_id) {
        return reviewService.getLocationReview(location_id);
    }
}
