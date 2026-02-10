import { useState } from "react";
import TextArea from "./TextArea";

export default function Hints({ hints }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <ul className="app-section">
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
          {expandedIndex === index ? (
            <TextArea text={hint} expanded />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
