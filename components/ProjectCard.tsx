import Link from "next/link";
import { ProjectMetadata } from "@/lib/projects";

export default function ProjectCard({ slug, title, description, tags }: ProjectMetadata) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <article className="flex flex-col h-full">
        {/* Thumbnail Placeholder - To be replaced with actual images later */}
        <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden mb-6 relative transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-500" />
        </div>
        
        <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 tracking-tight mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h2>
        
        <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-auto pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest"
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
