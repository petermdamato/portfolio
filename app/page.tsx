import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import HexagonGrid from "@/components/HexagonGrid";
import Image from "next/image";

const publicationLogos = [
  { src: "/new-york-times.png", alt: "New York Times" },
  { src: "/vice.png", alt: "Vice" },
  { src: "/nbc.png", alt: "NBC News" },
  { src: "/hechinger.png", alt: "Hechinger Report" },
  { src: "/dissent.png", alt: "Dissent" },
  { src: "/sports-illustrated.png", alt: "Sports Illustrated" },
  { src: "/americas-quarterly.png", alt: "Americas Quarterly" }
];

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <HexagonGrid />
<section className="w-full pt-12 mt-16">
  <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
    
    {/* Label */}
    <p className="font-meta text-xs tracking-[0.25em] uppercase text-zinc-500">
      Work published in
    </p>

    {/* Logos Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full md:w-auto">
      {publicationLogos.map((logo) => (
        <div
          key={logo.src}
          className="relative h-10 w-32 flex items-center justify-center"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            className="
              object-contain
              opacity-70
              grayscale
              transition
              duration-300
              ease-out
              hover:grayscale-0
              hover:opacity-100
            "
          />
        </div>
      ))}
    </div>

  </div>
</section>
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <header className="mb-24 max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 mb-6 leading-tight">
            Selected Work
          </h1>
          <p className="font-body text-xl md:text-2xl text-zinc-600 font-normal leading-relaxed">
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
