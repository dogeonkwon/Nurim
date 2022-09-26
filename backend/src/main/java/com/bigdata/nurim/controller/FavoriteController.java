package com.bigdata.nurim.controller;

import com.bigdata.nurim.dto.FavoriteDto;
import com.bigdata.nurim.dto.ReviewWriteDto;
import com.bigdata.nurim.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/favorite")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;
    @GetMapping
    public ResponseEntity<?> getFavoriteList(@AuthenticationPrincipal String email) {
        return favoriteService.getFavoritesInfo(email);
    }
    @PostMapping("/{location_id}")
    public ResponseEntity<String> add(@AuthenticationPrincipal String email, @PathVariable int location_id) {
        return favoriteService.add(email,location_id);
    }
    @DeleteMapping("/{favorite_id}")
    public ResponseEntity<String> delete(@PathVariable int favorite_id) {
        return favoriteService.delete(favorite_id);
    }

}
