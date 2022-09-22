package com.bigdata.nurim.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LocationDto {

    //장소 식별자
    private int locationId;
    //장소명
    private String locationName;
    //주소
    private String address;
    //전화번호
    private String phone;
    //위도
    private String lat;
    //경도
    private String lng;
    //운영 시간
    private String openingHours;
    private String subCategoryName;
    private String mainCategoryName;
    private List<String> facilities = new ArrayList<>();
}
