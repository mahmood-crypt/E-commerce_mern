interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface LoginParams {
    email: string;
    password: string;
}
export declare const register: ({ firstName, lastName, email, password }: RegisterParams) => Promise<{
    data: string;
    statusCode: number;
}>;
export declare const login: ({ email, password }: LoginParams) => Promise<{
    data: string;
    statusCode: number;
}>;
export declare const getAllOrders: (userId: string) => Promise<{
    data: (import("mongoose").Document<unknown, {}, import("../models/ordermodel.js").IOrder, {}, import("mongoose").DefaultSchemaOptions> & import("../models/ordermodel.js").IOrder & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[];
    statusCode: number;
}>;
export {};
//# sourceMappingURL=userService.d.ts.map