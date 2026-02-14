export function mapLanguageToPrism(lang) {
  switch (lang) {
    case "JavaScript":
      return "javascript";
    case "TypeScript":
      return "typescript";
    case "Python":
      return "python";
    case "Java":
      return "java";
    case "C":
      return "c";
    case "C++":
      return "cpp";
    case "C#":
      return "csharp";
    case "Go":
      return "go";
    case "Rust":
      return "rust";
    case "PHP":
      return "php";
    case "Ruby":
      return "ruby";
    case "Swift":
      return "swift";
    case "Kotlin":
      return "kotlin";
    case "Dart":
      return "dart";
    case "Scala":
      return "scala";
    case "Groovy":
      return "groovy";
    case "Haskell":
      return "haskell";
    case "Elixir":
      return "elixir";
    default:
      return "javascript";
  }
}
