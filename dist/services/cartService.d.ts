import { type ICart } from "../models/cartmodel.js";
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
}
export declare const getActiveCartForUser: ({ userId, }: GetActiveCartForUser) => Promise<import("mongoose").Document<unknown, {}, ICart, {}, import("mongoose").DefaultSchemaOptions> & ICart & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const addItemToCart: ({ productId, quantity, userId, }: Additemtocart) => Promise<{
    data: string;
    statusCode: number;
} | {
    data: import("mongoose").Document<unknown, {}, ICart, {}, import("mongoose").DefaultSchemaOptions> & ICart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    statusCode: number;
}>;
export declare const updateItemInCart: ({ userId, productId, quantity }: Updateitemincart) => Promise<{
    data: string;
    statusCode: number;
} | {
    data: import("mongoose").Document<unknown, {}, ICart, {}, import("mongoose").DefaultSchemaOptions> & ICart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    statusCode: number;
}>;
export declare const deleteItemFromCart: ({ userId, productId }: DeletedItem) => Promise<{
    data: string;
    statusCode: number;
} | {
    data: import("mongoose").Document<unknown, {}, ICart, {}, import("mongoose").DefaultSchemaOptions> & ICart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    statusCode: number;
}>;
export declare const clearCart: (userId: string) => Promise<{
    data: import("mongoose").Document<unknown, {}, ICart, {}, import("mongoose").DefaultSchemaOptions> & ICart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    statusCode: number;
}>;
interface Checkout {
    userId: string;
    address: string;
}
export declare const checkout: ({ userId, address }: Checkout) => Promise<{
    data: string;
    statusCode: number;
} | {
    data: import("mongoose").Document<unknown, {}, import("../models/ordermodel.js").IOrder, {}, import("mongoose").DefaultSchemaOptions> & import("../models/ordermodel.js").IOrder & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    };
    statusCode: number;
}>;
export {};
//# sourceMappingURL=cartService.d.ts.map