import { useState } from "react";
import { SOLUTION_TABS } from "../util/state-constants";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Solution() {
  const [selectedTabIndex, updateSelectedTabIndex] = useState(0);
  return (
    <>
      <ul className="solution-header-container">
        {[...SOLUTION_TABS].map((name, index) => (
          <li
            key={index}
            className="app-font tab-title"
            onClick={() => updateSelectedTabIndex(index)}
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
      <div></div>
    </>
  );
}
