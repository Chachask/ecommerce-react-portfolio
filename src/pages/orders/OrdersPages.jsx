
import axios from 'axios'
import { useState, useEffect
 } from 'react'
import { Header } from '../../Components/Header'
import './OrdersPages.css'
import { OrdersGrid } from './OrdersGrid'

export function OrdersPages({ cart }) {
    const [orders, setorders] = useState([])

    useEffect(() => {
        const fetchOrdersData = async() =>{
            const response = await axios.get('/api/orders?expand=products')
             setorders(response.data)

        }
        
        fetchOrdersData();
    }, [])
    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />

            <Header cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

              <OrdersGrid orders={orders} />
            </div>
        </>
    );
}

