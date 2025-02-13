import React, { useState } from 'react'
import axios from 'axios'
import './SignUpPopUp.css'
import { server } from '../../server'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SignUpPopUp = () => {

    const navigate = useNavigate()

    const [shopname, setShopname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [whatsappno, setWhatsappno] = useState("");
    const [TRNno, setTRNno] = useState("");
    const [location, setLocation] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${server}/register`,
            {
                shopname,
                username,
                password,
                address,
                phonenumber,
                whatsappno,
                TRNno,
                location
            }
        ).then((res) =>{
           toast.success("Account created successfully")
           navigate("/login")
        })
    }


  return (

    <>
        <div className="wrapper">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Shop name" required value={shopname} onChange={(e) => setShopname(e.target.value)}/>
                 <input type="number" placeholder="Phone Number" required value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}/>
                 <input type="number" placeholder="WhatsApp Number" required value={whatsappno} onChange={(e) => setWhatsappno(e.target.value)}/>
                 <input type="text" placeholder='TRN Number'required value={TRNno} onChange={(e) => setTRNno(e.target.value)}/>
                 <input type="text" placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)}/>
                 <input type="text" placeholder="Location" required value={location} onChange={(e) => setLocation(e.target.value)}/>
                 <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                 <input type="password" placeholder="Your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
            </form>
            <button type='submit'>Sign Up</button>
        </div>
    </>
    
    // <div className='login-popup'> 
    //     <form className="login-popup-container" onSubmit={handleSubmit}>
    //         <div className="login-popup-title">
    //             <h2>{currState}</h2>
    //             <img onClick={()=> setShowLogin(false)} alt="" />
    //         </div>
    //         <div className="login-popup-inputs">

    //         {currState === "Sign Up" && (
    //             <>
    //             <input type="text" placeholder="Shop name" required value={shopname} onChange={(e) => setShopname(e.target.value)}/>
    //             <input type="number" placeholder="Phone Number" required value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}/>
    //             <input type="number" placeholder="WhatsApp Number" required value={whatsappno} onChange={(e) => setWhatsappno(e.target.value)}/>
    //             <input type="number" placeholder='TRN Number'required value={TRNno} onChange={(e) => setTRNno(e.target.value)}/>
    //             <input type="text" placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)}/>
    //             <input type="text" placeholder="Location" required value={location} onChange={(e) => setLocation(e.target.value)}/>
    //             </>
    //             )}

    //             {/* Username & Password (Common for both Login & Signup) */}
    //             <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
    //             <input type="password" placeholder="Your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
    //         </div>
    //         <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
    //         <div className="login-popup-condition">
    //             <input type="checkbox" required/>
    //             <p>By continuing, i agree to the terms of use & privacy policy.</p>
    //         </div>
    //         {/* {currState === "Login"
    //         ?<p>Create a new account? <span onClick={()=> setCurrState("Sign Up")}>Click here</span></p>
    //         :<p>Already have an account? <span onClick={()=> setCurrState("Login")}>Login here</span></p>
    //         } */}
    //     </form>
    // </div>
  )
}

export default SignUpPopUp