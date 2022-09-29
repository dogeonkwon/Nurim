package com.bigdata.nurim.controller;

import com.bigdata.nurim.dto.TaxiDto;
import com.bigdata.nurim.service.TaxiService;
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

import java.util.List;
@Tag(name = "Taxi", description = "택시 API")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/taxi")
@RequiredArgsConstructor
public class TaxiController {

    private final TaxiService taxiService;
    @Operation(summary = "Get taxi information", description = "택시 정보 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = TaxiDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @Parameter(name = "address", description = "현재 주소", example = "경기도")
    @GetMapping("/{address}")
    public ResponseEntity<List<TaxiDto>> getInfo(@PathVariable String address) {
        return taxiService.getInfo(address);
    }

}
