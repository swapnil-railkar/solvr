package org.solvr.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.solvr.dto.CaptchaResponseDto;
import org.solvr.service.CaptchaVerifierService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

public class CaptchaVerifierServiceImpl implements CaptchaVerifierService {

    private final String SECRET = Optional
            .ofNullable(System.getenv("RECAPTCHA_SECRET"))
            .orElseThrow(() -> new IllegalStateException("RECAPTCHA_SECRET not set"));
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public boolean validateToken(final String token) throws IOException {
        if (Objects.isNull(token) || token.isBlank()) {
            System.out.println("Token is empty or null");
            return false;
        }
        System.out.println("Validating captcha token");
        URL url = new URL("https://www.google.com/recaptcha/api/siteverify");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setConnectTimeout(3000);
        conn.setReadTimeout(3000);
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

        String params = "secret=" + URLEncoder.encode(SECRET, StandardCharsets.UTF_8)
                + "&response=" + URLEncoder.encode(token, StandardCharsets.UTF_8);

        try (OutputStream os = conn.getOutputStream()) {
            os.write(params.getBytes(StandardCharsets.UTF_8));
        }

        if (conn.getResponseCode() != 200) {
            return false;
        }

        try (BufferedReader in = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {

            String response = in.lines().collect(Collectors.joining());
            CaptchaResponseDto verifyResponse = mapper.readValue(response, CaptchaResponseDto.class);

            if (!verifyResponse.isSuccess()) {
                return false;
            }

            return "localhost".equals(verifyResponse.getHostname());
        }
    }
}
