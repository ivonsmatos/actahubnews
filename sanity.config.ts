import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import article from "./src/lib/sanity/schemas/article";

export default defineConfig({
  name: "actahub",
  title: "Actahub CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0w8osyyd",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool(),
    visionTool(), // opcional — permite testar GROQ queries
  ],
  schema: {
    types: [article],
  },
});
