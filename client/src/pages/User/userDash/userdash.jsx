import { useEffect, useState } from "react"
import axios from "../../../utils/axios"
import { Input,Button, Select } from "antd"
import ViewDoc from "./viewDoc"
import { useNavigate } from "react-router-dom"


const UserDash =()=>{

    const [location,setLocation] = useState([])
    const [hospitals,setHospitals]= useState([])
    const navigate = useNavigate();


    const getLocation =async ()=>{
        const response = await axios.get('/user/locations')
        setLocation(response.data.locationArray)
        console.log(response.data.locationArray);
        

    }
    const getHospitalDetails= async(e)=>{
        const response = await axios.get(`/user/hospitals?location=${e}`)
        console.log(response.data);
        setHospitals(response.data.hospital)
        
    }

   

    useEffect(()=>{
        getLocation()
    },[])

    return <>
    <h1>Hello ,select your preffered location</h1>
    <Select className="w-auto h-auto"
    placeholder='Select Location'
    options={location}
    onChange={getHospitalDetails}
    />
    {hospitals.map(item=>(
        <div className="border" onClick={()=>navigate(`/viewdoc/${item._id}`)} >
            <img src={item.image} alt="" />
            <h1>{item.name}</h1>
            <h2>{item.phonenumber}</h2>
            <h2>{item.location}</h2>
            <h2>{item.department.map(items=>(
                        items.name+ '   '
            ))}</h2>
            <h2>{item.about}</h2>
        </div>
    ))}
   
    
    </>
}


export default UserDash