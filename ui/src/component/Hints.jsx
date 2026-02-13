import { useState } from "react";
import TextArea from "./TextArea";
import { SOLUTION_STATE } from "../util/state-constants";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Hints({ handleGetSolutionClick }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const hints = useSelector((state) => state.solution.hints);
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
        onClick={() => handleGetSolutionClick(SOLUTION_STATE.SHOW_SOLUTION)}
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        Get Solution
      </motion.button>
    </>
  );
}
