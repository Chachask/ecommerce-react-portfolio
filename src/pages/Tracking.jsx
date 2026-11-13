import axios from 'axios';
import { useEffect, useState } from 'react';

import { Link } from 'react-router'
import './tracking.css';
import { Header } from "../Components/Header"
import { useParams } from 'react-router';
import dayjs from 'dayjs';
export function Tracking({cart}) {
  const {orderId, productId} = useParams();
  const [order, setOrder] = useState(null);
  
   useEffect(() => {
    const fetchOrdersData = async() =>{
      console.log("order id :", orderId)
      const url = `/api/orders/${orderId}?expand=products`;
       console.log("requested url", url)
       const response = await axios.get(url);

  setOrder(response.data);
    };
    fetchOrdersData();
  }, [orderId])
  if (!order){
    return <p>Product not found in this order</p>;
  }
  
  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  })
  
 const deliveryProgress = calculateProgress();
  function calculateProgress(){
    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs
     return   Math.min(
      (timePassedMs / totalDeliveryTimeMs) * 100,
      100
     )
    }
    const isPreparing = deliveryProgress < 33;
    const isShipped = deliveryProgress >=33 && deliveryProgress < 100;
    const isDelivery = deliveryProgress >= 100;
   
  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <Header cart={cart}/>

      <div className="tracking-page">
        <div className="order-tracking">
          
          <Link className="back-to-orders-link link-primary" href="/orders">
            View all orders 
          </Link>

          <div className="delivery-date">
            {deliveryProgress >= 100 ? (
              <p>Arrived on {dayjs(orderProduct.product.estimatedDeliveryTimeMs).format('MMMM D')} </p>
            ) : (
              <p>delivered on {dayjs(orderProduct.product.estimatedDeliveryTimeMs).format('MMMM D')}</p>
            )}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={ `progress-label ${isPreparing ? 'current-status' : " "}` }>
              Preparing
            </div>
            <div className={ `progress-label ${isShipped ? 'current-status' : " "}` } >
              Shipped
            </div>
            <div className={`progress-label ${isDelivery? 'current-status' : " "}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width:`${deliveryProgress}%`}}></div>
          </div>
        </div>
      </div>




    </>
  )
}