package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FirstLoginInfoDto {
    @Schema(description = "전화번호")
    private String phone;
    @Schema(description = "긴급 전화번호")
    private String emergency;
}
