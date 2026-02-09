export default function Header() {
  return (
    <header className="app-bg app-header">
      <h1 className="app-font app-blue">SolvR</h1>
      <a
        href="https://github.com/swapnil-railkar/solvr"
        target="_blank"
        rel="noopener noreferrer"
        title="View FormatWizard on GitHub"
      >
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
