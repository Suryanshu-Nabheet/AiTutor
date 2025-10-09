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
    <div className="relative my-4 w-full max-w-full overflow-hidden">
      {/* Enhanced dark glass container */}
      <div className="relative rounded-xl overflow-hidden bg-gray-950/95 backdrop-blur-xl border border-gray-800/60 shadow-2xl">
        {/* Professional header with language and copy button */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-gray-700/40 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
            <span className="ml-3 text-xs text-gray-300 font-mono uppercase tracking-wide font-semibold">{language}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation backdrop-blur-sm border border-gray-600/40 hover:border-gray-500/60"
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
        
        {/* Code content with enhanced dark styling */}
        <div className="relative bg-gray-950/90">
          <div className="p-4 overflow-x-auto code-container">
            <pre className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
              <code className="block text-gray-200">{code}</code>
            </pre>
          </div>
          
          {/* Subtle gradient overlay for long code blocks */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-950/90 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
