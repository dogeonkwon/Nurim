package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResDto {
    @Schema(description = "jwt 토큰")
    private String token;
    @Schema(description = "최초 로그인 여부")
    private Boolean isFirst;
    @Schema(description = "닉네임")
    private String nickname;
    @Schema(description = "휴대폰 번호")
    private String phone;
    @Schema(description = "긴급 전화번호")
    private String emergency;
    @Schema(description = "로그인 방식")
    private String loginType;
    @Schema(description = "프로필 사진 url")
    private String imgUrl;
}