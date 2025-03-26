const mongoose = require("mongoose");
const Product = require("../models/product_models");
const Review = require("../models/review_models");

// Koneksi ke database
require('dotenv').config();
const MONGO_URI = process.env.MONGODB_URL;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const seedDatabase = async () => {
    try {
        // Hapus data lama (opsional)
        await Product.deleteMany({});
        await Review.deleteMany({});

        // Insert produk baru
        const product1 = await Product.create({
            name: "Black Kaftan with Embellishment",
            price: 300000,
            description: "Black Kaftan with Embellishment",
            image: "https://ik.imagekit.io/Team1Milestone01/Image_User(Milestone%201)/product01.png?updatedAt=1742785287531",
            sizeFit: {
                small: "2%", 
                trueToSize: "85%", 
                large: "13%"
            }
        });

        console.log("Products seeded:", product1);

        // Insert review baru dengan `product_id` sebagai ObjectId
        await Review.create([
            {
                product_id: product1._id, // Gunakan ObjectId dari produk yang baru dibuat
                user_id: new mongoose.Types.ObjectId(), // Dummy user ID
                rating: 5,
                review_text: "This black kaftan is a wardrobe staple for me now! The quality is outstanding!",
                image_user: "https://ik.imagekit.io/Team1Milestone01/Image_User(Milestone%201)/user_1.png?updatedAt=1742650179412",
                size_user: { bust: 88, waist: 78, hips: 110, height: 165, weight: 65 },
                ThumbUp_rate: 5,
                createdAt: new Date(2023, 10, 29),
                picture : "https://ik.imagekit.io/Team1Milestone01/Image_User(Milestone%201)/product01.png?updatedAt=1742785287531"
            },
            {
                product_id: product1._id,
                user_id: new mongoose.Types.ObjectId(),
                rating: 4,
                review_text: "This black kaftan exceeded my expectations! The fabric feels luxurious against my skin, and the craftsmanship is impeccable.",
                image_user: "https://ik.imagekit.io/Team1Milestone01/Image_User(Milestone%201)/user_2.png?updatedAt=1742650179745",
                size_user: { bust: 91, waist: 82, hips: 94, height: 160, weight: 55 },
                ThumbUp_rate: 2,
                createdAt: new Date(2024, 2, 25),
            },
            {
                product_id: product1._id, 
                user_id: new mongoose.Types.ObjectId(),
                rating: 5,
                review_text: "I'm in love with this black kaftan! The fit is perfect, and the flowing silhouette is so flattering. The material is lightweight yet substantial, making it ideal for warmer weather. I appreciate the attention to detail in the design; it's elegant without being overly fussy. Overall, an excellent purchase that I'm thrilled with!",
                image_user: "https://ik.imagekit.io/Team1Milestone01/Image_User(Milestone%201)/user_3.png?updatedAt=1742650179612",
                size_user: { bust: 88, waist: 65, hips: 110, height: 155, weight: 45 },
                ThumbUp_rate: 0,
                createdAt: new Date(2024, 0, 20),
            },
            {
                product_id: product1._id, 
                user_id: new mongoose.Types.ObjectId(),
                rating: 1,
                review_text: "I'm extremely disappointed with this black kaftan. My mom said the material feels cheap and scratchy against her skin, nothing like what was advertised.",
                image_user: "https://ik.imagekit.io/Team1Milestone01/Image_User(Milestone%201)/user_4.png?updatedAt=1742650179715",
                size_user: { bust: 91, waist: 82, hips: 94, height: 160, weight: 55 },
                ThumbUp_rate: 0,
                createdAt: new Date(2024, 3, 3),
            },
            {
                product_id: product1._id, 
                user_id: new mongoose.Types.ObjectId(),
                rating: 1,
                review_text: "This black kaftan was a huge letdown. The fabric is thin and see-through, making it unwearable without additional layers.",
                image_user: "https://ik.imagekit.io/Team1Milestone01/Image_User(Milestone%201)/user_5.png?updatedAt=1742650179749",
                size_user: { bust: 88, waist: 78, hips: 110, height: 165, weight: 65 },
                ThumbUp_rate: 0,
                createdAt: new Date(2024, 0, 3),
            },
            {
                product_id: product1._id, 
                user_id: new mongoose.Types.ObjectId(),
                rating: 5,
                review_text: "I'm beyond impressed with this black kaftan! The fabric is so soft and luxurious, adn the fit is absolutely perfect.",
                image_user: "https://ik.imagekit.io/Team1Milestone01/Image_User(Milestone%201)/user_6.jpg?updatedAt=1743008531983",
                size_user: { bust: 91, waist: 82, hips: 94, height: 160, weight: 55 },
                ThumbUp_rate: 0,
                createdAt: new Date(2023, 11, 15),
            },
            {
                product_id: product1._id, 
                user_id: new mongoose.Types.ObjectId(),
                rating: 5,
                review_text: "My sister said, she is highly recommend this product to anyone looking for a sophisticated addition to their wardrobe.",
                image_user: "https://ik.imagekit.io/Team1Milestone01/Image_User(Milestone%201)/user_7.jpg?updatedAt=1743008531948",
                size_user: { bust: 91, waist: 82, hips: 94, height: 162, weight: 70 },
                ThumbUp_rate: 0,
                createdAt: new Date(2023, 11, 12),
            },
        ]);

        console.log("Reviews seeded!");

        mongoose.connection.close();
    } catch (error) {
        console.error("Seeding error:", error);
        mongoose.connection.close();
    }
};

seedDatabase();
