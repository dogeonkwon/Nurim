package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MapLocationDto {
    @Schema(description = "남서 위도")
    private String sw_latitude;
    @Schema(description = "남서 경도")
    private String sw_longitude;
    @Schema(description = "북동 위도")
    private String ne_latitude;
    @Schema(description = "북동 경도")
    private String ne_longitude;
}
