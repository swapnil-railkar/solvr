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
public class RequestDto {
    private String token;
    private String problemStatement;
    private String language;
    private Boolean showHints;
}
