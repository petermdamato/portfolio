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
  externalUrl?: string;
  partnerLogo?: string;
  thumbnail?: string;
  screenshots?: string[];
}

export interface Project extends ProjectMetadata {
  content: string;
}

const contentDir = path.join(process.cwd(), "content");
const publicDir = path.join(process.cwd(), "public");

function getAutoScreenshots(slug: string): string[] {
  if (!fs.existsSync(publicDir)) return [];
  const filenames = fs.readdirSync(publicDir);

  if (slug === "local-wealth-explorer") {
    return filenames
      .filter((name) => /^lwe_0.*\.(png|jpe?g|webp|gif)$/i.test(name))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => `/${name}`);
  }

  return [];
}

export function getProjectTypeLabel(slug: string): string {
  if (slug === "real-estate-geospatial-intelligence-tool") {
    return "Application";
  }
  if (slug === "static-graphics") {
    return "Graphics";
  }
  if (slug === "flagship-enrollment-disparity-interactive") {
    return "Visualization";
  }
  return "Visualization Dashboard";
}

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
  const frontmatterScreenshots = Array.isArray(data.screenshots)
    ? data.screenshots.filter((item): item is string => typeof item === "string")
    : [];
  const autoScreenshots = getAutoScreenshots(slug);
  const screenshots = Array.from(new Set([...frontmatterScreenshots, ...autoScreenshots]));

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || "",
    tags: data.tags || [],
    video: data.video,
    iframe: data.iframe,
    externalUrl: data.externalUrl,
    partnerLogo: data.partnerLogo,
    thumbnail: data.thumbnail,
    screenshots,
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
  return projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    description: project.description,
    date: project.date,
    tags: project.tags,
    video: project.video,
    iframe: project.iframe,
    externalUrl: project.externalUrl,
    partnerLogo: project.partnerLogo,
    thumbnail: project.thumbnail,
    screenshots: project.screenshots,
  }));
}
