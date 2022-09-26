package com.bigdata.nurim.controller;

import com.bigdata.nurim.service.SparkService;
import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class SparkController {

    @Autowired
    SparkService service;


    @Value("${komoran.path}")
    String userDicPath;

    @RequestMapping(method = RequestMethod.POST, path = "/wordcount")
    public Map<String, Long> count(@RequestParam(value = "content",required = false) String words) {


        Komoran komoran = new Komoran(DEFAULT_MODEL.LIGHT);
        komoran.setUserDic(userDicPath);

        System.out.print("Plane Text: ");
        System.out.println(words);

        KomoranResult analyzeResultList = komoran.analyze(words);

        System.out.println("getNouns : "+analyzeResultList.getNouns());
        System.out.println("getPlaneText : "+analyzeResultList.getPlainText());
        System.out.println("getList : "+analyzeResultList.getList());
        System.out.println("getMorphesByTags : "+analyzeResultList.getMorphesByTags("NP", "NNP", "JKB"));

        List<String> wordList = Arrays.asList(words.split(","));
        return service.getCount(wordList);
    }
}
