import { Button, Container, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from 'mui-image'
import axios from 'axios'

export default function ProductPage() {

    let { productId } = useParams()
    const [productDetail, setProductDetail] = useState({})  
    const [quantity, setQuantity] = useState(1)

    const onQuantityChange = (event) => {
        const q = event.target.value
        if (q > 0 && q <= productDetail.quantity ) {
            setQuantity(event.target.value)
        }
    }

    const getProductDetail = async (productId) => {
        const result = await axios(`/api/products/${productId}`)
        setProductDetail(result.data)
    }

    useEffect(() => {
        getProductDetail(productId)
    }, [productId])

    return (
        <Container sx={{ p: '50px', display: 'flex' }}>
            <Container>
                <Image src={productDetail.img1} />
            </Container>
            <Container>
                <Typography variant='h4'>{productDetail.name}</Typography>
                <Typography>{productDetail.desc}</Typography>
                <Typography sx={productDetail.discount && {textDecoration: 'line-through'}}>
                    ${productDetail.price && productDetail.price.toFixed(2)}
                </Typography>
                {productDetail.discount && 
                    <Typography color='red'>
                        ${(productDetail.price - productDetail.discount.discount_percent/100 * productDetail.price).toFixed(2)}
                    </Typography>
                }
                {productDetail.quantity < 10 ? 
                    <Typography sx={{ fontStyle: 'italic' }}>
                        Only {productDetail.quantity} left in stock!
                    </Typography>
                    : <Typography>
                        {productDetail.quantity} left in stock.
                    </Typography>
                }
                <Input 
                    type='number' 
                    value={quantity}
                    onChange={onQuantityChange}
                /><Button variant='contained'>Add to cart</Button>
            </Container>
        </Container>
    )
}