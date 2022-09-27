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
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final LocationRepository locationRepository;

    @Transactional
    public ResponseEntity<String> register(String email, ReviewWriteDto reviewWriteDto){

        User user = userRepository.findByEmail(email).get();

        Location location = locationRepository.findById(reviewWriteDto.getLocationId()).get();

        LocalDateTime date = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String createdDate = date.format(formatter);

        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setContent(reviewWriteDto.getContent());
        reviewDto.setCreatedDate(createdDate);
        reviewDto.setReported(false);
        reviewDto.setType(reviewWriteDto.getType());
        reviewDto.setNickname(user.getNickname());

        Review review = reviewDto.toEntity(user,location);

        reviewRepository.save(review);

        return new ResponseEntity<>("리뷰가 등록되었습니다.", HttpStatus.OK);
    }
    @Transactional
    public ResponseEntity<String> update(int review_id,String content){

        Review review = reviewRepository.findById(review_id).get();

        review.update(content);
        
        reviewRepository.save(review);

        return new ResponseEntity<>("리뷰가 수정되었습니다.", HttpStatus.OK);
    }
    @Transactional
    public ResponseEntity<String> delete(int review_id){

        Review review = reviewRepository.findById(review_id).get();
        reviewRepository.delete(review);
        if(reviewRepository.findById(review_id).orElse(null) != null) {
            return new ResponseEntity<>("삭제실패", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>("삭제완료", HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<String> report(int review_id){
        Review review = reviewRepository.findById(review_id).get();
        review.report();
        reviewRepository.save(review);
        return new ResponseEntity<>("리뷰가 신고되었습니다.", HttpStatus.OK);
    }
    public ResponseEntity<?> getMyReview(String email){

        User user = userRepository.findByEmail(email).get();

        List<Review> reviews = reviewRepository.findReviewByUserFetchJoin(user);
        List<ReviewDto> result = new ArrayList<>();

        for(Review review:reviews){
            result.add(review.toDto());
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    public ResponseEntity<List<ReviewDto>> getLocationReview(int location_id){

        List<Review> reviews = reviewRepository.findReviewByLocationFetchJoin(location_id);
        List<ReviewDto> result = new ArrayList<>();
        for(Review review:reviews){
            result.add(review.toDto());
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}