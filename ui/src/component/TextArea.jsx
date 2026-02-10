import { useLayoutEffect, useRef } from "react";

export default function TextArea({ text, expanded = false }) {
  const textareaRef = useRef(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (expanded) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    } else {
      textarea.style.height = "5.5rem";
    }
  }, [expanded, text]);

  return (
    <textarea
      id="app-textarea"
      className="app-font custom-scrollbar hint-textarea"
      value={text}
      disabled
      ref={textareaRef}
    />
  );
}
