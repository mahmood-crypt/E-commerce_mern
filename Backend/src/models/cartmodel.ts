import mongoose , {Schema , Document, type ObjectId} from "mongoose";
import type { IProduct } from "./productmodel.js";

const cartStatusEnum = ["active","completed"];

interface CartItem  {
    product : IProduct;
    unitPrice : number;
    quantity : number;
}

export interface ICart extends Document {
    userId :  ObjectId | string;
    items : CartItem[];
    totalAmount : number;
    status : "active" | "completed";
}

const cartItemSchema = new Schema<CartItem>({
    product : {type : Schema.Types.ObjectId , ref : "product" , required : true},
    unitPrice : {type : Number , required : true},
    quantity : {type : Number , required : true , default : 1}
});

const cartSchema = new Schema<ICart>({
    userId : {type : Schema.Types.ObjectId , ref : "user",required : true},
    items : [cartItemSchema],
    totalAmount : {type : Number , required : true},
    status : {type : String, enum : cartStatusEnum ,default : "active"}

})

export const cartModel = mongoose.model<ICart>("Cart",cartSchema);