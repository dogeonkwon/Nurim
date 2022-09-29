package com.bigdata.nurim.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TaxiDto {

    @Schema(description = "콜택시 식별자")
    private int taxiId;
    @Schema(description = "콜택시 주소")
    private String taxiAddress;
    @Schema(description = "대표 전화번호")
    private String taxiPhone;
    @Schema(description = "평일 예약접수 운영시작 시간")
    private String taxiWeekdayBookStart;
    @Schema(description = "평일 예약접수 운영종료 시간")
    private String taxiWeekdayBookEnd;
    @Schema(description = "주말 예약접수 운영시작 시간")
    private String taxiWeekendBookStart;
    @Schema(description = "주말 예약접수 운영종료 시간")
    private String taxiWeekendBookEnd;
    @Schema(description = "평일 차량 운행시작 시간")
    private String taxiWeekdayServiceStart;
    @Schema(description = "평일 차량 운행종료 시간")
    private String taxiWeekdayServiceEnd;
    @Schema(description = "주말 차량 운행시작 시간")
    private String taxiWeekendServiceStart;
    @Schema(description = "주말 차량 운행종료 시간")
    private String taxiWeekendServiceEnd;
    @Schema(description = "사전예약 신청기간")
    private String taxiBookPeriod;
    @Schema(description = "차량 관내 운행 지역")
    private String taxiInArea;
    @Schema(description = "차량 관외 운행 지역")
    private String taxiOutArea;
    @Schema(description = "차량 이용 요금")
    private String taxiFee;
    @Schema(description = "관리기관 전화번호")
    private String taxiAgencyPhone;
    @Schema(description = "차량이용대상")
    private String taxiTarget;
    @Schema(description = "보유차량대수")
    private String taxiNumberOfVehicles;
    @Schema(description = "예약접수인터넷주소")
    private String taxiReservation;
    @Schema(description = "앱서비스명")
    private String taxiAppService;
}
