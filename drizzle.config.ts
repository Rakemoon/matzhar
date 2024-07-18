import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/database/schema.ts",
  out: "./drizzle/supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SECRET_DATABASE_URL!
  }
});
