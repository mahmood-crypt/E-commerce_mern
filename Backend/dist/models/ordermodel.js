import mongoose, { Schema, Document } from "mongoose";
const OrderItemSchema = new Schema({
    productTitle: { type: String, required: true },
    productImg: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
const OrderSchema = new Schema({
    orderItems: [OrderItemSchema],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
});
export const orderModel = mongoose.model("order", OrderSchema);
//# sourceMappingURL=ordermodel.js.map