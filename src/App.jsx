import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.scss'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import AdminLayout from './Layouts/AdminLayout'


function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/auth/*' element={<AuthLayout/>}/>
      <Route path='/adminPanel/*' element={<AdminLayout/>}/>
      <Route path="/*" element={<MainLayout/>}/>
      
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
