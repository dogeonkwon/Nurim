package com.bigdata.nurim.service;

import com.bigdata.nurim.dto.*;
import com.bigdata.nurim.entity.LoginType;
import com.bigdata.nurim.entity.User;
import com.bigdata.nurim.repository.UserRepository;
import com.bigdata.nurim.security.JwtFilter;
import com.bigdata.nurim.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final ImageUploadService imageUploadService;
    private final String defaultImg = "https://nurim.s3.ap-northeast-2.amazonaws.com/pngegg.png";

    @Transactional
    public void signup(UserDto userDto, LoginType loginType) {
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        User user = userDto.toEntity(loginType);
        userRepository.save(user);
    }

    public ResponseEntity<LoginResDto> login(LoginDto loginDto) {
        //  LoginDto의 userName,Password를 받아서 UsernamePasswordAuthenticationToken 객체를 생성한다
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        log.info(authenticationToken.toString());
        // authenticationToken 을 이용해서 Authentication 객체를 생성하려고 authenticate메서드가 실행될때
        // CustomUserDetailsService 의 loadUserByUsername 메서드가 실행된다.
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 생성된 Authentication 객체를 SecurityContextHolder에 저장하고,
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // 그 인증정보를 기반으로 토큰을 생성한다
        String jwt = tokenProvider.createToken(authentication);

        LoginResDto loginResDto = getLoginResDto(loginDto.getEmail(),jwt);

        return new ResponseEntity<>(loginResDto, HttpStatus.OK);
    }

    public ResponseEntity<?> getInfo(String email) {
        Optional<User> findUser = userRepository.findByEmail(email);
        return new ResponseEntity<>(findUser.map(User::toDto).orElse(null), HttpStatus.OK);
    }
    @Transactional
    public ResponseEntity<String> delete(String email) {
        User findUser = userRepository.findByEmail(email).get();
        userRepository.delete(findUser);
        return new ResponseEntity<>("삭제완료", HttpStatus.OK);
    }
    @Transactional
    public ResponseEntity<?> modify(ModifyUserInfoDto modifyUserInfoDto, MultipartFile file, String email, String token) {

        Optional<User> user = userRepository.findByEmail(email);
        User findUser = user.get();
        if(file!=null){
            if (!findUser.getImgUrl().equals(defaultImg)) {
                imageUploadService.delete(findUser.getImgUrl());
            }
            findUser.updateImg(imageUploadService.uploadImge(file));
        }else{
            findUser.updateImg(findUser.getImgUrl());
        }
        findUser.update(modifyUserInfoDto);

        userRepository.save(findUser);
        LoginResDto loginResDto = getLoginResDto(email, token);
        return new ResponseEntity<>(loginResDto, HttpStatus.OK);
    }
    public ResponseEntity<NicknameCheckResultDto> nicknameCheck(String nickname){
        NicknameCheckResultDto nicknameCheckResultDto = new NicknameCheckResultDto(true);
        if (userRepository.findByNickname(nickname).orElse(null) != null) {
            nicknameCheckResultDto.setAvailability(false);
        }
        return new ResponseEntity<>(nicknameCheckResultDto, HttpStatus.OK);
    }
    @Transactional
    public ResponseEntity<String> firstLogin(FirstLoginInfoDto firstLoginInfoDto,String email){

        User findUser = userRepository.findByEmail(email).get();
        findUser.updateFirst(firstLoginInfoDto);
        userRepository.save(findUser);
        return new ResponseEntity<>("저장 완료", HttpStatus.OK);
    }

    public LoginResDto getLoginResDto(String email,String token){
        User findUser = userRepository.findByEmail(email).get();
        LoginResDto loginResDto = new LoginResDto();
        loginResDto.setToken(token);
        loginResDto.setNickname(findUser.getNickname());
        loginResDto.setLoginType(findUser.getLoginType().toString());
        loginResDto.setImgUrl(findUser.getImgUrl());
        loginResDto.setEmergency(findUser.getEmergency());
        loginResDto.setIsFirst(findUser.getIsFirst());
        loginResDto.setPhone(findUser.getPhone());
        return loginResDto;
    }
}