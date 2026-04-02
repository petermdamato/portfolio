import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  video?: string;
  iframe?: string;
}

export interface Project extends ProjectMetadata {
  content: string;
}

const contentDir = path.join(process.cwd(), "content");

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getProject(slug: string): Project | null {
  const fullPath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || "",
    tags: data.tags || [],
    video: data.video,
    iframe: data.iframe,
    content,
  };
}

export function getAllProjects(): ProjectMetadata[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProject(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  // Return only metadata to keep payload small
  return projects.map(({ content, ...metadata }) => metadata);
}
