package org.solvr.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.solvr.dto.RequestDto;

public interface ResponseBuilderService {
    String getSolutionResponse(final RequestDto request) throws JsonProcessingException;
}
