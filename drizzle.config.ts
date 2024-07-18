import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./database/schema,ts",
  dialect: "postgresql",
  migrations: {
    prefix: "supabase"
  }
});
