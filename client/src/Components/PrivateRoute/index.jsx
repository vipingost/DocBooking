import { Outlet,Navigate } from "react-router-dom";
import { checkTocken } from "../../utils/index";
const PrivateRoute=()=>{

    if(checkTocken()){
        return <Outlet/>
    }else{
       return <Navigate to="/admin/login"/>
    }


}

export default PrivateRoute