package org.solvr.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.solvr.dto.AIHintsResponse;
import org.solvr.dto.AISolutionResponse;
import org.solvr.service.AISolutionService;
import org.solvr.util.AIClient;
import org.solvr.util.Constants;

public class AISolutionServiceImpl implements AISolutionService {

    private final StringBuilder promptBuilder;

    public AISolutionServiceImpl(final String problemStatement) {
        promptBuilder = new StringBuilder();
        final String basePrompt = String.format(Constants.BASE_PROMPT, problemStatement);
        promptBuilder.append(basePrompt);
    }

    @Override
    public AIHintsResponse getHintsForProblem() throws JsonProcessingException {
        promptBuilder.append(Constants.GET_HINT_PROMPT);
        final AIClient client = new AIClient(promptBuilder.toString());
        return client.call(AIHintsResponse.class);
    }

    @Override
    public AISolutionResponse getSolutionForProblem(final String language) throws JsonProcessingException {
        final String getSolutionPrompt = String.format(Constants.GET_SOLUTION_PROMPT, language);
        promptBuilder.append(getSolutionPrompt);
        final AIClient client = new AIClient(promptBuilder.toString());
        return client.call(AISolutionResponse.class);
    }
}
