package com.bigdata.nurim.dto;

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
    private String userName;
    private int type;

}