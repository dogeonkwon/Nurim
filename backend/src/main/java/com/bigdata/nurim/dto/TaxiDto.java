package com.bigdata.nurim.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TaxiDto {

    //콜택시 식별자
    private int taxiId;
    //콜택시 주소
    private String taxiAddress;
    //대표 전화번호
    private String taxiPhone;
    //평일 예약접수 운영시작 시간
    private String taxiWeekdayBookStart;
    //평일 예약접수 운영종료 시간
    private String taxiWeekdayBookEnd;
    //주말 예약접수 운영시작 시간
    private String taxiWeekendBookStart;
    //주말 예약접수 운영종료 시간
    private String taxiWeekendBookEnd;
    //평일 차량 운행시작 시간
    private String taxiWeekdayServiceStart;
    //평일 차량 운행종료 시간
    private String taxiWeekdayServiceEnd;
    //주말 차량 운행시작 시간
    private String taxiWeekendServiceStart;
    //주말 차량 운행종료 시간
    private String taxiWeekendServiceEnd;
    //사전예약 신청기간
    private String taxiBookPeriod;
    //차량 관내 운행 지역
    private String taxiInArea;
    //차량 관외 운행 지역
    private String taxiOutArea;
    //차량 이용 요금
    private String taxiFee;
    //관리기관 전화번호
    private String taxiAgencyPhone;
}
