import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

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
        
        {/* Enhanced code content area */}
        <div className="relative bg-gray-950/95 max-w-full overflow-hidden">
          <div className="p-5 overflow-x-auto code-container max-w-full">
            <pre className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre-wrap break-words">
              <code className="block text-gray-200">{code}</code>
            </pre>
          </div>
          
          {/* Subtle gradient overlay for long code blocks */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-950/95 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
