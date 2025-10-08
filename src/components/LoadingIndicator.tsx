export function LoadingIndicator() {
  return (
    <div className="flex gap-3 sm:gap-4 animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-effect border-blue-500/20 shadow-lg shadow-blue-500/20 bg-blue-600/20 flex items-center justify-center animate-pulse">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div className="flex-1 max-w-3xl">
        <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl glass-effect text-gray-100 border-blue-500/10 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-lg shadow-blue-400/50" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-lg shadow-blue-400/50" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-lg shadow-blue-400/50" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-blue-400 font-medium animate-pulse">Processing your request...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
