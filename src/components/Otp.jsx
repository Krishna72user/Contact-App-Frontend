import { useContext, useState  } from "react"
import ContactContext from "../Context/ContactContext"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import ScaleLoader from "react-spinners/ScaleLoader";

export default function OtpVerify(){
    const {sendMail,setEmail,verify,checkUser} = useContext(ContactContext)
    const [loader,setLoader] = useState(false)
    const [sloader,setsLoader] = useState(false)
    const [error,setError] = useState(false)
    const navigate = useNavigate()
    const otp = useRef()
    const email = useRef()
    const [log,setLog] = useState("")
    const [exists,setExists] = useState("")
    const [send,setSend] = useState(false)
    const handleOtp =async (e)=>{
        e.preventDefault()
        if(email.current.value){
            setError(false)
            setEmail(email.current.value)
            const res =await checkUser(email.current.value)
            if(!res){
                setExists("")
                sendMail(email.current.value)
                setsLoader(true)
                document.querySelector(".sendBtn").classList.toggle("hidden")
                setTimeout(()=>{
                    setSend(true)
                    setsLoader(false)
                },2000)
            }
            else{
                setExists("A user with same email already exists")
            }
        }
        else{
            setError(true)
        }
    }
    const mailHandler =async(e)=>{
        e.preventDefault()
        setLoader(true)
        setTimeout(()=>{
            setLoader(false)
        },4000)
        setTimeout(()=>{
            setEmail(null)
        },10000)
        const status = await verify(otp.current.value)
        if(status){
            navigate('/register')
        }
        else{
            setLog("Invalid OTP!")
        }
    }
    const resend = (e)=>{
        e.preventDefault()
        otp.current.value=""
        setLog("")
        sendMail(email.current.value)
    }
    return(
        <>
         <div className="w-[20em] p-2 justify-center flex flex-col items-center shadow-2xl  md:w-[25em] mx-auto mt-[7em] ">
            <div className="md:text-xl text-xl py-2 md:py-4 font-extrabold">VERIFY OTP</div>
            <form onSubmit={mailHandler} className="py-2 md:py-3 flex gap-2 md:gap-4 md:w-[20em] w-[17em] flex-col">
             <div className="font-medium">Email :</div>
             <input ref={email} type="email"  className="p-1 input"id="email"name="email" placeholder="Enter your email." ></input>
           {error && <div className="text-red-500 text-xs font-bold">Please enter a email</div>}
            {send && <div className="py-2 flex gap-2 md:gap-4 md:w-[20em] w-[17em] flex-col">
                    <div className="font-medium">OTP :</div>
                    <input ref={otp}  className="p-1 input"id="otp"name="otp" placeholder="Enter the otp" ></input>
                    <div className="text-red-500 font-medium text-xs">{log}</div>
                   {!loader ? <div className="flex gap-4 mx-auto">
                        <button type="submit"  className="px-2 py-1 bg-blue-500  hover:bg-blue-400 rounded text-white font-bold w-[5em]"> Verify</button>
                        <button onClick={resend} className="px-2 py-1 bg-blue-500  hover:bg-blue-400 rounded text-white font-bold w-[7em]"> Resend OTP</button>
                    </div> :<div className="flex gap-4 mx-auto"> <ScaleLoader
                            color="#52deef"
                            cssOverride={{}}
                            height={25}
                            width={3}/></div>
                    }
             </div>}
            <div className="text-red-500 font-medium text-xs">{exists}</div>
            </form>
           { <button onClick={handleOtp} className="px-2 sendBtn py-1 my-4 bg-blue-500 mx-auto hover:bg-blue-400 rounded text-white  font-bold w-[7em]">Send OTP</button>}
           <div className="my-3">
                {sloader && <ScaleLoader
                color="#52deef"
                cssOverride={{}}
                height={25}
                width={3}
                />}
           </div>
        </div>
        </>
    )
}