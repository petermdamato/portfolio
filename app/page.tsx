import { getAllProjects } from "@/lib/projects";
import HexagonGrid from "@/components/HexagonGrid";
import SiteNav from "@/components/SiteNav";
import FeaturedProject from "@/components/FeaturedProject";
import GridProjectTile from "@/components/GridProjectTile";
import Image from "next/image";

const CONTACT_EMAIL = "pete@petedamato.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/pmdamato/";

const FEATURED_SLUG = "explore-data";

const publicationLogos = [
  { src: "/new-york-times.png", alt: "New York Times" },
  { src: "/vice.png", alt: "Vice" },
  { src: "/nbc.png", alt: "NBC News" },
  { src: "/hechinger.png", alt: "Hechinger Report" },
  { src: "/sports-illustrated.png", alt: "Sports Illustrated" },
  { src: "/americas-quarterly.png", alt: "Americas Quarterly" },
];

const skillsByCategory = [
  {
    number: "01",
    label: "Visualization",
    skills: [
      "D3.js",
      "WebGL",
      "deck.gl",
      "Carto for React",
      "Mapbox",
      "Tableau",
      "Looker",
    ],
  },
  {
    number: "02",
    label: "Data & Analysis",
    skills: [
      "Python",
      "pandas",
      "scipy",
      "SQL",
      "Snowflake",
      "Amazon Redshift",
      "Microsoft Azure",
      "BERT",
      "RAG",
      "NER",
    ],
  },
  {
    number: "03",
    label: "Design & Code",
    skills: [
      "TypeScript",
      "React",
      "Next",
      "Vue",
      "Angular",
      "Retool",
      "Cloud Engineering",
    ],
  },
];

function PublishedInColumn({ className = "" }: { className?: string }) {
  return (
    <aside className={className}>
      <p className="font-meta text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-6 min-[801px]:[writing-mode:vertical-rl] min-[801px]:rotate-180 min-[801px]:h-36 min-[801px]:mb-0">
        Work published in
      </p>
      <div className="flex flex-wrap min-[801px]:flex-col gap-6 min-[801px]:gap-7 min-[801px]:mt-6">
        {publicationLogos.map((logo) => (
          <div
            key={logo.src}
            className="relative h-8 w-28 min-[801px]:w-24 shrink-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain object-left opacity-75 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </aside>
  );
}

function SkillsBlock({ className = "" }: { className?: string }) {
  return (
    <aside className={className}>
      <p className="font-meta text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-5">
        Skills
      </p>
      <div className="space-y-7">
        {skillsByCategory.map((group) => (
          <article key={group.number}>
            <p className="font-display text-3xl text-zinc-300 leading-none mb-1.5">
              {group.number}
            </p>
            <h3 className="font-meta text-[10px] uppercase tracking-[0.2em] text-[#3e0000] mb-1.5">
              {group.label}
            </h3>
            <p className="font-meta text-[9px] uppercase tracking-[0.08em] text-zinc-700 leading-relaxed">
              {group.skills.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </aside>
  );
}

export default function Home() {
  const projects = getAllProjects();
  const featured = projects.find((p) => p.slug === FEATURED_SLUG) ?? projects[0];
  const gridProjects = projects.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <div className="relative">
        <SiteNav />
        <HexagonGrid />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div
          id="work"
          className="section-rule pt-10 min-[801px]:pt-12 scroll-mt-4 pb-10 min-[801px]:pb-12"
        >
          {/* Mobile: stacked */}
          <div className="min-[801px]:hidden space-y-14">
            <PublishedInColumn />
            <SkillsBlock />
            <section>
              {featured && <FeaturedProject {...featured} />}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {gridProjects.map((project, index) => (
                  <GridProjectTile
                    key={project.slug}
                    {...project}
                    imageFirst={index % 2 === 1}
                  />
                ))}
              </div>
            </section>
          </div>

          {/*
            Desktop grid (>800px):

            | Published In | Skills  | Featured Work      |
            | (spans both  |         |                    |
            |  rows)       |         | Other Work 2×2     |
          */}
          <div
            className="hidden min-[801px]:grid min-[801px]:gap-x-8 min-[801px]:gap-y-6"
            style={{
              gridTemplateColumns: "140px 220px 1fr",
              gridTemplateRows: "auto auto",
              gridTemplateAreas: `
                "published skills featured"
                "published .      grid"
              `,
            }}
          >
            {/* Col 1 — full height */}
            <PublishedInColumn className="border-r border-zinc-900 pr-6 [grid-area:published]" />

            {/* Col 2 row 1 — skills beside featured */}
            <SkillsBlock className="border-r border-zinc-900 pr-6 [grid-area:skills] self-start" />

            {/* Col 3 row 1 — featured explore data */}
            <div className="[grid-area:featured]">
              {featured && <FeaturedProject {...featured} />}
            </div>

            {/* Col 3 row 2 — 2×2 other work */}
            <div className="[grid-area:grid]">
              <div className="grid grid-cols-2 gap-4">
                {gridProjects.map((project, index) => (
                  <GridProjectTile
                    key={project.slug}
                    {...project}
                    imageFirst={index % 2 === 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer
          id="contact"
          className="section-rule py-12 md:py-16 mb-8 scroll-mt-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="font-display text-2xl md:text-3xl text-zinc-900">
              Peter D&apos;Amato
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-meta text-[10px] uppercase tracking-[0.2em] text-[#3e0000] border-b border-[#3e0000] pb-1 hover:opacity-70 transition-opacity"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="font-meta text-[10px] uppercase tracking-[0.2em] text-zinc-900 border-b border-zinc-900 pb-1 hover:text-[#3e0000] hover:border-[#3e0000] transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
