package org.solvr.service.impl;

import org.solvr.dto.AIHintsResponse;
import org.solvr.dto.AISolutionResponse;
import org.solvr.service.AISolutionService;
import org.solvr.util.AIClient;
import org.solvr.util.Constants;

public class AISolutionServiceImpl implements AISolutionService {

    @Override
    public AIHintsResponse getHintsForProblem(final String problemStatement) {
        final StringBuilder promptBuilder = new StringBuilder();
        final String basePrompt = String.format(Constants.BASE_PROMPT, problemStatement);
        promptBuilder.append(basePrompt);
        promptBuilder.append(Constants.GET_HINT_PROMPT);
        final AIClient client = new AIClient(promptBuilder.toString());
        return null;
    }

    @Override
    public AISolutionResponse getSolutionForProblem(final String problemStatement, final String language) {
        return null;
    }
}
