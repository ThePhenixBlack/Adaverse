// lib/queries.ts
import { db } from "@/db";
import { student_projects, promotions, ada_projects } from "@/db/schema";
import { eq, isNotNull, desc } from "drizzle-orm";

// Récupérer tous les projets publiés (pour la home)
export async function getPublishedProjects() {
  return db
    .select({
      id: student_projects.id,
      title: student_projects.title,
      slug: student_projects.slug,
      stacks: student_projects.stacks,
      githubUrl: student_projects.githubUrl,
      demoUrl: student_projects.demoUrl,
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
}

// Récupérer 1 projet par son slug (pour la page /projects/[slug])
export async function getProjectBySlug(slug: string) {
  return db
    .select({
      id: student_projects.id,
      title: student_projects.title,
      slug: student_projects.slug,
      stacks: student_projects.stacks,
      githubUrl: student_projects.githubUrl,
      demoUrl: student_projects.demoUrl,
      description: student_projects.description,
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
    .where(eq(student_projects.slug, slug))
    .limit(1);
}