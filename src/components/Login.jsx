import { useContext, useEffect, useState } from "react"
import ContactContext from "../Context/ContactContext"
import { useRef } from "react"
import { NavLink } from "react-router-dom"
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Login(){
    const sub = useRef(null)
    const {handleLogin,log,setLog} = useContext(ContactContext)
    const email = useRef(null)
    const pass = useRef(null)
    const [loader,setLoader] = useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setLog('')
        },5000)
    },[log])
    return (
        <>
            <div className="w-[20em] p-2 py-4 justify-center flex flex-col items-center shadow-2xl mt-[3em] md:w-[30em] mx-auto md:mt-[6em] ">
                <div className="md:text-xl text-xl py-4 font-extrabold">LOGIN</div>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                     sub.current.classList.add("hidden")
                     setLoader(true)

                     handleLogin(email.current.value,pass.current.value)
                     setTimeout(()=>{
                        setLoader(false)
                        sub.current.classList.remove("hidden")
                     },2500)
                     }} className="py-2 md:py-3 flex gap-4 md:w-[22em] w-[15em] flex-col">
                    <div className="font-medium">Email :</div>
                    <input ref={email} className="p-1 input"id="email"name="email" placeholder="Enter your email" ></input>
                    <div className="font-medium">Password :</div>
                    <input ref={pass}  className="p-1 input"id="pass"name="pass" placeholder="Enter your password" ></input>
                    <div className="text-red-500 text-xs font-medium">{log}</div>
                    <button type="submit" ref={sub} className="px-2 py-1 mx-auto rounded  bg-blue-500 hover:bg-blue-400 text-white font-bold w-[5em]" >Login</button>

                </form>
                <div className="my-3">
                {loader && <ScaleLoader
                color="#52deef"
                cssOverride={{}}
                height={25}
                width={3}
                />}
                </div>
                <div>Don't have a account? <NavLink className="text-blue-600 underline" to={'/register'} end>Sign in</NavLink></div>
            </div>
        </>
    )
}