package org.solvr;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.solvr.dto.RequestDto;
import org.solvr.service.ResponseBuilderService;
import org.solvr.service.impl.ResponseBuilderServiceImpl;

import java.util.HashMap;
import java.util.Map;

public class SolutionHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final ObjectMapper mapper = new ObjectMapper();
    private final ResponseBuilderService responseBuilderService = new ResponseBuilderServiceImpl();

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent event, Context context) {
        try {
            final RequestDto body = mapper.readValue(event.getBody(), RequestDto.class);
            final String responseJSON = responseBuilderService.getSolutionResponse(body);

            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(200)
                    .withBody(responseJSON);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
