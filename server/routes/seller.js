const express = require("express");
const sellerAuthMiddleware = require("../middleware/sellerAuth.js");
const {
	getSellerProfile,
	createProduct,
	updateSellerProfile,
	uploadProductImage,
	deleteProduct,
	getSellerProducts,
	getProduct,
	confirmPurchaseOfProduct,
	uploadSellerImage,
} = require("../controllers/seller.js");
const sellerRouter = express.Router();
const multer = require("multer");
const {
	getProductsReadyForSale,
	updateProductToken,
} = require("../controllers/product.js");

const upload = multer({
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|png|jpeg|jfif|PNG)$/)) {
			return cb(new Error("Please upload valid image format"));
		}
		return cb(undefined, true);
	},
	limits: {
		fileSize: 1000000,
	},
});
// const upload = multer();

sellerRouter
	.route("/api/seller/profile")
	.get(sellerAuthMiddleware, getSellerProfile)
	.put(sellerAuthMiddleware, updateSellerProfile);

sellerRouter
	.route("/api/seller/profile/image")
	.put(upload.single("image"), sellerAuthMiddleware, uploadSellerImage);

// Product routes
sellerRouter
	.route("/api/product")
	.get(sellerAuthMiddleware, getSellerProducts)
	.post(upload.any(), sellerAuthMiddleware, createProduct);

sellerRouter
	.route("/api/product/:id")
	.get(getProduct)
	.post(sellerAuthMiddleware, confirmPurchaseOfProduct)
	.put(upload.single("image"), sellerAuthMiddleware, uploadProductImage)
	.delete(sellerAuthMiddleware, deleteProduct);

sellerRouter
	.route("/api/product/token/:id")
	.put(sellerAuthMiddleware, updateProductToken);

sellerRouter
	.route("/api/products/ready")
	.get(sellerAuthMiddleware, getProductsReadyForSale);

module.exports = sellerRouter;