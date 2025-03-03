import Alert from "./Alert"
import ContactContext from "../Context/ContactContext"
import { useContext, useEffect } from "react"
import { useRef } from "react"
import { useLocation } from "react-router-dom"
import { useLoadingBar } from "react-top-loading-bar";
export default function Home(){
    const name = useRef()
    const location = useLocation()
    const address = useRef()
    const number = useRef()
    const {addData,alerts,setAlerts} = useContext(ContactContext)
    const handleAlert=()=>{
        name.current.value=""
        address.current.value=""
        number.current.value=""
        setTimeout(()=>{
            setAlerts(false)
        },5000)   
    }
    const { start, complete } = useLoadingBar({
        color: "red",
        height: 2,
     });
    
    useEffect(()=>{
        setAlerts(false)
        start()
        setTimeout(()=>{
            complete()
        },300)
    },[location.pathname])
    return(
        <>
          {alerts ? <Alert message="Contact Added" col="text-green-400"/>:<></>}
            <div className="w-[80vw] pt-10 py-6 mx-auto">
                <div className="font-bold md:text-3xl text-2xl" >CREATE A NEW CONTACT</div>
                <form onSubmit={(e)=>{e.preventDefault();addData(name.current.value,address.current.value,number.current.value);handleAlert()}} className="flex flex-col pt-6 gap-6" >
                    <div className="font-medium">Name of the person :</div>
                    <input type="text"minLength="5" className="input"  ref={name} id="name" name="name" />
                    <div className="font-medium">Address of the person :</div>
                    <input type="text"minLength="7"className="input"   ref={address} id="address" name="address" />
                    <div className="font-medium">Phone number of the person :</div>
                    <input type="text" minLength="10"className="input"  ref={number} id="phone" name="phone" />
                    <button className="bg-blue-500 w-35 rounded  hover:bg-blue-400 text-white text-sm font-bold px-1 py-2 " type="submit">ADD CONTACT</button>
                </form>
            </div>
        </>
    )
}