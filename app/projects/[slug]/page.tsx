import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject, getProjectSlugs } from "@/lib/projects";
import VideoEmbed from "@/components/VideoEmbed";
import IframeEmbed from "@/components/IframeEmbed";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto py-24 px-6 sm:px-8 lg:px-12">
      <nav className="mb-16">
        <Link 
          href="/" 
          className="font-meta text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest"
        >
          ← Back to projects
        </Link>
      </nav>

      <header className="mb-20">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 mb-10 leading-tight">
          {project.title}
        </h1>

        {project.externalUrl && (
          <p className="mb-8">
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="font-meta inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors uppercase tracking-widest"
            >
              Visit Live Project ↗
            </a>
          </p>
        )}

        {project.partnerLogo && (
          <div className="mb-8">
            <div className="relative h-16 w-full max-w-md">
              <Image
                src={project.partnerLogo}
                alt={`${project.title} partner logo`}
                fill
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 280px"
                className="object-contain object-left"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-y-8 gap-x-16 border-t border-zinc-300 pt-8">
          {project.date && (
            <div>
              <h3 className="font-meta text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
                Date
              </h3>
              <p className="font-body text-zinc-900 font-normal">
                {project.date}
              </p>
            </div>
          )}
          
          {project.tags && project.tags.length > 0 && (
            <div>
              <h3 className="font-meta text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
                Technologies
              </h3>
              <div className="font-body flex flex-wrap gap-2 text-zinc-900 font-normal">
                {project.tags.join(", ")}
              </div>
            </div>
          )}
        </div>
      </header>

      {project.video && (
        <div className="mb-16">
          <VideoEmbed src={project.video} />
        </div>
      )}
      
      {project.iframe && (
        <div className="mb-16">
          <IframeEmbed src={project.iframe} />
        </div>
      )}

      {project.screenshots && project.screenshots.length > 0 && (
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-6">
            Screenshots
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {project.screenshots.map((src) => (
              <div key={src} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-300 bg-zinc-100">
                <Image
                  src={src}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 1024px) 900px, (min-width: 768px) 86vw, 94vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <article className="prose prose-lg prose-zinc max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-900 prose-p:font-body prose-p:text-zinc-700 prose-p:font-normal prose-p:leading-relaxed prose-strong:text-zinc-900 prose-li:font-body prose-li:text-zinc-700 prose-a:text-zinc-800 hover:prose-a:text-zinc-600 transition-colors">
        <MDXRemote source={project.content} />
      </article>
    </main>
  );
}
