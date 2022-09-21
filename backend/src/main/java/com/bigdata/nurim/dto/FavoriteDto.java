package com.bigdata.nurim.dto;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteDto {

    private int favoriteId;
    private int locationId;
    private String locationName;
    private String locationAddress;

}

