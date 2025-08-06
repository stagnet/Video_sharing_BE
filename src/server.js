import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ path: "./env" });

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at Port : ${port}`);
    });
  })
  .catch((err) => {
    console.error(
      "\x1b[91m MONGODB Connection Failed!\x1b[0m", // Bright Red
      "\x1b[96m",
      err,
      "\x1b[0m" // Bright Cyan for the error details
    );
  });
