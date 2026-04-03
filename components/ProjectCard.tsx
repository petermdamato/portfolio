import Link from "next/link";
import Image from "next/image";
import { ProjectMetadata } from "../lib/projects";

export default function ProjectCard({
  slug,
  title,
  description,
  tags,
  partnerLogo,
  thumbnail,
}: ProjectMetadata) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <article className="flex flex-col h-full rounded-2xl border border-zinc-200/90 bg-[#fdfdfc] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_14px_32px_rgba(0,0,0,0.12)] group-hover:border-zinc-300">
        <div className="aspect-[4/3] w-full bg-zinc-100 rounded-xl overflow-hidden mb-6 relative">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt={`${title} preview`}
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 40vw, 92vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          )}
          {partnerLogo && (
            <div className="absolute left-6 right-6 bottom-6 h-14 z-10">
              <Image
                src={partnerLogo}
                alt={`${title} partner logo`}
                fill
                sizes="(min-width: 1024px) 260px, (min-width: 768px) 220px, 180px"
                className="object-contain object-left opacity-95"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <h2 className="font-display text-2xl font-semibold text-zinc-900 tracking-tight mb-3 group-hover:text-zinc-700 transition-colors duration-300">
          {title}
        </h2>
        
        <p className="font-body text-zinc-600 font-normal leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-meta text-[11px] font-medium text-zinc-600 uppercase tracking-[0.12em] rounded-full border border-zinc-200 px-2.5 py-1 bg-zinc-50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-zinc-100">
          <span className="font-meta text-[11px] uppercase tracking-[0.16em] text-zinc-500 group-hover:text-zinc-800 transition-colors">
            View Project →
          </span>
        </div>
      </article>
    </Link>
  );
}
