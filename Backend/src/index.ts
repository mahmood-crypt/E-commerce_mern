import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRoute.js";
import { seedInitialProducts } from "./services/productService.js";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import  cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("connected to Mongo"))
  .catch((err) => console.log("Failed to connect !",err));

//seed initial products
seedInitialProducts()

app.use("/user",userRouter)
app.use("/products",productRouter)
app.use("/cart",cartRouter)

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);     
})