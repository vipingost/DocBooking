import AdminLayout from '../../../../Components/AdminLayout';
import './add.css';
import { Input, Button, Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const { TextArea } = Input;

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    firstname: '',
    lastname: '',
    email: '',
    specialization: '',
    about: '',
    department: '',
    hospital: '',
    image: '',
  });
  const [departments, setDepartments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  const getDepartments = async () => {
    const response = await axios.get('/department');
    console.log(response.data);
    
    setDepartments(
      response.data.map((item) => ({
        value: item._id,
        label: item.name,
      }))
    );
  };

  const getHospitals = async () => {
    const response = await axios.get('/hospital');
    setHospitals(
      response.data.map((item) => ({
        value: item._id,
        label: item.name,
      }))
    );
  };

  useEffect(() => {
    getDepartments();
    getHospitals();
  }, []);

  const onChange = (e, key) => {
    if (key === 'department' || key === 'hospital') {
      setDoctor({ ...doctor, [key]: e });
    } else {
      setDoctor({ ...doctor, [key]: e.target.value });
    }
  };

  const onUploadImage = async (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    const response = await axios.post('/upload', formData);
    setDoctor({ ...doctor, image: response.data.url });
  };

  const addDoctorOnClick = async () => {
    try {
      await axios.post('/doctor/signup', doctor);
      navigate('/doctor');
    } catch (e) {
      toast.error(e.response.data.message || e.message);
    }
  };
  console.log(doctor);
  

  return (
    <>
      <AdminLayout heading="Add Doctor">
        <ToastContainer />
        <div className="add-doctor-form">
          <div className="dep-input-container">
            <label>First Name</label>
            <Input onChange={(e) => onChange(e, 'firstname')} />
          </div>
          <div className="dep-input-container">
            <label>Last Name</label>
            <Input onChange={(e) => onChange(e, 'lastname')} />
          </div>
          <div className="dep-input-container">
            <label>Email</label>
            <Input onChange={(e) => onChange(e, 'email')} type="email" />
          </div>
          <div className="dep-input-container">
            <label>Specialization</label>
            <Input onChange={(e) => onChange(e, 'specialization')} />
          </div>
          <div className="dep-input-container">
            <label>About</label>
            <TextArea onChange={(e) => onChange(e, 'about')} rows={5} />
          </div>
          <div className="dep-input-container">
            <label>Department</label>
            <Select
            mode='multiple'
              options={departments}
              onChange={(value) => onChange(value, 'department')}
            />
          </div>
          <div className="dep-input-container">
            <label>Hospital</label>
            <Select
              options={hospitals}
              onChange={(value) => onChange(value, 'hospital')}
            />
          </div>
          <div className="dep-input-container">
            <label>Image</label>
            <Input onChange={onUploadImage} type="file" />
          </div>
        </div>
        <div className="add-btn-container">
          <Button onClick={addDoctorOnClick}>Add Doctor</Button>
        </div>
      </AdminLayout>
    </>
  );
};

export default AddDoctor;
