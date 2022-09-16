package com.bigdata.nurim.entity;

import com.bigdata.nurim.dto.LocationDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

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

    @Column
    private String phone;

    @Column
    private String openingHours;

    @Column(nullable = false)
    private String lat;

    @Column(nullable = false)
    private String lng;

    @Column(nullable = false)
    private String locationType;

    @Column(nullable = false)
    private String subcategory;

    @Column(nullable = false)
    private String facilities;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Favorite> favorites = new ArrayList<>();

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "subCategoryId")
    private SubCategory subCategory;

    public LocationDto toDto() {

        List<String>facilities = new ArrayList<>();
        for(String facility:this.facilities.split(",")){
            facilities.add(facility);
        }

        return LocationDto.builder()
                .locationId(this.locationId)
                .locationName(this.locationName)
                .address(this.address)
                .phone(this.phone)
                .lat(this.lat)
                .lng(this.lng)
                .openingHours(this.openingHours)
                .mainCategoryName(this.subCategory.getMainCategory().getMainCategoryName())
                .subCategoryName(this.subCategory.getSubCategoryName())
                .facilities(facilities)
                .build();
    }
}
