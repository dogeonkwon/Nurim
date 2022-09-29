package com.bigdata.nurim.controller;

import com.bigdata.nurim.service.SparkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class SparkController {

    @Autowired
    SparkService service;


    @Value("${komoran.path}")
    String userDicPath;

//    @RequestMapping(method = RequestMethod.POST, path = "/wordcount")
//    public Map<String, Long> count(@RequestParam(value = "content",required = false) String words) {
//
//        //코모란 LIGHT 모델 호출
//        Komoran komoran = new Komoran(DEFAULT_MODEL.LIGHT);
//        //UserDic 적용
//        komoran.setUserDic(userDicPath);
//
//        //words 분석
//        KomoranResult analyzeResultList = komoran.analyze(words);
//        //명사 추출
//        List<String> list = analyzeResultList.getNouns();
//        //추출한 명사 내 공백 제거
//        List<String> wordList = list.stream()
//                        .map(str -> str.replaceAll(" ",""))
//                        .collect(Collectors.toList());
//
//        return service.getCount(wordList);
//    }
}
