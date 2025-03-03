import './App.css'
import { Routes,Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Contacts from './components/Contacts'
import Login from './components/Login'
import Register from './components/Register'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import ContactContext from './Context/ContactContext'
import OtpVerify from './components/Otp'
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const {handleName,name,auth} =useContext(ContactContext)
  useEffect(()=>{
    if(!localStorage.getItem('authtoken')){
        if(location.pathname!=='/register' && location.pathname!=='/verify' ){
        navigate('/login')
        }
    }
  },[location.pathname])
  useEffect(()=>{
    if(localStorage.getItem('authtoken'))
    handleName(localStorage.getItem('authtoken'))
},[])

useEffect(()=>{
  if(name)
    navigate(`/${name}`)
  },[name]) // Naviagate when name is updated
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/:name' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/contacts/:name' element={<Contacts/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify' element={<OtpVerify/>}/>
      </Routes>
    </>
  )
}

export default App
