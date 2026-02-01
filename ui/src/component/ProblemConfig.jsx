import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES } from "../store/language-list";
import { problemActions } from "../store/problem";

export default function ProblemConfig() {
  const dispatch = useDispatch();
  const { problemStatement, language, showHints } = useSelector(
    (state) => state.problem,
  );

  function handleSubmission(event) {
    event.preventDefault();
    const errors = [];
    if(problemStatement.trim() === '') {
      errors.push('Problem statement cannot be empty');
    }

    if(language === '') {
      errors.push('Select a language');
    }

    if(errors.length > 0) {
      alert(errors[0]);
      return;
    }
    
    alert('Submitted');
  }

  return (
    <form onSubmit={handleSubmission} className="input-form">
      <textarea
        value={problemStatement}
        onChange = {(e) => dispatch(problemActions.updateProblemStatement(e.target.value))}
        className="problem-info app-font"
        placeholder="Copy / Type Problem statement"
      />
      <div className="problem-info">
        <select
          value={language}
          className="config-selector app-font"
          onChange={(e) => dispatch(problemActions.updateLanguage(e.target.value))}
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

        <button className="app-button app-font" type="submit">Generate Solution</button>
      </div>
    </form>
  );
}
