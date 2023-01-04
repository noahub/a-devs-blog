import { remark } from "remark";
import html from "remark-html";

import type { Root } from "mdast";
import { visit } from "unist-util-visit";

const copyButtonPlugin = () => (mdast: Root) => {
  visit(mdast, "element", (node: any) => {
    if (node.tagName === "pre") {
      const buttonChild = {
        type: "element",
        tagName: "button",
        data: {
          hName: "element",
          hProperties: { className: "copy-code-button" },
          hChildren: [],
        },
        properties: { className: "copy-code-button" },
        children: [],
      };
      node.children = [...node.children, buttonChild];
    }
  });
};

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(require("remark-prism"), {
      plugins: [
        "autolinker",
        "command-line",
        "data-uri-highlight",
        "diff-highlight",
        "inline-color",
        "keep-markup",
        "line-numbers",
        "show-invisibles",
        "treeview",
      ],
    })
    .use(copyButtonPlugin)
    .use(html, { sanitize: false })

    .process(markdown);
  return result.toString();
}
