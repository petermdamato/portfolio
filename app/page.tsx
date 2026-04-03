import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import HexagonGrid from "@/components/HexagonGrid";
import Image from "next/image";

const CONTACT_EMAIL = "pete@petedamato.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/pmdamato/";

const publicationLogos = [
  { src: "/new-york-times.png", alt: "New York Times" },
  { src: "/vice.png", alt: "Vice" },
  { src: "/nbc.png", alt: "NBC News" },
  { src: "/hechinger.png", alt: "Hechinger Report" },
  { src: "/dissent.png", alt: "Dissent" },
  { src: "/sports-illustrated.png", alt: "Sports Illustrated" },
  { src: "/americas-quarterly.png", alt: "Americas Quarterly" }
];

const skillsByCategory = [
  {
    category: "Programming",
    skills: ["TypeScript", "Python", "SQL"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next", "Vue", "Angular"],
  },
  {
    category: "Data Visualization & Mapping",
    skills: [
      "D3.js",
      "WebGL",
      "deck.gl",
      "Carto for React",
      "Mapbox",
    ],
  },
  {
    category: "AI & Data Science",
    skills: [
      "pandas",
      "scipy",
      "nltk",
      "BERT (Language Model)",
      "Retrieval-Augmented Generation (RAG)",
      "Named Entity Recognition (NER)",
    ],
  },
  {
    category: "Cloud & Data Infrastructure",
    skills: [
      "Microsoft Azure",
      "Snowflake",
      "Amazon Redshift",
      "Cloud Engineering",
    ],
  },
  {
    category: "BI & Low-Code Tools",
    skills: ["Retool", "Looker", "Tableau"],
  },
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

      <section className="w-full pt-6">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-4">
          <p className="font-meta text-xs tracking-[0.25em] uppercase text-zinc-500">
              Skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {skillsByCategory.map((group) => (
              <article
                key={group.category}
                className="rounded-lg border border-zinc-200 bg-[#fdfdfc] p-3"
              >
                <h3 className="font-display text-base font-semibold text-zinc-900 mb-2">
                  {group.category}
                </h3>
                <p className="font-body text-sm leading-relaxed text-zinc-700">
                  {group.skills.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-12">
                <section className="mb-16 rounded-2xl border border-zinc-300 bg-[#fdfdfc] p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-zinc-900">
                Let&apos;s connect
              </h2>
              <p className="font-body mt-2 text-zinc-600">
                Reach out for collaborations, consulting, or speaking opportunities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-meta inline-flex items-center justify-center rounded-lg border border-zinc-900 px-4 py-2 text-xs uppercase tracking-[0.14em] text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
              >
                Contact Me
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="font-meta inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2 text-xs uppercase tracking-[0.14em] text-zinc-800 transition-colors hover:bg-zinc-200"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </section>
        <header className="mb-16 max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 mb-6 leading-tight">
            Selected Work
          </h2>
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
