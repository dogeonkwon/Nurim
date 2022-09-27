package com.bigdata.nurim.controller;

import com.bigdata.nurim.dto.FavoriteDto;
import com.bigdata.nurim.dto.LocationDto;
import com.bigdata.nurim.dto.ReviewWriteDto;
import com.bigdata.nurim.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@Tag(name = "Favorite", description = "즐겨찾기 API")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/favorite")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;
    @Operation(summary = "Look up Favorites", description = "즐겨찾기 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = FavoriteDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping
    public ResponseEntity<?> getFavoriteList(@AuthenticationPrincipal String email) {
        return favoriteService.getFavoritesInfo(email);
    }
    @Operation(summary = "Add Favorites", description = "즐겨찾기 추가")
    @PostMapping("/{location_id}")
    public ResponseEntity<String> add(@AuthenticationPrincipal String email, @PathVariable int location_id) {
        return favoriteService.add(email,location_id);
    }
    @Operation(summary = "Delete Favorites", description = "즐겨찾기 삭제")
    @DeleteMapping("/{favorite_id}")
    public ResponseEntity<String> delete(@PathVariable int favorite_id) {
        return favoriteService.delete(favorite_id);
    }

}
