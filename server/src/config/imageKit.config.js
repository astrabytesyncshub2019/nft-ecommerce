import ImageKit from "imagekit"
import { configDotenv } from "dotenv"
configDotenv({ path: "./.env", quiet: true })

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

export default imagekit
