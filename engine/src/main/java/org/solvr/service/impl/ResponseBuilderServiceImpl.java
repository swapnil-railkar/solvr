package org.solvr.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.solvr.dto.RequestDto;
import org.solvr.dto.ResponseDto;
import org.solvr.service.ResponseBuilderService;

public class ResponseBuilderServiceImpl implements ResponseBuilderService {

    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String getSolutionResponse(final RequestDto request) throws JsonProcessingException {
        final ResponseDto responseDto = ResponseDto.builder().code(request.getLanguage()).build();
        return mapper.writeValueAsString(responseDto);
    }
}
