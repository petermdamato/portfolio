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
      <article className="flex flex-col h-full rounded-2xl border-[4px] border-[#0a0a0a] p-5 bg-[#fdfdfc] transition-transform duration-500 ease-out group-hover:-translate-y-1">
        <div className="aspect-[4/3] w-full bg-zinc-100 rounded-xl overflow-hidden mb-6 relative">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt={`${title} preview`}
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 40vw, 92vw"
              className="object-cover"
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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        </div>
        
        <h2 className="font-display text-2xl font-semibold text-zinc-900 tracking-tight mb-3 group-hover:text-zinc-700 transition-colors duration-300">
          {title}
        </h2>
        
        <p className="font-body text-zinc-600 font-normal leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-auto pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-meta text-xs font-medium text-zinc-500 uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
