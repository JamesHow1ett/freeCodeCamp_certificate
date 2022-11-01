import { marked } from "marked";
import DOMPurify from "dompurify";

marked.options({
  breaks: true,
});

export const parserMarkdownText = (markdown) => DOMPurify.sanitize(marked.parse(markdown));
