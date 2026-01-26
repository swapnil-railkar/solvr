package org.solvr.service;

import org.solvr.dto.AIHintsResponse;
import org.solvr.dto.AISolutionResponse;

public interface AISolutionService {

    AIHintsResponse getHintsForProblem() throws Exception;

    AISolutionResponse getSolutionForProblem(final String language) throws Exception;
}
