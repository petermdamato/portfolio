import Link from "next/link";
import Image from "next/image";
import { ProjectMetadata, getProjectTypeLabel } from "../lib/projects";

type ProjectCardVariant = "featured" | "horizontal-left" | "horizontal-right";

interface ProjectCardProps extends ProjectMetadata {
  variant?: ProjectCardVariant;
}

export default function ProjectCard({
  slug,
  title,
  description,
  tags,
  partnerLogo,
  thumbnail,
  variant = "horizontal-left",
}: ProjectCardProps) {
  const isFeatured = variant === "featured";
  const imageFirst = variant !== "horizontal-right";

  const imageBlock = (
    <div
      className={`relative overflow-hidden bg-zinc-100 order-1 ${
        isFeatured ? "aspect-[21/9] w-full" : "aspect-[4/3] w-full md:w-[58%]"
      } ${!imageFirst && !isFeatured ? "md:order-2" : ""}`}
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={`${title} preview`}
          fill
          sizes={
            isFeatured
              ? "100vw"
              : "(min-width: 1024px) 560px, (min-width: 768px) 50vw, 92vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-200" />
      )}
      {partnerLogo && (
        <div className="absolute left-5 bottom-5 h-10 w-36 z-10">
          <Image
            src={partnerLogo}
            alt={`${title} partner logo`}
            fill
            sizes="144px"
            className="object-contain object-left"
          />
        </div>
      )}
    </div>
  );

  const textBlock = (
    <div
      className={`flex flex-col justify-center order-2 ${
        isFeatured ? "py-8 md:py-10" : "py-6 md:py-0 md:w-[42%]"
      } ${!imageFirst && !isFeatured ? "md:order-1" : ""}`}
    >
      <p className="font-meta text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
        {getProjectTypeLabel(slug)}
      </p>
      <h2
        className={`font-display text-zinc-900 leading-[1.05] mb-4 group-hover:text-[#3e0000] transition-colors ${
          isFeatured ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl"
        }`}
      >
        {title}
      </h2>
      <p className="font-body text-zinc-600 leading-relaxed mb-5 line-clamp-3">
        {description}
      </p>
      {tags && tags.length > 0 && (
        <p className="font-body text-sm text-zinc-500 mb-5">
          {tags.slice(0, 4).join(" · ")}
        </p>
      )}
      <span className="font-meta text-[10px] uppercase tracking-[0.18em] text-zinc-900 group-hover:text-[#3e0000] transition-colors">
        View Project →
      </span>
    </div>
  );

  return (
    <Link href={`/projects/${slug}`} className="group block section-rule pt-10 md:pt-12">
      <article
        className={
          isFeatured ? "space-y-0" : "flex flex-col md:flex-row gap-8 md:gap-12 items-stretch"
        }
      >
        {imageBlock}
        {textBlock}
      </article>
    </Link>
  );
}
