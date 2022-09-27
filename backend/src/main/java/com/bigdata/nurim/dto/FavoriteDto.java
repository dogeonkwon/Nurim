package com.bigdata.nurim.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteDto {
    @Schema(description = "즐겨찾기 식별자")
    private int favoriteId;
    @Schema(description = "장소 식별자")
    private int locationId;
    @Schema(description = "장소명")
    private String locationName;
    @Schema(description = "장소 주소")
    private String locationAddress;

}

