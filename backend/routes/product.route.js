import express from "express";
import {addProduct, listProducts, removeProduct, singleProduct} from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// productRouter.post("/add", addProduct);
// productRouter.get("/list", listProducts);
// productRouter.delete("/remove/:id", removeProduct);
// productRouter.get("/single/:id", singleProduct);
productRouter.post("/add", adminAuth, upload.fields([{name:'image1', maxCount: 1},{name:'image2', maxCount: 1},{name:'image3', maxCount: 1},{name:'image4', maxCount: 1}]), addProduct);
productRouter.post("/list", listProducts);
productRouter.post("/remove", removeProduct);
productRouter.post("/single", singleProduct);

export default productRouter;