export interface ParsedContent {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

export function parseMarkdown(text: string): ParsedContent[] {
  const parts: ParsedContent[] = [];
  
  // Enhanced regex to capture code blocks with optional language
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    // Add text content before the code block
    if (match.index > lastIndex) {
      const textContent = text.substring(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }

    // Add the code block
    const language = match[1] || 'text';
    const codeContent = match[2].trim();
    
    if (codeContent) {
      parts.push({
        type: 'code',
        content: codeContent,
        language: language
      });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text content
  if (lastIndex < text.length) {
    const textContent = text.substring(lastIndex).trim();
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  // If no code blocks found, return the entire text as text content
  return parts.length > 0 ? parts : [{ type: 'text', content: text }];
}
