import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    minSellingPrice: {
        type: Number,
        required: true
    },
    maxSellingPrice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;