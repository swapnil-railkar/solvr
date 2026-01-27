package org.solvr.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseOutputItem;
import com.openai.models.responses.ResponseOutputMessage;
import lombok.AllArgsConstructor;

import java.util.Optional;

@AllArgsConstructor
public class AIClient {

    private final String prompt;

    public <T> T call(Class<T> responseWrapper) throws Exception {
        final ObjectMapper mapper = new ObjectMapper();
        final String apiKey = OpenAIKeyProvider.getApiKey();
        System.out.println("Creating openai client");
        final OpenAIClient client = OpenAIOkHttpClient.builder().apiKey(apiKey).build();
        System.out.println("Fetching response....");
        final ResponseCreateParams params = ResponseCreateParams.builder()
                .input(prompt)
                .model("gpt-5-nano")
                .build();

        final Response response = client.responses().create(params);
        System.out.println("Completed fetching response....");
        final String outputJSON = extractText(response);
        System.out.println("Extracted output JSON : " + outputJSON);
        return mapper.readValue(outputJSON, responseWrapper);
    }

    private String extractText(final Response response) {
        final StringBuilder sb = new StringBuilder();

        response.output().stream()
                .map(ResponseOutputItem::message)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(ResponseOutputMessage::content)
                .forEach(contents -> contents.stream()
                        .map(ResponseOutputMessage.Content::outputText)
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .forEach(responseOutputText -> sb.append(responseOutputText.text()))
                );
        return sb.toString().trim();
    }
}
