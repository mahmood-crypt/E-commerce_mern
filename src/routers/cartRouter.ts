import express from "express"
import { addItemToCart, getActiveCartForUser, updateItemInCart } from "../services/cartService.js";
import validateJWT, { type globalRequest } from "../middlewares/validateJWT.js";

const router = express.Router();

router.get("/" ,validateJWT ,async (req : globalRequest,res) => {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({userId});
    res.status(200).send(cart);
})

router.post("/items" ,validateJWT,async (req : globalRequest,res) => {

    const {productId,quantity} = req.body;
    const userId = req?.user?._id;

    const {data,statusCode} = await addItemToCart({userId,productId,quantity});
    res.status(statusCode).send(data);


})

router.put("/items" , validateJWT, async (req : globalRequest,res) => {
    const {productId,quantity} = req.body;
    const userId = req?.user?._id;
    const {data,statusCode} = await updateItemInCart({userId,productId,quantity});
    res.status(statusCode).send(data);

})

export default router;