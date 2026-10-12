// Static site build: renders React components to plain HTML in dist/.
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { Layout } from "../src/components/Layout";
import { Home } from "../src/components/Home";
import { ProjectPage } from "../src/components/ProjectPage";
import { loadProjects } from "../src/content";
import { profile } from "../src/profile";

const OUT = path.join(process.cwd(), "dist");
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(process.cwd(), "public"), OUT, { recursive: true });

function write(rel: string, element: React.ReactElement) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, "<!doctype html>" + renderToStaticMarkup(element));
}

const projects = loadProjects();

write(
  "index.html",
  <Layout title={`${profile.name} · ${profile.role}`} description={profile.headline}>
    <Home projects={projects} />
  </Layout>
);

projects.forEach((p, i) => {
  write(
    `projects/${p.slug}/index.html`,
    <Layout title={`${p.title} · ${profile.name}`} description={p.summary}>
      <ProjectPage project={p} prev={projects[i - 1]} next={projects[i + 1]} />
    </Layout>
  );
});

console.log(`Built ${projects.length + 1} pages into dist/`);
