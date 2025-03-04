import { useState } from 'react'
import ContactContext from './ContactContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
export const ContactState=(props)=>{
    const navigate = useNavigate();
    const host = import.meta.env.VITE_HOST
    const [alerts,setAlerts]=useState(false)
    const [name,setName] = useState("")
    const [emails,setEmail] = useState("")
    const [log,setLog]=useState("")
    const [contacts,setContacts]= useState([])
    const [auth,setAuth] = useState(false)
    const [modalState,setModal] = useState(false)
    const [edit,setEdit] = useState({})
    const [id,setId] = useState()
    const [alertMsg,setAlertmsg] = useState("")

    const handleName =async(token)=>{
        const res = await axios.post(`${host}/api/auth/getUser`,
            {},{
            headers:{
                'Content-Type':"application/json",
                'authtoken':token
            } 
     } )
        setName(res.data.name)
        return res.data.name
    }
    const checkUser = async(email)=>{
        const res = await axios.post(`${host}/api/auth/getByemail`,{
            email 
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })
        return res.data.success
    }
    const handleLogin =async(email,pass)=>{
        try {
            const res = await axios.post(`${host}/api/auth/login`,{
                email,
                pass
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(res.data.success){
                setLog("")
                const token = res.data.authtoken
                localStorage.setItem('authtoken',token)
                const rname =await handleName(token);
                navigate(`/${rname}`)
                getData()
            }
        } catch (error) {
           setLog(error.response.data.message)
        }
    }
    
    const handleRegister =async(email,name,pass)=>{
        try {
            const res =await axios.post(`${host}/api/auth/signup`,{
                email,
                name,
                pass
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(res.data.success){
                setLog("")
                const token = res.data.authtoken
                localStorage.setItem('authtoken',token)
                const rname =await handleName(token);
                navigate(`/${rname}`)
                return res.data.success
            }
        } catch (error) {
            if(error.response.data.message){
                setLog(error.response.data.message)
                return false
            }
            else{
                setLog(error.response.data.errors.errors[0].msg)
                return false
            }            
        }
    }


    const sendMail =async(email)=>{
        const res = await axios.post(`${host}/api/auth/sendmail`,{
            email
        },{
            headers:{
                "Content-Type":'application/json'
            }
        })
    }

    const verify = async(otp)=>{
        try {
            const res = await axios.post(`${host}/api/auth/verifyemail`,{
                'otp':Number(otp)
            },{
                headers:{
                    "Content-Type":'application/json'
                }
            })  
            return true
        } catch (error) {
            return false
        }

    }
    const addData = async (name,address,number)=>{
        const res =await axios.post(`${host}/api/contacts/addcontact`,{
            name,
            address,
            "phone":Number(number)
        },{
            headers: {
                "Content-Type": "application/json",
                authtoken:localStorage.getItem('authtoken')
            }
        })
        if(res.data.success){
            setAlerts(true)
        }
    }
    const getData =async ()=>{
        const res =await axios.get(`${host}/api/contacts/getallcontact`,{
            headers:{
                'Content-Type':"application/json",
                "authtoken":localStorage.getItem('authtoken')
            }
        })
        setContacts(res.data)
    }
  
    const deleteData =async (id)=>{
        const res =await axios.delete(`${host}/api/contacts/delete/${id}`,{
        headers:{
            'Content-Type':"application/json",
            "authtoken":localStorage.getItem('authtoken')
        }
    })
        getData()
        setTimeout(()=>{
            setAlerts(false)
        },5000)
    }
    const editData=async (name,address,phone,id)=>{
        try {
            const res = await axios.put(`${host}/api/contacts/update/${id}`,{
                name,
                address,
                phone
            },{
                headers:{
                    'Content-Type':"application/json",
                    "authtoken":localStorage.getItem('authtoken')
                }
            })
            if(res.data.success){
                setAlerts(true)
                setTimeout(()=>{
                    setAlerts(false)
                },5000)
            }
        } catch (error) {
            console.log(error)
        }
        getData()
    }
    return(
        <ContactContext.Provider value={{addData,alerts,setAlerts,contacts,getData,deleteData,handleLogin,log,name,handleName,handleRegister,emails,setEmail,sendMail,verify,auth,setAuth,modalState,setModal,edit,setEdit,editData,id,setId,alertMsg,setAlertmsg,setLog,checkUser}}>
            {props.children}
        </ContactContext.Provider>
    )
}