import { Box, Button, colors, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/cartContext";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();

  const addressref = useRef<HTMLInputElement>(null);

  const renderItems = () => {
    return (
      <Box
        sx={{
          margin : 4,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          border : 1,
          borderColor: "#bab8b8",
          borderRadius: 5,
        }}
      >
        {cartItems.map((item) => (
          <Box
            key={item.productId}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 3
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                width : "100%"
              }}
            >
              <img
                width={75}
                height={75}
                src={item.image}
                alt={item.title}
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <Box sx={{width : "100%",display : "flex" , flexDirection : "flex" , alignItems : "center" , justifyContent : "space-between" ,  }}>
                <Typography variant="h5">{item.title}</Typography>

                <Typography>
                  {item.quantity} x {item.unitPrice} EGP
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Container fixed sx={{ padding : 4 , mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3">Checkout</Typography>
        <Button
        onClick={() => {
            navigate("/cart")
        }}
          variant="contained"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <>Return to checkout</>
          <ShoppingCart />
        </Button>
      </Box>

      {renderItems()}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap : 5          
        }}
      >
        <TextField sx={{width : "70%"}} inputRef={addressref}  label = "Delivery address" />
        <Typography variant="h4">
          Total Amount: {totalAmount.toFixed(2)} EGP
        </Typography>
        <Button variant="contained" sx={{ width : "60%" , backgroundColor : "green"}} >
            confirm payment
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
