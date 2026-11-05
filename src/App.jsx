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
  useEffect(()=>{
    const getProductsData = async() =>{
      const response = await axios.get("/api/cart-items?expand=product")
      setCart(response.data)
    }
     getProductsData();
          

  }, [])
  

  return (
    <>
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart}/>} />
      <Route path='orders' element={<OrdersPages cart={cart}/>} />
      <Route path="tracking" element={<Tracking />} />
      <Route path="404" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
