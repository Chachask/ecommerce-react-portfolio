import {Routes, Route} from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage} from './pages/checkout/CheckoutPage'
import { OrdersPages } from './pages/OrdersPages' 
import './App.css'
import { Tracking } from './pages/Tracking'
import { NotFound } from './pages/NotFound'
function App() {
  

  return (
    <>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage />} />
      <Route path='orders' element={<OrdersPages />} />
      <Route path="tracking" element={<Tracking />} />
      <Route path="404" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
