package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LocationReviewDto {
    @Schema(description = "리뷰 식별자")
    private int reviewId;
    @Schema(description = "리뷰 내용")
    private String content;
    @Schema(description = "작성일")
    private String createdDate;
    @Schema(description = "작성자 닉네임")
    private String nickname;
}
