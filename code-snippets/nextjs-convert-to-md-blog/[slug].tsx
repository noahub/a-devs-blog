import Link from "next/link";
import { useRouter } from "next/router";
import PostBody from "../../components/PostBody";
import { PostHeader } from "../../components/PostHeader";
import { PostTitle } from "../../components/PostTitle";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import { Post as PostType } from "../../types/blog";

import Image from "next/image";
import "prismjs/themes/prism.min.css";
import { CommentsSection } from "../../components/CommentsSection";
import { SEO } from "../../components/SEO";
import { SubscribeForm } from "../../components/SubscribeForm";
import { toReadableDate } from "../../lib/utils";

interface Props {
  post: PostType;
  morePosts: PostType[];
}

export default function Post({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    // return <ErrorPage statusCode={404} />;
    return <div>error</div>;
  }
  return (
    <div className="m-w-full p-6 md:p-12">
      <SEO
        title={`${post.title} // A Dev's Blog`}
        description={post.description}
        ogImageUrl={post.ogImgUrl}
        type="article"
      />

      <Link
        className="mb-8 flex items-center gap-4 hover:underline"
        href="/blog"
      >
        <Image src={"/back-btn.svg"} alt="back button" height={24} width={24} />{" "}
        Back to blog
      </Link>

      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <article className="mb-12 w-full overflow-hidden">
          <PostHeader
            title={post.title}
            description={post.description}
            coverImage={post.coverImgUrl}
            date={post.date}
            author={post.author}
          />
          <PostBody content={post.content} />
        </article>
      )}

      <hr />
      <div className="py-12 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold flex">Like this post?</h2>
        <p className="pb-6">
          Sign up and get notified when new posts are published!
        </p>
        <SubscribeForm />
      </div>
      <hr />
      <div className="pt-12 max-w-2xl mx-auto">
        <CommentsSection />
      </div>
    </div>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "description",
    "date",
    "slug",
    "author",
    "content",
    "coverImgUrl",
    "ogImgUrl",
    "publishDate",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
        date: post.date ? toReadableDate(post.date) : "",
        publishDate: post.publishDate ? toReadableDate(post.publishDate) : "",
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "publishDate"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
