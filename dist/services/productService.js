import { productModel } from "../models/productmodel.js";
export const getAllProducts = async () => {
    return await productModel.find();
};
export const seedInitialProducts = async () => {
    const mainProducts = [
        { title: "Dell laptop", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ0QnNYb2MC0sAh4h9e6qhRejHsGe8Ab40J3cAaEW1Yde42VLn5thjVN59NAQaelr4EGkjr5l9OCEpsPDibACwPDhR625iQlsjBMCJwdAC-9PUWVlsk1fewSaRHcyzi6sx3q2zQxCfMxQ&usqp=CAc", price: 200, stock: 80 },
        { title: "Assus laptop", image: "https://www.asus.com/media/global/products/iD8hmbH5n2JDounw/P_setting_xxx_0_90_end_692.png", price: 250, stock: 70 },
        { title: "Apple laptop", image: "https://2b.com.eg/media/catalog/product/cache/d33f1c152d6eb7e8608a208d80f21a14/z/a/za010-1_1_2_1.jpg", price: 300, stock: 60 },
        { title: "TUF gaming laptop", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRWhBYWhCnQMHoO8QlPLUOTZCs79lk-EjlrhF1SF71Rfykmbh82DM9H8cPgwG0r-RMNxDtO90Uhbe-7JgUA1aCAXNksAa5FDw3acLmdKfttUn3ZSZv2EZezutaUKTPfypHkCcpmVA&usqp=CAc", price: 350, stock: 50 },
        { title: "Ipad", image: "https://alsheikhstores.com/cdn/shop/files/Al_Sheikh_Stores_Apple_iPAD_Air_M4_-_11_Inch_or_13_Inch_-_Wi-Fi_or_Celleluar_5G_-_Apple_Official_Local_Warranty_-_Space_Gray.webp?v=1783235479&width=813", price: 250, stock: 90 }
    ];
    const products = await getAllProducts();
    if (products.length === 0) {
        await productModel.insertMany(mainProducts);
    }
};
//# sourceMappingURL=productService.js.map