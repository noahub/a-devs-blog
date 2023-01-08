import Head from "next/head";
import { toTzCorrectedDate } from "../lib/utils";

interface Props {
  title: string;
  description: string;
  type?: "article" | "website";
  author?: string;
  coverImgUrl?: string;
  ogImageType?: string; // eg "image/png"
  ogImageWidth?: string; // eg "1200"
  ogImageHeight?: string; // eg "630"
  ogImageDescription?: string;
  twitterSite?: string;
  twitterCreator?: string;
  publishDate?: string;
  readTime: string;
}

const buildOgImageUrl = ({
  title = "",
  publishDate = "",
  readTime = "",
  coverImgUrl = "",
}: {
  title?: string;
  publishDate?: string;
  readTime?: string;
  coverImgUrl?: string;
}) => {
  const hostname =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.noahmatsell.ca";

  const params = `title=${encodeURIComponent(
    title
  )}&publishDate=${encodeURIComponent(
    publishDate
  )}&readTime=${encodeURIComponent(readTime)}&coverImgUrl=${encodeURIComponent(
    coverImgUrl
  )}`;

  return `${hostname}/api/og?${params}`;
};

export const SEO = ({
  title,
  description,
  type = "website",
  author = "Noah Matsell",
  coverImgUrl,
  ogImageType = "image/png",
  ogImageWidth = "1200",
  ogImageHeight = "630",
  ogImageDescription,
  twitterSite = "@noahmatsell",
  twitterCreator = "@noahmatsell",
  publishDate,
  readTime,
}: Props) => {
  const ogImgUrl = buildOgImageUrl({
    title,
    publishDate,
    readTime,
    coverImgUrl,
  });

  return (
    <Head>
      <title>{`${title} // A Dev's Blog`}</title>
      <meta name="author" content={author} />
      <meta name="description" content={description} />
      {publishDate && (
        <meta
          property="article:published_time"
          content={toTzCorrectedDate(new Date(publishDate)).toString()}
        />
      )}
      <meta
        name="google-site-verification"
        content="WglGyO4frJF_SLB319BLKQvm_Y7n3v5L-rXQfxqKJR8"
      />
      <meta
        property="og:title"
        content={`${title} // A Dev's Blog`}
        key="title"
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImgUrl} />
      <meta property="og:image:type" content={ogImageType} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={`${title} // A Dev's Blog`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImgUrl} />
      <meta name="twitter:image:alt" content={ogImageDescription} />

      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
};
