import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject, getProjectSlugs, getProjectTypeLabel } from "@/lib/projects";
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
    <main className="max-w-5xl mx-auto py-16 md:py-24 px-6 sm:px-8 lg:px-12">
      <nav className="mb-12 section-rule pt-6">
        <Link
          href="/"
          className="font-meta text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-[#3e0000] transition-colors"
        >
          ← Back to work
        </Link>
      </nav>

      <header className="mb-16 md:mb-20">
        <p className="font-meta text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-4">
          {getProjectTypeLabel(slug)}
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-zinc-900 leading-[0.95] mb-8">
          {project.title}
        </h1>

        {project.externalUrl && (
          <p className="mb-8">
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="font-meta text-[10px] uppercase tracking-[0.2em] text-[#3e0000] border-b border-[#3e0000] pb-1 hover:opacity-70 transition-opacity"
            >
              Visit Live Project ↗
            </a>
          </p>
        )}

        {project.partnerLogo && (
          <div className="mb-8">
            <div className="relative h-12 w-full max-w-xs">
              <Image
                src={project.partnerLogo}
                alt={`${project.title} partner logo`}
                fill
                sizes="320px"
                className="object-contain object-left"
              />
            </div>
          </div>
        )}

        <div className="section-rule pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {project.date && (
            <div>
              <h3 className="font-meta text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                Date
              </h3>
              <p className="font-body text-zinc-900">{project.date}</p>
            </div>
          )}

          {project.tags && project.tags.length > 0 && (
            <div>
              <h3 className="font-meta text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                Technologies
              </h3>
              <p className="font-body text-zinc-900">{project.tags.join(" · ")}</p>
            </div>
          )}
        </div>
      </header>

      {project.video && (
        <div className="mb-14 md:mb-16">
          <VideoEmbed src={project.video} />
        </div>
      )}

      {project.iframe && (
        <div className="mb-14 md:mb-16">
          <IframeEmbed src={project.iframe} />
        </div>
      )}

      {project.screenshots && project.screenshots.length > 0 && (
        <section className="mb-14 md:mb-16 section-rule pt-10">
          <h2 className="font-display text-3xl md:text-4xl text-zinc-900 mb-8">
            Screenshots
          </h2>
          <div className="space-y-6">
            {project.screenshots.map((src) => (
              <div
                key={src}
                className="relative aspect-[16/10] overflow-hidden bg-zinc-100"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 1024px) 900px, 86vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <article className="prose prose-lg prose-zinc max-w-none section-rule pt-10 prose-headings:font-display prose-headings:font-normal prose-headings:text-zinc-900 prose-p:font-body prose-p:text-zinc-700 prose-a:text-[#3e0000] hover:prose-a:opacity-70">
        <MDXRemote source={project.content} />
      </article>
    </main>
  );
}
