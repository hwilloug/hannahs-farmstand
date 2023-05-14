import { Container, Typography, Input, Link, Button, cardHeaderClasses, Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios'
import Image from "mui-image";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { getCookie } from "../utils/getCookie";
import Cookies from "universal-cookie";

export default function CartPage({user}) {

    const [cartDetail, setCartDetail] = useState([])
    const [productDetails, setProductDetails] = useState({})
    const [total, setTotal] = useState((0).toFixed(2))
    const [subTotal, setSubTotal] = useState((0).toFixed(2))
    const cookies = new Cookies()

    const getCartFromCookie = () => {
        const cart = cookies.get('cart')
        let transformedCart = []
        for (var item in cart) {
            transformedCart.push(cart[item])
        }
        return transformedCart
    }

    const getCartDetail = async () => {
        if (user !== undefined) {
            const result = await axios(`/api/users/${user.id}/cart/`)
            const cookieCart = getCartFromCookie()
            for (var idx in cookieCart) {
                cookieCart[idx]['user_id'] = user.id
                if (!result.data.includes(cookieCart[idx])) {
                    await axios({
                        url: `/api/users/${user.id}/cart/`,
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken')
                        },
                        data: cookieCart[idx]
                    })
                }
            }
            cookies.remove('cart')
            const fullResult = result.data.concat(cookieCart)
            setCartDetail(fullResult || [])
            for (var i in fullResult) {
                await getProductDetail(fullResult[i].product_id)
            }
        } else {
            const cart = getCartFromCookie()
            setCartDetail(cart)
            for (var i in cart) {
                await getProductDetail(cart[i].product_id)
            }
        }
    }

    useEffect(() => {
        getCartDetail()
    }, [user])

    useEffect(() => {
        getSubTotal()
        getTotal()
    }, [productDetails, cartDetail])

    const getProductDetail = async (productId) => {
        if (productDetails[productId] === undefined && productId !== undefined) {
            const result = await axios(`/api/products/${productId}`)
            setProductDetails(prevProducts => ({
                ...prevProducts,
                [productId]: result.data
            }))
        }
    }

    const handleDeleteCartItem = async (item) => {
        if (user !== undefined) {
            await axios({
                url: `/api/users/${user.id}/cart/${item.id}`,
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            })
        } else {
            const cookie = cookies.get('cart')
            delete cookie[item.product_id]
            cookies.set('cart', cookie)
        }
        getCartDetail()
    }

    const handleQuantityChange = async (item, quantity, maxQuantity) => {
        if (quantity <= maxQuantity && quantity > 0 && user !== undefined) {
            await axios({
                url: `/api/users/${user.id}/cart/${item.id}/`,
                method: 'PUT',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                data: {
                    quantity,
                    product_id: item.product_id,
                    user_id: item.user_id
                }
            })
            getCartDetail()
        } else if (quantity <= maxQuantity && quantity > 0) {
            const cookie = cookies.get('cart')
            cookies.set('cart', {...cookie, [item.product_id]: {...cookie[item.product_id], quantity}})
            getCartDetail()
        }
    }

    const getSubTotal = () => {
        let total = 0
        for (var i in cartDetail) {
            if (productDetails && productDetails[cartDetail[i].product_id]) {
                total += cartDetail[i].quantity * productDetails[cartDetail[i].product_id].price
            }
        }
        setSubTotal(total.toFixed(2))
    }

    const getTotal = () => {
        let total = 0
        for (var i in cartDetail) {
            if (productDetails && productDetails[cartDetail[i].product_id]) {
                let subtotal = cartDetail[i].quantity * productDetails[cartDetail[i].product_id].price
                if (productDetails[cartDetail[i].product_id].discount.active) {
                    subtotal -= productDetails[cartDetail[i].product_id].discount.discount_percent/100 * subtotal
                }
                total += subtotal
            }
        }
        setTotal(total.toFixed(2))
    }

    const calculatePrice = (price, quantity, discount) => {
        return (quantity * price - discount/100).toFixed(2)
    }

    const handleCheckout = () => {
        console.log('checking out')
    }

    return (
        <Container sx={{p: '50px', minHeight: '80vh'}}>
            <Typography variant="h5" sx={{mb: '25px'}}>Cart</Typography>
            {cartDetail.length === 0 && <Typography>Your cart is empty.</Typography>}
            {cartDetail.map((item) => {
                if (productDetails[item.product_id]) {
                    return (
                        <Container sx={{backgroundColor: 'white', p: '25px', m: '20px', display: 'flex', alignItems: 'center', gap: '100px', flexWrap: 'wrap'}}>
                            <Image src={productDetails[item.product_id].img1} width={100} />
                            <Typography width="200px">{productDetails[item.product_id].name}</Typography>
                            <Input 
                                type='number' 
                                value={item.quantity} 
                                sx={{"& input": {textAlign: "center"}}} 
                                onChange={(e) => handleQuantityChange(item, e.target.value, productDetails[item.product_id].quantity)}
                            />
                            <Box>
                                <Typography sx={{textDecoration: productDetails[item.product_id].discount.active ? 'line-through' : 'none'}}>
                                    ${(productDetails[item.product_id].price * item.quantity).toFixed(2)}
                                </Typography>
                                { productDetails[item.product_id].discount.active && 
                                    <Typography sx={{color: 'red'}}>
                                        ${calculatePrice(productDetails[item.product_id].price, item.quantity, productDetails[item.product_id].discount.discount_percent)}
                                    </Typography>
                                }
                            </Box>
                            <Link sx={{color: 'black'}} onClick={() => handleDeleteCartItem(item)}><DeleteForeverIcon /></Link>
                        </Container>
                    )
                }
            })}
            <Container align="right">
                <Typography sx={{mb: '10px'}}>Subtotal: ${subTotal}</Typography>
                {subTotal - total && <Typography sx={{mb: '10px', color: 'red', textDecoration: 'italic'}}>Sale: -${(subTotal-total).toFixed(2)}</Typography>}
                <Typography sx={{mb: '10px'}}>Total: ${total}</Typography>
                <Button variant="contained" color="secondary" onClick={handleCheckout}>Checkout</Button>
            </Container>
        </Container>
    )
}