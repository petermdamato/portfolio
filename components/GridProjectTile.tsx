import Link from "next/link";
import Image from "next/image";
import { ProjectMetadata } from "../lib/projects";

interface GridProjectTileProps extends ProjectMetadata {
  imageFirst?: boolean;
}

export default function GridProjectTile({
  slug,
  title,
  description,
  thumbnail,
  partnerLogo,
  imageFirst = false,
}: GridProjectTileProps) {
  const imageBlock = (
    <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden min-h-[140px]">
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={`${title} preview`}
          fill
          sizes="(min-width: 801px) 280px, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-200" />
      )}
      {partnerLogo && (
        <div className="absolute left-3 bottom-3 h-7 w-24 z-10">
          <Image
            src={partnerLogo}
            alt={`${title} partner logo`}
            fill
            sizes="96px"
            className="object-contain object-left"
          />
        </div>
      )}
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center p-4 md:p-5 min-h-[140px]">
      <h3 className="font-display text-xl md:text-2xl text-zinc-900 leading-tight mb-2 group-hover:text-[#3e0000] transition-colors">
        {title}
      </h3>
      <p className="font-body text-xs md:text-sm text-zinc-600 leading-relaxed mb-3 line-clamp-3">
        {description}
      </p>
      <span className="font-meta text-[10px] uppercase tracking-[0.16em] text-[#3e0000] group-hover:opacity-70 transition-opacity">
        View Project →
      </span>
    </div>
  );

  return (
    <Link href={`/projects/${slug}`} className="group block border border-zinc-900">
      <article className="grid grid-cols-2 min-h-[140px]">
        {imageFirst ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </article>
    </Link>
  );
}
