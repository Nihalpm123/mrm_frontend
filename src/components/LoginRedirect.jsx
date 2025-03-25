import { jwtDecode } from "jwt-decode";
import LoginPopUp from "./loginpage/LoginPopUp";
import { Navigate } from "react-router-dom";

const LoginRedirect=()=>{
const token=localStorage.getItem("token");
let decode={}
try {
    if(token){
         decode=jwtDecode(token)
         console.log(decode)
    }else{
        return <LoginPopUp/>
    }
} catch (error) {
    console.log("Invalid token",error);
    
}
if (decode.role==="admin"){
    return <Navigate to="/admin" />
}
if(decode.role==="user"){
    return <Navigate to="/"/>
}
}
export default LoginRedirect