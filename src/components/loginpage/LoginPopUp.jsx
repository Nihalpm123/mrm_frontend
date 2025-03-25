import axios from 'axios';
import React, { useState } from 'react'
import './LoginPopUp.css'
import { server } from '../../server';
import { toast } from 'react-toastify';
import bg from '../../img/bg.svg'

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
            const token=res.data.token;
            localStorage.setItem("token",token);
            toast.success("login success")
            window.location.reload()
        })
    }



  return (

    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input-field">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>WELCOME BACK</h3>
            <p>
              You don't have account please register, Enjoy services
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={bg} className="image" alt="" />
        </div>
      </div>
    </div>


    // <>
    //     <div className="wrappers">
    //         <h1>Login</h1>
    //         <form onSubmit={handleSubmit}>
    //         <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
    //         <input type="password" placeholder="Your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
    //         </form>
    //         <button type='submit'>Login</button>
    //     </div>
    // </>


  )
}

export default LoginPopUp