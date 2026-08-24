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
interface GetActiveCartForUser {
    userId: string;
}
export declare const getActiveCartForUser: ({ userId, }: GetActiveCartForUser) => Promise<import("mongoose").Document<unknown, {}, import("../models/cartmodel.js").ICart, {}, import("mongoose").DefaultSchemaOptions> & import("../models/cartmodel.js").ICart & Required<{
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
    data: import("mongoose").Document<unknown, {}, import("../models/cartmodel.js").ICart, {}, import("mongoose").DefaultSchemaOptions> & import("../models/cartmodel.js").ICart & Required<{
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
    data: import("mongoose").Document<unknown, {}, import("../models/cartmodel.js").ICart, {}, import("mongoose").DefaultSchemaOptions> & import("../models/cartmodel.js").ICart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    statusCode: number;
}>;
export {};
//# sourceMappingURL=cartService.d.ts.map