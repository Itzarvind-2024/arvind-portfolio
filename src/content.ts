import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { Diagram, type DiagramData } from "./components/Diagram";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  order: number;
  role: string;
  stack: string[];
  result: string;
  // Optional label for the result box; defaults to "Production impact" / "Key result".
  resultLabel?: string;
  html: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

// Tiny front-matter reader: "key: value" lines between --- fences.
function parseFrontMatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("Missing front matter");
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { data, body: match[2] };
}

// Markdown renderer: ```diagram blocks become <Diagram>, everything else is standard.
const marked = new Marked({
  renderer: {
    code({ text, lang }) {
      if (lang === "diagram") {
        const data = JSON.parse(text) as DiagramData;
        return renderToStaticMarkup(createElement(Diagram, { data }));
      }
      return false; // fall back to the default renderer
    },
  },
});

export function loadProjects(): Project[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, body } = parseFrontMatter(fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8"));
      for (const key of ["title", "summary", "order", "role", "stack", "result"]) {
        if (!data[key]) throw new Error(`${file}: missing "${key}" in front matter`);
      }
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        summary: data.summary,
        order: Number(data.order),
        role: data.role,
        stack: data.stack.split(",").map((s) => s.trim()),
        result: data.result,
        resultLabel: data.resultLabel,
        html: marked.parse(body) as string,
      };
    })
    .sort((a, b) => a.order - b.order);
}
