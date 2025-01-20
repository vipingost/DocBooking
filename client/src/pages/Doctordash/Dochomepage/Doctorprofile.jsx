import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import './Doctorprofile.css';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Popconfirm, message } from 'antd';

const DoctorProfile = () => {
  const [doctorDetails, setDoctorDetails] = useState([]);

  const id = localStorage.getItem('DOCTOR_ID')

  const fetchDoctorById = async () => {
    const response = await axios.get(`/doctor/${id}`);
    console.log('reppppppppppp', response.data);
    setDoctorDetails(response.data);
  };
  useEffect(() => {
    fetchDoctorById();
  }, []);

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    message.success('Logged Out Succesfully');
    navigate('/doctor/login');
  };

  return (
    <>
      <div className="doctorprofilewrapper">
        <div className="doctorlogoutbtn">
          <Popconfirm
            title="Delete the task"
            description="Are you sure you want to logout?"
            onConfirm={onLogout}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>LOGOUT</Button>
          </Popconfirm>
        </div>

        <div className="profilecarddoc">
          <div className="doctorimageprofile">
            <img src={doctorDetails.image} alt="doctor image" />
          </div>
          <h1>
            <strong>
              Name : {doctorDetails.firstname} {doctorDetails.lastname}
            </strong>
          </h1>
          <h2>Specialization : {doctorDetails.specialization}</h2>
          <h2>Hospital : {doctorDetails.hospital?.name}</h2>
          <h2>Specialization : {doctorDetails.specialization}</h2>
          <h2>Department : {doctorDetails.department?.name}</h2>
          <h2>Email : {doctorDetails.email}</h2>
          <h2>About : {doctorDetails.about}</h2>
        </div>
        <div className="opration-btn">
          <Button onClick={()=>navigate('/doctor/doctorappointments')} >See upComming Appoiments</Button>
          <Button onClick={()=>navigate('/doctor/set-slot')} >Add Slot</Button>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
