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
  userId: string;
  productId: any;
}

interface GetActiveCartForUser {
  userId: string;
  populateProduct?: boolean;
}

interface Checkout {
  userId: string;
  address: string;
}

/**
 * Create a new active cart for a user
 */
const createCartForUser = async ({
  userId,
}: Createcartforuser) => {
  const cart = await cartModel.create({
    userId,
    totalAmount: 0,
  });

  return cart;
};

/**
 * Calculate cart total excluding a specific product
 */
const calculateCartTotalItems = ({
  cart,
  productId,
}: {
  cart: ICart;
  productId: string;
}) => {
  const tmpItems = cart.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );

  const total = tmpItems.reduce((sum, item) => {
    sum += item.quantity * item.unitPrice;
    return sum;
  }, 0);

  return total;
};

/**
 * Get user's active cart
 */
export const getActiveCartForUser = async ({
  userId,
  populateProduct,
}: GetActiveCartForUser) => {
  let cart;

  if (populateProduct) {
    cart = await cartModel
      .findOne({
        userId,
        status: "active",
      })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({
      userId,
      status: "active",
    });
  }

  if (!cart) {
    cart = await createCartForUser({
      userId,
    });
  }

  return cart;
};

/**
 * Add item to cart
 */
export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: Additemtocart) => {
  if (quantity <= 0) {
    return {
      data: "Quantity must be greater than 0",
      statusCode: 400,
    };
  }

  const cart = await getActiveCartForUser({
    userId,
  });

  const existInCart = cart.items.find(
    (item) =>
      item.product.toString() === productId.toString()
  );

  if (existInCart) {
    return {
      data: "Item already exists in the cart",
      statusCode: 400,
    };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return {
      data: "Product not found",
      statusCode: 400,
    };
  }

  if (product.stock < quantity) {
    return {
      data: "Low stock for item",
      statusCode: 400,
    };
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });

  cart.totalAmount += product.price * quantity;

  await cart.save();

  return {
    data: await getActiveCartForUser({
      userId,
      populateProduct: true,
    }),
    statusCode: 200,
  };
};

/**
 * Update item quantity in cart
 */
export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: Updateitemincart) => {
  if (quantity <= 0) {
    return {
      data: "Quantity must be greater than 0",
      statusCode: 400,
    };
  }

  const cart = await getActiveCartForUser({
    userId,
  });

  const existInCart = cart.items.find(
    (item) =>
      item.product.toString() === productId.toString()
  );

  if (!existInCart) {
    return {
      data: "Item doesn't exist in cart",
      statusCode: 400,
    };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return {
      data: "Product not found",
      statusCode: 400,
    };
  }

  if (product.stock < quantity) {
    return {
      data: "Low stock for item",
      statusCode: 400,
    };
  }

  let total = calculateCartTotalItems({
    cart,
    productId: productId.toString(),
  });

  existInCart.quantity = quantity;

  total +=
    existInCart.quantity * existInCart.unitPrice;

  cart.totalAmount = total;

  await cart.save();

  return {
    data: await getActiveCartForUser({
      userId,
      populateProduct: true,
    }),
    statusCode: 200,
  };
};

/**
 * Delete item from cart
 */
export const deleteItemFromCart = async ({
  userId,
  productId,
}: DeletedItem) => {
  const cart = await getActiveCartForUser({
    userId,
  });

  const existInCart = cart.items.find(
    (item) =>
      item.product.toString() === productId.toString()
  );

  if (!existInCart) {
    return {
      data: "Item doesn't exist in the cart",
      statusCode: 400,
    };
  }

  const tmpItems = cart.items.filter(
    (item) =>
      item.product.toString() !== productId.toString()
  );

  const total = calculateCartTotalItems({
    cart,
    productId: productId.toString(),
  });

  cart.totalAmount = total;
  cart.items = tmpItems;

  const updatedCart = await cart.save();

  return {
    data: updatedCart,
    statusCode: 200,
  };
};

/**
 * Clear cart
 */
export const clearCart = async (userId: string) => {
  const cart = await getActiveCartForUser({
    userId,
  });

  cart.totalAmount = 0;
  cart.items = [];

  await cart.save();

  return {
    data: await getActiveCartForUser({
      userId,
      populateProduct: true,
    }),
    statusCode: 200,
  };
};

/**
 * Checkout cart and create order
 */
export const checkout = async ({
  userId,
  address,
}: Checkout) => {
  if (!address) {
    return {
      data: "Please provide address",
      statusCode: 400,
    };
  }

  const cart = await getActiveCartForUser({
    userId,
  });

  if (cart.items.length === 0) {
    return {
      data: "Cart is empty",
      statusCode: 400,
    };
  }

  const orderItems: IOrderItem[] = [];

  for (const item of cart.items) {
    const product = await productModel.findById(
      item.product
    );

    if (!product) {
      return {
        data: "Product not found",
        statusCode: 400,
      };
    }

    if (product.stock < item.quantity) {
      return {
        data: `Not enough stock for ${product.title}`,
        statusCode: 400,
      };
    }

    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImg: product.image,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    };

    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    orderItems,
    userId,
    total: cart.totalAmount,
    address,
  });

  // Reduce product stock
  for (const item of cart.items) {
    await productModel.findByIdAndUpdate(
      item.product,
      {
        $inc: {
          stock: -item.quantity,
        },
      }
    );
  }

  cart.status = "completed";

  await cart.save();

  return {
    data: order,
    statusCode: 200,
  };
};
