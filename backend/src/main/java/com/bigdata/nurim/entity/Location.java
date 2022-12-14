package com.bigdata.nurim.entity;

import com.bigdata.nurim.dto.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashMap;
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
    private String facilities;

    @Column
    private String sido;

    @Column
    private String gu;

    @Column
    private String dong;

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
        ReviewCountDto reviewCountDto = new ReviewCountDto();
        reviewCountDto.setTotal(this.reviews.size());
        HashMap<String,List<LocationReviewDto>> reviews = new HashMap<>();
        String[]arr=new String[]{"green","yellow","red"};
        for(String type:arr)reviews.put(type,new ArrayList<LocationReviewDto>());

        for(Review review:this.reviews){
            int type=review.getType();
            switch (type){
                case 1:
                    reviewCountDto.updateGreen();
                    reviews.get(arr[0]).add(review.toLocationReviewDto());
                    break;
                case 2:
                    reviewCountDto.updateYellow();
                    reviews.get(arr[1]).add(review.toLocationReviewDto());
                    break;
                default:
                    reviewCountDto.updateRed();
                    reviews.get(arr[2]).add(review.toLocationReviewDto());
            }
        }

        return LocationDto.builder()
                .locationId(this.locationId)
                .locationName(this.locationName)
                .address(this.address)
                .phone(this.phone)
                .lat(this.lat)
                .lng(this.lng)
                .sido(this.sido)
                .gu(this.gu)
                .dong(this.dong)
                .openingHours(this.openingHours)
                .mainCategoryId(this.subCategory.getMainCategory().getMainCategoryId())
                .mainCategoryName(this.subCategory.getMainCategory().getMainCategoryName())
                .subCategoryName(this.subCategory.getSubCategoryName())
                .facilities(facilities)
                .reviewCount(reviewCountDto)
                .reviews(reviews)
                .build();
    }
    public LocationPosDto toLocationPosDto(){
        return LocationPosDto.builder()
                .locationName(this.locationName)
                .locationId(this.locationId)
                .lat(this.lat)
                .lng(this.lng)
                .address(this.address)
                .build();
    }
}
