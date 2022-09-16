package com.bigdata.nurim.dto;

import com.bigdata.nurim.entity.Role;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ModifyUserInfoDto {
    private String nickname;
    private String phone;
    private String emergency;
    private String imgUrl;
}
