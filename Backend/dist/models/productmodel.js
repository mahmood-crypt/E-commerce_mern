import mongoose, { Schema, Document } from "mongoose";
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
});
export const productModel = mongoose.model("Product", productSchema);
//# sourceMappingURL=productmodel.js.map