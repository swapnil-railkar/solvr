package org.solvr.service;

import org.solvr.dto.AIHintsResponse;
import org.solvr.dto.AISolutionResponse;

public interface AISolutionService {

    AIHintsResponse getHintsForProblem(final String problemStatement);

    AISolutionResponse getSolutionForProblem(final String problemStatement, final String language);
}
