import mongoose, { Document, type ObjectId } from "mongoose";
import type { IProduct } from "./productmodel.js";
interface CartItem {
    product: IProduct;
    unitPrice: number;
    quantity: number;
}
export interface ICart extends Document {
    userId: ObjectId | string;
    items: CartItem[];
    totalAmount: number;
    status: "active" | "completed";
}
export declare const cartModel: mongoose.Model<ICart, {}, {}, {}, Document<unknown, {}, ICart, {}, mongoose.DefaultSchemaOptions> & ICart & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICart>;
export {};
//# sourceMappingURL=cartmodel.d.ts.map