package com.bigdata.nurim.entity;

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
public class Slope {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int slopeId;
    @Column
    private String slopeCode;
    @Column
    private String slopeName;
    @Column
    private String slopeAddress;
}
