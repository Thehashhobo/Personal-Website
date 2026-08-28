import React from "react";

/**
 * Renders the **bold** runs used in résumé bullets, mirroring the emphasis in
 * the source PDF. Deliberately minimal — this is not a markdown renderer, it
 * only understands paired double asterisks.
 */
export const RichText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    )}
  </>
);

export default RichText;
