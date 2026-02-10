export default function Header() {
  return (
    <header className="app-bg app-header">
      <h1 className="app-font app-blue">SolvR</h1>
      <a
        href="https://github.com/swapnil-railkar/solvr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit codebase"
        className="app-font codebase-link"
      >
        <span className="codebase-tooltip" aria-hidden="true">
          Visit codebase
        </span>
        <img
          src="/app-logo-fox.png"
          height="20"
          width="20"
          alt="SolvR GitHub"
          style={{ cursor: "pointer" }}
        />
      </a>
    </header>
  );
}
