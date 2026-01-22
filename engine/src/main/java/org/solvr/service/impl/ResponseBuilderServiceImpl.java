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

    @Override
    public String getSolutionResponse(final RequestDto request) throws JsonProcessingException {
        final AISolutionService aiSolutionService = new AISolutionServiceImpl(request.getProblemStatement());
        if(request.getShowHints()) {
            final AIHintsResponse hintsResponse = aiSolutionService.getHintsForProblem();
            final ResponseDto responseDto = ResponseDto.builder()
                    .hints(hintsResponse.getHints())
                    .problemStatement(request.getProblemStatement())
                    .build();
            return mapper.writeValueAsString(responseDto);
        } else {
            final AISolutionResponse solutionResponse = aiSolutionService.getSolutionForProblem(request.getLanguage());
            final ResponseDto responseDto = ResponseDto.builder()
                    .problemStatement(request.getProblemStatement())
                    .algorithms(solutionResponse.getAlgorithms())
                    .code(solutionResponse.getCode())
                    .intuition(solutionResponse.getIntuition())
                    .timeComplexity(solutionResponse.getTimeComplexity())
                    .dataStructures(solutionResponse.getDataStructures())
                    .build();
            return mapper.writeValueAsString(responseDto);
        }
    }
}
