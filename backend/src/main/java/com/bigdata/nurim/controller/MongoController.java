package com.bigdata.nurim.controller;

import com.bigdata.nurim.dto.WordAnalysisDto;
import com.bigdata.nurim.service.MongoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "WordCloud(Mongo)", description = "WordCloud from Mongo API")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/word")
@RequiredArgsConstructor
public class MongoController {

    private final MongoService mongoService;
    @Operation(summary = "Get WordCloud information", description = "WordCloud에 필요한 정보 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = WordAnalysisDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @Parameter(name = "location_id", description = "장소Id에 해당하는 리뷰 분석정보 제공")
    @GetMapping("/{location_id}")
    public ResponseEntity<WordAnalysisDto> getInfo(@PathVariable int location_id) {
        return mongoService.getInfo(location_id);
    }
}
