/**
 * Parses Strapi v5 rich text array into a flat array for HeroText and similar components.
 * Highlights text with .code === true using { span: true }.
 * @param {Array} textArray - Strapi rich text array
 * @returns {Array} - Array of { text, span?, br? }
 */
export function parseStrapiRichText(textArray) {
  if (!Array.isArray(textArray)) return [];
  const parts = [];
  textArray.forEach((paragraph) => {
    if (Array.isArray(paragraph.children)) {
      paragraph.children.forEach((child) => {
        if (child.code) {
          parts.push({ span: true, text: child.text });
        } else {
          parts.push({ text: child.text });
        }
      });
    }
    // Add a <br> after each paragraph except the last
    parts.push({ br: true });
  });
  // Remove the last <br>
  if (parts.length && parts[parts.length - 1].br) parts.pop();
  return parts;
} 