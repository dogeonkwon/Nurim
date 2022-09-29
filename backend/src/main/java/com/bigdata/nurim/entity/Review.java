package com.bigdata.nurim.entity;

import com.bigdata.nurim.dto.ReviewDto;
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
public class Review {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int reviewId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String createdDate;

    @Column(nullable = false)
    private int type;

    @Column(nullable = false)
    private boolean reported;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "locationId")
    private Location location;

    public void report(){
        this.reported=true;
    }
    public void update(String content){
        this.content = content;
    }
    public ReviewDto toDto(){
        return ReviewDto.builder()
                .reviewId(this.reviewId)
                .content(this.content)
                .type(this.type)
                .locationName(this.location.getLocationName())
                .locationId(this.location.getLocationId())
                .createdDate(this.createdDate)
                .nickname(this.user.getNickname())
                .build();
    }
}