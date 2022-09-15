package com.bigdata.nurim.dto;


import com.bigdata.nurim.entity.Authority;
import com.bigdata.nurim.entity.LoginType;
import com.bigdata.nurim.entity.Role;
import com.bigdata.nurim.entity.User;
import lombok.*;

import java.util.Collections;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String nickname;
    private String password;
    private String email;
    private String phone;
    private String emergency;
    private String loginType;
    private String imgUrl;
    private Boolean isFirst;
    private Role role;

    public User toEntity(LoginType loginType){

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        return User.builder()
                .nickname(this.getNickname())
                .password(this.getPassword())
                .phone(this.getPhone())
                .imgUrl(this.getImgUrl())
                .isFirst(this.getIsFirst())
                .authorities(Collections.singleton(authority))
                .emergency(this.getEmergency())
                .email(this.getEmail())
                .role(Role.USER)
                .loginType(loginType)
                .build();
    }
}
