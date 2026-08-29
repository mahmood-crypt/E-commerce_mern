import express from "express";
import { getAllOrders, login, register } from "../services/userService.js";
import validateJWT, { type globalRequest } from "../middlewares/validateJWT.js";
const router = express.Router();

router.post("/register", async (req,res) => {
    const {firstName , lastName,email,password} = req.body;
    const {data,statusCode} = await register({firstName , lastName,email,password});
    res.status(statusCode).json(data);
})

router.post("/login", async (req,res) => {
    const {email,password} = req.body;
    const {data,statusCode} = await login({email,password});
    res.status(statusCode).json(data);
})

router.get("/my-orders",validateJWT, async (req : globalRequest,res) => {
    const userId = req?.user?._id;
    const {data , statusCode} = await getAllOrders(userId);
    res.status(statusCode).send(data);
})

export default router;