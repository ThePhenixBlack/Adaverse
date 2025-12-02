import Link from "next/link";
import { db } from "@/db";
import { promotions, student_projects, ada_projects } from "@/db/schema";
import { slugify } from "@/lib/slugify";
import { revalidatePath } from "next/cache";
import { STACKS } from "@/lib/stacks";
// SERVER ACTION : création projet
async function createProject(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const stacks = formData.getAll("stacks") as string[];
  const stacksString = stacks.join(", ");
  const promotionId = Number(formData.get("promotionId"));
const adaProjectId = Number(formData.get("adaProjectId"));
  const slug = slugify(title);
const githubUrl = formData.get("githubUrl") as string | null;
const demoUrl = formData.get("demoUrl") as string | null;

 await db.insert(student_projects).values({
  title,
  slug,
  stacks: stacksString,
  promotionId,
  adaProjectId,
  githubUrl: githubUrl && githubUrl.trim() !== "" ? githubUrl : null,
  publishedAt: new Date(),
  demoUrl: demoUrl && demoUrl.trim() !== "" ? demoUrl : null,
});

  revalidatePath("/");
  
}

export default async function NewProjectPage() {
  // Récupération des promotions existantes
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
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Proposer un projet</h1>

        <Link
          href="/"
          className="text-sm rounded-lg border px-3 py-1 hover:bg-neutral-50"
        >
          ← Retour
        </Link>
      </header>

      <form action={createProject} className="space-y-4 border p-4 rounded-lg bg-white">
        {/* Titre */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Titre du projet</label>
          <input
            type="text"
            name="title"
            className="w-full border px-3 py-2 rounded-lg text-sm"
            placeholder="Ex: Adaverse Platform"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border px-3 py-2 rounded-lg text-sm"
            placeholder="Décris brièvement le projet"
            rows={4}
            required
          />
        </div>

<div className="space-y-1">
  <label className="text-sm font-medium">URL GitHub (optionnel)</label>
  <input
    type="url"
    name="githubUrl"
    className="w-full border px-3 py-2 rounded-lg text-sm"
    placeholder="https://github.com/mon-compte/mon-projet"
  />
</div>
 <div className="space-y-1">
  <label className="text-sm font-medium">URL Démo (optionnel)</label>
  <input
    type="url"
    name="demoUrl"
    className="w-full border px-3 py-2 rounded-lg text-sm"
    placeholder="https://mon-projet.vercel.app"
  />
</div>

     <div className="space-y-2">
  <label className="text-sm font-medium">Stacks utilisées</label>




  <div className="grid grid-cols-2 gap-2">
    {STACKS.map((stack) => (
      <label key={stack} className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="stacks"
          value={stack}
          className="w-4 h-4"
        />
        {stack}
      </label>
    ))}
  </div>
</div>

        {/* Sélection de la promotion */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Promotion</label>
          <select
            name="promotionId"
            className="w-full border px-3 py-2 rounded-lg text-sm bg-white"
            required
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
  <label className="text-sm font-medium">Projet ADA</label>
  <select
    name="adaProjectId"
    className="w-full border px-3 py-2 rounded-lg text-sm bg-white"
    required
  >
    <option value="">Choisir un projet ADA</option>

    {adaList.map((ada) => (
      <option key={ada.id} value={ada.id}>
        {ada.name}
      </option>
    ))}
  </select>
</div>

        {/* Bouton */}
        <button
          type="submit"
          className="rounded-lg border px-4 py-2 text-sm bg-black text-white"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}