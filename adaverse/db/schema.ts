import { time } from "console";

import {
  pgTable,
  serial,
  text,
  timestamp,
  date,
  integer,
} from "drizzle-orm/pg-core";

export const ada_projects = pgTable("ada_projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const promotions = pgTable("promotions", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    startDate: date("start_date").notNull(),

});

export const student_projects = pgTable("student_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),

  githubUrl: text("github_url"),
  demoUrl: text("demo_url"),

  stacks: text("stacks"), 
   description: text("description"),// ← nouvelle colonne

  createdAt: timestamp("created_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),

 promotionId: integer("promotion_id")
  .references(() => promotions.id),

  adaProjectId: integer("ada_project_id")
    .references(() => ada_projects.id),
});