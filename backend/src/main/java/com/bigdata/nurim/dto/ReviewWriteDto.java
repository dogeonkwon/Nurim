package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ReviewWriteDto {
    @Schema(description = "내용")
    private String content;
    @Schema(description = "장소 식별자")
    private int locationId;
    @Schema(description = "신호동 리뷰 평가")
    private int type;
}
