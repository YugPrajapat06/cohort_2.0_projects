import React from 'react'

const MessageInput = ({ value, onChange, onSubmit, isLoading, isDisabled }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e)
    }
  }

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading || isDisabled}
          placeholder="Type your message... (Shift+Enter for new line)"
          className="flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-3 border border-gray-700 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={isLoading || isDisabled || !value.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Sending...
            </>
          ) : (
            <>
              <span>Send</span>
              <span>→</span>
            </>
          )}
        </button>
      </form>
      <div className="text-xs text-gray-500 mt-2">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  )
}

export default MessageInput
