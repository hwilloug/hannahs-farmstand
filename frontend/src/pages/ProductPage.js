import { Button, Container, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from 'mui-image'
import axios from 'axios'
import { getCookie } from "../utils/getCookie";
import Cookies from 'universal-cookie';


export default function ProductPage({user}) {

    const cookies = new Cookies();

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
        const result = await axios(`/api/products/${productId}/`)
        setProductDetail(result.data)
    }

    useEffect(() => {
        getProductDetail(productId)
    }, [productId])

    const submitAddToCart = async () => {
        if (user !== undefined) {
            const data = {
                user_id: user.id,
                product_id: productId,
                quantity
            }
            const currentCart = await axios.get(`/api/users/${user.id}/cart`)
            let found = false
            for (var i in currentCart.data) {
                console.log(currentCart.data[i].product_id, productId)
                if (currentCart.data[i].product_id == productId) {
                    await axios({
                        url: `/api/users/${user.id}/cart/${currentCart.data[i].id}/`,
                        method: 'PUT',
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken')
                        },
                        data
                    })
                    found = true
                    break
                }
            }
            if (!found) {
                await axios({
                    url: `/api/users/${user.id}/cart/`,
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    data
                })
            }
        } else {
            cookies.set('cart', {...cookies.get('cart'), [productId]: {quantity, product_id: productId}}, { path: '/' })
        }
    }

    return (
        <Container sx={{ p: '50px', mx: 'auto', my: '50px', display: 'flex', backgroundColor: 'white', minHeight: '80vh' }}>
            <Container>
                <Image src={productDetail.img1} sx={{border: '1px solid black'}} />
            </Container>
            <Container>
                <Typography variant='h4' sx={{mb: '20px'}}>{productDetail.name}</Typography>
                <Typography>{productDetail.desc}</Typography>
                <Container disableGutters sx={{display: 'flex', gap: '10px', my: '20px'}}>
                    <Typography sx={productDetail.discount && {textDecoration: 'line-through'}}>
                        ${productDetail.price && productDetail.price.toFixed(2)}
                    </Typography>
                    {productDetail.discount && 
                        <Typography color='red'>
                            ${(productDetail.price - productDetail.discount.discount_percent/100 * productDetail.price).toFixed(2)}
                        </Typography>
                    }
                </Container>
                {productDetail.quantity < 10 ? 
                    <Typography sx={{ fontStyle: 'italic' }}>
                        Only {productDetail.quantity} {productDetail.sku} left in stock!
                    </Typography>
                    : <Typography>
                        {productDetail.quantity} {productDetail.sku} left in stock.
                    </Typography>
                }
                <Container disableGutters sx={{mt: '20px', display: 'flex', alignItems: 'center'}}>
                    <Input 
                        type='number' 
                        value={quantity}
                        onChange={onQuantityChange}
                        sx={{"& input": {textAlign: "center"}}}
                    /><Typography sx={{ml: '10px'}}>{productDetail.sku}</Typography>
                </Container>
                <Button variant='contained' color='secondary' sx={{mt: '20px'}} onClick={submitAddToCart}>Add to cart</Button>
            </Container>
        </Container>
    )
}