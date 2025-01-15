import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "../../../utils/axios"


const ViewDoc = () => {

    const param =useParams()
    const [docDetails,setDocDetails] = useState([])

     const goToDoctor= async (id)=>{
            const response = await axios.get(`/user/fetchdoctors?hospitalId=${id}`)
            console.log(response.data);
            setDocDetails(response.data.doctor)
        }

        useEffect(()=>{
         goToDoctor(param.id)
        },[])
  return (
    <div className="card">

    {
        docDetails.map((item)=>{
            return (
            <div>
            <img src={item.image} alt="" />
            <h1>{item.firstname}  {item.lastname}</h1>
            <h2>Expert In:{item.specialisation}</h2>
            </div>
            )
        })
    }
    </div>
  )
}

export default ViewDoc