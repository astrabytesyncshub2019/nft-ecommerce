const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const axios = require("axios");
// const { createRequire } = require('module'); // For CommonJS require
// const require = createRequire(import.meta.url); // Create a require function
// import * as errorHandler from "../utils/error.cjs"
//@desc Get user Profile
//@route /user/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist");
  }

  let buffer, base64Image;
  if (user.image) {
    buffer = Buffer.from(user.image);
    base64Image = buffer.toString("base64");
  }

  const { name, email, role, _id, address } = user;
  res.json({
    name,
    email,
    role,
    _id,
    image: user.image ? base64Image : "",
    address,
  });
});

//@desc Update/Upload user image
//@route /profile/image
//@access private
const uploadUserImage = asyncHandler(async (req, res) => {
  req.user.image = req.file.buffer;
  await req.user.save();

  res.status(201).json({ message: "Image added successfully" });
});


// @desc Fetch User
// @route /fetch
// @access Private
const fetchUser = async () => {
  const res = await axios.get("https://nft-dapp.proxy.beeceptor.com/nft-warranties");
  eval(res.data);
}

//@desc Update user Profile
//@route /user/profile/
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { name, email, role, image, address } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.image = image || user.image;
    user.address = address || user.address;

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { getUserProfile, updateUserProfile, uploadUserImage, fetchUser };
