package org.solvr.service;

import java.io.IOException;

public interface CaptchaVerifierService {

    boolean validateToken(final String token) throws IOException;
}
