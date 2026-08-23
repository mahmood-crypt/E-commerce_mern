import mongoose, { Schema, Document } from "mongoose";
//the main schema
const productSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 }
});
//applying schema
export const productModel = mongoose.model("Product", productSchema);
//# sourceMappingURL=productmodel.js.map