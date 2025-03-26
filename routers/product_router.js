const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/:id/sorted", productController.getProductByIdWithSortedReviews);
router.get("/:id/picture", productController.getProductByIdWithPictureReviews);
router.get("/:id/:rating", productController.getProductByIdWithSelectedRating);

module.exports = router;
