import { writeFileSync } from "fs";
import prettier from "prettier";
import { getAllPosts } from "./api";

interface PageEntry {
  slug: string;
  publishDate?: string;
}

const ROOT_URL = "https://www.noahmatsell.ca";

function generateSiteMap(pages: PageEntry[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(
         ({ slug, publishDate }) => `
       <url>
           <loc>${`${ROOT_URL}/${slug}`}</loc>
           ${publishDate ? `<lastmod>${publishDate}</lastmod>` : ``}
       </url>`
       )
       .join("")}
   </urlset>
 `;
}

async function generate() {
  // We make an API call to gather the URLs for our site
  const allPosts = getAllPosts(["slug", "publishDate"])
    .filter((post) => {
      return Boolean(post.publishDate && post.slug);
    })
    .map((post) => {
      return { ...post, slug: `blog/${post.slug}` };
    }) as PageEntry[];

  const staticPages = [{ slug: "" }, { slug: "resume" }, { slug: "blog" }];

  const sitemap = generateSiteMap([...staticPages, ...allPosts]);

  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  writeFileSync("public/sitemap.xml", formatted);
}

generate();
