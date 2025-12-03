// app/components/ProjectCard.tsx
import Link from "next/link";

interface ProjectCardProps {
  id: number;
  title: string;
  slug: string | null;
  adaProjectName: string | null;
  promotionName: string | null;
  stacks: string | null;
  publishedAt: string | null;
}

export function ProjectCard(props: ProjectCardProps) {
  const {
    title,
    slug,
    adaProjectName,
    promotionName,
    stacks,
    publishedAt,
  } = props;

  const href = slug ? `/projects/${slug}` : "#";

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("fr-FR")
    : null;

  return (
    <li>
      <Link
        href={href}
        className="block rounded-xl bg-surface border border-border-subtle px-4 py-3 shadow-sm hover:shadow-md hover:border-primary/60 transition-shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold leading-tight">{title}</h2>

            <p className="text-xs text-text-muted">
              {adaProjectName ?? "Projet ADA"} ·{" "}
              {promotionName ?? "Promotion inconnue"}
            </p>

            {formattedDate && (
              <p className="text-[11px] text-text-soft">
                Publié le {formattedDate}
              </p>
            )}
          </div>

          {stacks && (
            <div className="flex flex-wrap gap-1 justify-end max-w-[50%]">
              {stacks
                .split(",")
                .map((s) => s.trim())
                .map((stack, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-primary-soft/70 text-foreground border border-border-subtle"
                  >
                    {stack}
                  </span>
                ))}
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}