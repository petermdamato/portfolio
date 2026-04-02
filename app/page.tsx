import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import HexagonGrid from "@/components/HexagonGrid";

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <HexagonGrid />
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <header className="mb-24 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            Selected Work
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light leading-relaxed">
            A collection of projects exploring data visualization, web development, and interactive maps.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((p) => (
            <ProjectCard key={p.slug} {...p} />
          ))}
        </div>
      </main>
    </>
  );
}
