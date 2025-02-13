import axios from 'axios';
import React, { useState } from 'react'
import './LoginPopUp.css'
import { server } from '../../server';
import { toast } from 'react-toastify';

const LoginPopUp = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e)=> {
        e.preventDefault();
        axios.post(`${server}/login`,
            {
                username,
                password
            }
        ).then((res)=> {
            console.log(res);
            toast.success("login success")
            
        })
    }



  return (

    <>
        <div className="wrappers">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
            </form>
            <button type='submit'>Login</button>
        </div>
    </>




    // <div className='login-popup'> 
    //     <form className="login-popup-container" onSubmit={handleSubmit}>
    //         <div className="login-popup-title">
    //             <h2>{currState}</h2>
    //             <img onClick={()=> setShowLogin(false)} alt="" />
    //         </div>
    //         <div className="login-popup-inputs">

    //         {currState === "Login" && (
    //             <>
    //             <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
    //             <input type="password" placeholder="Your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
    //             </>
    //             )}

    //             {/* Username & Password (Common for both Login & Signup) */}
                
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

export default LoginPopUp