import mongoose from "mongoose";

import { DB_NAME } from "../constant.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected ! DB HOST: `, connectionInstance.connection.host);

    } catch (error) {
        console.error(
            '\x1b[91m MONGODB connection error!!\x1b[0m', // Bright Red
            '\x1b[96m', error, '\x1b[0m' // Bright Cyan for the error details
        );
        process.exit(1)

    }
}
export default connectDB