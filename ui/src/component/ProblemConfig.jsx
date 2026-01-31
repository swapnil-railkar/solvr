import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES } from "../store/language-list";
import { problemActions } from "../store/problem";

export default function ProblemConfig() {
  const dispatch = useDispatch();
  const { problemStatement, language, showHints } = useSelector(
    (state) => state.problem,
  );
  const problemStatementInput = useRef();

  function handleSubmission(event) {
    event.preventDefault();
  }
  return (
    <form onSubmit={handleSubmission} className="input-form">
      <textarea
        ref={problemStatementInput}
        className="problem-info app-font"
        placeholder="Copy / Type Problem statement"
      />
      <div className="problem-info">
        <select
          value={language}
          className="config-selector app-font"
          onChange={(e) => problemActions.updateLanguage(e.target.value)}
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
          Show only hints
        </label>

        <button className="app-button app-font">Generate Solution</button>
      </div>
    </form>
  );
}
