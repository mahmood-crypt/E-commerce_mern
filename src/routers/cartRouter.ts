import express from "express"
import { getActiveCartForUser } from "../services/cartService.js";
import validateJWT, { type globalRequest } from "../middlewares/validateJWT.js";

const router = express.Router();

router.get("/" ,validateJWT ,async (req : globalRequest,res) => {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({userId});
    res.status(200).send(cart);
})

export default router;