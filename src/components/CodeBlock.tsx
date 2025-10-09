import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Simple syntax highlighting function
function highlightCode(code: string, language: string): string {
  if (language === 'html') {
    return code
      .replace(/&lt;!DOCTYPE\s+html&gt;/gi, '<span class="text-blue-400 font-bold">&lt;!DOCTYPE html&gt;</span>')
      .replace(/&lt;(\/?)(html|head|body|title|meta|link|script|style)&gt;/gi, '<span class="text-blue-300">&lt;$1$2&gt;</span>')
      .replace(/&lt;(\/?)(h[1-6]|p|div|span|a|img|ul|ol|li|table|tr|td|th|form|input|button|textarea|select|option)&gt;/gi, '<span class="text-green-300">&lt;$1$2&gt;</span>')
      .replace(/&lt;(\/?)(style|script)&gt;/gi, '<span class="text-purple-300">&lt;$1$2&gt;</span>')
      .replace(/(\w+)=/g, '<span class="text-yellow-300">$1</span>=')
      .replace(/"([^"]*)"/g, '<span class="text-orange-300">"$1"</span>')
      .replace(/'([^']*)'/g, '<span class="text-orange-300">\'$1\'</span>');
  }
  
  if (language === 'css') {
    return code
      .replace(/([.#]?[\w-]+)\s*\{/g, '<span class="text-blue-300">$1</span> {')
      .replace(/(\w+):/g, '<span class="text-green-300">$1</span>:')
      .replace(/(#[0-9a-fA-F]{3,6}|rgb\([^)]+\)|rgba\([^)]+\))/g, '<span class="text-pink-300">$1</span>')
      .replace(/(\d+(?:px|em|rem|%|vh|vw)?)/g, '<span class="text-yellow-300">$1</span>');
  }
  
  if (language === 'javascript' || language === 'js') {
    return code
      .replace(/\b(function|const|let|var|if|else|for|while|return|class|import|export|from|default)\b/g, '<span class="text-blue-400">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-purple-300">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="text-green-300">"$1"</span>')
      .replace(/'([^']*)'/g, '<span class="text-green-300">\'$1\'</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-yellow-300">$1</span>');
  }
  
  return code;
}

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Typing animation effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayedCode('');
    
    let currentIndex = 0;
    const typingSpeed = 15; // Faster typing for code
    
    const interval = setInterval(() => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, typingSpeed);
    
    return () => clearInterval(interval);
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <div className="relative my-6 w-full max-w-full overflow-hidden code-block-wrapper">
      {/* Professional dark glass container with enhanced styling */}
      <div className="relative rounded-xl overflow-hidden bg-gray-950/98 backdrop-blur-xl border border-gray-700/70 shadow-2xl ring-1 ring-gray-800/50">
        {/* Enhanced header with better contrast */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900/90 border-b border-gray-600/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm ring-1 ring-red-400/30"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm ring-1 ring-yellow-400/30"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm ring-1 ring-green-400/30"></div>
            <span className="ml-3 text-xs text-gray-200 font-mono uppercase tracking-wide font-semibold bg-gray-800/50 px-2 py-1 rounded-md">{language}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-200 hover:text-white bg-gray-800/70 hover:bg-gray-700/70 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/70 hover:shadow-lg"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span className="text-green-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy code</span>
              </>
            )}
          </button>
        </div>
        
        {/* Enhanced code content area with syntax highlighting */}
        <div className="relative bg-gray-950/95 max-w-full overflow-hidden">
          <div className="p-5 overflow-x-auto code-container max-w-full">
            <pre className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre-wrap break-words">
              <code 
                className="block text-gray-200"
                dangerouslySetInnerHTML={{ 
                  __html: highlightCode(displayedCode, language) 
                }}
              />
              {isTyping && (
                <span className="inline-block w-1 h-4 bg-blue-400 animate-pulse ml-1"></span>
              )}
            </pre>
          </div>
          
          {/* Subtle gradient overlay for long code blocks */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-950/95 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
