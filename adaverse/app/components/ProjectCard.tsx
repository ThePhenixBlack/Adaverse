// app/_components/ProjectCard.tsx
import Link from "next/link";

interface ProjectCardProps {
  id: number;
  title: string;
  slug: string | null;
  adaProjectName: string | null;
  promotionName: string | null;
  stacks: string | null;
  publishedAt: Date | string | null; // 👈 ici le fix
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

  // On normalise la date en string "fr-FR"
  const formattedDate =
    publishedAt != null
      ? new Date(publishedAt).toLocaleDateString("fr-FR")
      : null;

  return (
    <li className="border rounded-lg p-3 hover:bg-neutral-50 transition">
      <Link href={href} className="block space-y-2">
        {/* Titre */}
        <div className="font-semibold">{title}</div>

        {/* Promo + projet ADA */}
        <div className="text-xs text-neutral-500">
          {adaProjectName ?? "Projet ADA"} · {promotionName ?? "Promotion inconnue"}
        </div>

        {/* Date */}
        {formattedDate && (
          <div className="text-[11px] text-neutral-400">
            Publié le {formattedDate}
          </div>
        )}

        {/* Badges de stacks */}
        {stacks && (
          <div className="flex flex-wrap gap-1">
            {stacks
              .split(",")
              .map((s) => s.trim())
              .map((stack, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] rounded bg-neutral-100 border border-neutral-300"
                >
                  {stack}
                </span>
              ))}
          </div>
        )}
      </Link>
    </li>
  );
}