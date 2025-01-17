import AdminLayout from '../../../../Components/AdminLayout';
import './edithos.css';
import { Input, Button, Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const { TextArea } = Input;

const EditHospital = () => {
  const [editHospital, setEditHospital] = useState({
    name: '',
    phonenumber: '',
    image: '',
    location: '',
    department: [],
    about: '',
  });

  const [department, setDepartment] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();
  const getDepartment = async () => {
    const response = await axios.get('/department');
    const convertedData = response.data.map(item => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    console.log(response.data);
    setDepartment(convertedData);
    console.log(department);
  };
  const getHospital = async () => {
    const response = await axios.get(`/hospital/${id}`);
    console.log('response', response.data);
    const hospitalData = response.data;


  hospitalData.department = hospitalData.department.map(dep => dep._id);

    setEditHospital(response.data);
  };
  useEffect(() => {
    getDepartment();
    getHospital();
  }, []);

  const onChange = (e, key) => {
    if (key == 'department') {
      setEditHospital({ ...editHospital, department: e });
    } else {
      setEditHospital({ ...editHospital, [key]: e.target.value });
    }
  };
  const onUploadImage = async e => {
    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append('avatar', e.target.files[0]);
    const response = await axios.post('/upload', formData);
    console.log(response);
    setEditHospital({ ...editHospital, image: response.data.url });
  };

  const addHospitalOnClick = async () => {
    try {
        await axios.patch(`/hospital/${id}`, editHospital);
        toast.success('Hospital updated successfully');
        navigate('/admin/hospital');
      } catch (e) {
        toast.error(e.response?.data?.message || e.message);
      }
    };
  console.log('editHospital', editHospital);
  console.log('editHospitaldep',editHospital.department);
  console.log('dep',department);

  return (
    <>
      <AdminLayout heading="Edit Hospital">
        <ToastContainer />
        <div className="add-hospital-form">
          <div className="dep-input-container">
            <label>Name</label>
            <Input
              value={editHospital.name}
              onChange={e => {
                onChange(e, 'name');
              }}
            />
          </div>

          <div className="dep-input-container">
            <label>Image</label>
            <Input
              
              onChange={onUploadImage}
              type="file"
            />
            {editHospital.image && (
  <img src={editHospital.image} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
)}

          </div>
          <div className="dep-input-container">
            <label>PhoneNumber</label>
            <Input
              value={editHospital.phonenumber}
              onChange={e => {
                onChange(e, 'phonenumber');
              }}
              rows={5}
            />
          </div>
          <div className="dep-input-container">
            <label>Location</label>
            <Input
              value={editHospital.location}
              onChange={e => {
                onChange(e, 'location');
              }}
              rows={5}
            />
          </div>
          <div className="dep-input-container">
            <label>Departments</label>
            <Select
              value={editHospital.department}
              options={department}
              mode="multiple"
              onChange={e => {
                onChange(e, 'department');
              }}
              rows={5}
            />
          </div>
          <div className="dep-input-container">
            <label>About</label>
            <TextArea
              value={editHospital.about}
              onChange={e => {
                onChange(e, 'about');
              }}
              rows={5}
            />
          </div>
        </div>
        <div className="edit-hospital-btn-container">
          <Button onClick={addHospitalOnClick}>Add</Button>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditHospital;
