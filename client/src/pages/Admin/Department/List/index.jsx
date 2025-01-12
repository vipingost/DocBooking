import AdminLayout from '../../../../Components/AdminLayout';
import axios from '../../../../utils/axios';
import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './list.css'

const List = () => {
  const [department, setDepartment] = useState([]);
  const navigate=useNavigate()
  const getDepartment = async () => {
    const response = await axios.get('/department');
    console.log(response.data);
    setDepartment(response.data);
  };
  useEffect(() => {
    getDepartment();
  }, []);
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
      render:id=>
        <a>{id}</a>
      
      
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render:(image)=> <img className='table-image' src={image} alt="" />
      
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'about',
      dataIndex: 'about',
      key: 'about',
    },
  ];
   const gotoAddPAge=()=>{
    navigate('/admin/add-department')
   }
  
  return (
    <>
      <AdminLayout heading="Department">
      <div className="department-btn-container">

          <Button onClick={gotoAddPAge} >Add Department</Button>
      </div>
        <div className="department-container">
          <Table dataSource={department} columns={columns} />;
        </div>
      </AdminLayout>
    </>
  );
};

export default List;
