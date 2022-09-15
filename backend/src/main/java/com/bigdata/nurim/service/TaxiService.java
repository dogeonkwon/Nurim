package com.bigdata.nurim.service;

import com.bigdata.nurim.dto.TaxiDto;
import com.bigdata.nurim.entity.Taxi;
import com.bigdata.nurim.repository.TaxiRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TaxiService {

    private final TaxiRepository taxiRepository;

    public ResponseEntity<List<TaxiDto>> getInfo(String address) {

        List<Taxi> findTaxilist = taxiRepository.findAllByTaxiAddressContaining(address);
        List<TaxiDto> TaxiDtolist = new ArrayList<>();
        for (Taxi taxi: findTaxilist) {
            TaxiDto taxiDto = taxi.toDto();
            TaxiDtolist.add(taxiDto);
        }

        return new ResponseEntity<>(TaxiDtolist, HttpStatus.OK);
    }

}