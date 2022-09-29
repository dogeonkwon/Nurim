package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewCountDto {
    @Schema(description = "초록 리뷰 수")
    private int green;
    @Schema(description = "노란 리뷰 수")
    private int yellow;
    @Schema(description = "빨간 리뷰 수")
    private int red;
    @Schema(description = "총 리뷰 수")
    private int total;
    public void updateGreen(){
        this.green++;
    }
    public void updateYellow(){
        this.yellow++;
    }
    public void updateRed(){
        this.red++;
    }
}
