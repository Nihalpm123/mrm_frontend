import React, { useState } from 'react'
import './AdminLogin.css'
import axios from 'axios'
import { server } from '../../server'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
   const Navigate=useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${server}/admin-login`,{
      username,
      password
    }).then((res)=>{
      console.log(res);
      
     if(res.data.token ){
      localStorage.setItem("token",res.data.token)
       Navigate("/Admin")
     }else{
      Navigate("/adminlogin")
     }
      
    })
  
 
  }



  return (

    <div className="loginwrapper">
        <div className="wrapper">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' required value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <input type="password" placeholder='Password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>
           
        </div>
    </div>
  )
}

export default AdminLogin