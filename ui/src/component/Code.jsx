import CodeBlock from "./CodeBlock";
import TextArea from "./TextArea";

export default function Code({ answer }) {
  return (
    <div className="code-screen">
      <p className="app-font">Code</p>
      <CodeBlock code={answer.code} />
      
      <p className="app-font">Time Complexity</p>
      <TextArea text={answer.timeComplexity} />

      <p className="app-font">Data Structures Used</p>
      <TextArea text={answer.dataStructures} />

      <p className="app-font">Algorithms Used</p>
      <TextArea text={answer.algorithms} />
    </div>
  );
}
