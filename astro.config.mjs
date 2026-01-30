import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import mermaid from "astro-mermaid";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  site: "https://lancern.xyz",
  integrations: [
    mdx(),
    mermaid({
      autoTheme: false,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
  },
  output: "static",
  adapter: vercel({
    isr: {
      // Vercel will cache each on-demand rendering page for 10 minutes.
      expiration: 10,
    },
  }),
});
