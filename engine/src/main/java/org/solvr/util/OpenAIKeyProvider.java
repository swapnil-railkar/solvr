package org.solvr.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

public class OpenAIKeyProvider {

    public static String getApiKey() throws Exception {
        try (SecretsManagerClient client = SecretsManagerClient.builder()
                .region(Region.AP_SOUTH_1)
                .build()) {
            final String secretName = "solvr-openai-key";
            final GetSecretValueRequest getSecretValueRequest = GetSecretValueRequest.builder()
                    .secretId(secretName)
                    .build();
            final GetSecretValueResponse getSecretValueResponse = client.getSecretValue(getSecretValueRequest);
            final String secretsJSON = getSecretValueResponse.secretString();
            final ObjectMapper mapper = new ObjectMapper();
            final JsonNode root = mapper.readTree(secretsJSON);

            final JsonNode apiKeyNode = root.get("openai-api-key");
            if (apiKeyNode == null || apiKeyNode.isNull()) {
                throw new IllegalStateException(
                        "'openai-api-key' not found in secret " + secretName
                );
            }

            return apiKeyNode.asText();
        }
    }
}
