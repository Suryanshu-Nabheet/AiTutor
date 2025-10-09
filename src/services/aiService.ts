// Performance optimizations for millions of users
// const API_TIMEOUT = 30000; // 30 seconds timeout
// const MAX_RETRIES = 3;
// const RETRY_DELAY = 1000; // 1 second

// Rate limiting and caching
// const requestCache = new Map<string, { response: any; timestamp: number }>();
// const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Request queue for rate limiting
// const requestQueue: Array<() => Promise<any>> = [];
// let isProcessingQueue = false;

// Import markdown cleaning utility
import { cleanMarkdown } from '../utils/cleanMarkdown';

// const processQueue = async () => {
//   if (isProcessingQueue || requestQueue.length === 0) return;
//   
//   isProcessingQueue = true;
//   while (requestQueue.length > 0) {
//     const request = requestQueue.shift();
//     if (request) {
//       try {
//         await request();
//       } catch (error) {
//         console.error('Queue processing error:', error);
//       }
//     }
//     // Small delay between requests to prevent overwhelming the API
//     await new Promise(resolve => setTimeout(resolve, 100));
//   }
//   isProcessingQueue = false;
// };

const API_URL = import.meta.env.VITE_OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'qwen/qwen3-coder:free';
const APP_NAME = import.meta.env.VITE_APP_NAME || 'AiTutor';
const APP_URL = import.meta.env.VITE_APP_URL || 'https://aitutor.app';

const CODING_KEYWORDS = [
  'code', 'function', 'class', 'variable', 'javascript', 'typescript', 'python', 'java',
  'html', 'css', 'react', 'component', 'api', 'debug', 'error', 'syntax', 'algorithm',
  'array', 'object', 'loop', 'if', 'else', 'return', 'import', 'export', 'const', 'let',
  'var', 'async', 'await', 'promise', 'callback', 'method', 'property', 'constructor',
  'interface', 'type', 'enum', 'generic', 'compile', 'runtime', 'bug', 'fix', 'refactor',
  'optimize', 'program', 'script', 'library', 'framework', 'package', 'module', 'npm',
  'git', 'github', 'repository', 'commit', 'branch', 'merge', 'pull request', 'database',
  'sql', 'query', 'backend', 'frontend', 'fullstack', 'web', 'app', 'application', 'write',
  'build', 'create', 'develop', 'implement', 'programming', 'coding', 'software', 'dev',
  'node', 'express', 'angular', 'vue', 'django', 'flask', 'spring', 'php', 'ruby', 'go',
  'rust', 'c++', 'c#', 'swift', 'kotlin', 'android', 'ios', 'mobile', 'docker', 'kubernetes'
];

// const ACADEMIC_KEYWORDS = [
//   'math', 'mathematics', 'algebra', 'geometry', 'calculus', 'statistics', 'physics',
//   'chemistry', 'biology', 'science', 'history', 'literature', 'philosophy', 'psychology',
//   'sociology', 'economics', 'politics', 'geography', 'art', 'music', 'language',
//   'grammar', 'writing', 'essay', 'research', 'study', 'learn', 'education', 'school',
//   'university', 'college', 'course', 'lesson', 'tutorial', 'explain', 'understand',
//   'concept', 'theory', 'principle', 'formula', 'equation', 'problem', 'solution',
//   'analysis', 'interpretation', 'definition', 'meaning', 'significance', 'importance',
//   'what is', 'what does', 'what means', 'define', 'definition', 'explain', 'meaning',
//   'render', 'rendering', 'display', 'show', 'visual', 'representation', 'produce',
//   'academic', 'educational', 'learning', 'teaching', 'instruct', 'guide', 'help',
//   'how does', 'how to', 'why', 'when', 'where', 'who', 'which', 'difference between'
// ];

function isCodingQuestion(question: string): boolean {
  const lowerQuestion = question.toLowerCase();

  const codingPatterns = [
    /\bcode\b/,
    /\bfunction\b/,
    /\bclass\b/,
    /\bmethod\b/,
    /\balgorithm\b/,
    /\bprogram\b/,
    /\bdebug\b/,
    /\berror\b.*\bcode\b/,
    /\bhow to (write|create|build|implement)/,
    /\b(javascript|python|java|typescript|html|css|react|vue|angular)\b/,
    /\b(npm|git|github|docker|api)\b/,
  ];

  if (codingPatterns.some(pattern => pattern.test(lowerQuestion))) {
    return true;
  }

  return CODING_KEYWORDS.some(keyword => lowerQuestion.includes(keyword));
}

// function isAcademicQuestion(question: string): boolean {
//   const lowerQuestion = question.toLowerCase();

//   // Check for academic keywords
//   const hasAcademicKeywords = ACADEMIC_KEYWORDS.some(keyword => lowerQuestion.includes(keyword));
  
