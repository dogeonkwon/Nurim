package com.bigdata.nurim.controller;

import com.bigdata.nurim.dto.*;
import com.bigdata.nurim.service.KakaoUserService;
import com.bigdata.nurim.service.NaverUserService;
import com.bigdata.nurim.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
@Tag(name = "User", description = "유저 API")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final KakaoUserService kakaoUserService;
    private final NaverUserService naverUserService;
    @Operation(summary = "Kakao Login", description = "카카오계정으로 로그인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = LoginResDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @Parameter(name = "param", description = "카카오 access token", example = "\"access_token\": \"YOUR TOKEN\"")
    @PostMapping("/kakao-login")
    public HttpEntity<?> kakaoLogin(@RequestBody HashMap<String, String> param) {
        kakaoUserService.getUserInfoByAccessToken(param.get("access_token"));
        UserDto userDto = kakaoUserService.getUserInfoByAccessToken(param.get("access_token"));
        return kakaoUserService.login(userDto);
    }
    @Operation(summary = "naver Login", description = "네이버계정으로 로그인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = LoginResDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @Parameter(name = "param", description = "네이버 access token", example = "\"access_token\": \"YOUR TOKEN\"")
    @PostMapping("/naver-login")
    public HttpEntity<?> naverLogin(@RequestBody HashMap<String, String> param) {
        naverUserService.getUserInfoByAccessToken(param.get("access_token"));
        UserDto userDto = naverUserService.getUserInfoByAccessToken(param.get("access_token"));
        return naverUserService.login(userDto);
    }
    @Operation(summary = "Get user's info", description = "사용자 정보 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = LoginResDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping
    public ResponseEntity<?> getInfo(@AuthenticationPrincipal String email) {
        return userService.getInfo(email);
    }
    @Operation(summary = "Withdrawal", description = "회원 탈퇴")
    @DeleteMapping
    public ResponseEntity<String> delete(@AuthenticationPrincipal String email) {
        return userService.delete(email);
    }
    @Operation(summary = "Modify user's info", description = "회원 정보 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = LoginResDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @Parameters({
            @Parameter(name = "file", description = "새로운 프로필 사진", example = "xxx.png"),
            @Parameter(name = "userInfo", description = "변경할 사용자 정보")
    })
    @PutMapping
    public ResponseEntity<?> modify(@RequestPart(value = "file", required = false) MultipartFile file,
                                    @RequestPart(value = "userInfo", required = false) ModifyUserInfoDto modifyUserInfoDto,
                                    @AuthenticationPrincipal String email,
                                    HttpServletRequest request) {
        String token = request.getHeader("jwt-token");
        return userService.modify(modifyUserInfoDto, file, email,token);
    }
    @Operation(summary = "Check nickname duplication", description = "닉네임 중복 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NicknameCheckResultDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @Parameter(name = "nickname", description = "닉네임", example = "가나다라")
    @PostMapping("/nickname-check")
    public ResponseEntity<NicknameCheckResultDto> nicknameCheck(@RequestBody HashMap<String, String> param){
        return userService.nicknameCheck(param.get("nickname"));
    }
    @Operation(summary = "Enter additional information", description = "최초 로그인 시 추가 정보 입력")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @Parameter(name = "firstLoginInfoDto", description = "추가 입력 정보")
    @PostMapping("/write-moreInfo")
    public ResponseEntity<String> writeMoreInfo(@RequestBody FirstLoginInfoDto firstLoginInfoDto,
                                                @AuthenticationPrincipal String email){
        return userService.firstLogin(firstLoginInfoDto,email);
    }
}
