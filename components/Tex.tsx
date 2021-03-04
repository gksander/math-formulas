import * as React from "react";
import katex from "katex";

type TexProps = {
  expr: string;
  isBlock?: boolean;
};

export const Tex: React.FC<TexProps> = React.memo(
  ({ expr, isBlock = false }) => {
    const innerHtml = (() => {
      try {
        return katex.renderToString(expr, {
          displayMode: isBlock,
        });
      } catch {
        return katex.renderToString("...", { displayMode: isBlock });
      }
    })();

    if (isBlock) {
      return <div dangerouslySetInnerHTML={{ __html: innerHtml }} />;
    }

    return <span dangerouslySetInnerHTML={{ __html: innerHtml }} />;
  },
);
