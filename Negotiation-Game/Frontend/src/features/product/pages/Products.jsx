import React, { useEffect, useState } from 'react'
import { useProduct } from '../hooks/useProduct'
import { useSelector } from 'react-redux'
import { ShoppingCart, Zap, TrendingUp, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useChat } from '../../chat/hooks/useChat'
import Particles from '../components/Particles/Particles'

const Products = () => {
  const product = useProduct()
  const chats = useChat()
  const allProducts = useSelector(state => state.product.products)
  const isLoading = useSelector(state => state.product.isLoading)
  const error = useSelector(state => state.product.error)
  const [hoveredCard, setHoveredCard] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    product.handleGetProducts()
  }, [])

  const handleStartNegotiation = (prod) => {
    product.handleSetCurrentProduct(prod)
    chats.handleCreateChat({ productId: prod._id })
    navigate("/deshboard")
  }
  const SkeletonCard = () => (
    <div className="relative bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 p-4 animate-pulse">

      <div className="aspect-video bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-700 rounded mb-3"></div>
      <div className="h-4 bg-gray-700 rounded mb-4"></div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-700 rounded-full flex-1"></div>
        <div className="h-6 bg-gray-700 rounded-full flex-1"></div>
      </div>
      <div className="h-10 bg-gray-700 rounded-lg"></div>
    </div>
  )

  const ProductCard = ({ prod, index }) => {
    const priceRange = prod.maxSellingPrice - prod.minSellingPrice
    const negotiationPercentage = (priceRange / prod.price) * 100

    return (
      <div
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
        className="group relative h-full"
      >
        {/* Glow Background Effect */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-300 -z-10"></div>

        {/* Card */}
        <div className="relative bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden border border-gray-700 group-hover:border-purple-500 transition duration-300 h-full flex flex-col backdrop-blur-sm">

          {/* Product Image Container */}
          <div className="relative h-48 bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden">
            <img
              src={prod.image || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={prod.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>

            {/* Discount Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-linear-to-r from-orange-500 to-pink-600 px-3 py-1 rounded-full backdrop-blur-md border border-orange-300/50">
              <Zap size={14} className="text-yellow-300" />
              <span className="text-white text-xs font-bold">{Math.round(negotiationPercentage)}% Range</span>
            </div>

            {/* Hot Tag */}
            <div className="absolute top-3 left-3 bg-red-600/90 px-3 py-1 rounded-full text-white text-xs font-bold backdrop-blur-md">
              🔥 Hot Deal
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col">
            {/* Product Name */}
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition line-clamp-2 mb-2">
              {prod.name}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
              {prod.description || 'Premium quality product'}
            </p>

            {/* Price Box */}
            <div className="bg-linear-to-r from-gray-800 to-gray-700 rounded-lg p-3 mb-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Original Price</span>
                <span className="text-2xl font-bold text-green-400">${prod.price}</span>
              </div>
              <div className="border-t border-gray-600 pt-2">
                <div className="flex gap-2 mb-1">
                  <div className="flex-1">
                    <span className="text-gray-400 text-xs">Min Sell</span>
                    <p className="text-blue-400 font-bold">${prod.minSellingPrice}</p>
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-400 text-xs">Max Sell</span>
                    <p className="text-purple-400 font-bold">${prod.maxSellingPrice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Negotiation Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-xs font-semibold uppercase">Negotiation Range</span>
                <span className="text-xs text-blue-400 font-bold">{negotiationPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
                <div
                  className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${Math.min(negotiationPercentage * 2, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-2 mb-4 text-xs">
              <div className="flex-1 bg-gray-800/50 rounded-lg p-2 border border-gray-700 text-center">
                <TrendingUp size={14} className="text-blue-400 mx-auto mb-1" />
                <span className="text-gray-300">High Demand</span>
              </div>
              <div className="flex-1 bg-gray-800/50 rounded-lg p-2 border border-gray-700 text-center">
                <ShoppingCart size={14} className="text-purple-400 mx-auto mb-1" />
                <span className="text-gray-300">In Stock</span>
              </div>
            </div>

            {/* Action Button */}
            <button onClick={() => handleStartNegotiation(prod)} className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition duration-300 transform group-hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-blue-400/50">
              <ShoppingCart size={18} />
              Start Negotiation
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Particles
          width="100%"
          height="100%"
          className="absolute top-0 left-0 w-full h-full pointer-events-auto"
          
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="pt-8 px-5 md:px-12 mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                🎮 Product Marketplace
              </h1>
              <p className="text-gray-400 text-lg">Negotiate like a champion, win the best deals</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full border border-blue-400/50">
              <span className="text-white font-bold">{allProducts.length}</span>
              <span className="text-gray-200">Products Available</span>
            </div>
          </div>

          {/* Filter/Sort Bar */}
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition">
              All Products
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-semibold border border-gray-700 hover:border-gray-600 transition">
              High Negotiation
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-semibold border border-gray-700 hover:border-gray-600 transition">
              Best Deals
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mx-5 md:mx-12 mb-8 bg-red-900/20 border border-red-700 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="text-red-500 shrink-0" size={24} />
            <div>
              <p className="text-red-400 font-semibold">Something went wrong</p>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="px-5 md:px-12 pb-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : allProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map((prod, index) => (
                <ProductCard key={prod._id || index} prod={prod} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-white mb-2">No Products Yet</h2>
              <p className="text-gray-400 mb-6">Start adding products to display them here</p>
              <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                Add Your First Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
