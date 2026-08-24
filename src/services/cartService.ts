import { cartModel } from "../models/cartmodel.js";

interface Createcartforuser {
    userId : string;
}

const createCartForUser = async ({userId} : Createcartforuser) => {
    const cart = await cartModel.create({userId , totalAmount : 0});
    await cart.save();
    return cart;
}

interface GetActiveCartForUser {
    userId : string;
}

export const getActiveCartForUser = async({userId} : GetActiveCartForUser) => {
    let cart = await cartModel.findOne({userId , status : "active"});

    if(!cart){
        cart = await createCartForUser({userId}); 
    }

    return cart;
}