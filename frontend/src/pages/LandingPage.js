import { Card, CardContent, Container, CardMedia, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios'

export default function LandingPage() {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const result = await axios.get('/api/products')
        setProducts(result.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Container sx={{ p: '50px', display: 'flex', flexWrap: 'wrap' }}>
            {products.map((product) => (
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