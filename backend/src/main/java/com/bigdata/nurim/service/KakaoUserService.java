package com.bigdata.nurim.service;

import com.bigdata.nurim.dto.LoginDto;
import com.bigdata.nurim.repository.UserRepository;
import com.bigdata.nurim.dto.UserDto;
import com.bigdata.nurim.entity.LoginType;
import com.bigdata.nurim.entity.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class KakaoUserService implements SocialUserService {

    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    @Transactional
    public UserDto getUserInfoByAccessToken(String access_token) {
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        String result = "";
        try {

            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");

            // 전송할 header 작성
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + access_token);
            conn.setRequestProperty("charset", "UTF-8");

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            while ((line = br.readLine()) != null) {
                result += line;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return StringToDto(result);
    }
    @Override
    public HttpEntity<? extends Object> login(String access_token) {

        UserDto userDto = getUserInfoByAccessToken(access_token);

        LoginDto loginDto = new LoginDto();
        loginDto.setEmail(userDto.getEmail());
        loginDto.setPassword(userDto.getPassword());
        return userService.login(loginDto);
    }

    @Override
    public UserDto StringToDto(String userInfo) {
        UserDto userDto = new UserDto();
        try {
            // JSON 파싱
            JSONParser parser = new JSONParser();
            JSONObject jsonObj = (JSONObject) parser.parse(userInfo);

            JSONObject kakao_account = (JSONObject) jsonObj.get("kakao_account");
            JSONObject profile = (JSONObject) kakao_account.get("profile");
            userDto.setRole(Role.USER);

            String email = jsonObj.get("id").toString()+"KAKAO_NURIM";
            userDto.setEmail(email);
            userDto.setPassword(jsonObj.get("id").toString());

            Optional user = userRepository.findByEmail(email);
            if(user.isPresent()){
                return userDto;
            }
            String name;
            String temp_nickname = UUID.randomUUID().toString().replaceAll("-", "");
            temp_nickname = "User"+temp_nickname.substring(0, 10);
            name=(String)profile.getOrDefault("name",temp_nickname);
            userDto.setUserName(name);

            userService.signup(userDto, LoginType.KAKAO);

        } catch (ParseException e) {
            e.printStackTrace();
        }
        return userDto;
    }
}
