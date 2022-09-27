package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NicknameDto {
    @Schema(description = "닉네임")
    private String nickname;
}
