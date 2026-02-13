import { DUMMY_HINTS, DUMMY_OUTPUT } from "./dummy-solution";

export async function getResults(request) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(request.showHints ? DUMMY_HINTS : DUMMY_OUTPUT);
    }, 5000);
  });
}
