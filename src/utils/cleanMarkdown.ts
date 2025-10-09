/**
 * Comprehensive markdown cleaning utility
 * Removes ALL markdown symbols and formatting
 */

export function cleanMarkdown(text: string): string {
  if (!text) return text;

  let cleaned = text;

  // First, protect code blocks from cleaning
  const codeBlockRegex = /```[\s\S]*?```/g;
  const codeBlocks: string[] = [];
  let match;
  let index = 0;
  
  // Extract and protect code blocks
  while ((match = codeBlockRegex.exec(text)) !== null) {
    codeBlocks.push(match[0]);
    cleaned = cleaned.replace(match[0], `__CODE_BLOCK_${index}__`);
    index++;
  }

  // Remove bold text (multiple patterns)
  cleaned = cleaned
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1');

  // Remove italics (multiple patterns)
  cleaned = cleaned
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1');

  // Remove inline code (but not code blocks)
  cleaned = cleaned
    .replace(/`(.*?)`/g, '$1')
    .replace(/`(.*?)`/g, '$1');

  // Remove headers
  cleaned = cleaned
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^#{1,6}\s*/gm, '');

  // Remove horizontal rules
  cleaned = cleaned
    .replace(/^---+\s*$/gm, '')
    .replace(/^===+\s*$/gm, '')
    .replace(/^___+\s*$/gm, '');

  // Remove other symbols
  cleaned = cleaned
    .replace(/\|\|/g, '')
    .replace(/\\/g, '')
    .replace(/\*\s*/g, '- ')
    .replace(/\*\s*/g, '- ');

  // Remove any remaining special characters (but not backticks in code blocks)
  cleaned = cleaned.replace(/[#*\\|]/g, '');

  // Clean up extra spaces and newlines
  cleaned = cleaned
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s+|\s+$/gm, '')
    .trim();

  // Restore code blocks
  codeBlocks.forEach((codeBlock, i) => {
    cleaned = cleaned.replace(`__CODE_BLOCK_${i}__`, codeBlock);
  });

  return cleaned;
}

/**
 * Test function to verify markdown cleaning
 */
export function testMarkdownCleaning() {
  const testInput = `**Intro**  
Photosynthesis is the process...
**Key points**
1. *Light‑dependent reactions*  
   - Sunlight is captured...`;

  const cleaned = cleanMarkdown(testInput);
  console.log('Original:', testInput);
  console.log('Cleaned:', cleaned);
  
  return cleaned;
}
