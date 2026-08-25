import mongoose, { Document } from "mongoose";
export interface IProduct extends Document {
    title: string;
    image: string;
    price: number;
    stock: number;
}
export declare const productModel: mongoose.Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct, {}, mongoose.DefaultSchemaOptions> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
//# sourceMappingURL=productmodel.d.ts.map