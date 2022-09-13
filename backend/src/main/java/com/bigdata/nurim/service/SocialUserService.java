package com.bigdata.nurim.service;

import com.bigdata.nurim.dto.UserDto;
import org.springframework.http.HttpEntity;

public interface SocialUserService {
    UserDto getUserInfoByAccessToken(String access_token);
    UserDto StringToDto(String userInfo);
    HttpEntity<? extends Object> login(String access_token);
}
