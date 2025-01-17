import { Outlet,Navigate } from "react-router-dom";
import { checkUserTocken } from "../../utils/index";
import { useEffect } from "react";

const UserAuth=()=>{
    
    if(checkUserTocken()){
        return <Outlet/>
    }else{
       return <Navigate to="/user/login"/>
    }


}

export default UserAuth