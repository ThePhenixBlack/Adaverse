"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilterList({ projects }) {
  const [filter, setFilter] = useState("all");

  // Liste ADA unique pour le select
  const adaProjects = Array.from(
    new Set(projects.map((p) => p.adaProjectName))
  );

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.adaProjectName === filter);
  }, [projects, filter]);

  return (
    <section className="space-y-4">
      {/* MENU DEROULANT */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Projet ADA :</label>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-2 py-1 text-sm bg-white"
        >
          <option value="all">Tous les projets</option>

          {adaProjects.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* LISTE FILTRÉE */}
      <ul className="space-y-2">
        {filtered.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-sm text-neutral-500">
          Aucun projet pour ce type ADA.
        </p>
      )}
    </section>
  );
}