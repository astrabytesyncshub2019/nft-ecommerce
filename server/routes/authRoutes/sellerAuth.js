const express = require("express");
const sellerMiddleware = require("../../middleware/sellerAuth.js");
const {
	getAllSellers,
	createSeller,
	loginSeller,
	logoutSellerFromAllDevices,
	logoutSeller,
} = require("../../controllers/AuthControllers/sellerAuth.js");

const sellerAuthRouter = express.Router();

// Authentication Routes
sellerAuthRouter.route("/api/seller").get(getAllSellers);
sellerAuthRouter.route("/api/seller/signup").post(createSeller);
sellerAuthRouter.route("/api/seller/login").post(loginSeller);
sellerAuthRouter
	.route("/api/seller/logout")
	.post(sellerMiddleware, logoutSeller);
sellerAuthRouter
	.route("/api/seller/logout/all")
	.post(sellerMiddleware, logoutSellerFromAllDevices);

module.exports =  sellerAuthRouter;
