import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectRoute=({children,allowedTypes})=>{
const token=localStorage.getItem("token")
if(!token){
    console.log("No token found!");
    return <Navigate to="/userlogin" replace/>
}
try {
    const decode=jwtDecode(token)
    if(allowedTypes && !allowedTypes.includes(decode.role)){
        return <Navigate to="/Admin/" replace/>
    }
    console.log(decode);
    
    return children
} catch (error) {
    return <Navigate to="/userlogin" replace/>
}
}
export default ProtectRoute