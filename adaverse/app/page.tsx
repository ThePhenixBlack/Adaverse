// app/page.tsx
import { db } from "@/db"; // adapte le chemin si besoin
import { student_projects, promotions, ada_projects } from "@/db/schema";
import { eq, isNotNull, desc } from "drizzle-orm";

export default async function HomePage() {
  const projects = await db
    .select({
      id: student_projects.id,
      title: student_projects.title,
      slug: student_projects.slug,
      publishedAt: student_projects.publishedAt,
      promotionName: promotions.name,
      adaProjectName: ada_projects.name,
    })
    .from(student_projects)
    .leftJoin(
      promotions,
      eq(student_projects.promotionId, promotions.id)
    )
    .leftJoin(
      ada_projects,
      eq(student_projects.adaProjectId, ada_projects.id)
    )
    .where(isNotNull(student_projects.publishedAt))
    .orderBy(desc(student_projects.publishedAt));

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
              <li key={project.id} className="border rounded-lg p-3">
                <div className="font-semibold">{project.title}</div>
                <div className="text-xs text-neutral-500">
                  {project.adaProjectName} · {project.promotionName}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}