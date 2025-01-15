import './doclogin.css'
import { Input, Button, Select } from 'antd';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
import axios from '../../utils/axios'


const DoctorLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [doctorData, setDoctorData] = useState(null);
    const navigate =useNavigate()
  const  onLogin= async ()=>{
    try{

        var response = await axios.post('/doctor/login',formData)
        localStorage.clear();
         localStorage.setItem('DOCTOR_ID',response.data.id)
              localStorage.setItem('DOCTOR_TOKEN',response.data.token)
              localStorage.setItem('ROLE',response.data.role)
              localStorage.setItem('DNAME',response.data.name)
              toast.success('Login successful');
              navigate('/doctor/set-slot');  
        console.log(response);
    }catch(e){
         toast.error(response.response.data.message || e.message);
    }
    
  }

    
  
    return (
      <div heading="Doctor Login">
        <ToastContainer />
        <div className="doctor-login-form">
          <div className="dep-input-container">
            <label>Email</label>
            <Input onChange={(e) =>setFormData({...formData,email:e.target.value})} type="email" />
          </div>
          <div className="dep-input-container">
            <label>Password</label>
            <Input onChange={(e) => setFormData({...formData,password:e.target.value})} type="password" />
          </div>
          <div className="add-btn-container">
            <Button onClick={onLogin}>Login</Button>
          </div>
        </div>
      </div>
    );
  };

  export default DoctorLogin
  