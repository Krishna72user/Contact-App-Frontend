import { useContext } from "react"
import { useRef } from "react"
import { useLoadingBar } from "react-top-loading-bar";
import ContactContext from "../Context/ContactContext"
export default function Modal() {
    const { edit, setModal, setEdit,editData,id,setAlertmsg } = useContext(ContactContext)
    const name = useRef()
    const address = useRef()
    const phone = useRef()
    const { start, complete } = useLoadingBar({
        color: "red",
        height: 2,
     });

    return (
        <>
            <div className="w-[18em] md:w-[25em] flex flex-col modal justify-center shadow-2xl md:px-10 shadow-gray-800  bg-white fixed top-23 p-7 ">
                <div className="font-bold md:text-2xl  text-xl mx-auto">EDIT CONTACT</div>
                <form onSubmit={
                    (e) => {
                        e.preventDefault()
                        editData(name.current.value,address.current.value,phone.current.value,id)
                        setAlertmsg("Contact Edited")
                        start()
                        setTimeout(()=>{
                            complete()
                        },300)
                        setModal(false)
                        
                    }} className="flex flex-col pt-6 gap-5" >
                    <div className="font-bold text-xs">Name of the person :</div>
                    <input ref={name} value={edit.name} onChange={(e) => { setEdit({ ...edit, name: e.target.value }) }} type="text" minLength="5" className=" input p-1" id="name" name="name" />
                    <div className="font-bold text-xs">Address of the person :</div>
                    <input ref={address} value={edit.address} onChange={(e) => { setEdit({ ...edit, address: e.target.value }) }} type="text" minLength="7" className="input  p-1 " id="address" name="address" />
                    <div className="font-bold text-xs">Phone number of the person :</div>
                    <input ref={phone} value={edit.phone} onChange={(e) => { setEdit({ ...edit, phone: String(e.target.value) }) }} type="text" minLength="10" className="input p-1 " id="phone" name="phone" />
                    <div className="flex mx-auto mt-3 gap-4">
                        <button className="bg-blue-500 w-30 rounded  hover:bg-blue-400 text-white text-sm font-bold px-1 py-2 " type="submit">Save changes</button>
                        <button onClick={(e)=>{e.preventDefault();setModal(false)}} className="bg-blue-500 w-22 rounded  hover:bg-blue-400 text-white text-sm font-bold px-1 py-2 ">Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}