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
  origin: 'http://localhost:5173',
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
app.use("/api/payment",stripeRoute)

swaggerDocs(app, PORT)


app.use(errorHandler)
if (process.env.NODE_ENV === 'production') {
  try {
    app.listen(PORT, () => {
      connectDB()
      console.log(chalk.yellowBright(`Server running at http://localhost:${PORT}`))
    })

  } catch (error) {
    console.log("Server not on Production");
    process.exit(1);
  }
}

export default app
