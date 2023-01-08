import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const fontReg = fetch(
  new URL("../../public/fonts/Mona-Sans-MediumItalic.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const fontBold = fetch(
  new URL("../../public/fonts/Mona-Sans-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function Og(req: NextRequest) {
  const fontDataReg = await fontReg;
  const fontDataBold = await fontBold;
  const hostname =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.noahmatsell.ca";

  try {
    const { searchParams } = new URL(req.url);

    const postTitle = searchParams.get("title");
    const publishDate = searchParams.get("publishDate");
    const readTime = searchParams.get("readTime");
    const coverImgUrl = searchParams.get("coverImgUrl");

    if (!postTitle || !publishDate || !readTime || !coverImgUrl) {
      throw new Error();
    }

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${hostname}/blog/gradient1.png`}
            style={{ width: "100%", height: "100%", position: "absolute" }}
            alt="gradient bg"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${hostname}/blog/frost-pill.png`}
            style={{ position: "absolute", height: 250, top: -16, left: 52 }}
            alt="gradient bg"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${hostname}${coverImgUrl}`}
            style={{
              width: "35%",
              bottom: 0,
              right: 0,
              position: "absolute",
              borderTop: "2px solid rgba(255,255,255,0.8)",
            }}
            alt="gradient bg"
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              padding: "32px 74px",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 84,
              }}
            >
              <h1
                style={{
                  fontFamily: "MonaSansBold",
                  fontSize: 82,
                  margin: 0,
                  textTransform: "capitalize",
                  letterSpacing: "-1.5px",
                  marginBottom: 32,
                }}
              >
                {postTitle}
              </h1>
              <h2
                style={{
                  fontSize: 34,
                  margin: 0,
                  color: "#27272a",
                }}
              >
                {`${publishDate} • ${readTime}`}
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                bottom: 32,
                left: 74,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${hostname}/blog/noah-headshot.jpeg`}
                style={{
                  height: 75,
                  width: 75,
                  borderRadius: 50,
                  margin: 0,
                  marginRight: 16,
                }}
                alt="noah headshot"
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    fontSize: 34,
                    color: "#27272a",
                    margin: 0,
                    fontFamily: "MonaSansBold",
                  }}
                >
                  Noah Matsell
                </p>
                <p
                  style={{
                    fontSize: 22,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#27272a",
                    margin: 0,
                  }}
                >
                  Software Person
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "MonaSansReg",
            data: fontDataReg,
            weight: 400,
            style: "normal",
          },
          {
            name: "MonaSansBold",
            data: fontDataBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${hostname}/blog/gradient1.png`}
            style={{ width: "100%", height: "100%", position: "absolute" }}
            alt="gradient bg"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${hostname}/blog/frost-pill.png`}
            style={{ position: "absolute", height: 250, top: -16, left: 52 }}
            alt="gradient bg"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${hostname}/blog/frost-pill.png`}
            style={{
              width: "25%",
              bottom: 32,
              right: 32,
              position: "absolute",
            }}
            alt="gradient bg"
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              padding: "32px 74px",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 84,
              }}
            >
              <h1
                style={{
                  fontFamily: "MonaSansBold",
                  fontSize: 82,
                  margin: 0,
                  textTransform: "capitalize",
                  letterSpacing: "-1.5px",
                  marginBottom: 32,
                }}
              >
                A Dev&apos;s Blog
              </h1>
              <h2
                style={{
                  fontSize: 34,
                  margin: 0,
                  color: "#27272a",
                }}
              >
                noahmatsell.ca/blog
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                bottom: 32,
                left: 74,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${hostname}/blog/noah-headshot.jpeg`}
                style={{
                  height: 75,
                  width: 75,
                  borderRadius: 50,
                  margin: 0,
                  marginRight: 16,
                }}
                alt="noah headshot"
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    fontSize: 34,
                    color: "#27272a",
                    margin: 0,
                    fontFamily: "MonaSansBold",
                  }}
                >
                  Noah Matsell
                </p>
                <p
                  style={{
                    fontSize: 20,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#27272a",
                    margin: 0,
                  }}
                >
                  Software Person
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: "MonaSansReg",
            data: fontDataReg,
            weight: 400,
            style: "normal",
          },
          {
            name: "MonaSansBold",
            data: fontDataBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  }
}
