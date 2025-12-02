// app/page.tsx

import Link from "next/link";
import { getPublishedProjects } from "@/lib/queries";
import { ProjectCard } from "./components/ProjectCard"; // ← CORRECTION ICI

export default async function HomePage() {
  const projects = await getPublishedProjects();

  return (
    <main className="min-h-screen p-6 space-y-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Adaverse</h1>

        <Link
          href="/projects/new"
          className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-100"
        >
          Proposer un projet
        </Link>
      </header>

      <section className="space-y-2">
        {projects.length === 0 ? (
          <p className="text-sm text-neutral-500">
            Aucun projet publié pour le moment.
          </p>
        ) : (
          <ul className="space-y-2">
            {projects.map((project) => (
              <ProjectCard
  key={project.id}
  id={project.id}
  title={project.title}
  slug={project.slug}
  adaProjectName={project.adaProjectName}
  promotionName={project.promotionName}
  stacks={project.stacks}
  publishedAt={
    project.publishedAt ? project.publishedAt.toISOString() : null
  }
/>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}