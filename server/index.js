const express = require("express");
const cors = require("cors");
require("dotenv/config.js");
const connectDB = require("./config/db.js");
const { errorMiddleware, notFound } = require("./middleware/errorMiddleware.js");
const userRouter = require("./routes/user.js");
const productRouter = require("./routes/product.js");
const sellerRouter = require("./routes/seller.js");
const userAuthRouter = require("./routes/authRoutes/userAuth.js");
const sellerAuthRouter = require("./routes/authRoutes/sellerAuth.js");

const PORT = process.env.BACKEND_PORT;
const app = express();

// DB connection
connectDB();

// middlewares
app.use(cors());
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
// app.use(notFound);

// Routers
app.use(sellerAuthRouter);
app.use(userAuthRouter);
app.use(userRouter);
app.use(sellerRouter);
app.use(productRouter);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
