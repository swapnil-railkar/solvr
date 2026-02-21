package org.solvr.service.impl;

import org.solvr.dto.AIHintsResponse;
import org.solvr.dto.AISolutionResponse;
import org.solvr.dto.RequestDto;
import org.solvr.dto.ResponseDto;
import org.solvr.service.AISolutionService;
import org.solvr.service.CaptchaVerifierService;
import org.solvr.service.ResponseBuilderService;

public class ResponseBuilderServiceImpl implements ResponseBuilderService {

    private static final int MAX_PROBLEM_CHARS = 4000;

    @Override
    public ResponseDto getSolutionResponse(final RequestDto request) throws Exception {
        final CaptchaVerifierService captchaVerifierService = new CaptchaVerifierServiceImpl();
        if(!captchaVerifierService.validateToken(request.getToken())) {
            throw new IllegalArgumentException("Invalid captcha token");
        }
        System.out.println("Captcha token validated");
        final String sanitizedInput = sanitizeProblemStatement(request.getProblemStatement());
        if (sanitizedInput.isBlank()) {
            throw new IllegalArgumentException("Problem statement cannot be empty");
        }
        System.out.println("Sanitized input : " + sanitizedInput);
        final AISolutionService aiSolutionService = new AISolutionServiceImpl(sanitizedInput);
        if (request.getShowHints()) {
            final AIHintsResponse hintsResponse = aiSolutionService.getHintsForProblem();
            return ResponseDto.builder()
                    .hints(hintsResponse.getHints())
                    .problemStatement(sanitizedInput)
                    .build();

        } else {
            final AISolutionResponse solutionResponse = aiSolutionService.getSolutionForProblem(request.getLanguage());
            final String cleanCode = solutionResponse.getCode()
                    .replace("\\n", "\n");
            return ResponseDto.builder()
                    .problemStatement(sanitizedInput)
                    .algorithms(solutionResponse.getAlgorithms())
                    .code(cleanCode)
                    .intuition(solutionResponse.getIntuition())
                    .timeComplexity(solutionResponse.getTimeComplexity())
                    .dataStructures(solutionResponse.getDataStructures())
                    .build();
        }
    }

    private String sanitizeProblemStatement(final String input) {
        if (input == null || input.isBlank()) {
            throw new IllegalArgumentException("Problem statement cannot be empty");
        }
        if (input.length() > MAX_PROBLEM_CHARS) {
            throw new IllegalArgumentException("Problem statement too long");
        }
        String cleaned = input.replaceAll("\\p{Cntrl}&&[^\n" + "\t]", "");
        return cleaned.trim().replaceAll("\\s{3,}", "\n\n").replaceAll("\n{3,}", "\n\n");
    }
}
