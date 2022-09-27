package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ModifyUserInfoDto {
    @Schema(description = "수정 닉네임")
    private String nickname;
    @Schema(description = "수정 전화 번호")
    private String phone;
    @Schema(description = "수정 긴급 전화번호")
    private String emergency;
}
