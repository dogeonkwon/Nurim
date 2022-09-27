package com.bigdata.nurim.service;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SparkService {

    @Autowired
    JavaSparkContext sc;

    @Value("${komoran.path}")
    String userDicPath;

    public Map<String, Long> getCount(String contents){

        //코모란 LIGHT 모델 호출
        Komoran komoran = new Komoran(DEFAULT_MODEL.LIGHT);
        //UserDic 적용
        komoran.setUserDic(userDicPath);

        //words 분석
        KomoranResult analyzeResultList = komoran.analyze(contents);
        //명사 추출
        List<String> list = analyzeResultList.getNouns();
        //추출한 명사 내 공백 제거
        List<String> wordList = list.stream()
                .map(str -> str.replaceAll(" ",""))
                .collect(Collectors.toList());

        JavaRDD<String> words = sc.parallelize(wordList);
        Map<String, Long> wordCounts = words.countByValue();
        return wordCounts;
    }

}
