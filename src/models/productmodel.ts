import mongoose , {Schema , Document} from "mongoose";


//only in typeScript 
export interface IProduct extends Document {
    title : string;
    image : string;
    price : number;
    stock : number;
}

//the main schema
const productSchema = new Schema<IProduct>({
    title : {type : String , required : true},
    image : {type : String , required : true},
    price : {type : Number , required : true},
    stock : {type :  Number, required : true, default : 0}
})

//applying schema
export const productModel = mongoose.model<IProduct>("Product",productSchema)