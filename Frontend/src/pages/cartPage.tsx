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
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    deleteItem,
  } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      deleteItem(productId);
      return;
    }

    updateItemInCart(productId, quantity);
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Typography variant="h3">My Cart</Typography>

      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {cartItems.length === 0 ? (
          <Typography variant="h5">Your cart is empty.</Typography>
        ) : (
          cartItems.map((item) => (
            <Box
              key={item.productId}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                border: 1,
                borderColor: "#bab8b8",
                borderRadius: 5,
                padding: 3,
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

                <Box>
                  <Typography variant="h5">
                    {item.title}
                  </Typography>

                  <Typography>
                    {item.quantity} x {item.unitPrice} EGP
                  </Typography>

                  <Button
                    onClick={() => deleteItem(item.productId)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </Box>

              <ButtonGroup variant="contained">
                <Button
                  onClick={() =>
                    handleQuantity(
                      item.productId,
                      item.quantity + 1,
                    )
                  }
                >
                  +
                </Button>

                <Button
                  onClick={() =>
                    handleQuantity(
                      item.productId,
                      item.quantity - 1,
                    )
                  }
                >
                  -
                </Button>
              </ButtonGroup>
            </Box>
          ))
        )}

        <Box>
          <Typography variant="h4">
            Total Amount: {totalAmount.toFixed(2)} EGP
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
