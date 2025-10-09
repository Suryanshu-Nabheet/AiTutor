interface StructuredContentProps {
  content: string;
}

export function StructuredContent({ content }: StructuredContentProps) {
  // Check if content contains ASCII art or structured elements
  const isAsciiArt = /[│┌┐└┘├┤┬┴┼─═║╔╗╚╝╠╣╦╩╬]/.test(content);
  const isChart = /^\s*[\w\s]+\s*[|:→]\s*[\w\s]+$/m.test(content);
  const isStructuredList = /^\s*[\d\w]\.\s+.+$/m.test(content);

  if (isAsciiArt) {
    return (
      <div className="ascii-art max-w-full overflow-hidden">
        <pre className="text-sm text-gray-200 font-mono leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </pre>
      </div>
    );
  }

  if (isChart) {
    return (
      <div className="chart-content max-w-full overflow-hidden">
        <pre className="text-sm text-gray-200 font-mono leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </pre>
      </div>
    );
  }

  if (isStructuredList) {
    return (
      <div className="structured-list max-w-full overflow-hidden">
        <pre className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </pre>
      </div>
    );
  }

  // Default structured content
  return (
    <div className="my-4 p-4 bg-gray-900/40 rounded-lg border border-gray-700/40 max-w-full overflow-hidden">
      <pre className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap break-words">
        {content}
      </pre>
    </div>
  );
}
