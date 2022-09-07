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

    private String userName;
    private String email;
    private String password;
    private String phone;
    private String emergency;
    private String loginType;
    private Role role;
    public User toEntity(LoginType loginType){

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        return User.builder()
                .userName(this.getUserName())
                .email(this.getEmail())
                .password(this.getPassword())
                .phone(this.getPhone())
                .authorities(Collections.singleton(authority))
                .emergency(this.getEmergency())
                .role(Role.USER)
                .loginType(loginType)
                .build();
    }
}
