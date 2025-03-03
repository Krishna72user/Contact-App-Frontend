import { useEffect, useRef,useState } from "react";
import { useContext } from "react";
import ContactContext from "../Context/ContactContext";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Register(){
    const navigate= useNavigate()
    const [loader,setLoader] = useState(false)
    const {handleRegister,log,emails,setAuth} = useContext(ContactContext)
    const regHandler =async(e)=>{
        e.preventDefault();
        setLoader(true)
        setTimeout(()=>{
            setLoader(false)
        },3000)
        const st =await  handleRegister(emails,name.current.value,pass.current.value)
        if(st){
            setAuth(true)
            navigate(`/${name.current.value}`)
        }
    }

    useEffect(()=>{
        if(!emails){
            navigate('/verify')
        }
    },[navigate])

    const name = useRef()
    const pass = useRef()
    return (
        <>
             <div className="w-[20em] p-2 justify-center flex flex-col items-center shadow-2xl  md:w-[30em] mx-auto mt-[1.5em] ">
                <div className="md:text-xl text-xl py-2 md:py-4 font-extrabold">REGISTER</div>
                <form onSubmit={regHandler} className="py-2 md:py-3 flex gap-2 md:gap-4 md:w-[22em] w-[15em] flex-col">
                    <div className="font-medium">Name :</div>
                    <input ref={name} className="p-1 input"id="email"name="email" placeholder="Enter your name." ></input>
                    <div className="font-medium">Email :</div>
                    <input value={emails} onChange={(e)=>{e.target.value = emails}} className="p-1 input"id="email"name="email" placeholder="Enter your email." ></input>
                    <div className="font-medium">Password :</div>
                    <input ref={pass}  className="p-1 input"id="pass"name="pass" placeholder="Enter your password." ></input>
                    <div className="text-red-500 text-xs font-medium">{log}</div>
                  {!loader && <button type="submit"  className="px-2 py-1 mx-auto mb-2 md:mb-4 bg-blue-500 hover:bg-blue-400 text-white font-bold w-[5em]" >Register</button>}
                    {loader &&<div  className="px-2 py-1 mx-auto"> <ScaleLoader
                    color="#52deef"
                    cssOverride={{}}
                    height={25}
                    width={3}
                    /></div>}
                </form>
            </div>
        </>
    )
}