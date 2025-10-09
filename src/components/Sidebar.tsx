import { Plus, MessageSquare, Trash2, X, Menu, Search, MessageCircle, Edit2, Check, X as XIcon } from 'lucide-react';
import { Conversation } from '../types';
import { useState } from 'react';

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
}

export function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onRenameConversation
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleRename = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveRename = () => {
    if (editingId && editTitle.trim()) {
      onRenameConversation(editingId, editTitle.trim());
      setEditingId(null);
      setEditTitle('');
    }
  };

  const handleCancelRename = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const SidebarContent = () => (
    <>
      {/* Integrated Header: Premium branding - bigger logo (MessageCircle matching WelcomeScreen), full-width name, no subtitle */}
      <div className="p-4 sm:p-5 border-b border-gray-800/50 bg-black/40 backdrop-blur-xl">  {/* Slightly more padding for premium space */}
        <div className="flex items-center gap-3">
          {/* Logo: Matches WelcomeScreen - MessageCircle in blue-tinted rounded box */}
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500/10 rounded-2xl flex-shrink-0">  {/* Matches Welcome: bg-blue-500/10, rounded-2xl; size scaled for sidebar */}
            <MessageCircle className="w-8 h-8 text-blue-400" />  {/* Icon matches Welcome: w-8 h-8 scaled from w-10 h-10 */}
          </div>
          {/* Name: Full space, larger/bolder for branding */}
          <div className="flex-1 min-w-0">  {/* flex-1 ensures it takes all available space */}
            <h1 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400 w-full">AiTutor</h1>  {/* Larger size, gradient text for premium branding; w-full to fill container */}
          </div>
        </div>
      </div>

      {/* Search Bar: Unchanged */}
      <div className="p-3 sm:p-4 border-b border-gray-800/50 bg-black/20 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-10 py-2.5 bg-black/50 border border-gray-700/50 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* New Chat Button: Unchanged */}
      <div className="p-3 sm:p-4 border-b border-gray-800/50">
        <button
          onClick={() => {
            onNewConversation();
            setIsMobileOpen(false);
            clearSearch();
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl transition-all duration-300 font-medium shadow-md shadow-blue-600/20 hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99] touch-manipulation text-sm"
        >
          <Plus size={18} strokeWidth={2} />
          <span className="text-sm">New Chat</span>
        </button>
      </div>

      {/* History List: Unchanged */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 custom-scrollbar">
        {filteredConversations.length === 0 ? (
          <div className="text-gray-500 text-xs sm:text-sm text-center py-12 px-4">
            <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">{searchTerm ? 'No matching conversations' : 'No conversations yet'}</p>
            <p className="text-xs mt-1 opacity-60">{searchTerm ? 'Try a different search' : 'Start a new chat to begin'}</p>
          </div>
        ) : (
          filteredConversations.map(conv => (
            <div
              key={conv.id}
              className={`group relative flex items-center gap-3 p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                currentConversationId === conv.id
                  ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/10 border border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : 'bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-gray-700/50'
              }`}
              onClick={() => {
                onSelectConversation(conv.id);
                setIsMobileOpen(false);
              }}
            >
              <div className={`flex-shrink-0 p-2 rounded-lg transition-colors duration-200 ${
                currentConversationId === conv.id
                  ? 'bg-blue-500/20'
                  : 'bg-gray-800/50 group-hover:bg-gray-800'
              }`}>
                <MessageSquare size={16} className={`transition-colors duration-200 ${
                  currentConversationId === conv.id
                    ? 'text-blue-400'
                    : 'text-gray-400 group-hover:text-gray-300'
                }`} />
              </div>
              {editingId === conv.id ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveRename();
                      if (e.key === 'Escape') handleCancelRename();
                    }}
                    className="flex-1 text-xs sm:text-sm text-gray-200 bg-gray-800/50 border border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveRename();
                    }}
                    className="p-1 hover:bg-green-500/20 rounded transition-colors"
                  >
                    <Check size={12} className="text-green-400" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelRename();
                    }}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <XIcon size={12} className="text-red-400" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex-1 text-xs sm:text-sm text-gray-200 truncate font-medium">
                    {conv.title}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRename(conv.id, conv.title);
                      }}
                      className="p-1.5 hover:bg-blue-500/20 rounded-lg transition-all duration-200 flex-shrink-0 touch-manipulation hover:scale-110 active:scale-95"
                      aria-label="Rename conversation"
                    >
                      <Edit2 size={14} className="text-blue-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conv.id);
                      }}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg transition-all duration-200 flex-shrink-0 touch-manipulation hover:scale-110 active:scale-95"
                      aria-label="Delete conversation"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Bottom Version Info: Added builder credit below version */}
      <div className="p-4 border-t border-gray-800/50 backdrop-blur-xl">
        <div className="text-center space-y-2">  {/* Added space-y-2 for subtle vertical rhythm */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400 font-medium">AiTutor v1.0</span>
          </div>
          {/* Builder Credit: Subtle, centered below version */}
          <p className="text-xs text-gray-500">Built by Suryanshu Nabheet</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-3 xs:top-4 left-3 xs:left-4 z-50 p-3 sm:p-3.5 bg-black/80 backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl hover:bg-gray-900 transition-all duration-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Open menu"
      >
        <Menu size={20} className="text-gray-300" />
      </button>

      <div className="hidden lg:flex lg:w-64 xl:w-72 2xl:w-80 bg-black/40 backdrop-blur-xl border-r border-gray-800/50 flex-col h-full">
        <SidebarContent />
      </div>

      {isMobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => {
              setIsMobileOpen(false);
              clearSearch();
            }}
          />
          <div className="lg:hidden fixed inset-y-0 left-0 w-[85vw] xs:w-[80vw] sm:w-[75vw] max-w-xs sm:max-w-sm md:max-w-md bg-black/95 backdrop-blur-2xl border-r border-gray-800 z-50 flex flex-col animate-slide-in shadow-2xl">
            {/* Mobile Header: Larger, bold for premium branding */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400">AiTutor</h2>  {/* Larger gradient text, no subtitle */}
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  clearSearch();
                }}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}
