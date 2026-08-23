import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRoute.js";

const app = express();
app.use(express.json());
const port = 3001;

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => console.log("connected to Mongo"))
  .catch((err) => console.log("Failed to connect !",err));

app.use("/user",userRouter)

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);     
})