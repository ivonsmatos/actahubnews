"use client";

// Required for Cloudflare Pages (next-on-pages)
export const runtime = "edge";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
