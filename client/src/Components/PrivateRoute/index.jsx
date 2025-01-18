import { Outlet,Navigate, useNavigate } from "react-router-dom";
import { checkTocken } from "../../utils/index";
import { useEffect } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
const PrivateRoute=()=>{
  
    if(checkTocken()){
        return <Outlet/>
    }else{
       return <Navigate to="/admin/login"/>
    }


}

export default PrivateRoute