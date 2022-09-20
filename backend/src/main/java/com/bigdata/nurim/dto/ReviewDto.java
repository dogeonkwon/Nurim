package com.bigdata.nurim.dto;

import com.bigdata.nurim.entity.Location;
import com.bigdata.nurim.entity.Review;
import com.bigdata.nurim.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {

    private int reviewId;
    private String content;
    private String createdDate;
    private Boolean reported;
    private String nickname;
    private int type;
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