const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const ACADEMIC_API_KEY = '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';
const ACADEMIC_MODEL = 'qwen/qwen-2.5-72b-instruct';

const CODING_API_KEY = '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';
const CODING_MODEL = 'qwen/qwen-2.5-coder-32b-instruct';

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

export function getModelInfo(question: string): { model: string; type: 'coding' | 'academic' } {
  const isCoding = isCodingQuestion(question);
  return {
    model: isCoding ? 'Qwen Coder' : 'Tongyi Research',
    type: isCoding ? 'coding' : 'academic'
  };
}

export async function getAIResponse(
  question: string,
  conversationHistory: Array<{ role: string; content: string }>
): Promise<string> {
  const isCoding = isCodingQuestion(question);

  const apiKey = isCoding ? CODING_API_KEY : ACADEMIC_API_KEY;
  const model = isCoding ? CODING_MODEL : ACADEMIC_MODEL;

  const systemPrompt = isCoding
    ? 'You are a helpful AI coding assistant. Provide clear, comprehensive answers with code examples when relevant. Format code blocks using markdown with language identifiers (e.g., ```javascript). Be precise and helpful.'
    : 'You are a helpful AI tutor. Provide clear, comprehensive explanations on academic subjects including math, science, history, literature, and more. Break down complex concepts and use examples when helpful.';

  try {
    const allMessages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10)
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin || 'https://aitutor.app',
        'X-Title': 'AiTutor'
      },
      body: JSON.stringify({
        model: model,
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
      throw new Error(`API Error: ${response.status} - ${errorText.substring(0, 100)}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid response format from API');
    }

    return data.choices[0].message.content;
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
      throw new Error(error.message);
    }
    throw new Error('Something went wrong. Please try again.');
  }
}
