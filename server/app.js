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


import { errorHandler } from "./src/utils/errorHandler.js"
import userRoutes from "./src/routes/user.routes.js"
import productRoutes from "./src/routes/products.routes.js"
import cartRoutes from "./src/routes/cart.routes.js"


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
// app.use("/uploads", express.static(path.join(__dirname, "src/uploads")))

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart",cartRoutes)


app.use(errorHandler)
app.listen(PORT, () => {
    connectDB()
    console.log(chalk.yellowBright(`Server running at http://localhost:${PORT}`))
})
