import { Router } from "express"
import productController from "../controllers/product.controller.js"
import upload from "../middlewares/storage.middleware.js"

const productRouter = Router()


productRouter.post("/", upload.fields([
    { name: "image", maxCount: 1 }
]), productController.addProductController)

productRouter.get("/", productController.getAllProductsController)

export default productRouter