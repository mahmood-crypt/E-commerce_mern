import { userModel } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const generateJWT = (data) => {
    return jwt.sign(data, "OfU/HmYEFUonlcL6gha0gTMFnCmqTyTKhP/GGr3Q69E=");
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
//# sourceMappingURL=userService.js.map