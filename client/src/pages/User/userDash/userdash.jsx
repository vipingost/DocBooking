import { useEffect, useState } from "react"
import axios from "../../../utils/axios"
import { Input,Button, Select } from "antd"
import ViewDoc from "./viewDoc"
import { useNavigate } from "react-router-dom"
import './userdash.css'


const UserDash =()=>{

    const [location,setLocation] = useState([])
    const [hospitals,setHospitals]= useState([])
    const navigate = useNavigate();


    const getLocation =async ()=>{
        const response = await axios.get('/user/locations')
        setLocation(response.data.uniqueLocations)
        console.log(response.data.uniqueLocations);
        

    }
    const getHospitalDetails= async(e)=>{
        const response = await axios.get(`/user/hospitals?location=${e}`)
        console.log('hospppp',response.data);
        setHospitals(response.data.hospital)
        
    }

   

    useEffect(()=>{
        getLocation()
    },[])

    return <>
    <div className="dashwrapper">
    <h1>Hello ,select your preffered location</h1>
    <Select className="w-60 h-12"
    placeholder={<span style={{ color: '#4A4A4A',fontSize:20 }}>Select Location</span>}
    options={location}
    onChange={getHospitalDetails}
    />
    {hospitals.map(item=>(
        <div className="borderone" onClick={()=>navigate(`/user/viewdoc/${item._id}`)} >
            <img src={item.image} alt="" />
            <h1>{item.name}</h1>
            <h2>Phone number : {item.phonenumber}</h2>
            <h2>Location : {item.location}</h2>
            <h2>Departments Available : <strong> {item.department.map(items=>(
                        items.name+ '   ' 
            ))} </strong></h2>
            <h2> <strong>About</strong> : {item.about}</h2>
        </div>
        
    ))}
   
   </div>
    </>
}


export default UserDash