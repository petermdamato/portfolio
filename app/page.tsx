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
      <section className="w-full border-y border-zinc-300 bg-[#fdfdfc]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-meta text-sm uppercase tracking-[0.22em] text-zinc-600">
            Work published in
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {publicationLogos.map((logo) => (
              <div key={logo.src} className="relative h-7 w-32">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="128px"
                  className="object-contain object-left opacity-85"
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
