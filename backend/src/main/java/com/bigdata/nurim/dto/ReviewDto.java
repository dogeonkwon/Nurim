package com.bigdata.nurim.dto;

import com.bigdata.nurim.entity.Location;
import com.bigdata.nurim.entity.Review;
import com.bigdata.nurim.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    @Schema(description = "리뷰 식별자")
    private int reviewId;
    @Schema(description = "리뷰 내용")
    private String content;
    @Schema(description = "작성일")
    private String createdDate;
    @Schema(description = "신고 여부")
    private Boolean reported;
    @Schema(description = "작성자 닉네임")
    private String nickname;
    @Schema(description = "신호등 리뷰 평가")
    private int type;
    @Schema(description = "장소 정보")
    private LocationDto locationDto;
    public Review toEntity(User user, Location location){
        return Review.builder()
                .content(this.content)
                .reported(this.reported)
                .createdDate(this.createdDate)
                .user(user)
                .type(this.type)
                .location(location)
                .build();
    }
}