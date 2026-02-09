import "./App.css";
import GreetingPage from "./component/GreetingPage";
import Header from "./component/Header";
import Hints from "./component/Hints";
import ProblemConfig from "./component/ProblemConfig";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const DUMMY_SOLUTION = {
  hints: ["Test hint 1", "Test hint 2", "Test hint 3", "Test hint 4"],
};
function App() {
  return (
    <>
      <GreetingPage />
      <ProblemConfig />
      <section className="app-section">
        <h2 className="app-font">Hints</h2>
        <Hints hints={DUMMY_SOLUTION.hints} />
        <motion.button
          className="app-button app-font"
          type="submit"
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffstiffness: 500 }}
        >
          Get Solution
        </motion.button>
      </section>
    </>
  );
}

export default App;
