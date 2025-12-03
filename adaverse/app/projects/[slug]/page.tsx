// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/queries";
import { Github } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage(props: ProjectPageProps) {
  const { slug } = await props.params;
  const [project] = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const formattedDate = project.publishedAt
    ? new Date(project.publishedAt).toLocaleDateString("fr-FR")
    : null;

  return (
    <main className="min-h-screen bg-surface-muted">
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.15em] text-text-soft">
              Projet étudiant
            </p>

            <h1 className="text-3xl font-semibold leading-tight">
              {project.title}
            </h1>

            <p className="text-sm text-text-muted">
              {project.adaProjectName} · {project.promotionName}
            </p>

            {formattedDate && (
              <p className="text-xs text-text-soft">
                Publié le {formattedDate}
              </p>
            )}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs rounded-lg border border-border-subtle bg-surface px-3 py-1.5 hover:bg-primary-soft hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            ← Retour à la liste
          </Link>
        </header>

        {/* Liens externes */}
        {(project.githubUrl || project.demoUrl) && (
          <section className="rounded-xl bg-surface border border-border-subtle px-4 py-3 space-y-2">
            <h2 className="text-sm font-medium text-foreground">
              Liens du projet
            </h2>

            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium border border-border-subtle rounded-lg px-3 py-1.5 bg-background hover:bg-primary-soft hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <Github className="w-4 h-4" />
                  Voir le code sur GitHub
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium border border-border-subtle rounded-lg px-3 py-1.5 bg-background hover:bg-primary-soft hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  🔗 Voir la démo en ligne
                </a>
              )}
            </div>
          </section>
        )}

        {/* Résumé du projet */}
<section className="rounded-xl bg-surface border border-border-subtle px-4 py-4 text-sm space-y-2">
  <h2 className="text-sm font-medium text-foreground">
    Résumé du projet
  </h2>

  {project.description ? (
    <p className="text-sm text-text-muted whitespace-pre-line">
      {project.description}
    </p>
  ) : (
    <p className="text-xs text-text-soft">
      Aucune description détaillée n&apos;a encore été ajoutée pour ce projet.
    </p>
  )}

  <p className="text-xs text-text-soft">
    Réalisé dans le cadre de{" "}
    <span className="font-medium text-foreground">
      {project.adaProjectName}
    </span>{" "}
    · Promotion{" "}
    <span className="font-medium text-foreground">
      {project.promotionName}
    </span>
    .
  </p>
</section>

        {/* Stacks */}
        <section className="rounded-xl bg-surface border border-border-subtle px-4 py-4 text-sm space-y-3">
          <h2 className="text-sm font-medium text-foreground">
            Stacks utilisées
          </h2>

          {project.stacks ? (
            <div className="flex flex-wrap gap-2">
              {project.stacks
                .split(",")
                .map((stack) => stack.trim())
                .map((stack, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-full bg-primary-soft/70 text-foreground border border-border-subtle"
                  >
                    {stack}
                  </span>
                ))}
            </div>
          ) : (
            <p className="text-xs text-text-soft">
              Aucune stack renseignée pour ce projet.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}