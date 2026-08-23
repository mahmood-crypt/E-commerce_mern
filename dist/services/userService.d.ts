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
export {};
//# sourceMappingURL=userService.d.ts.map