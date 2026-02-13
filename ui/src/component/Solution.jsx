import { useState } from "react";
import { SOLUTION_TABS } from "../util/state-constants";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import TextArea from "./TextArea";
import Code from "./Code";

const slideTransition = {
  initial: (direction) => ({ x: direction > 0 ? 24 : -24, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -24 : 24, opacity: 0 }),
};

export default function Solution() {
  const [selectedTabIndex, updateSelectedTabIndex] = useState(0);
  const [slideDirection, updateSlideDirection] = useState(1);
  const answer = useSelector((state) => state.solution);

  function handleTabChange(index) {
    if (index === selectedTabIndex) return;
    updateSlideDirection(index > selectedTabIndex ? 1 : -1);
    updateSelectedTabIndex(index);
  }

  return (
    <>
      <ul className="solution-header-container">
        {[...SOLUTION_TABS].map((name, index) => (
          <li
            key={index}
            className="app-font tab-title"
            onClick={() => handleTabChange(index)}
          >
            {name}
            {selectedTabIndex === index && (
              <motion.div
                className="highlight-div"
                layoutId="tab-indicator"
              ></motion.div>
            )}
          </li>
        ))}
      </ul>
      <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
        <motion.div
          key={selectedTabIndex}
          variants={slideTransition}
          custom={slideDirection}
          initial="initial"
          animate="animate"
          exit="exit"
          className="full-width"
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {selectedTabIndex === 0 && <TextArea text={answer.intuition} />}
          {selectedTabIndex === 1 && <Code answer={answer}/>}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
