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
      </Routes>
      
      <Footer/>
    </div>
  )
}

export default MainLayout