package com.bigdata.nurim.dto;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document("wordanalysis")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class WordAnalysisDto {
    @Id
    private int locationId;
    private Map<String, Long> word;

}
