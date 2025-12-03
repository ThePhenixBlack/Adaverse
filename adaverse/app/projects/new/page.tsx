// app/projects/new/page.tsx
import { db } from "@/db";
import { student_projects, promotions, ada_projects } from "@/db/schema";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { STACKS } from "@/lib/stacks";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createProject(formData: FormData) {
  "use server";

  const title = (formData.get("title") as string | null)?.trim();
  const promotionId = Number(formData.get("promotionId"));
  const adaProjectId = Number(formData.get("adaProjectId"));
  const stacks = formData.getAll("stacks") as string[];

  const descriptionRaw = formData.get("description") as string | null;
  const description =
    descriptionRaw && descriptionRaw.trim() !== ""
      ? descriptionRaw.trim()
      : null;

  const githubUrl = (formData.get("githubUrl") as string | null)?.trim() || "";
  const demoUrl = (formData.get("demoUrl") as string | null)?.trim() || "";

  if (!title || !promotionId || !adaProjectId) {
    return;
  }

  const slug = slugify(title);
  const stacksString = stacks.join(", ");

  await db.insert(student_projects).values({
    title,
    slug,
    stacks: stacksString,
    promotionId,
    adaProjectId,
    description, // 👈 ON SAUVEGARDE
    githubUrl: githubUrl !== "" ? githubUrl : null,
    demoUrl: demoUrl !== "" ? demoUrl : null,
    publishedAt: new Date(),
  });

  revalidatePath("/");
}

export default async function NewProjectPage() {
  const promoList = await db
    .select({
      id: promotions.id,
      name: promotions.name,
    })
    .from(promotions);

  const adaList = await db
    .select({
      id: ada_projects.id,
      name: ada_projects.name,
    })
    .from(ada_projects);

  return (
    <main className="min-h-screen bg-surface-muted">
      <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Proposer un projet
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Renseigne les informations principales de ton projet pour qu&apos;il
              apparaisse dans Adaverse.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs rounded-lg border border-border-subtle bg-surface px-3 py-1.5 hover:bg-primary-soft hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            ← Retour à la liste
          </Link>
        </header>

        {/* Formulaire */}
        <form
          action={createProject}
          className="space-y-5 rounded-xl bg-surface border border-border-subtle px-4 py-5 shadow-sm"
        >
          {/* Titre */}
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="title">
              Titre du projet
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              placeholder="Ex : Adaction, Pokédex, Kanban Board…"
            />
          </div>

{/* Description */}
<div className="space-y-1">
  <label className="text-sm font-medium" htmlFor="description">
    Description du projet
  </label>
  <textarea
    id="description"
    name="description"
    rows={4}
    className="w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    placeholder="Explique rapidement le but du projet, les fonctionnalités principales, etc."
  />
</div>

          {/* Promotion + Projet ADA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="promotionId">
                Promotion
              </label>
              <select
                id="promotionId"
                name="promotionId"
                required
                className="w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <option value="">Choisir une promotion</option>
                {promoList.map((promo) => (
                  <option key={promo.id} value={promo.id}>
                    {promo.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="adaProjectId">
                Projet ADA
              </label>
              <select
                id="adaProjectId"
                name="adaProjectId"
                required
                className="w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <option value="">Choisir un projet ADA</option>
                {adaList.map((ada) => (
                  <option key={ada.id} value={ada.id}>
                    {ada.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stacks */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Stacks utilisées</p>
            <p className="text-xs text-text-soft">
              Sélectionne une ou plusieurs technologies utilisées pour ce projet.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {STACKS.map((stack) => (
                <label
                  key={stack}
                  className="flex items-center gap-2 text-xs rounded-lg border border-border-subtle bg-background px-2 py-1.5 cursor-pointer hover:bg-surface-muted"
                >
                  <input
                    type="checkbox"
                    name="stacks"
                    value={stack}
                    className="h-3 w-3"
                  />
                  <span>{stack}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="githubUrl">
                URL GitHub (optionnel)
              </label>
              <input
                id="githubUrl"
                name="githubUrl"
                type="url"
                className="w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                placeholder="https://github.com/mon-compte/mon-projet"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="demoUrl">
                URL démo (optionnel)
              </label>
              <input
                id="demoUrl"
                name="demoUrl"
                type="url"
                className="w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                placeholder="https://mon-projet.vercel.app"
              />
            </div>
          </div>

          {/* Bouton submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Publier le projet
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}