import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion as Motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Header from "./Header";

export default function GreetingPage() {
  const { scrollY } = useScroll();
  const [showHeader, setShowHeader] = useState(false);
  const showHeaderRef = useRef(false);
  const fullSubtitle = "AI-Powered DSA Problem Solver.";
  // Key bump remounts the span to restart the CSS typewriter animation.
  const [typingKey, setTypingKey] = useState(0);
  // Subtitle color shifts with scroll position.
  const subtitleColor = useTransform(
    scrollY,
    [0, 120],
    ["#ffffff", "#0cc0df"]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hysteresis prevents rapid toggling when scroll bounces near the threshold.
    const shouldShow = showHeaderRef.current ? latest > 6 : latest > 24;
    if (shouldShow !== showHeaderRef.current) {
      showHeaderRef.current = shouldShow;
      setShowHeader(shouldShow);
      if (!shouldShow) {
        setTypingKey((prev) => prev + 1);
      }
    }
  });

  return (
    <>
      <AnimatePresence initial={false}>
        {showHeader && (
          <Motion.div
            className="app-header-layer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <Header />
          </Motion.div>
        )}
      </AnimatePresence>
      <Motion.section className="greeting-section">
        <div className="greeting-row">
          <Motion.h1
            className="app-font greeting-text"
            animate={showHeader ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden={showHeader}
          >
            SolvR
          </Motion.h1>
        </div>
        <Motion.p
          className="app-font greeting-subtitle greeting-typewriter"
          animate={showHeader ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: subtitleColor }}
          aria-hidden={showHeader}
        >
          {/* Remount to restart the typewriter animation when returning to top. */}
          <span key={typingKey} className="typewriter-text">
            {fullSubtitle}
          </span>
        </Motion.p>
      </Motion.section>
    </>
  );
}
