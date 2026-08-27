import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "../context/AuthContext";
import { data } from "react-router-dom";

const CartPage = () => {

    const {token} = useAuth()
    const [cart,setCart] = useState();
    const [err,setErr] = useState("")

    useEffect(() => {
        if(!token){
            return;
        }

        const FetchCart = async () => {
            const Response = await fetch(`${BASE_URL}/cart`,{
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            });

            if(! Response.ok){
                setErr("Failed to fetch user cart");
            }

            const data = await Response.json();
            setCart(data);

        };
        FetchCart();
    },[token]);

    if (err) {
        return <>{err}</>
    }

    console.log({cart});
    return (
        <Container sx={{mt : 2}}>
            <Typography variant="h3">My Cart</Typography>
        </Container>
    )
}


export default CartPage;