package org.solvr.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.solvr.dto.AIHintsResponse;
import org.solvr.dto.AISolutionResponse;
import org.solvr.dto.RequestDto;
import org.solvr.dto.ResponseDto;
import org.solvr.service.AISolutionService;
import org.solvr.service.ResponseBuilderService;

public class ResponseBuilderServiceImpl implements ResponseBuilderService {

    private static final ObjectMapper mapper = new ObjectMapper();
    private static final int MAX_PROBLEM_CHARS = 4000;

    @Override
    public String getSolutionResponse(final RequestDto request) throws JsonProcessingException {
        final String sanitizedInput = sanitizeProblemStatement(request.getProblemStatement());
        if (sanitizedInput.isBlank()) {
            throw new IllegalArgumentException("Problem statement cannot be empty");
        }
        final AISolutionService aiSolutionService = new AISolutionServiceImpl(sanitizedInput);
        if(request.getShowHints()) {
            final AIHintsResponse hintsResponse = aiSolutionService.getHintsForProblem();
            final ResponseDto responseDto = ResponseDto.builder()
                    .hints(hintsResponse.getHints())
                    .problemStatement(sanitizedInput)
                    .build();
            return mapper.writeValueAsString(responseDto);
        } else {
            final AISolutionResponse solutionResponse = aiSolutionService.getSolutionForProblem(request.getLanguage());
            final ResponseDto responseDto = ResponseDto.builder()
                    .problemStatement(sanitizedInput)
                    .algorithms(solutionResponse.getAlgorithms())
                    .code(solutionResponse.getCode())
                    .intuition(solutionResponse.getIntuition())
                    .timeComplexity(solutionResponse.getTimeComplexity())
                    .dataStructures(solutionResponse.getDataStructures())
                    .build();
            return mapper.writeValueAsString(responseDto);
        }
    }

    private String sanitizeProblemStatement(final String input) {
        if (input == null || input.isBlank()) {
            throw new IllegalArgumentException("Problem statement cannot be empty");
        }
        if (input.length() > MAX_PROBLEM_CHARS) {
            throw new IllegalArgumentException("Problem statement too long");
        }
        String cleaned = input.replaceAll("\\p{Cntrl}&&[^\n" + "\t]", "");
        return cleaned.trim().replaceAll("\\s{3,}", "\n\n");
    }
}
