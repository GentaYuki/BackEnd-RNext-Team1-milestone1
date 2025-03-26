const mongoose = require("mongoose");
const Product = require("../models/product_models");
const Review = require("../models/review_models"); 

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("reviews").lean(); 

        for (const product of products) {
            const reviews = await Review.find({ product_id: product._id });

            // Hitung rata-rata rating
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0.0";

            // Simpan rating ke database (hanya jika ada perubahan)
            await Product.findByIdAndUpdate(product._id, { rating: averageRating });

            // Tambahkan rating ke objek produk yang dikirimkan ke response
            product.rating = averageRating;
        }

        res.json({
            success: true,
            message: "Products found",
            data: products,
        });
    } catch (error) {
        res.status(500).json({ message: "Error: Failed to get products", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Pastikan ID yang diterima adalah valid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Product.findById(id).populate("reviews").lean();

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const reviews = await Review.find({ product_id: id });

        // Hitung rata-rata rating
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

        // Simpan rating ke database jika ada perubahan
        await Product.findByIdAndUpdate(id, { rating: averageRating });

        // Tambahkan rating ke objek product
        product.reviews = reviews;
        product.rating = averageRating;
        

        res.json({
            success: true,
            message: "Product found",
            data: product,
        });
    } catch (error) {
        res.status(500).json({ message: "Error: Failed to get product", error: error.message });
    }
};

const getProductByIdWithSortedReviews = async (req, res) => {
    try {
        const {id} = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        
        const product = await Product.findById(id).lean();
        if (!product)   {
            return res.status(404).json({message: "Product not found"});
        }  

        const reviews = await Review.find({ product_id: id }).sort({ createdAt: -1 });
        
        product.reviews = reviews;

        res.json({
            suscess: true,
            message: "Product found",
            data: product,
        }); 

        } catch (error) {
            res.status(500).json({ message: "Error: Failed to get product", error: error.message });
        }
    };
    
const getProductByIdWithPictureReviews = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id).lean();
        if (!product)   {
            return res.status(404).json({message: "Product not found"});
        }  
        const reviews = await Review.find({ product_id: id, picture: { $ne: "" } });
        product.reviews = reviews;
        res.json({
            success: true,
            message: "Product found",
            data: product,
        });
    } catch (error) {
        res.status(500).json({ message: "Error: Failed to get product", error: error.message });
    }
};

const getProductByIdWithSelectedRating = async (req, res) => {
    try {
        const {id, rating} = req.params;
        const selectedRating = parseInt(rating);
        if (selectedRating < 1 || selectedRating > 5) {
            return res.status(400).json({message: "Rating must be between 1 and 5"});
        }
        const product = await Product.findById(id).lean();
        if (!product)   {
            return res.status(404).json({message: "Product not found"});
        }  
        const reviews = await Review.find({ product_id: id, rating: selectedRating });
        product.reviews = reviews;
        res.json({
            success: true,
            message: "Product found",
            data: product,
        });
    } catch (error) {
        res.status(500).json({ message: "Error: Failed to get product", error: error.message });
    }
};

module.exports = { getAllProducts, getProductById, getProductByIdWithSortedReviews, getProductByIdWithPictureReviews, getProductByIdWithSelectedRating };
