import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/login'
import Register from '../Pages/register'

const AuthLayout = () => {
  return (
    <div>
       <Routes>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/register' element={<Register/>}/>
       
        </Routes>
    </div>
  )
}

export default AuthLayout
