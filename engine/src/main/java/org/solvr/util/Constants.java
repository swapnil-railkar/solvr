package org.solvr.util;

public interface Constants {

    String BASE_PROMPT = """
            You are a problem-solving assistant.
            
            Give an optimal solution for the following problem:
            %s
            """;

    String GET_HINT_PROMPT = """
            Provide exactly four concise hints that guide toward the solution
            without revealing the full answer.
            JSON schema:
            {
            	"hints": [
                "hint 1",
                "hint 2",
                "hint 3",
                "hint 4"
              ]
            }
            Do not use triple backticks.
            """;

    String GET_SOLUTION_PROMPT = """
            Explain the intuition in less than 200 words.
            Focus on the core idea and why it works.
            Provide the solution code in %s.
            List the data structures used (comma-separated).
            List the algorithms used (comma-separated).
            Provide the Big-O time complexity.
            
            Return the response in STRICT JSON format only.
            Do not include explanations, markdown, or extra text.
            
            JSON schema:
            {
              "intuition": "Explain approach",
              "code": "Code as plain text",
              "timeComplexity": "O(...)",
              "dataStructures": "comma separated list",
              "algorithms": "comma separated list"
            }
            The value of "code" must be a valid escaped JSON string.
            Do not use triple backticks.
            """;

    String DUMMY_HINTS = """
            {
            	"hints": [
                "hint 1",
                "hint 2",
                "hint 3",
                "hint 4"
              ]
            }
            """;

    String DUMMY_SOLUTION = """
            {
              "intuition": "Explain approach",
              "code": "Code as plain text",
              "timeComplexity": "O(...)",
              "dataStructures": "comma separated list",
              "algorithms": "comma separated list"
            }
            """;
}
