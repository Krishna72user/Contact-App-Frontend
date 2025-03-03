import '../App.css'
import { NavLink } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { useContext,useState } from 'react';
import ContactContext from '../Context/ContactContext';
import { HiMiniBarsArrowDown, HiMiniBarsArrowUp } from "react-icons/hi2";

export default function Navbar(){
  const location = useLocation();
  const [barStatus,setBar] = useState(false)
  const changeBar=()=>{
    const icon = document.querySelector('#icon')
    if(barStatus){
      setBar(false)
      icon.classList.replace('opened','closed')   
    }
    else{
      setBar(true)
      if(icon.classList.contains('initial')){
        icon.classList.replace('initial',"opened")   
      }
      else if(icon.classList.contains('closed')){
        icon.classList.replace('closed',"opened")   

      }
      // if(icon.classList.contains('opened'))
      }
    }
  
    const {name} =useContext(ContactContext)
    return (
        <>

        <nav className=" h-15 fixed top-0 w-[100vw] text-[13px] font-medium flex justify-between items-center bg-black">
            <div className="ml-3 text-white text-xl md:text-2xl">ContactFlow</div>
            <div className="text-gray-400 flex gap-5 mr-3 items-center">
              {localStorage.getItem('authtoken') &&  <NavLink className={location.pathname===`/${name}`?"text-white":""} to={`/${name}`}end>HOME</NavLink>}
               {localStorage.getItem('authtoken') && <NavLink className={location.pathname===`/contacts/${name}`?"text-white":""} to={`/contacts/${name}`}end>MY CONTACTS</NavLink>}
              {!localStorage.getItem('authtoken') &&  <NavLink className={location.pathname==='/login'?"text-white":""} to='/login'end>LOGIN</NavLink>}
               {!localStorage.getItem('authtoken') && <NavLink className={location.pathname==='/register'?"text-white":""} to='/register'end>REGISTER </NavLink>}
              {localStorage.getItem('authtoken') &&  <NavLink  to='/login' end><button onClick={()=>{localStorage.removeItem('authtoken')}} className="px-3 py-2 hover:bg-red-400 text-white bg-red-500">LOGOUT</button></NavLink>}
            </div>
        </nav>


        <nav className="z-10 h-15 md:hidden fixed top-0 w-[100vw] text-[13px] font-medium flex justify-between items-center bg-black">
            <div className="ml-3 text-white text-xl md:text-2xl">ContactFlow</div>
            <div className="text-gray-400 flex gap-5 mr-3 items-center">
              {localStorage.getItem('authtoken') && <div onClick={changeBar} className='pr-6 pt-3'>{!barStatus ? <HiMiniBarsArrowDown color='white' size={33}/>:<HiMiniBarsArrowUp color='white' size={33}/>}</div >}
              {!localStorage.getItem('authtoken') &&  <NavLink className={location.pathname==='/login'?"text-white":""} to='/login'end>LOGIN</NavLink>}
               {!localStorage.getItem('authtoken') && <NavLink className={location.pathname==='/register'?"text-white":""} to='/register'end>REGISTER </NavLink>}
            </div>
        </nav>
        {localStorage.getItem('authtoken') &&   <div id='icon' className='flex text-gray-400 text-[14px] font-medium flex-col absolute p-8 top-14 gap-8 initial bg-black/70 h-50 right-0'>
              {localStorage.getItem('authtoken') &&  <NavLink className={location.pathname===`/${name}`?"text-white":""} to={`/${name}`}end>HOME</NavLink>}
               {localStorage.getItem('authtoken') && <NavLink className={location.pathname===`/contacts/${name}`?"text-white":""} to={`/contacts/${name}`}end>MY CONTACTS</NavLink>}
              {localStorage.getItem('authtoken') &&  <NavLink  to='/login' end><button onClick={()=>{localStorage.removeItem('authtoken')}} className="">LOGOUT</button></NavLink>}
            </div>}
        <div className='h-15'></div>
        </>
    )
}