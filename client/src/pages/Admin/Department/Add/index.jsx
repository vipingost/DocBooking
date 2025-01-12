import AdminLayout from '../../../../Components/AdminLayout';
import './add.css';
import { Input, Button } from 'antd';
import { useState } from 'react';
import axios from '../../../../utils/axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
const { TextArea } = Input;

const Add = () => {
    const [addDepartment,setAddDepartment]=useState({
        name:'',
        about:'',
        image:'',
    })
    const navigate=useNavigate()

    const onChange=(e,key)=>{
        setAddDepartment({...addDepartment,[key]:e.target.value})
    }
    const onUploadImage= async (e)=>{
        const formData=new FormData()
        console.log(e.target.files[0]);
        formData.append('avatar',e.target.files[0])
        const response = await axios.post('/upload',formData)
        console.log(response)
        setAddDepartment({...addDepartment,image:response.data.url})

    }
    console.log(addDepartment);
    const addDepartmentOnClick= async ()=>{
        try{
            const response= await axios.post('./department',addDepartment)
            navigate('/admin/department')
        }catch(e){
             toast.error(e.response.data.message||e.message)
        }
    }
    
  return (
    <>
      <AdminLayout heading="Add Department">
      <ToastContainer/>
        <div className="add-department-form">
            
          <div className="dep-input-container">
            <label>Name</label>
            <Input onChange={(e)=>{onChange(e,'name')}} />
          </div>
         
          <div className="dep-input-container">
            <label>Image</label>
            <Input onChange={onUploadImage} type="file" />
          </div>
          <div className="dep-input-container">
            <label>About</label>
            <TextArea onChange={(e)=>{onChange(e,'about')}} rows={5} />
          </div>
        </div>
        <div className="add-btn-container">

          <Button onClick={addDepartmentOnClick} >Add</Button>
        </div>
      </AdminLayout>
    </>
  );
};

export default Add;
