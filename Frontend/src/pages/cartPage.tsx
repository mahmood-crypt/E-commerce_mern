import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography,
} from "@mui/material";
import { useCart } from "../context/cartContext";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const { cartItems, totalAmount } = useCart();

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Typography variant="h3">My Cart</Typography>
      <Box sx={{ padding : 4 , display : "flex"  , flexDirection : "column" ,gap : 4 }}>
        {cartItems.map((i) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                border: 1,
                borderColor :"#bab8b8",
                borderRadius : 5,
                padding : 3   
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <img width={75} src={i.image} />
                <Box>
                  <Typography variant="h5">{i.title}</Typography>
                  <Typography>{`${i.quantity} x ${i.unitPrice} EGP`}</Typography>
                  <Button sx={{ color: "red" }}>
                    <DeleteIcon />
                  </Button>
                </Box>
              </Box>
              <ButtonGroup variant="contained">
                <Button>+</Button>
                <Button>-</Button>
              </ButtonGroup>
            </Box>
          );
        })}
        <Box>
            <Typography  variant="h4">Total Amount : {totalAmount.toFixed(2)} EGP</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
