import React from 'react'
import {toast, ToastContainer, Bounce} from 'react-toastify'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import AdminLogin from './components/adminlogin/AdminLogin'
import LoginPopUp from './components/loginpage/LoginPopUp'
import SignUpPopUp from './components/signuppage/SignUpPopUp'
import Admin from './components/Admin/Admin'
import ProtectRoute from './components/ProtectRoute'
import LoginRedirect from './components/LoginRedirect'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/usersignup' element={<SignUpPopUp/>}/>
          <Route path='/userlogin' element={<LoginRedirect/>}/>
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          <Route path='/Admin/*' element={
            <ProtectRoute allowedTypes={["admin"]}>

            <Admin/>
          </ProtectRoute>}/>
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