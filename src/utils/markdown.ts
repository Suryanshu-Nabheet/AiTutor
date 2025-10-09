export interface ParsedContent {
  type: 'text' | 'code' | 'structure' | 'chart';
  content: string;
  language?: string;
}

export function parseMarkdown(text: string): ParsedContent[] {
  const parts: ParsedContent[] = [];
  
  // Enhanced regex to capture code blocks with optional language
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  
  // Regex to detect structured content (ASCII art, charts, diagrams)
  // const structureRegex = /^[\s\S]*?(?:\n\s*[│┌┐└┘├┤┬┴┼─═║╔╗╚╝╠╣╦╩╬\*\+\-\|\s]+\n[\s\S]*?)+$/gm;
  
  let lastIndex = 0;
  let match;

  // First, handle code blocks
  while ((match = codeBlockRegex.exec(text)) !== null) {
    // Add text content before the code block
    if (match.index > lastIndex) {
      const textContent = text.substring(lastIndex, match.index).trim();
      if (textContent) {
        // Check if this text content contains structured elements
        const structuredContent = parseStructuredContent(textContent);
        parts.push(...structuredContent);
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
      const structuredContent = parseStructuredContent(textContent);
      parts.push(...structuredContent);
    }
  }

  // If no code blocks found, parse the entire text for structured content
  if (parts.length === 0) {
    const structuredContent = parseStructuredContent(text);
    return structuredContent.length > 0 ? structuredContent : [{ type: 'text', content: text }];
  }

  return parts;
}

function parseStructuredContent(text: string): ParsedContent[] {
  const parts: ParsedContent[] = [];
  
  // Split by double newlines to separate sections
  const sections = text.split(/\n\s*\n/);
  
  for (const section of sections) {
    const trimmedSection = section.trim();
    if (!trimmedSection) continue;
    
    // Check if this section contains structured elements
    if (isStructuredContent(trimmedSection)) {
      parts.push({
        type: 'structure',
        content: trimmedSection
      });
    } else {
      parts.push({
        type: 'text',
        content: trimmedSection
      });
    }
  }
  
  return parts;
}

function isStructuredContent(text: string): boolean {
  // Check for ASCII art patterns
  const asciiPatterns = [
    /[│┌┐└┘├┤┬┴┼─═║╔╗╚╝╠╣╦╩╬]/,
    /^\s*[*+\-|\s]+\s*$/m,
    /^\s*[┌─┐└─┘│\s]+\s*$/m,
    /^\s*[╔═╗╚═╝║\s]+\s*$/m
  ];
  
  // Check for chart-like patterns
  const chartPatterns = [
    /^\s*[\w\s]+\s*\|\s*[\w\s]+$/m,
    /^\s*[\w\s]+\s*:\s*[\w\s]+$/m,
    /^\s*[\w\s]+\s*→\s*[\w\s]+$/m
  ];
  
  // Check for structured lists with consistent formatting
  const listPatterns = [
    /^\s*\d+\.\s+.+$/m,
    /^\s*[-*]\s+.+$/m,
    /^\s*[a-zA-Z]\.\s+.+$/m
  ];
  
  return asciiPatterns.some(pattern => pattern.test(text)) ||
         chartPatterns.some(pattern => pattern.test(text)) ||
         listPatterns.some(pattern => pattern.test(text));
}
