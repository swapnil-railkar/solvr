import { useEffect, useRef, useState } from "react";
import "./App.css";
import GreetingPage from "./component/GreetingPage";
import Hints from "./component/Hints";
import ProblemConfig from "./component/ProblemConfig";
import LoadingScreen from "./component/LoadingScreen";
import ErrorScreen from "./component/ErrorScreen";
import Solution from "./component/Solution";
import { useDispatch, useSelector } from "react-redux";
import { getResults } from "./util/http";
import { solutionActions } from "./store/solution";

function App() {
  const [getSolution, updateGetSolutionState] = useState(false);
  const answerSectionRef = useRef(null);
  const { showHints, problemStatement, language } = useSelector(
    (state) => state.problem,
  );
  const [loading, updateLoading] = useState(false);
  const [data, updateData] = useState(false);
  const [error, updateError] = useState(false);
  const dispatch = useDispatch();
  const [token, updateToken] = useState();
  const captchaRef = useRef(null);

  useEffect(() => {
    async function callHttp() {
      try {
        updateLoading(true);
        updateError(false);
        const request = {
          token,
          problemStatement,
          language,
          showHints,
        };
        const result = await getResults(request);
        console.log(result);
        updateData(true);

        if (!showHints) {
          dispatch(
            solutionActions.updateSolution({
              intuition: result.intuition,
              code: result.code,
              timeComplexity: result.timeComplexity,
              dataStructures: result.dataStructures,
              algorithms: result.algorithms,
            }),
          );
        } else {
          dispatch(solutionActions.updateHints(result.hints));
        }
      } catch (error) {
        console.error(error);
        updateError(true);
      } finally {
        updateLoading(false);
        captchaRef.current.reset();
        updateToken(null);
      }
    }

    if (getSolution) {
      if (!token) {
        alert("Please verify captcha");
        return;
      }
      callHttp();
      updateGetSolutionState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSolution, showHints]);

  useEffect(() => {
    if (!error) return undefined;

    const timeoutId = setTimeout(() => {
      updateError(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  useEffect(() => {
    if (!loading && data && answerSectionRef.current) {
      answerSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [loading, data, showHints]);

  return (
    <>
      <GreetingPage />
      <ProblemConfig
        updateCaptchaToken={updateToken}
        captchaRef={captchaRef}
        solutionClick={updateGetSolutionState}
      />
      {!loading && data && (
        <section ref={answerSectionRef} className="app-section">
          {showHints && <Hints solutionClick={updateGetSolutionState} />}
          {!showHints && <Solution />}
        </section>
      )}
      {loading && !error && <LoadingScreen />}
      {error && <ErrorScreen onClose={() => updateError(false)} />}
    </>
  );
}

export default App;
