/**
 * Extracts plain text from Markdown string.
 * @param {string} markdownText - The Markdown string.
 * @returns {string} The plain text content.
 */
function getPlainTextFromMarkdown(markdownText) {
  if (typeof markdownText !== 'string') {
    return '';
  }
  // Simple regex to remove common Markdown syntax (headers, bold, italics, links)
  let plainText = markdownText
    .replace(/#+\s/g, '') // Remove headers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italics
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1'); // Remove links (keep link text)
  return plainText;
}

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    console.log("🚀 ~ beforeCreate ~ data:", data)

    if (data.Content) {
      const plainText = getPlainTextFromMarkdown(data.Content); // Pass the markdown string
      const excerpt = plainText.slice(0, 150);
      console.log("🚀 ~ beforeCreate ~ excerpt:", excerpt);

      if (plainText.length > 150) {
        data.excerpt = excerpt + '...';
      } else {
        data.excerpt = excerpt;
      }
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.Content) {
      const plainText = getPlainTextFromMarkdown(data.Content);
      const excerpt = plainText.slice(0, 150);
      console.log("🚀 ~ beforeUpdate ~ excerpt:", excerpt);
      if (plainText.length > 150) {
        data.excerpt = excerpt + '...';
      } else {
        data.excerpt = excerpt;
      }
    }
  },
};