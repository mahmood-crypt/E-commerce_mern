import mongoose, { Schema, Document } from "mongoose";
const cartStatusEnum = ["active", "completed"];
const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});
const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: cartStatusEnum, default: "active" }
});
export const cartModel = mongoose.model("Cart", cartSchema);
//# sourceMappingURL=cartmodel.js.map