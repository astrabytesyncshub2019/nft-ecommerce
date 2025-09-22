import { configDotenv } from "dotenv"
configDotenv({
  path: "./.env",
  quiet: true
})

import express from "express"
import connectDB from "./src/db/db.connect.js"
import chalk from "chalk"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"
import session from "express-session"
import passport from "passport"
import "./src/config/passport.config.js"

import { errorHandler } from "./src/utils/errorHandler.js"
import userRoutes from "./src/routes/user.routes.js"
import productRoutes from "./src/routes/products.routes.js"
import cartRoutes from "./src/routes/cart.routes.js"
import orderRoutes from "./src/routes/order.routes.js"
import stripeRoute from "./src/routes/payment.routes.js"
import { swaggerDocs } from "./src/docs/swagger.js"


const app = express()
const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://scatch-bice.vercel.app"
    ]

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET || "keyboardcat",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/payment", stripeRoute)

swaggerDocs(app, PORT)


app.use(errorHandler)
app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server running on port ${PORT}`)
})


export default app
