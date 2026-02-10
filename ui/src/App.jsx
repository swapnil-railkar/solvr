import "./App.css";
import GreetingPage from "./component/GreetingPage";
import Header from "./component/Header";
import Hints from "./component/Hints";
import ProblemConfig from "./component/ProblemConfig";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const DUMMY_SOLUTION = {
  hints: ["Test hint 1", "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", "Test hint 3", "Test hint 4"],
};
function App() {
  return (
    <>
      <GreetingPage />
      <ProblemConfig />
      <section className="hints-section">
        <h2 className="app-font app-white">Hints</h2>
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
