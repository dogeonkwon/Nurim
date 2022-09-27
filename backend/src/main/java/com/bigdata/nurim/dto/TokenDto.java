package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {
    @Schema(description = "엑세스 토큰")
    private String access_token;
}
