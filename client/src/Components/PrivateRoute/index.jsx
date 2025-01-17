import { Outlet,Navigate, useNavigate } from "react-router-dom";
import { checkTocken } from "../../utils/index";
import { useEffect } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
const PrivateRoute=()=>{
    // useEffect(()=>{
    //     checkIsaAuth()
    //   },[])
    // const navigate = useNavigate()
    
    // const checkIsaAuth= async ()=>{
    //   const response =await axios.get('/admin/auth')
    //   console.log('ghjgj',response.data.success);
      
    //   if(response.data.success === false){
        
    //     navigate('/admin/login')
    
    //     toast.error(response.data.message ||response.message)
    //   }else navigate('/admin/hospital')
    
    // }
    if(checkTocken()){
        return <Outlet/>
    }else{
       return <Navigate to="/admin/login"/>
    }


}

export default PrivateRoute