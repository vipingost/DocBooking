import AdminLayout from '../../../../Components/AdminLayout';
import axios from '../../../../utils/axios';
import { useState, useEffect } from 'react';
import { Table, Button,Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './list.css'

const List = () => {
  const [department, setDepartment] = useState(false);
  const navigate=useNavigate()
  const getDepartment = async () => {
    const response = await axios.get('/department',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ADMIN_TOKEN')}`
      }
    });
    console.log(response.data);
    setDepartment(response.data);
  };
  useEffect(() => {
    getDepartment();
  }, []);

  const deleteDepartment = async (id) => {
    try {
      await axios.delete(`/department/${id}`);
      message.success('Department deleted successfully');
      getDepartment(); 
    } catch (error) {
      message.error('Failed to delete department');
    }
  };

 
  const gotoEditPage = (id) => {
    navigate(`/admin/edit-department/${id}`);
  };


  const columns = [
    {
      title: 'ID',
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <div className="action-buttons">
          <Button type="link" onClick={() => gotoEditPage(record._id)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this department?"
            onConfirm={() => deleteDepartment(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
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
        <div className="department-container">{
          department&&
          <Table dataSource={department} columns={columns} rowKey="_id" />}
        </div>
      </AdminLayout>
    </>
  );
};

export default List;
