package com.bigdata.nurim.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FirstLoginInfoDto {
    private String phone;
    private String emergency;
}
