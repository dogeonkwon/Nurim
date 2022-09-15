package com.bigdata.nurim.controller;

import com.bigdata.nurim.dto.TaxiDto;
import com.bigdata.nurim.service.TaxiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/taxi")
@RequiredArgsConstructor
public class TaxiController {

    private final TaxiService taxiService;

    @GetMapping("/{address}")
    public ResponseEntity<List<TaxiDto>> getInfo(@PathVariable String address) {
        return taxiService.getInfo(address);
    }

}
