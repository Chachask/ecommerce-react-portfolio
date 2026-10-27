import axios from 'axios'
import {Routes, Route} from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage} from './pages/checkout/CheckoutPage'
import { OrdersPages } from './pages/OrdersPages' 
import './App.css'
import { Tracking } from './pages/Tracking'
import { NotFound } from './pages/NotFound'
import { useEffect, useState } from 'react'

function App() {
  const [cart, setCart] = useState([]);
  useEffect(()=>{
     axios.get("/api/cart-items?expand=product")
            .then((response => {
                setCart(response.data)
            }));

  }, [])
  

  return (
    <>
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart}/>} />
      <Route path='orders' element={<OrdersPages />} />
      <Route path="tracking" element={<Tracking />} />
      <Route path="404" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
