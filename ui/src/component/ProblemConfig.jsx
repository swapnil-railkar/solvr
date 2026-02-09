import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES } from "../store/language-list";
import { problemActions } from "../store/problem";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useAnimate } from "framer-motion";

export default function ProblemConfig() {
  const dispatch = useDispatch();
  const [scope, animate] = useAnimate();
  const [fieldErrors, setFieldErrors] = useState({
    problemStatement: false,
    language: false,
  });
  const { problemStatement, language, showHints } = useSelector(
    (state) => state.problem,
  );

  function handleSubmission(event) {
    event.preventDefault();
    const errors = [];
    const nextErrors = {
      problemStatement: false,
      language: false,
    };
    if (problemStatement.trim() === "") {
      errors.push("Problem statement cannot be empty");
      nextErrors.problemStatement = true;
    }

    if (language === "") {
      errors.push("Select a language");
      nextErrors.language = true;
    }

    if (errors.length > 0) {
      setFieldErrors(nextErrors);
      if (nextErrors.problemStatement) {
        const textarea = scope.current?.querySelector("#problem-info");
        if (textarea) {
          animate(
            textarea,
            { x: [0, -8, 8, -5, 5, 0] },
            { duration: 0.45, ease: "easeInOut" },
          );
        }
      }
      if (nextErrors.language) {
        const selector = scope.current?.querySelector("#language-selector");
        if (selector) {
          animate(
            selector,
            { x: [0, -8, 8, -5, 5, 0] },
            { duration: 0.45, ease: "easeInOut" },
          );
        }
      }
      return;
    }

    setFieldErrors({ problemStatement: false, language: false });
  }

  return (
    <form onSubmit={handleSubmission} className="input-form" ref={scope}>
      <textarea
        value={problemStatement}
        onChange={(e) =>
          dispatch(problemActions.updateProblemStatement(e.target.value))
        }
        className="problem-info app-font custom-scrollbar"
        id="problem-info"
        placeholder="Copy / Type Problem statement"
        aria-invalid={fieldErrors.problemStatement}
      />
      <div className="problem-info">
        <select
          value={language}
          className="config-selector custom-scrollbar app-font"
          id="language-selector"
          onChange={(e) => dispatch(problemActions.updateLanguage(e.target.value))}
          aria-invalid={fieldErrors.language}
        >
          <option value="" disabled>
            Select language
          </option>
          {[...LANGUAGES]
            .sort((a, b) => a.localeCompare(b))
            .map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
        </select>

        <label className="hint-toggle app-font">
          <input
            type="checkbox"
            checked={showHints}
            onChange={(e) =>
              dispatch(problemActions.updateShowHints(e.target.checked))
            }
          />
          Show hints only
        </label>

        <motion.button
          className="app-button app-font"
          type="submit"
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffstiffness: 500 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={showHints ? "hints" : "solution"}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
            >
              {`Generate ${showHints ? "Hints" : "Solution"}`}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </form>
  );
}
