import productModel from "../models/product.model.js";
import uploadFile from "../services/storage.service.js";

async function addProductController(req, res) {
    const { name, description, price, minSellingPrice, maxSellingPrice } = req.body;
    const imageFile = req.files.image[0];

    const image = await uploadFile({
        buffer: imageFile.buffer,
        fileName: name,
        folder: "/cohort-2/Negotiation-Ai/products"
    })
    const product = await productModel.create({ name, description, price, minSellingPrice, maxSellingPrice, image : image.url });
    res.status(200).json({ success: true, message: "Product added successfully", product });
}

async function getAllProductsController(req, res) {
    const products = await productModel.find({});
    res.status(200).json({ success: true, message: "Products fetched successfully", products });
}

export default {
    addProductController,
    getAllProductsController
};