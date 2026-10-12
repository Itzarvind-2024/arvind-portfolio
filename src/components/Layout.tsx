import type { ReactNode } from "react";
import { profile } from "../profile";

export function Layout({ title, description, children, base = "" }: { title: string; description: string; children: ReactNode; base?: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
        />
        <link rel="icon" type="image/svg+xml" href={`${base}/favicon.svg`} />
        <link rel="stylesheet" href={`${base}/styles.css`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&d)){document.documentElement.setAttribute("data-theme","dark");}else{document.documentElement.setAttribute("data-theme","light");}}catch(e){}})();`,
          }}
        />
        <script defer src={`${base}/keys.js`} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="site-header">
          <div className="wrap header-inner">
            <a className="brand" href={`${base}/`}>
              <span className="brand-avatar" aria-hidden="true">AV</span>
              <span className="brand-text">
                <span className="brand-name">{profile.name}</span>
                <span className="brand-sub">Full-Stack Engineer</span>
              </span>
            </a>
            <nav aria-label="Main navigation" className="site-nav">
              <a href={`${base}/#work`} className="nav-link">Work</a>
              <a href={`${base}/#about`} className="nav-link">About</a>
              <a href={`${base}/#experience`} className="nav-link">Experience</a>
              <a href={`${base}/#skills`} className="nav-link">Skills</a>
              <a href={`${base}/#contact`} className="nav-link">Contact</a>
            </nav>
            <div className="header-actions">
              <button
                id="theme-toggle"
                className="theme-toggle-btn"
                type="button"
                aria-label="Toggle theme"
                title="Toggle dark / light theme (T)"
              >
                <svg className="theme-icon icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.5"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="M4.93 4.93l1.41 1.41"></path>
                  <path d="M17.66 17.66l1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="M6.34 17.66l-1.41 1.41"></path>
                  <path d="M19.07 4.93l-1.41 1.41"></path>
                </svg>
                <svg className="theme-icon icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="wrap footer-inner">
            <p className="copyright">© {new Date().getFullYear()} {profile.name} · Built with React & TypeScript (Zero-JS SSG)</p>
            <p className="hint">Keyboard shortcuts: <kbd>1</kbd>–<kbd>5</kbd> jump sections, <kbd>T</kbd> toggle theme</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
