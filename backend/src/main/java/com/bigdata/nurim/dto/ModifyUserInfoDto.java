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
    private String userName;
    private String phone;
    private String emergency;
}
