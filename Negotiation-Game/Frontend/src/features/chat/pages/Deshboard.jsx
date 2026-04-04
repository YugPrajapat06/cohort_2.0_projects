import React from 'react'
import { useChat } from '../hooks/useChat'
import { useSelector } from 'react-redux'
import NoChats from '../components/NoChats'
import ChatSection from '../components/ChatSection'
import { Star, Swords } from 'lucide-react'
import ElectricBorder from '../components/ElectricBorder/ElectricBorder'

import seller from "../../../assets/seller.png"
import buyer from "../../../assets/buyer.png"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const Deshboard = () => {
  const { currentChatId } = useSelector(state => state.chat)
  const { chats } = useSelector(state => state.chat)
  const messages = useSelector(state => state.chat.chats[currentChatId]?.messages) || []
  const userCurrentMessage = useSelector(state => state.chat.userCurrentMessage)
  const aiCurrentMessage = useSelector(state => state.chat.aiCurrentMessage)
  const chat = useChat()
  const currentProduct = useSelector(state => state.product.currentProduct)
  return (
    <div className='md:h-screen h-full w-screen overflow-hidden flex flex-col md:flex-row gap-4 bg-linear-90 from-mist-950 to-mist-800 p-5'>

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
          <div className="buttons w-full border-t border-white/30 pt-5 flex justify-evenly">
            <button className='bg-linear-0 from-blue-500 to-blue-900 shadow-black shadow px-4 py-2 border-none cursor-pointer active:scale-95 rounded text-white font-semibold'>Buy</button>
            <button className='bg-linear-0 from-pink-400 to-pink-600 shadow-black shadow px-4 py-2 border-none cursor-pointer active:scale-95 rounded text-white font-semibold'>Cancle</button>
          </div>
        </div>

      </ElectricBorder>
      <div className="chatDeshboard relative bg-cover bg-[url(https://i.pinimg.com/736x/0f/f4/9c/0ff49c99f465a009a3be35ce286e610e.jpg)] overflow-y-scroll flex flex-col w-full md:w-5/7 h-full rounded-2xl border border-gray-700 backdrop-blur-2xl bg-white/10 items-center pb-1">
        <div className='absolute top-0 left-0 px-6  text-white font-semibold py-3 bg-linear-90 from-amber-600 to-red-500  rounded-br-2xl'>
          AI SELLER
        </div>
        {/* Messages */}
        <div className="flex-1 relative overflow-y-scroll h-full w-full px-10 md:px-30 lg:px-40 ">
          <div className='absolute bottom-[10%] right-0 px-6 text-white font-semibold py-3  bg-linear-90 from-red-500 to-amber-600  rounded-bl-2xl rounded-tl-2xl '>
            YOU
          </div>
          {/* {
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
          } */}
          <div className=' h-full w-full flex flex-col justify-center overflow-hidden items-center'>
            <div className='flex justify-start items-center w-full h-1/2'>
              <img className='h-full floating' src={seller} alt="" />
              <div className='h-[80%] w-full px-10 relative  shadow-black shadow-2xl border-black/50 border-2 rounded-2xl backdrop-blur-2xl text-black'>
                {/* <div className='absolute top-[50%] left-0 h-5 w-5 bg-white  rotate-45 -translate-x-1/2'></div> */}
                <div className='overflow-y-scroll max-h-full'>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                      ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                      ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                      code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5'>{children}</code>,
                      pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/30 p-3'>{children}</pre>
                    }}
                    remarkPlugins={remarkGfm}
                  >
                    {aiCurrentMessage}

                  </ReactMarkdown>
                </div>
              </div>
            </div>

            <h2 className='text-transparent bg-clip-text bg-linear-90 from-amber-500 to-red-600 font-black font-serif text-3xl'>VS</h2>

            <div className='flex justify-start items-center w-full h-1/2'>
              <div className='flex items-center h-[70%] w-full px-10 relative  bg-linear-90 from-emerald-800 to-emerald-400 border-black border-2 rounded-2xl backdrop-blur-2xl text-white'>
                <div className='absolute top-[50%] right-0 h-5 w-5 bg-emerald-400 z-50  rotate-45 translate-x-1/2 '></div>
                <div className='overflow-y-scroll max-h-full'>
                  <p>{userCurrentMessage}</p>
                </div>
              </div>
              <img className='h-full floating ' src={buyer} alt="" />
            </div>
          </div>
        </div>

        {/* Input */}
        <ChatSection />

      </div>
    </div>
  )
}

export default Deshboard
