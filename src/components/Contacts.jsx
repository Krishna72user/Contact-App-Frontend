import ContactList from "./ContactList"
import { useContext, useState } from "react"
import ContactContext from "../Context/ContactContext"
import { useRef, useEffect } from "react"
import Alert from "./Alert"
import Modal from "./Modal"
import { useLoadingBar } from "react-top-loading-bar";
import { useLocation } from "react-router-dom"
export default function Contacts(){
    const location = useLocation()
    const { start, complete } = useLoadingBar({
        color: "blue",
        height: 2,
      });
    const src = useRef()
    const {contacts,getData,alerts,modalState,alertMsg } = useContext(ContactContext)
    const [search,setSearch]=useState("")
    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }
    const handleClick=(e)=>{
        e.preventDefault()
        setSearch(src.current.value)
    }
    useEffect(()=>{
            start()
            setTimeout(()=>{
                complete()
            },300)
        },[location.pathname])
    return (
        <>
        {alerts && <Alert message={alertMsg} col={alertMsg==="Contact Deleted"?"text-red-500":"text-blue-400"} />}
            <div className="w-[80vw] pt-6 py-6 mx-auto">
                <div className="font-bold md:text-3xl text-2xl" >YOUR CONTACTS</div>
                <button className="text-xs w-39 bg-red-500 mt-4 rounded  hover:bg-red-400 text-white font-bold px-1 py-2 " type="submit" onClick={()=>{getData()}}>RELOAD CONTACTS</button>
                <div className="h-1 mt-4 w-[80vw] bg-gray-200"></div>
                <form className="flex pt-6 gap-3" >
                    <input ref={src} type="text" id="name" className="w-[75vw] input "onChange={handleSearch} placeholder="Search Contact" name="name" />
                    <button className="bg-blue-500 w-18 rounded text-xs hover:bg-blue-400 text-white font-bold px-1 py-2 " type="submit" onClick={handleClick}>SEARCH</button>
                </form>
                <div className="text-gray-400 mt-3 font-medium">Your total contacts: <span className="text-black">{contacts.length}</span></div>
                <ContactList text={search}/>
            </div>
          {modalState &&  <div className="w-[100vw]   h-[93vh] bg-gray-200/10 backdrop-blur-xs fixed top-15 flex justify-center">
                <Modal/>
            </div>}
        </>
    )
}