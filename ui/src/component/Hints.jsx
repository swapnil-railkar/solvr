import { useState } from "react";
import TextArea from "./TextArea";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { problemActions } from "../store/problem";

export default function Hints({ solutionClick }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const hints = useSelector((state) => state.solution.hints);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(problemActions.updateShowHints(false));
    solutionClick(true);
  }
  return (
    <>
      <h2 className="app-font app-white">Hints</h2>
      <ul className="full-width">
        {hints.map((hint, index) => (
          <li
            className={`app-section hint-card${expandedIndex === index ? " is-expanded" : ""}`}
            key={index}
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            {expandedIndex !== index ? (
              <p className="app-font">{`Hint ${index + 1}`}</p>
            ) : null}
            {expandedIndex === index ? <TextArea text={hint} expanded /> : null}
          </li>
        ))}
      </ul>
      <motion.button
        className="app-button app-font"
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        Get Solution
      </motion.button>
    </>
  );
}
