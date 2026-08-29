import { userModel } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/ordermodel.js";
//functions
const generateJWT = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET || "");
};
export const register = async ({ firstName, lastName, email, password }) => {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
        return { data: "user already exists", statusCode: 400 };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    return { data: generateJWT({ firstName: newUser.firstName, lastname: newUser.lastName, email: newUser.email }), statusCode: 200 };
};
export const login = async ({ email, password }) => {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
        return { data: "Incorrect Email or  Password", statusCode: 400 };
    }
    const passwordmatch = await bcrypt.compare(password, findUser.password);
    if (passwordmatch) {
        return { data: generateJWT({ email: findUser.email, firstName: findUser.firstName, lastName: findUser.lastName }), statusCode: 200 };
    }
    return { data: "Incorrect Email or  Password", statusCode: 400 };
};
export const getAllOrders = async (userId) => {
    return { data: await orderModel.find({ userId }), statusCode: 200 };
};
//# sourceMappingURL=userService.js.map