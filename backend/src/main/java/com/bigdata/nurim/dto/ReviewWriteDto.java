package com.bigdata.nurim.dto;

import lombok.Data;

@Data
public class ReviewWriteDto {
    private String content;
    private int locationId;
    private int type;
}
