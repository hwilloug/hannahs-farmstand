import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { productActions } from '../actions/productActions'
import { connectRedux } from "../utils/connect";
import { useParams } from "react-router-dom";
import { Image } from 'mui-image'

export default function ProductPage({state, actions, props}) {

    let { productId } = useParams()
    let productDetail = {}
    if (state.products.productDetail) {
        productDetail = state.products.productDetail[productId]
    }

    useEffect(() => {
        actions.getProduct(productId)
    }, [actions, productId])

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
                {productDetail.quantity < 10 && 
                    <Typography sx={{ fontStyle: 'italic' }}>
                        Only {productDetail.quantity} left!
                    </Typography>
                }
            </Container>
        </Container>
    )
}

export function createProductPage() {
    return connectRedux(
      ProductPage,
      (state) => state,
      productActions
    )
  }