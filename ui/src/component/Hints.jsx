import TextArea from "./TextArea";

export default function Hints({ hints }) {
  return (
    <ul className="app-section">
      {hints.map((hint, index) => (
        <li className="app-section" key={index}>
            <p className="app-font">{`Hint ${index + 1}`}</p>
            <TextArea text={hint} />
        </li>
      ))}
    </ul>
  );
}
