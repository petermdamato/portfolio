import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject, getProjectSlugs } from "@/lib/projects";
import VideoEmbed from "@/components/VideoEmbed";
import IframeEmbed from "@/components/IframeEmbed";
import Link from "next/link";

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
          className="text-sm font-medium text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors uppercase tracking-widest"
        >
          ← Back to projects
        </Link>
      </nav>

      <header className="mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 dark:text-gray-100 mb-10 leading-tight">
          {project.title}
        </h1>
        
        <div className="flex flex-wrap gap-y-8 gap-x-16 border-t border-gray-200 dark:border-gray-800 pt-8">
          {project.date && (
            <div>
              <h3 className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                Date
              </h3>
              <p className="text-gray-900 dark:text-gray-200 font-light">
                {project.date}
              </p>
            </div>
          )}
          
          {project.tags && project.tags.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2 text-gray-900 dark:text-gray-200 font-light">
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

      <article className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 transition-colors prose-p:font-light prose-p:leading-relaxed">
        <MDXRemote source={project.content} />
      </article>
    </main>
  );
}
