// app/page.tsx

import Link from "next/link";
import { getPublishedProjects } from "@/lib/queries";

export default async function HomePage() {
  const projects = await getPublishedProjects();

  return (
    <main className="min-h-screen p-6 space-y-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Adaverse</h1>
        <button className="rounded-lg border px-4 py-2 text-sm">
          Proposer un projet
        </button>
      </header>

      <section className="space-y-2">
        {projects.length === 0 ? (
          <p className="text-sm text-neutral-500">
            Aucun projet publié pour le moment.
          </p>
        ) : (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project.id}
                className="border rounded-lg p-3 hover:bg-neutral-50 transition"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block space-y-1"
                >
                  <div className="font-semibold">{project.title}</div>
                  <div className="text-xs text-neutral-500">
                    {project.adaProjectName} · {project.promotionName}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    slug: {String(project.slug)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}