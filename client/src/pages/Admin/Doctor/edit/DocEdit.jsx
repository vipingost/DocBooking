import AdminLayout from '../../../../Components/AdminLayout';
import './adddoc.css';
import { Input, Button, Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const { TextArea } = Input;

const EditDocter = () => {
    const {id}=useParams()
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

  const fetchDoctorById =async ()=>{
    try{
    const response = await axios.get(`/doctor/${id}`)
    console.log('ressss',response.data);
    
    setDoctor(response.data)
    }catch(e){
        return e.message
    }
  }
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
    fetchDoctorById()
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
      await axios.patch(`/doctor/${id}`, doctor);
      navigate('/admin/doctor');
    } catch (e) {
      toast.error(e.response.data.message || e.message);
    }
  };
  console.log(doctor);
  

  return (
    <>
      <AdminLayout heading="Edit Doctor">
        <ToastContainer />
        <div className="add-doctor-form">
          <div className="dep-input-container">
            <label>First Name</label>
            <Input onChange={(e) => onChange(e, 'firstname')} value={doctor.firstname} />
          </div>
          <div className="dep-input-container">
            <label>Last Name</label>
            <Input onChange={(e) => onChange(e, 'lastname')} value={doctor.lastname} />
          </div>
          <div className="dep-input-container">
            <label>Email</label>
            <Input onChange={(e) => onChange(e, 'email')} type="email" value={doctor.email} />
          </div>
          <div className="dep-input-container">
            <label>Specialization</label>
            <Input onChange={(e) => onChange(e, 'specialization')} value={doctor.specialization} />
          </div>
          <div className="dep-input-container">
            <label>About</label>
            <TextArea onChange={(e) => onChange(e, 'about')} rows={5} value={doctor.about} />
          </div>
          <div className="dep-input-container">
            <label>Department</label>
            <Select
            mode='multiple'
            value={doctor.department?.name}
              options={departments}
              onChange={(value) => onChange(value, 'department')}
            />
          </div>
          <div className="dep-input-container">
            <label>Hospital</label>
            <Select
            value={doctor.hospital?.name}
              options={hospitals}
              onChange={(value) => onChange(value, 'hospital')}
            />
          </div>
          <div className="dep-input-container">
            <label>Image</label>
            <Input onChange={onUploadImage} type="file"  />
            {doctor.image && (
  <img src={doctor.image} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
            )}
          </div>
        <div className="add-docer-btn-container">
          <Button className='add-doc-button' onClick={addDoctorOnClick}>Update Doctor</Button>
        </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditDocter;
