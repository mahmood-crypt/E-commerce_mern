import type {Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/usermodel.js";


export interface globalRequest extends Request {
    user ?: any;
}


const validateJWT = (req : globalRequest,res : Response,next : NextFunction) => {
    const authorizationHeader = req.get("authorization");
    if(!authorizationHeader){
        res.status(403).send("Authorization Header was not provided");
        return;
    }

    const token = authorizationHeader.split(" ")[1];

    if(!token){
        res.status(403).send("Bearer token was not provided");
        return;
    }

    jwt.verify(token,process.env.JWT_SECRET || "",async (err,payload) => {
        if(err){
            res.status(403).send("Invalid Token");
            return;
        }

        if(!payload){
            res.status(403).send("Invalid Token payload");
            return;
        }

        const userPayload = payload as {
            email : string;
            firstName : string;
            lastName : string;
        }

        const user = await userModel.findOne({email : userPayload.email});
        req.user = user;
        next();


    })
}

export default validateJWT;