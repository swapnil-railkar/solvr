package org.solvr.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.solvr.dto.AIHintsResponse;
import org.solvr.dto.AISolutionResponse;

public interface AISolutionService {

    AIHintsResponse getHintsForProblem() throws JsonProcessingException;

    AISolutionResponse getSolutionForProblem(final String language) throws JsonProcessingException;
}
