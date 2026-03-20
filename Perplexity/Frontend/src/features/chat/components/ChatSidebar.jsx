import React from 'react'
import { useSelector } from 'react-redux'

const ChatSidebar = ({ onSelectChat, onNewChat, currentChatId }) => {
  const chats = useSelector((state) => state.chat.chats)
  const chatArray = Object.values(chats)

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={onNewChat}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span>
          <span>New Chat</span>
        </button>
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto">
        {chatArray.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No chats yet. Create a new chat to start.
          </div>
        ) : (
          <div className="p-2">
            {chatArray.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(
                   chat.id
                  // console.log(chat.id)
                  
                )}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all duration-200 truncate ${
                  currentChatId === chat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                title={chat.title}
              >
                <div className="truncate font-medium">{chat.title || 'Untitled'}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(chat.lastUpdated).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-600 text-center">
          Perplexity Chat
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar
