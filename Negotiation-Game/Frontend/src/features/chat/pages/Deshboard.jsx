import React from 'react'
import { useChat } from '../hooks/useChat'
import { useSelector } from 'react-redux'
import NoChats from '../components/NoChats'
import ChatSection from '../components/ChatSection'
import { Star, Swords } from 'lucide-react'
import ElectricBorder from '../components/ElectricBorder/ElectricBorder'

const Deshboard = () => {
  const { currentChatId } = useSelector(state => state.chat)
  const { chats } = useSelector(state => state.chat)
  const messages = useSelector(state => state.chat.chats[currentChatId]?.messages) || []
  const chat = useChat()
  const currentProduct = useSelector(state => state.product.currentProduct)
  return (
    <div className='h-screen w-screen overflow-hidden flex flex-col md:flex-row gap-4 bg-linear-90 from-mist-950 to-mist-800 p-5'>

      <ElectricBorder
        className={"w-full md:w-2/7 h-full flex rounded-2xl border border-gray-700 backdrop-blur-2xl"}
        color="#7df9ff"
        speed={1}
        chaos={0.12}
        thickness={2}
        style={{ borderRadius: 16 }}
      >

        <div className="productDetails w-full  h-full rounded-2xl border border-gray-700 backdrop-blur-2xl bg-white/10 flex flex-col">
          <div className="productImage h-2/5 w-full overflow-hidden">
            <img className='h-full w-full hover:scale-105 hover:rotate-3 transition-all transition-200 object-cover' src={currentProduct.image} alt="" />
          </div>
          <div className="productInfo  w-full flex flex-col p-4">
            <h2 className='text-2xl font-bold text-amber-500'>{currentProduct.name}</h2>
            <p className='text-white flex flex-col'><span className='text-xl font-bold'>About :</span> {currentProduct.description}</p>
          </div>
          <div className="priceAndRatings p-4 ">
            <p className='text-white '><span className='font-bold'>Price : $ </span>{currentProduct.maxSellingPrice} /-</p>
            <p className='text-white flex items-center gap-1'><span className='font-bold '>Ratings : </span>{[...Array(5)].map((_, i) => (
              <Star className='text-emerald-500' key={i} size={20} />
            ))}</p>
            <p className='text-white flex items-center gap-1'><span className='font-bold '>GAMEPLAY : </span>{[...Array(5)].map((_, i) => (
              <Swords className='text-amber-600' key={i} size={20} />
            ))}</p>

          </div>
        </div>

      </ElectricBorder>
      <div className="chatDeshboard relative bg-cover bg-[url(https://i.pinimg.com/736x/0f/f4/9c/0ff49c99f465a009a3be35ce286e610e.jpg)] overflow-y-scroll flex flex-col p-4 w-full md:w-5/7 h-full rounded-2xl border border-gray-700 backdrop-blur-2xl bg-white/10">

        {/* Messages */}
        <div className="flex-1 overflow-y-scroll h-full w-full px-10 md:px-30 lg:px-40 ">
          {
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <p className={` backdrop-blur-2xl ${msg.role === 'user' ? 'bg-black/30 text-white' : 'bg-gray-800/70 text-white'} px-3 py-2 rounded-xl max-w-[70%]`}>
                  {msg.content}
                </p>
              </div>
            ))
          }
        </div>

        {/* Input */}
        <ChatSection />

      </div>
    </div>
  )
}

export default Deshboard
