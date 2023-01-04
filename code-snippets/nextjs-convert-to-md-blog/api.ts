import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Post } from "../types/blog";

/**
 * Points to the "blog" directory
 */
const postsDirectory = join(process.cwd(), "blog");

/**
 * Gets the filenames of all posts in "blog" directory
 */
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

/**
 * Gets post data for a given post's slug.
 * Will return the data speicied in the fields array.
 */
export function getPostBySlug(slug: string, fields: (keyof Post)[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const postData: Partial<Post> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    // set slug to real slug
    if (field === "slug") {
      postData[field] = realSlug;
    }
    // set content to parsed gray matter content
    if (field === "content") {
      postData[field] = content;
    }
    // set other properties 1:1 if they exist
    if (typeof data[field] !== "undefined") {
      postData[field] = data[field];
    }

    if (
      process.env.NODE_ENV === "development" &&
      field === "title" &&
      data["title"] &&
      !data["publishDate"]
    ) {
      postData[field] = data[field] + " [draft]";
    }
  });

  return postData;
}

/**
 * Gets an array of all posts with data specified in fields param.
 */

export function getAllPosts(fields: (keyof Post)[] = []) {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // Sort posts by date in descending order
    .sort((post1, post2) => {
      return (post1.publishDate || post1.date || "0") >
        (post2.publishDate || post2.date || "0")
        ? -1
        : 1;
    });

  // Filter out unpublished posts in production
  if (process.env.NODE_ENV === "production") {
    return posts.filter((post) => post.publishDate);
  }
  return posts;
}
