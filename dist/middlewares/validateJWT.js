import jwt from "jsonwebtoken";
import { userModel } from "../models/usermodel.js";
const validateJWT = (req, res, next) => {
    const authorizationHeader = req.get("authorization");
    if (!authorizationHeader) {
        res.status(403).send("Authorization Header was not provided");
        return;
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        res.status(403).send("Bearer token was not provided");
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
        if (err) {
            res.status(403).send("Invalid Token");
            return;
        }
        if (!payload) {
            res.status(403).send("Invalid Token payload");
            return;
        }
        const userPayload = payload;
        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();
    });
};
export default validateJWT;
//# sourceMappingURL=validateJWT.js.map