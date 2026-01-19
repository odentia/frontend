import React from "react";
import ReactMarkdown from "react-markdown";
import type { TextBlock as TextBlockProps } from "../../models/types";
import { blockStylesToCSS } from "../../models/registr";
import { isValidUrl } from "../create/utils";

export const TextBlock = ({ block }: { block: TextBlockProps }) => {
  return (
    <div style={blockStylesToCSS(block.styles)}>
      <ReactMarkdown
        skipHtml
        urlTransform={(url) => (isValidUrl(url) ? url : "#")}
        components={{
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target={href && href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {block.markdown ?? ""}
      </ReactMarkdown>
    </div>
  );
};
