import Link from "next/link";
import Image from "next/image";
import { ProjectMetadata } from "../lib/projects";

export default function FeaturedProject({
  slug,
  title,
  description,
  thumbnail,
}: ProjectMetadata) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <article>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border border-zinc-900">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={`${title} preview`}
              fill
              sizes="(min-width: 801px) 60vw, 100vw"
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 md:p-6">
            <p className="font-meta text-[10px] uppercase tracking-[0.2em] text-white/80 mb-2">
              Featured Project
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-white mb-2 leading-tight">
              {title}
            </h3>
            <p className="font-body text-sm text-white/75 mb-3 line-clamp-2 max-w-md hidden sm:block">
              {description}
            </p>
            <span className="font-meta text-[10px] uppercase tracking-[0.18em] text-[#cba66d] group-hover:text-white transition-colors">
              View Project →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
