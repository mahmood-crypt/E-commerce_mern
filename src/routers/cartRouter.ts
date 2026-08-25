import express from "express"
import { addItemToCart, clearCart, deleteItemFromCart, getActiveCartForUser, updateItemInCart } from "../services/cartService.js";
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

router.delete("/items/:productId", validateJWT, async (req : globalRequest,res) => {
    const userId = req?.user?._id;
    const {productId} = req.params;
    const {data,statusCode} = await deleteItemFromCart({userId,productId});
    res.status(statusCode).send(data);

})

router.delete("/", validateJWT, async (req : globalRequest,res) => {
    const userId = req?.user?._id;
    const {data,statusCode} = await clearCart(userId);
    res.status(statusCode).send(data);

})

export default router;