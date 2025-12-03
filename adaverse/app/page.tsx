// app/page.tsx

import Link from "next/link";
import { getPublishedProjects } from "@/lib/queries";
import { ProjectListWithFilters } from "./components/ProjectListWithFilters";

export default async function HomePage() {
  const projectsFromDb = await getPublishedProjects();

  const projects = projectsFromDb.map((project) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    adaProjectName: project.adaProjectName,
    promotionName: project.promotionName,
    stacks: project.stacks,
    publishedAt: project.publishedAt
      ? project.publishedAt.toISOString()
      : null,
  }));

  return (
    <main className="min-h-screen bg-surface-muted">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Adaverse
              </span>
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Explore les projets publiés des promotions Ada Tech School.
            </p>
          </div>

          <Link
            href="/projects/new"
            className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-primary-soft hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Proposer un projet
          </Link>
        </header>

        {projects.length === 0 ? (
          <p className="text-sm text-text-muted">
            Aucun projet publié pour le moment.
          </p>
        ) : (
          <ProjectListWithFilters projects={projects} />
        )}
      </div>
    </main>
  );
}