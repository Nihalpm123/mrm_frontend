import React from 'react'
import {toast, ToastContainer, Bounce} from 'react-toastify'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import AdminLogin from './components/adminlogin/AdminLogin'
import LoginPopUp from './components/loginpage/LoginPopUp'
import SignUpPopUp from './components/signuppage/SignUpPopUp'
import Admin from './components/Admin/Admin'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/usersignup' element={<SignUpPopUp/>}/>
          <Route path='/userlogin' element={<LoginPopUp/>}/>
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          <Route path='/Admin/*' element={<Admin/>}/>
        </Routes>
      </BrowserRouter>

        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
/>

    </>
  )
}

export default App