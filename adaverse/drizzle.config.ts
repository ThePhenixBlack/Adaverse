import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",  // où sera ton schéma
  out: "./drizzle",          // dossier de migrations générées
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,  // ta variable Neon
  },
});