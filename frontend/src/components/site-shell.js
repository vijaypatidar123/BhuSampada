import Link from "next/link";

export function SiteShell({ children }) {
  return (
    <div className="site-shell">
      <header className="site-nav">
        <div className="site-container site-nav-inner">
          <Link className="brand-lockup" href="/">
            <div className="brand-mark">BS</div>
            <div className="brand-copy">
              <strong>BhuSampada</strong>
              <span>Local rebuild</span>
            </div>
          </Link>
          <nav className="nav-links">
            <Link href="/buy">Buy</Link>
            <Link href="/all-projects">Projects</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/all-agents">Agents</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="site-container">
          Local reconstruction of the public BhuSampada site using the captured live content snapshot.
        </div>
      </footer>
    </div>
  );
}
