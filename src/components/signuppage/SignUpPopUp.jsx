import React, { useState } from 'react'
import axios from 'axios'
import './SignUpPopUp.css'
import bg from '../../img/bg.svg'
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

    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <input type="text" placeholder="Shop Name" required value={shopname} onChange={(e) => setShopname(e.target.value)}/>
            </div>
            <div className="input-field">
                <input type="number" placeholder="Phone Number" required value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}/>
            </div>
            <div className="input-field">
                <input type="number" placeholder="Whats app Number" required value={whatsappno} onChange={(e) => setWhatsappno(e.target.value)}/>
            </div>
            <div className="input-field">
                <input type="text" placeholder="TRN no" required value={TRNno} onChange={(e) => setTRNno(e.target.value)}/>
            </div>
            <div className="input-field">
                <input type="text" placeholder="Address" required value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div className="input-field">
                <input type="text" placeholder="Location" required value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>
            <div className="input-field">
                <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input-field">
              <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Register" className="btn solid" />
          </form>

        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              You have already account please login, Enjoy the services
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign in
            </button>
          </div>
          <img src={bg} className="image" alt="" />
        </div>
        
      </div>
    </div>

    // <>
    //     <div className="wrapper">
    //         <h1>Sign Up</h1>
    //         <form onSubmit={handleSubmit}>
    //         <input type="text" placeholder="Shop name" required value={shopname} onChange={(e) => setShopname(e.target.value)}/>
    //              <input type="number" placeholder="Phone Number" required value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}/>
    //              <input type="number" placeholder="WhatsApp Number" required value={whatsappno} onChange={(e) => setWhatsappno(e.target.value)}/>
    //              <input type="text" placeholder='TRN Number'required value={TRNno} onChange={(e) => setTRNno(e.target.value)}/>
    //              <input type="text" placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)}/>
    //              <input type="text" placeholder="Location" required value={location} onChange={(e) => setLocation(e.target.value)}/>
    //              <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
    //              <input type="password" placeholder="Your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
    //         </form>
    //         <button type='submit'>Sign Up</button>
    //     </div>
    // </>
    
    
  )
}

export default SignUpPopUp