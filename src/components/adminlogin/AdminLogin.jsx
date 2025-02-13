import React, { useState } from 'react'
import './AdminLogin.css'
import axios from 'axios'
import { server } from '../../server'

const AdminLogin = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${server}/admin-login`,{
      username,
      password
    }).then((res)=>{
     if(res.data.message === "Login Success"){
      //navigation admin dashboard
     }
      
    })
  
 
  }
console.log(username);


  return (

    <>
        <div className="wrapper">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' required value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <input type="password" placeholder='Password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>
           
        </div>
    </>
  )
}

export default AdminLogin