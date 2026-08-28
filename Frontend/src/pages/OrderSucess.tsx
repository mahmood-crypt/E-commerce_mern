import { CheckCircleOutlined } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const OrderSucessPage = () => {
  const navigate = useNavigate();

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
      <CheckCircleOutlined sx={{ fontSize: "80px", color: "green" }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h3"> Thank you for your order</Typography>
        <Typography variant="h6">Order will be processed soon </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        HomePage
      </Button>
    </Container>
  );
};
