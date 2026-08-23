import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRoute.js";
import { seedInitialProducts } from "./services/productService.js";
import productRouter from "./routers/productRouter.js";
const app = express();
app.use(express.json());
const port = 3001;
mongoose
    .connect("mongodb://localhost:27017/e-commerce")
    .then(() => console.log("connected to Mongo"))
    .catch((err) => console.log("Failed to connect !", err));
//seed initial products
seedInitialProducts();
app.use("/user", userRouter);
app.use("/products", productRouter);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map