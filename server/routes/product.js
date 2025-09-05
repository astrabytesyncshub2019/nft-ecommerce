const express = require("express");
const {
	addProductToWishList,
	purchaseProduct,
	removeProductFromWishList,
	getWishListedProducts,
	getPurchasedProducts,
	getProducts,
	getProductsByCategory,
} = require("../controllers/product.js");
const userAuthMiddleware = require("../middleware/userAuth.js");

const productRouter = express.Router();

productRouter.route("/api/products").get(getProducts);
productRouter.route("/api/products/category").post(getProductsByCategory);

productRouter
	.route("/api/user/wishlist")
	.get(userAuthMiddleware, getWishListedProducts);

productRouter
	.route("/api/user/purchased")
	.get(userAuthMiddleware, getPurchasedProducts);

productRouter
	.route("/api/product/wishlist/:id")
	.post(userAuthMiddleware, addProductToWishList)
	.delete(userAuthMiddleware, removeProductFromWishList);

productRouter
	.route("/api/product/purchase/:id")
	.post(userAuthMiddleware, purchaseProduct);
// .delete(userAuthMiddleware, removeProductFromWishList);

module.exports =  productRouter;
