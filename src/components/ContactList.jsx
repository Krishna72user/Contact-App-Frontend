import '../App.css'
import { useLocation } from 'react-router-dom'
import { useContext,useEffect } from "react"
import ContactContext from "../Context/ContactContext"
export default function ContactList({text}){
    const renderContacts=ele=>ele.name.includes(text.toUpperCase()||text.toLowerCase())
    const location = useLocation()
    const {contacts,deleteData,setAlerts,setModal,setEdit,setId,setAlertmsg} = useContext(ContactContext)
    useEffect(()=>{
        setAlerts(false)
    },[location.pathname])
    return(
        <div className="py-4">
            <div className="flex p-4 bg-black text-xs font-medium text-white w-[80vw]">
                <div className="w-[19vw]  mr-[2vw]">NAME</div>
                <div className="w-[19vw]  mr-[2vw]">ADDRESS</div>
                <div className="w-[15vw]">PHONE</div>
            </div>
            {contacts.length===0 &&
            <div className='flex items-center border-b-2 text-md font-medium text-gray-400 w-[80vw]'>
                <div className='py-3'>NO CONTACTS FOUND!</div>
            </div> 
            } 
            {contacts.filter(renderContacts).map((ele)=>
                <div key={ele._id} className="flex items-center border-b-2 text-xs font-medium text-gray-400 w-[80vw]">
                    <div className="w-[19vw] mr-[2vw] md:ml-4 text-black">{ele.name}</div>
                    <div className="w-[19vw] mr-[2vw]">{ele.address}</div>
                    <div className="w-[15vw]">{ele.phone}</div>
                    <div className='flex py-2 gap-1 md:gap-3 flex-col md:flex-row ml-6'>
                        <div onClick={
                        ()=>{
                            setModal(true)
                            setId(ele._id)
                            setEdit({name:ele.name,address:ele.address,phone:ele.phone}) 
                        }}  className='px-2 py-1.5  text-white bg-blue-500 hover:bg-blue-400 rounded-xl hover:cursor-pointer'>UPDATE</div>
                        <div onClick={()=>{
                        deleteData(ele._id);
                        setAlertmsg("Contact Deleted")
                        setAlerts(true)
                        }}
                        className='text-white bg-red-500 px-2 py-1.5 hover:cursor-pointer hover:bg-red-400 rounded-xl' >DELETE</div>
                    </div>
                </div>
                
            )}
        
        </div>
    )
}