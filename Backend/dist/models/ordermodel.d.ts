import mongoose, { Document, type ObjectId } from "mongoose";
export interface IOrderItem {
    productTitle: string;
    productImg: string;
    unitPrice: number;
    quantity: number;
}
export interface IOrder {
    orderItems: IOrderItem[];
    total: number;
    address: string;
    userId: ObjectId | string;
}
export declare const orderModel: mongoose.Model<IOrder, {}, {}, {}, Document<unknown, {}, IOrder, {}, mongoose.DefaultSchemaOptions> & IOrder & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IOrder>;
//# sourceMappingURL=ordermodel.d.ts.map