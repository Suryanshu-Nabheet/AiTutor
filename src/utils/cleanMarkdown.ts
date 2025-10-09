/**
 * Comprehensive markdown cleaning utility
 * Removes ALL markdown symbols and formatting
 */

export function cleanMarkdown(text: string): string {
  if (!text) return text;

  let cleaned = text;

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

  // Remove inline code
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

  // Remove any remaining special characters
  cleaned = cleaned.replace(/[#*`\\|]/g, '');

  // Clean up extra spaces and newlines
  cleaned = cleaned
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s+|\s+$/gm, '')
    .trim();

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
