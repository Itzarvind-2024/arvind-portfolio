import { profile, receipt, about, experience, skills } from "../profile";
import type { Project } from "../content";

export function Home({ projects }: { projects: Project[] }) {
  return (
    <>
      {/* Hero Section */}
      <section className="hero wrap">
        <div className="hero-text">
          <div className="status-badge" aria-label="Status: Available for opportunities">
            <span className="status-dot" aria-hidden="true"></span>
            <span>Available for full-stack & offline-first roles</span>
          </div>
          <p className="hero-name">{profile.name} · {profile.role}</p>
          <h1>{profile.headline}</h1>
          <p className="lede">{profile.intro}</p>
          <div className="actions">
            <a className="btn primary" href={profile.resume} download>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Download resume</span>
            </a>
            <a className="btn" href={`mailto:${profile.email}`} id="email-btn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>Email me</span>
            </a>
            <button className="btn btn-copy" id="copy-email-hero" data-email={profile.email} type="button" title="Copy email to clipboard">
              <svg className="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span className="copy-text">Copy</span>
            </button>
          </div>
          <p className="links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
            <span className="location-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {profile.location}
            </span>
          </p>
        </div>
        <aside className="receipt" aria-label="Key production results">
          <div className="receipt-stamp">ARVIND // SYSTEM METRICS</div>
          <p className="receipt-title">{receipt.title}</p>
          <dl>
            {receipt.lines.map((l) => (
              <div key={l.item}><dt>{l.item}</dt><dd>{l.value}</dd></div>
            ))}
          </dl>
          <div className="receipt-total"><span>{receipt.total.item}</span><span>{receipt.total.value}</span></div>
          <p className="receipt-foot">Offline-first pharmacy POS · Flutter, React, Django</p>
          <div className="receipt-barcode" aria-hidden="true"></div>
        </aside>
      </section>

      {/* Selected Work Section — Clean, Breathable, High-Impact Cards */}
      <section id="work" className="wrap section">
        <div className="section-header">
          <div className="section-tag-badge">CASE STUDIES</div>
          <h2>Selected Work</h2>
          <p className="section-lede">
            Real systems from a pharmacy platform in daily use. Each one says what I built, what my team built, and what is still unfinished.
          </p>
        </div>

        <div className="projects-clean-list">
          {projects.map((p) => (
            <article key={p.slug} className="clean-project-card">
              <div className="clean-card-body">
                <div className="clean-card-meta">
                  <span className="project-order-tag">{String(p.order).padStart(2, "0")}</span>
                  <span className="project-role-badge">{p.role}</span>
                </div>

                <h3 className="clean-card-title">
                  <a href={`/projects/${p.slug}/`}>{p.title}</a>
                </h3>

                <p className="clean-card-desc">{p.summary}</p>

                <ul className="tags">
                  {p.stack.slice(0, 5).map((s) => (
                    <li key={s} className="tag-pill">{s}</li>
                  ))}
                </ul>
              </div>

              <div className="clean-card-aside">
                <div className="clean-impact-box">
                  <span className="impact-label-mini">{p.resultLabel ? p.resultLabel.toUpperCase() : "PRODUCTION IMPACT"}</span>
                  <p className="impact-highlight-text">{p.result}</p>
                </div>

                <a href={`/projects/${p.slug}/`} className="btn-explore-project">
                  <span>Read the case study</span>
                  <span className="arrow-icon" aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="wrap section narrow">
        <div className="section-header">
          <div className="section-tag-badge">BACKGROUND</div>
          <h2>About</h2>
          <p className="section-lede">
            From mechanical engineering to the software a pharmacy counter depends on.
          </p>
        </div>
        <div className="about-card">
          <div className="about-prose">
            {about.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="wrap section">
        <div className="section-header">
          <div className="section-tag-badge">CAREER</div>
          <h2>Experience</h2>
          <p className="section-lede">
            One startup, from intern to senior developer leading a small team.
          </p>
        </div>
        <div className="timeline-wrapper">
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.title} className="timeline-item">
                <div className="timeline-marker" aria-hidden="true"></div>
                <div className="when">{e.period}</div>
                <div className="timeline-body">
                  <h3>{e.title}</h3>
                  <p className="org">{e.org}</p>
                  <ul className="experience-points">{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" className="wrap section">
        <div className="section-header">
          <div className="section-tag-badge">TOOLS</div>
          <h2>Skills</h2>
          <p className="section-lede">
            What I use in production, grouped by where it sits in the stack.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map((g) => (
            <div key={g.group} className="skill-card">
              <h3>{g.group}</h3>
              <ul className="skill-chips">
                {g.items.map((item) => (
                  <li key={item} className="skill-chip">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="wrap section contact">
        <div className="contact-box">
          <div className="section-tag-badge">GET IN TOUCH</div>
          <h2>Let's talk</h2>
          <p className="contact-lede">
            I'm looking for full-stack or backend roles where reliability and performance matter. Email is the fastest way to reach me.
          </p>
          <div className="contact-actions">
            <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
            <button className="btn btn-copy" id="copy-email-contact" data-email={profile.email} type="button">
              <svg className="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span className="copy-text">Copy email</span>
            </button>
          </div>
          <p className="contact-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <span aria-hidden="true">·</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span aria-hidden="true">·</span>
            <a href={profile.resume} download>Resume (PDF)</a>
          </p>
        </div>
      </section>
    </>
  );
}
