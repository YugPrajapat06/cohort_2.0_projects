import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const MessageList = ({ chatId}) => {
  // console.log(chatId);

  // const chats = useSelector((state) => state.chat.chats)
  const isLoading = useSelector((state) => state.chat.isLoading)
  const messagesEndRef = useRef(null)
  const messages = useSelector(
    (state) => state.chat.chats[chatId]?.messages || []
  )

  // const messages = chatId && chats[chatId] ? chats[chatId].messages : []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
    console.log("Trial message to find bug");

  }, [messages])

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-gray-500 text-lg mb-4">
            <span className="text-4xl mb-4">💬</span>
          </div>
          <p className="text-gray-400">Select a chat or create a new one to start</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-gray-900 min-w-3/5 m-auto p-6 flex flex-col">
      {(messages || []).length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : ' text-gray-100 rounded-bl-none'
                  }`}
              >
                {
                  message.role === "user"? (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  ) : (
                    <ReactMarkdown
                      components={{
                      p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                      ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                      ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                      code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5'>{children}</code>,
                      pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/30 p-3'>{children}</pre>
                    }}
                    remarkPlugins={remarkGfm}
                    >{message.content}</ReactMarkdown>
                  )
                }
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-100 px-4 py-3 rounded-lg rounded-bl-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
