package com.bigdata.nurim.service;

import com.bigdata.nurim.dto.ReviewDto;
import com.bigdata.nurim.dto.ReviewWriteDto;
import com.bigdata.nurim.entity.Location;
import com.bigdata.nurim.entity.Review;
import com.bigdata.nurim.entity.User;
import com.bigdata.nurim.repository.LocationRepository;
import com.bigdata.nurim.repository.ReviewRepository;
import com.bigdata.nurim.repository.UserRepository;
import com.bigdata.nurim.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final LocationRepository locationRepository;
    @Transactional
    public ResponseEntity<String> register(HttpServletRequest request, ReviewWriteDto reviewWriteDto){

        String token = request.getHeader("access-token");
        User findUser = null;
        if (!tokenProvider.validateToken(token)) {
            return new ResponseEntity<>("유효하지 않는 토큰", HttpStatus.NO_CONTENT);
        }
        String userEmail = String.valueOf(tokenProvider.getPayload(token).get("sub"));

        findUser = userRepository.findByEmail(userEmail).get();

        Location location = locationRepository.findById(reviewWriteDto.getLocationId()).get();

        LocalDateTime date = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String createdDate = date.format(formatter);

        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setContent(reviewWriteDto.getContent());
        reviewDto.setCreatedDate(createdDate);
        reviewDto.setReported(false);
        reviewDto.setType(reviewWriteDto.getType());
        reviewDto.setNickname(findUser.getNickname());

        Review review = reviewDto.toEntity(findUser,location);

        reviewRepository.save(review);

        return new ResponseEntity<>("리뷰가 등록되었습니다.", HttpStatus.OK);
    }
}