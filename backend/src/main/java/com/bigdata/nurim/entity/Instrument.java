
package com.bigdata.nurim.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Instrument {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int instrumentId;
    @Column(nullable = false)
    private String instrumentName;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "locationId")
    private Location location;

}
