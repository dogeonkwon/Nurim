package com.bigdata.nurim.controller;

import com.bigdata.nurim.dto.UserDto;
import com.bigdata.nurim.entity.LoginType;
import com.bigdata.nurim.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signUp")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
        return userService.signup(userDto, LoginType.NURIM);
    }

    @PostMapping("/emailCheck")
    public ResponseEntity<String> checkEmail(@RequestBody HashMap<String, Object> map) {
        String email = (String) map.get("email");
        return userService.checkEmail(email);
    }
}
