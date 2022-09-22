package com.bigdata.nurim.entity;

import com.bigdata.nurim.dto.TaxiDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Taxi {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int taxiId;
    @Column
    private String taxiAddress;
    @Column
    private String taxiPhone;
    @Column
    private String taxiWeekdayBookStart;
    @Column
    private String taxiWeekdayBookEnd;
    @Column
    private String taxiWeekendBookStart;
    @Column
    private String taxiWeekendBookEnd;
    @Column
    private String taxiWeekdayServiceStart;
    @Column
    private String taxiWeekdayServiceEnd;
    @Column
    private String taxiWeekendServiceStart;
    @Column
    private String taxiWeekendServiceEnd;
    @Column
    private String taxiBookPeriod;
    @Column
    private String taxiInArea;
    @Column
    private String taxiOutArea;
    @Column
    private String taxiFee;
    @Column
    private String taxiAgencyPhone;

    public TaxiDto toDto() {
        return TaxiDto.builder()
                .taxiId(this.getTaxiId())
                .taxiAddress(this.taxiAddress)
                .taxiPhone(this.taxiPhone)
                .taxiWeekdayServiceStart(this.taxiWeekdayServiceStart)
                .taxiWeekdayServiceEnd(this.taxiWeekdayServiceEnd)
                .taxiWeekendServiceStart(this.taxiWeekendServiceStart)
                .taxiWeekendServiceEnd(this.taxiWeekendServiceEnd)
                .taxiWeekdayBookStart(this.taxiWeekdayBookStart)
                .taxiWeekdayBookEnd(this.taxiWeekdayBookEnd)
                .taxiWeekendBookStart(this.taxiWeekendBookStart)
                .taxiWeekendBookEnd(this.taxiWeekendBookEnd)
                .taxiBookPeriod(this.taxiBookPeriod)
                .taxiInArea(this.taxiInArea)
                .taxiOutArea(this.taxiOutArea)
                .taxiFee(this.taxiFee)
                .taxiAgencyPhone(this.taxiAgencyPhone)
                .build();
    }

}
