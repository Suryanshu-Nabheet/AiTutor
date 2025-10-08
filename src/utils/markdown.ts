export interface ParsedContent {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

export function parseMarkdown(text: string): ParsedContent[] {
  const parts: ParsedContent[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textContent = text.substring(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }

    parts.push({
      type: 'code',
      content: match[2].trim(),
      language: match[1] || 'text'
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    const textContent = text.substring(lastIndex).trim();
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: text }];
}
