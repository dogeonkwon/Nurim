package com.bigdata.nurim.entity;

import com.bigdata.nurim.dto.FavoriteDto;
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
public class Favorite {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int favoriteId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "locationId")
    private Location location;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    public FavoriteDto toDto(){
        return FavoriteDto.builder()
                .favoriteId(this.getFavoriteId())
                .locationId(this.getLocation().getLocationId())
                .locationName(this.getLocation().getLocationName())
                .locationAddress(this.getLocation().getAddress())
                .build();
    }
}
