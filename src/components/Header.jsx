export function Header({ onPreview, onExport }) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo">Claude Website Builder</h1>
        <nav className="nav">
          <button className="btn btn-outline" onClick={onPreview}>Preview</button>
          <button className="btn btn-primary" onClick={onExport}>Export</button>
        </nav>
      </div>
    </header>
  );
}
