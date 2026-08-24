interface GetActiveCartForUser {
    userId: string;
}
export declare const getActiveCartForUser: ({ userId }: GetActiveCartForUser) => Promise<import("mongoose").Document<unknown, {}, import("../models/cartmodel.js").ICart, {}, import("mongoose").DefaultSchemaOptions> & import("../models/cartmodel.js").ICart & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export {};
//# sourceMappingURL=cartService.d.ts.map