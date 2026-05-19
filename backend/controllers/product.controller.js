import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/product.model.js';

// function for add product
const addProduct = async (req, res) => {
    try {
        
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter(image => image !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                // Here you can implement your logic to upload the image to a cloud storage service (e.g., AWS S3, Cloudinary) and get the URL
                let result = await cloudinary.uploader.upload(image.path,{resource_type: "image"}); // This is a placeholder function, you need to implement it
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: new Date()
        };
        
        console.log("Product data to be added:", productData);

        const newProduct = new productModel(productData);
        await newProduct.save();

        res.status(201).json({message: "Product added successfully"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        console.error("Error in addProduct:", error);
    }
}


// function for list product
const listProducts = async (req, res) => {
    try {
        
        const product = await productModel.find({}).sort({ date: -1 });
        res.status(200).json({message: "Products listed successfully", data: product})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        console.error("Error in listProducts:", error);
    }
}


// function for removing product
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({message: "Product removed successfully"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        console.error("Error in removeProduct:", error);
    }
}


// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const productID = req.body.id;
        console.log("Product ID received for retrieval:", productID);
        const product = await productModel.findById(productID);
        console.log("Single product retrieved:", product);
        res.status(200).json({message: "Product info retrieved successfully", data: product})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        console.error("Error in singleProduct:", error);
    }
}

export {addProduct, listProducts, removeProduct, singleProduct};