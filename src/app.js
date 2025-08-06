import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

// tell the backend to handle json data
app.use(express.json({ limit: "20kb" }));

// tell the backend to handle url-based data
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// tell the backend to store static files
app.use(express.static("public"));

app.use(cookieParser());

// routes import (using this to segregate the file imports)
import userRouter from "./routes/user.routes.js";
// route declaration (here need to use middleware .use() because we seperated the route files)
app.use("/api/v1/users", userRouter);

export { app };
