import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { useCart } from "../context/cartContext";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: string;
}

const ProductCard = ({ _id,title, image, price }: Props) => {

  const {addItemToCart} = useCart()

  return (
    <Card>
      <CardMedia sx={{ height: 400 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {`Price : ${price} EGP`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => addItemToCart(_id)} variant="contained" size="small">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
