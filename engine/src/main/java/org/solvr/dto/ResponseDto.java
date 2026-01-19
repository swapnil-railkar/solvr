package org.solvr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ResponseDto {

    private String problemStatement;
    private List<String> hints;
    private String intuition;
    private String code;
    private String timeComplexity;
    private String dataStructures;
    private String algorithms;
}
