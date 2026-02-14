import Prism from "prismjs";

// Core
import "prismjs/components/prism-clike";

// Required dependency for PHP
import "prismjs/components/prism-markup-templating";

// Languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-php"; // must come after markup-templating
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-scala";
import "prismjs/components/prism-groovy";
import "prismjs/components/prism-haskell";
import "prismjs/components/prism-elixir";

import "prismjs/themes/prism-tomorrow.css";

import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { mapLanguageToPrism } from "../util/language-prism-mapper";

export default function CodeBlock({ code }) {
  const language = useSelector((state) => state.problem.language);
  const codeRef = useRef(null);

  useEffect(() => {
    const prismLang = mapLanguageToPrism(language);
    const grammar = Prism.languages[prismLang];

    if (grammar) {
      codeRef.current.innerHTML = Prism.highlight(code, grammar, prismLang);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <pre className="code-section">
      <code ref={codeRef} />
    </pre>
  );
}
