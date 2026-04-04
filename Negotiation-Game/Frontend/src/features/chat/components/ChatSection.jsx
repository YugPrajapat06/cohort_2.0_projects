import { Send } from 'lucide-react'
import React, { useState } from 'react'
import { useChat } from '../hooks/useChat'
import { useSelector } from 'react-redux'

const ChatSection = () => {
  const [message, setMessage] = useState('')

  const currentProduct = useSelector(state => state.product.currentProduct)

  const { handleSendMessage } = useChat()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSendMessage({ message: message, productId: currentProduct._id })
    setMessage('')
  }

  return (
    
      <div className="w-[90%] flex justify-center items-center mt-2 sticky bottom-0 text-white">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full items-center">

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 rounded-2xl bg-gray-900 text-white outline-none resize-none"
            rows={3}
            placeholder="Start Conversation..."
          />

          <button className="p-3 h-fit bg-gray-900 rounded-full">
            <Send />
          </button>

        </form>
      </div>
    
  )
}

export default ChatSection
