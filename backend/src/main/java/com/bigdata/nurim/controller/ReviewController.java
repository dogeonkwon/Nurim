package com.bigdata.nurim.controller;


import com.bigdata.nurim.dto.ReviewWriteDto;
import com.bigdata.nurim.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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
}
