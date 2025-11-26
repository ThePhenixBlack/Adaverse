// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/queries";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage(props: ProjectPageProps) {
  // Next 16 : params est une Promise -> on doit l'await
  const { slug } = await props.params;

  const [project] = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="text-sm text-neutral-500">
            {project.adaProjectName} · {project.promotionName}
          </p>
          {project.publishedAt && (
            <p className="text-xs text-neutral-400 mt-1">
              Publié le{" "}
              {new Date(project.publishedAt).toLocaleDateString("fr-FR")}
            </p>
          )}
        </div>

        <Link
          href="/"
          className="text-sm rounded-lg border px-3 py-1 hover:bg-neutral-50"
        >
          ← Retour à la liste
        </Link>
      </header>

      <section className="border rounded-lg p-4 text-sm text-neutral-700">
        <p>
          Ici tu pourras afficher plus d&apos;infos du projet
          (description, liens, stack, etc.) quand on les aura dans la DB.
        </p>
      </section>
    </main>
  );
}