//   // Check for question patterns that indicate academic queries
//   const academicPatterns = [
//     /^what (is|does|means?|are)/,
//     /^define/,
//     /^explain/,
//     /^how does/,
//     /^why/,
//     /^when/,
//     /^where/,
//     /^who/,
//     /^which/,
//     /difference between/,
//     /meaning of/,
//     /definition of/,
//     /^render/,
//     /^rendering/
//   ];
  
//   const hasAcademicPatterns = academicPatterns.some(pattern => pattern.test(lowerQuestion));
  
//   return hasAcademicKeywords || hasAcademicPatterns;
// }

export function getModelInfo(question: string): { model: string; type: 'coding' | 'academic' } {
  const isCoding = isCodingQuestion(question);
  
  // Default to coding if it's clearly coding, otherwise academic
  const questionType = isCoding ? 'coding' : 'academic';
  
  return {
    model: 'AiTutor',
    type: questionType
  };
}

export async function getAIResponse(
  _question: string,
  conversationHistory: Array<{ role: string; content: string }>
): Promise<string> {
  if (!API_KEY) {
    throw new Error('OpenRouter API key is not configured. Please check your environment variables.');
  }

  // Create a unified system prompt that handles both coding and academic questions
  const systemPrompt = `You are AiTutor, a professional AI coding tutor and academic assistant. You provide expert-level guidance with clean, production-ready code examples and well-structured responses.

ABSOLUTE FORMATTING RULES - FOLLOW STRICTLY:
- NEVER use **bold** text - use normal text only
- NEVER use *italics* - use normal text only
- NEVER use \`code\` backticks - use normal text only
- NEVER use # headers - use normal text only
- NEVER use --- separators - use normal text only
- NEVER use === separators - use normal text only
- NEVER use || separators - use normal text only
- NEVER use \\ backslashes - use normal text only
- NEVER use complex formatting - use simple text only
- NEVER use tables or complex structures - use simple text only
- ONLY use simple bullet points (-) and numbered lists (1.)
- Keep responses clean, simple, and conversational
- Focus on clear, readable explanations in plain text

EXAMPLE OF WHAT NOT TO DO:
**Intro**  
Photosynthesis is the process...
**Key points**
1. *Light‑dependent reactions*  
   - Sunlight is captured...

EXAMPLE OF CORRECT FORMAT:
Photosynthesis is the process by which green plants convert light energy into chemical energy.

Key points:
1. Light-dependent reactions
   - Sunlight is captured by chlorophyll
   - Energy produces ATP and NADPH

2. Calvin cycle
   - Uses ATP and NADPH to fix CO₂
   - Occurs in the stroma of chloroplasts

For CODING questions:
- Start with a brief introduction (1-2 sentences)
- IMMEDIATELY provide complete code in a code block
- Follow with simple explanations in plain text
- Include practical tips in plain text
- Structure: Intro → Code → Explanation → Tips

For ACADEMIC questions:
- Provide clear, conversational explanations in plain text
- Use simple bullet points (-) or numbered lists (1.) only
- Avoid any special formatting or symbols
- Focus on practical understanding
- Keep responses clean and readable
- Structure: Intro → Key points → Examples → Summary

Always maintain a professional but conversational tone. Be helpful, clear, and use ONLY plain text formatting. NO special symbols, NO bold, NO italics, NO complex formatting.`;

  try {
    const allMessages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10)
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': APP_URL,
        'X-Title': APP_NAME
      },
      body: JSON.stringify({
        model: MODEL,
        messages: allMessages,
        temperature: 0.7,
        max_tokens: 2500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      
      // Handle specific error cases
      if (response.status === 429) {
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error?.metadata?.raw?.includes('rate-limited')) {
            throw new Error('The free model is temporarily rate-limited. Please try again in a few minutes, or consider upgrading to a paid plan for better availability.');
          }
        } catch {
          // Fallback if JSON parsing fails
        }
        throw new Error('Rate limit exceeded. Please try again in a few minutes.');
      }
      
      throw new Error(`API Error: ${response.status} - ${errorText.substring(0, 100)}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid response format from API');
    }

    let content = data.choices[0].message.content;
    
    // Use dedicated markdown cleaning utility
    content = cleanMarkdown(content);
    
    return content;
  } catch (error) {
    console.error('AI Service Error:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    if (error instanceof Error) {
      if (error.message.includes('API Error: 4')) {
        throw new Error('The AI service is temporarily unavailable. Please try again in a moment.');
      }
      if (error.message.includes('API Error: 5')) {
        throw new Error('Server error. Please try again later.');
      }
      if (error.message.includes('API key')) {
        throw new Error('API key is invalid or expired. Please check your configuration.');
      }
      throw new Error(error.message);
    }
    throw new Error('Something went wrong. Please try again.');
  }
}
