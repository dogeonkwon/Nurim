package com.bigdata.nurim.service;

import com.bigdata.nurim.dto.WordAnalysisDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class MongoService {
    private final ImageUploadService imageUploadService;
    private final MongoTemplate mongoTemplate;

    //MongoDB 저장내용 불러오기
    public ResponseEntity<WordAnalysisDto> getInfo(int locationId) {

        WordAnalysisDto wordAnalysisDto = mongoTemplate.findOne(
                Query.query(Criteria.where("_id").is(locationId)),
                WordAnalysisDto.class);

        String text = getText(wordAnalysisDto.getWord());
        String tmp=performPostCall(text);
        log.warn(tmp);
        return new ResponseEntity<>(wordAnalysisDto, HttpStatus.OK);
    }
    private MultipartFile getMultipartFile(File file) throws IOException {
        FileItem fileItem = new DiskFileItem("originFile", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

        try {
            InputStream input = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);
        } catch (IOException e) {
            e.printStackTrace();
        }
        //jpa.png -> multipart 변환
        MultipartFile mFile = new CommonsMultipartFile(fileItem);
        return mFile;
    }
    public String getText(Map<String,Long>map){

        StringBuilder text=new StringBuilder();
        Iterator<String> keys = map.keySet().iterator();
        while (keys.hasNext()) {
            String key = keys.next();
            long count = map.get(key);
            while(count-->0){
                text.append(key+" ");
            }
        }
        return text.toString();
    }
    private static void copyInputStreamToFile(InputStream inputStream, File file) {

        try (FileOutputStream outputStream = new FileOutputStream(file)) {
            int read;
            byte[] bytes = new byte[1024];

            while ((read = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    public String  performPostCall(String text) {
        String result="";
        try {
            HttpClient httpclient = HttpClients.createDefault();
            HttpPost httppost = new HttpPost("https://quickchart.io/wordcloud");
            List<NameValuePair> params = new ArrayList<NameValuePair>(2);
            params.add(new BasicNameValuePair("format", "png"));
            params.add(new BasicNameValuePair("scale", "linear"));
            params.add(new BasicNameValuePair("fontScale","20"));
            params.add(new BasicNameValuePair("text", text));
            HttpResponse response = httpclient.execute(httppost);
            HttpEntity entity = response.getEntity();
            httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
            if (entity != null) {
                try (InputStream inputStream = entity.getContent()) {
                    File file = File.createTempFile(String.valueOf(inputStream.hashCode()), ".png");
                    file.deleteOnExit();
                    copyInputStreamToFile(inputStream, file);

                    FileItem fileItem = new DiskFileItem("result", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

                    try {
                        InputStream input = new FileInputStream(file);
                        OutputStream os = fileItem.getOutputStream();
                        IOUtils.copy(input, os);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    MultipartFile multipartFile = new CommonsMultipartFile(fileItem);

                    result = imageUploadService.uploadImge(multipartFile);
                }
            }
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return result;
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
        //List<String> oldWordList = new ArrayList<>(oldWord.keySet());

        //새롭게 DB에 저장할 HashMap
        Map<String, Long> saveWord = oldWord;

        for (String key: newWordList) {
            if(saveWord.containsKey(key)){
                long containCount = saveWord.get(key)-newWord.get(key);
                if(containCount != 0){
                    saveWord.put(key,containCount);
                }else{
                    saveWord.remove(key);
                }
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