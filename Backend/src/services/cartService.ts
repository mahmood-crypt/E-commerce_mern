import { cartModel, type ICart } from "../models/cartmodel.js";
import { orderModel, type IOrderItem } from "../models/ordermodel.js";
import { productModel } from "../models/productmodel.js";

interface Createcartforuser {
  userId: string;
}

interface Additemtocart {
  productId: any;
  userId: string;
  quantity: number;
}

interface Updateitemincart {
  productId: any;
  userId: string;
  quantity: number;
}

interface DeletedItem {
  userId : string;
  productId : any;
}

const createCartForUser = async ({ userId }: Createcartforuser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

const calculatecartTotalItems = ({cart,productId} : {cart : ICart , productId : string}) => {
  const tmpItems = cart.items.filter((p) => p.product.toString() !== productId);
  const total = tmpItems.reduce((sum,product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  },0)
  return total;
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

export const updateItemInCart = async ({userId,productId,quantity} : Updateitemincart) => {
  const cart = await getActiveCartForUser({ userId });
  const existInCart = cart.items.find(
  (p) => p.product.toString() === productId.toString()
);
  if(!existInCart){
    return {data : "item doesn't exist in cart" ,statusCode : 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }

  if(product.stock < quantity){
    return { data: "Low stock for items", statusCode: 400 };
  }

  let total = calculatecartTotalItems({cart,productId});

  existInCart.quantity = quantity;
  total += existInCart.quantity * existInCart.unitPrice;
  cart.totalAmount = total;
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };


}


export const deleteItemFromCart = async ({userId,productId} : DeletedItem) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
  (p) => p.product.toString() === productId.toString()
);


  if (!existInCart) {
    return { data: "item doesn't exist in the cart", statusCode: 400 };
  }
  const tmpItems = cart.items.filter((p) => p.product.toString() !== productId);
  const total = calculatecartTotalItems({cart,productId})
  cart.totalAmount = total;
  cart.items = tmpItems;
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
}

export const clearCart = async (userId : string) => {
  const cart = await getActiveCartForUser({ userId });
   cart.totalAmount = 0;
  cart.items = [];
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
}

interface Checkout { userId : string , address: string};

export const checkout = async ({userId , address} : Checkout) => {
  if(!address){
      return { data: "please provide address", statusCode: 400 };
    }
  const cart = await getActiveCartForUser({ userId });
  const orderItems : IOrderItem[] = []
  for (const item of cart.items){
    const product = await productModel.findById(item.product);

    if(!product){
      return { data: "Product not found", statusCode: 400 };
    }

    const orderItem : IOrderItem = {
      productTitle : product?.title,
      productImg : product?.image,
      unitPrice : item?.unitPrice,
      quantity : item.quantity

    }

    orderItems.push(orderItem)
  }

  const order = await orderModel.create({
    orderItems,
    userId,
    total : cart.totalAmount,
    address 
  })

  await order.save();

  cart.status = "completed";
  await cart.save();

  return { data: order, statusCode: 200 };
}