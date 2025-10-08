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
    <div className="relative my-4 rounded-xl overflow-hidden border border-gray-800/50 bg-gray-900/60 backdrop-blur-sm shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800/60 border-b border-gray-700/50">
        <span className="text-xs text-gray-400 font-mono uppercase tracking-wide">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-300 hover:text-white bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-sm text-gray-100 font-mono leading-relaxed">
          <code className="block">{code}</code>
        </pre>
      </div>
    </div>
  );
}
