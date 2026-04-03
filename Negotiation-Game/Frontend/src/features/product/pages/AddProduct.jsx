import React from 'react'
import { useProduct } from '../hooks/useProduct'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [minSellingPrice, setMinSellingPrice] = useState(null);
    const [maxSellingPrice, setMaxSellingPrice] = useState(null);
    const [image, setImage] = useState(null);

    const [responce, setResponce] = useState(null)
    const [submited, setSubmited] = useState(false)

    const { handleAddProduct } = useProduct()
    const { isLoading, error } = useSelector(state => state.product)

    const fileRef = React.useRef(null);

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setMinSellingPrice('');
        setMaxSellingPrice('');
        setImage(null);

        if (fileRef.current) {
            fileRef.current.value = null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await handleAddProduct({ name, description, price, minSellingPrice, maxSellingPrice, image })
        setResponce(response)
        console.log(responce);
        if (!error) {
            setSubmited(true)
            resetForm()
        }

    }
    return (
        <div className='min-h-screen w-screen bg-blue-950 flex px-3 items-center justify-center'>
            <div className='min-w-3/5  max-w-md p-10 bg-linear-90 from-blue-400 via-blue-300 to-blue-600 rounded-2xl'>
                <div className="text-center mb-8">
                    <h3 className='text-2xl font-bold text-white'>Welcome to Negotiation-Ai</h3>
                    <h1 className='text-3xl font-bold text-white'>Add Product</h1>
                </div>
                <form
                    className='  grid grid-cols-1 md:grid-cols-2 w-full  gap-3'
                    onSubmit={handleSubmit}>
                    {/* name, description, price, minSellingPrice, maxSellingPrice, image */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
                            <p className="text-red-400 text-center text-sm font-medium">{error}</p>
                        </div>
                    )}
                    <div className="productNameInput flex flex-col">
                        <label >
                            Name
                        </label>
                        <input
                            value={name}
                            className='bg-blue-100 px-3 py-2 border-none outline-0 rounded  shadow-zinc-600 shadow-inner'
                            onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Product Name' />
                    </div>
                    <div className="productDiscription flex flex-col">
                        <label>
                            Discription
                        </label>
                        <input
                            value={description}
                            className='bg-blue-100 px-3 py-2 border-none outline-0 rounded  shadow-zinc-600 shadow-inner'
                            onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Enter Product Discription' />
                    </div>
                    <div className="poductPrice flex flex-col">
                        <label >
                            Price of Purchasing
                        </label>
                        <input
                            value={price}
                            className='bg-blue-100 px-3 py-2 border-none outline-0 rounded  shadow-zinc-600 shadow-inner'
                            onChange={(e) => setPrice(Number(e.target.value))} type="number" id="price" />
                    </div>
                    <div className="minSellingPrice flex flex-col">
                        <label >
                            Min Selling Price
                        </label>
                        <input
                            value={minSellingPrice}
                            className='bg-blue-100 px-3 py-2 border-none outline-0 rounded  shadow-zinc-600 shadow-inner'
                            onChange={(e) => setMinSellingPrice(Number(e.target.value))} type="number" id="minSellingPrice" />
                    </div>
                    <div className="maxSellingPrice flex flex-col">
                        <label >
                            Max Selling Price
                        </label>
                        <input
                            value={maxSellingPrice}
                            className='bg-blue-100 px-3 py-2 border-none outline-0 rounded  shadow-zinc-600 shadow-inner'
                            onChange={(e) => setMaxSellingPrice(Number(e.target.value))} type="number" id="maxSellingPrice" />
                    </div>
                    <div className="productImage flex flex-col">
                        <label >
                            Product Image 🖼️
                        </label>
                        <input
                            ref={fileRef}
                            className='bg-blue-100 px-3 py-8 border-none outline-0 rounded  shadow-zinc-600 shadow-inner'
                            onChange={(e) => setImage(e.target.files[0])} type="file" id="image" />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4 shadow-lg hover:shadow-xl"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Adding product...
                            </span>
                        ) : (
                            "Add Product"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
