package com.bigdata.nurim.dto;


import com.bigdata.nurim.entity.LoginType;
import com.bigdata.nurim.entity.Role;
import com.bigdata.nurim.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.Collections;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDto {
    @Schema(description = "닉네임")
    private String nickname;
    private String password;
    private String email;
    @Schema(description = "휴대폰 번호")
    private String phone;
    @Schema(description = "긴급 전화번호")
    private String emergency;
    @Schema(description = "로그인 방식")
    private String loginType;
    @Schema(description = "프로필 사진 url")
    private String imgUrl;
    @Schema(description = "최초 로그인 여부")
    private Boolean isFirst;
    private Role role;

    public User toEntity(LoginType loginType){

        return User.builder()
                .nickname(this.getNickname())
                .password(this.getPassword())
                .phone(this.getPhone())
                .imgUrl(this.getImgUrl())
                .isFirst(this.getIsFirst())
                .emergency(this.getEmergency())
                .email(this.getEmail())
                .role(Role.USER)
                .loginType(loginType)
                .build();
    }
}
