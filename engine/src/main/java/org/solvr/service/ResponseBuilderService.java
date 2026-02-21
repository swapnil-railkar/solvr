package org.solvr.service;

import org.solvr.dto.RequestDto;
import org.solvr.dto.ResponseDto;

public interface ResponseBuilderService {
    ResponseDto getSolutionResponse(final RequestDto request) throws Exception;
}
