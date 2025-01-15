import AdminLayout from '../../../../Components/AdminLayout';
import axios from '../../../../utils/axios';
import { useState, useEffect } from 'react';
import { Table, Button,Popconfirm,message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './list.css'

const List = () => {
  const [hospital, setHospital] = useState([]);
  const navigate=useNavigate()
  const getHospital = async () => {
    const response = await axios.get('/hospital');
    console.log(response.data);
    setHospital(response.data);
  };
  const gotoEditPage = (id) => {
    navigate(`/admin/edit-hospital/${id}`);
  };

  useEffect(() => {
    getHospital();
  }, []);
  const deleteHospital = async (id) => {
    try {
      await axios.delete(`/hospital/${id}`);
      message.success('Hospital deleted successfully');
      getHospital(); 
    } catch (error) {
      message.error('Failed to delete Hspital');
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render:(image)=> <img className='table-image' src={image} alt="" />
      
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      
      
    },
    
    {
      title: 'PhoneNumber',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: 'Departments',
      dataIndex: 'department',
      key: 'department',
      render:(department)=>{
        return <div className="department-list">
          {department.map(item=>{
             return <p>{item.name}</p>
          })}
        </div>
      }
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
    },
    {
      title:'Action',
      key:'action',
      render: (record) => (
        <div className="action-buttons">
          <Button type="link" onClick={() => gotoEditPage(record._id)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this department?"
            onConfirm={() => deleteHospital(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    }
  ];
   const gotoAddPAge=()=>{
    navigate('/admin/add-hospital')
   }
  
  return (
    <>
      <AdminLayout heading="Hospital">
      <div className="hospital-btn-container">
          <Button onClick={gotoAddPAge} >Add Hospital</Button>

      </div>
        <div className="hospital-container">
          <Table dataSource={hospital} columns={columns} />;
        </div>
      </AdminLayout>
    </>
  );
};

export default List;
