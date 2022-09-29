package com.bigdata.nurim.mongo;

import com.bigdata.nurim.dto.WordAnalysisDto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WordRepository extends MongoRepository<WordAnalysisDto, Integer> {
    List<WordAnalysisDto> findAllByLocationId(int locationId);
    void deleteAllByLocationId(int locationId);

}
