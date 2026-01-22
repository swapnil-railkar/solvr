package org.solvr.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.solvr.dto.AIHintsResponse;

@AllArgsConstructor
public class AIClient {

    private String prompt;

    public <T>T call(Class<T> responseWrapper) throws JsonProcessingException {
        final ObjectMapper mapper = new ObjectMapper();
        if (responseWrapper == AIHintsResponse.class) {
            return mapper.readValue(PromptConstants.DUMMY_HINTS, responseWrapper);
        }
        return mapper.readValue(PromptConstants.DUMMY_SOLUTION, responseWrapper);
    }
}
