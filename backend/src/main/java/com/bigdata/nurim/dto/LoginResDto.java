package com.bigdata.nurim.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResDto {

    private String token;
    private Boolean isFirst;
    private String nickname;
    private String phone;
    private String emergency;
    private String loginType;
    private String imgUrl;
}