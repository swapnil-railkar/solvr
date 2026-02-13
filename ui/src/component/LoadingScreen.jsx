// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-overlay"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <p className="loading-label app-font">Generating your answer...</p>
      <div className="loading-track" aria-label="Loading progress bar">
        <motion.div
          className="loading-progress"
          animate={{ x: ["-100%", "260%"] }}
          transition={{
            duration: 1.2,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  );
}
