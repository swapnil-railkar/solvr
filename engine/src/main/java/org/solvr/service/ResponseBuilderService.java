package org.solvr.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.solvr.dto.RequestDto;
import org.solvr.dto.ResponseDto;

public interface ResponseBuilderService {
    ResponseDto getSolutionResponse(final RequestDto request) throws JsonProcessingException;
}
