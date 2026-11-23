import axios from 'axios'
import {Routes, Route} from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage} from './pages/checkout/CheckoutPage'
import { OrdersPages } from './pages/orders/OrdersPages' 
import './App.css'
import { Tracking } from './pages/Tracking'
import { NotFound } from './pages/NotFound'
import { useEffect, useState } from 'react'

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async() =>{
    try {
      const response = await axios.get("/api/cart-items?expand=product")
      console.log("Updated cart from API:", response.data);
      setCart(response.data)

    }catch(error){
      console.error("Failed to load cart", error)
    }
      
    };
  useEffect(()=>{
    
    loadCart();
    
  }, [])
  

  return (
    <>
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
      <Route path='orders' element={<OrdersPages cart={cart}/>} />
      <Route path="tracking/:orderId/:productId" element={<Tracking cart={cart}/>} />
      <Route path="404" element={<NotFound cart={cart}/>} />
    </Routes>
    </>
  )
}

export default App
