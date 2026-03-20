import React, { useEffect, useState } from 'react'
import { useChat } from '../hooks/useChat'
import { useSelector } from 'react-redux';
import ChatSidebar from '../components/ChatSidebar';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';


const Dashboard = () => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  // console.log(chats);

  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const messages = useSelector(
    (state) => state.chat.chats[currentChatId]?.messages || []
  )
  // console.log("REDUX CHAT ID:", currentChatId)

  const isLoading = useSelector((state) => state.chat.isLoading)

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();

  }, []);

  const handleSubmitChat = (e) => {
    e.preventDefault();

    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) return


    chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId
    })
    setChatInput('')

  }

  const selectChat = (currentChatId) => {
    console.log("CLICKED:", currentChatId)

    chat.handleOpenChat(currentChatId, chats)
  }

  const startNewChat = () => {
    // Clear current chat and reset input
    setChatInput('')
    // handleOpenChat will be called with null or you can dispatch setCurrentChat(null)
    chat.handleOpenNewChat()
  }

  return (
    <div className="h-screen w-full flex bg-gray-900 text-white">
      {/* Left Sidebar - Chats */}
      <ChatSidebar
        onSelectChat={(currentChatId) => {
          selectChat(currentChatId)
          // console.log(currentChatId);

        }}
        onNewChat={startNewChat}
        currentChatId={currentChatId}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages Section */}
        <MessageList chatId={currentChatId} messages={messages} />

        {/* Input Section */}
        <MessageInput
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onSubmit={handleSubmitChat}
          isLoading={isLoading}
          isDisabled={false}
        />
      </div>
    </div>
  )
}

export default Dashboard
