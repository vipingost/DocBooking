import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../../utils/axios"

import './viewDoc.css'

const ViewDoc = () => {

    const {id}=useParams()
    const navigate = useNavigate()
    const [docDetails,setDocDetails] = useState([])

     const goToDoctor= async (id)=>{
            const response = await axios.get(`/user/fetchdoctors?hospitalId=${id}`)
            console.log(response.data);
            setDocDetails(response.data.doctor)
            
          }

          const goToSlotDetails=(id)=>{

            navigate(`/user/slotdetails/${id}`)
          }
          
          useEffect(()=>{
            goToDoctor(id)
            
        },[])
        console.log('hgjgh',docDetails);
  return (
    <div className="doccard">

    {
        docDetails.map((item)=>{
            return (
            <div className='doccarditems' onClick={()=>goToSlotDetails(item._id)} >
            <img src={item.image} alt="" />
            <h1>Name : {item.firstname}  {item.lastname}</h1>
            <h2>Expert In : <strong>{item.specialization}</strong></h2>
            <h2>About : {item.about}</h2>
            </div>
            )
        })
    }
    </div>
  )
}

export default ViewDoc