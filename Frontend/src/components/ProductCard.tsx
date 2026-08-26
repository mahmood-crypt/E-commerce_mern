import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";


interface Props {
    _id : string;
    title : string;
    image : string;
    price : string;
}



 const ProductCard = ({title,image,price} : Props) => {
  return (
    <Card>
      <CardMedia
        sx={{height : 400}}
        image={image}
        title = {title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {`Price : ${price} EGP`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" >Add to cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;