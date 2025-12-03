"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";

type Project = {
  id: number;
  title: string;
  slug: string | null;
  adaProjectName: string | null;
  promotionName: string | null;
  stacks: string | null;
  publishedAt: string | null; // ISO string ou null
};

type SortOption = "recent" | "oldest" | "title";

interface ProjectListWithFiltersProps {
  projects: Project[];
}

export function ProjectListWithFilters({ projects }: ProjectListWithFiltersProps) {
  const [search, setSearch] = useState("");
  const [adaFilter, setAdaFilter] = useState<string>("all");
  const [promoFilter, setPromoFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  // Liste des projets ADA uniques
  const adaOptions = useMemo(
    () =>
      Array.from(
        new Set(
          projects
            .map((p) => p.adaProjectName)
            .filter((name): name is string => Boolean(name))
        )
      ),
    [projects]
  );

  // Liste des promos uniques
  const promoOptions = useMemo(
    () =>
      Array.from(
        new Set(
          projects
            .map((p) => p.promotionName)
            .filter((name): name is string => Boolean(name))
        )
      ),
    [projects]
  );

  const filteredAndSorted = useMemo(() => {
    let result = [...projects];

    // 🔍 Recherche texte (titre + stacks)
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const inTitle = p.title.toLowerCase().includes(q);
        const inStacks = p.stacks?.toLowerCase().includes(q) ?? false;
        return inTitle || inStacks;
      });
    }

    // Filtre projet ADA
    if (adaFilter !== "all") {
      result = result.filter((p) => p.adaProjectName === adaFilter);
    }

    // Filtre promo
    if (promoFilter !== "all") {
      result = result.filter((p) => p.promotionName === promoFilter);
    }

    // Tri
    result.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title, "fr");
      }

      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;

      if (sortBy === "recent") {
        return dateB - dateA; // plus récents d’abord
      } else {
        return dateA - dateB; // plus anciens d’abord
      }
    });

    return result;
  }, [projects, search, adaFilter, promoFilter, sortBy]);

  return (
    <section className="space-y-4">
      {/* Barre de filtres */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Recherche */}
        <div className="w-full md:max-w-xs">
          <label className="block text-xs font-medium text-text-muted mb-1">
            Rechercher un projet
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Titre, stack…"
            className="w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          />
        </div>

        {/* Filtres + tri */}
        <div className="flex flex-wrap gap-3 text-xs">
          {/* Projet ADA */}
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-text-muted mb-1">
              Projet ADA
            </span>
            <select
              value={adaFilter}
              onChange={(e) => setAdaFilter(e.target.value)}
              className="rounded-lg border border-border-subtle bg-background px-2 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <option value="all">Tous</option>
              {adaOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Promotion */}
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-text-muted mb-1">
              Promotion
            </span>
            <select
              value={promoFilter}
              onChange={(e) => setPromoFilter(e.target.value)}
              className="rounded-lg border border-border-subtle bg-background px-2 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <option value="all">Toutes</option>
              {promoOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Tri */}
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-text-muted mb-1">
              Trier par
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-border-subtle bg-background px-2 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <option value="recent">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="title">Titre A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Résumé + liste */}
      <div className="space-y-2">
        <p className="text-xs text-text-soft">
          {filteredAndSorted.length} projet
          {filteredAndSorted.length > 1 ? "s" : ""} affiché
          {filteredAndSorted.length > 1 ? "s" : ""}.
        </p>

        <ul className="space-y-2">
          {filteredAndSorted.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </ul>

        {filteredAndSorted.length === 0 && (
          <p className="text-sm text-text-muted">
            Aucun projet ne correspond à ces filtres.
          </p>
        )}
      </div>
    </section>
  );
}