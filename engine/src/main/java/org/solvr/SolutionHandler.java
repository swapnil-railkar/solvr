package org.solvr;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.solvr.dto.RequestDto;
import org.solvr.dto.ResponseDto;
import org.solvr.service.ResponseBuilderService;
import org.solvr.service.impl.ResponseBuilderServiceImpl;

import java.util.Map;

public class SolutionHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final ObjectMapper mapper = new ObjectMapper();
    private final ResponseBuilderService responseBuilderService = new ResponseBuilderServiceImpl();

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent event, Context context) {
        try {
            final RequestDto body = mapper.readValue(event.getBody(), RequestDto.class);
            final ResponseDto response = responseBuilderService.getSolutionResponse(body);
            final String responseJSON = mapper.writeValueAsString(response);
            System.out.println("response : " + responseJSON);
            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(200)
                    .withHeaders(Map.of("Content-Type", "application/json"))
                    .withBody(responseJSON);
        } catch (Exception e) {
            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(500)
                    .withHeaders(Map.of("Content-Type", "application/json"))
                    .withBody(e.getMessage());
        }
    }
}
