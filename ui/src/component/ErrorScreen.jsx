// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ErrorScreen({ onClose }) {
  return (
    <motion.div
      className="loading-overlay error-border"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="error-close"
        aria-label="Close error message"
        onClick={onClose}
      >
        X
      </button>
      <p className="loading-label error-label app-font">
        Cannot process the request. Please try again
      </p>
    </motion.div>
  );
}
