package org.solvr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AISolutionResponse {
    private String intuition;
    private String code;
    private String timeComplexity;
    private String dataStructures;
    private String algorithms;
}
