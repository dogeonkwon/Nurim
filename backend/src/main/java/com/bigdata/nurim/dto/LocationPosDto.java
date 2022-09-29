package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LocationPosDto {
    @Schema(description = "장소 식별자")
    private int locationId;
    @Schema(description = "장소명")
    private String locationName;
    @Schema(description = "주소")
    private String address;
    @Schema(description = "위도")
    private String lat;
    @Schema(description = "경도")
    private String lng;
}
