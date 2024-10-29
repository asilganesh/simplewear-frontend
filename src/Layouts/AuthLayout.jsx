import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/login'
import Register from '../Pages/register'
import PageNotFound from '../Pages/PageNotFound'

const AuthLayout = () => {
  return (
    <div className=''>
       <Routes>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/register' element={<Register/>}/>
        <Route  path='/*' element={<PageNotFound/>}/>
       
        </Routes>
    </div>
  )
}

export default AuthLayout
