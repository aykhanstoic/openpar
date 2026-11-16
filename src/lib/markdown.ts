import { createMarkdownProcessor } from "@astrojs/markdown-remark";

/* Astro's own processor with its default settings (astro.config has no
   markdown block), so this renders the same way as an entry body. */
const processor = createMarkdownProcessor();

export async function renderMarkdown(text: string): Promise<string> {
  return (await (await processor).render(text)).code;
}
