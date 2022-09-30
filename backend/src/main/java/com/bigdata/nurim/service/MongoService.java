package com.bigdata.nurim.service;

import com.bigdata.nurim.dto.WordAnalysisDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class MongoService {

    private final MongoTemplate mongoTemplate;

    //MongoDB 저장내용 불러오기
    public ResponseEntity<WordAnalysisDto> getInfo(int locationId) {

        WordAnalysisDto wordAnalysisDto = mongoTemplate.findOne(
                Query.query(Criteria.where("_id").is(locationId)),
                WordAnalysisDto.class);

        return new ResponseEntity<>(wordAnalysisDto, HttpStatus.OK);
    }

    //리뷰 분석 저장
    public void save(WordAnalysisDto wordAnalysisDto){
        //기존에 DB에 있던 데이터를 가져온 리스트
        WordAnalysisDto dbWords = mongoTemplate.findOne(
                Query.query(Criteria.where("_id").is(wordAnalysisDto.getLocationId())),
                WordAnalysisDto.class
        );

        //DB에 등록된 데이터가 없는 경우
        if(dbWords == null){
            mongoTemplate.save(wordAnalysisDto);    //새롭게 입력받은 리뷰를 mongoDB에 저장
        }
        //DB에 등록된 데이터가 있는 경우
        else{
            //새로 입력한 리뷰의 WordMap, wordList 생성
            Map<String, Long> newWord = wordAnalysisDto.getWord();
            List<String> newWordList = new ArrayList<>(newWord.keySet());

            //기존에 DB에 있던 리뷰의 WordMap, wordList 생성
            Map<String, Long> oldWord = dbWords.getWord();
            List<String> oldWordList = new ArrayList<>(oldWord.keySet());

            //새롭게 DB에 저장할 HashMap
            Map<String, Long> saveWord = new HashMap<>();

            for (String key: newWordList) {
                if(oldWord.containsKey(key)){
                    saveWord.put(key, newWord.get(key)+oldWord.get(key));
                }else if(!oldWord.containsKey(key)){
                    saveWord.put(key, newWord.get(key));
                }
            }

            for (String key: oldWordList) {
                if(saveWord.containsKey(key)){
                    continue;
                }else if(!saveWord.containsKey(key)){
                    saveWord.put(key, oldWord.get(key));
                }
            }

            //MongoDB에서 해당 장소 리뷰 삭제
            mongoTemplate.remove(
                    Query.query(Criteria.where("_id").is(wordAnalysisDto.getLocationId())),
                    WordAnalysisDto.class
            );

            mongoTemplate.insert(new WordAnalysisDto(wordAnalysisDto.getLocationId(), saveWord));


        }

    }

    //리뷰 분석 삭제
    public void delete(WordAnalysisDto wordAnalysisDto){
        //기존에 DB에 있던 데이터를 가져온 리스트
        WordAnalysisDto dbWords = mongoTemplate.findOne(
                Query.query(Criteria.where("_id").is(wordAnalysisDto.getLocationId())),
                WordAnalysisDto.class
        );

        //삭제할 리뷰의 WordMap, wordList 생성
        Map<String, Long> newWord = wordAnalysisDto.getWord();
        List<String> newWordList = new ArrayList<>(newWord.keySet());

        //기존에 DB에 있던 리뷰의 WordMap, wordList 생성
        Map<String, Long> oldWord = dbWords.getWord();
        List<String> oldWordList = new ArrayList<>(oldWord.keySet());

        //새롭게 DB에 저장할 HashMap
        Map<String, Long> saveWord = new HashMap<>();

        for (String key: newWordList) {
            if(oldWord.containsKey(key)){
                long containCount = oldWord.get(key)-newWord.get(key);
                if(containCount != 0){
                    saveWord.put(key,containCount);
                }
            }
        }

        for (String key: oldWordList) {
            if(!saveWord.containsKey(key)){
                saveWord.put(key, oldWord.get(key));
            }
        }

        //MongoDB에서 해당 장소 리뷰 삭제
        mongoTemplate.remove(
                Query.query(Criteria.where("_id").is(wordAnalysisDto.getLocationId())),
                WordAnalysisDto.class
        );

        mongoTemplate.insert(new WordAnalysisDto(wordAnalysisDto.getLocationId(), saveWord));

    }

    //수정리뷰 분석 적용
    public void update(WordAnalysisDto newWordAnalysisDto, WordAnalysisDto oldWordAnalysisDto){
        //기존에 DB에 있던 데이터를 가져온 리스트
        WordAnalysisDto dbWords = mongoTemplate.findOne(
                Query.query(Criteria.where("_id").is(newWordAnalysisDto.getLocationId())),
                WordAnalysisDto.class
        );

        //기존에 DB에 있던 리뷰의 WordMap, wordList 생성
        Map<String, Long> oldWord = dbWords.getWord();
        List<String> oldWordList = new ArrayList<>(oldWord.keySet());

        //새로 입력한 리뷰의 WordMap, wordList 생성
        Map<String, Long> newWord = newWordAnalysisDto.getWord();
        List<String> newWordList = new ArrayList<>(newWord.keySet());

        //수정될 리뷰의 WordMap, wordList 생성
        Map<String, Long> modifyWord = oldWordAnalysisDto.getWord();
        List<String> modifyWordList = new ArrayList<>(modifyWord.keySet());

        //새롭게 DB에 저장할 HashMap
        Map<String, Long> saveWord = oldWord;

        //새로 입력한 리뷰 등록
        for (String key: newWordList) {
            if(saveWord.containsKey(key)){
                saveWord.put(key, newWord.get(key)+saveWord.get(key));
            }else if(!saveWord.containsKey(key)){
                saveWord.put(key, newWord.get(key));
            }
        }

        //수정될 리뷰 삭제
        for (String key: modifyWordList) {
            if(saveWord.containsKey(key)){
                long containCount = saveWord.get(key)-modifyWord.get(key);
                if(containCount != 0){
                    saveWord.put(key, containCount);
                }
            }
        }

        //MongoDB에서 해당 장소 리뷰 삭제
        mongoTemplate.remove(
                Query.query(Criteria.where("_id").is(newWordAnalysisDto.getLocationId())),
                WordAnalysisDto.class
        );

        mongoTemplate.insert(new WordAnalysisDto(newWordAnalysisDto.getLocationId(), saveWord));

    }
}