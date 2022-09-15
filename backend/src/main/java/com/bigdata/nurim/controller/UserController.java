package com.bigdata.nurim.controller;

import com.bigdata.nurim.dto.LoginDto;
import com.bigdata.nurim.dto.ModifyUserInfoDto;
import com.bigdata.nurim.dto.TokenDto;
import com.bigdata.nurim.dto.UserDto;
import com.bigdata.nurim.entity.LoginType;
import com.bigdata.nurim.service.KakaoUserService;
import com.bigdata.nurim.service.NaverUserService;
import com.bigdata.nurim.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final KakaoUserService kakaoUserService;
    private final NaverUserService naverUserService;

    @PostMapping("/kakao-login")
    public HttpEntity<?> kakaoLogin(@RequestBody HashMap<String, String> param) {
        return kakaoUserService.login(param.get("access_token"));
    }
    @PostMapping("/naver-login")
    public HttpEntity<?> naverLogin(@RequestBody HashMap<String, String> param) {
        return naverUserService.login(param.get("access_token"));
    }
    @GetMapping
    public ResponseEntity<UserDto> getInfo(HttpServletRequest request) {
        return userService.getInfo(request);
    }
    @DeleteMapping
    public ResponseEntity<String> delete(HttpServletRequest request) {
        return userService.delete(request);
    }

    @PutMapping
    public ResponseEntity<String> modify(@RequestPart(value = "file", required = false) MultipartFile file,
                                         @RequestPart(value = "userDto", required = false) ModifyUserInfoDto modifyUserInfoDto,
                                         HttpServletRequest request) {
        return userService.modify(modifyUserInfoDto, file,request);
    }
}
