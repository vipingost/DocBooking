import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../Components/AdminLayout';
import './doctorList.css';
import axios from '../../../../utils/axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState({});

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/doctor');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  //   const fetchDepartments = async () => {
  //     try {
  //       const response = await axios.get('/department');
  //       const departmentMap = {};
  //       response.data.forEach(department => {
  //         departmentMap[department._id] = department.name;
  //       });
  //       setDepartments(departmentMap);
  //     } catch (error) {
  //       console.error('Error fetching departments:', error);
  //     }
  //   };

  useEffect(() => {
    fetchDoctors();
    // fetchDepartments();
  }, []);

  console.log(doctors);

  const navigate = useNavigate();

  const onAddDoctor = () => {
    navigate('/admin/add-doctor');
  };

  return (
    <AdminLayout heading="Doctors List">
      <Button onClick={onAddDoctor}> Add Doctor</Button>
      <div className="doctor-list">
        {doctors.map(doctor => {
          return (
            <div key={doctor._id} className="doctor-card">
              <div className="doctorEdit">
                <Button
                  className="docEditBtn"
                  onClick={() => navigate(`/admin/edit-doctor/${doctor._id}`)}
                  type="primary"
                >
                  Edit
                </Button>
              </div>
              <img
                src={doctor.image}
                alt={`${doctor.name}`}
                className="doctor-image"
              />
              <div className="doctor-details">
                <h3>
                  {' '}
                  {doctor.firstname} {doctor.lastname}{' '}
                </h3>
                <p>
                  <strong>Specialization:</strong> {doctor.specialization}
                </p>
                <p>
                  <strong>Hospital:</strong> {doctor.hospital?.name || 'N/A'}
                </p>
                <strong>Department:</strong> {doctor.department?.name || 'N/A'}
                <div className="paradiv">
                  <p className="para">
                    <strong>About:</strong> {doctor.about || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default DoctorList;
