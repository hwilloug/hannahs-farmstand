import { Card, CardContent, Container, CardMedia, Typography, Link } from "@mui/material";
import { useEffect } from "react";
import { productActions } from '../actions/productActions'
import { connectRedux } from "../utils/connect";

export default function LandingPage({state, actions, props}) {

    useEffect(() => {
        actions.getProducts()
    }, [actions])

    return (
        <Container sx={{ p: '50px', display: 'flex', flexWrap: 'wrap' }}>
            {state.products.allProducts && state.products.allProducts.map((product) => (
                <Link href={`/products/${product.id}/`} sx={{textDecoration: 'none'}} key={product.id}>
                    <Card sx={{ minWidth: 325, m: '20px' }}>
                        <CardMedia
                            sx={{ height: 240 }}
                            image={product.img1}
                            title={product.name}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Typography sx={product.discount && {textDecoration: 'line-through'}}>
                            ${product.price.toFixed(2)}
                        </Typography>
                        {product.discount && 
                            <Typography color='red'>
                                ${(product.price - product.discount.discount_percent/100 * product.price).toFixed(2)}
                            </Typography>
                        }
                        {product.quantity < 10 && 
                            <Typography sx={{ fontStyle: 'italic' }}>
                                Only {product.quantity} left!
                            </Typography>
                        }
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </Container>
    )
}

export function createLandingPage() {
    return connectRedux(
      LandingPage,
      (state) => state,
      productActions
    )
  }