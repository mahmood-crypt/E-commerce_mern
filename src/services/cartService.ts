import { cartModel } from "../models/cartmodel.js";
import { productModel } from "../models/productmodel.js";

interface Createcartforuser {
  userId: string;
}

interface Additemtocart {
  productId: any;
  userId: string;
  quantity: number;
}

const createCartForUser = async ({ userId }: Createcartforuser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: Additemtocart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
  (p) => p.product.toString() === productId.toString()
);


  if (existInCart) {
    return { data: "item already exist in the cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }

  if(product.stock < quantity){
    return { data: "Low stock for items", statusCode: 400 };
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });

  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};
