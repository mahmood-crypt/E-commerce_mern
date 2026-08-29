import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";

export const MyOrderspage = () => {
  const navigate = useNavigate();
  const { myOrders, getMyOrders } = useAuth();

  useEffect(() => {
    if (myOrders.length === 0) {
      getMyOrders();
    }
  }, []);

  return (
    <Container
      fixed
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        mt: 2,
        gap: 2,
      }}
    >
      <Typography variant="h4">My Orders</Typography>

      {myOrders.map(({ _id, address, total, orderItems }) => (
        <Box
          key={_id}
          sx={{
            border: 1,
            padding: 2,
            borderRadius: 3,
            borderColor: "#a2a0a0",
            width: "100%",
          }}
        >
          <Typography>Id: {_id}</Typography>
          <Typography>Address: {address}</Typography>
          <Typography>Items: {orderItems.length}</Typography>
          <Typography>
            Total: {total.toFixed(2)} EGP
          </Typography>
        </Box>
      ))}

      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
        startIcon={<HomeIcon />}
      >
        <Typography>HomePage</Typography>
      </Button>
    </Container>
  );
};
