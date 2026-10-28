import type { Project } from "../content";
import { ProjectMockup } from "./ProjectMockup";

export function ProjectPage({ project, prev, next }: { project: Project; prev?: Project; next?: Project }) {
  return (
    <article className="wrap case">
      <nav className="case-nav-top" aria-label="Breadcrumb navigation">
        <a className="back-link" href="/#work">
          <kbd>Esc</kbd>
          <span>← Back to all projects</span>
        </a>
      </nav>
      <header className="case-header">
        <h1>{project.title}</h1>
        <p className="case-lede">{project.summary}</p>
        <div className="case-facts-grid">
          <div className="case-fact-card">
            <span className="fact-label">Role</span>
            <span className="fact-value">{project.role}</span>
          </div>
          <div className="case-fact-card result-card">
            <span className="fact-label">{project.resultLabel ?? "Key Result"}</span>
            <span className="fact-value highlight">{project.result}</span>
          </div>
          <div className="case-fact-card">
            <span className="fact-label">Tech Stack</span>
            <div className="tags">
              {project.stack.map((s) => (
                <span key={s} className="tag-pill">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Proof of Work Visual Showcase */}
        <div className="case-proof-section">
          <div className="proof-header">
            <span className="proof-tag">SYSTEM PROOF OF WORK</span>
            <span className="proof-sub">Architecture & Desktop Simulation</span>
          </div>
          <div className="proof-mockup-wrapper">
            <ProjectMockup slug={project.slug} />
          </div>
        </div>
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: project.html }} />

      <nav className="pager" aria-label="More projects">
        {prev ? (
          <a href={`/projects/${prev.slug}/`} data-key="prev" className="pager-btn prev">
            <kbd>←</kbd>
            <div className="pager-text">
              <span className="pager-direction">Previous Case Study</span>
              <span className="pager-title">{prev.title}</span>
            </div>
          </a>
        ) : <span />}
        {next ? (
          <a href={`/projects/${next.slug}/`} data-key="next" className="pager-btn next">
            <div className="pager-text">
              <span className="pager-direction">Next Case Study</span>
              <span className="pager-title">{next.title}</span>
            </div>
            <kbd>→</kbd>
          </a>
        ) : <span />}
      </nav>
    </article>
  );
}
