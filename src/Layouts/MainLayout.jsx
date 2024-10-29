import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Collection from '../Pages/Collection'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Cart from '../Pages/Cart'
import MyOrders from '../Pages/MyOrders'
import ProductDetails from '../Pages/ProductDetails'
import Checkout from '../Pages/Checkout'
import PageNotFound from '../Pages/PageNotFound'

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
     
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/collection' element={<Collection/>}/>
        <Route  path='/about' element={<About/>}/>
        <Route  path='/contact' element={<Contact/>}/>
        <Route  path='/cart' element={<Cart/>}/>
        <Route  path='/myOrders' element={<MyOrders/>}/>
        <Route  path='/productDetails/:id' element={<ProductDetails/>}/>
        <Route  path='/place-order' element={<Checkout/>}/>
        <Route  path='/*' element={<PageNotFound/>}/>
        
      </Routes>
      
      <Footer/>
    </div>
  )
}

export default MainLayout
