import { Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios'

export default function UserOrdersPage(user) {

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const result = await axios.get(`/api/users/${user.id}/orders`)
        setOrders(result.data)
    }

    useEffect(() => {
        getOrders()
    }, [])

    if (orders.length === 0) {
        return (
            <Container>
                No recent orders
            </Container>
        )
    }

    return (
        <Container>
            {orders.map((order) => (
                <Container>
                    <Typography>{order.id} {order.tracking_no ? order.tracking_no : 'Not yet shipped'}</Typography>
                </Container>
            ))}
        </Container>
    )
}