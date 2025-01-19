import React, { useEffect, useState } from 'react';
import { assets } from '../../../assets/assets';
import { useNavigate } from 'react-router-dom';


const DocNavbar = () => {
  const navigate = useNavigate();

  const [docotorname, setDoctorName] = useState();
  const id = localStorage.getItem('DOCTOR_ID');
  const Doctornamefetch = () => {
    const data = localStorage.getItem('DNAME');
    setDoctorName(data);
    console.log(docotorname);
  };

  useEffect(() => {
    Doctornamefetch();
  }, []);

  const firstLetter = docotorname ? docotorname.charAt(0).toUpperCase() : '';

  

 

  return (
    <div className="w-full flex justify-between items-center p-4 px-6 sm:px-16 absolute top-0  z-50">
      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate('/doctor')}
      />

      {/* User Section */}
      {docotorname ? (
        <div
          className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-800 text-white text-4xl font-bold cursor-pointer  "
          onClick={() => {
            navigate(`/doctor/profile`);
          }}
        >
          <strong> {firstLetter} </strong>{' '}
        </div>
      ) : (
        <button
          onClick={() => navigate('/doctor/login')}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-200 transition-all"
        >
          Login
          <img src={assets.arrow_icon} alt="Arrow" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default DocNavbar;
