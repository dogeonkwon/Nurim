package com.bigdata.nurim.controller;

import com.bigdata.nurim.service.SparkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
public class SparkController {

    @Autowired
    SparkService service;

    @RequestMapping(method = RequestMethod.POST, path = "/wordcount")
    public Map<String, Long> count(@RequestParam(value = "content",required = false) String words) {
        List<String> wordList = Arrays.asList(words.split(","));
        return service.getCount(wordList);
    }
}
