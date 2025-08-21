import chalk from "chalk"
import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONOGODB_URI)
        console.log(chalk.magentaBright(`MongoDB connect sucessfully :${conn.connection.host}`))
    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}
export default connectDB