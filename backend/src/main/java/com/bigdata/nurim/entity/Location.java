package com.bigdata.nurim.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int locationId;
    @Column(nullable = false)
    private String locationName;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    private String lat;
    @Column(nullable = false)
    private String lng;
    @Column(nullable = false)
    private String locationType;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Favorite> favorites = new ArrayList<>();
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Instrument> instruments = new ArrayList<>();
}
