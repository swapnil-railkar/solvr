import { useEffect, useRef, useState } from "react";
import "./App.css";
import GreetingPage from "./component/GreetingPage";
import Hints from "./component/Hints";
import ProblemConfig from "./component/ProblemConfig";
import LoadingScreen from "./component/LoadingScreen";
import { SOLUTION_STATE } from "./util/state-constants";
import Solution from "./component/Solution";
import { useDispatch, useSelector } from "react-redux";
import { getResults } from "./util/http";
import { solutionActions } from "./store/solution";

function App() {
  const [solutionState, updateSolutionState] = useState();
  const answerSectionRef = useRef(null);
  const { problemStatement, language } = useSelector((state) => state.problem);
  const [showHints, updateShowHints] = useState(false);

  const [loading, updateLoading] = useState(false);
  const [data, updateData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function callHttp() {
      try {
        updateLoading(true);
        const request = {
          problemStatement,
          language,
          showHints: solutionState === SOLUTION_STATE.SHOW_HINTS,
        };
        const result = await getResults(request);
        const parsedResult = JSON.parse(result.body);
        updateData(true);
        updateLoading(false);
        updateShowHints(solutionState === SOLUTION_STATE.SHOW_HINTS);

        if (solutionState === SOLUTION_STATE.SHOW_SOLUTION) {
          dispatch(
            solutionActions.updateSolution({
              intuition: parsedResult.intuition,
              code: parsedResult.code,
              timeComplexity: parsedResult.timeComplexity,
              dataStructures: parsedResult.dataStructures,
              algorithms: parsedResult.algorithms,
            }),
          );
        } else if (solutionState === SOLUTION_STATE.SHOW_HINTS) {
          dispatch(solutionActions.updateHints(parsedResult.hints));
        }
      } catch (error) {
        console.error(error);
        updateLoading(false);
      }
    }

    if (solutionState) {
      callHttp();
      updateSolutionState(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solutionState]);

  useEffect(() => {
    if (!loading && data && answerSectionRef.current) {
      answerSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [loading, data, showHints]);

  function handleGetSolutionClick(solutionState) {
    updateSolutionState(solutionState);
  }

  return (
    <>
      <GreetingPage />
      <ProblemConfig handleTrigger={handleGetSolutionClick} />
      {!loading && data && (
        <section ref={answerSectionRef} className="app-section">
          {showHints && (
            <Hints handleGetSolutionClick={handleGetSolutionClick} />
          )}
          {!showHints && <Solution />}
        </section>
      )}
      {loading && <LoadingScreen />}
    </>
  );
}

export default App;
